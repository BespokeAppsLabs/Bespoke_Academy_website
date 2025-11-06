/**
 * Programs Data
 * Extracted and enhanced from curriculum for dedicated programs page
 */

import { ModuleContent } from '@/types/curriculum'

export interface ProgramData {
  id: string
  title: string
  subtitle: string
  description: string
  shortDescription: string
  duration: string
  weeks: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  price: string
  students: number
  rating: number
  skills: string[]
  icon: string
  gradient: string
  glowColor: 'cyber-blue' | 'electric-purple' | 'neon-cyan' | 'tech-green' | 'ai-orange'
  image: string
  outcomes: string[]
  prerequisites: string[]
  certification: string
  careerOpportunities: string[]
  modules: string[]
  featured: boolean
  enrollmentOpen: boolean
  nextStartDate?: string
}

export interface ProgramComparison {
  programs: ProgramData[]
  comparisonMatrix: {
    [key: string]: {
      [programId: string]: string | number | boolean
    }
  }
}

/**
 * Enhanced program data extracted from curriculum
 * Consolidated from ProgramsSection and curriculum data
 */
export const consolidatedPrograms: ProgramData[] = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    subtitle: 'Module 1: Weeks 1-10',
    description: 'Master AI fundamentals and build your career foundation. Learn core AI/ML concepts, career planning, and technical skills assessment through hands-on projects and expert guidance.',
    shortDescription: 'Build your AI foundation with core concepts and practical skills',
    duration: '10 weeks',
    weeks: 'Weeks 1-10',
    level: 'Beginner',
    difficulty: 'Easy',
    price: 'R12,000',
    students: 1500,
    rating: 4.9,
    skills: ['Python Basics', 'AI Concepts', 'Career Planning', 'Digital Literacy'],
    icon: 'Monitor',
    gradient: 'from-cyber-blue to-electric-purple',
    glowColor: 'cyber-blue',
    image: '/images/ai-fundamentals.jpg',
    outcomes: [
      'Confident computer and software navigation',
      'Visual programming with Scratch',
      'Basic problem-solving methodologies',
      'Digital citizenship and online safety'
    ],
    prerequisites: ['Interest in technology', 'Willingness to learn'],
    certification: 'AI Fundamentals Certificate',
    careerOpportunities: [
      'Junior AI Developer',
      'Data Analyst',
      'Technical Support Specialist',
      'Digital Content Creator'
    ],
    modules: ['Digital Foundations', 'Visual Programming', 'Basic Python', 'AI Ethics'],
    featured: true,
    enrollmentOpen: true,
    nextStartDate: '2024-02-01'
  },
  {
    id: 'advanced-tools',
    title: 'Advanced AI Tools',
    subtitle: 'Module 2: Weeks 11-20',
    description: 'Master advanced AI tools and workflow optimization. Learn advanced prompt engineering, AI tools integration, and workflow automation to enhance your productivity and capabilities.',
    shortDescription: 'Advanced prompt engineering and AI workflow automation',
    duration: '10 weeks',
    weeks: 'Weeks 11-20',
    level: 'Intermediate',
    difficulty: 'Medium',
    price: 'R15,000',
    students: 1200,
    rating: 4.8,
    skills: ['Prompt Engineering', 'Tool Integration', 'Automation', 'Advanced Python'],
    icon: 'Cpu',
    gradient: 'from-electric-purple to-neon-cyan',
    glowColor: 'electric-purple',
    image: '/images/advanced-tools.jpg',
    outcomes: [
      'Advanced prompt engineering techniques',
      'AI tool integration and automation',
      'Workflow optimization',
      'Advanced Python programming'
    ],
    prerequisites: ['AI Fundamentals Certificate', 'Basic Python knowledge'],
    certification: 'Advanced AI Tools Certificate',
    careerOpportunities: [
      'AI Tools Specialist',
      'Workflow Automation Engineer',
      'Advanced Python Developer',
      'AI Integration Consultant'
    ],
    modules: ['Advanced Prompt Engineering', 'AI Tool Integration', 'Workflow Automation', 'Advanced Python'],
    featured: true,
    enrollmentOpen: true,
    nextStartDate: '2024-02-01'
  },
  {
    id: 'specialized-applications',
    title: 'Specialized AI Applications',
    subtitle: 'Module 3: Weeks 21-35',
    description: 'Apply AI to specialized industry applications. Learn industry-specific AI, case studies, and project development to solve real-world business challenges.',
    shortDescription: 'Industry-specific AI applications and case studies',
    duration: '15 weeks',
    weeks: 'Weeks 21-35',
    level: 'Advanced',
    difficulty: 'Hard',
    price: 'R20,000',
    students: 800,
    rating: 4.9,
    skills: ['Industry AI', 'Case Studies', 'Project Development', 'Specialization'],
    icon: 'Camera',
    gradient: 'from-neon-cyan to-tech-green',
    glowColor: 'neon-cyan',
    image: '/images/specialized-apps.jpg',
    outcomes: [
      'Industry-specific AI applications',
      'Case study analysis and development',
      'Specialized project portfolio',
      'Business problem-solving with AI'
    ],
    prerequisites: ['Advanced AI Tools Certificate', 'Industry experience preferred'],
    certification: 'Specialized AI Applications Certificate',
    careerOpportunities: [
      'AI Industry Consultant',
      'Specialized AI Developer',
      'AI Project Manager',
      'Industry Solutions Architect'
    ],
    modules: ['Healthcare AI', 'Finance AI', 'Retail AI', 'Manufacturing AI'],
    featured: true,
    enrollmentOpen: true,
    nextStartDate: '2024-04-01'
  },
  {
    id: 'capstone-portfolio',
    title: 'Capstone & Portfolio',
    subtitle: 'Module 4: Weeks 36-40',
    description: 'Complete your capstone project and build your portfolio. Focus on capstone project, portfolio building, and career preparation to launch your AI career.',
    shortDescription: 'Capstone project development and career preparation',
    duration: '5 weeks',
    weeks: 'Weeks 36-40',
    level: 'Expert',
    difficulty: 'Expert',
    price: 'R8,000',
    students: 500,
    rating: 5.0,
    skills: ['Capstone Project', 'Portfolio Building', 'Career Preparation', 'Interview Skills'],
    icon: 'Trophy',
    gradient: 'from-tech-green to-ai-orange',
    glowColor: 'tech-green',
    image: '/images/capstone-portfolio.jpg',
    outcomes: [
      'Professional capstone project',
      'Comprehensive portfolio',
      'Career readiness',
      'Industry networking'
    ],
    prerequisites: ['Specialized AI Applications Certificate', 'Project proposal required'],
    certification: 'AI Career Advancement Certificate',
    careerOpportunities: [
      'AI Engineer',
      'AI Researcher',
      'AI Product Manager',
      'AI Entrepreneur'
    ],
    modules: ['Capstone Planning', 'Project Development', 'Portfolio Creation', 'Career Preparation'],
    featured: true,
    enrollmentOpen: true,
    nextStartDate: '2024-06-01'
  }
]

/**
 * Helper functions for programs
 */
export const getAllPrograms = (): ProgramData[] => {
  return consolidatedPrograms
}

export const getProgramById = (id: string): ProgramData | undefined => {
  return consolidatedPrograms.find(program => program.id === id)
}

export const getFeaturedPrograms = (limit: number = 3): ProgramData[] => {
  return consolidatedPrograms
    .filter(program => program.featured)
    .slice(0, limit)
}

export const getProgramsByLevel = (level: string): ProgramData[] => {
  return consolidatedPrograms.filter(program => program.level === level)
}

export const getProgramsByDifficulty = (difficulty: string): ProgramData[] => {
  return consolidatedPrograms.filter(program => program.difficulty === difficulty)
}

export const getOpenEnrollmentPrograms = (): ProgramData[] => {
  return consolidatedPrograms.filter(program => program.enrollmentOpen)
}

export const searchPrograms = (query: string): ProgramData[] => {
  const lowercaseQuery = query.toLowerCase()
  return consolidatedPrograms.filter(program =>
    program.title.toLowerCase().includes(lowercaseQuery) ||
    program.description.toLowerCase().includes(lowercaseQuery) ||
    program.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
    program.careerOpportunities.some(career => career.toLowerCase().includes(lowercaseQuery))
  )
}

/**
 * Program comparison functionality
 */
export const createProgramComparison = (programIds: string[]): ProgramComparison => {
  const programs = programIds.map(id => getProgramById(id)).filter(Boolean) as ProgramData[]
  
  const comparisonMatrix = {
    duration: programIds.reduce((acc, id) => {
      const program = getProgramById(id)
      acc[id] = program?.duration || 'N/A'
      return acc
    }, {} as Record<string, string>),
    level: programIds.reduce((acc, id) => {
      const program = getProgramById(id)
      acc[id] = program?.level || 'N/A'
      return acc
    }, {} as Record<string, string>),
    price: programIds.reduce((acc, id) => {
      const program = getProgramById(id)
      acc[id] = program?.price || 'N/A'
      return acc
    }, {} as Record<string, string>),
    rating: programIds.reduce((acc, id) => {
      const program = getProgramById(id)
      acc[id] = program?.rating || 0
      return acc
    }, {} as Record<string, number>)
  }

  return {
    programs,
    comparisonMatrix
  }
}

/**
 * Program statistics
 */
export const getProgramStats = () => {
  const totalPrograms = consolidatedPrograms.length
  const averageRating = consolidatedPrograms.reduce((sum, p) => sum + p.rating, 0) / totalPrograms
  const totalStudents = consolidatedPrograms.reduce((sum, p) => sum + p.students, 0)
  const averagePrice = consolidatedPrograms.reduce((sum, p) => sum + parseInt(p.price.replace(/[^\d]/g, '')), 0) / totalPrograms
  
  const levelBreakdown = consolidatedPrograms.reduce((acc, program) => {
    acc[program.level] = (acc[program.level] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return {
    totalPrograms,
    averageRating: Math.round(averageRating * 10) / 10,
    totalStudents,
    averagePrice: Math.round(averagePrice),
    levelBreakdown,
    featuredPrograms: consolidatedPrograms.filter(p => p.featured).length,
    openEnrollments: consolidatedPrograms.filter(p => p.enrollmentOpen).length
  }
}

/**
 * Program validation
 */
export const validatePrograms = () => {
  const validationResults = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[]
  }

  consolidatedPrograms.forEach((program, index) => {
    if (!program.title || program.title.trim() === '') {
      validationResults.isValid = false
      validationResults.errors.push(`Program ${index + 1}: Missing title`)
    }

    if (!program.description || program.description.trim() === '') {
      validationResults.isValid = false
      validationResults.errors.push(`Program ${index + 1}: Missing description`)
    }

    if (!program.price || !program.price.includes('R')) {
      validationResults.warnings.push(`Program ${index + 1}: Invalid price format`)
    }

    if (program.rating < 1 || program.rating > 5) {
      validationResults.isValid = false
      validationResults.errors.push(`Program ${index + 1}: Invalid rating (${program.rating})`)
    }

    if (!program.image || !program.image.startsWith('/images/')) {
      validationResults.warnings.push(`Program ${index + 1}: Invalid image path`)
    }
  })

  return validationResults
}

/**
 * Program formatting utilities
 */
export const formatProgramPrice = (price: string): string => {
  return price
}

export const formatProgramDuration = (duration: string): string => {
  return duration
}

export const getProgramLevelColor = (level: string): string => {
  const colorMap: Record<string, string> = {
    'Beginner': 'text-cyber-blue',
    'Intermediate': 'text-electric-purple',
    'Advanced': 'text-neon-cyan',
    'Expert': 'text-tech-green'
  }
  return colorMap[level] || 'text-foreground'
}

export const getDifficultyStars = (difficulty: string): string => {
  const starMap: Record<string, string> = {
    'Easy': '⭐',
    'Medium': '⭐⭐',
    'Hard': '⭐⭐⭐',
    'Expert': '⭐⭐⭐⭐'
  }
  return starMap[difficulty] || ''
}