import Image from "next/image";
import { FOUNDER } from "@/lib/constants";

export default function FounderSection() {
  return (
    <section id="about" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + credential cards */}
          <div className="relative max-w-sm mx-auto lg:mx-0 w-full">
            {/* Main image area */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl shadow-slate-200/60">
              {/* Founder photo */}
              <Image
                src="/images/freshkite_images/team-images/bala_founder.jpg.jpeg"
                alt="Bala Shanmugam — Founder, Freshkite"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
              {/* Credential card — bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/40 to-transparent p-6 pt-16">
                <div className="text-white font-bold text-lg leading-tight">{FOUNDER.name}</div>
                <div className="text-slate-300 text-sm">{FOUNDER.degree}</div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-4 -right-4 bg-[#2563EB] text-white rounded-2xl p-5 shadow-xl shadow-[#2563EB]/20">
              <div className="text-3xl font-black leading-none">20+</div>
              <div className="text-blue-200 text-xs font-semibold mt-1">Years Exp.</div>
            </div>

            {/* Company badges */}
            <div className="absolute -bottom-5 -left-4 flex gap-2">
              {FOUNDER.companies.map((company) => (
                <div
                  key={company}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
                  <span className="text-xs font-bold text-[#0F172A]">{company}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
              <svg className="w-3 h-3 text-[#2563EB]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                Meet the Founder
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              Trained by someone who has{" "}
              <span className="text-[#2563EB]">built it at scale</span>
            </h2>

            <p className="text-[1.05rem] text-slate-600 mb-5 leading-relaxed">
              Bala Shanmugam brings over two decades of hands-on software engineering experience
              from world-class technology companies. A BE graduate from{" "}
              <strong className="text-[#0F172A] font-semibold">NIT Trichy</strong>, he has built
              complex, large-scale systems at{" "}
              <strong className="text-[#0F172A] font-semibold">Qualcomm</strong> and{" "}
              <strong className="text-[#0F172A] font-semibold">Amdocs</strong> — systems that
              millions of people rely on every day.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
              Freshkite is his commitment to closing the gap between campus learning and industry
              expectations — equipping engineers with real skills, professional mentorship, and
              the confidence to compete at the highest level.
            </p>

            {/* Key credentials */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: "🎓", label: "NIT Trichy", sub: "B.E. Graduate" },
                { icon: "⚡", label: "Qualcomm", sub: "Industry Experience" },
                { icon: "🌐", label: "Amdocs", sub: "Global Telecom" },
                { icon: "📍", label: "Cuddalore", sub: "On-Campus Program" },
              ].map(({ icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors"
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">{label}</div>
                    <div className="text-xs text-slate-500">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-[#2563EB] pl-5 py-1">
              <p className="text-slate-600 italic text-sm leading-relaxed">
                &ldquo;The best engineers aren&apos;t just good at writing code — they understand systems,
                communicate clearly, and solve real problems. That&apos;s what Freshkite trains you for.&rdquo;
              </p>
              <footer className="mt-2 text-xs font-semibold text-[#2563EB]">
                — Bala Shanmugam, Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
