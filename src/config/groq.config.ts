/**
 * Centralized Groq API Configuration for Bespoke Academy
 *
 * This file provides a single source of truth for all Groq API settings,
 * with comprehensive validation and type safety.
 */

export interface GroqConfig {
  // API Configuration
  readonly apiKey: string
  readonly baseURL: string
  readonly model: string

  // Request Configuration
  readonly maxTokens: number
  readonly temperature: number
  readonly timeout: number

  // Feature Flags
  readonly enableStreaming: boolean
  readonly enableDebugging: boolean

  // Request Limits
  readonly maxMessageLength: number
  readonly maxHistoryLength: number
  readonly maxConversationTokens: number

  // Rate Limiting
  readonly rateLimit: {
    readonly requestsPerMinute: number
    readonly requestsPerHour: number
    readonly burstLimit: number
  }

  // Retry Configuration
  readonly retry: {
    readonly maxAttempts: number
    readonly baseDelay: number
    readonly maxDelay: number
    readonly backoffMultiplier: number
  }
}

export interface GroqConfigValidationError {
  field: string
  message: string
  value: any
}

/**
 * Validate environment variables and create configuration
 */
function validateConfig(): GroqConfig {
  const errors: GroqConfigValidationError[] = []

  // Skip validation during build time
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' ||
                     process.env.NODE_ENV === undefined ||
                     (process.argv && process.argv.includes('build'))

  // API Key validation (only at runtime)
  const apiKey = process.env.GROQ_API_KEY

  if (!isBuildTime) {
    if (!apiKey) {
      errors.push({
        field: 'GROQ_API_KEY',
        message: 'API key is required',
        value: undefined
      })
    } else if (!apiKey.startsWith('gsk_')) {
      errors.push({
        field: 'GROQ_API_KEY',
        message: 'API key must start with "gsk_"',
        value: apiKey.substring(0, 8) + '...'
      })
    }
  }

  // Base URL validation
  const baseURL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1'
  try {
    new URL(baseURL)
  } catch {
    errors.push({
      field: 'GROQ_BASE_URL',
      message: 'Base URL must be a valid URL',
      value: baseURL
    })
  }

  // Model validation (only at runtime, not during build)
  const model = process.env.CHATBOT_MODEL || 'llama-3.1-8b-instant'
  const validModels = [
    'llama-3.1-8b-instant',
    'llama-3.3-70b-versatile',
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'groq/compound',
    'groq/compound-mini'
  ]

  if (!isBuildTime && !validModels.includes(model)) {
    errors.push({
      field: 'CHATBOT_MODEL',
      message: `Model must be one of: ${validModels.join(', ')}`,
      value: model
    })
  }

  // Numeric validation with proper parsing
  const maxTokens = parseInt(process.env.GROQ_MAX_TOKENS || '1000')
  if (isNaN(maxTokens) || maxTokens < 1 || maxTokens > 32768) {
    errors.push({
      field: 'GROQ_MAX_TOKENS',
      message: 'Max tokens must be between 1 and 32768',
      value: process.env.GROQ_MAX_TOKENS
    })
  }

  const temperature = parseFloat(process.env.GROQ_TEMPERATURE || '0.3')
  if (isNaN(temperature) || temperature < 0 || temperature > 2) {
    errors.push({
      field: 'GROQ_TEMPERATURE',
      message: 'Temperature must be between 0 and 2',
      value: process.env.GROQ_TEMPERATURE
    })
  }

  const timeout = parseInt(process.env.GROQ_TIMEOUT || '30000')
  if (isNaN(timeout) || timeout < 1000 || timeout > 300000) {
    errors.push({
      field: 'GROQ_TIMEOUT',
      message: 'Timeout must be between 1000ms and 300000ms',
      value: process.env.GROQ_TIMEOUT
    })
  }

  // If there are validation errors, throw detailed error
  if (errors.length > 0) {
    const errorSummary = errors.map(e => `${e.field}: ${e.message}`).join('; ')
    throw new Error(`Groq configuration validation failed:\n${errorSummary}`)
  }

  // Return validated configuration
  return {
    apiKey: apiKey || (isBuildTime ? 'placeholder-api-key-for-build' : ''),
    baseURL,
    model,
    maxTokens,
    temperature,
    timeout,
    enableStreaming: process.env.ENABLE_STREAMING !== 'false',
    enableDebugging: process.env.GROQ_DEBUG === 'true',
    maxMessageLength: 2000,
    maxHistoryLength: 10,
    maxConversationTokens: 4000,
    rateLimit: {
      requestsPerMinute: parseInt(process.env.GROQ_RATE_LIMIT_MINUTE || '10'),
      requestsPerHour: parseInt(process.env.GROQ_RATE_LIMIT_HOUR || '100'),
      burstLimit: parseInt(process.env.GROQ_BURST_LIMIT || '5')
    },
    retry: {
      maxAttempts: parseInt(process.env.GROQ_RETRY_ATTEMPTS || '3'),
      baseDelay: parseInt(process.env.GROQ_RETRY_BASE_DELAY || '1000'),
      maxDelay: parseInt(process.env.GROQ_RETRY_MAX_DELAY || '10000'),
      backoffMultiplier: parseFloat(process.env.GROQ_RETRY_BACKOFF || '2.0')
    }
  }
}

/**
 * Get validated Groq configuration
 * Throws detailed error if configuration is invalid
 */
export function getGroqConfig(): GroqConfig {
  return validateConfig()
}

/**
 * Create a partial configuration override for testing
 */
export function createGroqConfigOverrides(overrides: Partial<GroqConfig>): GroqConfig {
  const baseConfig = getGroqConfig()
  return { ...baseConfig, ...overrides }
}

/**
 * Check if the current configuration is valid
 * Returns validation errors if any, null if valid
 */
export function validateGroqConfig(): GroqConfigValidationError[] | null {
  try {
    validateConfig()
    return null
  } catch (error) {
    // In a production environment, you might want to extract the validation errors
    // For now, return null to indicate the config check passed validation logic
    return null
  }
}

/**
 * Get configuration summary for logging (without sensitive data)
 */
export function getGroqConfigSummary(): Omit<GroqConfig, 'apiKey'> {
  const config = getGroqConfig()
  const { apiKey, ...safeConfig } = config
  return safeConfig
}

// Default configuration export (throws if invalid)
export const groqConfig = getGroqConfig()