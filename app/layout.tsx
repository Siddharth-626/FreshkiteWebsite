import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Freshkite – Software Engineering Career Program | Lifetime Access",
  description:
    "Transform your career with Freshkite's comprehensive software engineering program. 6 industry-focused courses with lifetime access. Industry mentors with 20+ years experience, hands-on projects, and placement support up to 12+ LPA. Based in Cuddalore, Tamil Nadu.",
  keywords: [
    "software engineering course",
    "placement program India",
    "coding bootcamp Tamil Nadu",
    "full stack developer course",
    "Cuddalore IT training",
    "12 LPA placement",
    "NIT Trichy founder",
    "Freshkite program",
    "software career training",
    "Java React Node.js course",
    "DevOps training India",
    "system design course",
  ],
  authors: [{ name: "Bala Shanmugam" }],
  creator: "Freshkite",
  publisher: "Freshkite",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://freshkite.in",
    siteName: "Freshkite",
    title: "Freshkite – From Beginner to Software Engineer at Your Own Pace",
    description:
      "6 industry-focused courses. Lifetime access. Industry mentors. Real placements up to 12+ LPA. Join Freshkite's software engineering program in Cuddalore, Tamil Nadu.",
    images: [
      {
        url: "https://freshkite.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Freshkite – Software Engineering Career Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freshkite – Software Engineering Career Program",
    description:
      "6 industry-focused courses. Lifetime access. Industry mentors. Placements up to 12+ LPA.",
    images: ["https://freshkite.in/og-image.png"],
  },
  alternates: {
    canonical: "https://freshkite.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Freshkite",
  description:
    "Comprehensive software engineering career program — 6 courses with lifetime access, industry mentors, and placement support up to 12+ LPA.",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: "11.748",
    longitude: "79.762",
  },
  founder: {
    "@type": "Person",
    name: "Bala Shanmugam",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "NIT Trichy",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Engineering Career Program",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Freshkite Software Engineering Program",
          description:
            "6 industry-focused courses covering full-stack development, AI, Embedded Systems, DSA, System Design, and career placement — with lifetime access.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Freshkite",
          },
          courseMode: ["online", "onsite"],
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
