# Pointer AI Landing Page - Design System Documentation

## Overview
This is a comprehensive guide to replicate the Pointer AI landing page design system. The design features a dark, sophisticated aesthetic with teal/cyan accents and smooth animations.

---

## Color System

### Primary Colors
- **Background**: `hsl(210 11% 7%)` - `#0f1211` - Very dark blue-gray, almost black
- **Foreground**: `hsl(160 14% 93%)` - `#e7eceb` - Off-white with slight teal tint
- **Primary Accent**: `hsl(165 96% 71%)` - `#78fcd6` - Bright teal/cyan (signature color)
- **Primary Dark**: `hsl(160 100% 50%)` - `#00ffb6` - Vibrant teal
- **Primary Light**: `hsl(160 48% 87%)` - Lighter teal for subtle accents

### Secondary Colors
- **Secondary**: `hsl(160 14% 93%)` - `#e7eceb` - Light gray-teal (for buttons)
- **Secondary Foreground**: `hsl(165 14% 8%)` - `#141a18` - Very dark teal

### Neutral Colors
- **Muted**: `hsl(240 2% 16%)` - `#27272a` - Dark gray
- **Muted Foreground**: `hsl(160 14% 93% / 0.7)` - Semi-transparent off-white
- **Muted Foreground Light**: `hsl(160 14% 93% / 0.5)` - More transparent
- **Muted Foreground Dark**: `hsl(160 14% 93% / 0.6)` - Medium transparency

### Accent Colors
- **Accent**: `hsl(240 2% 25%)` - `#3f3f42` - Medium gray
- **Accent Foreground**: `hsl(240 2% 96%)` - `#f4f4f5` - Very light gray

### Border Colors
- **Border**: `hsl(240 100% 100% / 0.08)` - White with 8% opacity
- **Border Light**: `hsl(210 17% 6% / 0.1)` - Dark with 10% opacity
- **Border Dark**: `hsl(210 17% 6% / 0.05)` - Dark with 5% opacity

### Usage Guidelines
- **Total Colors**: 5 main colors (background, foreground, primary, secondary, muted)
- **Accent Usage**: Primary teal used sparingly for CTAs and highlights
- **No Gradients**: Solid colors preferred; gradients only in hero background SVG
- **Contrast**: Always ensure proper text contrast when changing backgrounds

---

## Typography

### Font Families
- **Sans Serif**: Geist Sans (primary font for all text)
- **Monospace**: Geist Mono (for code snippets if needed)

### Font Sizes & Hierarchy
- **Hero Heading**: `text-3xl md:text-4xl lg:text-6xl` (48px-72px)
- **Section Headings**: `text-4xl md:text-5xl lg:text-6xl` (48px-72px)
- **Subheadings**: `text-3xl md:text-4xl lg:text-[40px]` (32px-40px)
- **Body Large**: `text-lg md:text-xl` (18px-20px)
- **Body Regular**: `text-base` (16px)
- **Body Small**: `text-sm` (14px)
- **Caption**: `text-xs` (12px)

### Font Weights
- **Semibold**: `font-semibold` (600) - Headings
- **Medium**: `font-medium` (500) - Subheadings, buttons
- **Normal**: `font-normal` (400) - Body text

### Line Heights
- **Tight**: `leading-tight` - Headings
- **Relaxed**: `leading-relaxed` (1.625) - Body text
- **Loose**: `leading-loose` - Descriptive text

### Typography Rules
- Maximum 2 font families (Geist Sans + Geist Mono)
- Use `text-balance` or `text-pretty` for titles
- Line-height between 1.4-1.6 for body text
- Never use decorative fonts for body text

---

## Layout Structure

### Container System
- **Max Width**: `max-w-[1320px]` - Main content container
- **Pricing/Testimonials**: `max-w-[1100px]` - Narrower sections
- **Hero Text**: `max-w-md md:max-w-[500px] lg:max-w-[588px]`

### Spacing Scale
- **Section Padding**: `py-8 md:py-14 lg:py-16`
- **Component Gaps**: `gap-2`, `gap-4`, `gap-6` (8px, 16px, 24px)
- **Horizontal Padding**: `px-4`, `px-5`, `px-6` (16px, 20px, 24px)

### Grid System
- **Bento Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Social Proof**: `grid-cols-2 md:grid-cols-4`
- **Testimonials**: Flexbox columns with `flex-1`

### Responsive Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

### Layout Method Priority
1. **Flexbox** for most layouts: `flex items-center justify-between`
2. **CSS Grid** for complex 2D layouts: `grid grid-cols-3 gap-4`
3. **Never use floats** or absolute positioning unless necessary

---

## Component Patterns

### Buttons

#### Primary Button (CTA)
\`\`\`tsx
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10">
  Signup for free
</Button>
\`\`\`
- **Style**: Light button on dark background
- **Shape**: Fully rounded (`rounded-full`)
- **Padding**: `px-6` to `px-8`, `py-2` to `py-3`
- **Shadow**: Subtle shadow with ring

#### Secondary Button
\`\`\`tsx
<Button className="bg-zinc-300 text-gray-800 hover:bg-zinc-400 px-6 py-2 rounded-full">
  Get Started
</Button>
\`\`\`

#### Pricing Button (Popular)
\`\`\`tsx
<Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
  Join now
</Button>
\`\`\`

### Cards

#### Bento Card
- **Background**: `rgba(231, 236, 235, 0.08)` with `backdrop-filter: blur(4px)`
- **Border**: `border-white/20`
- **Padding**: `p-6`
- **Radius**: `rounded-2xl`
- **Gradient Overlay**: `bg-gradient-to-br from-white/5 to-transparent`

#### Pricing Card
- **Regular**: Gradient background `from-gray-50/5 to-gray-50/0` with border
- **Popular**: Solid `bg-primary` with shadow
- **Padding**: `p-4`
- **Radius**: `rounded-xl`

#### Testimonial Card (Large)
- **Teal Variant**: `bg-primary` with SVG background pattern
- **Light Variant**: `bg-[rgba(231,236,235,0.12)]` with opacity pattern
- **Height**: `h-[502px]`
- **Width**: `w-full md:w-[384px]`

#### Testimonial Card (Small)
- **Background**: `bg-card` with border
- **Height**: `h-[244px]`
- **Padding**: `p-[30px]`

### Animations

#### Scroll Animation (Framer Motion)
\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0 }}
>
  {children}
</motion.div>
\`\`\`
- **Effect**: Fade in + slide up + subtle scale
- **Duration**: 0.8s
- **Easing**: Custom cubic-bezier `[0.33, 1, 0.68, 1]`
- **Trigger**: Once when in viewport

#### Price Toggle Animation
\`\`\`tsx
style={{
  opacity: isAnnual ? 1 : 0,
  transform: `scale(${isAnnual ? 1 : 0.8})`,
  filter: `blur(${isAnnual ? 0 : 4}px)`,
}}
\`\`\`
- **Transition**: Opacity + scale + blur
- **Duration**: 500ms

---

## Visual Elements

### Hero Background
- **Pattern**: SVG grid with dashed lines
- **Grid Size**: 36x36px cells
- **Stroke**: `hsl(var(--foreground))` at 11% opacity
- **Stroke Width**: 0.4px
- **Dash Array**: `2 2`
- **Gradient Overlays**: Multiple filtered gradients with teal-to-white transitions
- **Blend Modes**: `lighten` and `overlay` for depth

### Dashboard Preview
- **Container**: `bg-primary-light/50` with `rounded-2xl` and `p-2`
- **Shadow**: `shadow-2xl`
- **Image**: Rounded corners `rounded-xl` with `shadow-lg`
- **Width**: `w-[calc(100vw-32px)] md:w-[1160px]`

### Social Proof Logos
- **Display**: Grid layout `grid-cols-2 md:grid-cols-4`
- **Style**: Grayscale with 70% opacity
- **Size**: Max width 400px, auto height

### Icons
- **Library**: Lucide React
- **Sizes**: 16px, 20px, 24px
- **Stroke Width**: 2
- **Never use emojis** as icon replacements

---

## Section Breakdown

### 1. Hero Section
- **Height**: `h-[400px] md:h-[600px] lg:h-[810px]`
- **Background**: Complex SVG with grid pattern and gradient overlays
- **Content**: Centered text with CTA button
- **Header**: Positioned absolutely at top

### 2. Dashboard Preview
- **Position**: Absolute, overlapping hero bottom
- **Offset**: `bottom-[-150px] md:bottom-[-400px]`
- **Z-index**: 30 (above hero)

### 3. Social Proof
- **Margin Top**: `mt-[411px] md:mt-[400px]` (accounts for dashboard overlap)
- **Content**: Centered text + logo grid

### 4. Bento Section (Features)
- **Layout**: 3-column grid on desktop
- **Background Blur**: Decorative blur element `blur-[130px]`
- **Cards**: 6 feature cards with illustrations

### 5. Pricing Section
- **Toggle**: Annual/Monthly with animated transition
- **Cards**: 3 pricing tiers (Free, Pro, Ultra)
- **Popular Badge**: Gradient background on Pro plan

### 6. Testimonials
- **Layout**: 3 flexible columns
- **Cards**: Mix of large (2) and small (5) testimonials
- **Avatars**: Rounded with subtle border

### 7. FAQ Section
- **Component**: Accordion with expand/collapse
- **Style**: Consistent with card patterns

### 8. CTA Section
- **Style**: Final conversion section
- **Button**: Primary CTA style

### 9. Footer
- **Content**: Links, social, copyright
- **Style**: Minimal, dark background

---

## Design Principles

### 1. Dark Mode First
- Design is optimized for dark backgrounds
- Light elements provide contrast
- Teal accent creates visual interest

### 2. Subtle Depth
- Use blur effects (`backdrop-filter: blur(4px)`)
- Layered gradients with low opacity
- Soft shadows (`shadow-lg`, `shadow-2xl`)

### 3. Smooth Animations
- All animations use easing functions
- Scroll-triggered animations fire once
- Transitions are 0.5s-0.8s duration

### 4. Generous Spacing
- Sections have ample padding
- Components use consistent gap values
- White space enhances readability

### 5. Mobile-First Responsive
- Design scales from mobile up
- Breakpoints at 768px (md) and 1024px (lg)
- Touch-friendly button sizes

---

## Technical Implementation

### Tailwind Configuration
\`\`\`js
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-geist-sans)'],
      mono: ['var(--font-geist-mono)'],
    },
    colors: {
      // Use CSS variables for theming
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: 'hsl(var(--primary))',
      // ... etc
    },
    borderRadius: {
      DEFAULT: '0.5rem',
    }
  }
}
\`\`\`

### CSS Variables (globals.css)
- All colors defined as HSL values
- Use `hsl(var(--color-name))` in Tailwind
- Enables easy theme switching

### Component Structure
- Modular components in `/components`
- Feature components in `/components/bento`
- Reusable UI components in `/components/ui`

### Animation Library
- **Framer Motion** for scroll animations
- Custom easing curves for smooth motion
- `viewport={{ once: true }}` to prevent re-triggering

---

## Key Differentiators

### What Makes This Design Unique

1. **Sophisticated Dark Aesthetic**
   - Not pure black, but dark blue-gray
   - Teal accent creates tech-forward feel
   - Subtle transparency and blur effects

2. **Complex Hero Background**
   - Multi-layered SVG with gradients
   - Dashed grid pattern
   - Filtered overlays with blend modes

3. **Overlapping Dashboard Preview**
   - Creates visual flow between sections
   - Adds depth and dimension
   - Requires careful spacing calculations

4. **Mixed Testimonial Sizes**
   - Large cards for featured testimonials
   - Small cards for supporting quotes
   - Asymmetric grid creates visual interest

5. **Animated Price Toggle**
   - Smooth opacity + scale + blur transition
   - Feels premium and polished
   - Better UX than instant switch

6. **Glassmorphism Effects**
   - Backdrop blur on cards
   - Semi-transparent backgrounds
   - Layered gradients for depth

---

## Replication Checklist

To replicate this design:

- [ ] Set up dark background (`#0f1211`)
- [ ] Configure teal accent color (`#78fcd6`)
- [ ] Install Geist Sans and Geist Mono fonts
- [ ] Create CSS variables for all theme colors
- [ ] Build SVG grid background for hero
- [ ] Implement Framer Motion for scroll animations
- [ ] Create glassmorphism card components
- [ ] Set up responsive grid layouts
- [ ] Add backdrop blur effects
- [ ] Implement smooth transitions (0.5s-0.8s)
- [ ] Use rounded-full for all buttons
- [ ] Add subtle shadows and borders
- [ ] Create overlapping dashboard preview
- [ ] Build mixed-size testimonial grid
- [ ] Add animated price toggle
- [ ] Ensure mobile-first responsive design

---

## Common Pitfalls to Avoid

1. **Don't use pure black** - Use `#0f1211` instead
2. **Don't overuse the teal accent** - Use sparingly for CTAs
3. **Don't skip the blur effects** - They add essential depth
4. **Don't use instant transitions** - Always add easing
5. **Don't forget mobile spacing** - Test on small screens
6. **Don't use arbitrary values** - Stick to Tailwind scale
7. **Don't mix border styles** - Consistent `border-white/20`
8. **Don't skip the grid background** - It's essential to the aesthetic

---

## Resources

- **Fonts**: Geist Sans, Geist Mono (from Vercel)
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui base components

---

## Summary

This design system creates a **premium, tech-forward aesthetic** through:
- Dark, sophisticated color palette with teal accents
- Smooth scroll animations and transitions
- Glassmorphism effects with blur and transparency
- Complex SVG backgrounds with gradients
- Mobile-first responsive design
- Generous spacing and typography hierarchy

The key to replication is **attention to detail**: subtle shadows, precise spacing, smooth animations, and consistent use of the teal accent color.


package.json

{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "1.3.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "geist": "^1.3.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "14.2.25",
    "next-themes": "^0.4.4",
    "react": "^19",
    "react-day-picker": "9.8.0",
    "react-dom": "^19",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.6",
    "zod": "^3.24.1",
    "framer-motion": "12.23.24"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^3.4.17",
    "typescript": "5.7.3"
  }
}



tailwind config

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))", // Added primary-light
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
