import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "stacked" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
  priority?: boolean
}

// ponytail: every variant shows the Bespoke </> mark for now; split per variant when the academy gets its own artwork.
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/bespoke-mark.svg"
        alt="Bespoke"
        width={64}
        height={64}
        className="w-full h-full object-contain"
        priority={priority}
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
