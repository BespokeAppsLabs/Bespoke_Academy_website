"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { BespokeCard } from "@/components/ui/bespoke/bespokeCard";
import { ParallelLinesBackground } from "@/components/ui/parallel-lines-background";
import {
  TrendingUp,
  Users,
  Award,
  Clock,
  Target,
  BookOpen,
  Globe,
  Rocket,
  BrainCircuit,
  GraduationCap,
  Star,
  Sparkles
} from "lucide-react";

const stats = [
  {
    number: 85,
    suffix: "%",
    label: "AI Proficiency Gain",
    description: "Students master advanced AI concepts within 40 weeks",
    icon: <BrainCircuit className="w-8 h-8" />,
    color: "text-blue-500",
    bgGradient: "from-blue-500 to-blue-600"
  },
  {
    number: 40,
    suffix: "",
    label: "Weeks of Learning",
    description: "Comprehensive AI robotics program for teens",
    icon: <Clock className="w-8 h-8" />,
    color: "text-green-500",
    bgGradient: "from-green-500 to-green-600"
  },
  {
    number: 12,
    suffix: ":1",
    label: "Student-Teacher Ratio",
    description: "Personalized attention for optimal learning",
    icon: <Users className="w-8 h-8" />,
    color: "text-purple-500",
    bgGradient: "from-purple-500 to-purple-600"
  },
  {
    number: 95,
    suffix: "%",
    label: "College Readiness",
    description: "Graduates prepared for STEM college programs",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "text-orange-500",
    bgGradient: "from-orange-500 to-orange-600"
  }
];

const achievements = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Competition Ready",
    description: "Students participate in national AI competitions"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Parent Partnership",
    description: "Regular progress updates and parent involvement"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Industry-Standard Curriculum",
    description: "Aligned with real-world AI applications"
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Future-Ready Skills",
    description: "Cutting-edge AI robotics education"
  }
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  } as const;

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-primary-emerald-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Animated Parallel Lines Background */}
      <ParallelLinesBackground theme="gradient" />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-primary-emerald-200/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            className="text-primary-emerald-500 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Student Success Metrics
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-neutral-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Building Tomorrow's
            <span className="text-primary-emerald-500 block">Tech Leaders Today.</span>
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Our Grade 8-11 AI robotics program delivers measurable results that prepare students
            for future success in STEM fields. Watch your teen transform into an AI innovator.
          </motion.p>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
            >
              <BespokeCard
                variant="stats-card"
                size="lg"
                animation="float"
                className="h-full text-center"
                delay={0.8 + index * 0.1}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Icon */}
                <motion.div
                  className={`${stat.color} mb-4 flex justify-center transform transition-transform duration-300 group-hover:scale-110`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>

                {/* Main Number */}
                <div className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4 relative">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2000}
                    delay={800 + index * 200}
                  />
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-neutral-900 mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-neutral-600 leading-relaxed">
                  {stat.description}
                </div>

                {/* Decorative Element */}
                <motion.div
                  className="mt-4 flex justify-center"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                >
                  <div className="h-1 bg-gradient-to-r from-primary-emerald-200 to-primary-emerald-400 rounded-full" />
                </motion.div>
              </BespokeCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Achievements */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-primary-emerald-100 hover:bg-white transition-all duration-300"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="text-primary-emerald-500 flex-shrink-0">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-emerald-100 text-primary-emerald-700 px-8 py-4 rounded-full border border-primary-emerald-200 shadow-lg">
            <Star className="w-6 h-6 fill-current" />
            <span className="font-semibold text-lg">
              Trusted by parents and recommended by educators nationwide
            </span>
          </div>

          <motion.p
            className="mt-6 text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
          >
            Join hundreds of parents who have seen their children thrive in our AI robotics program,
            gaining confidence, critical thinking skills, and a passion for technology.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}