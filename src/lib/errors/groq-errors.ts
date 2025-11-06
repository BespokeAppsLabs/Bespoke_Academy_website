/**
 * Enhanced Error Types for Groq API Integration
 *
 * Provides detailed error classification and handling for the Bespoke Academy chatbot
 */

export enum GroqErrorType {
  // Authentication & Authorization
  API_KEY_INVALID = 'API_KEY_INVALID',
  API_KEY_MISSING = 'API_KEY_MISSING',
  API_KEY_EXPIRED = 'API_KEY_EXPIRED',
  API_KEY_REVOKED = 'API_KEY_REVOKED',

  // Rate Limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  RATE_LIMIT_DAILY = 'RATE_LIMIT_DAILY',
  RATE_LIMIT_MONTHLY = 'RATE_LIMIT_MONTHLY',
  BURST_LIMIT_EXCEEDED = 'BURST_LIMIT_EXCEEDED',

  // Request Issues
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  REQUEST_TOO_LARGE = 'REQUEST_TOO_LARGE',
  REQUEST_INVALID = 'REQUEST_INVALID',
  REQUEST_CANCELLED = 'REQUEST_CANCELLED',

  // Model Issues
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  MODEL_OVERLOADED = 'MODEL_OVERLOADED',
  MODEL_DEPRECATED = 'MODEL_DEPRECATED',
  MODEL_UNAVAILABLE = 'MODEL_UNAVAILABLE',

  // Content Issues
  CONTENT_FILTERED = 'CONTENT_FILTERED',
  CONTENT_TOO_LONG = 'CONTENT_TOO_LONG',
  CONTENT_INVALID = 'CONTENT_INVALID',

  // Network Issues
  NETWORK_ERROR = 'NETWORK_ERROR',
  DNS_ERROR = 'DNS_ERROR',
  CONNECTION_REFUSED = 'CONNECTION_REFUSED',
  SSL_ERROR = 'SSL_ERROR',

  // Service Issues
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  SERVICE_MAINTENANCE = 'SERVICE_MAINTENANCE',
  SERVICE_OVERLOADED = 'SERVICE_OVERLOADED',

  // Configuration Issues
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  ENVIRONMENT_INVALID = 'ENVIRONMENT_INVALID',

  // Streaming Issues
  STREAM_INTERRUPTED = 'STREAM_INTERRUPTED',
  STREAM_TIMEOUT = 'STREAM_TIMEOUT',
  STREAM_INVALID = 'STREAM_INVALID',

  // Unknown/Unhandled
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

export enum GroqErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface GroqErrorContext {
  requestId?: string
  timestamp: Date
  model?: string
  endpoint?: string
  statusCode?: number
  responseTime?: number
  retryAttempt?: number
  userAgent?: string
  ipAddress?: string
  additionalData?: Record<string, any>
}

export interface GroqErrorDetails {
  type: GroqErrorType
  severity: GroqErrorSeverity
  message: string
  originalError?: Error | string
  context: GroqErrorContext
  isRetryable: boolean
  suggestedAction: string
  userFriendlyMessage: string
}

/**
 * Enhanced Groq Error Class
 */
export class GroqApiError extends Error {
  public readonly type: GroqErrorType
  public readonly severity: GroqErrorSeverity
  public readonly context: GroqErrorContext
  public readonly isRetryable: boolean
  public readonly suggestedAction: string
  public readonly userFriendlyMessage: string
  public readonly statusCode?: number
  public readonly originalError?: Error | string

  constructor(details: GroqErrorDetails) {
    super(details.message)
    this.name = 'GroqApiError'
    this.type = details.type
    this.severity = details.severity
    this.context = details.context
    this.isRetryable = details.isRetryable
    this.suggestedAction = details.suggestedAction
    this.userFriendlyMessage = details.userFriendlyMessage
    this.statusCode = details.context.statusCode
    this.originalError = details.originalError

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GroqApiError)
    }
  }

  /**
   * Convert error to JSON for logging/serialization
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      severity: this.severity,
      message: this.message,
      userFriendlyMessage: this.userFriendlyMessage,
      suggestedAction: this.suggestedAction,
      isRetryable: this.isRetryable,
      context: {
        ...this.context,
        timestamp: this.context.timestamp.toISOString()
      },
      statusCode: this.statusCode,
      stack: this.stack
    }
  }

  /**
   * Get a concise error summary for logging
   */
  getSummary(): string {
    return `[${this.type}] ${this.message} (${this.context.requestId || 'no-id'})`
  }
}

/**
 * Error Factory Functions
 */

export function createGroqError(
  type: GroqErrorType,
  originalError: Error | string | unknown,
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  const errorDetails = getErrorDetails(type, originalError, context)
  return new GroqApiError(errorDetails)
}

export function createNetworkError(
  originalError: Error | string | unknown,
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  return createGroqError(GroqErrorType.NETWORK_ERROR, originalError, context)
}

export function createTimeoutError(
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  return createGroqError(GroqErrorType.REQUEST_TIMEOUT, 'Request timeout', context)
}

export function createRateLimitError(
  statusCode: number,
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  const type = statusCode === 429 ? GroqErrorType.RATE_LIMIT_EXCEEDED : GroqErrorType.BURST_LIMIT_EXCEEDED
  return createGroqError(type, 'Rate limit exceeded', { ...context, statusCode })
}

export function createAuthenticationError(
  originalError: Error | string | unknown,
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  // Determine specific auth error type based on error message
  const errorStr = originalError instanceof Error ? originalError.message : String(originalError)

  let type = GroqErrorType.API_KEY_INVALID
  if (errorStr.includes('missing')) {
    type = GroqErrorType.API_KEY_MISSING
  } else if (errorStr.includes('expired')) {
    type = GroqErrorType.API_KEY_EXPIRED
  } else if (errorStr.includes('revoked')) {
    type = GroqErrorType.API_KEY_REVOKED
  }

  return createGroqError(type, originalError, context)
}

/**
 * Parse error from API response or network error
 */
export function parseGroqError(
  error: Error | string | unknown,
  context: Partial<GroqErrorContext> = {}
): GroqApiError {
  if (error instanceof GroqApiError) {
    return error
  }

  const errorStr = error instanceof Error ? error.message : String(error)
  const statusCode = extractStatusCode(error)

  // Rate limiting errors
  if (statusCode === 429 || errorStr.includes('rate limit')) {
    return createRateLimitError(statusCode || 429, context)
  }

  // Authentication errors
  if (statusCode === 401 || errorStr.includes('authentication') || errorStr.includes('unauthorized')) {
    return createAuthenticationError(error, context)
  }

  // Not found errors (model, endpoint, etc.)
  if (statusCode === 404 || errorStr.includes('not found')) {
    if (errorStr.includes('model')) {
      return createGroqError(GroqErrorType.MODEL_NOT_FOUND, error, context)
    }
    return createGroqError(GroqErrorType.SERVICE_UNAVAILABLE, error, context)
  }

  // Timeout errors
  if (errorStr.includes('timeout') || errorStr.includes('TIMEOUT')) {
    return createTimeoutError(context)
  }

  // Network errors
  if (errorStr.includes('network') || errorStr.includes('ENOTFOUND') || errorStr.includes('ECONNREFUSED')) {
    return createNetworkError(error, context)
  }

  // Service unavailable
  if (statusCode === 503 || errorStr.includes('service unavailable')) {
    return createGroqError(GroqErrorType.SERVICE_UNAVAILABLE, error, context)
  }

  // Request too large
  if (statusCode === 413 || errorStr.includes('too large')) {
    return createGroqError(GroqErrorType.REQUEST_TOO_LARGE, error, context)
  }

  // Content filtering
  if (statusCode === 400 && errorStr.includes('content')) {
    return createGroqError(GroqErrorType.CONTENT_FILTERED, error, context)
  }

  // Default to unknown error
  return createGroqError(GroqErrorType.UNKNOWN_ERROR, error, context)
}

/**
 * Helper Functions
 */

function getErrorDetails(
  type: GroqErrorType,
  originalError: Error | string | unknown,
  context: Partial<GroqErrorContext>
): GroqErrorDetails {
  const errorStr = originalError instanceof Error ? originalError.message : String(originalError)
  const baseContext: GroqErrorContext = {
    timestamp: new Date(),
    ...context
  }

  return {
    type,
    severity: getErrorSeverity(type),
    message: getErrorMessage(type, errorStr),
    originalError: originalError instanceof Error ? originalError : errorStr,
    context: baseContext,
    isRetryable: getErrorRetryability(type),
    suggestedAction: getSuggestedAction(type),
    userFriendlyMessage: getUserFriendlyMessage(type)
  }
}

function getErrorSeverity(type: GroqErrorType): GroqErrorSeverity {
  switch (type) {
    case GroqErrorType.API_KEY_MISSING:
    case GroqErrorType.API_KEY_REVOKED:
    case GroqErrorType.CONFIGURATION_ERROR:
      return GroqErrorSeverity.CRITICAL

    case GroqErrorType.API_KEY_INVALID:
    case GroqErrorType.API_KEY_EXPIRED:
    case GroqErrorType.SERVICE_UNAVAILABLE:
    case GroqErrorType.SERVICE_MAINTENANCE:
      return GroqErrorSeverity.HIGH

    case GroqErrorType.RATE_LIMIT_EXCEEDED:
    case GroqErrorType.MODEL_OVERLOADED:
    case GroqErrorType.NETWORK_ERROR:
    case GroqErrorType.REQUEST_TIMEOUT:
      return GroqErrorSeverity.MEDIUM

    default:
      return GroqErrorSeverity.LOW
  }
}

function getErrorMessage(type: GroqErrorType, originalError: string): string {
  switch (type) {
    case GroqErrorType.API_KEY_INVALID:
      return `Invalid API key: ${originalError}`
    case GroqErrorType.RATE_LIMIT_EXCEEDED:
      return `Rate limit exceeded: ${originalError}`
    case GroqErrorType.NETWORK_ERROR:
      return `Network error: ${originalError}`
    case GroqErrorType.REQUEST_TIMEOUT:
      return `Request timeout: ${originalError}`
    case GroqErrorType.MODEL_NOT_FOUND:
      return `Model not found: ${originalError}`
    default:
      return originalError || 'Unknown error occurred'
  }
}

function getErrorRetryability(type: GroqErrorType): boolean {
  const retryableTypes = [
    GroqErrorType.RATE_LIMIT_EXCEEDED,
    GroqErrorType.REQUEST_TIMEOUT,
    GroqErrorType.NETWORK_ERROR,
    GroqErrorType.MODEL_OVERLOADED,
    GroqErrorType.SERVICE_OVERLOADED,
    GroqErrorType.CONNECTION_REFUSED,
    GroqErrorType.STREAM_INTERRUPTED,
    GroqErrorType.UNKNOWN_ERROR
  ]
  return retryableTypes.includes(type)
}

function getSuggestedAction(type: GroqErrorType): string {
  switch (type) {
    case GroqErrorType.API_KEY_MISSING:
    case GroqErrorType.API_KEY_INVALID:
      return 'Check your API key configuration'
    case GroqErrorType.RATE_LIMIT_EXCEEDED:
      return 'Wait and retry the request'
    case GroqErrorType.REQUEST_TIMEOUT:
      return 'Increase timeout or retry with a shorter message'
    case GroqErrorType.MODEL_NOT_FOUND:
      return 'Check model name and availability'
    case GroqErrorType.NETWORK_ERROR:
      return 'Check internet connection and retry'
    case GroqErrorType.CONTENT_FILTERED:
      return 'Modify the message content and retry'
    default:
      return 'Retry the request or contact support'
  }
}

function getUserFriendlyMessage(type: GroqErrorType): string {
  switch (type) {
    case GroqErrorType.API_KEY_INVALID:
      return 'Service configuration error. Please contact support.'
    case GroqErrorType.RATE_LIMIT_EXCEEDED:
      return 'Too many requests. Please wait a moment before trying again.'
    case GroqErrorType.REQUEST_TIMEOUT:
      return 'Request timed out. Please try again.'
    case GroqErrorType.NETWORK_ERROR:
      return 'Network connection failed. Please check your internet connection.'
    case GroqErrorType.MODEL_NOT_FOUND:
      return 'AI service temporarily unavailable. Please try again later.'
    case GroqErrorType.CONTENT_FILTERED:
      return 'Message could not be processed. Please rephrase and try again.'
    case GroqErrorType.SERVICE_UNAVAILABLE:
      return 'Service temporarily unavailable. Please try again in a few moments.'
    default:
      return 'An unexpected error occurred. Please try again.'
  }
}

function extractStatusCode(error: Error | string | unknown): number | undefined {
  if (error instanceof Error) {
    const statusMatch = error.message.match(/status (\d+)/i)
    return statusMatch ? parseInt(statusMatch[1]) : undefined
  }
  return undefined
}

/**
 * Error logging utility
 */
export function logGroqError(error: GroqApiError, additionalContext?: Record<string, any>): void {
  console.error('Groq API Error:', {
    ...error.toJSON(),
    ...additionalContext
  })
}