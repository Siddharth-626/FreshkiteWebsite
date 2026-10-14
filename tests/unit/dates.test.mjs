import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatExportDateIST,
  isValidIsoDate,
  istDayEndExclusive,
  istDayStart,
  startOfTodayIST,
  startOfWeekIST,
  todayIsoIST,
} from "../../lib/dates.ts";

test("an IST day starts at 18:30 UTC the previous day", () => {
  assert.equal(istDayStart("2026-10-14").toISOString(), "2026-10-13T18:30:00.000Z");
  assert.equal(istDayEndExclusive("2026-10-14").toISOString(), "2026-10-14T18:30:00.000Z");
});

test("today in IST rolls over at IST midnight, not UTC midnight", () => {
  assert.equal(todayIsoIST(new Date("2026-10-13T18:29:59Z")), "2026-10-13");
  assert.equal(todayIsoIST(new Date("2026-10-13T18:30:00Z")), "2026-10-14");
  assert.equal(startOfTodayIST(new Date("2026-10-13T20:00:00Z")).toISOString(), "2026-10-13T18:30:00.000Z");
});

test("weeks start on Monday in IST", () => {
  // Wednesday 14 Oct 2026, 10:00 IST → Monday 12 Oct 00:00 IST
  assert.equal(startOfWeekIST(new Date("2026-10-14T04:30:00Z")).toISOString(), "2026-10-11T18:30:00.000Z");
  // Sunday 18 Oct 2026, 23:00 IST still belongs to the week starting 12 Oct
  assert.equal(startOfWeekIST(new Date("2026-10-18T17:30:00Z")).toISOString(), "2026-10-11T18:30:00.000Z");
  // Monday 19 Oct 2026, 00:30 IST (Sunday in UTC) starts a new week
  assert.equal(startOfWeekIST(new Date("2026-10-18T19:00:00Z")).toISOString(), "2026-10-18T18:30:00.000Z");
});

test("isValidIsoDate rejects impossible dates", () => {
  assert.equal(isValidIsoDate("2026-02-28"), true);
  assert.equal(isValidIsoDate("2026-02-30"), false);
  assert.equal(isValidIsoDate("2026-13-01"), false);
  assert.equal(isValidIsoDate("14-10-2026"), false);
});

test("export dates are IST and sortable", () => {
  assert.equal(formatExportDateIST(new Date("2026-10-13T20:11:00Z")), "2026-10-14 01:41 IST");
  assert.equal(formatExportDateIST(null), "");
});
