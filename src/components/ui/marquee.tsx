import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Seamless CSS marquee. Children render twice (the copy is aria-hidden + inert) and the
// track slides exactly one copy's width, so the loop never jumps. Each copy carries its
// trailing gap as padding, which keeps -50% exact. Pauses on hover/focus; with reduced
// motion it becomes a plain horizontally scrollable row.
export function Marquee({
  children,
  duration = 40,
  className,
  gapClass = "gap-6 pr-6",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  gapClass?: string;
}) {
  return (
    <div
      className={cn(
        "group/marquee relative overflow-hidden motion-reduce:overflow-x-auto",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className={cn("flex shrink-0", gapClass)}>{children}</div>
        <div className={cn("flex shrink-0 motion-reduce:hidden", gapClass)} aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}
