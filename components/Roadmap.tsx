import { COURSES } from "@/lib/constants";
import type { Course } from "@/types";

function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
      style={{ borderTop: `3px solid ${course.color}` }}
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Top row: icon + duration badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              backgroundColor: `${course.color}18`,
              border: `1px solid ${course.color}30`,
            }}
          >
            {course.icon}
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              color: course.color,
              backgroundColor: `${course.color}12`,
              border: `1px solid ${course.color}25`,
            }}
          >
            {course.duration}
          </span>
        </div>

        {/* Course title */}
        <h3 className="text-[1.05rem] font-extrabold text-[#0F172A] mb-2 leading-snug">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
          {course.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* Topic pills */}
        <div className="flex flex-wrap gap-1.5">
          {course.topics.map((topic) => (
            <span
              key={topic}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-slate-200 text-slate-600 group-hover:border-slate-300 transition-colors duration-200"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent bar (shows on hover) */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: course.color }}
      />
    </div>
  );
}

export default function Roadmap() {
  return (
    <section id="program" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              Our Courses
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
            Everything you need to become a{" "}
            <span className="text-[#2563EB]">top software engineer</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Six industry-focused courses. Lifetime access. Learn at your own pace — or
            follow our guided path straight to placement.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom callout strip */}
        <div className="mt-10 rounded-2xl bg-[#0F172A] p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {/* Lifetime icon */}
              <svg
                className="w-4 h-4 text-[#22C55E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p className="font-bold text-white text-base">
                All 6 courses. One program. Lifetime access.
              </p>
            </div>
            <p className="text-slate-400 text-sm pl-6">
              Enroll once and unlock everything — plus all future course updates, forever.
            </p>
          </div>
          <a
            href="#apply"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm whitespace-nowrap"
          >
            Enroll Now
            <svg
              className="w-4 h-4"
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
    </section>
  );
}
