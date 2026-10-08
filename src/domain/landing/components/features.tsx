"use client";

import type { PointerEvent } from "react";
import { motion } from "motion/react";
import { ease, spring } from "@/lib/motion";
import { BespokeCard } from "@/components/ui/bespoke";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import {
  Brain,
  Trophy,
  Users,
  Zap,
  Target,
  GraduationCap,
  Lightbulb,
  Award,
  Rocket
} from "lucide-react";
import { GoldUnderline } from "@/components/ui/gold-underline";

const features = [
  {
    icon: <Brain className="w-10 h-10" strokeWidth={1.5} />,
    title: "Build Real AI Projects",
    description: "Create your own AI-powered systems and tools through hands-on projects that make learning fun and exciting.",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <Trophy className="w-10 h-10" strokeWidth={1.5} />,
    title: "Learn Expert Level Tools",
    description: "Get guidance from passionate mentor who make complex AI concepts simple and enjoyable to understand.",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <Users className="w-10 h-10" strokeWidth={1.5} />,
    title: "Learn with Friends",
    description: "Join a community of fellow students who share your passion for building cool things with AI and the open source community.",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <Zap className="w-10 h-10" strokeWidth={1.5} />,
    title: "Create Cool Apps & AI Tools",
    description: "Design and build amazing projects like smart home devices, chatbots, and AI games that actually work!",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <Target className="w-10 h-10" strokeWidth={1.5} />,
    title: "Future-Ready Skills",
    description: "Develop cutting-edge skills in AI and electronics that will set you apart for University and future opportunities.",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <GraduationCap className="w-10 h-10" strokeWidth={1.5} />,
    title: "Showcase Your Creations",
    description: "Build an impressive portfolio of AI projects that you can be proud to share with family and friends.",
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  // Cards fan up out of a slight backward tilt, one after another.
  const cardVariants = {
    hidden: { opacity: 0, y: 48, rotateX: 14, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.9, ease: ease.outExpo },
    },
  };

  // Gold spotlight follows the pointer across a card (CSS vars, no re-render).
  function trackPointer(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="light" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: ease.outExpo }}
        >
          <motion.span
            className="text-gold-700 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3, ease: ease.outExpo }}
          >
            Why Students & Parents Love Our AI Program
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-zinc-900"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.4, ease: ease.outExpo }}
          >
            Build, Create, and Innovate with
            <span className="text-emerald-500 block"><GoldUnderline>AI & Robotics</GoldUnderline></span>
          </motion.h2>

          <motion.p
            className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4, ease: ease.outExpo }}
          >
            Join our 40-week AI Robotics program where you'll build amazing projects, learn cutting-edge skills,
            and have fun creating robots and AI tools in our Friday 2-hour hands-on sessions.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1200px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={spring}
              onPointerMove={trackPointer}
              className="relative group/spot"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100 bg-[radial-gradient(240px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--color-gold-400)_28%,transparent),transparent_70%)]"
              />
              <BespokeCard
                variant="feature-card"
                className={`h-full group border-2 shadow-lg bg-gradient-to-br ${feature.bgGradient} ${feature.borderColor} hover:border-gold-300 transition-colors duration-300`}
                animation="none"
              >
                <div className="pb-4">
                  <motion.div
                    className={`${feature.color} mb-4 transform transition-transform duration-300 group-hover:scale-110`}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4, ease: ease.outExpo }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <div>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                  <motion.div
                    aria-hidden="true"
                    className="mt-5 h-px origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.9, ease: ease.outExpo }}
                  />
                </div>
              </BespokeCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Benefits Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ease.outExpo }}
        >
          <BespokeCard
            variant="premium-card"
            className="p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-9 h-9 text-emerald-500" strokeWidth={1.5} />
                <span className="text-zinc-800 font-medium">Zero Prior Knowledge Required</span>
              </div>
              <div className="hidden md:block text-zinc-400">•</div>
              <div className="flex items-center gap-3">
                <Award className="w-9 h-9 text-emerald-500" strokeWidth={1.5} />
                <span className="text-zinc-800 font-medium">Future Proof Knowledge</span>
              </div>
              <div className="hidden md:block text-zinc-400">•</div>
              <div className="flex items-center gap-3">
                <Rocket className="w-9 h-9 text-emerald-500" strokeWidth={1.5} />
                <span className="text-zinc-800 font-medium">Parent Support & Progress Tracking</span>
              </div>
            </div>
          </BespokeCard>
        </motion.div>
      </div>
    </section>
  );
}

export type FeaturesProps = {};