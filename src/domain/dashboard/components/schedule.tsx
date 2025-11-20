"use client";

import { BespokeCard, BespokeAnimation, BespokeButton } from "@/components/ui/bespoke";

const scheduleItems = [
  {
    id: "1",
    time: "10:00 AM",
    title: "Live Session: React Hooks Deep Dive",
    type: "live-session",
    instructor: "Marcus Rodriguez",
    duration: "60 min",
    course: "Full-Stack Development Bootcamp",
    status: "upcoming"
  },
  {
    id: "2",
    time: "2:00 PM",
    title: "Assignment Due: UI Prototyping Project",
    type: "deadline",
    course: "UI/UX Design Masterclass",
    status: "due-soon"
  },
  {
    id: "3",
    time: "4:00 PM",
    title: "Office Hours: JavaScript Q&A",
    type: "office-hours",
    instructor: "Teaching Assistant",
    duration: "45 min",
    course: "JavaScript Fundamentals",
    status: "available"
  },
  {
    id: "4",
    time: "Tomorrow",
    title: "New Lesson Available: Advanced CSS",
    type: "lesson-available",
    course: "Full-Stack Development Bootcamp",
    status: "future"
  }
];

const typeConfig = {
  "live-session": {
    icon: "🎥",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  "deadline": {
    icon: "⏰",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  "office-hours": {
    icon: "💬",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  "lesson-available": {
    icon: "📚",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  }
};

export default function Schedule() {
  return (
    <BespokeCard variant="feature-card" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Schedule</h2>
        <BespokeButton variant="bespoke-outline" size="sm">
          View Calendar
        </BespokeButton>
      </div>

      <div className="space-y-4">
        {scheduleItems.map((item, index) => {
          const config = typeConfig[item.type as keyof typeof typeConfig];

          return (
            <BespokeAnimation key={item.id} preset="slide-in-up" delay={index * 0.1}>
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  config.bgColor
                } ${config.borderColor} ${
                  item.status === "due-soon" ? "animate-pulse" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-2xl flex-shrink-0 ${config.color}`}>
                    {config.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.course}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap ml-4">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {item.instructor && (
                          <span>👤 {item.instructor}</span>
                        )}
                        {item.duration && (
                          <span>⏱️ {item.duration}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.status === "due-soon" && (
                          <span className="text-xs font-medium text-orange-600">
                            Due in 4 hours
                          </span>
                        )}
                        {item.status === "upcoming" && (
                          <BespokeButton variant="bespoke-primary" size="sm">
                            Join Session
                          </BespokeButton>
                        )}
                        {item.status === "available" && (
                          <BespokeButton variant="bespoke-outline" size="sm">
                            Join Now
                          </BespokeButton>
                        )}
                        {item.status === "future" && (
                          <BespokeButton variant="bespoke-outline" size="sm" disabled>
                            Not Available
                          </BespokeButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BespokeAnimation>
          );
        })}
      </div>

      <BespokeAnimation preset="slide-in-up" delay={0.4}>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span className="text-xl">📅</span>
            Weekly Learning Goal
          </h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-700">Progress this week</span>
            <span className="text-sm font-semibold text-blue-700">8.5 / 10 hours</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: "85%" }}
            />
          </div>
          <p className="text-xs text-blue-600 mt-2">
            Great job! You're on track to meet your weekly goal.
          </p>
        </div>
      </BespokeAnimation>
    </BespokeCard>
  );
}