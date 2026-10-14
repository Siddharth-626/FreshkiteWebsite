// Excel export of the administrator's current filtered result set (all pages, not just the visible one).

import { formatExportDateIST, todayIsoIST } from "@/lib/dates";
import { STATUS_LABELS } from "@/lib/registration";
import type { StudentRegistration } from "@/types";

export const EXPORT_SHEET_NAME = "Student Registrations";

const COLUMNS: { header: string; value: (r: StudentRegistration) => string }[] = [
  { header: "Registration Date", value: (r) => formatExportDateIST(r.registeredAt) },
  { header: "Student Name", value: (r) => r.fullName },
  { header: "Email", value: (r) => r.email },
  { header: "Phone Number", value: (r) => r.phoneNumber },
  { header: "College", value: (r) => r.collegeName },
  { header: "Branch", value: (r) => r.branch },
  { header: "Status", value: (r) => STATUS_LABELS[r.status] },
];

export function exportFileName(now: Date = new Date()): string {
  return `Freshkite_Student_Registrations_${todayIsoIST(now)}.xlsx`;
}

export async function exportRegistrationsToExcel(records: StudentRegistration[]): Promise<string> {
  if (records.length === 0) throw new Error("There are no registrations to export.");

  // Loaded on demand so the spreadsheet library isn't part of the dashboard's initial bundle.
  const XLSX = await import("xlsx");

  const rows = records.map((record) => COLUMNS.map((column) => column.value(record)));
  // aoa_to_sheet writes every value as a string cell, so student input is never evaluated as a formula.
  const sheet = XLSX.utils.aoa_to_sheet([COLUMNS.map((c) => c.header), ...rows]);

  sheet["!cols"] = COLUMNS.map((column, i) => {
    const longest = rows.reduce((max, row) => Math.max(max, row[i].length), column.header.length);
    return { wch: Math.min(Math.max(longest + 2, 12), 60) };
  });
  sheet["!autofilter"] = { ref: sheet["!ref"] ?? "A1" };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, EXPORT_SHEET_NAME);

  const fileName = exportFileName();
  XLSX.writeFile(workbook, fileName, { compression: true });
  return fileName;
}
