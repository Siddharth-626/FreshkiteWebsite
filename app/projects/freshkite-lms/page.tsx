import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Freshkite LMS – Complete Learning Management Platform",
  description:
    "Freshkite LMS is a complete learning management platform for courses, video learning, assignments, progress tracking, and student dashboards. Built for training institutes, educators, and learners.",
  keywords: [
    "Freshkite LMS",
    "learning management system",
    "online course platform India",
    "student portal",
    "e-learning software",
    "course management",
    "education technology",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/projects/freshkite-lms",
    siteName: "Freshkite",
    title: "Freshkite LMS – Complete Learning Management Platform",
    description:
      "A complete learning management platform where students can access courses, videos, documents, assignments, and progress tracking in one place.",
    images: [{ url: "https://freshkite.in/og-image.png", width: 1200, height: 630, alt: "Freshkite LMS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshkite LMS – Complete Learning Management Platform",
    description: "Complete LMS for modern education — courses, videos, assessments, and progress tracking.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: { canonical: "https://freshkite.in/projects/freshkite-lms" },
};

const COLOR = "#2563EB";

const FEATURES = [
  {
    icon: "📚",
    title: "Course Management",
    description:
      "Create, organise, and publish structured courses with modules, lessons, and prerequisites — all from an intuitive admin interface.",
  },
  {
    icon: "🎬",
    title: "Video Learning",
    description:
      "Upload and stream course videos with chapter markers, playback controls, and auto-progress saving so students never lose their place.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description:
      "Real-time dashboards show students and instructors exactly where they are in each course, what's completed, and what's next.",
  },
  {
    icon: "📄",
    title: "Documents & Resources",
    description:
      "Attach PDFs, slides, code files, and reference materials to any lesson so all study resources live alongside the content.",
  },
  {
    icon: "✅",
    title: "Assessments",
    description:
      "Design quizzes, assignments, and projects with configurable grading. Auto-grade objective questions; review subjective ones manually.",
  },
  {
    icon: "🖥️",
    title: "Student Dashboard",
    description:
      "A clean, personalised dashboard showing enrolled courses, upcoming deadlines, recent activity, and achievement badges.",
  },
];

const BENEFITS = [
  {
    title: "Training Institutes",
    description:
      "Deliver structured programs with clear learning paths, assignments, and progress tracking for each student cohort.",
  },
  {
    title: "Educators & Mentors",
    description:
      "Upload course content, set assessments, and monitor student performance — all from one dashboard.",
  },
  {
    title: "Students & Learners",
    description:
      "Access all your courses, videos, and resources in one place. Track your own progress and stay on schedule.",
  },
];

export default function FreshkiteLMSPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] bg-[#0F172A] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-xs font-semibold text-[#93c5fd] tracking-wide uppercase">
                Freshkite Product
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              Freshkite <span className="text-[#2563EB]">LMS</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium mb-4">
              Complete learning management for modern education
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              A complete learning management platform where students can access courses, videos, documents,
              assignments, learning paths, and progress tracking in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
              >
                Request Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                ← Back to Products
              </a>
            </div>
          </div>

          {/* Product image */}
          <div className="hidden lg:block">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: `linear-gradient(135deg, #2563EB15, #2563EB05)`, aspectRatio: "16/10" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-[0.08] select-none">
                🎓
              </div>
              <Image
                src="/images/project_images/lms.png"
                alt="Freshkite LMS"
                fill
                className="object-cover"
                priority
                sizes="50vw"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">Product Overview</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
              Everything you need to run a world-class learning program
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Freshkite LMS is built for institutions and educators who want to deliver structured, engaging
              learning experiences. From course creation to student progress tracking, every feature is designed
              to reduce administrative overhead while maximising learning outcomes. Whether you run a training
              institute, university, or corporate learning program, Freshkite LMS adapts to your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
              Platform <span style={{ color: COLOR }}>Features</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Built for the complete learning lifecycle — from content delivery to assessment and progress analytics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
                style={{ borderTop: `3px solid ${COLOR}` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}20` }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Who is it <span className="text-[#2563EB]">built for?</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Freshkite LMS is designed for every stakeholder in the learning ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 font-bold text-xs"
                  style={{ backgroundColor: `${COLOR}20`, color: COLOR }}
                >
                  ✓
                </div>
                <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${COLOR}08, ${COLOR}03)`, border: `1px solid ${COLOR}20` }}
          >
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
              Interested in this solution?
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md mx-auto">
              Schedule a demo with Freshkite and see how the LMS can transform your institution&apos;s learning experience.
            </p>
            <a
              href="/#apply"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
              style={{ backgroundColor: COLOR, boxShadow: `0 0 0 0 ${COLOR}40` }}
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
