# Home Screen Wireframes & Component Specifications

## New Home Screen Layout

### Overall Structure
```
┌─────────────────────────────────────────┐
│ 1. HeroSection3D (Enhanced)           │
├─────────────────────────────────────────┤
│ 2. AcademicStats (New)                │
├─────────────────────────────────────────┤
│ 3. ProgramPreview (New)               │
├─────────────────────────────────────────┤
│ 4. SuccessStories (Refactored)        │
├─────────────────────────────────────────┤
│ 5. AcademicExcellence (Refactored)    │
├─────────────────────────────────────────┤
│ 6. PrimaryCTA (New)                   │
└─────────────────────────────────────────┘
```

## Component 1: HeroSection3D (Enhanced)

### Purpose
Primary value proposition and immediate engagement

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│ [Animated Background]                  │
│                                         │
│         TRANSFORM YOUR CAREER            │
│        WITH AI EDUCATION                │
│                                         │
│    Master cutting-edge AI technologies   │
│    and advance your career with our     │
│    comprehensive, project-based         │
│    learning programs                   │
│                                         │
│    40-Week Journey • No Experience    │
│    Required • Industry Certification    │
│                                         │
│  [Start Your AI Journey] [Explore]     │
│                                         │
│  [Stats: 50K+ Students] [95% Success] │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface HeroSection3DProps {
  title: string
  subtitle: string
  description: string
  keyFeatures: string[]
  primaryCTA: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
  }
  secondaryCTA: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
  }
  stats: {
    students: number
    successRate: number
    instructors: number
    partners: number
  }
}
```

### Key Features
- **3D animated background** with particle system
- **Text scramble animation** for main title
- **Animated counters** for key statistics
- **Gradient text effects** for visual appeal
- **Responsive design** with mobile-first approach
- **Performance optimized** with lazy loading

### Content Strategy
- **Focus on transformation** and career advancement
- **Highlight key differentiators** (no experience required, industry certification)
- **Social proof** through verified statistics
- **Clear primary CTA** driving to curriculum overview

---

## Component 2: AcademicStats (New)

### Purpose
Consolidated, verified key metrics in one location

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│        ACADEMIC EXCELLENCE            │
│                                         │
│    Trusted by thousands of students      │
│    worldwide with proven results         │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │ 50,000+ │ │   95%   │ │   40    │ │
│  │Students │ │ Success  │ │Weeks    │ │
│  │         │ │  Rate   │ │Program  │ │
│  └─────────┘ └─────────┘ └─────────┘ │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │ 1,000+  │ │  500+   │ │  24/7   │ │
│  │Hiring   │ │Projects  │ │Support  │ │
│  │Partners  │ │Completed│ │         │ │
│  └─────────┘ └─────────┘ └─────────┘ │
│                                         │
│        [View All Success Metrics]        │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface AcademicStatsProps {
  title: string
  subtitle: string
  stats: {
    students: {
      value: number
      label: string
      icon: LucideIcon
      color: string
    }
    successRate: {
      value: number
      label: string
      icon: LucideIcon
      color: string
    }
    programDuration: {
      value: number
      label: string
      icon: LucideIcon
      color: string
    }
    hiringPartners: {
      value: number
      label: string
      icon: LucideIcon
      color: string
    }
    projects: {
      value: number
      label: string
      icon: LucideIcon
      color: string
    }
    support: {
      value: string
      label: string
      icon: LucideIcon
      color: string
    }
  }
  cta: {
    text: string
    href: string
  }
}
```

### Key Features
- **Animated counters** with smooth transitions
- **Glass morphism design** for modern aesthetic
- **Icon-based visual hierarchy** for quick scanning
- **Responsive grid layout** adapting to screen size
- **Hover effects** for enhanced interactivity
- **Single source of truth** for all statistics

---

## Component 3: ProgramPreview (New)

### Purpose
High-level program overview driving users to detailed curriculum

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│        COMPREHENSIVE PROGRAMS         │
│                                         │
│    Four progressive modules designed     │
│    to transform you from beginner to     │
│    AI expert in 40 weeks               │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │ Module 1│ │ Module 2│ │ Module 3│ │
│  │AI Fund  │ │Advanced │ │Special  │ │
│  │Weeks 1-10│ │Tools    │ │Apps     │ │
│  │Weeks 11-20│ │Weeks 21-35│ │
│  └─────────┘ └─────────┘ └─────────┘ │
│                                         │
│  ┌─────────┐                           │
│  │ Module 4│                           │
│  │Capstone │                           │
│  │Weeks 36-40│                           │
│  └─────────┘                           │
│                                         │
│    [Explore Full Curriculum]            │
│    [Download Program Guide]             │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface ProgramPreviewProps {
  title: string
  subtitle: string
  description: string
  modules: {
    id: string
    title: string
    shortTitle: string
    duration: string
    weeks: string
    icon: LucideIcon
    color: string
    gradient: string
  }[]
  ctas: {
    primary: {
      text: string
      href: string
      variant: 'primary' | 'secondary'
    }
    secondary: {
      text: string
      href: string
      variant: 'primary' | 'secondary'
    }
  }
}
```

### Key Features
- **Module overview cards** with essential information only
- **Progressive visual design** showing learning journey
- **Clear duration indicators** for planning
- **Strategic CTAs** driving to curriculum page
- **Hover animations** for engagement
- **Mobile-optimized layout** with vertical stacking

---

## Component 4: SuccessStories (Refactored)

### Purpose
Social proof through selected student testimonials

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│        STUDENT SUCCESS STORIES         │
│                                         │
│    Hear from our graduates about their   │
│    transformation and career success     │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │ [Photo]  Sarah M. - AI Engineer    │ │
│  │          "This program transformed  │ │
│  │           my career in just 40      │ │
│  │           weeks. Amazing support!"  │ │
│  │           ⭐⭐⭐⭐⭐               │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  ○ ○ ○ ○ ○ (Carousel indicators)       │
│                                         │
│        [Read All Success Stories]       │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface SuccessStoriesProps {
  title: string
  subtitle: string
  testimonials: {
    id: string
    name: string
    role: string
    company?: string
    image: string
    quote: string
    rating: number
    graduationYear?: number
  }[]
  cta: {
    text: string
    href: string
  }
  autoPlay?: boolean
  showIndicators?: boolean
}
```

### Key Features
- **Curated testimonials** showcasing diverse success stories
- **Carousel functionality** for multiple stories
- **Photo verification** for authenticity
- **Star ratings** for quick credibility assessment
- **Responsive design** with mobile swipe support
- **Link to extended testimonials** page

---

## Component 5: AcademicExcellence (Refactored)

### Purpose
Core academy values and unique differentiators

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│        WHY BESPOKE ACADEMY            │
│                                         │
│    We bridge the gap between ambition   │
│    and achievement through innovative    │
│    AI education                       │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  │ 🎯      │ │ 🔧      │ │ 🚀      │ │
│  │Expert   │ │Hands-On │ │Career   │ │
│  │Instructors│ │Projects │ │Support  │ │
│  │         │ │         │ │         │ │
│  │Learn from│ │Build real│ │Get job  │ │
│  │industry  │ │AI apps  │ │placement│ │
│  │pros      │ │         │ │assistance│ │
│  └─────────┘ └─────────┘ └─────────┘ │
│                                         │
│  ┌─────────┐                           │
│  │ 💡      │                           │
│  │Innovation│                           │
│  │Focus    │                           │
│  │         │                           │
│  │Cutting-  │                           │
│  │edge AI   │                           │
│  │tech      │                           │
│  └─────────┘                           │
│                                         │
│        [Learn More About Our Approach]   │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface AcademicExcellenceProps {
  title: string
  subtitle: string
  values: {
    icon: string | ReactNode
    title: string
    description: string
    detailedDescription: string
  }[]
  cta: {
    text: string
    href: string
  }
}
```

### Key Features
- **Value proposition cards** with clear benefits
- **Icon-based communication** for quick understanding
- **Consistent visual hierarchy** with academy branding
- **Hover effects** for enhanced engagement
- **Strategic CTA** driving to detailed about page
- **Modular design** for easy updates

---

## Component 6: PrimaryCTA (New)

### Purpose
Clear conversion path and final engagement opportunity

### Wireframe Layout
```
┌─────────────────────────────────────────┐
│        READY TO TRANSFORM YOUR         │
│             FUTURE?                   │
│                                         │
│    Join thousands of students who have   │
│    already launched their AI careers    │
│    with our comprehensive programs.     │
│                                         │
│  [Start Your AI Journey Today]          │
│  [Talk to Admissions Advisor]          │
│                                         │
│    No experience required •             │
│    Flexible payment options available    │
│                                         │
│    Next cohort starts: [Date]          │
└─────────────────────────────────────────┘
```

### Component Specifications
```typescript
interface PrimaryCTAProps {
  title: string
  subtitle: string
  description: string
  primaryCTA: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
  }
  secondaryCTA: {
    text: string
    href: string
    variant: 'primary' | 'secondary'
  }
  reassurancePoints: string[]
  nextCohortDate?: string
}
```

### Key Features
- **Compelling headline** focused on transformation
- **Dual CTAs** for different conversion stages
- **Reassurance points** addressing common concerns
- **Urgency element** with next cohort date
- **Glass morphism design** with glow effects
- **High contrast** for accessibility

---

## Responsive Design Specifications

### Mobile (< 768px)
- **Single column layout** for all components
- **Stacked module cards** in ProgramPreview
- **Simplified stats grid** (2x2 or 1x2)
- **Touch-friendly CTAs** with proper spacing
- **Optimized animations** for performance

### Tablet (768px - 1024px)
- **Two-column layouts** where appropriate
- **Horizontal carousel** for testimonials
- **Balanced stats grid** (2x3 or 3x2)
- **Medium-sized components** with proper spacing
- **Touch and hover** interactions

### Desktop (> 1024px)
- **Full multi-column layouts**
- **Enhanced animations** and hover effects
- **Optimized content width** for readability
- **Rich interactions** and micro-animations
- **Maximum visual impact** with full design system

## Performance Considerations

### Optimization Strategies
- **Lazy loading** for below-fold components
- **Image optimization** with WebP format
- **Animation performance** with GPU acceleration
- **Bundle splitting** for component isolation
- **Critical CSS** for above-fold content
- **Service worker** for caching strategies

### Accessibility Requirements
- **Semantic HTML5** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** compliance (WCAG 2.1 AA)
- **Focus management** for interactive components

This wireframe specification provides a clear blueprint for implementing the new home screen with eliminated redundancy and improved user experience.