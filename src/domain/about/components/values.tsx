"use client";

import { BespokeCard, BespokeAnimation } from "@/components/ui/bespoke";
import { GoldUnderline } from "@/components/ui/gold-underline";

const values = [
  {
    icon: "🎯",
    title: "Personalization",
    description: "Small groups mean each learner gets attention at their own pace, from first click to first robot."
  },
  {
    icon: "🚀",
    title: "Innovation",
    description: "We constantly push the boundaries of educational technology to create engaging, effective learning experiences."
  },
  {
    icon: "🤝",
    title: "Community",
    description: "Learning is better together. We foster collaborative environments where students support each other's growth."
  },
  {
    icon: "📊",
    title: "Results-Driven",
    description: "Every phase ends in something real that learners built themselves, not just a certificate."
  },
  {
    icon: "🌍",
    title: "Accessibility",
    description: "Quality education should be available to everyone, regardless of background or financial circumstances."
  },
  {
    icon: "💡",
    title: "Excellence",
    description: "We maintain the highest standards in curriculum design, instruction, and student support."
  }
];

export default function Values() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-emerald-600"><GoldUnderline>Values</GoldUnderline></span>
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from curriculum design to student support
            </p>
          </BespokeAnimation>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <BespokeAnimation
              key={value.title}
              preset="slide-in-up"
              delay={index * 0.1}
            >
              <BespokeCard variant="feature-card" className="h-full group hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </BespokeCard>
            </BespokeAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}