import { CONTACT } from "@/lib/constants";

export default function ContactMap() {
  const mapsEmbedUrl =
    "https://maps.google.com/maps?q=Freshkite+Cuddalore+Tamil+Nadu+India&output=embed&z=17&hl=en";

  const mapsDirectionsUrl =
    "https://www.google.com/maps/place/Freshkite/@11.7253444,79.7659441,18z/data=!3m1!4b1!4m6!3m5!1s0x3a5499d5e4b4aeb3:0xbac4372b71186d63!8m2!3d11.7253418!4d79.7672316!16s%2Fg%2F11qq9xk5ls";

  return (
    <section id="contact" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/8 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
              Find Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Come Visit Our Campus
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
            Walk in anytime, meet the team, and see how we teach. No appointment needed.
          </p>
        </div>

        {/* Map + Contact card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200">
          {/* ── Google Map ── */}
          <div className="lg:col-span-3 h-72 sm:h-96 lg:h-auto min-h-[420px] relative">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Freshkite — Cuddalore"
              className="w-full h-full"
            />
          </div>

          {/* ── Contact panel ── */}
          <div className="lg:col-span-2 bg-[#0F172A] flex flex-col">
            {/* Top — address block */}
            <div className="p-8 flex-1">
              {/* Campus label */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#2563EB]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                    Our Campus
                  </p>
                  <p className="text-white font-bold text-base leading-tight">
                    KSMS Campus
                  </p>
                </div>
              </div>

              {/* Full address */}
              <address className="not-italic text-slate-400 text-sm leading-loose pl-[52px] mb-6">
                Sivanandhapuram,
                <br />
                Cuddalore OT — 607003
                <br />
                Tamil Nadu, India
              </address>

              {/* Directions link */}
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 ml-[52px] text-xs font-semibold text-[#2563EB] hover:text-[#60a5fa] transition-colors group"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Get Directions
                <svg
                  className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 translate-x-0 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              {/* Divider */}
              <div className="h-px bg-white/8 my-7" />

              {/* Phone numbers */}
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                Call Us
              </p>
              <div className="space-y-3">
                {/* Phone 1 */}
                <a
                  href={`tel:${CONTACT.phone1}`}
                  className="flex items-center gap-3.5 group p-3.5 rounded-xl bg-white/4 border border-white/8 hover:bg-[#2563EB]/15 hover:border-[#2563EB]/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#2563EB] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1d4ed8] transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      Primary
                    </p>
                    <p className="text-white font-bold text-sm tracking-wide">
                      {CONTACT.phone1Display}
                    </p>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-[#2563EB] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 translate-x-0 transition-all duration-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                {/* Phone 2 */}
                <a
                  href={`tel:${CONTACT.phone2}`}
                  className="flex items-center gap-3.5 group p-3.5 rounded-xl bg-white/4 border border-white/8 hover:bg-[#2563EB]/15 hover:border-[#2563EB]/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563EB]/30 group-hover:border-[#2563EB]/40 transition-all duration-200">
                    <svg
                      className="w-4 h-4 text-slate-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      Alternate
                    </p>
                    <p className="text-white font-bold text-sm tracking-wide">
                      {CONTACT.phone2Display}
                    </p>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-[#2563EB] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 translate-x-0 transition-all duration-200 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom — live enrollment strip */}
            <div className="px-8 py-4 border-t border-white/8 bg-[#22C55E]/8 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
              </span>
              <span className="text-xs font-semibold text-[#86efac]">
                Admissions Open — Walk-ins Welcome
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
