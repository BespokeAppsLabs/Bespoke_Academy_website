/**
 * Types for documentation service and search results
 */

export interface DocumentIndex {
  version: string
  lastUpdated: string
  contextFiles: ContextFile[]
  statistics: {
    totalFiles: number
    totalWords: number
    averageWordsPerFile: number
    contextTypes: string[]
  }
  maintenance: {
    reviewSchedule: string
    contentValidation: string
    lastValidation: string
    nextReviewDue: string
  }
}

export interface ContextFile {
  filename: string
  title: string
  contextType: string
  description: string
  primaryUrl: string
  relatedUrls: string[]
  lastModified: string
  wordCount: number
  keywords: string[]
}

export interface SearchResult {
  filename: string
  title: string
  contextType: string
  snippet: string
  relevanceScore: number
  matchedTerms: string[]
  metadata: {
    description: string
    primaryUrl: string
    keywords: string[]
    wordCount: number
  }
}

export interface DocumentResult {
  filename: string
  title: string
  contextType: string
  content: string
  metadata: {
    description: string
    primaryUrl: string
    keywords: string[]
    wordCount: number
    lastModified: string
  }
}