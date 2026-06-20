import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyFreshkite from "@/components/WhyFreshkite";
import FounderSection from "@/components/FounderSection";
import Roadmap from "@/components/Roadmap";
import CareerReadiness from "@/components/CareerReadiness";
import Placements from "@/components/Placements";
import Team from "@/components/Team";
import HowItWorks from "@/components/HowItWorks";
import YouTubeVideos from "@/components/YouTubeVideos";
import ApplySection from "@/components/ApplySection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Freshkite Training – Software Engineering Career Program | Lifetime Access",
  description:
    "Transform your career with Freshkite's comprehensive software engineering training program. 6 industry-focused courses with lifetime access. Industry mentors with 20+ years experience, hands-on projects, and placement support up to 57 LPA. Based in Cuddalore, Tamil Nadu.",
  keywords: [
    "software engineering course",
    "placement program India",
    "coding bootcamp Tamil Nadu",
    "full stack developer course",
    "Cuddalore IT training",
    "57 LPA placement",
    "NIT Trichy founder",
    "Freshkite training program",
    "software career training",
    "Java React Node.js course",
    "system design course",
  ],
  authors: [{ name: "Bala Shanmugam" }],
  creator: "Freshkite",
  publisher: "Freshkite",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in/training",
    siteName: "Freshkite",
    title: "Freshkite Training – From Beginner to Software Engineer",
    description:
      "6 industry-focused courses. Lifetime access. Industry mentors. Real placements up to 57 LPA. Join Freshkite's software engineering training program in Cuddalore, Tamil Nadu.",
    images: [
      {
        url: "https://freshkite.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freshkite Training Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshkite Training – Software Engineering Career Program",
    description:
      "6 industry-focused courses. Lifetime access. Industry mentors. Placements up to 57 LPA.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: { canonical: "https://freshkite.in/training" },
};

export default function TrainingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <WhyFreshkite />
      <FounderSection />
      <Roadmap />
      <CareerReadiness />
      <Placements />
      <Team />
      <HowItWorks />
      <YouTubeVideos />
      <ApplySection />
      <Footer />
    </main>
  );
}
