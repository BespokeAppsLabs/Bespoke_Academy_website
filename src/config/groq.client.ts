/**
 * Client-safe Groq Configuration
 *
 * This file provides client-side configuration that doesn't access server-only environment variables.
 * The actual API calls should always go through the API route, not direct client-side calls.
 */

// Default client configuration (safe values)
export const CLIENT_GROQ_CONFIG = {
  // These are safe defaults that won't trigger validation
  model: 'llama-3.1-8b-instant',
  maxTokens: 1000,
  temperature: 0.7,
  timeout: 30000,
  enableStreaming: true,
  enableDebugging: false,
  maxMessageLength: 2000,
  maxHistoryLength: 10,

  // Rate limiting for client-side requests
  rateLimit: {
    requestsPerMinute: 10,
    requestsPerHour: 100,
    burstLimit: 5
  }
}

export type ClientGroqConfig = typeof CLIENT_GROQ_CONFIG

/**
 * Get client-safe configuration
 * This can be safely called from client-side code
 */
export function getClientGroqConfig(): ClientGroqConfig {
  return CLIENT_GROQ_CONFIG
}

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Check if we're in a server environment
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}