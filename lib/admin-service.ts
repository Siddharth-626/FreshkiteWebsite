// Authorized administrative data access. Every call here is enforced by firestore.rules:
// only users with a document at admins/{uid} can read registrations or change their status.

import { FirebaseError } from "firebase/app";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { startOfTodayIST, startOfWeekIST } from "@/lib/dates";
import {
  ADMINS_COLLECTION,
  REGISTRATIONS_COLLECTION,
  isRegistrationStatus,
} from "@/lib/registration";
import type { RegistrationStatus, StudentRegistration } from "@/types";

const FETCH_BATCH_SIZE = 500;
/** Upper bound on records held in the browser for search/filter/export. */
export const MAX_LOADED_RECORDS = 10_000;

export class AdminAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAccessError";
  }
}

/** Converts Firebase errors into messages safe to show an administrator. */
export function describeAdminError(err: unknown, action: string): string {
  if (err instanceof AdminAccessError) return err.message;
  const code = err instanceof FirebaseError ? err.code : "";
  if (code === "permission-denied" || code === "unauthenticated") {
    return "Access denied. Your session may have expired or your administrator access was revoked. Please sign in again.";
  }
  if (code === "unavailable" || code === "deadline-exceeded") {
    return `Couldn't ${action} — the database is unreachable. Check your connection and retry.`;
  }
  if (code === "failed-precondition") {
    return `Couldn't ${action} — a required Firestore index is missing. See docs/FREE_TRAINING_REGISTRATION.md.`;
  }
  return `Couldn't ${action}. Please retry.`;
}

export async function isAuthorizedAdmin(uid: string): Promise<boolean> {
  const snap = await getDoc(doc(getDb(), ADMINS_COLLECTION, uid));
  return snap.exists();
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Tolerates legacy or malformed documents rather than failing the whole list. */
function toRegistration(snap: QueryDocumentSnapshot): StudentRegistration {
  const data = snap.data();
  return {
    id: snap.id,
    fullName: asString(data.fullName),
    email: asString(data.email),
    phoneNumber: asString(data.phoneNumber),
    collegeName: asString(data.collegeName),
    branch: asString(data.branch),
    registeredAt: data.registeredAt instanceof Timestamp ? data.registeredAt.toDate() : null,
    status: isRegistrationStatus(data.status) ? data.status : "registered",
  };
}

export interface DateRange {
  /** Inclusive lower bound. */
  start?: Date;
  /** Exclusive upper bound. */
  endExclusive?: Date;
}

export interface RegistrationLoadResult {
  records: StudentRegistration[];
  /** Total matching the date range in Firestore; differs from records.length only when truncated. */
  totalInRange: number;
  truncated: boolean;
}

function rangeConstraints({ start, endExclusive }: DateRange): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];
  if (start) constraints.push(where("registeredAt", ">=", Timestamp.fromDate(start)));
  if (endExclusive) constraints.push(where("registeredAt", "<", Timestamp.fromDate(endExclusive)));
  return constraints;
}

/**
 * Loads registrations in the date range, newest first, using cursor pagination in
 * batches of 500, up to MAX_LOADED_RECORDS. The date range is applied by Firestore;
 * search and college filters are then applied in the browser over this result.
 */
export async function fetchRegistrations(range: DateRange): Promise<RegistrationLoadResult> {
  const registrations = collection(getDb(), REGISTRATIONS_COLLECTION);
  const base = [...rangeConstraints(range), orderBy("registeredAt", "desc")];

  const records: StudentRegistration[] = [];
  let cursor: QueryDocumentSnapshot | undefined;

  while (records.length < MAX_LOADED_RECORDS) {
    const batchSize = Math.min(FETCH_BATCH_SIZE, MAX_LOADED_RECORDS - records.length);
    const page = await getDocs(
      query(registrations, ...base, ...(cursor ? [startAfter(cursor)] : []), limit(batchSize))
    );
    page.docs.forEach((snap) => records.push(toRegistration(snap)));
    if (page.docs.length < batchSize) {
      return { records, totalInRange: records.length, truncated: false };
    }
    cursor = page.docs[page.docs.length - 1];
  }

  const count = await getCountFromServer(query(registrations, ...rangeConstraints(range)));
  const totalInRange = count.data().count;
  return { records, totalInRange, truncated: totalInRange > records.length };
}

export interface SummaryCounts {
  total: number;
  today: number;
  thisWeek: number;
}

/** Global counts via server-side aggregation — independent of filters and of the load cap. */
export async function fetchSummaryCounts(now: Date = new Date()): Promise<SummaryCounts> {
  const registrations = collection(getDb(), REGISTRATIONS_COLLECTION);
  const since = (date: Date) =>
    getCountFromServer(query(registrations, where("registeredAt", ">=", Timestamp.fromDate(date))));

  const [total, today, thisWeek] = await Promise.all([
    getCountFromServer(registrations),
    since(startOfTodayIST(now)),
    since(startOfWeekIST(now)),
  ]);
  return {
    total: total.data().count,
    today: today.data().count,
    thisWeek: thisWeek.data().count,
  };
}

/** Updates only the status fields; other student data is never written. */
export async function updateRegistrationStatus(
  registrationId: string,
  status: RegistrationStatus,
  adminUid: string
): Promise<void> {
  await updateDoc(doc(getDb(), REGISTRATIONS_COLLECTION, registrationId), {
    status,
    statusUpdatedAt: serverTimestamp(),
    statusUpdatedBy: adminUid,
  });
}
