"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bespokeButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-emerald-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        "bespoke-primary":
          "bg-primary-emerald-500 hover:bg-primary-emerald-600 text-black shadow-lg hover:shadow-xl hover:scale-105 ring-1 ring-primary-emerald-400/20 hover:ring-primary-emerald-400/40",
        "bespoke-secondary":
          "bg-neutral-850 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl ring-1 ring-white/10 hover:ring-white/20",
        "bespoke-outline":
          "border-2 border-primary-emerald-500 text-primary-emerald-500 bg-white hover:bg-primary-emerald-50 hover:border-primary-emerald-600 hover:text-primary-emerald-600 shadow-md hover:shadow-lg",
        "bespoke-ghost":
          "hover:bg-neutral-800 text-white hover:text-primary-emerald-400",
        "bespoke-premium":
          "bg-gradient-to-r from-primary-emerald-500 to-primary-emerald-600 hover:from-primary-emerald-600 hover:to-primary-emerald-700 text-black shadow-xl hover:shadow-2xl hover:scale-105 ring-2 ring-primary-emerald-400/30 hover:ring-primary-emerald-400/50",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4 text-sm",
        lg: "h-12 rounded-full px-8 text-base font-semibold",
        xl: "h-14 rounded-full px-10 text-lg font-semibold",
        icon: "h-10 w-10 rounded-full",
      },
      animation: {
        none: "",
        scale: "active:scale-95",
        glow: "hover:shadow-primary-emerald-500/25 hover:shadow-2xl",
        bounce: "hover:animate-bounce",
      },
      loading: {
        true: "cursor-not-allowed opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      variant: "bespoke-primary",
      size: "default",
      animation: "none",
      loading: false,
    },
  }
);

export interface BespokeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bespokeButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  animation?: "none" | "scale" | "glow" | "bounce";
  fullWidth?: boolean;
}

const BespokeButton = React.forwardRef<HTMLButtonElement, BespokeButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    icon,
    loading = false,
    animation,
    fullWidth = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";

    const buttonVariants = bespokeButtonVariants({ variant, size, animation, loading });

    return (
      <motion.div
        whileHover={loading || disabled ? {} : { scale: animation === "scale" ? 1.05 : 1.02 }}
        whileTap={loading || disabled ? {} : { scale: animation === "scale" ? 0.95 : 0.98 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(fullWidth && "w-full")}
      >
        <Comp
          className={cn(buttonVariants, className)}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {/* Shimmer effect for premium variant */}
          {variant === "bespoke-premium" && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          )}

          {/* Loading spinner */}
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
          )}

          <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
            {icon && (
              <motion.span
                className={cn(loading && "animate-pulse")}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.span>
            )}
            {children}
          </span>
        </Comp>
      </motion.div>
    );
  }
);

BespokeButton.displayName = "BespokeButton";

export { BespokeButton, bespokeButtonVariants };