import Image from "next/image";
import { PLACEMENTS } from "@/lib/constants";

export default function Placements() {
  const featured = PLACEMENTS.find((p) => p.featured);
  const others = PLACEMENTS.filter((p) => !p.featured);

  return (
    <section id="placements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#22C55E]/8 border border-[#22C55E]/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs font-semibold text-[#16a34a] tracking-wide uppercase">
              Placement Results
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
            Real students.{" "}
            <span className="text-[#22C55E]">Real packages.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our graduates are landing jobs at top companies across India — from startups to global MNCs.
          </p>
        </div>

        {/* ── Featured — Nishok 57 LPA ── */}
        {featured && (
          <div className="mb-8 relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Dark gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0F172A] to-[#0d1f3c]" />
            {/* Green glow top-right */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right,#94a3b8 1px,transparent 1px),linear-gradient(to bottom,#94a3b8 1px,transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative flex flex-col sm:flex-row items-stretch min-h-[280px]">
              {/* Photo column */}
              <div className="relative w-full sm:w-64 md:w-72 flex-shrink-0 overflow-hidden">
                <div className="relative h-64 sm:h-full min-h-[260px]">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:640px) 100vw, 288px"
                    priority
                  />
                  {/* Photo overlay fade */}
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0F172A]/70 via-transparent to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-center px-8 py-10 flex-1 gap-4">
                {/* Top badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#22C55E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#22C55E]/30">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Highest Placement
                  </span>
                  {featured.qualifier && (
                    <span className="text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {featured.qualifier}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tight leading-none mb-1">
                    {featured.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{featured.role}</p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  {/* LPA */}
                  <div className="flex flex-col">
                    <span className="text-5xl font-black text-[#22C55E] leading-none tracking-tight">
                      {featured.lpa}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 font-medium">Annual Package</span>
                  </div>

                  <div className="w-px h-12 bg-white/10 hidden sm:block" />

                  {/* Company */}
                  {featured.company && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                        <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-white font-extrabold text-lg tracking-wide">{featured.company}</span>
                      </div>
                      <span className="text-xs text-slate-500 mt-1 font-medium text-center">Company</span>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <p className="text-slate-500 text-sm italic border-l-2 border-[#22C55E]/30 pl-3 mt-1">
                  From Freshkite to one of the world&apos;s top semiconductor companies.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Others grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {others.map((p) => (
            <div
              key={p.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-slate-100"
              style={{ borderTop: "3px solid #22C55E" }}
            >
              {/* Square photo — clean, no overlay clutter */}
              <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                />
              </div>

              {/* Info panel */}
              <div className="p-3.5 flex flex-col gap-1 flex-1">

                {/* Name + qualifier */}
                <div className="flex items-start justify-between gap-1">
                  <span className="font-extrabold text-[#0F172A] text-sm leading-tight">
                    {p.name}
                  </span>
                  {p.qualifier && (
                    <span className="flex-shrink-0 text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md leading-tight">
                      {p.qualifier}
                    </span>
                  )}
                </div>

                {/* LPA — big, green, prominent */}
                {p.lpa ? (
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[1.15rem] font-black text-[#22C55E] leading-none tracking-tight">
                      {p.lpa}
                    </span>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                      package
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic mt-0.5">Placed</div>
                )}

                {/* Company */}
                {p.company && (
                  <div className="flex items-center gap-1.5 mt-auto pt-2.5 border-t border-slate-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-600 truncate">
                      {p.company}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom stat strip ── */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[
            { val: "57 LPA", label: "Highest Package", color: "#22C55E" },
            { val: "Qualcomm", label: "Top MNC", color: "#2563EB" },
            { val: "100+", label: "Students Placed", color: "#0F172A" },
          ].map(({ val, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black" style={{ color }}>{val}</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
