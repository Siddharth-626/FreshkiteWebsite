// All dashboard dates use India Standard Time (UTC+05:30, no daylight saving),
// regardless of the administrator's browser timezone.

export const DISPLAY_TIMEZONE = "Asia/Kolkata";
const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Start of the given calendar day (YYYY-MM-DD) in IST, as an absolute instant. */
export function istDayStart(isoDate: string): Date {
  const match = isoDate.match(ISO_DATE);
  if (!match) throw new Error(`Invalid date: ${isoDate}`);
  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)) - IST_OFFSET_MS);
}

/** Exclusive upper bound for an inclusive end date: start of the following IST day. */
export function istDayEndExclusive(isoDate: string): Date {
  return new Date(istDayStart(isoDate).getTime() + DAY_MS);
}

export function isValidIsoDate(value: string): boolean {
  const match = value.match(ISO_DATE);
  if (!match) return false;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().slice(0, 10) === value;
}

/** Today's date (YYYY-MM-DD) in IST. */
export function todayIsoIST(now: Date = new Date()): string {
  return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function startOfTodayIST(now: Date = new Date()): Date {
  return istDayStart(todayIsoIST(now));
}

/** Weeks start on Monday. */
export function startOfWeekIST(now: Date = new Date()): Date {
  const dayOfWeek = new Date(now.getTime() + IST_OFFSET_MS).getUTCDay(); // 0 = Sunday
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  return new Date(startOfTodayIST(now).getTime() - daysSinceMonday * DAY_MS);
}

const displayFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: DISPLAY_TIMEZONE,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

/** e.g. "14 Oct 2026, 10:41 am" */
export function formatDateTimeIST(date: Date | null): string {
  return date ? displayFormatter.format(date) : "—";
}

/** e.g. "2026-10-14 10:41 IST" — sortable text for spreadsheet exports. */
export function formatExportDateIST(date: Date | null): string {
  if (!date) return "";
  const shifted = new Date(date.getTime() + IST_OFFSET_MS).toISOString();
  return `${shifted.slice(0, 10)} ${shifted.slice(11, 16)} IST`;
}

/** e.g. "14 Oct 2026" for a YYYY-MM-DD string. */
export function formatIsoDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
