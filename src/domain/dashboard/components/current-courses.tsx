"use client";

import { BespokeCard, BespokeButton, BespokeBadge, BespokeAnimation } from "@/components/ui/bespoke";

const courses = [
  {
    id: "1",
    title: "Full-Stack Development Bootcamp",
    instructor: "Marcus Rodriguez",
    progress: 82,
    totalLessons: 48,
    completedLessons: 39,
    nextLesson: "Building REST APIs with Express.js",
    estimatedTime: "45 min",
    lastAccessed: "2 hours ago",
    color: "emerald"
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    instructor: "Aisha Patel",
    progress: 65,
    totalLessons: 32,
    completedLessons: 21,
    nextLesson: "Advanced Prototyping Techniques",
    estimatedTime: "60 min",
    lastAccessed: "Yesterday",
    color: "blue"
  },
  {
    id: "3",
    title: "JavaScript Fundamentals",
    instructor: "Marcus Rodriguez",
    progress: 100,
    totalLessons: 25,
    completedLessons: 25,
    nextLesson: "Course Completed! 🎉",
    estimatedTime: "N/A",
    lastAccessed: "3 days ago",
    color: "purple"
  }
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    progress: "bg-emerald-500",
    text: "text-emerald-700"
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    progress: "bg-blue-500",
    text: "text-blue-700"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    progress: "bg-purple-500",
    text: "text-purple-700"
  }
};

export default function CurrentCourses() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Current Courses</h2>
        <BespokeButton variant="bespoke-outline" size="sm">
          Browse All Courses
        </BespokeButton>
      </div>

      <div className="space-y-6">
        {courses.map((course, index) => {
          const colors = colorClasses[course.color as keyof typeof colorClasses];

          return (
            <BespokeAnimation key={course.id} preset="slide-in-up" delay={index * 0.1}>
              <BespokeCard variant="feature-card" className="overflow-hidden">
                <div className={`p-6 ${course.progress === 100 ? colors.bg : ''} border-l-4 ${colors.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                    </div>
                    {course.progress === 100 && (
                      <BespokeBadge variant="skill-tag" className="bg-yellow-100 text-yellow-700">
                        ✨ Completed
                      </BespokeBadge>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Progress
                      </span>
                      <span className={`text-sm font-semibold ${colors.text}`}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${colors.progress} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Next: {course.nextLesson}
                        </p>
                        <p className="text-xs text-gray-600">
                          ⏱️ Estimated time: {course.estimatedTime}
                        </p>
                      </div>
                      {course.progress < 100 ? (
                        <BespokeButton variant="bespoke-primary" size="sm">
                          Continue
                        </BespokeButton>
                      ) : (
                        <BespokeButton variant="bespoke-outline" size="sm">
                          View Certificate
                        </BespokeButton>
                      )}
                    </div>
                  </div>
                </div>
              </BespokeCard>
            </BespokeAnimation>
          );
        })}
      </div>

      <BespokeAnimation preset="slide-in-up" delay={0.3} className="mt-6">
        <BespokeCard variant="glass-card" className="p-6 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Ready for your next challenge?
          </h4>
          <p className="text-gray-600 mb-4">
            Explore our catalog and discover new skills to learn
          </p>
          <BespokeButton variant="bespoke-primary">
            Explore New Courses
          </BespokeButton>
        </BespokeCard>
      </BespokeAnimation>
    </div>
  );
}