# Bespoke Academy Website Enhancement Implementation Plan
**Adopting Bexon Template Style While Preserving Educational Content**

## Phase 1: Library Installation & Configuration

### Install Missing Libraries
```bash
# Install Magic UI for premium components
npm install @magic-ui/react

# Install Motion.dev for enhanced animations
npm install motion

# Additional animation utilities
npm install @radix-ui/react-icons lucide-react
```

### Configure Tailwind CSS for Bexon Color Scheme
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bexon-inspired color palette
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981', // Main emerald green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neutral: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          850: '#18181b', // Main dark background
          900: '#18181b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '25%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right bottom'
          },
          '75%': {
            'background-size': '400% 400%',
            'background-position': 'left bottom'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

## Phase 2: Enhanced Components

### 1. Enhanced Hero Section with Ken Burns Effect

```tsx
// src/components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import { KenBurnsImage } from "@magic-ui/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column - Professional Content */}
      <div className="relative bg-neutral-850 text-white p-12 md:p-24 flex flex-col justify-center overflow-hidden">
        {/* Page Load Animation Curtain */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-neutral-850 z-10"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Animated Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="relative z-20"
        >
          <motion.span
            className="text-primary-400 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Recognized for Excellence in AI Education
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl font-bold my-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Driving Excellence Through
            <span className="text-primary-400 block">AI-Powered Learning.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-neutral-300 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Transform your career with personalized AI education that adapts to your unique learning style and professional goals.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-6 text-lg">
              Start Learning Today
            </Button>
            <Button variant="outline" size="lg" className="border-neutral-600 text-white hover:bg-neutral-800 px-8 py-6 text-lg">
              View Curriculum
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column - Ken Burns Image */}
      <div className="relative h-full min-h-[50vh] md:h-screen">
        <KenBurnsImage
          imageUrl="/images/hero-ai-education.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          duration={15}
          direction="zoom-in"
          ease="linear"
        />

        {/* Floating Stats Card */}
        <motion.div
          className="absolute bottom-10 left-10 z-30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <Card className="p-6 shadow-2xl bg-white/95 backdrop-blur-sm border-0">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-4xl font-bold text-neutral-900">30K+</h3>
                <p className="text-neutral-600 font-medium">Learners Worldwide</p>
              </div>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-primary-600 text-sm font-medium"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
      </div>
    </section>
  );
}
```

### 2. Enhanced Features Section with Scroll Animations

```tsx
// src/components/FeaturesSection.tsx
"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Brain,
  Trophy,
  Users,
  Zap,
  Target,
  GraduationCap
} from "lucide-react";

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Learning",
    description: "Personalized curriculum that adapts to your learning pace and style using advanced AI algorithms.",
    color: "text-blue-500"
  },
  {
    icon: <Trophy className="w-8 h-8" />,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with decades of experience in AI and machine learning.",
    color: "text-yellow-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Support",
    description: "Join a thriving community of learners, mentors, and industry experts.",
    color: "text-green-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Real-World Projects",
    description: "Build portfolio-ready projects that demonstrate your skills to employers.",
    color: "text-purple-500"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Career Advancement",
    description: "Get job placement assistance and career guidance from our dedicated team.",
    color: "text-red-500"
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Certification Programs",
    description: "Earn industry-recognized certificates that validate your expertise.",
    color: "text-indigo-500"
  }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-primary-500 text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why Choose Bespoke Academy
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-neutral-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Empowering Your Career with
            <span className="text-primary-500 block">AI-Driven Excellence.</span>
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Our comprehensive learning platform combines cutting-edge AI technology with expert instruction
            to deliver an educational experience that transforms careers.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-neutral-50">
                <CardHeader className="pb-4">
                  <motion.div
                    className={`${feature.color} mb-4 transform transition-transform duration-300 group-hover:scale-110`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 3. Logo Cloud with Marquee Component

```tsx
// src/components/LogoCloud.tsx
import Marquee from "@magic-ui/react-marquee";

const partners = [
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
  { name: "Oracle", logo: "/logos/oracle.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Adobe", logo: "/logos/adobe.svg" },
  { name: "NVIDIA", logo: "/logos/nvidia.svg" },
];

export default function LogoCloud() {
  return (
    <section className="py-16 bg-gradient-to-r from-neutral-50 to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase">
            Trusted by Industry Leaders
          </span>
          <h2 className="text-3xl font-bold mt-4 text-neutral-900">
            Join Over <span className="text-primary-500">1,000+</span> Companies
          </h2>
          <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
            Our graduates work at the world's most innovative companies,
            driving digital transformation and AI adoption.
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* Gradient Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <Marquee
            pauseOnHover
            className="[--gap:3rem] py-8"
            speed={30}
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center px-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-neutral-200">
          {[
            { number: "98%", label: "Placement Rate" },
            { number: "4.9/5", label: "Student Rating" },
            { number: "50+", label: "Expert Instructors" },
            { number: "1000+", label: "Hiring Partners" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-primary-500 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4. Sticky Scroll Wrapper with About & Solutions (Custom Implementation)

```tsx
// src/components/StickyScrollWrapper.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AboutUsSection from './AboutUsSection';
import SolutionsSection from './SolutionsSection';

export default function StickyScrollWrapper() {
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
      if (rect.top < windowHeight && rect.bottom > 0) {
        progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (containerHeight + windowHeight)));
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500 origin-left"
              style={{ scaleX: scrollProgress }}
            />
          </div>
          <span className="text-white text-xs font-medium">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Panel 1: About Us */}
      <div className="h-screen w-full sticky top-0">
        <AboutUsSection />
      </div>

      {/* Panel 2: Solutions */}
      <div className="h-screen w-full sticky top-0">
        <SolutionsSection />
      </div>
    </div>
  );
}

// AboutUsSection.tsx
export default function AboutUsSection() {
  return (
    <section className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
      {/* Left: Image + Stats Card */}
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50" />
        <img
          src="/images/about-ai-lab.jpg"
          alt="AI Learning Lab"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Floating Experience Card */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-neutral-200">
            <div className="text-6xl font-bold text-primary-500 mb-2">13+</div>
            <div className="text-lg font-semibold text-neutral-800">Years of Excellence</div>
            <div className="text-neutral-600">in AI Education</div>
          </div>
        </motion.div>
      </div>

      {/* Right: Content */}
      <div className="p-12 md:p-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase">
            Get to Know Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-neutral-900">
            Empowering Professionals Through
            <span className="text-primary-500 block">AI-Driven Education.</span>
          </h2>

          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Since our founding, we've been at the forefront of AI education,
            developing cutting-edge curriculum that bridges the gap between academic
            theory and real-world application.
          </p>

          {/* Testimonial Card */}
          <motion.div
            className="bg-neutral-50 p-6 rounded-xl border border-neutral-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                JD
              </div>
              <div className="flex-1">
                <p className="text-neutral-700 italic mb-2">
                  "Bespoke Academy transformed my career. The personalized AI-driven
                  approach helped me master skills I never thought possible."
                </p>
                <div>
                  <div className="font-semibold text-neutral-900">Jane Doe</div>
                  <div className="text-sm text-neutral-600">Senior ML Engineer, TechCorp</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// SolutionsSection.tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const solutions = [
  {
    title: "Machine Learning",
    description: "Master algorithms, frameworks, and real-world ML applications",
    icon: ">",
    features: ["Supervised Learning", "Neural Networks", "Deep Learning", "Model Deployment"]
  },
  {
    title: "Data Science",
    description: "Learn data analysis, visualization, and statistical modeling",
    icon: "=Ê",
    features: ["Python/R Programming", "Statistical Analysis", "Data Visualization", "Big Data Technologies"]
  },
  {
    title: "AI Product Management",
    description: "Lead AI initiatives and drive digital transformation",
    icon: "=€",
    features: ["AI Strategy", "Product Development", "Team Leadership", "Ethical AI"]
  },
  {
    title: "Natural Language Processing",
    description: "Build intelligent text and language understanding systems",
    icon: "=¬",
    features: ["Text Processing", "Language Models", "Chatbots", "Sentiment Analysis"]
  },
  {
    title: "Computer Vision",
    description: "Create intelligent image and video analysis applications",
    icon: "=A",
    features: ["Image Recognition", "Object Detection", "Facial Recognition", "Video Analysis"]
  },
  {
    title: "Reinforcement Learning",
    description: "Develop autonomous systems that learn from experience",
    icon: "<®",
    features: ["Game AI", "Robotics", "Control Systems", "Multi-Agent Systems"]
  }
];

export default function SolutionsSection() {
  return (
    <section className="h-full w-full bg-neutral-850 text-white flex flex-col justify-center p-12 md:p-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
          Our Solutions
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
          Transform Your Career with
          <span className="text-primary-400 block">AI Expertise.</span>
        </h2>
      </motion.div>

      {/* Solutions Carousel with Custom Progress Bar */}
      <div className="max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {solutions.map((solution, index) => (
              <CarouselItem key={solution.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-neutral-800 border-neutral-700 text-white p-6 h-full hover:bg-neutral-750 transition-colors group">
                    <div className="text-4xl mb-4">{solution.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-400 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                      {solution.description}
                    </p>
                    <div className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-neutral-700">
                      <button className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors flex items-center gap-2">
                        Learn More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-neutral-700 hover:bg-neutral-600 border-neutral-600" />
          <CarouselNext className="right-2 bg-neutral-700 hover:bg-neutral-600 border-neutral-600" />
        </Carousel>
      </div>
    </section>
  );
}
```

### 5. Animated Stats Section with Motion.dev

```tsx
// src/components/StatsSection.tsx
"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

function AnimatedCounter({ to, suffix = "", prefix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * to);

      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, to, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    number: 93,
    suffix: "%",
    label: "Career Placement Success",
    description: "Graduates land their dream jobs within 6 months"
  },
  {
    number: 2.5,
    suffix: "M",
    label: "Learning Hours Delivered",
    description: "Total hours of personalized AI education"
  },
  {
    number: 8.5,
    suffix: "X",
    label: "Career Growth Rate",
    description: "Average salary increase for our graduates"
  },
  {
    number: 150,
    suffix: "+",
    label: "Industry Partners",
    description: "Companies hiring our graduates worldwide"
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
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-neutral-900">
            Numbers That Speak
            <span className="text-primary-500 block">to Our Success.</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We're proud of the tangible results our graduates achieve in their careers.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-neutral-100">
                {/* Main Number */}
                <div className="text-5xl md:text-6xl font-bold text-primary-500 mb-4">
                  <AnimatedCounter
                    to={stat.number}
                    suffix={stat.suffix}
                    duration={2}
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
                <div className="mt-4 flex justify-center">
                  <motion.div
                    className="w-16 h-1 bg-primary-200 rounded-full group-hover:bg-primary-400 transition-colors duration-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-3 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              Trusted by Fortune 500 companies and innovative startups worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
```

### 6. Enhanced Contact Section with World Map Background

```tsx
// src/components/ContactSection.tsx
"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="py-24 bg-neutral-850 text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/world-map-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-850 to-neutral-900 opacity-95" />

      {/* Subtle animated overlay pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
            Drop Us a
            <span className="text-primary-400 block">Line.</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Ready to transform your career with AI education? Our team is here to answer
            your questions and help you get started on your learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Campus Locations</h3>
                  <p className="text-neutral-400 text-sm">Global Presence</p>
                </div>
              </div>
              <p className="text-neutral-300">
                San Francisco " New York " London " Singapore " Sydney
              </p>
            </div>

            <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone Support</h3>
                  <p className="text-neutral-400 text-sm">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <p className="text-neutral-300">
                1-888-AI-LEARN<br />
                +1 (415) 555-0123
              </p>
            </div>

            <div className="bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email Us</h3>
                  <p className="text-neutral-400 text-sm">24/7 Response</p>
                </div>
              </div>
              <p className="text-neutral-300">
                learn@bespoke.academy<br />
                admissions@bespoke.academy
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-2xl border border-neutral-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-400 focus:ring-primary-400/20 h-12"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-400 focus:ring-primary-400/20 h-12"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-400 focus:ring-primary-400/20 h-12"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Select>
                    <SelectTrigger className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-400 focus:ring-primary-400/20 h-12">
                      <SelectValue placeholder="I'm interested in..." />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-800 border-neutral-600">
                      <SelectItem value="ml">Machine Learning</SelectItem>
                      <SelectItem value="ds">Data Science</SelectItem>
                      <SelectItem value="nlp">Natural Language Processing</SelectItem>
                      <SelectItem value="cv">Computer Vision</SelectItem>
                      <SelectItem value="general">General Information</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-6">
                <Textarea
                  placeholder="Tell us about your learning goals and how we can help you achieve them..."
                  className="bg-neutral-900/50 border-neutral-600 text-white placeholder-neutral-400 focus:border-primary-400 focus:ring-primary-400/20 min-h-[120px] resize-none"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <Button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-black font-semibold px-8 py-4 w-full md:w-auto text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex items-center gap-2 text-neutral-400 text-sm"
              >
                <Clock className="w-4 h-4" />
                <span>We typically respond within 24 hours</span>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

### 7. Final CTA with Wavy Background (Custom)

```tsx
// src/components/FinalCta.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Custom Wavy Background Component
const WavyBackground = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="#10b981"
          fillOpacity="0.1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.path
          fill="#10b981"
          fillOpacity="0.05"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          animate={{
            d: [
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,165.3C96,171,192,181,288,197.3C384,213,480,235,576,218.7C672,203,768,149,864,149.3C960,149,1056,203,1152,202.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default function FinalCta() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white py-32 overflow-hidden">
      <WavyBackground className="absolute inset-0">
        <div className="h-full" />
      </WavyBackground>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-500 text-sm font-semibold tracking-wider uppercase">
              Ready to Begin Your Journey?
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-neutral-900">
              Let's Build Your
              <span className="text-primary-500 block">AI Future Together.</span>
            </h2>

            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Join thousands of professionals who have transformed their careers with our
              AI-powered learning platform. Start your journey today and unlock your full potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Call
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-neutral-600 font-medium">4.9/5 Rating</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600 font-medium">Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="/images/team-collaboration.jpg"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                New Cohort Starting Soon!
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

## Phase 3: Implementation Timeline

### Day 1: Library Installation & Setup
- Install all required packages
- Configure Tailwind CSS with Bexon color scheme
- Set up animation libraries

### Day 2: Component Migration
- Update existing components with new design system
- Replace cyberpunk colors with professional palette
- Implement responsive improvements

### Day 3-4: Enhanced Components
- Implement Hero Section with Ken Burns effect
- Build Features Section with scroll animations
- Create Logo Cloud with marquee effect

### Day 5-6: Advanced Features
- Implement Sticky Scroll Wrapper (most complex)
- Build animated Stats Section
- Create Contact Section with world map

### Day 7: Final Integration
- Add Final CTA with wavy background
- Test all animations and interactions
- Optimize performance and accessibility

## Expected Outcomes

This implementation will transform your Bespoke Academy website into a premium, modern educational platform that:

1. **Maintains your educational content** while presenting it in a more professional, engaging way
2. **Adopts the Bexon template's premium aesthetic** with smooth animations and interactions
3. **Improves user engagement** through sophisticated micro-interactions and scroll-based animations
4. **Enhances conversion potential** with proven design patterns and professional presentation
5. **Preserves functionality** while significantly elevating the user experience

The website will maintain all your existing courses, testimonials, and educational content while presenting them in a structure that follows the proven narrative flow of the Bexon template.