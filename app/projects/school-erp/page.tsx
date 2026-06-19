import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "School ERP – All-in-One School Management System | Freshkite",
  description:
    "Freshkite's School ERP is an all-in-one school management system covering student portals, teacher portals, admin dashboards, attendance, academic tracking, and school operations.",
  keywords: [
    "school ERP",
    "school management system India",
    "student portal software",
    "attendance management",
    "academic tracking",
    "school admin software",
    "education ERP",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/projects/school-erp",
    siteName: "Freshkite",
    title: "School ERP – All-in-One School Management System | Freshkite",
    description:
      "An all-in-one school management system that streamlines administration, student management, academic operations, and communication.",
    images: [{ url: "https://freshkite.in/og-image.png", width: 1200, height: 630, alt: "Freshkite School ERP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "School ERP – All-in-One School Management System | Freshkite",
    description: "Streamline administration, academics, and communication with one school management platform.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: { canonical: "https://freshkite.in/projects/school-erp" },
};

const COLOR = "#22C55E";

const FEATURES = [
  {
    icon: "👨‍🎓",
    title: "Student Portal",
    description:
      "Students access timetables, results, attendance records, and school announcements through a personalised, mobile-friendly portal.",
  },
  {
    icon: "👩‍🏫",
    title: "Teacher Portal",
    description:
      "Teachers manage attendance, enter grades, view class schedules, and communicate with students and parents — all in one place.",
  },
  {
    icon: "🖥️",
    title: "Admin Dashboard",
    description:
      "A comprehensive admin view covering admissions, staff management, fee collection, and real-time operational reporting.",
  },
  {
    icon: "✅",
    title: "Attendance Management",
    description:
      "Mark and monitor student and staff attendance digitally. Generate reports, track trends, and notify parents of absences automatically.",
  },
  {
    icon: "📊",
    title: "Academic Tracking",
    description:
      "Track academic performance across subjects, terms, and years. Identify at-risk students early and report progress to all stakeholders.",
  },
  {
    icon: "⚙️",
    title: "School Operations",
    description:
      "Manage timetables, examination schedules, fee structures, library records, and transport — all within the ERP.",
  },
];

const BENEFITS = [
  {
    title: "School Administrators",
    description:
      "Manage admissions, staff, fees, and operations from a single admin dashboard with real-time reporting.",
  },
  {
    title: "Teachers & Faculty",
    description:
      "Record attendance, update grades, plan academics, and communicate with students and parents easily.",
  },
  {
    title: "Students & Parents",
    description:
      "Access timetables, results, attendance records, and school announcements through a dedicated portal.",
  },
];

export default function SchoolERPPage() {
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
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#22C55E]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
                Freshkite Product
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              School <span style={{ color: COLOR }}>ERP</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium mb-4">
              All-in-one school management platform
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg">
              An all-in-one school management system that streamlines administration, student management,
              academic operations, and communication.
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
              style={{ background: `linear-gradient(135deg, #22C55E15, #22C55E05)`, aspectRatio: "16/10" }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-[0.08] select-none">
                🏫
              </div>
              <Image
                src="/images/project_images/SchoolApp.png"
                alt="School ERP"
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
              One platform for every stakeholder in your school
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              School ERP brings every aspect of institutional management under one roof. Administrators manage
              operations, teachers handle academics, and students access their information — all through
              purpose-built portals. Designed to eliminate manual paperwork and fragmented systems, School ERP
              helps schools run efficiently and communicate effectively with every stakeholder.
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
              Covering every dimension of school management — from daily attendance to long-term academic tracking.
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
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#22C55E]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Who is it <span style={{ color: COLOR }}>built for?</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              School ERP serves every role — from the administrator in the office to the student in the classroom.
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
              Schedule a demo with Freshkite and explore how School ERP can transform your institution&apos;s operations.
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
