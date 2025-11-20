"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Animation Preset Variants
export const bespokeAnimationPresets = {
  "curtain-reveal": {
    initial: { x: 0 },
    animate: { x: "100%" },
    exit: { x: 0 }
  },
  "stagger-fade": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  "hover-scale": {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  "float": {
    whileHover: { y: [-10, 10, -10] as any }
  },
  "slide-in-left": {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  "slide-in-right": {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  "slide-in-up": {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  },
  "slide-in-down": {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 }
  },
  "zoom-in": {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  "rotate-in": {
    initial: { rotate: -180, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 180, scale: 0, opacity: 0 }
  },
  "ken-burns": {
    initial: { scale: 1.1 },
    animate: { scale: 1.2 }
  },
  "typewriter": {
    initial: { width: 0 },
    animate: { width: "auto" }
  },
  "glow": {
    initial: { boxShadow: "0 0 0 rgba(16, 185, 129, 0)" },
    animate: {
      boxShadow: [
        "0 0 0 rgba(16, 185, 129, 0)",
        "0 0 20px rgba(16, 185, 129, 0.3)",
        "0 0 0 rgba(16, 185, 129, 0)"
      ] as any
    }
  }
} as const;

export type AnimationPreset = keyof typeof bespokeAnimationPresets;

export interface BespokeAnimationProps {
  children: React.ReactNode;
  preset?: AnimationPreset;
  variants?: Variants;
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number | boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  trigger?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  onAnimationComplete?: () => void;
}

const BespokeAnimation = React.forwardRef<any, BespokeAnimationProps>(
  ({
    children,
    preset,
    variants,
    initial,
    animate,
    exit,
    whileHover,
    whileTap,
    transition,
    duration = 0.5,
    delay = 0,
    ease = "easeInOut",
    repeat = false,
    className,
    as: Component = "div",
    trigger = true,
    stagger = false,
    staggerDelay = 0.1,
    onAnimationComplete,
    ...props
  }, ref) => {
    // Get preset variants or use custom
    const selectedVariants = variants || (preset ? bespokeAnimationPresets[preset] : undefined);

    // Default transition
    const defaultTransition = {
      duration,
      delay,
      ease,
      repeat: repeat === true ? Infinity : repeat,
      ...transition
    };

    // Handle stagger delay
    const finalDelay = stagger ? delay + (staggerDelay * 0) : delay;

    // Animation props
    const animationProps: any = {
      initial: initial !== undefined ? initial : (selectedVariants && typeof selectedVariants === 'object' && 'initial' in selectedVariants ? selectedVariants.initial : { opacity: 0 }),
      animate: trigger ? (animate !== undefined ? animate : (selectedVariants && typeof selectedVariants === 'object' && 'animate' in selectedVariants ? selectedVariants.animate : { opacity: 1 })) : initial,
      exit: exit !== undefined ? exit : (selectedVariants && typeof selectedVariants === 'object' && 'exit' in selectedVariants ? selectedVariants.exit : { opacity: 0 }),
      whileHover,
      whileTap,
      transition: defaultTransition,
      onAnimationComplete
    };

    if (!selectedVariants && !initial && !animate && !whileHover && !whileTap) {
      // No animation specified, return children wrapped in div
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        {...animationProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

BespokeAnimation.displayName = "BespokeAnimation";

// Stagger Container for list animations
export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className,
  as: Component = "div"
}: StaggerContainerProps) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Scroll-triggered animation wrapper
export interface ScrollAnimationProps {
  children: React.ReactNode;
  preset?: AnimationPreset;
  threshold?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollAnimation({
  children,
  preset = "slide-in-up",
  threshold = 0.1,
  delay = 0,
  duration = 0.6,
  className,
  once = true
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  const selectedVariants = bespokeAnimationPresets[preset];
  const hasInitial = selectedVariants && typeof selectedVariants === 'object' && 'initial' in selectedVariants;
  const hasAnimate = selectedVariants && typeof selectedVariants === 'object' && 'animate' in selectedVariants;

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={hasInitial ? selectedVariants.initial : { opacity: 0, y: 20 }}
      animate={isVisible ? (hasAnimate ? selectedVariants.animate : { opacity: 1, y: 0 }) : (hasInitial ? selectedVariants.initial : { opacity: 0, y: 20 })}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter Component
export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = React.useState(from);

  React.useEffect(() => {
    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const updateCounter = () => {
      const now = Date.now();
      if (now < startTime) return;

      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const currentCount = from + (to - from) * progress;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(to);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [from, to, duration, delay, decimals]);

  const displayCount = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{displayCount}{suffix}
    </motion.span>
  );
}

export { BespokeAnimation };