import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Freshkite Products – LMS, School ERP & PrepHire AI",
  description:
    "Explore Freshkite's software products: a complete Learning Management System, an all-in-one School ERP, and PrepHire AI for interview preparation and hiring. Built for educational institutions, students, and recruiters.",
  keywords: [
    "Freshkite LMS",
    "School ERP",
    "PrepHire AI",
    "learning management system India",
    "school management software",
    "AI interview preparation platform",
    "education software",
    "EdTech India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/projects",
    siteName: "Freshkite",
    title: "Freshkite Products – LMS, School ERP & PrepHire AI",
    description:
      "Software solutions that transform learning, hiring, and educational institutions. Explore Freshkite LMS, School ERP, and PrepHire AI.",
    images: [
      {
        url: "https://freshkite.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freshkite Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshkite Products – LMS, School ERP & PrepHire AI",
    description:
      "Software solutions that transform learning, hiring, and educational institutions.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: {
    canonical: "https://freshkite.in/projects",
  },
};

const productColors: Record<string, string> = {
  "freshkite-lms": "#2563EB",
  "school-erp": "#22C55E",
  prephire: "#8B5CF6",
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] bg-[#0F172A] flex items-center overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Radial glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 text-center w-full">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-1.5 mb-8">
            <span className="text-xs font-semibold text-[#93c5fd] tracking-wide uppercase">
              Freshkite Software Solutions
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Freshkite{" "}
            <span className="text-[#2563EB]">Products</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Empowering learners, educational institutions, and recruiters through innovative software solutions.
          </p>
          <a
            href="/#apply"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
          >
            Book a Demo
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Product showcase — alternating layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-28">
          {PRODUCTS.map((product, index) => {
            const imageLeft = index % 2 === 0;
            return (
              <div
                key={product.id}
                className={`flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`,
                      aspectRatio: "16/10",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-[0.08] select-none">
                      {product.icon}
                    </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Color accent border */}
                    <div
                      className="absolute inset-0 rounded-2xl ring-1 ring-inset"
                      style={{ borderColor: `${product.color}20` }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-5 text-xs font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: `${product.color}10`,
                      border: `1px solid ${product.color}20`,
                      color: product.color,
                    }}
                  >
                    {product.icon} {product.name}
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] mb-3 leading-tight tracking-tight">
                    {product.tagline}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 text-[0.95rem]">
                    {product.description}
                  </p>

                  {/* Feature list */}
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: product.color }}
                        />
                        <span className="text-sm text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={product.href}
                    className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-white"
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
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-4 tracking-tight">
            Ready to see it in action?
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Schedule a demo with the Freshkite team and explore how our products can work for your institution.
          </p>
          <a
            href="/#apply"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
