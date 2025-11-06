/**
 * Configuration Exports for Bespoke Academy
 *
 * Central entry point for all configuration-related exports
 */

export {
  type GroqConfig,
  type GroqConfigValidationError,
  getGroqConfig,
  createGroqConfigOverrides,
  validateGroqConfig,
  getGroqConfigSummary,
  groqConfig
} from './groq.config'

/**
 * Configuration validation utility for startup
 */
export function validateAllConfigurations(): {
  isValid: boolean
  errors: string[]
  summary: Record<string, any>
} {
  const errors: string[] = []
  const summary: Record<string, any> = {}

  try {
    const { getGroqConfigSummary: getSummary } = require('./groq.config')
    const groqSummary = getSummary()
    summary.groq = {
      model: groqSummary.model,
      baseURL: groqSummary.baseURL,
      maxTokens: groqSummary.maxTokens,
      temperature: groqSummary.temperature,
      enableStreaming: groqSummary.enableStreaming
    }
  } catch (error) {
    errors.push(`Groq config: ${error instanceof Error ? error.message : String(error)}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    summary
  }
}

/**
 * Get environment information for debugging
 */
export function getEnvironmentInfo(): {
  nodeEnv: string
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  timestamp: string
} {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    timestamp: new Date().toISOString()
  }
}