import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "stacked" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
  priority?: boolean
  colorVariant?: "default" | "monochrome" | "emerald"
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  priority = false,
  colorVariant = "default"
}: LogoProps) {
  // Map variants to file paths
  const logoPath = {
    full: "/brain-circuit-logo-optimized.svg",
    stacked: "/brain-circuit-logo-stacked.svg",
    icon: "/brain-circuit-logo-icon.svg"
  }[variant]

  // Map sizes to dimensions
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 40, height: 24 },  // Different aspect ratio for full logo
    lg: { width: 56, height: 56 }
  }[variant === "full" ? "md" : size]  // Full logo uses different sizing

  // Apply color filters based on variant
  const colorFilter = {
    default: "",
    monochrome: "grayscale",
    emerald: "hue-rotate-0 saturate-150" // Enhance emerald tones
  }[colorVariant];

  return (
    <div className={cn("relative", className)}>
      <Image
        src={logoPath}
        alt="Bespoke Academy - Brain Circuit AI Education Logo"
        width={dimensions.width}
        height={dimensions.height}
        className={cn("w-full h-full object-contain", colorFilter)}
        priority={priority}
        style={{
          filter: colorVariant === "emerald" ? "hue-rotate(0deg) saturate(1.5)" :
                 colorVariant === "monochrome" ? "grayscale(100%)" : "none"
        }}
      />
    </div>
  )
}

// Convenience components for common use cases
export function LogoIcon({ className, ...props }: Omit<LogoProps, "variant">) {
  return <Logo variant="icon" className={className} {...props} />
}

export function LogoFull({ className, ...props }: Omit<LogoProps, "variant">) {
  return <Logo variant="full" className={className} {...props} />
}

export function LogoStacked({ className, ...props }: Omit<LogoProps, "variant">) {
  return <Logo variant="stacked" className={className} {...props} />
}