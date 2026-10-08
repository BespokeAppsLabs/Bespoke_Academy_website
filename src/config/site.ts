// Single source of truth for real, public-facing academy facts.
// Anything not listed here must not be stated on the site.

export const site = {
  name: "Bespoke Academy",
  url: "https://bespokeacademy.co.za",
  email: "info@bespoke.co.za",
  whatsapp: {
    display: "082 290 2428",
    href: "https://wa.me/27822902428",
  },
  intakeYear: 2027,
  program: {
    weeks: 40,
    grades: "Grades 8–11",
    ages: "Ages 13–17",
    schedule: "Friday sessions, 2+ hours",
  },
  // ponytail: fixed USD figure, not live FX. Update by hand if the rand moves a lot.
  price: { zar: 1500, usd: 85, per: "month", months: 10 },
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

export function formatPrice(country: string | null | undefined) {
  const { zar, usd, per } = site.price
  // Vercel sets x-vercel-ip-country; locally it is absent, so default to ZAR.
  return !country || country === "ZA"
    ? `R${zar.toLocaleString("en-ZA")} / ${per}`
    : `US$${usd} / ${per}`
}
