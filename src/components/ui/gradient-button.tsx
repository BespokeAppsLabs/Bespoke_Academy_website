"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        primary: "bg-cyber-blue text-white hover:bg-cyber-blue/90 hover:shadow-md active:bg-cyber-blue/95",
        secondary: "bg-electric-purple text-white hover:bg-electric-purple/90 hover:shadow-md active:bg-electric-purple/95",
        accent: "bg-neon-cyan text-foreground hover:bg-neon-cyan/90 hover:shadow-md active:bg-neon-cyan/95",
        warning: "bg-ai-orange text-white hover:bg-ai-orange/90 hover:shadow-md active:bg-ai-orange/95",
        ghost: "hover:bg-surface-elevated text-foreground",
        outline: "border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white",
        gradient: "bg-gradient-to-r from-cyber-blue to-electric-purple text-white hover:shadow-md active:bg-gradient-to-r active:from-cyber-blue/90 active:to-electric-purple/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-6 text-lg",
        xl: "h-14 rounded-xl px-8 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
      loading: {
        true: "cursor-not-allowed opacity-80",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      loading: false,
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, loading, loadingText, asChild = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, loading: loading || disabled, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Subtle shimmer effect - only for gradient variant */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100" />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading && loadingText ? loadingText : children}
        </span>
      </Comp>
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants }