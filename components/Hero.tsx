export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0F172A] flex items-center overflow-hidden">
      {/* Subtle dot grid background */}
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

      {/* Radial glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: Content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className="text-xs font-semibold text-[#93c5fd] tracking-wide uppercase">
              2026 Batch — Enrollments Open
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            From Beginner to{" "}
            <span className="text-[#2563EB] relative">
              Software Engineer
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C50 1.5 150 1.5 299 5.5"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            <br />
            <span className="text-slate-400 text-3xl sm:text-4xl lg:text-[2.5rem] font-bold">
              at your own pace
            </span>
          </h1>

          {/* Domain pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: "🌐 Web Dev", color: "border-[#2563EB]/30 text-[#93c5fd] bg-[#2563EB]/10" },
              { label: "🤖 AI Engineering", color: "border-[#22C55E]/30 text-[#86efac] bg-[#22C55E]/10" },
              { label: "🔌 Embedded Systems", color: "border-[#FACC15]/30 text-[#fde047] bg-[#FACC15]/10" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${color}`}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Subheadline */}
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
            Practical, live classes across Web, AI, and Embedded Systems.
            Industry mentors with 20+ years of real-world experience.
            Placements at top software companies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
            >
              Apply Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Brochure
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["A", "P", "R", "S", "K"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    backgroundColor: ["#2563EB", "#22C55E", "#7c3aed", "#dc2626", "#0891b2"][i],
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-white font-semibold">100+</span> students placed
            </div>
          </div>
        </div>

        {/* Right: Visual Panel */}
        <div className="hidden lg:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 relative">
            {/* Top label */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                Program Overview
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            {/* Domain: Web */}
            <div className="mb-3 border border-[#2563EB]/20 bg-[#2563EB]/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-sm">🌐</span>
                <span className="text-xs font-bold text-[#93c5fd] uppercase tracking-wider">
                  Web Development
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Node.js", "Spring Boot", "Docker", "SQL"].map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#2563EB]/10 border border-[#2563EB]/15 text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Domain: AI */}
            <div className="mb-3 border border-[#22C55E]/20 bg-[#22C55E]/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-sm">🤖</span>
                <span className="text-xs font-bold text-[#86efac] uppercase tracking-wider">
                  AI Engineering
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["LLM Foundations", "RAG", "AI Agents", "Multi-Agent", "Guardrails"].map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#22C55E]/10 border border-[#22C55E]/15 text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Domain: Embedded */}
            <div className="mb-5 border border-[#FACC15]/20 bg-[#FACC15]/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-sm">🔌</span>
                <span className="text-xs font-bold text-[#fde047] uppercase tracking-wider">
                  Embedded Systems Engineering
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Advanced C", "Linux Kernel", "WLAN Stack", "Embedded Linux", "Debugging"].map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#FACC15]/10 border border-[#FACC15]/15 text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
              {[
                { val: "57 LPA", lbl: "Top Package", color: "#22C55E" },
                { val: "Lifetime", lbl: "Access", color: "#2563EB" },
                { val: "20+ Yrs", lbl: "Mentor Exp.", color: "#FACC15" },
              ].map(({ val, lbl, color }) => (
                <div key={lbl} className="text-center">
                  <div className="text-sm font-bold" style={{ color }}>
                    {val}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>
    </section>
  );
}
