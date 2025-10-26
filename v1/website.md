# Bespoke Academy Website Plan

## 1. Overview
The Bespoke Academy website is the central hub for our educational programs. It provides comprehensive information about our curriculum, teacher training, and student resources, and is designed to inspire and engage visitors. It aims to empower schools and students by providing easily navigable, accessible, and engaging content. The website serves to connect educators and learners with high-quality AI and Robotics educational materials, fostering a community of innovation and continuous learning. It strives to be an authoritative resource that supports the development of skills critical for the future workforce.

This document is designed as a complete specification and context for an AI agent or development team to use when building the Bespoke Academy website.

With this context, the agent will be able to:
- Implement the website layout and structure as specified.
- Populate the site with detailed and accurate content.
- Apply the described UI/UX effects and interactive elements.
- Ensure the website is accessible and mobile-friendly.
- Incorporate visual hierarchy and typography guidelines.
- Facilitate future dynamic content integration and form handling.
- Maintain consistency with the brand and mission throughout the site.

## 2. Layout & Structure
- **Header:** The header features the Bespoke Academy logo on the left with a small tagline beneath it reading "Innovate. Educate. Empower." It includes navigation links on the right (Home, Curriculum, Resources, Contact) with dropdown menus for subpages where applicable. The header is sticky, remaining visible as users scroll, ensuring easy access to navigation at all times.
- **Hero Section:** This section uses a full-screen background image or subtle video illustrating engaged students working with robotics kits. The bold headline states "Empowering High School Students with AI & Robotics," accompanied by a supportive subheading that reads "Building the innovators of tomorrow through hands-on learning and expert guidance." There are primary and secondary CTA buttons: "Explore Curriculum" and "Download Full Curriculum," encouraging immediate engagement.
- **About Section:** This section provides a detailed narrative about Bespoke Academy’s mission, values, and impact. It tells the story of how the academy was founded to bridge the gap between traditional education and emerging technologies, emphasizing inclusivity and real-world application. The content highlights the dedication to providing cutting-edge curricula that prepare students for future careers in technology.
- **Programs Section:** Features visually appealing cards for each program: Unified Curriculum, Teacher Training, and Student Resources. Each card includes an image, the program title, and a 2–3 sentence description outlining the program's objectives and benefits. Each card has a 'Learn More' link directing users to dedicated subpages with more detailed information.
- **Curriculum Overview Section:** An interactive timeline or accordion layout presents the curriculum week by week. Each week expands to reveal detailed topics covered, learning objectives, and examples of student work or projects. This section is designed to provide transparency and allow teachers and students to understand the progression and depth of the curriculum.
- **Testimonials Section:** A rotating carousel showcases quotes from teachers and students who have participated in the programs. Each testimonial includes a photo, name, role, and a brief statement highlighting their positive experiences and outcomes from engaging with Bespoke Academy.
- **Contact Section:** Contains a rich contact form with fields for name, email, and message, enabling users to reach out easily. Additionally, it includes a map or location details of the academy’s headquarters and a link to an FAQ page to assist with common inquiries.
- **Footer:** The footer displays social media icons linking to Bespoke Academy’s profiles, a newsletter signup form to keep users informed about updates, copyright information, quick links to important pages, and terms & privacy policy links.

## 3. UI/UX Effects
- Smooth scroll between sections.
- Fade-in animations on scroll for cards and text.
- Interactive accordion/tabs for curriculum weeks.
- Responsive design for mobile/tablet.
- Enhanced select dropdowns with images/icons.
- No hover-only interactions; ensure tap-friendly on mobile.

## 4. Visual Hierarchy & Typography
- Clear heading styles (H1 for main titles, H2 for section titles).
- Use accessible, high-contrast colors.
- Adequate whitespace between sections.

## 5. Content Draft
- **Hero Paragraph:** "We equip the next generation of innovators with the skills and knowledge to excel in AI and Robotics. Our hands-on curriculum and expert guidance empower students to explore, create, and lead in the rapidly evolving tech landscape."
- **About Paragraph:** "Founded to bring cutting-edge technology education to high schools, Bespoke Academy is committed to delivering inclusive, engaging, and practical learning experiences. Our mission is to inspire students and educators alike, fostering a passion for AI, Robotics, and software development that prepares learners for the challenges of tomorrow."
- **Programs Paragraphs:**  
  - *Unified Curriculum:* "Our comprehensive curriculum integrates AI and Robotics concepts with software development, providing students with a cohesive learning journey from foundational principles to advanced applications."  
  - *Teacher Training:* "We offer specialized training for educators to equip them with the skills and resources needed to effectively deliver our curriculum and inspire their students."  
  - *Student Resources:* "A rich collection of supplementary materials, tutorials, and project guides designed to support student learning and encourage exploration beyond the classroom."
- **CTA Paragraph:** "Download the full curriculum today to explore detailed lesson plans, project outlines, and assessment tools that will help you bring AI and Robotics education to your school with confidence."

## 6. Roadmap
- Build static pages with Next.js.
- Add dynamic content for curriculum modules later.
- Integrate form submissions with email or CRM.

## 7. Aims & Objectives
- Present the curriculum clearly and attractively to engage both educators and students.
- Encourage student and teacher sign-ups through intuitive navigation and compelling calls to action.
- Provide easily accessible downloadable resources and multiple contact channels for support.
- Showcase success stories and testimonials to build trust and demonstrate impact.
- Ensure the website is fully accessible, mobile-friendly, and inclusive to all users.
- Foster a user experience that is smooth, interactive, and informative, supporting diverse learning styles and needs.
- This document acts as the single source of truth for any automated or human developer building the site.

## 8. Design System & Component Guidelines

### 8.1 Color Palette
- **Primary Colors:**  
  - Deep Blue (#1A237E) – used for headers, primary CTAs, and key accents to convey trust and professionalism.  
  - Vibrant Cyan (#00BCD4) – used for secondary buttons, links, and highlights to add energy and approachability.  
- **Secondary Colors:**  
  - Soft Gray (#F5F5F5) – background areas to provide clean, minimalistic space.  
  - Medium Gray (#9E9E9E) – for secondary text and borders.  
- **Accent Colors:**  
  - Warm Orange (#FF7043) – used sparingly for alerts, highlights, or important notices.  
- **Neutral Colors:**  
  - White (#FFFFFF) – primary background color for content areas.  
  - Black (#000000) – for text and icons ensuring high contrast.  
- All colors meet WCAG AA contrast standards for accessibility.

- **Dark Mode Colors:**  
  - Primary Background: Dark Gray (#121212) – used as the main background color in dark mode to reduce eye strain and provide a modern aesthetic.  
  - Primary Color Accents: Deep Blue (#0D1B66) and Vibrant Cyan (#00BCD4) – used for headers, CTAs, and highlights to maintain brand consistency while ensuring sufficient contrast in dark mode.  
  - Secondary Background: Medium Dark Gray (#1E1E1E) – for cards, sections, and interactive elements to create depth.  
  - Text Colors: Light Gray (#E0E0E0) for body text and White (#FFFFFF) for headings to ensure readability.  
  - Accent Colors: Warm Orange (#FF7043) remains consistent, used carefully to maintain visibility and contrast.  
  - All dark mode colors are selected to meet or exceed WCAG 2.1 AA contrast standards for accessibility.

### 8.2 Typography
- **Font Family:**  
  - Primary: "Inter", sans-serif – clean, modern, and highly legible.  
- **Font Weights:**  
  - Regular (400) for body text.  
  - Medium (500) for subheadings and buttons.  
  - Bold (700) for headings and emphasis.  
- **Font Sizes:**  
  - H1: 3rem (48px) – used for main page titles.  
  - H2: 2rem (32px) – section headings.  
  - H3: 1.5rem (24px) – sub-section titles or card titles.  
  - Body: 1rem (16px) – standard paragraph text.  
  - Small: 0.875rem (14px) – captions, labels, and fine print.  
- **Line Height:** 1.5 for body text to ensure readability.  
- **Letter Spacing:** Normal for body, slight negative tracking for headings for a polished look.

### 8.3 Component Styles

#### Header
- Sticky with subtle shadow on scroll.  
- Logo aligned left with tagline beneath in smaller font size and lighter color.  
- Navigation links aligned right with dropdown menus indicated by downward arrows.  
- Active link highlighted with underline and primary color.

#### Buttons
- **Primary Button:** Deep Blue background, white text, rounded corners (6px), padding 12px 24px, subtle shadow on hover/focus.  
- **Secondary Button:** Vibrant Cyan background, white text, same shape and padding as primary.  
- Disabled state: gray background with reduced opacity, no pointer events.  
- Buttons have accessible focus outlines.

#### Cards (Programs Section)
- White background with subtle drop shadow.  
- Rounded corners (8px), padding 24px.  
- Image at top, followed by title (H3) and description (body text).  
- ‘Learn More’ link styled as underline text with vibrant cyan color.  
- Cards fade in on scroll.

#### Accordion / Timeline (Curriculum Overview)
- Accordion headers use H3 with bold font.  
- Expand/collapse icons aligned right, animated rotation on toggle.  
- Content area with light gray background and padding.  
- Smooth height transition animations on open/close.  
- Keyboard navigable with focus indicators.

#### Testimonials Carousel
- Circular photos with 80px diameter, border in primary color.  
- Quote text in italic, medium gray color.  
- Name and role below quote in bold and regular font respectively.  
- Carousel auto-rotates every 8 seconds, with manual controls (prev/next buttons).  
- Pause on hover or focus.

#### Contact Form
- Input fields with border radius 6px, border color medium gray.  
- Focus state: border color changes to vibrant cyan, with subtle box shadow.  
- Labels above inputs, with required fields marked by asterisk.  
- Submit button styled as primary button.  
- Validation messages in warm orange color below inputs.  
- Responsive layout with stacked fields on mobile.

#### Footer
- Dark background (Deep Blue or near black).  
- White text and icons.  
- Social media icons sized 24px with hover color change to vibrant cyan.  
- Newsletter signup input with inline submit button.  
- Links underlined on hover.

### 8.4 Interaction Guidelines
- Smooth scrolling for internal navigation links.  
- Fade-in animations triggered on scroll for cards, text blocks, and images.  
- Accordion and tabs have smooth open/close transitions.  
- Dropdown menus open on click or tap, not hover only, to ensure mobile usability.  
- All interactive elements have visible focus states for keyboard users.  
- Buttons and links have adequate touch target sizes (minimum 44x44px).  
- No auto-playing audio or video; any media includes controls and can be paused.  
- Carousel controls are keyboard accessible and have ARIA labels.

### 8.5 Library Notes
- **Shadcn UI:** Utilize Shadcn components for accessible, customizable UI elements like buttons, accordions, modals, and forms. Leverage its built-in accessibility features and style overrides to match the Bespoke Academy brand.  
- **Eternity UI:** Use Eternity UI components for layout grids, responsive containers, and interactive elements such as carousels and tabs. Integrate with Shadcn components for a consistent look and feel.  
- Both libraries support dark mode and can be configured for future theming needs, ensuring seamless switching between light and dark color palettes.  
- Ensure all third-party components are styled to align with the bespoke color palette and typography.

### 8.6 Accessibility Best Practices
- All images include descriptive alt text.  
- Use semantic HTML5 elements (header, nav, main, section, footer, etc.) for meaningful structure.  
- Ensure color contrast ratios meet or exceed WCAG 2.1 AA standards in both light and dark modes.  
- Provide keyboard navigability for all interactive components.  
- Use ARIA roles and labels where necessary to enhance screen reader experience.  
- Form fields have associated labels and error messages are announced to screen readers.  
- Responsive design ensures content is legible and usable on all devices.  
- Avoid content that flashes or flickers to prevent seizures.  
- Provide skip links to allow users to bypass repetitive navigation.  
- Dark mode implementation must maintain accessibility standards, including sufficient contrast and clear focus indicators, to support users with visual impairments or light sensitivity.

---

This comprehensive plan integrates the previously outlined layout, content, and objectives with detailed visual and interaction guidelines, ensuring the Bespoke Academy website is built as a cohesive, accessible, and engaging platform for educators and students alike.
