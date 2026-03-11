"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  mobile: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d+$/.test(data.mobile.trim())) {
    errors.mobile = "Mobile number must contain only digits";
  } else if (data.mobile.trim().length < 10) {
    errors.mobile = "Mobile number must be at least 10 digits";
  }

  return errors;
}

function triggerBrochureDownload() {
  const link = document.createElement("a");
  link.href = "/freshkite-brochure.pdf";
  link.download = "freshkite-brochure.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function BrochureSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmittingRef = useRef(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmittingRef.current) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    isSubmittingRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.name.trim(),
          user_email: formData.email.trim(),
          user_mobile: formData.mobile.trim(),
          timestamp: new Date().toLocaleString("en-IN", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          }),
        },
        { publicKey }
      );

      setStatus("success");

      // Auto-trigger download after a short delay so success state renders first
      setTimeout(() => {
        triggerBrochureDownload();
      }, 400);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or call us directly."
      );
      isSubmittingRef.current = false;
    }
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMessage("");
    isSubmittingRef.current = false;
  }

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <section id="brochure" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Info ───────────────────────────────────────── */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                Free Download
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
              Get the complete{" "}
              <span className="text-[#2563EB]">Program Guide</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Everything you need to make your decision — curriculum, fees, batch
              schedule, and placement data — in one detailed PDF.
            </p>

            <ul className="space-y-3">
              {[
                "6-course curriculum with detailed syllabus",
                "Phase I & Phase II roadmap breakdown",
                "Mentor profiles and industry backgrounds",
                "Placement statistics and company list",
                "Fee structure and batch schedule",
                "Admission process and eligibility criteria",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <div className="w-5 h-5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-[#22C55E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Form / Success ─────────────────────────────── */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8">
            {isSuccess ? (
              /* ── Success State ── */
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#22C55E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                  Thank you!
                </h3>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed max-w-xs">
                  Your brochure download is ready. If it didn&apos;t start
                  automatically, use the button below.
                </p>

                <button
                  onClick={triggerBrochureDownload}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm w-full"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Brochure (PDF)
                </button>

                <p className="mt-5 text-xs text-slate-400 leading-relaxed">
                  We&apos;ll also reach out if you have questions about the program.
                </p>
              </div>
            ) : (
              /* ── Form State ── */
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1.5">
                  Get your free copy
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Submit your details to unlock the brochure.
                </p>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                    <svg
                      className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 font-medium">
                        {errorMessage}
                      </p>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-1 text-xs text-red-600 underline hover:text-red-800 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="mb-4">
                  <label
                    htmlFor="brochure-name"
                    className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="brochure-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. Arjun Kumar"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="brochure-email"
                    className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="brochure-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. arjun@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="mb-6">
                  <label
                    htmlFor="brochure-mobile"
                    className="block text-sm font-semibold text-[#0F172A] mb-1.5"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="brochure-mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-[#0F172A] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.mobile
                        ? "border-red-400 bg-red-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1d4ed8] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/20 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-none text-sm"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Brochure
                    </>
                  )}
                </button>

                <p className="mt-4 text-xs text-center text-slate-400">
                  No spam. Your details are only used to share program updates.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
