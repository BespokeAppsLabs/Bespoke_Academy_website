"use client";

import Link from "next/link";
import { BespokeCard, BespokeAnimation } from "@/components/ui/bespoke";

const featuredCourses = [
  {
    id: "module-1",
    title: "Phase 1: Digital Foundations",
    description: "Transform computer anxiety into confidence through hands-on learning. No prior experience needed.",
    level: "Beginner",
    duration: "8 weeks",
  },
  {
    id: "module-2",
    title: "Phase 2: Electronics & Robotics Basics",
    description: "Circuits, sensors and motors. Build a first robot and learn the fundamentals of physical computing.",
    level: "Intermediate",
    duration: "8 weeks",
  },
  {
    id: "module-3",
    title: "Phase 3: AI Concepts & Tools",
    description: "How AI works, how to use it responsibly, and how to put it to work in your own projects.",
    level: "Intermediate",
    duration: "12 weeks",
  },
  {
    id: "module-4",
    title: "Phase 4: Integrated AI-Robotics Projects",
    description: "Bring it all together: design, build and present an AI-powered robotics project.",
    level: "Advanced",
    duration: "12 weeks",
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

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredCourses.map((course, index) => (
            <div key={course.id}>
              <BespokeAnimation preset="slide-in-up" delay={index * 0.1}>
                <BespokeCard variant="premium-card" className="h-full group hover:shadow-xl transition-all duration-300">

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
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <p className="text-sm text-gray-600">Grades 8-11 • Friday sessions</p>
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

                    <Link
                      href={`/curriculum/${course.id}`}
                      className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      View Phase
                    </Link>
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