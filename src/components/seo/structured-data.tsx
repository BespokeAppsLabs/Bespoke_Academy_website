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

const organization = {
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: "+27822902428",
  address: { "@type": "PostalAddress", addressLocality: "Lephalale", addressRegion: "Limpopo", addressCountry: "ZA" },
  sameAs: site.socials.map((s) => s.href),
}

export const educationalOrganizationData = {
  ...organization,
  description: `AI and robotics education: a ${site.program.weeks}-week hands-on programme for ${site.program.grades} learners.`,
}

export const courseData = {
  "@type": "Course",
  name: "AI & Robotics Programme",
  description: `A ${site.program.weeks}-week AI and robotics programme for ${site.program.grades} (${site.program.ages}), with ${site.program.schedule.toLowerCase()}.`,
  provider: organization,
  educationalLevel: site.program.grades,
  offers: {
    "@type": "Offer",
    price: String(site.price.zar * site.price.months),
    priceCurrency: "ZAR",
    category: "Tuition",
  },
}
