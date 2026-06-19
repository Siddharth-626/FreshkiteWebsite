"use client";

import Image from "next/image";
import { PRODUCTS } from "@/lib/constants";
import type { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
      style={{ borderTop: `3px solid ${product.color}` }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-48 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: `${product.color}10` }}
      >
        {/* Fallback icon shown behind the image */}
        <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-[0.12] select-none">
          {product.icon}
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              backgroundColor: `${product.color}15`,
              border: `1px solid ${product.color}25`,
            }}
          >
            {product.icon}
          </div>
          <h3 className="text-[1.05rem] font-extrabold text-[#0F172A] leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
          {product.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-4" />

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-slate-200 text-slate-600 group-hover:border-slate-300 transition-colors duration-200"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <a
          href={product.href}
          className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-white"
          style={{
            backgroundColor: product.color,
            boxShadow: `0 0 0 0 ${product.color}40`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 20px -4px ${product.color}40`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 0 0 ${product.color}40`;
          }}
        >
          {product.buttonLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Bottom accent bar on hover */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: product.color }}
      />
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/15 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-[#2563EB] tracking-wide uppercase">
              Freshkite Software Solutions
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-4 leading-tight tracking-tight">
            Our <span className="text-[#2563EB]">Products</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Building software solutions that transform learning, hiring, and educational institutions.
          </p>
        </div>

        {/* Product card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-10 rounded-2xl bg-[#0F172A] p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-bold text-white text-base mb-1">
              Interested in a Freshkite product?
            </p>
            <p className="text-slate-400 text-sm">
              Schedule a demo with our team to see how it fits your institution.
            </p>
          </div>
          <a
            href="/projects"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 text-sm whitespace-nowrap"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
