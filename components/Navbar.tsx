"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
            <Image
              src="/images/freshkite_images/logo_small.jpg.jpeg"
              alt="Freshkite"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0F172A]" : "text-white"
            }`}
          >
            Fresh<span className="text-[#2563EB]">kite</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#2563EB] ${
                scrolled ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#apply"
            className="bg-[#2563EB] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors duration-200 hover:shadow-md hover:shadow-[#2563EB]/20"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? "text-slate-600 hover:text-[#0F172A] hover:bg-slate-100"
              : "text-slate-300 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-5 flex flex-col gap-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-[#2563EB] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <a
              href="#apply"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#2563EB] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center hover:bg-[#1d4ed8] transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
