"use client";

import { BespokeCard, BespokeAnimation, BespokeBadge } from "@/components/ui/bespoke";

const achievements = [
  {
    id: "1",
    title: "Fast Learner",
    description: "Complete 5 lessons in one day",
    icon: "⚡",
    unlocked: true,
    date: "2 days ago"
  },
  {
    id: "2",
    title: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    unlocked: true,
    date: "Today"
  },
  {
    id: "3",
    title: "Project Master",
    description: "Submit 10 projects",
    icon: "🏆",
    unlocked: true,
    date: "1 week ago"
  },
  {
    id: "4",
    title: "Course Complete",
    description: "Finish your first course",
    icon: "🎓",
    unlocked: true,
    date: "3 days ago"
  },
  {
    id: "5",
    title: "Knowledge Seeker",
    description: "Enroll in 3 courses",
    icon: "📚",
    unlocked: true,
    date: "2 weeks ago"
  },
  {
    id: "6",
    title: "Perfect Score",
    description: "Get 100% on 5 assessments",
    icon: "💯",
    unlocked: false,
    progress: "3/5"
  }
];

export default function Achievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <BespokeCard variant="premium-card" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
        <span className="text-sm text-gray-500">
          {unlockedCount} of {totalCount} unlocked
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {achievements.slice(0, 6).map((achievement, index) => (
          <BespokeAnimation key={achievement.id} preset="slide-in-up" delay={index * 0.1}>
            <div
              className={`p-3 rounded-lg border text-center transition-all ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-md"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
              title={achievement.description}
            >
              <div className={`text-2xl mb-1 ${!achievement.unlocked && "grayscale"}`}>
                {achievement.icon}
              </div>
              <p className={`text-xs font-medium ${
                achievement.unlocked ? "text-emerald-700" : "text-gray-500"
              }`}>
                {achievement.unlocked ? "✓" : achievement.progress}
              </p>
            </div>
          </BespokeAnimation>
        ))}
      </div>

      <div className="space-y-3">
        {achievements.slice(0, 3).map((achievement, index) => (
          <BespokeAnimation
            key={`recent-${achievement.id}`}
            preset="slide-in-up"
            delay={index * 0.1}
          >
            <div className={`flex items-center gap-3 p-3 rounded-lg ${
              achievement.unlocked ? "bg-emerald-50" : "bg-gray-50"
            }`}>
              <div className={`text-2xl ${!achievement.unlocked && "opacity-50 grayscale"}`}>
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${
                  achievement.unlocked ? "text-gray-900" : "text-gray-500"
                }`}>
                  {achievement.title}
                </p>
                <p className={`text-xs ${
                  achievement.unlocked ? "text-gray-600" : "text-gray-400"
                }`}>
                  {achievement.description}
                </p>
              </div>
              <div className="text-right">
                {achievement.unlocked ? (
                  <BespokeBadge variant="skill-tag" size="sm" className="bg-emerald-100 text-emerald-700">
                    {achievement.date}
                  </BespokeBadge>
                ) : (
                  <span className="text-xs text-gray-500">
                    {achievement.progress}
                  </span>
                )}
              </div>
            </div>
          </BespokeAnimation>
        ))}
      </div>

      <BespokeAnimation preset="slide-in-up" delay={0.4}>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-3">
            {totalCount - unlockedCount} more achievements to unlock!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </BespokeAnimation>
    </BespokeCard>
  );
}