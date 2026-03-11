import { CAREER_FEATURES } from "@/lib/constants";

export default function CareerReadiness() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#16a34a] tracking-wide uppercase">
              Career Readiness
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
            We prepare you beyond{" "}
            <span className="text-[#2563EB]">just coding</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Technical skills get you interviews. These skills get you the offer — and keep
            you growing long after placement.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAREER_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#2563EB]/30 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-[#F8FAFC] border border-slate-200 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:border-[#2563EB]/20 group-hover:bg-[#2563EB]/5 transition-all duration-300">
                {feature.icon}
              </div>

              <h3 className="text-base font-bold text-[#0F172A] mb-2.5">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-10 h-10 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
            ✅
          </div>
          <div>
            <div className="font-bold text-[#0F172A] text-sm">
              Placement support up to 12+ LPA
            </div>
            <div className="text-sm text-slate-500 mt-0.5">
              Dedicated placement assistance included in the program — resume prep, referrals,
              and interview scheduling.
            </div>
          </div>
          <a
            href="#apply"
            className="ml-auto flex-shrink-0 bg-[#2563EB] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors whitespace-nowrap"
          >
            Apply Now →
          </a>
        </div>
      </div>
    </section>
  );
}
