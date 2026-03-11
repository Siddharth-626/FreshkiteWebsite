import { STEPS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight">
            Six steps to your{" "}
            <span className="text-[#2563EB]">first software role</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A clear, repeatable process from day one of applying to the day you
            get placed.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((step, index) => {
            const isLast = index === STEPS.length - 1;
            return (
              <div
                key={step.step}
                className={`relative group rounded-2xl p-7 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isLast
                    ? "bg-[#2563EB] border-[#2563EB] shadow-lg shadow-[#2563EB]/25"
                    : "bg-white border-slate-200 hover:border-[#2563EB]/30"
                }`}
              >
                {/* Step number badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0 ${
                      isLast
                        ? "bg-white/20 text-white"
                        : "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30"
                    }`}
                  >
                    {step.step}
                  </div>
                  {/* Connector dots (desktop, not last in row, not last step) */}
                  {!isLast && index % 3 !== 2 && (
                    <div className="hidden lg:flex flex-1 items-center gap-1 absolute -right-3 top-[2.1rem]">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm z-10">
                        <svg
                          className="w-3 h-3 text-[#2563EB]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <h3
                  className={`text-base font-bold mb-2 ${
                    isLast ? "text-white" : "text-[#0F172A]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isLast ? "text-blue-100" : "text-slate-500"
                  }`}
                >
                  {step.description}
                </p>

                {/* "Get Placed" ribbon */}
                {isLast && (
                  <div className="mt-5 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Your goal
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
