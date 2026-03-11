import Image from "next/image";
import { TEAM } from "@/lib/constants";

export default function Team() {
  return (
    <section id="team" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              Our Team
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
            The people behind{" "}
            <span className="text-[#2563EB]">Freshkite</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Industry veterans and passionate educators — working together to help you build a career in software.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative w-full h-64 overflow-hidden bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-extrabold text-[#0F172A] mb-0.5">{member.name}</h3>
                <div className="text-xs font-semibold text-[#2563EB] mb-3">{member.role}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="h-0.5 w-0 group-hover:w-full bg-[#2563EB] transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
