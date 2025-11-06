"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const glassCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background/40 backdrop-blur-md border-border/50 hover:bg-background/50 hover:border-border/70",
        elevated: "bg-background/50 backdrop-blur-lg border-border/60 shadow-md hover:bg-background/60 hover:shadow-lg hover:border-border/80",
        bordered: "bg-background/20 backdrop-blur-sm border-border/60 hover:bg-background/30 hover:border-border/80",
        dark: "dark:bg-surface/60 dark:backdrop-blur-lg dark:border-border/50 dark:hover:bg-surface/70 dark:hover:border-border/70",
        glow: "bg-background/40 backdrop-blur-md border-border/50 hover:bg-background/50 hover:border-border/70 shadow-lg shadow-cyber-blue/10",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
      rounded: {
        default: "rounded-xl",
        sm: "rounded-lg",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  glowColor?: "cyber-blue" | "electric-purple" | "neon-cyan" | "tech-green" | "ai-orange"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, rounded, glowColor, children, ...props }, ref) => {
    const glowColors = {
      "cyber-blue": "from-cyber-blue/20 to-cyber-blue/5",
      "electric-purple": "from-electric-purple/20 to-electric-purple/5",
      "neon-cyan": "from-neon-cyan/20 to-neon-cyan/5",
      "tech-green": "from-tech-green/20 to-tech-green/5",
      "ai-orange": "from-ai-orange/20 to-ai-orange/5",
    }

    return (
      <div
        ref={ref}
        className={cn(glassCardVariants({ variant, size, rounded, className }))}
        {...props}
      >
        {/* Subtle glow effect */}
        {glowColor && (
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br pointer-events-none",
            glowColors[glowColor]
          )} />
        )}

        {/* Additional inner glow for elevated variant */}
        {variant === "elevated" && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
        )}

        {/* Subtle shimmer effect - only on hover */}
        {variant === "glow" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none opacity-0 group-hover:opacity-100" />
        )}

        <div className="relative z-10">
          {children}
        </div>
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard, glassCardVariants }