"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ease, inView } from "@/lib/motion";

// Gold rule that draws in under a key phrase when it scrolls into view.
export function GoldUnderline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inView}
        transition={{ duration: 1, delay: 0.3, ease: ease.outExpo }}
      />
    </span>
  );
}
