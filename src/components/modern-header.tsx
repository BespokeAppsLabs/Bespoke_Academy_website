"use client";

import { BespokeTopNav } from "@/components/ui/bespoke";

export interface ModernHeaderProps {
  variant?: "light" | "dark";
  showLogo?: boolean;
  ctaButtons?: boolean;
}

export function ModernHeader({
  variant = "light",
  showLogo = true,
  ctaButtons = true
}: ModernHeaderProps) {
  return (
    <BespokeTopNav
      showLogo={showLogo}
      ctaButtons={ctaButtons}
      className={variant === "dark" ? "bg-neutral-900/90" : ""}
    />
  );
}

export default ModernHeader;