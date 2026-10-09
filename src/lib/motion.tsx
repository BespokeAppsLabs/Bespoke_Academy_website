"use client";

import { MotionConfig } from "motion/react";

// One motion vocabulary for the whole site.
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = { fast: 0.2, base: 0.45, slow: 0.8 };

export const spring = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 } as const;

export const stagger = 0.08;

// Entrance used across sections: small rise, blur clears, lands softly.
export const reveal = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const inView = { once: true, margin: "0px 0px -10% 0px" } as const;

// Honours the OS "reduce motion" setting: transforms are skipped, fades kept.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: duration.base, ease: ease.outExpo }}>
      {children}
    </MotionConfig>
  );
}
