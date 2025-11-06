/**
 * Centralized Testimonials Data
 * Single source of truth for all student testimonials
 */

export interface TestimonialData {
  id: string
  name: string
  role: string
  company?: string
  image: string
  quote: string
  rating: number
  graduationYear?: number
  program?: string
  category: 'undergraduate' | 'career-changer' | 'entrepreneur' | 'professional'
  featured: boolean
  videoUrl?: string
  linkedinUrl?: string
}

export interface TestimonialCategory {
  id: string
  name: string
  description: string
  count: number
}

/**
 * Curated testimonials from current components
 * Enhanced with additional metadata for better filtering and display
 */
export const consolidatedTestimonials: TestimonialData[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'AI Engineer',
    company: 'TechCorp Solutions',
    image: '/images/testimonials/sarah.jpg',
    quote: 'This program transformed my career in just 40 weeks. The hands-on approach and expert instructors gave me the confidence and skills needed to succeed in the AI industry.',
    rating: 5,
    graduationYear: 2023,
    program: 'AI Career Advancement Program',
    category: 'career-changer',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/sarah-mitchell'
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Machine Learning Specialist',
    company: 'DataDrive Analytics',
    image: '/images/testimonials/michael.jpg',
    quote: 'Coming from a non-technical background, I was amazed at how quickly I grasped AI concepts. The curriculum is well-structured and the support is incredible.',
    rating: 5,
    graduationYear: 2023,
    program: 'AI Career Advancement Program',
    category: 'career-changer',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/michael-chen'
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'AI Product Manager',
    company: 'InnovateTech',
    image: '/images/testimonials/emily.jpg',
    quote: 'The practical projects and real-world applications made all the difference. I was able to immediately apply what I learned to my job and see tangible results.',
    rating: 5,
    graduationYear: 2024,
    program: 'AI Career Advancement Program',
    category: 'professional',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/emily-rodriguez'
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'AI Research Assistant',
    company: 'FutureLabs',
    image: '/images/testimonials/david.jpg',
    quote: 'The capstone project was invaluable. I built a portfolio that showcased my skills and helped me land my dream job in AI research.',
    rating: 5,
    graduationYear: 2024,
    program: 'AI Career Advancement Program',
    category: 'undergraduate',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/david-kim'
  },
  {
    id: 'aisha-patel',
    name: 'Aisha Patel',
    role: 'AI Startup Founder',
    company: 'AIVentures',
    image: '/images/testimonials/aisha.jpg',
    quote: 'This program gave me the technical foundation and entrepreneurial confidence to start my own AI company. The network and support continue to be invaluable.',
    rating: 5,
    graduationYear: 2023,
    program: 'AI Career Advancement Program',
    category: 'entrepreneur',
    featured: true,
    linkedinUrl: 'https://linkedin.com/in/aisha-patel'
  }
]

/**
 * Testimonial categories for filtering
 */
export const testimonialCategories: TestimonialCategory[] = [
  {
    id: 'all',
    name: 'All Stories',
    description: 'View all student success stories',
    count: consolidatedTestimonials.length
  },
  {
    id: 'undergraduate',
    name: 'Recent Graduates',
    description: 'Students who recently completed the program',
    count: consolidatedTestimonials.filter(t => t.category === 'undergraduate').length
  },
  {
    id: 'career-changer',
    name: 'Career Changers',
    description: 'Professionals who transitioned into AI roles',
    count: consolidatedTestimonials.filter(t => t.category === 'career-changer').length
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneurs',
    description: 'Graduates who started their own ventures',
    count: consolidatedTestimonials.filter(t => t.category === 'entrepreneur').length
  },
  {
    id: 'professional',
    name: 'Professionals',
    description: 'Working professionals who enhanced their skills',
    count: consolidatedTestimonials.filter(t => t.category === 'professional').length
  }
]

/**
 * Helper functions for testimonials
 */
export const getFeaturedTestimonials = (limit: number = 3): TestimonialData[] => {
  return consolidatedTestimonials
    .filter(testimonial => testimonial.featured)
    .slice(0, limit)
}

export const getTestimonialsByCategory = (category: string): TestimonialData[] => {
  if (category === 'all') {
    return consolidatedTestimonials
  }
  return consolidatedTestimonials.filter(testimonial => testimonial.category === category)
}

export const getTestimonialById = (id: string): TestimonialData | undefined => {
  return consolidatedTestimonials.find(testimonial => testimonial.id === id)
}

export const getRandomTestimonials = (count: number): TestimonialData[] => {
  const shuffled = [...consolidatedTestimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const searchTestimonials = (query: string): TestimonialData[] => {
  const lowercaseQuery = query.toLowerCase()
  return consolidatedTestimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(lowercaseQuery) ||
    testimonial.role.toLowerCase().includes(lowercaseQuery) ||
    testimonial.company?.toLowerCase().includes(lowercaseQuery) ||
    testimonial.quote.toLowerCase().includes(lowercaseQuery)
  )
}

/**
 * Testimonial statistics
 */
export const getTestimonialStats = () => {
  const totalTestimonials = consolidatedTestimonials.length
  const averageRating = consolidatedTestimonials.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials
  const featuredCount = consolidatedTestimonials.filter(t => t.featured).length
  
  const categoryBreakdown = testimonialCategories.slice(1).reduce((acc, category) => {
    acc[category.id] = category.count
    return acc
  }, {} as Record<string, number>)

  return {
    totalTestimonials,
    averageRating: Math.round(averageRating * 10) / 10,
    featuredCount,
    categoryBreakdown,
    fiveStarReviews: consolidatedTestimonials.filter(t => t.rating === 5).length,
    totalCompanies: new Set(consolidatedTestimonials.map(t => t.company).filter(Boolean)).size
  }
}

/**
 * Testimonial validation
 */
export const validateTestimonials = () => {
  const validationResults = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[]
  }

  consolidatedTestimonials.forEach((testimonial, index) => {
    if (!testimonial.name || testimonial.name.trim() === '') {
      validationResults.isValid = false
      validationResults.errors.push(`Testimonial ${index + 1}: Missing name`)
    }

    if (!testimonial.quote || testimonial.quote.trim() === '') {
      validationResults.isValid = false
      validationResults.errors.push(`Testimonial ${index + 1}: Missing quote`)
    }

    if (!testimonial.image || !testimonial.image.startsWith('/images/testimonials/')) {
      validationResults.warnings.push(`Testimonial ${index + 1}: Invalid image path`)
    }

    if (testimonial.rating < 1 || testimonial.rating > 5) {
      validationResults.isValid = false
      validationResults.errors.push(`Testimonial ${index + 1}: Invalid rating (${testimonial.rating})`)
    }

    if (!testimonial.category) {
      validationResults.warnings.push(`Testimonial ${index + 1}: Missing category`)
    }
  })

  return validationResults
}

/**
 * Testimonial formatting utilities
 */
export const formatTestimonialName = (testimonial: TestimonialData): string => {
  return testimonial.name
}

export const formatTestimonialRole = (testimonial: TestimonialData): string => {
  if (testimonial.company) {
    return `${testimonial.role} at ${testimonial.company}`
  }
  return testimonial.role
}

export const formatTestimonialDate = (testimonial: TestimonialData): string => {
  if (testimonial.graduationYear) {
    return `Class of ${testimonial.graduationYear}`
  }
  return ''
}

export const getRatingStars = (rating: number): string => {
  return '⭐'.repeat(Math.floor(rating))
}