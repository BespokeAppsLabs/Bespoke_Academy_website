"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const simpleCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        solid: "bg-card border-border shadow-sm hover:shadow-md",
        minimal: "bg-transparent border-border/50 hover:border-border",
        elevated: "bg-card border-border shadow-md hover:shadow-lg",
        subtle: "bg-muted/30 border-border/50 hover:bg-muted/50",
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
      variant: "solid",
      size: "default",
      rounded: "default",
    },
  }
)

export interface SimpleCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof simpleCardVariants> {}

const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ className, variant, size, rounded, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(simpleCardVariants({ variant, size, rounded, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SimpleCard.displayName = "SimpleCard"

export { SimpleCard, simpleCardVariants }


