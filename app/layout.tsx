import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { Send } from "lucide-react"
import { site } from "@/config/site"
import { StructuredData, educationalOrganizationData, courseData } from "@/components/seo/structured-data"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { MotionProvider } from "@/lib/motion"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Bespoke Academy | Weekend AI, Coding & Robotics Classes in Lephalale",
    template: "%s | Bespoke Academy Lephalale",
  },
  description:
    "Weekend AI, coding, robotics and digital media classes for Grades 8-11 in Lephalale, Limpopo. Engineering and Media streams, from R500 a month, join any month. No experience needed.",
  keywords: [
    "weekend coding classes Lephalale",
    "robotics classes Lephalale",
    "AI classes for teens Lephalale",
    "coding classes Ellisras",
    "STEM classes Onverwacht",
    "computer classes Marapong",
    "Saturday classes for high school learners Lephalale",
    "AI robotics curriculum grades 8-11",
    "STEM education Limpopo",
    "AI learning program high school",
    "technology education Lephalale",
    "coding classes for beginners Limpopo",
    "electronics for teenagers",
    "AI tools for students South Africa",
    "project-based learning technology",
    "future skills education Waterberg",
    "monthly AI programme Lephalale",
    "AI media and Blender classes for teens",
    "robotics courses for teens",
    "STEM education South Africa",
    "artificial intelligence training",
    "computer vision for beginners",
    "machine learning for students"
  ],
  authors: [{ name: "Bespoke Academy" }],
  creator: "Bespoke Academy",
  publisher: "Bespoke Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bespokeacademy.co.za"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://bespokeacademy.co.za",
    title: "Bespoke Academy | Weekend AI, Coding & Robotics Classes in Lephalale",
    description: "Weekend AI, coding, robotics and digital media classes for Grades 8-11 in Lephalale, Limpopo. Join any month. No experience needed.",
    siteName: "Bespoke Academy",
    images: [
      {
        url: "/images/ai-robotics-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Bespoke Academy weekend AI and robotics classes in Lephalale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Academy | Weekend AI & Robotics Classes in Lephalale",
    description: "Weekend AI Engineering and Media classes for Grades 8-11 in Lephalale, Limpopo.",
    images: ["/images/ai-robotics-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <StructuredData data={educationalOrganizationData} />
        <StructuredData data={courseData} />
      </head>
      <body className="font-sans antialiased">
        <MotionProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <ScrollProgress />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
        {/* ponytail: AI chat widget switched off until it works; src/components/chat is kept for when it returns */}
        <a
          href={`${site.whatsapp.href}?text=${encodeURIComponent("Hi, I have a question about Bespoke Academy.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 sm:px-5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1ebe5a]"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only">Send message on WhatsApp</span>
        </a>
      </body>
    </html>
  )
}
