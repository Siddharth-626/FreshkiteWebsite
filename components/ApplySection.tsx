"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

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

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Freshkite+Cuddalore+Tamil+Nadu+India&output=embed&z=17&hl=en";
const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Freshkite/@11.7253444,79.7659441,18z/data=!3m1!4b1!4m6!3m5!1s0x3a5499d5e4b4aeb3:0xbac4372b71186d63!8m2!3d11.7253418!4d79.7672316!16s%2Fg%2F11qq9xk5ls";

export default function ApplySection() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", mobile: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
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
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: "skbalarec@gmail.com",
          user_name: formData.name.trim(),
          applicant_email: formData.email.trim(),
          user_mobile: formData.mobile.trim(),
          timestamp: new Date().toLocaleString("en-IN", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          }),
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );

      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
      isSubmittingRef.current = false;
    }
  }

  function handleRetry() {
    setStatus("idle");
    setErrorMessage("");
    isSubmittingRef.current = false;
  }

  const isLoading = status === "loading";
  const firstName = formData.name.trim().split(" ")[0] || "there";

  return (
    <section id="apply" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── SUCCESS STATE ── */}
        {status === "success" ? (
          <div>
            {/* Success header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-5 py-2 mb-6">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
                  Application Received
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
                You&apos;re in,{" "}
                <span className="text-[#22C55E]">{firstName}!</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                Our team will call you within 24 hours. Meanwhile, download
                your brochure and find out how to reach us.
              </p>
            </div>

            {/* Brochure + Map grid */}
            <div className="grid lg:grid-cols-5 gap-6 items-stretch">
              {/* ── Brochure card ── */}
              <div className="lg:col-span-2 bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="w-12 h-12 bg-[#2563EB]/15 border border-[#2563EB]/25 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Program Brochure</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Full curriculum, fees, batch schedule, mentor profiles, and placement stats — all in one PDF.
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {[
                    "Full 9-month curriculum breakdown",
                    "Phase I & Phase II roadmap",
                    "Placement data & company list",
                    "Fee structure & batch schedule",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={triggerBrochureDownload}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure (PDF)
                </button>
              </div>

              {/* ── Map + contact panel ── */}
              <div className="lg:col-span-3 rounded-2xl border border-white/10 overflow-hidden flex flex-col min-h-[420px]">
                {/* Map */}
                <div className="flex-1 relative min-h-[280px]">
                  <iframe
                    src={MAPS_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Freshkite — Cuddalore Campus"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Contact strip */}
                <div className="bg-[#0a101f] border-t border-white/8 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-[#2563EB] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-white font-semibold text-sm">KSMS Campus, Sivanandhapuram</p>
                      <p className="text-slate-500 text-xs mt-0.5">Cuddalore OT — 607003, Tamil Nadu</p>
                      <a
                        href={MAPS_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs text-[#2563EB] hover:text-[#60a5fa] font-semibold transition-colors"
                      >
                        Get Directions
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Phone numbers */}
                  <div className="sm:ml-auto flex flex-col gap-2.5">
                    <a
                      href={`tel:${CONTACT.phone1}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#93c5fd] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {CONTACT.phone1Display}
                    </a>
                    <a
                      href={`tel:${CONTACT.phone2}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#93c5fd] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {CONTACT.phone2Display}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : (

          /* ── FORM STATE (idle / loading / error) ── */
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-5 py-2 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                </span>
                <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
                  Admissions Open — Limited Seats
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                Ready to Start Your{" "}
                <span className="text-[#2563EB]">Software Career?</span>
              </h2>

              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Fill in your details. Our team will reach out within 24 hours,
                and you&apos;ll instantly unlock the full program brochure.
              </p>

              <ul className="space-y-4">
                {[
                  { icon: "📘", text: "Free program brochure — unlocked the moment you apply" },
                  { icon: "📞", text: "Our team calls you within 24 hours to answer questions" },
                  { icon: "🗺️", text: "Campus location and visit details shared" },
                  { icon: "🏆", text: "Placement guidance and support from day one" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-3.5 text-slate-300 text-sm">
                    <span className="text-xl leading-none flex-shrink-0">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-1.5">Apply Now</h3>
              <p className="text-sm text-slate-400 mb-6">
                Submit your details to apply and unlock the brochure.
              </p>

              {/* Error banner */}
              {status === "error" && (
                <div className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-red-300 font-medium">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="mt-1 text-xs text-red-400 underline hover:text-red-300 transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="apply-name" className="block text-sm font-semibold text-slate-200 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="apply-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. Arjun Kumar"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-slate-500 bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.name
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="apply-email" className="block text-sm font-semibold text-slate-200 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="apply-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. arjun@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-slate-500 bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.email
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="apply-mobile" className="block text-sm font-semibold text-slate-200 mb-1.5">
                    Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="apply-mobile"
                    name="mobile"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-white placeholder:text-slate-500 bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] disabled:opacity-60 disabled:cursor-not-allowed ${
                      errors.mobile
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.mobile}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-6 py-4 rounded-xl hover:bg-[#1d4ed8] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:hover:shadow-none text-sm mt-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Apply &amp; Unlock Brochure
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-slate-500 pt-1">
                  No spam. Your details are only used to share program updates.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
