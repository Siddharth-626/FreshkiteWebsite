import { CONTACT } from "@/lib/constants";

export default function FinalCTA() {
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
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-5 py-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
            Admissions Open — Limited Seats
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
          Ready to Start Your{" "}
          <span className="text-[#2563EB]">Software Career?</span>
        </h2>

        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join Freshkite. Six industry-focused courses, lifetime access, and
          full placement support — built for engineers who want real results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href={`tel:${CONTACT.phone1}`}
            className="inline-flex items-center justify-center gap-2.5 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call {CONTACT.phone1Display}
          </a>
          <a
            href={`tel:${CONTACT.phone2}`}
            className="inline-flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call {CONTACT.phone2Display}
          </a>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-white/10 mx-auto mb-8" />

        {/* Address */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-500">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm text-center">{CONTACT.address}</span>
        </div>
      </div>
    </section>
  );
}
