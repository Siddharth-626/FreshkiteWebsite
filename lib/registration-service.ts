// Public registration write path.
//
// The site is a static export (no server runtime), so the browser writes directly to Firestore.
// Each registration is an atomic batch of two documents:
//   studentRegistrations/{autoId}       — the registration itself
//   registrationEmails/{normalizedEmail} — a create-only lock that enforces one registration per email
// firestore.rules validates every field, binds the two documents together with getAfter(), and
// denies all public reads, so duplicates are rejected server-side without exposing any records.

import { FirebaseError } from "firebase/app";
import { collection, doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { getDb, FirebaseNotConfiguredError } from "@/lib/firebase";
import { EMAIL_LOCKS_COLLECTION, REGISTRATIONS_COLLECTION } from "@/lib/registration";
import type { RegistrationInput } from "@/types";

const SUBMIT_TIMEOUT_MS = 20_000;

export type RegistrationErrorCode = "rejected" | "network" | "timeout" | "unavailable" | "unknown";

export class RegistrationError extends Error {
  constructor(public code: RegistrationErrorCode, message: string) {
    super(message);
    this.name = "RegistrationError";
  }
}

const MESSAGES: Record<RegistrationErrorCode, string> = {
  rejected:
    "We couldn't complete your registration. If you have already registered with this email address, you don't need to register again. Otherwise, please check your details and try again.",
  network:
    "You appear to be offline. Please check your internet connection and try again.",
  timeout:
    "We couldn't confirm your registration because the connection timed out. Please check your internet connection and try again. If you submitted before, your registration may already have been received.",
  unavailable:
    "Registration is temporarily unavailable. Please try again later or contact us by phone.",
  unknown: "Something went wrong while submitting your registration. Please try again.",
};

function fail(code: RegistrationErrorCode): never {
  throw new RegistrationError(code, MESSAGES[code]);
}

/** Resolves only after Firestore confirms the write. `data` must already be validated and normalized. */
export async function submitRegistration(data: RegistrationInput): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) fail("network");

  let db;
  try {
    db = getDb();
  } catch (err) {
    console.error("Registration unavailable:", err instanceof FirebaseNotConfiguredError ? err.message : err);
    fail("unavailable");
  }

  const registrationRef = doc(collection(db, REGISTRATIONS_COLLECTION));
  const emailLockRef = doc(db, EMAIL_LOCKS_COLLECTION, data.email);

  const batch = writeBatch(db);
  batch.set(registrationRef, {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    collegeName: data.collegeName,
    branch: data.branch,
    status: "registered",
    registeredAt: serverTimestamp(),
  });
  batch.set(emailLockRef, {
    registrationId: registrationRef.id,
    createdAt: serverTimestamp(),
  });

  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => resolve("timeout"), SUBMIT_TIMEOUT_MS);
  });

  try {
    const result = await Promise.race([batch.commit(), timeout]);
    if (result === "timeout") fail("timeout");
  } catch (err) {
    if (err instanceof RegistrationError) throw err;
    // Log only the error code — never the student's details.
    const code = err instanceof FirebaseError ? err.code : "unknown";
    console.error("Registration write failed:", code);
    if (code === "permission-denied" || code === "already-exists" || code === "invalid-argument") fail("rejected");
    if (code === "unavailable" || code === "deadline-exceeded") fail("network");
    fail("unknown");
  } finally {
    clearTimeout(timer);
  }
}
