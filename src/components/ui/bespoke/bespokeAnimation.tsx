"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { duration as d, ease, inView, reveal, stagger } from "@/lib/motion";

// Every preset is an in-view entrance: it plays once, when the element scrolls into view.
export const bespokeAnimationPresets = {
  "slide-in-up": reveal,
  "slide-in-left": {
    hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "slide-in-right": {
    hidden: { opacity: 0, x: 24, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  // Background wash: a slow bloom behind hero/CTA content.
  "curtain-reveal": {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: ease.outExpo } },
  },
} satisfies Record<string, Variants>;

export type AnimationPreset = keyof typeof bespokeAnimationPresets;

export interface BespokeAnimationProps {
  children: React.ReactNode;
  preset?: AnimationPreset;
  delay?: number;
  className?: string;
}

function BespokeAnimation({ children, preset = "slide-in-up", delay = 0, className }: BespokeAnimationProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      variants={bespokeAnimationPresets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ duration: d.slow, ease: ease.outExpo, delay }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
}

// Children reveal one after another as the group scrolls into view.
export function StaggerContainer({ children, staggerDelay = stagger, className, itemClassName }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ staggerChildren: staggerDelay }}
    >
      {React.Children.map(children, (child) => (
        <motion.div className={itemClassName} variants={reveal} transition={{ duration: d.slow, ease: ease.outExpo }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export { BespokeAnimation };
