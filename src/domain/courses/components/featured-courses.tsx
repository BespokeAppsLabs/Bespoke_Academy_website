"use client";

import Link from "next/link";
import { BespokeCard, BespokeAnimation } from "@/components/ui/bespoke";
import { GoldUnderline } from "@/components/ui/gold-underline";

const featuredCourses = [
  {
    id: "module-1",
    title: "Level 1: Foundations",
    description: "Python, GitHub, AI tools and circuits in a browser simulator. No prior experience needed.",
    level: "Beginner",
    duration: "Units 1-8",
  },
  {
    id: "module-2",
    title: "Level 2: Electronics & Microcontrollers",
    description: "Wire and program sensors and outputs on a real board, with Wi-Fi and a Raspberry Pi on Mid and High.",
    level: "Intermediate",
    duration: "Units 9-18",
  },
  {
    id: "module-3",
    title: "Level 3: AI & Connected Systems",
    description: "Train AI models, call AI from your own code and connect it to hardware. High students build a self-driving robot.",
    level: "Intermediate",
    duration: "Units 19-28",
  },
  {
    id: "module-4",
    title: "Level 4: Final Project",
    description: "Design, build and present a project of your own at the termly demo day.",
    level: "Advanced",
    duration: "Units 29-40",
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <BespokeAnimation preset="slide-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engineering <span className="text-emerald-600"><GoldUnderline>Curriculum</GoldUnderline></span> Levels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move up a level when you pass its checkpoint. Prefer images, video and 3D?{" "}
              <Link href="/curriculum" className="text-emerald-600 underline">See the Media stream</Link>.
            </p>
          </BespokeAnimation>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredCourses.map((course, index) => (
            <div key={course.id}>
              <BespokeAnimation preset="slide-in-up" delay={index * 0.1} className="h-full">
                <BespokeCard variant="course-card" className="h-full group hover:shadow-xl transition-all duration-300">

                  <div className="p-6 h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">
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
                      <p className="text-sm text-gray-600">Grades 8-11 • weekend sessions</p>
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
                      View Level
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