// Single source of truth for real, public-facing academy facts.
// Anything not listed here must not be stated on the site.

export const site = {
  name: "Bespoke Academy",
  url: "https://bespokeacademy.co.za",
  email: "info@bespokeapps.co.za",
  whatsapp: {
    display: "082 290 2428",
    href: "https://wa.me/27822902428",
  },
  program: {
    grades: "Grades 8–11",
    ages: "Ages 13–17",
    schedule: "Weekend sessions, 2+ hours",
    location: "Lephalale, Limpopo",
    start: "Join any month",
    term: "Paid monthly, no fixed end date",
    notice: "One month's notice to leave",
  },
  streams: {
    engineering: "Coding, AI, electronics, IoT and robotics. About 10 months at a typical pace.",
    media: "Coding, AI images and video, characters, motion graphics and Blender 3D. About 13 months at a typical pace.",
  },
  laptop: {
    engineering: "Windows 10/11, macOS 12+ or Linux; Core i3 8th gen, Ryzen 3 or Apple M1; 8 GB memory; SSD; webcam; USB port",
    media: "Windows 10/11, an Apple Silicon Mac (M1 or newer) or Linux; 4-core Core i5 8th gen, Ryzen 5 or M1; 16 GB memory; 100 GB free SSD; Full HD screen; three-button mouse",
    rules: "No Chromebooks, tablets or Windows in S mode. Students must be able to install software.",
  },
  // ponytail: fixed USD figures, not live FX. Update by hand if the rand moves a lot.
  tiers: [
    {
      id: "base",
      name: "Engineering Base",
      zar: 500,
      usd: 29,
      includes: ["Coding, AI and Arduino basics", "Shared AI tools", "Parents buy an Arduino Uno starter kit (about R800)"],
    },
    {
      id: "mid",
      name: "Engineering Mid",
      zar: 1500,
      usd: 85,
      includes: ["Coding, AI and IoT", "Kit included: ESP32, Raspberry Pi, breadboard, wires and sensors", "Up to R300 in final-project parts"],
    },
    {
      id: "high",
      name: "Engineering High",
      zar: 2500,
      usd: 143,
      includes: ["Coding, AI, IoT and full robotics", "Mid kit plus an Arduino Mega kit and robotics pack", "Up to R500 in final-project parts"],
    },
    {
      id: "media",
      name: "Media",
      zar: 2500,
      usd: 143,
      includes: ["Coding, AI images and video, motion graphics and Blender 3D", "Image and video generation tools with a monthly budget", "No kit needed; a stronger laptop is required"],
    },
  ],
  socials: [
    { label: "X", href: "https://x.com/BespokeAppsLabs" },
    { label: "Facebook", href: "https://www.facebook.com/BespokeAppsLabs" },
    { label: "YouTube", href: "https://www.youtube.com/@BespokeApplicationsLabs" },
  ],
  related: [
    { label: "Bespoke Applications Labs", href: "https://bespokeapps.co.za" },
    { label: "Lucas Semenya", href: "https://lucassemenya.co.za" },
  ],
} as const

export type Tier = (typeof site.tiers)[number]

export function formatPrice(country: string | null | undefined, { zar, usd }: Tier) {
  // Vercel sets x-vercel-ip-country; locally it is absent, so default to ZAR.
  return !country || country === "ZA" ? `R${zar.toLocaleString("en-ZA")} / month` : `US$${usd} / month`
}
