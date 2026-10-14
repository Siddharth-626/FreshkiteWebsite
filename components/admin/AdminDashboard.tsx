"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import {
  MAX_LOADED_RECORDS,
  describeAdminError,
  fetchRegistrations,
  fetchSummaryCounts,
  updateRegistrationStatus,
  type DateRange,
  type SummaryCounts,
} from "@/lib/admin-service";
import {
  formatDateTimeIST,
  formatIsoDateLabel,
  istDayEndExclusive,
  istDayStart,
  isValidIsoDate,
  todayIsoIST,
} from "@/lib/dates";
import { exportRegistrationsToExcel } from "@/lib/export-service";
import { REGISTRATION_STATUSES, STATUS_LABELS, comparisonKey, isRegistrationStatus } from "@/lib/registration";
import type { RegistrationStatus, StudentRegistration } from "@/types";

const PAGE_SIZE = 25;
const ALL = "";

const STATUS_STYLES: Record<RegistrationStatus, string> = {
  registered: "bg-slate-100 text-slate-700 border-slate-200",
  contacted: "bg-blue-50 text-[#1d4ed8] border-blue-200",
  selected: "bg-green-50 text-[#15803d] border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function isAccessError(err: unknown): boolean {
  return err instanceof FirebaseError && (err.code === "permission-denied" || err.code === "unauthenticated");
}

interface Props {
  user: User;
  onSignOut: () => void;
  onAccessLost: (notice: string) => void;
}

export default function AdminDashboard({ user, onSignOut, onAccessLost }: Props) {
  // Date range (server-side filter)
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Client-side filters over the loaded range
  const [search, setSearch] = useState("");
  const [college, setCollege] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState<RegistrationStatus | typeof ALL>(ALL);
  const [page, setPage] = useState(1);

  const [records, setRecords] = useState<StudentRegistration[]>([]);
  const [totalInRange, setTotalInRange] = useState(0);
  const [truncated, setTruncated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  const [counts, setCounts] = useState<SummaryCounts | null>(null);
  const [countsError, setCountsError] = useState("");

  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [exporting, setExporting] = useState(false);

  const rangeError = useMemo(() => {
    if (fromDate && !isValidIsoDate(fromDate)) return "Enter a valid start date.";
    if (toDate && !isValidIsoDate(toDate)) return "Enter a valid end date.";
    if (fromDate && toDate && fromDate > toDate) return "The start date must be on or before the end date.";
    return "";
  }, [fromDate, toDate]);

  const range: DateRange | null = useMemo(() => {
    if (rangeError) return null;
    return {
      start: fromDate ? istDayStart(fromDate) : undefined,
      endExclusive: toDate ? istDayEndExclusive(toDate) : undefined,
    };
  }, [fromDate, toDate, rangeError]);

  const handleFailure = useCallback(
    (err: unknown, action: string): string => {
      const message = describeAdminError(err, action);
      if (isAccessError(err)) onAccessLost(message);
      return message;
    },
    [onAccessLost]
  );

  // Load registrations whenever the date range changes (or on retry/refresh).
  useEffect(() => {
    if (!range) return;
    let cancelled = false;
    setLoading(true);
    setLoadError("");
    fetchRegistrations(range)
      .then((result) => {
        if (cancelled) return;
        setRecords(result.records);
        setTotalInRange(result.totalInRange);
        setTruncated(result.truncated);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(handleFailure(err, "load registrations"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range, reloadToken, handleFailure]);

  useEffect(() => {
    let cancelled = false;
    setCountsError("");
    fetchSummaryCounts()
      .then((result) => !cancelled && setCounts(result))
      .catch((err) => !cancelled && setCountsError(handleFailure(err, "load summary counts")));
    return () => {
      cancelled = true;
    };
  }, [reloadToken, handleFailure]);

  // Distinct colleges, grouped case/whitespace-insensitively, using the most common spelling.
  const collegeOptions = useMemo(() => {
    const groups = new Map<string, Map<string, number>>();
    for (const r of records) {
      if (!r.collegeName) continue;
      const key = comparisonKey(r.collegeName);
      const spellings = groups.get(key) ?? new Map<string, number>();
      spellings.set(r.collegeName, (spellings.get(r.collegeName) ?? 0) + 1);
      groups.set(key, spellings);
    }
    return Array.from(groups, ([key, spellings]) => {
      let label = "";
      let best = 0;
      let total = 0;
      spellings.forEach((n, spelling) => {
        total += n;
        if (n > best) [label, best] = [spelling, n];
      });
      return { key, label, count: total };
    }).sort((a, b) => a.label.localeCompare(b.label));
  }, [records]);

  // A college filter that no longer exists in the loaded range is dropped.
  useEffect(() => {
    if (college !== ALL && !collegeOptions.some((option) => option.key === college)) setCollege(ALL);
  }, [college, collegeOptions]);

  const filtered = useMemo(() => {
    const query = comparisonKey(search);
    const digits = search.replace(/\D/g, "");
    return records.filter((r) => {
      if (college !== ALL && comparisonKey(r.collegeName) !== college) return false;
      if (statusFilter !== ALL && r.status !== statusFilter) return false;
      if (!query) return true;
      return (
        comparisonKey(r.fullName).includes(query) ||
        r.email.includes(query) ||
        comparisonKey(r.collegeName).includes(query) ||
        comparisonKey(r.branch).includes(query) ||
        (digits.length >= 3 && r.phoneNumber.replace(/\D/g, "").includes(digits))
      );
    });
  }, [records, search, college, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => setPage(1), [search, college, statusFilter, fromDate, toDate]);

  const hasFilters = Boolean(search || college || statusFilter || fromDate || toDate);

  function clearFilters() {
    setSearch("");
    setCollege(ALL);
    setStatusFilter(ALL);
    setFromDate("");
    setToDate("");
  }

  async function changeStatus(record: StudentRegistration, status: RegistrationStatus) {
    if (status === record.status || updating[record.id]) return;
    const previous = record.status;
    setUpdating((u) => ({ ...u, [record.id]: true }));
    setNotice(null);
    // Optimistic update, rolled back if Firestore rejects the write.
    setRecords((rs) => rs.map((r) => (r.id === record.id ? { ...r, status } : r)));
    try {
      await updateRegistrationStatus(record.id, status, user.uid);
      setNotice({ kind: "success", text: `${record.fullName || "Student"} marked as ${STATUS_LABELS[status]}.` });
    } catch (err) {
      setRecords((rs) => rs.map((r) => (r.id === record.id ? { ...r, status: previous } : r)));
      setNotice({ kind: "error", text: handleFailure(err, "update the status") });
    } finally {
      setUpdating((u) => {
        const next = { ...u };
        delete next[record.id];
        return next;
      });
    }
  }

  async function handleExport() {
    if (exporting || rangeError || filtered.length === 0) return;
    setExporting(true);
    setNotice(null);
    try {
      const fileName = await exportRegistrationsToExcel(filtered);
      setNotice({ kind: "success", text: `Exported ${filtered.length.toLocaleString("en-IN")} registrations to ${fileName}.` });
    } catch (err) {
      console.error("Export failed:", err);
      setNotice({ kind: "error", text: "The export failed. Please try again." });
    } finally {
      setExporting(false);
    }
  }

  const rangeLabel =
    fromDate && toDate && !rangeError
      ? `${formatIsoDateLabel(fromDate)} – ${formatIsoDateLabel(toDate)}`
      : fromDate && !rangeError
        ? `From ${formatIsoDateLabel(fromDate)}`
        : toDate && !rangeError
          ? `Up to ${formatIsoDateLabel(toDate)}`
          : "All time";

  const today = todayIsoIST();
  const controlClass =
    "w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-[#0F172A] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-black tracking-tighter">FK</span>
            </div>
            <span className="text-white text-lg font-bold tracking-tight truncate">
              Fresh<span className="text-[#2563EB]">kite</span>{" "}
              <span className="text-slate-400 font-medium">Registrations</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-slate-400 truncate max-w-[220px]">{user.email}</span>
            <button
              type="button"
              onClick={onSignOut}
              className="text-sm font-semibold text-white bg-white/10 hover:bg-white/15 px-3.5 py-2 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Summary */}
        <section aria-label="Summary" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total registrations", value: counts?.total },
            { label: "Today (IST)", value: counts?.today },
            { label: "This week (from Monday)", value: counts?.thisWeek },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-[#0F172A] tabular-nums">
                {stat.value === undefined ? (countsError ? "—" : "…") : stat.value.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </section>
        {countsError && <p className="text-sm text-red-700">{countsError}</p>}

        {/* Filters */}
        <section aria-label="Filters" className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4">
              <label htmlFor="search" className="block text-xs font-semibold text-slate-600 mb-1.5">Search</label>
              <input
                id="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email, phone, college or branch"
                className={controlClass}
              />
            </div>
            <div className="lg:col-span-3">
              <label htmlFor="college" className="block text-xs font-semibold text-slate-600 mb-1.5">College</label>
              <select id="college" value={college} onChange={(e) => setCollege(e.target.value)} className={controlClass}>
                <option value={ALL}>All colleges</option>
                {collegeOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-1">
              <label htmlFor="status-filter" className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(isRegistrationStatus(e.target.value) ? e.target.value : ALL)}
                className={controlClass}
              >
                <option value={ALL}>All</option>
                {REGISTRATION_STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="from-date" className="block text-xs font-semibold text-slate-600 mb-1.5">From</label>
              <input
                id="from-date"
                type="date"
                value={fromDate}
                max={toDate || today}
                onChange={(e) => setFromDate(e.target.value)}
                aria-invalid={Boolean(rangeError)}
                className={controlClass}
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="to-date" className="block text-xs font-semibold text-slate-600 mb-1.5">To</label>
              <input
                id="to-date"
                type="date"
                value={toDate}
                min={fromDate || undefined}
                max={today}
                onChange={(e) => setToDate(e.target.value)}
                aria-invalid={Boolean(rangeError)}
                className={controlClass}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {rangeError ? (
                <span className="text-red-700 font-medium" role="alert">{rangeError}</span>
              ) : (
                <>Dates are in India Standard Time. Showing: <span className="font-semibold text-slate-700">{rangeLabel}</span></>
              )}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="text-sm font-semibold text-slate-600 hover:text-[#0F172A] px-3 py-2">
                  Clear filters
                </button>
              )}
              <button
                type="button"
                onClick={() => setReloadToken((t) => t + 1)}
                disabled={loading}
                className="text-sm font-semibold text-[#0F172A] border border-slate-300 hover:border-slate-400 bg-white px-3.5 py-2 rounded-lg disabled:opacity-60 transition-colors"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={exporting || loading || Boolean(rangeError) || filtered.length === 0}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] px-3.5 py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                {exporting ? "Exporting…" : `Export to Excel (${filtered.length.toLocaleString("en-IN")})`}
              </button>
            </div>
          </div>
        </section>

        <div aria-live="polite">
          {notice && (
            <div
              className={`flex items-start justify-between gap-4 rounded-xl border p-3.5 text-sm ${
                notice.kind === "success" ? "bg-green-50 border-green-200 text-[#15803d]" : "bg-red-50 border-red-200 text-red-700"
              }`}
              role={notice.kind === "error" ? "alert" : "status"}
            >
              <span>{notice.text}</span>
              <button type="button" onClick={() => setNotice(null)} className="font-semibold opacity-70 hover:opacity-100" aria-label="Dismiss">
                ✕
              </button>
            </div>
          )}
        </div>

        {truncated && !loading && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3.5" role="status">
            This range has {totalInRange.toLocaleString("en-IN")} registrations; only the newest{" "}
            {MAX_LOADED_RECORDS.toLocaleString("en-IN")} are loaded, so search, filters and export cover those only.
            Narrow the date range to work with the rest.
          </p>
        )}

        {/* Results */}
        <section aria-label="Registrations" className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <h2 className="text-base font-bold text-[#0F172A]">Registrations</h2>
            {!loading && !loadError && (
              <p className="text-xs text-slate-500 tabular-nums">
                {filtered.length.toLocaleString("en-IN")} of {records.length.toLocaleString("en-IN")} in range
              </p>
            )}
          </div>

          {loading ? (
            <p className="px-5 py-16 text-center text-sm text-slate-500" role="status">Loading registrations…</p>
          ) : loadError ? (
            <div className="px-5 py-16 text-center">
              <p className="text-sm text-red-700 mb-4" role="alert">{loadError}</p>
              <button
                type="button"
                onClick={() => setReloadToken((t) => t + 1)}
                className="text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] px-4 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="text-sm font-semibold text-[#0F172A] mb-1">
                {records.length === 0 ? "No registrations yet" : "No registrations match your filters"}
              </p>
              <p className="text-sm text-slate-500">
                {records.length === 0
                  ? rangeError || fromDate || toDate
                    ? "Try a different date range."
                    : "New registrations from /register will appear here."
                  : "Try a different search term or clear the filters."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8FAFC] text-left">
                    <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th scope="col" className="px-5 py-3 whitespace-nowrap">Registered</th>
                      <th scope="col" className="px-5 py-3">Student</th>
                      <th scope="col" className="px-5 py-3">Phone</th>
                      <th scope="col" className="px-5 py-3">College</th>
                      <th scope="col" className="px-5 py-3">Branch</th>
                      <th scope="col" className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visible.map((r) => (
                      <tr key={r.id} className="align-top hover:bg-slate-50/60">
                        <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 tabular-nums">{formatDateTimeIST(r.registeredAt)}</td>
                        <td className="px-5 py-3.5 min-w-[200px]">
                          <p className="font-semibold text-[#0F172A] break-words">{r.fullName || "—"}</p>
                          <a href={`mailto:${r.email}`} className="text-xs text-[#2563EB] hover:underline break-all">{r.email}</a>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <a href={`tel:${r.phoneNumber}`} className="text-slate-700 hover:text-[#2563EB] tabular-nums">{r.phoneNumber || "—"}</a>
                        </td>
                        <td className="px-5 py-3.5 min-w-[180px] text-slate-700 break-words">{r.collegeName || "—"}</td>
                        <td className="px-5 py-3.5 min-w-[160px] text-slate-700 break-words">{r.branch || "—"}</td>
                        <td className="px-5 py-3.5">
                          <label htmlFor={`status-${r.id}`} className="sr-only">Status for {r.fullName}</label>
                          <select
                            id={`status-${r.id}`}
                            value={r.status}
                            disabled={Boolean(updating[r.id])}
                            onChange={(e) => isRegistrationStatus(e.target.value) && changeStatus(r, e.target.value)}
                            className={`text-xs font-semibold rounded-full border px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 disabled:opacity-60 ${STATUS_STYLES[r.status]}`}
                          >
                            {REGISTRATION_STATUSES.map((s) => (
                              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pageCount > 1 && (
                <nav aria-label="Pagination" className="px-5 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 tabular-nums">
                    {((currentPage - 1) * PAGE_SIZE + 1).toLocaleString("en-IN")}–
                    {Math.min(currentPage * PAGE_SIZE, filtered.length).toLocaleString("en-IN")} of{" "}
                    {filtered.length.toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:border-slate-400"
                    >
                      Previous
                    </button>
                    <span className="text-xs text-slate-500 tabular-nums">
                      Page {currentPage} of {pageCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage(currentPage + 1)}
                      disabled={currentPage === pageCount}
                      className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:border-slate-400"
                    >
                      Next
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
