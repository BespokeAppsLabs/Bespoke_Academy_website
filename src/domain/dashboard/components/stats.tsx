"use client";

import { BespokeCard, BespokeAnimation, AnimatedCounter } from "@/components/ui/bespoke";

const stats = [
  {
    label: "Courses Enrolled",
    value: 3,
    icon: "📚",
    color: "text-emerald-600"
  },
  {
    label: "Hours Learned",
    value: 127,
    icon: "⏱️",
    color: "text-blue-600"
  },
  {
    label: "Certificates",
    value: 1,
    icon: "🏆",
    color: "text-purple-600"
  },
  {
    label: "Current Streak",
    value: 7,
    icon: "🔥",
    color: "text-orange-600"
  }
];

export default function Stats() {
  return (
    <BespokeCard variant="glass-card" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <BespokeAnimation key={stat.label} preset="slide-in-up" delay={index * 0.1}>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
              <div className={`text-3xl mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>
                <AnimatedCounter
                  to={stat.value}
                  duration={2000}
                  suffix={stat.label === "Current Streak" ? " days" : ""}
                />
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          </BespokeAnimation>
        ))}
      </div>
    </BespokeCard>
  );
}