"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bespokeBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        "skill-tag":
          "bg-primary-emerald-100 text-primary-emerald-800 border-primary-emerald-200 hover:bg-primary-emerald-200 hover:scale-105",
        "certification":
          "bg-gradient-to-r from-primary-emerald-500 to-primary-emerald-600 text-white border-primary-emerald-400 shadow-md hover:shadow-lg hover:scale-105",
        "progress-indicator":
          "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200",
        "level-badge":
          "bg-gradient-to-r from-primary-emerald-500 to-primary-emerald-600 text-white border-primary-emerald-400 shadow-md hover:shadow-lg hover:scale-105",
        "status-active":
          "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
        "status-pending":
          "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
        "status-completed":
          "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
        "tech-stack":
          "bg-neutral-850 text-white border-neutral-600 hover:bg-neutral-800 hover:border-primary-emerald-400",
        "premium":
          "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-300 shadow-lg hover:shadow-xl hover:scale-105",
        "glass":
          "bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:animate-bounce",
        glow: "hover:shadow-lg hover:scale-105",
        shimmer: "relative overflow-hidden"
      }
    },
    defaultVariants: {
      variant: "skill-tag",
      size: "default",
      animation: "none"
    }
  }
);

export interface BespokeBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bespokeBadgeVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
  stagger?: boolean;
  index?: number;
}

const BespokeBadge = React.forwardRef<HTMLDivElement, BespokeBadgeProps>(
  ({
    className,
    variant,
    size,
    animation,
    children,
    icon,
    delay = 0,
    stagger = false,
    index = 0,
    ...props
  }, ref) => {
    const staggerDelay = stagger ? index * 0.1 : 0;
    const totalDelay = delay + staggerDelay;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: totalDelay,
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        className={cn("relative group", className)}
      >
        <div className={cn(bespokeBadgeVariants({ variant, size, animation }), className)} {...props}>
          {/* Shimmer effect for premium badges */}
          {animation === "shimmer" && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          )}

          {/* Icon */}
          {icon && (
            <motion.span
              className="flex-shrink-0"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.span>
          )}

          {/* Content */}
          <span className="truncate">{children}</span>
        </div>
      </motion.div>
    );
  }
);

BespokeBadge.displayName = "BespokeBadge";

// Badge Collection Component for Skill Tags
export interface BadgeCollectionProps {
  badges: Array<{
    label: string;
    variant?: VariantProps<typeof bespokeBadgeVariants>["variant"];
    icon?: React.ReactNode;
  }>;
  variant?: VariantProps<typeof bespokeBadgeVariants>["variant"];
  size?: VariantProps<typeof bespokeBadgeVariants>["size"];
  animation?: VariantProps<typeof bespokeBadgeVariants>["animation"];
  stagger?: boolean;
  delay?: number;
  maxVisible?: number;
  className?: string;
}

export function BespokeBadgeCollection({
  badges,
  variant = "skill-tag",
  size = "default",
  animation = "none",
  stagger = true,
  delay = 0,
  maxVisible,
  className
}: BadgeCollectionProps) {
  const visibleBadges = maxVisible ? badges.slice(0, maxVisible) : badges;
  const remainingCount = maxVisible ? Math.max(0, badges.length - maxVisible) : 0;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visibleBadges.map((badge, index) => (
        <BespokeBadge
          key={`${badge.label}-${index}`}
          variant={badge.variant || variant}
          size={size}
          animation={animation}
          delay={delay}
          stagger={stagger}
          index={index}
          icon={badge.icon}
        >
          {badge.label}
        </BespokeBadge>
      ))}

      {remainingCount > 0 && (
        <BespokeBadge
          variant="tech-stack"
          size={size}
          delay={delay + (visibleBadges.length * 0.1)}
          stagger={false}
        >
          +{remainingCount} more
        </BespokeBadge>
      )}
    </div>
  );
}

export { BespokeBadge, bespokeBadgeVariants };