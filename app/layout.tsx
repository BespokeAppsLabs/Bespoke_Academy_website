import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { ChatWidget } from "@/components/chat"
import { StructuredData, educationalOrganizationData, localBusinessData, faqData, courseData } from "@/components/seo/structured-data"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bespoke Academy - AI Robotics Program for Grades 8-11 | Lephalale Limpopo STEM Education",
  description:
    "Transform your child's future with our 40-week AI Robotics curriculum for grades 8-11 in Lephalale, Limpopo. Hands-on learning with all equipment included. From beginner to technology creator. No prior experience needed. Enroll today!",
  keywords: [
    "AI robotics curriculum grades 8-11",
    "STEM education Limpopo",
    "robotics classes Lephalale",
    "AI learning program high school",
    "technology education Lephalale",
    "coding classes for beginners Limpopo",
    "electronics for teenagers",
    "AI tools for students South Africa",
    "project-based learning technology",
    "future skills education Waterberg",
    "40-week AI program Lephalale",
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
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "en-ZA": "/en-ZA",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://bespokeacademy.co.za",
    title: "Bespoke Academy - AI Robotics Education for Grades 8-11 | Lephalale, Limpopo",
    description: "Transform your child's future with our 40-week AI Robotics curriculum. Hands-on learning with all equipment included. No prior experience needed.",
    siteName: "Bespoke Academy",
    images: [
      {
        url: "/images/ai-robotics-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Bespoke Academy AI Robotics Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Academy - AI Robotics Education | Lephalale, Limpopo",
    description: "40-week AI Robotics curriculum for grades 8-11. Transform beginners into technology creators.",
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
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData data={educationalOrganizationData} />
        <StructuredData data={localBusinessData} />
        <StructuredData data={faqData} />
        <StructuredData data={courseData} />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <SpeedInsights />
        <ChatWidget />
      </body>
    </html>
  )
}
