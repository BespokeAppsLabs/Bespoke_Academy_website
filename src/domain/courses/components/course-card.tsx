"use client";

import { BespokeCard, BespokeBadge, BespokeButton, BespokeAnimation } from "@/components/ui/bespoke";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    modules: number;
    rating: number;
    students: number;
    price: number;
    instructor: string;
    category: string;
    featured?: boolean;
  };
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  };

  return (
    <BespokeAnimation preset="slide-in-up" delay={index * 0.1}>
      <BespokeCard variant="course-card" className="h-full group hover:shadow-xl transition-all duration-300">
        {course.featured && (
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-t-2xl">
            FEATURED
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {course.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <BespokeBadge variant="skill-tag" size="sm" className={levelColors[course.level]}>
              {course.level}
            </BespokeBadge>
            <BespokeBadge variant="tech-stack" size="sm">
              {course.category}
            </BespokeBadge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span>{course.modules} modules</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⭐</span>
              <span>{course.rating}/5.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-medium text-gray-900">{course.instructor}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">
                  ${course.price}
                </p>
                <p className="text-xs text-gray-500">one-time</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <BespokeButton variant="bespoke-primary" className="flex-1">
              Enroll Now
            </BespokeButton>
            <BespokeButton variant="bespoke-outline" size="sm">
              Preview
            </BespokeButton>
          </div>
        </div>
      </BespokeCard>
    </BespokeAnimation>
  );
}