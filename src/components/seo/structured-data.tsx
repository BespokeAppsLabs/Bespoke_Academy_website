import React from "react"

interface StructuredDataProps {
  data: Record<string, any>
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

// Educational Organization Schema
export const educationalOrganizationData = {
  "@type": "EducationalOrganization",
  name: "Bespoke Academy",
  description: "AI Robotics education platform offering comprehensive 40-week curriculum for Grades 8-11 students",
  url: "https://bespoke-academy.co.za",
  logo: "https://bespoke-academy.co.za/logo.png",
  image: "https://bespoke-academy.co.za/images/ai-robotics-hero.jpg",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Street",
    addressLocality: "Lephalale",
    addressRegion: "Limpopo",
    postalCode: "0555",
    addressCountry: "ZA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+27-123-456-7890",
    contactType: "customer service",
    availableLanguage: ["English", "Afrikaans"],
  },
  sameAs: [
    "https://www.facebook.com/bespokeacademy",
    "https://www.linkedin.com/company/bespoke-academy",
    "https://www.instagram.com/bespokeacademy",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Robotics Programs",
    itemListElement: [
      {
        "@type": "Course",
        name: "AI Fundamentals",
        description: "Module 1: Master AI fundamentals and build career foundation - Weeks 1-10",
        provider: {
          "@type": "EducationalOrganization",
          name: "Bespoke Academy",
        },
        educationalLevel: "Beginner",
        about: ["Artificial Intelligence", "Python Programming", "Career Planning"],
        duration: "P10W",
        offers: {
          "@type": "Offer",
          price: "12000",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Course",
        name: "Advanced AI Tools",
        description: "Module 2: Master advanced AI tools and workflow optimization - Weeks 11-20",
        provider: {
          "@type": "EducationalOrganization",
          name: "Bespoke Academy",
        },
        educationalLevel: "Intermediate",
        about: ["Prompt Engineering", "AI Tools Integration", "Workflow Automation"],
        duration: "P10W",
        offers: {
          "@type": "Offer",
          price: "15000",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Course",
        name: "Specialized AI Applications",
        description: "Module 3: Apply AI to specialized industry applications - Weeks 21-35",
        provider: {
          "@type": "EducationalOrganization",
          name: "Bespoke Academy",
        },
        educationalLevel: "Advanced",
        about: ["Industry AI", "Case Studies", "Project Development"],
        duration: "P15W",
        offers: {
          "@type": "Offer",
          price: "20000",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Course",
        name: "Capstone & Portfolio",
        description: "Module 4: Complete capstone project and build portfolio - Weeks 36-40",
        provider: {
          "@type": "EducationalOrganization",
          name: "Bespoke Academy",
        },
        educationalLevel: "Expert",
        about: ["Capstone Project", "Portfolio Building", "Career Preparation"],
        duration: "P5W",
        offers: {
          "@type": "Offer",
          price: "8000",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AI Robotics Program Certificate",
    credentialCategory: "Certificate",
    about: "AI, Robotics, Programming, Electronics",
    competencyRequired: ["Basic Computer Skills", "Problem Solving", "Teamwork"],
  },
}

// Local Business Schema for Lephalale Location
export const localBusinessData = {
  "@type": "LocalBusiness",
  name: "Bespoke Academy - Lephalale Campus",
  description: "Premier AI Robotics education center in Lephalale, Limpopo",
  image: "https://bespoke-academy.co.za/images/campus-lephalale.jpg",
  telephone: "+27-123-456-7890",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Education Campus, Main Street",
    addressLocality: "Lephalale",
    addressRegion: "Limpopo",
    postalCode: "0555",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-23.6667",
    longitude: "27.7333",
  },
  openingHours: "Mo-Fr 09:00-17:00,Sa 09:00-13:00",
  priceRange: "$$",
  paymentAccepted: ["Cash", "Credit Card", "EFT"],
  areaServed: {
    "@type": "Place",
    name: "Waterberg District, Limpopo",
  },
  knowsAbout: [
    "AI Education",
    "Robotics Training",
    "STEM Programs",
    "Computer Science",
    "Electronics",
    "Python Programming",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Local Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Weekend AI Robotics Classes",
          description: "Saturday classes for local students in Lephalale",
          educationalLevel: "Beginner to Advanced",
        },
        price: "500",
        priceCurrency: "ZAR",
        availability: "https://schema.org/InStock",
        validFrom: "2024-01-01",
      },
    ],
  },
}

// FAQ Schema
export const faqData = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the prerequisites for the AI Robotics program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No prior knowledge required! Our program is designed for complete beginners in Grades 8-11 (ages 13-17). We provide all necessary equipment and start from absolute basics.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Bespoke Academy located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our main campus is located in Lephalale, Limpopo. We also offer online programs and have partnerships with schools in Cape Town, Johannesburg, and other major South African cities.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the AI Robotics program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The complete program is 40 weeks, divided into 4 modules. Classes meet once a week for 2+ hours, typically on Fridays.",
      },
    },
    {
      "@type": "Question",
      name: "What will students learn in the program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students progress from computer basics to AI-assisted robotics. The curriculum includes: computer literacy, Python programming, electronics, robotics, AI concepts, computer vision, and hands-on projects using Raspberry Pi and AI tools.",
      },
    },
    {
      "@type": "Question",
      name: "Is equipment included in the program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All equipment including Raspberry Pi kits, electronics components, sensors, motors, and tools are included in the program fees.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities will this program prepare students for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Graduates will be prepared for careers in AI, robotics, software engineering, data science, and other technology fields. The program also builds problem-solving skills valuable for any career path.",
      },
    },
  ],
}

// Course Schema for main program
export const courseData = {
  "@type": "Course",
  name: "AI Robotics Program - 40 Week Journey",
  description: "Complete 40-week AI Robotics curriculum transforming Grades 8-11 students from beginners to confident technology creators",
  provider: {
    "@type": "EducationalOrganization",
    name: "Bespoke Academy",
    sameAs: "https://bespoke-academy.co.za",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "onsite",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lephalale",
        addressRegion: "Limpopo",
        addressCountry: "ZA",
      },
    },
    startDate: "2025-01-31",
    endDate: "2025-10-31",
    schedule: {
      "@type": "Schedule",
      repeatFrequency: "weekly",
      dayOfWeek: "Friday",
      startTime: "15:00",
      endTime: "17:00",
    },
  },
  educationalLevel: "High School",
  about: [
    "Artificial Intelligence",
    "Robotics",
    "Python Programming",
    "Electronics",
    "Computer Vision",
    "Machine Learning",
  ],
  inLanguage: "en",
  isAccessibleForFree: false,
  offers: {
    "@type": "Offer",
    price: "55000",
    priceCurrency: "ZAR",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2025-12-31",
  },
  syllabusSections: [
    {
      "@type": "Syllabus",
      name: "Phase 1: Digital Foundations (Weeks 1-8)",
      description: "Computer literacy, visual programming, Python basics, and first physical computing projects",
    },
    {
      "@type": "Syllabus",
      name: "Phase 2: Electronics & Robotics Basics (Weeks 9-16)",
      description: "Understanding electricity, sensors, motors, and first robot assembly",
    },
    {
      "@type": "Syllabus",
      name: "Phase 3: AI Concepts & Tools (Weeks 17-28)",
      description: "AI fundamentals, mastering AI assistants, computer vision, and training custom models",
    },
    {
      "@type": "Syllabus",
      name: "Phase 4: Integrated AI-Robotics Projects (Weeks 29-40)",
      description: "Advanced sensor integration, prototype construction, and final capstone project",
    },
  ],
  teaches: [
    "Basic computer skills and file management",
    "Python programming fundamentals",
    "Electronic circuit building and testing",
    "Robotics assembly and control",
    "AI tool usage and prompt engineering",
    "Computer vision and image recognition",
    "Problem-solving and critical thinking",
    "Project planning and documentation",
    "Teamwork and collaboration",
    "Presentation and communication skills",
  ],
  prerequisites: "None - designed for complete beginners",
  targetAudience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  timeRequired: "PT80H", // 2 hours per week for 40 weeks
  coursePrerequisites: "Grade 8-11 enrollment",
}