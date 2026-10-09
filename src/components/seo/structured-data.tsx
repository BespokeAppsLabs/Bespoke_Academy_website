import React from "react"
import { site } from "@/config/site"

interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }),
      }}
    />
  )
}

const address = { "@type": "PostalAddress", addressLocality: "Lephalale", addressRegion: "Limpopo", addressCountry: "ZA" }

const organization = {
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: "+27822902428",
  address,
  areaServed: ["Lephalale", "Onverwacht", "Marapong", "Waterberg District"].map((name) => ({ "@type": "Place", name })),
  sameAs: site.socials.map((s) => s.href),
}

export const educationalOrganizationData = {
  ...organization,
  description: `AI, engineering and media education: a hands-on monthly programme for ${site.program.grades} learners.`,
}

export const courseData = {
  "@type": "Course",
  name: "AI & Robotics Programme",
  description: `A rolling monthly AI programme for ${site.program.grades} (${site.program.ages}) with Engineering and Media streams and ${site.program.schedule.toLowerCase()}.`,
  provider: organization,
  educationalLevel: site.program.grades,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Onsite",
    courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", description: site.program.schedule },
    location: { "@type": "Place", name: site.program.location, address },
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: String(Math.min(...site.tiers.map((t) => t.zar))),
    highPrice: String(Math.max(...site.tiers.map((t) => t.zar))),
    priceCurrency: "ZAR",
    category: "Monthly tuition",
  },
}
