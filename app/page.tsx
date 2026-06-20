import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Freshkite – EdTech Software Solutions | LMS, School ERP & PrepHire AI",
  description:
    "Freshkite builds purpose-built software for modern educational institutions — a complete Learning Management System, all-in-one School ERP, and AI-powered interview & hiring platform.",
  keywords: [
    "EdTech software India",
    "learning management system",
    "school ERP software",
    "AI hiring platform",
    "Freshkite LMS",
    "PrepHire AI",
    "school management system",
    "education technology company India",
    "institute management software",
  ],
  authors: [{ name: "Bala Shanmugam" }],
  creator: "Freshkite",
  publisher: "Freshkite",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in",
    siteName: "Freshkite",
    title: "Freshkite – EdTech Software Solutions",
    description:
      "Freshkite builds software for modern education — LMS, School ERP, and AI-powered hiring platform. Purpose-built for educational institutions.",
    images: [
      {
        url: "https://freshkite.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freshkite – EdTech Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshkite – EdTech Software Solutions",
    description:
      "LMS, School ERP, and PrepHire AI — software built for modern educational institutions.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: { canonical: "https://freshkite.in" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Freshkite",
  description:
    "EdTech software company building learning management, school ERP, and AI-powered hiring solutions for educational institutions.",
  url: "https://freshkite.in",
  telephone: ["+918489186717", "+919840021301"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "KSMS Campus, Sivanandhapuram",
    addressLocality: "Cuddalore OT",
    postalCode: "607003",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: "Bala Shanmugam",
    alumniOf: { "@type": "CollegeOrUniversity", name: "NIT Trichy" },
  },
};

const WHY_PRODUCTS = [
  {
    icon: "🎯",
    title: "Purpose-built for education",
    description:
      "Every feature is designed around how institutions actually operate — not generic software adapted for education.",
  },
  {
    icon: "🔗",
    title: "Integrated product suite",
    description:
      "LMS, ERP, and hiring work together. Data flows between platforms so institutions get one unified view.",
  },
  {
    icon: "📊",
    title: "Data-driven decisions",
    description:
      "Real-time dashboards across all products give administrators, educators, and students the information they need to act.",
  },
  {
    icon: "🚀",
    title: "Built by practitioners",
    description:
      "Designed by educators and engineers with 20+ years of industry experience — not just product managers.",
  },
  {
    icon: "🛡️",
    title: "Reliable and secure",
    description:
      "Production-grade infrastructure with data privacy, access controls, and uptime commitments institutions can depend on.",
  },
  {
    icon: "🤝",
    title: "Ongoing partnership",
    description:
      "We support institutions through onboarding, training, and continuous product improvement — not just at deployment.",
  },
];

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#0F172A] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-[#22C55E]/4 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 w-full">
          {/* Centre-aligned headline */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2.5 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="text-xs font-semibold text-[#93c5fd] tracking-wide uppercase">
                EdTech Software Solutions
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
              Software built for{" "}
              <span className="text-[#2563EB] relative">
                modern education
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 400 8" fill="none">
                  <path d="M1 5.5C80 1.5 240 1.5 399 5.5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Freshkite builds purpose-built software for educational institutions — a complete Learning
              Management System, all-in-one School ERP, and an AI-powered hiring platform.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
              >
                Explore Our Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/training"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-sm"
              >
                View Training Program
              </a>
            </div>
          </div>

          {/* Product preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ backgroundColor: `${product.color}20`, border: `1px solid ${product.color}30` }}
                    >
                      {product.icon}
                    </div>
                    <span className="text-sm font-bold text-white">{product.name}</span>
                  </div>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{product.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-500"
                    >
                      {f}
                    </span>
                  ))}
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-600">
                    +{product.features.length - 3} more
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* ── PRODUCTS SECTION ─────────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
                Our Product Suite
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
              Three platforms.{" "}
              <span className="text-[#2563EB]">One vision.</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Each product solves a distinct problem in education. Together, they cover the full lifecycle
              — from learning and administration to career readiness and hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-2 transition-all duration-300 flex flex-col"
                style={{ borderTop: `3px solid ${product.color}` }}
              >
                {/* Image */}
                <div
                  className="relative h-52 overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: `${product.color}08` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.08] select-none">
                    {product.icon}
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}25` }}
                    >
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-[1rem] font-extrabold text-[#0F172A] leading-snug">{product.name}</h3>
                      <p className="text-[11px] font-medium" style={{ color: product.color }}>{product.tagline}</p>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{product.description}</p>

                  <div className="h-px bg-slate-100 mb-4" />

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-slate-200 text-slate-600 group-hover:border-slate-300 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a
                    href={product.href}
                    className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-white"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.buttonLabel}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: product.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SPOTLIGHTS ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
              A closer look at each <span className="text-[#2563EB]">platform</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Each product is independently powerful — and even more effective when used together.
            </p>
          </div>

          <div className="space-y-28">
            {PRODUCTS.map((product, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  key={product.id}
                  className={`flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 flex-shrink-0">
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}15, ${product.color}04)`,
                        aspectRatio: "16/10",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-[10rem] opacity-[0.06] select-none">
                        {product.icon}
                      </div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div
                        className="absolute inset-0 rounded-2xl ring-1 ring-inset"
                        style={{ borderColor: `${product.color}20` }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-5 text-xs font-semibold uppercase tracking-wide"
                      style={{ backgroundColor: `${product.color}10`, border: `1px solid ${product.color}20`, color: product.color }}
                    >
                      {product.icon} {product.name}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-3 leading-tight tracking-tight">
                      {product.tagline}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-7 text-[0.95rem]">
                      {product.overview}
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 mb-8">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                            style={{ backgroundColor: `${product.color}15`, color: product.color }}
                          >
                            ✓
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={product.href}
                      className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-white"
                      style={{ backgroundColor: product.color }}
                    >
                      {product.buttonLabel}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY FRESHKITE ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                Why Freshkite
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Built differently.{" "}
              <span className="text-[#2563EB]">By design.</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We don&apos;t adapt generic software for education. We build from the ground up — for the
              specific challenges institutions face every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_PRODUCTS.map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-2 text-[0.95rem]">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING STRIP ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F172A] overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#22C55E]/6 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 p-10 lg:p-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-3.5 py-1 mb-5">
                  <span className="text-xs font-semibold text-[#86efac] tracking-wide uppercase">
                    Also a Training Institute
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                  We also train the next generation of software engineers
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl mb-6">
                  Beyond software products, Freshkite runs an intensive software engineering career
                  program — 6 courses, lifetime access, industry mentors, and real placements up to 57 LPA.
                </p>
                <div className="flex flex-wrap gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-lg font-extrabold" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/training"
                  className="inline-flex items-center gap-2 bg-[#22C55E] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#16a34a] transition-all duration-200 hover:shadow-lg hover:shadow-[#22C55E]/30 hover:-translate-y-0.5 text-sm whitespace-nowrap"
                >
                  View Training Program
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              Get Started
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
            Ready to modernise your institution?
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Talk to the Freshkite team and find out which products fit your institution&apos;s needs — and how quickly you can get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/training#apply"
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
            >
              Book a Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-8 py-4 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
