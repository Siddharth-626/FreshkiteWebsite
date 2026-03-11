import { STATS } from "@/lib/constants";

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-slate-100">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 ${
                index !== 0 ? "lg:pl-8" : ""
              }`}
            >
              <div
                className="text-2xl lg:text-3xl font-extrabold mb-1.5 tracking-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 font-medium leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
