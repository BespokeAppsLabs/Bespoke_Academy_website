"use client";

import { BespokeAnimation, BespokeButton, BespokeCard } from "@/components/ui/bespoke";
import { site, formatPrice } from "@/config/site";

const included = [
  `${site.program.weeks} weeks of supervised Friday sessions`,
  "All equipment and materials included",
  "All software and learning resources",
  "Progress updates for parents",
  "A portfolio of real projects",
];

export default function Pricing({ country }: { country: string | null }) {
  return (
    <section id="fees" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <BespokeAnimation preset="slide-in-up">
          <BespokeCard variant="premium-card" className="p-8 md:p-10 text-center">
            <p className="text-sm font-semibold tracking-wider uppercase text-emerald-600 mb-2">
              {site.intakeYear} Programme Fees
            </p>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{formatPrice(country)}</p>
            <p className="text-gray-600 mb-8">
              {site.price.months} monthly payments for the full {site.program.weeks}-week programme
            </p>

            <ul className="text-left max-w-md mx-auto space-y-2 mb-8 text-gray-700">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <BespokeButton href="/#contact" variant="bespoke-primary" size="lg">
              Apply for {site.intakeYear}
            </BespokeButton>
            <p className="text-sm text-gray-500 mt-4">
              No payment is taken online. We share payment details once your application is accepted.
            </p>
          </BespokeCard>
        </BespokeAnimation>
      </div>
    </section>
  );
}
