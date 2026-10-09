"use client";

import { BespokeAnimation, BespokeButton, BespokeCard } from "@/components/ui/bespoke";
import { site, formatPrice } from "@/config/site";

const included = [
  "Supervised weekend sessions with mixed-level classes",
  "Software and learning resources",
  "Progress updates for parents",
  "A portfolio of real projects",
];

export default function Pricing({ country }: { country: string | null }) {
  return (
    <section id="fees" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <BespokeAnimation preset="slide-in-up">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-wider uppercase text-emerald-600 mb-2">Programme Fees</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Two streams, one monthly fee</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {site.program.start}. {site.program.term}; students move up a level when they pass its checkpoint.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {site.tiers.map((tier) => (
              <BespokeCard key={tier.id} variant="course-card" className="p-6 h-full flex flex-col">
                <p className="text-sm font-semibold text-emerald-600 mb-1">{tier.name}</p>
                <p className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 whitespace-nowrap">{formatPrice(country, tier)}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-emerald-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </BespokeCard>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-700 mb-2">Every tier includes:</p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700 mb-4">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div id="laptop" className="text-left text-sm text-gray-700 bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <p className="font-semibold text-gray-900">Every student needs their own laptop</p>
              <p>
                <span className="font-medium">Engineering:</span> {site.laptop.engineering}.
              </p>
              <p>
                <span className="font-medium">Media:</span> {site.laptop.media}.
              </p>
              <p>{site.laptop.rules}</p>
            </div>
            <p className="text-sm text-gray-600 mb-8">{site.program.notice}.</p>

            <BespokeButton href="/#contact" variant="bespoke-primary" size="lg">
              Apply now
            </BespokeButton>
            <p className="text-sm text-gray-500 mt-4">
              No payment is taken online. We share payment details once your application is accepted.
            </p>
          </div>
        </BespokeAnimation>
      </div>
    </section>
  );
}
