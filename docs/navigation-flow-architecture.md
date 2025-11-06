# Navigation Flow & Modular Architecture

## Navigation Architecture

### Primary Navigation Structure
```
┌─────────────────────────────────────────┐
│              HEADER                    │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │  Home   │ │Curriculum│ │ Programs│ │
│ └─────────┘ └─────────┘ └─────────┘ │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │  About  │ │Success  │ │Contact  │ │
│ │         │ │Stories  │ │         │ │
│ └─────────┘ └─────────┘ └─────────┘ │
└─────────────────────────────────────────┘
```

### Route Hierarchy
```
/ (Home)
├── /curriculum
│   ├── /curriculum/module-1
│   ├── /curriculum/module-2
│   ├── /curriculum/module-3
│   └── /curriculum/module-4
├── /programs
│   ├── /programs/ai-fundamentals
│   ├── /programs/advanced-tools
│   ├── /programs/specialized-applications
│   └── /programs/capstone-portfolio
├── /about
│   ├── /about/mission
│   ├── /about/instructors
│   └── /about/facilities
├── /success-stories
│   ├── /success-stories/undergraduates
│   ├── /success-stories/career-changers
│   └── /success-stories/entrepreneurs
└── /contact
    ├── /contact/admissions
    └── /contact/partnerships
```

## User Journey Flows

### Primary Conversion Flow
```
Home Page
    ↓ (Explore Curriculum)
Curriculum Overview
    ↓ (View Module Details)
Module Detail Page
    ↓ (Enroll Now)
Application Form
    ↓ (Complete)
Welcome Dashboard
```

### Information Gathering Flow
```
Home Page
    ↓ (Learn More)
About Page
    ↓ (View Instructors)
Instructors Page
    ↓ (View Programs)
Programs Page
    ↓ (View Success Stories)
Success Stories Page
    ↓ (Contact Admissions)
Contact Page
```

### Quick Access Flow
```
Home Page
    ↓ (Program Preview CTA)
Programs Page
    ↓ (Choose Program)
Program Detail Page
    ↓ (Apply Now)
Application Form
```

## Component Architecture

### Home Screen Components
```
src/components/home/
├── HeroSection3D/
│   ├── index.tsx
│   ├── HeroSection3D.tsx
│   ├── ParticleSystem.tsx
│   ├── GridBackground.tsx
│   └── HeroSection3D.module.css
├── AcademicStats/
│   ├── index.tsx
│   ├── AcademicStats.tsx
│   ├── StatCard.tsx
│   └── AcademicStats.module.css
├── ProgramPreview/
│   ├── index.tsx
│   ├── ProgramPreview.tsx
│   ├── ModuleCard.tsx
│   └── ProgramPreview.module.css
├── SuccessStories/
│   ├── index.tsx
│   ├── SuccessStories.tsx
│   ├── TestimonialCard.tsx
│   ├── TestimonialCarousel.tsx
│   └── SuccessStories.module.css
├── AcademicExcellence/
│   ├── index.tsx
│   ├── AcademicExcellence.tsx
│   ├── ValueCard.tsx
│   └── AcademicExcellence.module.css
└── PrimaryCTA/
    ├── index.tsx
    ├── PrimaryCTA.tsx
    └── PrimaryCTA.module.css
```

### Route-Specific Components
```
src/components/curriculum/
├── EnhancedCurriculumOverview/
│   ├── index.tsx
│   ├── EnhancedCurriculumOverview.tsx
│   ├── ModuleDetailCard.tsx
│   ├── ProgramTimeline.tsx
│   └── EnhancedCurriculumOverview.module.css
└── ModuleDetail/
    ├── index.tsx
    ├── ModuleDetail.tsx
    ├── LearningObjectives.tsx
    ├── CertificationRequirements.tsx
    └── ModuleDetail.module.css

src/components/programs/
├── DetailedProgramsSection/
│   ├── index.tsx
│   ├── DetailedProgramsSection.tsx
│   ├── ProgramCard.tsx
│   ├── ProgramComparison.tsx
│   └── DetailedProgramsSection.module.css
└── ProgramDetail/
    ├── index.tsx
    ├── ProgramDetail.tsx
    ├── CurriculumOutline.tsx
    ├── EnrollmentOptions.tsx
    └── ProgramDetail.module.css

src/components/about/
├── ComprehensiveAboutSection/
│   ├── index.tsx
│   ├── ComprehensiveAboutSection.tsx
│   ├── MissionStatement.tsx
│   ├── InstructorProfiles.tsx
│   └── ComprehensiveAboutSection.module.css
└── FacilitiesSection/
    ├── index.tsx
    ├── FacilitiesSection.tsx
    ├── FacilityTour.tsx
    └── FacilitiesSection.module.css

src/components/success-stories/
├── ExtendedTestimonialsSection/
│   ├── index.tsx
│   ├── ExtendedTestimonialsSection.tsx
│   ├── TestimonialFilter.tsx
│   ├── TestimonialDetail.tsx
│   └── ExtendedTestimonialsSection.module.css
└── SuccessStoryDetail/
    ├── index.tsx
    ├── SuccessStoryDetail.tsx
    ├── RelatedStories.tsx
    └── SuccessStoryDetail.module.css
```

### Shared Components
```
src/components/shared/
├── GlassCard/
│   ├── index.tsx
│   ├── GlassCard.tsx
│   └── GlassCard.module.css
├── GradientButton/
│   ├── index.tsx
│   ├── GradientButton.tsx
│   └── GradientButton.module.css
├── AnimatedCounter/
│   ├── index.tsx
│   ├── AnimatedCounter.tsx
│   └── AnimatedCounter.module.css
├── ScrollAnimation/
│   ├── index.tsx
│   ├── ScrollAnimation.tsx
│   └── ScrollAnimation.module.css
└── TestimonialsCarousel/
    ├── index.tsx
    ├── TestimonialsCarousel.tsx
    ├── CarouselControls.tsx
    └── TestimonialsCarousel.module.css
```

## Data Architecture

### Centralized Data Sources
```
src/data/
├── curriculum.ts (existing - enhanced)
├── programs.ts (new - extracted from curriculum)
├── testimonials.ts (new - centralized testimonials)
├── statistics.ts (new - single source of truth)
├── instructors.ts (new - instructor profiles)
├── facilities.ts (new - facility information)
└── navigation.ts (new - navigation structure)
```

### Data Flow Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Data Sources  │───▶│  Data Hooks     │───▶│  Components     │
│                 │    │                 │    │                 │
│ • curriculum.ts │    │ • useCurriculum │    │ • Home Screen   │
│ • programs.ts   │    │ • usePrograms   │    │ • Curriculum    │
│ • testimonials  │    │ • useTestimonials│    │ • Programs      │
│ • statistics.ts  │    │ • useStatistics │    │ • About         │
│ • instructors.ts │    │ • useInstructors│    │ • Success       │
│ • facilities.ts │    │ • useFacilities │    │ • Contact       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## State Management

### Global State Structure
```typescript
interface AppState {
  user: {
    profile: UserProfile | null
    preferences: UserPreferences
    enrollment: EnrollmentState
  }
  curriculum: {
    selectedModule: string | null
    completedModules: string[]
    progress: ProgressState
  }
  ui: {
    navigation: NavigationState
    theme: ThemeState
    notifications: NotificationState
  }
  analytics: {
    pageViews: PageViewData[]
    userInteractions: InteractionData[]
    conversions: ConversionData[]
  }
}
```

### Context Providers
```
src/contexts/
├── UserContext.tsx
├── CurriculumContext.tsx
├── UIContext.tsx
└── AnalyticsContext.tsx
```

## Routing Architecture

### Route Configuration
```typescript
// routes/index.ts
export const routes = {
  home: {
    path: '/',
    component: lazy(() => import('@/pages/Home')),
    metadata: {
      title: 'Bespoke Academy - AI Education',
      description: 'Transform your career with comprehensive AI programs'
    }
  },
  curriculum: {
    path: '/curriculum',
    component: lazy(() => import('@/pages/Curriculum')),
    children: {
      module: {
        path: '/curriculum/:moduleId',
        component: lazy(() => import('@/pages/CurriculumModule'))
      }
    }
  },
  programs: {
    path: '/programs',
    component: lazy(() => import('@/pages/Programs')),
    children: {
      detail: {
        path: '/programs/:programId',
        component: lazy(() => import('@/pages/ProgramDetail'))
      }
    }
  },
  about: {
    path: '/about',
    component: lazy(() => import('@/pages/About')),
    children: {
      mission: {
        path: '/about/mission',
        component: lazy(() => import('@/pages/Mission'))
      },
      instructors: {
        path: '/about/instructors',
        component: lazy(() => import('@/pages/Instructors'))
      }
    }
  },
  successStories: {
    path: '/success-stories',
    component: lazy(() => import('@/pages/SuccessStories')),
    children: {
      detail: {
        path: '/success-stories/:storyId',
        component: lazy(() => import('@/pages/SuccessStoryDetail'))
      }
    }
  },
  contact: {
    path: '/contact',
    component: lazy(() => import('@/pages/Contact')),
    children: {
      admissions: {
        path: '/contact/admissions',
        component: lazy(() => import('@/pages/Admissions'))
      }
    }
  }
}
```

### Navigation Component
```typescript
// components/navigation/ModernNavigation.tsx
export function ModernNavigation() {
  const { pathname } = useRouter()
  const { user } = useUser()
  
  const navigationItems = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/curriculum', label: 'Curriculum', active: pathname.startsWith('/curriculum') },
    { href: '/programs', label: 'Programs', active: pathname.startsWith('/programs') },
    { href: '/about', label: 'About', active: pathname.startsWith('/about') },
    { href: '/success-stories', label: 'Success Stories', active: pathname.startsWith('/success-stories') },
    { href: '/contact', label: 'Contact', active: pathname.startsWith('/contact') }
  ]

  return (
    <nav className="modern-navigation">
      {/* Navigation implementation */}
    </nav>
  )
}
```

## Performance Optimization

### Code Splitting Strategy
```typescript
// Route-based code splitting
const Home = lazy(() => import('@/pages/Home'))
const Curriculum = lazy(() => import('@/pages/Curriculum'))
const Programs = lazy(() => import('@/pages/Programs'))

// Component-based code splitting
const HeroSection3D = lazy(() => import('@/components/home/HeroSection3D'))
const AcademicStats = lazy(() => import('@/components/home/AcademicStats'))

// Data-based code splitting
const curriculumData = import('@/data/curriculum')
const programsData = import('@/data/programs')
```

### Caching Strategy
```typescript
// Service worker configuration
export const cacheStrategy = {
  staticAssets: {
    strategy: 'CacheFirst',
    cacheName: 'static-assets',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  apiData: {
    strategy: 'NetworkFirst',
    cacheName: 'api-data',
    maxAge: 5 * 60 // 5 minutes
  },
  images: {
    strategy: 'CacheFirst',
    cacheName: 'images',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  }
}
```

## Analytics & Tracking

### User Journey Tracking
```typescript
// analytics/events.ts
export const trackPageView = (page: string, metadata?: any) => {
  // Track page view with context
}

export const trackUserInteraction = (element: string, action: string, context?: any) => {
  // Track user interactions
}

export const trackConversion = (type: string, value?: any) => {
  // Track conversion events
}

export const trackNavigationFlow = (from: string, to: string, trigger: string) => {
  // Track navigation patterns
}
```

### Performance Monitoring
```typescript
// performance/monitoring.ts
export const trackPageLoad = () => {
  // Track Core Web Vitals
  const vitals = {
    FCP: getFirstContentfulPaint(),
    LCP: getLargestContentfulPaint(),
    FID: getFirstInputDelay(),
    CLS: getCumulativeLayoutShift()
  }
  
  // Send to analytics
}
```

## SEO Optimization

### Meta Data Management
```typescript
// seo/metadata.ts
export const generatePageMetadata = (page: string, data?: any) => {
  const baseMetadata = {
    title: 'Bespoke Academy - AI Education',
    description: 'Transform your career with comprehensive AI programs',
    keywords: ['AI education', 'machine learning', 'career advancement'],
    openGraph: {
      title: 'Bespoke Academy',
      description: 'Transform your career with AI education',
      images: ['/images/og-image.jpg']
    }
  }

  const pageSpecificMetadata = {
    home: {
      title: 'Bespoke Academy - Transform Your Career with AI Education',
      description: 'Master cutting-edge AI technologies and advance your career'
    },
    curriculum: {
      title: 'AI Curriculum - Bespoke Academy',
      description: 'Comprehensive 40-week AI program with hands-on learning'
    }
    // ... other pages
  }

  return { ...baseMetadata, ...pageSpecificMetadata[page] }
}
```

### Structured Data
```typescript
// seo/structured-data.ts
export const generateStructuredData = (page: string, data?: any) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Bespoke Academy',
    description: 'AI education and career advancement programs'
  }

  const pageSpecificData = {
    home: {
      '@type': 'WebSite',
      name: 'Bespoke Academy',
      potentialAction: {
        '@type': 'SearchAction',
        target: '/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    curriculum: {
      '@type': 'Course',
      name: 'AI Career Advancement Program',
      description: '40-week comprehensive AI program',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Bespoke Academy'
      }
    }
    // ... other pages
  }

  return { ...baseStructuredData, ...pageSpecificData[page] }
}
```

This navigation flow and modular architecture provides a scalable foundation for the redesigned home screen and future route separation.