"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BespokeCard } from '@/components/ui/bespoke/bespokeCard';
import { BespokeButton } from '@/components/ui/bespoke/bespokeButton';
import AutoScrollingCarousel from '@/components/ui/auto-scrolling-carousel';
import { ParallelLinesBackground } from '@/components/ui/parallel-lines-background';
import {
  Brain,
  Target,
  Lightbulb,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Code,
  Zap,
  Globe,
  GraduationCap,
  Cpu,
  Bot,
  Puzzle,
  Microscope
} from 'lucide-react';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      let progress = 0;

      // When container top is at viewport bottom, progress = 0
      // When container bottom is at viewport top, progress = 1
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalScrollDistance = containerHeight + windowHeight;
        const scrolledDistance = windowHeight - rect.top;
        progress = Math.min(1, Math.max(0, scrolledDistance / totalScrollDistance));
      } else if (rect.bottom <= 0) {
        // Container has been fully scrolled past
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] w-full md:h-[200vh]">
      {/* Progress Indicator - Hidden on mobile */}
      <motion.div
        className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2 md:px-4 md:py-2 border border-white/20 md:block hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-24 md:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 origin-left"
              style={{ scaleX: scrollProgress }}
            />
          </div>
          <span className="text-white text-xs font-medium">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </motion.div>

      {/* Panel 1: About Us */}
      <div className="h-screen w-full md:min-h-screen sticky top-0">
        <AboutUsSection />
      </div>

      {/* Panel 2: Solutions */}
      <div className="h-screen w-full md:min-h-screen sticky top-0">
        <SolutionsSection />
      </div>
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
          <img
            src="/images/advanced-tools.jpg"
            alt="AI Learning Lab for Teens"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            onError={(e) => {
              // Fallback to a solid color if image fails to load
              e.currentTarget.src = '';
              e.currentTarget.className = 'absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100';
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
              <div className="text-4xl md:text-6xl font-bold text-emerald-500 mb-2">40</div>
              <div className="text-base md:text-lg font-semibold text-zinc-800">Week Curriculum</div>
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
            <span className="text-emerald-500 text-sm font-semibold tracking-wider uppercase">
              About Bespoke Academy
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-zinc-900">
              Empowering Young Adults Through
              <span className="text-emerald-500 block">Web Technologies .</span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-600 mb-6 leading-relaxed">
              Designed specifically for Grades 8-11, our comprehensive 40-week program transforms
              curious students into confident tech innovators through hands-on learning and real projects.
            </p>

            <p className="text-base md:text-lg text-zinc-600 mb-8 leading-relaxed">
              Our Friday sessions provide the perfect balance of structured learning and creative exploration,
              preparing students for future careers and college success in technology fields.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-8">
              {[
                { number: "500+", label: "Student Graduates" },
                { number: "95%", label: "Parent Satisfaction" },
                { number: "40", label: "Week Program" },
                { number: "6:1", label: "Student-Teacher Ratio" }
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

            {/* Parent Testimonial Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BespokeCard
                variant="testimonial-card"
                className="bg-zinc-50 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                    SK
                  </div>
                  <div className="flex-1">
                    <p className="text-zinc-700 italic mb-2 text-sm md:text-base">
                      "Bespoke Academy transformed my daughter's confidence in technology. She went from
                      being intimidated by coding to building her own AI projects. The Friday schedule
                      works perfectly for our family."
                    </p>
                    <div>
                      <div className="font-semibold text-zinc-900">Sarah Kim</div>
                      <div className="text-sm text-zinc-600">Parent of Grade 9 Student</div>
                    </div>
                  </div>
                </div>
              </BespokeCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// SolutionsSection.tsx
function SolutionsSection() {
  return (
    <section className="h-full w-full bg-zinc-900 text-white flex flex-col justify-center p-8 md:p-16 lg:p-24 relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="dark" />

      <div className="relative z-10 flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            Learning Pathways
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white">
            Master AI & Robotics
            <span className="text-emerald-400 block">Through Hands-On Projects.</span>
          </h2>
          <p className="text-zinc-300 mt-4 max-w-3xl text-base md:text-lg">
            Our 40-week curriculum takes students from coding basics to advanced AI applications.
            Each Friday session builds practical skills through real projects that prepare students
            for college STEM programs and future tech careers.
          </p>
        </motion.div>

        {/* Solutions Infinite Scroll Carousel */}
        <div className=" flex items-center relative">
          <AutoScrollingCarousel
            speed={20}
            gap="2rem"
            showArrows={false}
            className="py-4 w-full"
          >
            {solutions.map((solution, index) => (
              <div key={solution.title} className="w-72 sm:w-80 md:w-96 flex-shrink-0">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeInOut"
                  }}
                  className="h-full"
                >
                  <BespokeCard
                    variant="glass-card"
                    className={`
                      bg-zinc-800/90 backdrop-blur-sm border-zinc-700 text-white p-6 h-full
                      transition-all duration-300 hover:bg-zinc-750/90 hover:border-emerald-600
                      hover:shadow-2xl hover:shadow-emerald-500/20
                      group cursor-pointer
                    `}
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div className={`${solution.color} mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-2`}>
                      {solution.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-emerald-400 transition-all duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300">
                      {solution.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {solution.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300"
                        >
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full group-hover:bg-emerald-300 transition-colors duration-300" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-700 group-hover:border-emerald-600/30 transition-colors duration-300">
                      <div className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-all duration-300 flex items-center gap-2 group-hover:translate-x-1">
                        Learn More
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </BespokeCard>
                </motion.div>
              </div>
            ))}
          </AutoScrollingCarousel>
        </div>

        {/* Override dark gradient overlays to make cards visible */}
        <style jsx>{`
          div[class*="absolute left-0 top-0 bottom-0"] {
            background: linear-gradient(to right, transparent, transparent) !important;
          }
          div[class*="absolute right-0 top-0 bottom-0"] {
            background: linear-gradient(to left, transparent, transparent) !important;
          }
        `}</style>

        {/* Additional Info */}
        <motion.div
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <BespokeCard variant="glass-card" className="bg-zinc-800/50 backdrop-blur-sm p-4 md:p-6 inline-block">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                <span>Competition Ready</span>
              </div>
              <div className="hidden sm:block text-zinc-500">•</div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                <span>Expert Mentors</span>
              </div>
              <div className="hidden sm:block text-zinc-500">•</div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                <span>College Prep</span>
              </div>
            </div>
          </BespokeCard>
        </motion.div>
      </div>
    </section>
  );
}