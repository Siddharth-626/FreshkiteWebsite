// Shared validation and normalization for free-training registrations.
// The limits and patterns here are mirrored in firestore.rules — change both together.

import type { RegistrationInput, RegistrationStatus } from "@/types";

export const REGISTRATIONS_COLLECTION = "studentRegistrations";
export const EMAIL_LOCKS_COLLECTION = "registrationEmails";
export const ADMINS_COLLECTION = "admins";

export const FIELD_LIMITS = {
  fullName: { min: 2, max: 100 },
  email: { max: 254 },
  collegeName: { min: 2, max: 150 },
  branch: { min: 2, max: 100 },
} as const;

export const REGISTRATION_STATUSES: readonly RegistrationStatus[] = [
  "registered",
  "contacted",
  "selected",
  "rejected",
];

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  registered: "Registered",
  contacted: "Contacted",
  selected: "Selected",
  rejected: "Rejected",
};

export function isRegistrationStatus(value: unknown): value is RegistrationStatus {
  return typeof value === "string" && (REGISTRATION_STATUSES as readonly string[]).includes(value);
}

// Lowercase only, and no "/" so the address is always a valid Firestore document ID.
export const EMAIL_PATTERN = /^[a-z0-9._%+'-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/;
export const PHONE_PATTERN = /^\+[1-9][0-9]{6,14}$/;

/** Trims and collapses internal whitespace. */
export function normalizeText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

export function normalizeEmail(value: string): string {
  return value.normalize("NFKC").trim().toLowerCase();
}

/**
 * Returns an E.164 number, or null when the input is not a plausible phone number.
 * Indian mobile numbers may be entered with or without +91 / 91 / 0 prefixes.
 */
export function normalizePhone(value: string): string | null {
  let compact = value.replace(/[\s\-().]/g, "");
  if (compact.startsWith("00")) compact = `+${compact.slice(2)}`;

  const indian = compact.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  if (indian) return `+91${indian[1]}`;

  // Anything else claiming to be Indian is invalid.
  if (compact.startsWith("+91")) return null;

  return PHONE_PATTERN.test(compact) ? compact : null;
}

export type RegistrationField = keyof RegistrationInput;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;

function validateLength(
  value: string,
  label: string,
  { min, max }: { min: number; max: number }
): string | undefined {
  if (!value) return `${label} is required`;
  if (value.length < min) return `${label} must be at least ${min} characters`;
  if (value.length > max) return `${label} must be at most ${max} characters`;
  return undefined;
}

/** Validates raw form input. Returns normalized data when valid. */
export function validateRegistration(raw: RegistrationInput): {
  errors: RegistrationErrors;
  data: RegistrationInput | null;
} {
  const fullName = normalizeText(raw.fullName);
  const email = normalizeEmail(raw.email);
  const phoneRaw = raw.phoneNumber.trim();
  const phoneNumber = normalizePhone(phoneRaw);
  const collegeName = normalizeText(raw.collegeName);
  const branch = normalizeText(raw.branch);

  const errors: RegistrationErrors = {};

  const nameError = validateLength(fullName, "Full name", FIELD_LIMITS.fullName);
  if (nameError) errors.fullName = nameError;

  if (!email) errors.email = "Email address is required";
  else if (email.length > FIELD_LIMITS.email.max) errors.email = "Email address is too long";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address";

  if (!phoneRaw) errors.phoneNumber = "Phone number is required";
  else if (!phoneNumber)
    errors.phoneNumber =
      "Please enter a valid 10-digit Indian mobile number, or an international number starting with +";

  const collegeError = validateLength(collegeName, "College name", FIELD_LIMITS.collegeName);
  if (collegeError) errors.collegeName = collegeError;

  const branchError = validateLength(branch, "Branch / department", FIELD_LIMITS.branch);
  if (branchError) errors.branch = branchError;

  if (Object.keys(errors).length > 0 || !phoneNumber) return { errors, data: null };

  return { errors, data: { fullName, email, phoneNumber, collegeName, branch } };
}

/** Case- and whitespace-insensitive key for grouping and searching. */
export function comparisonKey(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}
