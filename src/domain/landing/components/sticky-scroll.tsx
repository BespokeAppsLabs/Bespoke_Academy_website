"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "motion/react";
import { BespokeCard } from '@/components/ui/bespoke/bespokeCard';
import { Marquee } from '@/components/ui/marquee';
import { ParallelLinesBackground } from '@/components/ui/parallel-lines-background';
import {
  Brain,
  Users,
  Award,
  Code,
  GraduationCap,
  Cpu,
  Bot,
  Microscope
} from 'lucide-react';
import { GoldUnderline } from "@/components/ui/gold-underline";

const solutions = [
  {
    title: "AI Fundamentals",
    description: "Master machine learning basics and neural networks for teens",
    icon: <Brain className="w-9 h-9" strokeWidth={1.5} />,
    features: ["Python Basics", "Supervised Learning", "Neural Networks", "AI Ethics"],
    color: "text-emerald-500"
  },
  {
    title: "Robotics & Hardware",
    description: "Build robots and learn hardware integration with AI",
    icon: <Bot className="w-9 h-9" strokeWidth={1.5} />,
    features: ["Arduino Programming", "Sensor Integration", "Motor Control", "Computer Vision"],
    color: "text-emerald-500"
  },
  {
    title: "Advanced AI Projects",
    description: "Create real AI applications for your portfolio",
    icon: <Cpu className="w-9 h-9" strokeWidth={1.5} />,
    features: ["Game AI", "Chatbots", "Image Recognition", "Voice Assistants"],
    color: "text-emerald-500"
  },
  {
    title: "Data Science Basics",
    description: "Learn data analysis and visualization techniques",
    icon: <Microscope className="w-9 h-9" strokeWidth={1.5} />,
    features: ["Data Collection", "Statistical Analysis", "Visualization", "Predictive Models"],
    color: "text-emerald-500"
  },
  {
    title: "Web Development with AI",
    description: "Build intelligent websites and applications",
    icon: <Code className="w-9 h-9" strokeWidth={1.5} />,
    features: ["React & Next.js", "API Integration", "AI-powered Features", "Deployment"],
    color: "text-emerald-500"
  },
  {
    title: "Competition Prep",
    description: "Prepare for robotics and AI competitions",
    icon: <Award className="w-9 h-9" strokeWidth={1.5} />,
    features: ["Team Strategies", "Problem Solving", "Technical Skills", "Presentation"],
    color: "text-emerald-500"
  }
];

export default function StickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 0 when the section pins, 1 when the second panel fully covers the first.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const backScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const backDim = useTransform(scrollYProgress, [0, 1], [0, 0.15]);
  const backRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const frontRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] w-full md:h-[200vh]">
      {/* Panel 1: About Us - recedes as panel 2 slides over it */}
      <div className="h-screen w-full md:min-h-screen sticky top-0 overflow-hidden bg-zinc-200">
        <motion.div className="h-full w-full origin-top overflow-hidden" style={{ scale: backScale, borderRadius: backRadius }}>
          <AboutUsSection />
          <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-zinc-900" style={{ opacity: backDim }} />
        </motion.div>
      </div>

      {/* Panel 2: Solutions */}
      <motion.div
        className="h-screen w-full md:min-h-screen sticky top-0 overflow-hidden shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]"
        style={{ borderTopLeftRadius: frontRadius, borderTopRightRadius: frontRadius }}
      >
        <SolutionsSection />
      </motion.div>
    </div>
  );
}

// AboutUsSection.tsx
function AboutUsSection() {
  return (
    <section className="h-full w-full bg-white overflow-hidden relative">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      <div className="relative z-10 h-full flex flex-col lg:flex-row items-stretch">
        {/* Left: Image + Stats Card */}
        <div className="relative h-80 lg:h-auto lg:flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50" />
          <Image
            src="/images/advanced-tools.jpg"
            alt="AI Learning Lab for Teens"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-90"
            onError={(e) => {
              // Hide a failed image so the gradient underneath shows through
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Floating Experience Card */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <BespokeCard variant="premium-card" className="p-6 md:p-8 shadow-2xl">
              <div className="text-4xl md:text-6xl font-bold text-emerald-500 mb-2">2</div>
              <div className="text-base md:text-lg font-semibold text-zinc-800">Learning Streams</div>
              <div className="text-sm md:text-base text-zinc-600">for Grades 8-11</div>
            </BespokeCard>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-16 lg:p-24 relative z-10 flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <span className="text-gold-700 text-sm font-semibold tracking-wider uppercase">
              About Bespoke Academy
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-zinc-900">
              Empowering Young Adults Through
              <span className="text-emerald-500 block"><GoldUnderline>Web Technologies .</GoldUnderline></span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-600 mb-6 leading-relaxed">
              Designed specifically for Grades 8-11, our rolling monthly programme transforms
              curious students into confident tech innovators through hands-on learning and real projects.
            </p>

            <p className="text-base md:text-lg text-zinc-600 mb-8 leading-relaxed">
              Our weekend sessions provide the perfect balance of structured learning and creative exploration,
              preparing students for future careers and college success in technology fields.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8">
              {[
                { number: "40", label: "Week Program" },
                { number: "Fri", label: "Weekly Sessions" },
                { number: "8–11", label: "School Grades" },
                { number: "None", label: "Experience Needed" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-zinc-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// SolutionsSection.tsx
function SolutionsSection() {
  return (
    <section className="h-full w-full bg-zinc-50 text-zinc-900 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      <div className="relative z-10 flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-gold-700 text-sm font-semibold tracking-wider uppercase">
            Learning Pathways
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-zinc-900">
            Master AI & Robotics
            <span className="text-emerald-600 block"><GoldUnderline>Through Hands-On Projects.</GoldUnderline></span>
          </h2>
          <p className="text-zinc-600 mt-4 max-w-3xl text-base md:text-lg">
            Our level-by-level curriculum takes students from coding basics to advanced AI applications.
            Each weekend session builds practical skills through real projects that prepare students
            for college STEM programs and future tech careers.
          </p>
        </motion.div>

        {/* Solutions marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Marquee duration={60} gapClass="gap-6 pr-6" className="py-4">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="group w-72 sm:w-80 md:w-96 shrink-0 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-xl hover:shadow-gold-500/10"
              >
                <div className={`${solution.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {solution.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-zinc-900 transition-colors duration-300 group-hover:text-gold-700">
                  {solution.title}
                </h3>
                <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Marquee>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <BespokeCard variant="course-card" className="p-4 md:p-6 inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                <span>Competition Ready</span>
              </div>
              <div className="hidden sm:block text-zinc-400">•</div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                <span>Expert Mentors</span>
              </div>
              <div className="hidden sm:block text-zinc-400">•</div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                <span>College Prep</span>
              </div>
            </div>
          </BespokeCard>
        </motion.div>
      </div>
    </section>
  );
}