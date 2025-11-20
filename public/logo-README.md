# Bespoke Academy Logo System

## Overview

The Bespoke Academy logo system combines modern AI symbolism with educational elements, using the brand's signature Cyber Blue (#0080FF) and Emerald Green (#10b981) colors. The design emphasizes **Future & Innovation** and **Community & Connection** through neural network patterns and constellation elements.

## Logo Files

### Primary Logo Variants

| File | Usage | Dimensions | Description |
|------|-------|------------|-------------|
| `logo.svg` | Full detailed version | 280x60 | Complete logo with effects and animations |
| `logo-optimized.svg` | Production | 280x60 | Optimized for web performance |
| `logo-stacked.svg` | Vertical layouts | 80x80 | Stacked text layout for compact spaces |
| `logo-icon.svg` | Icon-only | 60x60 | Symbol-only version for small spaces |

## Design Elements

### Symbol Components
- **Neural Network Pattern**: Connected nodes representing AI and machine learning
- **Constellation Stars**: Dots symbolizing innovation and future possibilities
- **Connection Lines**: Community and collaborative learning aspects
- **Gradient Background**: Blends Cyber Blue to Emerald Green

### Typography
- **Primary**: "Bespoke" in Geist Sans, 700 weight
- **Secondary**: "Academy" in Geist Sans, 600 weight, emerald green
- **Hierarchy**: Visual emphasis on "Bespoke" with "Academy" as supporting text

### Color System
- **Primary Gradient**: Cyber Blue (#0080FF) → Emerald Green (#10b981)
- **Text**: Dark gray (#1a1a1a) for "Bespoke", emerald green for "Academy"
- **Symbol Elements**: White with varying opacity levels

## Usage Guidelines

### Component-Based Implementation

Use the React component for consistent implementation:

```tsx
import { Logo, LogoIcon, LogoFull, LogoStacked } from "@/components/ui/logo"

// Full logo (default)
<Logo variant="full" size="md" />

// Icon only
<LogoIcon size="lg" />

// Stacked version
<LogoStacked size="md" />

// Custom sizing
<Logo variant="icon" size="lg" className="custom-class" />
```

### Available Props

- `variant`: "full" | "stacked" | "icon" (default: "full")
- `size`: "sm" | "md" | "lg" (default: "md")
- `className`: Additional CSS classes
- `priority`: Next.js Image priority (default: false)

### Size Mapping

| Size | Icon | Stacked | Full |
|------|------|---------|------|
| sm | 24x24 | 32x32 | 120x24 |
| md | 32x32 | 48x48 | 160x32 |
| lg | 48x48 | 64x64 | 280x56 |

## Implementation Examples

### Header Usage
```tsx
<Link href="/" className="flex items-center space-x-3">
  <div className="w-10 h-10 rounded-xl overflow-hidden">
    <LogoIcon size="lg" />
  </div>
  <span className="text-xl font-bold">Bespoke Academy</span>
</Link>
```

### Footer Usage
```tsx
<div className="flex items-center space-x-4">
  <div className="w-12 h-12 rounded-xl overflow-hidden">
    <LogoStacked size="lg" />
  </div>
  <div>
    <h3>Bespoke Academy</h3>
    <p>Transform Your Future with AI</p>
  </div>
</div>
```

### Mobile Navigation
```tsx
<button className="w-8 h-8">
  <LogoIcon size="md" />
</button>
```

## Accessibility

- **ARIA Labels**: All logo images include descriptive alt text
- **Semantic HTML**: Logo components use proper heading hierarchy
- **Contrast**: Colors meet WCAG 2.1 AA standards
- **Screen Readers**: Accessible titles in SVG files

## Performance

- **Optimized SVGs**: Minified code for faster loading
- **Next.js Image**: Automatic optimization and lazy loading
- **Responsive Sizing**: Efficient scaling without quality loss
- **Small File Sizes**: All variants under 10KB

## Animation & Interactions

### Built-in Animations
- **Hover Effects**: Subtle scaling and shadow changes
- **Rotation**: Optional 180° rotation on hover (modern-header)
- **Gradient Overlay**: Subtle animated pulse in primary logo

### CSS Classes
```css
.logo-container {
  @apply rounded-xl overflow-hidden transition-all duration-300;
}

.logo-container:hover {
  @apply shadow-lg scale-105;
}
```

## Maintenance

### Updating Colors
Update gradient stops in SVG files:
```xml
<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:#0080FF"/>
  <stop offset="100%" style="stop-color:#10b981"/>
</linearGradient>
```

### Brand Guidelines
- Use `logo-optimized.svg` for production
- Maintain consistent sizing with React component
- Preserve aspect ratios when scaling
- Use proper contrast for background compatibility

## Browser Support

- **Modern Browsers**: Full SVG support with animations
- **Legacy Browsers**: Fallback to PNG if needed
- **Mobile**: Optimized for touch interactions
- **High DPI**: Crisp rendering on retina displays

## File Management

### Location
```
/public/
├── logo.svg               # Primary detailed version
├── logo-optimized.svg     # Production-optimized
├── logo-stacked.svg       # Vertical layout
├── logo-icon.svg          # Icon-only version
└── logo-README.md         # This documentation

/src/components/ui/
└── logo.tsx               # React component
```

### Best Practices
- Use React component for consistent implementation
- Maintain aspect ratio integrity
- Test across different background colors
- Ensure accessibility compliance
- Monitor performance impact

## Future Enhancements

### Planned Features
- **Dark Mode Variants**: Inverted colors for dark themes
- **Animation Library**: Pre-built motion components
- **SVG Sprites**: Combined icon resources
- **Progressive Loading**: Enhanced loading strategies

### Version Control
- **Semantic Versioning**: Track logo changes
- **Backward Compatibility**: Maintain older versions
- **Component Updates**: Gradual deprecation process
- **Documentation**: Keep README updated