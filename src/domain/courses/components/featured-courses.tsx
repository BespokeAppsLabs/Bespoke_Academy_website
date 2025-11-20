"use client";

import { BespokeCard, BespokeAnimation } from "@/components/ui/bespoke";

const featuredCourses = [
  {
    id: "phase-1",
    title: "Phase 1: Digital Foundations",
    description: "Transform computer anxiety into confidence through hands-on learning. Perfect for Grades 8-11 students with no prior experience.",
    level: "Beginner" as const,
    duration: "8 weeks",
    modules: 8,
    rating: 4.9,
    students: 342,
    ageGroup: "Grades 8-11",
    session: "Friday 2-hour sessions",
    category: "Digital Literacy",
    featured: true
  },
  {
    id: "phase-2",
    title: "Phase 2: Electronics & Robotics",
    description: "Master circuits, sensors, and motors. Build your first robot and learn the fundamentals of physical computing.",
    level: "Intermediate" as const,
    duration: "8 weeks",
    modules: 8,
    rating: 4.8,
    students: 215,
    ageGroup: "Grades 8-11",
    session: "Friday 2-hour sessions",
    category: "Robotics",
    featured: true
  },
  {
    id: "complete-program",
    title: "Complete 40-Week Program",
    description: "The complete journey from curious beginner to confident AI & robotics creator. Includes all four phases with certification.",
    level: "Beginner to Advanced" as const,
    duration: "40 weeks",
    modules: 4,
    rating: 5.0,
    students: 187,
    ageGroup: "Grades 8-11",
    session: "Friday 2-hour sessions",
    category: "Complete Curriculum",
    featured: true
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-emerald-600">Curriculum</span> Phases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured 40-week journey designed specifically for Grades 8-11 students
            </p>
          </BespokeAnimation>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, index) => (
            <div key={course.id} className={index === 1 ? 'lg:scale-105' : ''}>
              <BespokeAnimation preset="slide-in-up" delay={index * 0.1}>
                <BespokeCard variant="premium-card" className="h-full group hover:shadow-xl transition-all duration-300">
                  {course.featured && (
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-t-2xl text-center">
                      ⭐ FEATURED COURSE
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-gray-600">⏱️ {course.duration}</span>
                      <span className="text-gray-600">🎯 {course.modules} phases</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-gray-500">({course.students} students)</span>
                      </div>
                      <div className="text-sm font-bold text-emerald-600">
                        {course.ageGroup}
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <p className="text-sm text-gray-600 mb-1">{course.session}</p>
                      <p className="text-xs text-gray-500">{course.category}</p>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">What students gain:</h4>
                      <ul className="text-sm text-emerald-700 space-y-1">
                        <li>✓ Hands-on project experience</li>
                        <li>✓ Real-world skills</li>
                        <li>✓ Confidence building</li>
                        <li>✓ Portfolio development</li>
                      </ul>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-3">Perfect for curious teens</p>
                      <div className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center justify-center cursor-pointer transition-colors">
                        Learn More
                      </div>
                    </div>
                  </div>
                </BespokeCard>
              </BespokeAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}