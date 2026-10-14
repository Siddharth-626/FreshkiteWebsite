import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/registration/RegistrationForm";
import { CONTACT, FREE_TRAINING } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Java & Problem Solving Training for College Students | Freshkite",
  description:
    "Register for Freshkite's free one-week Java and problem solving training. Strengthen your programming foundation, and top performers will be considered for a three-month internship.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/register",
    siteName: "Freshkite",
    title: "Free One-Week Java & Problem Solving Training | Freshkite",
    description:
      "A free one-week training for college students. Learn Java fundamentals and problem solving with Freshkite.",
    images: [{ url: "https://freshkite.in/og-image.png", width: 1200, height: 630, alt: "Freshkite Free Java Training" }],
  },
  alternates: { canonical: "https://freshkite.in/register" },
};

export default function RegisterPage() {
  return (
    <main>
      <Navbar />

      <section className="relative bg-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 bg-[#22C55E]/10 border border-[#22C55E]/25 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
                {FREE_TRAINING.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              {FREE_TRAINING.headline}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#93c5fd] mb-5 leading-snug">
              {FREE_TRAINING.subheadline}
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
              {FREE_TRAINING.description}
            </p>

            <a
              href="#register-form"
              className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-7 py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              {FREE_TRAINING.cta}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="register-form" className="bg-[#F8FAFC] py-20 lg:py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <span className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase">Program Highlights</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0F172A] tracking-tight mb-8">
              What you&apos;ll get in one week
            </h2>

            <ul className="space-y-4 mb-10">
              {FREE_TRAINING.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-[#22C55E]/15 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-700 text-[15px] leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0F172A] mb-2">Internship eligibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{FREE_TRAINING.eligibility}</p>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              Questions? Call us at{" "}
              <a href={`tel:+91${CONTACT.phone1}`} className="font-semibold text-[#2563EB] hover:underline">
                {CONTACT.phone1Display}
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-3">
            <RegistrationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
