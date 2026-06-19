import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PrepHire AI – Interview Preparation & Hiring Platform | Freshkite",
  description:
    "PrepHire AI is an AI-powered interview preparation and hiring platform. Students practice mock interviews and coding, while recruiters discover verified talent through performance analytics and a candidate discovery dashboard.",
  keywords: [
    "PrepHire AI",
    "AI mock interview",
    "interview preparation platform India",
    "hiring platform",
    "coding practice",
    "recruiter dashboard",
    "talent discovery",
    "campus hiring",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/projects/prephire",
    siteName: "Freshkite",
    title: "PrepHire AI – Interview Preparation & Hiring Platform | Freshkite",
    description:
      "AI-powered interview preparation for students, and a talent discovery platform for recruiters. Bridge the gap between candidates and companies.",
    images: [{ url: "https://freshkite.in/og-image.png", width: 1200, height: 630, alt: "PrepHire AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepHire AI – Interview Preparation & Hiring Platform | Freshkite",
    description: "Practice AI mock interviews. Discover pre-assessed talent. Hire with confidence.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: { canonical: "https://freshkite.in/projects/prephire" },
};

const COLOR = "#8B5CF6";

const FEATURES = [
  {
    icon: "🤖",
    title: "AI Mock Interviews",
    description:
      "Practice with an AI interviewer that asks contextual questions, evaluates answers in real time, and delivers detailed feedback on communication, accuracy, and confidence.",
  },
  {
    icon: "💻",
    title: "Coding Practice",
    description:
      "A curated library of DSA problems, system design challenges, and language-specific exercises — all solvable directly in the platform with instant evaluation.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Track scores across technical, communication, and behavioural dimensions. Identify weak areas with drill-down reports after every session.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Visualise improvement over time with streak tracking, skill heatmaps, and readiness scores — so candidates know exactly when they're interview-ready.",
  },
  {
    icon: "🏢",
    title: "Recruiter Dashboard",
    description:
      "Recruiters access a verified talent pool ranked by performance data. Filter by skill, score, domain, and readiness to find the right candidates faster.",
  },
  {
    icon: "🔍",
    title: "Candidate Discovery",
    description:
      "Replace CV screening with objective performance data. View candidate interview recordings, scores, and skill assessments before the first conversation.",
  },
];

const BENEFITS = [
  {
    title: "Students & Job Seekers",
    description:
      "Practice interviews with AI, get instant feedback, and build confidence before walking into the real thing.",
  },
  {
    title: "Companies & Recruiters",
    description:
      "Discover pre-assessed candidates, review performance data, and hire faster with greater confidence.",
  },
  {
    title: "Educational Institutions",
    description:
      "Track student interview readiness, identify skill gaps, and measure placement outcomes across batches.",
  },
];

export default function PrepHirePage() {
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
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-xs font-semibold text-[#c4b5fd] tracking-wide uppercase">
                Freshkite Product
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              PrepHire <span style={{ color: COLOR }}>AI</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium mb-4">
              AI-powered interview prep and talent discovery
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              An AI-powered interview preparation and hiring platform helping students practice interviews while
              enabling companies to discover and recruit talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#apply"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
                style={{ backgroundColor: COLOR }}
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
              style={{ background: `linear-gradient(135deg, #8B5CF615, #8B5CF605)`, aspectRatio: "16/10" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-[0.08] select-none">
                ⚡
              </div>
              <Image
                src="/images/project_images/prephite.png"
                alt="PrepHire AI"
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
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ backgroundColor: `${COLOR}08`, border: `1px solid ${COLOR}20` }}
            >
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: COLOR }}>
                Product Overview
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-6 tracking-tight leading-tight">
              From preparation to placement — powered by AI
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              PrepHire AI bridges the gap between candidates and companies. Students practice technical and HR
              interviews with an AI interviewer that gives instant, detailed feedback. Recruiters get access to
              a verified talent pool with performance analytics — replacing guesswork with data-driven hiring.
              For educational institutions, PrepHire completes the placement pipeline from preparation to placement.
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
              Everything needed to prepare candidates and connect them with the right opportunities.
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
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Who is it <span style={{ color: COLOR }}>built for?</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              PrepHire serves candidates, companies, and institutions — completing the hiring loop for all three.
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
              Schedule a demo with Freshkite and explore how PrepHire AI can accelerate placements at your institution.
            </p>
            <a
              href="/#apply"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
              style={{ backgroundColor: COLOR }}
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
