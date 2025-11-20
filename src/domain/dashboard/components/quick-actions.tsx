"use client";

import { BespokeCard, BespokeButton, BespokeAnimation } from "@/components/ui/bespoke";

const quickActions = [
  {
    title: "Resume Learning",
    description: "Continue where you left off",
    icon: "▶️",
    color: "emerald",
    href: "#"
  },
  {
    title: "Ask for Help",
    description: "Connect with instructors",
    icon: "❓",
    color: "blue",
    href: "#"
  },
  {
    title: "Join Study Group",
    description: "Collaborate with peers",
    icon: "👥",
    color: "purple",
    href: "#"
  },
  {
    title: "Download Resources",
    description: "Access course materials",
    icon: "📥",
    color: "orange",
    href: "#"
  },
  {
    title: "View Certificates",
    description: "Your achievements",
    icon: "🏆",
    color: "yellow",
    href: "#"
  },
  {
    title: "Account Settings",
    description: "Manage your profile",
    icon: "⚙️",
    color: "gray",
    href: "#"
  }
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    border: "border-emerald-200",
    icon: "text-emerald-600"
  },
  blue: {
    bg: "bg-blue-50 hover:bg-blue-100",
    border: "border-blue-200",
    icon: "text-blue-600"
  },
  purple: {
    bg: "bg-purple-50 hover:bg-purple-100",
    border: "border-purple-200",
    icon: "text-purple-600"
  },
  orange: {
    bg: "bg-orange-50 hover:bg-orange-100",
    border: "border-orange-200",
    icon: "text-orange-600"
  },
  yellow: {
    bg: "bg-yellow-50 hover:bg-yellow-100",
    border: "border-yellow-200",
    icon: "text-yellow-600"
  },
  gray: {
    bg: "bg-gray-50 hover:bg-gray-100",
    border: "border-gray-200",
    icon: "text-gray-600"
  }
};

export default function QuickActions() {
  return (
    <BespokeCard variant="glass-card" className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((action, index) => {
          const colors = colorClasses[action.color as keyof typeof colorClasses];

          return (
            <BespokeAnimation key={action.title} preset="slide-in-up" delay={index * 0.1}>
              <button
                className={`p-4 rounded-lg border transition-all duration-200 ${colors.bg} ${colors.border} hover:shadow-md group`}
              >
                <div className={`text-2xl mb-2 ${colors.icon} group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {action.description}
                </p>
              </button>
            </BespokeAnimation>
          );
        })}
      </div>

      <BespokeAnimation preset="slide-in-up" delay={0.6}>
        <div className="space-y-3">
          <BespokeCard variant="premium-card" className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl">🎯</div>
              <h4 className="font-semibold text-gray-900">Need help?</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our support team is available 24/7 to help you succeed
            </p>
            <div className="grid grid-cols-2 gap-2">
              <BespokeButton variant="bespoke-primary" size="sm" className="text-xs">
                Live Chat
              </BespokeButton>
              <BespokeButton variant="bespoke-outline" size="sm" className="text-xs">
                Email Support
              </BespokeButton>
            </div>
          </BespokeCard>

          <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-gray-900 mb-2">Learning Tip</h4>
            <p className="text-sm text-gray-700">
              💡 Take regular breaks every 25 minutes using the Pomodoro technique to maintain focus and retain information better.
            </p>
          </div>
        </div>
      </BespokeAnimation>
    </BespokeCard>
  );
}