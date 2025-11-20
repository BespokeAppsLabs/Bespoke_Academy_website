# Bespoke Academy UI Components

This directory contains the custom UI components for Bespoke Academy, designed to maintain consistency with our educational mission and premium user experience.

## Components

### BespokeTopNav

A premium floating navigation component with glass-morphism design and smooth animations.

#### Features

- **Glass-morphism Design**: Backdrop blur with transparency for modern, premium feel
- **Scroll-based Animations**: Automatically hides/shows based on scroll direction
- **Responsive Design**: Desktop horizontal layout, mobile hamburger menu
- **Active Route Highlighting**: Visual indication of current page
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **Bespoke Academy Branding**: Integrated with Logo component and design system

#### Props

```typescript
interface BespokeTopNavProps {
  className?: string;           // Additional CSS classes
  showLogo?: boolean;          // Show/hide logo (default: true)
  logoVariant?: "full" | "stacked" | "icon"; // Logo variant (default: "full")
  ctaButtons?: boolean;        // Show/hide CTA buttons (default: true)
  items?: NavItem[];          // Custom navigation items
}

interface NavItem {
  name: string;               // Display name
  href: string;               // Route path
  icon: React.ComponentType<{ className?: string }>; // Heroicon
  description?: string;       // Optional tooltip text
}
```

#### Usage

```tsx
import { BespokeTopNav } from "@/components/ui/bespoke/bespokeTopNav";

// Default usage
<BespokeTopNav />

// Custom configuration
<BespokeTopNav
  showLogo={true}
  logoVariant="icon"
  ctaButtons={true}
  items={[
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About", href: "/about", icon: InformationCircleIcon }
  ]}
  className="additional-classes"
/>
```

#### Default Navigation Items

The component includes sensible defaults for Bespoke Academy:

- **Home** (/) - Starting point for learning journey
- **Curriculum** (/curriculum) - 40-week program overview
- **Courses** (/courses) - Available course offerings
- **About** (/about) - Mission and educational values
- **Dashboard** (/dashboard) - Progress tracking

#### Design System Integration

- **Colors**: Uses primary-emerald palette from globals.css
- **Typography**: Clean, modern sans-serif fonts
- **Animations**: Fast, sleek transitions with Framer Motion
- **Spacing**: Consistent with Tailwind CSS utilities
- **Components**: Integrates with BespokeButton and Logo components

#### Performance Considerations

- Optimized animations with 60fps target
- Minimal bundle impact with tree-shaking
- Efficient scroll event handling
- Responsive images with proper sizing
- CSS-only glass-morphism effects

#### Accessibility Features

- Proper ARIA labels and roles
- Keyboard navigation support
- High contrast ratios
- Focus management
- Screen reader compatibility
- Touch-friendly mobile interactions

## Development Guidelines

### Adding New Components

1. Follow the established TypeScript interfaces
2. Use the Bespoke Academy color palette
3. Implement proper accessibility features
4. Add comprehensive JSDoc comments
5. Create example usage files
6. Test with various screen sizes

### Design System Principles

- **Educational Focus**: Every component supports learning outcomes
- **Career Advancement**: Clear pathways and progression indicators
- **Inclusivity**: Accessible to diverse learners
- **Premium Quality**: Smooth animations and professional polish
- **Performance**: Optimized for learning experience

### Color Usage

- **Primary Emerald**: CTAs, important actions, brand elements
- **Neutral Grays**: Backgrounds, text, borders
- **Semantic Colors**: Success, warning, error states
- **Dark Mode**: Full support with proper contrast ratios

## Maintenance

### Updates

When updating components:

1. Maintain backward compatibility
2. Update TypeScript interfaces
3. Test with existing implementations
4. Update documentation
5. Validate accessibility compliance

### Testing

- Visual regression testing
- Accessibility audit
- Performance benchmarking
- Cross-browser compatibility
- Mobile device testing

---

For questions or contributions, please refer to the Bespoke Academy development guidelines or contact the development team.