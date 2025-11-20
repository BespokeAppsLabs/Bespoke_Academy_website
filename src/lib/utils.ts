import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Title management utilities
export interface TitleData {
  id: string;
  main: string;
  subtitle: string;
}

export const TITLES: TitleData[] = [
  {
    id: "current",
    main: "From Zero to AI Creator",
    subtitle: "Encouraging Creativity, Problem-Solving, and Confidence"
  },
  {
    id: "train-teen",
    main: "Train Your Child to",
    subtitle: "Outsmart the Machines"
  },
  {
    id: "warning-smarter",
    main: "Warning: This Course May ",
    subtitle: "Make Your Child Smarter Than You"
  },
  {
    id: "dont-let-ai-replace",
    main: "Don't Let AI Replace Your Kids - ",
    subtitle: "Teach Them to Control It"
  },
  {
    id: "screen-to-skill",
    main: "Turn Screen Time",
    subtitle: "Into Skill Time"
  },
  {
    id: "command-code",
    main: "Teach Your Child to Command the Code,",
    subtitle: "Not Just Consume It"
  },
  {
    id: "scroller-to-creator",
    main: "Transform Your Child ",
    subtitle: "From Scroller to Creator"
  },
  {
    id: "dont-wait-for-school",
    main: "Don't Wait for School —",
    subtitle: "The Future Starts Here"
  },
  {
    id: "skills-adults-struggle",
    main: "Teach Your Child Skills ",
    subtitle: "That Even Adults Struggle With"
  },
  {
    id: "where-teens-learn",
    main: "Bespoke Academy: Where Kids Learn ",
    subtitle: "Skills Adults Google"
  },
  {
    id: "next-gen-creators",
    main: "Next-Gen Creators Wanted. ",
    subtitle: "Only the Ambitious Need Apply."
  }
];

export function getTitleLengthCategory(title: string): 'short' | 'medium' | 'long' {
  const length = title.length;
  if (length <= 30) return 'short';
  if (length <= 50) return 'medium';
  return 'long';
}

export function getTitleFontSizeClass(category: 'short' | 'medium' | 'long'): string {
  switch (category) {
    case 'short':
      return 'text-4xl md:text-6xl lg:text-7xl';
    case 'medium':
      return 'text-3xl md:text-5xl lg:text-6xl';
    case 'long':
      return 'text-2xl md:text-4xl lg:text-5xl';
    default:
      return 'text-4xl md:text-6xl lg:text-7xl';
  }
}
