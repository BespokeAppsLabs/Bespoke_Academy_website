"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bespokeCardVariants = cva(
  "relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        "course-card":
          "bg-white/95 border-neutral-200/50 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-white/100",
        "stats-card":
          "bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl hover:scale-102",
        "testimonial-card":
          "bg-white/90 border-neutral-200/30 shadow-md hover:shadow-lg hover:bg-white/95",
        "feature-card":
          "bg-gradient-to-br from-white/95 to-white/80 border-neutral-200/50 shadow-lg hover:shadow-xl hover:scale-105 hover:from-white/100 hover:to-white/90 ring-1 ring-neutral-200/30 hover:ring-neutral-300/50",
        "glass-card":
          "bg-white/10 backdrop-blur-md border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20",
        "premium-card":
          "bg-gradient-to-br from-primary-emerald-50/95 to-white/90 border-primary-emerald-200/50 shadow-lg hover:shadow-xl hover:scale-105 hover:from-primary-emerald-100/95 hover:to-white/95 ring-2 ring-primary-emerald-400/20 hover:ring-primary-emerald-400/40"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10"
      },
      animation: {
        none: "",
        float: "hover:shadow-2xl hover:-translate-y-1",
        scale: "hover:scale-105",
        glow: "hover:shadow-primary-emerald-500/25 hover:shadow-2xl",
        tilt: "hover:scale-105 hover:rotate-0.5"
      }
    },
    defaultVariants: {
      variant: "course-card",
      size: "default",
      animation: "scale"
    }
  }
);

export interface BespokeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bespokeCardVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const BespokeCard = React.forwardRef<HTMLDivElement, BespokeCardProps>(
  ({
    className,
    variant,
    size,
    animation,
    asChild = false,
    children,
    delay = 0,
    duration = 0.5,
    ...props
  }, ref) => {
    const Component = asChild ? React.Fragment : "div";

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration,
          delay,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: variant?.includes("scale") || variant?.includes("float") ? 1.02 : 1,
          y: animation === "float" ? -4 : 0,
          rotate: animation === "tilt" ? 0.5 : 0,
          transition: { duration: 0.2, ease: "easeInOut" }
        }}
        className={cn("relative group")}
      >
        <Component
          ref={ref}
          className={cn(bespokeCardVariants({ variant, size, animation }), className)}
          {...props}
        >
          {/* Gradient overlay for premium variants */}
          {(variant === "premium-card" || variant === "feature-card") && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}

          {/* Shimmer effect for premium cards */}
          {variant === "premium-card" && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          )}

          {/* Subtle glow effect */}
          {animation === "glow" && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl bg-inherit shadow-2xl blur-md" />
            </div>
          )}

          {children}
        </Component>
      </motion.div>
    );
  }
);

BespokeCard.displayName = "BespokeCard";

export { BespokeCard, bespokeCardVariants };