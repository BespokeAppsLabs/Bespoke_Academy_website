context.md: Visual Context & Configuration Guide

This document is a companion to concept.md. While concept.md outlines the structure, components, and libraries (the "Blueprint"), this file captures the visual context, aesthetic nuances, and specific configurations (the "Polish") required to match the video.

1. Global Thematic Context

This context applies across all components.

Color Palette: The concept.md tailwind.config.js should be themed with these specific colors from the video:

Primary Green: A vibrant, modern green (e.g., Tailwind emerald-500 or #10B981). This is used for all "accent" elements (CTAs, headlines, icons).

Dark Background: A very deep, rich charcoal, not pure black (e.g., Tailwind zinc-900 or #18181b).

Light Background: A clean, soft off-white or light gray (e.g., white or Tailwind zinc-50).

Animation Feel: All Framer Motion animations are fast and sleek, not "bouncy."

Default Ease: Use ease: "easeInOut" or ease: "easeOut".

Default Duration: Most animations complete in under a second (e.g., duration: 0.5 or duration: 0.8).

Typography: The site uses a clean, modern, sans-serif font (like "Inter", "Manrope", or "Figtree"). All text is anti-aliased.

2. Component-Specific Context

This follows the structure of concept.md and the video's timeline.

HeroSection.tsx (00:00 - 00:09)

KenBurnsImage (00:01):

Context: The effect is extremely subtle and slow.

Configuration: The Magic UI component's props must be set for a long duration (e.g., duration={15} or speed="slow") to avoid a cheesy, fast-moving effect.

Curtain Reveal Animation (00:06):

Context: The Framer Motion curtain (motion.div) reveal is fast. The content inside (headline, text) fades in after the curtain is gone.

Configuration: The curtain motion.div should have a delay: 0.5s and duration: 0.8s. The content's motion.div must have a delay: 1.0s (or delay: 0.2s after the curtain animation completes).

FeaturesSection.tsx (00:10 - 00:13)

Icons (00:11):

Context: The concept.md file correctly identifies lucide-react as a placeholder. The video uses custom, thin-line, two-tone icons that are more elegant.

Configuration: To achieve a perfect clone, these icons must be sourced as SVGs and rendered. The lucide-react icons will be a visual mismatch.

LogoCloud.tsx (00:13 - 00:15)

Gradient Fade (00:13):

Context: The logos in the video do not "pop" into view. They smoothly fade in and out at the horizontal edges.

Configuration: The Magic UI <Marquee> component must be placed inside a div with a CSS mask-image applied.

CSS Example: mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);

StickyScrollWrapper.tsx & SolutionsSection.tsx (00:15 - 00:26)

Carousel Progress Bar (00:25):

Context: This is the most significant potential mismatch. The shadcn/ui <Carousel> component does not include the white, horizontal line-based progress bar seen at the bottom of the carousel.

Configuration: This is a custom sub-component that must be built. It will need to use the Carousel's API (e.g., api.scrollProgress()) to update its width or a 'fill' element's width as the user scrolls, which shadcn/ui provides.

StatsSection.tsx (00:32 - 00:35)

Typographic Contrast (00:34):

Context: The entire impact of this section comes from extreme typographic contrast.

Configuration: The concept.md's <h3> and <p> tags are structurally correct, but they must be styled. The number (e.g., "93%") should be massive and bold (e.g., text-5xl md:text-7xl font-bold). The sub-text (e.g., "Projects Completed") must be significantly smaller (e.g., text-base) and have a slightly lighter opacity (e.g., text-green-800/75).

ContactSection.tsx (00:43 - 00:47)

Background World Map (00:44):

Context: The world map in the background is a very faint, low-opacity pattern, not a solid image.

Configuration: This is a background PNG or SVG. The style attribute in concept.md should be implemented with an opacity overlay. The dark background color (bg-zinc-900) should be on top of the image with opacity-90 (as correctly noted in concept.md) to push the map far into the background.

FinalCta.tsx (00:52 - 00:53)

WavyBackground Configuration (00:52):

Context: The Aceternity UI component's default props will not match the video. The video shows thin, slow, light-green waves.

Configuration: The component must be passed props to control its look, e.g., <WavyBackground speed="slow" amplitude={10} color="#10B981">. These values will require experimentation to match the video.