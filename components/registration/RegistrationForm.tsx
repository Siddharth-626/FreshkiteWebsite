"use client";

import { useRef, useState } from "react";
import { BRANCH_OPTIONS, FREE_TRAINING } from "@/lib/constants";
import { FIELD_LIMITS, validateRegistration, type RegistrationErrors, type RegistrationField } from "@/lib/registration";
import type { RegistrationInput } from "@/types";

// Firebase is loaded on demand so it isn't part of the page's initial download;
// it starts loading as soon as the student focuses the form.
let serviceModule: Promise<typeof import("@/lib/registration-service")> | undefined;
function loadRegistrationService() {
  serviceModule ??= import("@/lib/registration-service").catch((err) => {
    serviceModule = undefined; // allow a retry after a failed chunk download
    throw err;
  });
  return serviceModule;
}

const OTHER_BRANCH = "__other__";

interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  collegeName: string;
  branchChoice: string;
  branchOther: string;
}

const EMPTY_VALUES: FormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  collegeName: "",
  branchChoice: "",
  branchOther: "",
};

const FIELD_ORDER: RegistrationField[] = ["fullName", "email", "phoneNumber", "collegeName", "branch"];

function toInput(values: FormValues): RegistrationInput {
  return {
    fullName: values.fullName,
    email: values.email,
    phoneNumber: values.phoneNumber,
    collegeName: values.collegeName,
    branch: values.branchChoice === OTHER_BRANCH ? values.branchOther : values.branchChoice,
  };
}

type Status = "idle" | "submitting" | "success" | "error";

export default function RegistrationForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<RegistrationField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = status === "submitting";
  const isOtherBranch = values.branchChoice === OTHER_BRANCH;

  function fieldFor(name: keyof FormValues): RegistrationField {
    return name === "branchChoice" || name === "branchOther" ? "branch" : name;
  }

  function revalidate(next: FormValues, field: RegistrationField) {
    const { errors: nextErrors } = validateRegistration(toInput(next));
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.name as keyof FormValues;
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    const field = fieldFor(name);
    // Only re-check fields the student has already left, so errors don't appear mid-typing.
    if (touched[field]) revalidate(next, field);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.name as keyof FormValues;
    // Leaving the branch dropdown to type a custom department shouldn't flag an error yet.
    if (name === "branchChoice" && isOtherBranch) return;
    const field = fieldFor(name);
    setTouched((prev) => ({ ...prev, [field]: true }));
    revalidate(values, field);
  }

  function focusField(field: RegistrationField) {
    const name = field === "branch" ? (isOtherBranch ? "branchOther" : "branchChoice") : field;
    const element = formRef.current?.elements.namedItem(name);
    if (element instanceof HTMLElement) element.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const { errors: validationErrors, data } = validateRegistration(toInput(values));
    setErrors(validationErrors);
    setTouched({ fullName: true, email: true, phoneNumber: true, collegeName: true, branch: true });
    if (!data) {
      const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field]);
      if (firstInvalid) focusField(firstInvalid);
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setSubmitError("");

    let service: Awaited<ReturnType<typeof loadRegistrationService>>;
    try {
      service = await loadRegistrationService();
    } catch {
      setSubmitError("We couldn't reach our servers. Please check your internet connection and try again.");
      setStatus("error");
      submittingRef.current = false;
      return;
    }

    try {
      await service.submitRegistration(data);
      setValues(EMPTY_VALUES);
      setErrors({});
      setTouched({});
      setStatus("success");
    } catch (err) {
      setSubmitError(
        err instanceof service.RegistrationError ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center" role="status" aria-live="polite">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center">
          <svg className="w-7 h-7 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-[#0F172A] mb-3 tracking-tight">{FREE_TRAINING.successTitle}</h3>
        <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">{FREE_TRAINING.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] underline underline-offset-4"
        >
          Register another student
        </button>
      </div>
    );
  }

  // With "Other" selected, the branch error belongs to the text input, not the dropdown.
  const inputClass = (field: RegistrationField, suppressError = false) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
      errors[field] && !suppressError ? "border-red-400 bg-red-50/40" : "border-slate-300 hover:border-slate-400"
    }`;

  const describedBy = (field: RegistrationField, hintId?: string) =>
    [errors[field] ? `${field}-error` : null, hintId].filter(Boolean).join(" ") || undefined;

  const errorText = (field: RegistrationField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-[#0F172A] mb-1.5">Student Registration</h3>
      <p className="text-sm text-slate-500 mb-6">All fields are required.</p>

      <div aria-live="assertive">
        {status === "error" && (
          <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4" role="alert">
            <svg className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={() => void loadRegistrationService().catch(() => undefined)}
        noValidate
        className="space-y-4"
        aria-busy={isSubmitting}
      >
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={FIELD_LIMITS.fullName.max}
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy("fullName")}
            placeholder="e.g. Arjun Kumar"
            className={inputClass("fullName")}
          />
          {errorText("fullName")}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={FIELD_LIMITS.email.max}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder="e.g. arjun@gmail.com"
            className={inputClass("email")}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone Number <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={20}
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.phoneNumber)}
            aria-describedby={describedBy("phoneNumber", "phoneNumber-hint")}
            placeholder="e.g. 98765 43210"
            className={inputClass("phoneNumber")}
          />
          <p id="phoneNumber-hint" className="mt-1.5 text-xs text-slate-500">
            10-digit Indian mobile number, or include the country code (e.g. +1…) for other countries.
          </p>
          {errorText("phoneNumber")}
        </div>

        <div>
          <label htmlFor="collegeName" className="block text-sm font-semibold text-slate-700 mb-1.5">
            College Name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="collegeName"
            name="collegeName"
            type="text"
            autoComplete="organization"
            required
            maxLength={FIELD_LIMITS.collegeName.max}
            value={values.collegeName}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.collegeName)}
            aria-describedby={describedBy("collegeName")}
            placeholder="e.g. Government College of Engineering"
            className={inputClass("collegeName")}
          />
          {errorText("collegeName")}
        </div>

        <div>
          <label htmlFor="branchChoice" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Branch / Department <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <select
            id="branchChoice"
            name="branchChoice"
            required
            value={values.branchChoice}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.branch) && !isOtherBranch}
            aria-describedby={isOtherBranch ? undefined : describedBy("branch")}
            className={inputClass("branch", isOtherBranch)}
          >
            <option value="" disabled>
              Select your branch
            </option>
            {BRANCH_OPTIONS.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
            <option value={OTHER_BRANCH}>Other</option>
          </select>
          {isOtherBranch && (
            <div className="mt-3">
              <label htmlFor="branchOther" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Specify your branch / department <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="branchOther"
                name="branchOther"
                type="text"
                required
                maxLength={FIELD_LIMITS.branch.max}
                value={values.branchOther}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.branch)}
                aria-describedby={describedBy("branch")}
                placeholder="e.g. Biomedical Engineering"
                className={inputClass("branch")}
              />
            </div>
          )}
          {errorText("branch")}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-6 py-4 rounded-xl hover:bg-[#1d4ed8] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 text-sm mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {FREE_TRAINING.submittingLabel}
            </>
          ) : (
            FREE_TRAINING.submitLabel
          )}
        </button>

        <p className="text-xs text-center text-slate-500 pt-1">
          Your details are used only to contact you about this training program.
        </p>
      </form>
    </div>
  );
}
