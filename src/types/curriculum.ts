/**
 * Comprehensive curriculum data types for Bespoke Academy
 * Based on the 4-module AI Career Advancement program
 */

export interface LearningObjective {
  title: string
  description?: string
}

export interface PortfolioComponent {
  title: string
  description: string
}

export interface AssessmentCriteria {
  type: string
  requirement: string
}

export interface Resource {
  category: string
  items: string[]
}

export interface DayContent {
  day: number
  title: string
  learningObjectives: LearningObjective[]
  duration?: string
  content: {
    interactiveSession?: {
      duration: string
      activities: Array<{
        title: string
        duration: string
        description: string
      }>
    }
    handsOnActivities?: string[]
    aiToolPractice?: string[]
    portfolioComponent?: string
  }
}

export interface WeekContent {
  week: number
  title: string
  overview?: string
  learningObjectives: LearningObjective[]
  days: DayContent[]
  integrationActivities?: {
    title: string
    description: string
  }[]
  portfolioReview?: {
    title: string
    items: string[]
  }
  assessmentCriteria?: AssessmentCriteria[]
}

export interface ModuleContent {
  id: string
  title: string
  subtitle?: string
  overview: string
  duration: string
  prerequisites: string[]
  learningObjectives: LearningObjective[]
  weeks: WeekContent[]
  outcomes: {
    technicalSkills?: string[]
    lifeSkills?: string[]
    portfolioProjects?: string[]
    learningOutcomes?: string[]
    technicalCompetencies?: string[]
    professionalApplications?: string[]
    careerAdvancement?: string[]
    strategicLeadership?: string[]
    technicalInnovation?: string[]
    industryExpertise?: string[]
  }
  equipment?: {
    provided: string[]
    value: string
  }
  certification?: {
    requirements: string[]
    portfolioComponents?: PortfolioComponent[]
    careerAdvancementOpportunities?: string[]
    industryRecognition?: string[]
  }
  resources?: {
    requiredTools?: string[]
    learningResources?: string[]
    supportSystems?: string[]
    industryConnections?: string[]
    thoughtLeadershipDevelopment?: string[]
    innovationAndCollaboration?: string[]
    continuousLearningAndSupport?: string[]
    capstoneProjectSupport?: string[]
    professionalDevelopment?: string[]
    careerServices?: string[]
    alumniCommunity?: string[]
  }
}

export interface CurriculumFramework {
  title: string
  overview: string
  targetAudience: {
    gradeLevels: string[]
    ages: string[]
    prerequisites: string
    classSize: string
    sessionFormat: string
    learningStyle: string
  }
  philosophy: {
    approach: string
    keyPrinciples: string[]
  }
  structure: {
    totalDuration: string
    phases: Array<{
      title: string
      weeks: string
      description: string
    }>
  }
  modules: ModuleContent[]
}

export interface CurriculumFilter {
  type: 'all' | 'module' | 'week' | 'topic'
  value?: string | number
}

export interface CurriculumNavigationItem {
  id: string
  title: string
  type: 'module' | 'week' | 'day'
  week?: number
  day?: number
  moduleId: string
}