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

export default function HomePage() {
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
