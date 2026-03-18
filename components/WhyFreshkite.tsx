import { WHY_US, DOMAINS } from "@/lib/constants";

export default function WhyFreshkite() {
  return (
    <>
      {/* ── Domains Section ──────────────────────────────────────────── */}
      <section id="domains" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0F172A]/5 border border-[#0F172A]/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-[#0F172A] tracking-wide uppercase">
                All Domains Covered
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
              Web. AI. Embedded. DSA.{" "}
              <span className="text-[#2563EB]">One program.</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Most training centres teach a single stack. Freshkite gives you depth across
              all four major software disciplines — so you can choose your path with clarity,
              not guesswork.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {DOMAINS.map((domain) => (
              <div
                key={domain.title}
                className={`border rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${domain.bg}`}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white shadow-sm"
                  >
                    {domain.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{domain.title}</h3>
                </div>

                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{domain.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${domain.pill}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us Section ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Subtle grid */}
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
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                Not Like Other Training Centres
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
              We teach the way{" "}
              <span className="text-[#2563EB]">the industry works</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Forget passive lectures and pre-recorded videos. At Freshkite, every class is live,
              every session is hands-on, and every student builds something real.
            </p>
          </div>

          {/* Differentiator cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-0.5 ${
                  index === 0
                    ? "bg-[#2563EB] border-[#2563EB] shadow-lg shadow-[#2563EB]/20"
                    : "bg-white/[0.04] border-white/8 hover:bg-white/[0.07] hover:border-white/15"
                }`}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3
                  className={`text-base font-bold mb-2 ${
                    index === 0 ? "text-white" : "text-white"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    index === 0 ? "text-blue-100" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom comparison strip */}
          <div className="mt-14 border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Other centres */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Typical Training Centres
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Pre-recorded videos, no interaction",
                    "Theory-heavy, project-light",
                    "One domain, limited scope",
                    "Large classrooms, no personal attention",
                    "Certificates with no real portfolio",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freshkite */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider">
                    Freshkite
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Live sessions, real-time Q&A every class",
                    "Build projects from day one",
                    "Web, AI, Embedded & DSA — full spectrum",
                    "Small batches, mentored individually",
                    "GitHub portfolio that gets you hired",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
