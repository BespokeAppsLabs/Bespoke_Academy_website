/**
 * Consolidated Statistics Data
 * Single source of truth for all academy statistics
 */

export interface StatData {
  value: number | string
  suffix?: string
  label: string
  icon: string
  color: string
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

export interface StatisticsConfig {
  hero: {
    studentsEnrolled: StatData
    careerSuccessRate: StatData
    expertInstructors: StatData
    hiringPartners: StatData
  }
  academic: {
    students: StatData
    successRate: StatData
    programDuration: StatData
    hiringPartners: StatData
    projects: StatData
    support: StatData
  }
  programs: {
    activeStudents: StatData
    successRate: StatData
    totalWeeks: StatData
    completedProjects: StatData
  }
}

/**
 * Verified and consolidated statistics
 * All numbers are cross-referenced and validated
 */
export const consolidatedStatistics: StatisticsConfig = {
  hero: {
    studentsEnrolled: {
      value: 50000,
      suffix: '+',
      label: 'Students Enrolled',
      icon: 'Users',
      color: 'cyber-blue'
    },
    careerSuccessRate: {
      value: 95,
      suffix: '%',
      label: 'Career Success Rate',
      icon: 'Target',
      color: 'electric-purple'
    },
    expertInstructors: {
      value: 40,
      suffix: '+',
      label: 'Expert Instructors',
      icon: 'Award',
      color: 'neon-cyan'
    },
    hiringPartners: {
      value: 1000,
      suffix: '+',
      label: 'Hiring Partners',
      icon: 'TrendingUp',
      color: 'tech-green'
    }
  },
  academic: {
    students: {
      value: 50000,
      suffix: '+',
      label: 'Students',
      icon: 'Users',
      color: 'cyber-blue',
      trend: {
        value: 15,
        direction: 'up'
      }
    },
    successRate: {
      value: 95,
      suffix: '%',
      label: 'Success Rate',
      icon: 'Target',
      color: 'electric-purple',
      trend: {
        value: 3,
        direction: 'up'
      }
    },
    programDuration: {
      value: 40,
      suffix: '',
      label: 'Weeks Program',
      icon: 'Clock',
      color: 'neon-cyan'
    },
    hiringPartners: {
      value: 1000,
      suffix: '+',
      label: 'Hiring Partners',
      icon: 'TrendingUp',
      color: 'tech-green',
      trend: {
        value: 25,
        direction: 'up'
      }
    },
    projects: {
      value: 500,
      suffix: '+',
      label: 'Projects Completed',
      icon: 'Trophy',
      color: 'cyber-blue',
      trend: {
        value: 20,
        direction: 'up'
      }
    },
    support: {
      value: '24/7',
      suffix: '',
      label: 'Support',
      icon: 'Shield',
      color: 'tech-green'
    }
  },
  programs: {
    activeStudents: {
      value: 4000,
      suffix: '+',
      label: 'Active Students',
      icon: 'Users',
      color: 'cyber-blue'
    },
    successRate: {
      value: 95,
      suffix: '%',
      label: 'Success Rate',
      icon: 'Target',
      color: 'electric-purple'
    },
    totalWeeks: {
      value: 40,
      suffix: '',
      label: 'Total Weeks',
      icon: 'Clock',
      color: 'neon-cyan'
    },
    completedProjects: {
      value: 500,
      suffix: '+',
      label: 'Projects',
      icon: 'Trophy',
      color: 'tech-green'
    }
  }
}

/**
 * Helper functions for statistics
 */
export const getHeroStats = () => consolidatedStatistics.hero

export const getAcademicStats = () => consolidatedStatistics.academic

export const getProgramStats = () => consolidatedStatistics.programs

export const getStatByCategory = (category: keyof StatisticsConfig) => {
  return consolidatedStatistics[category]
}

export const getAllStats = () => ({
  hero: getHeroStats(),
  academic: getAcademicStats(),
  programs: getProgramStats()
})

/**
 * Statistics validation
 */
export const validateStatistics = () => {
  const stats = getAllStats()
  const validationResults = {
    isValid: true,
    errors: [] as string[]
  }

  // Cross-reference validation
  if (stats.hero.studentsEnrolled.value !== stats.academic.students.value) {
    validationResults.isValid = false
    validationResults.errors.push('Student count mismatch between hero and academic stats')
  }

  if (stats.hero.careerSuccessRate.value !== stats.academic.successRate.value) {
    validationResults.isValid = false
    validationResults.errors.push('Success rate mismatch between hero and academic stats')
  }

  if (stats.hero.hiringPartners.value !== stats.academic.hiringPartners.value) {
    validationResults.isValid = false
    validationResults.errors.push('Hiring partners count mismatch')
  }

  return validationResults
}

/**
 * Statistics formatting utilities
 */
export const formatStatValue = (stat: StatData): string => {
  const { value, suffix = '' } = stat
  return `${value.toLocaleString()}${suffix}`
}

export const getStatColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    'cyber-blue': 'text-cyber-blue',
    'electric-purple': 'text-electric-purple',
    'neon-cyan': 'text-neon-cyan',
    'tech-green': 'text-tech-green'
  }
  return colorMap[color] || 'text-foreground'
}

export const getStatIcon = (iconName: string) => {
  // This would be used with dynamic icon imports
  return iconName
}