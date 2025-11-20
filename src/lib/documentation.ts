/**
 * Documentation service for local Bespoke Academy documentation
 * Provides search and retrieval functionality for local markdown files
 */

import fs from 'fs'
import path from 'path'
import { DocumentIndex, DocumentResult, SearchResult } from '@/types/documentation'

export class DocumentationService {
  private documentsPath: string
  private index: DocumentIndex | null = null
  private documents: Map<string, string> = new Map()

  constructor() {
    this.documentsPath = path.join(process.cwd(), 'public', 'documents', 'documentation')
    this.loadIndex()
    this.loadDocuments()
  }

  /**
   * Load the documentation index from index.json
   */
  private async loadIndex(): Promise<void> {
    try {
      const indexPath = path.join(this.documentsPath, 'index.json')
      const indexContent = fs.readFileSync(indexPath, 'utf-8')
      this.index = JSON.parse(indexContent)
    } catch (error) {
      console.error('Failed to load documentation index:', error)
      this.index = null
    }
  }

  /**
   * Load all documentation files into memory
   */
  private async loadDocuments(): Promise<void> {
    if (!this.index) return

    try {
      for (const contextFile of this.index.contextFiles) {
        const filePath = path.join(this.documentsPath, contextFile.filename)
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8')
          this.documents.set(contextFile.filename, content)
        }
      }
    } catch (error) {
      console.error('Failed to load documentation files:', error)
    }
  }

  /**
   * Search documentation based on query and optional context type
   */
  async searchDocumentation(query: string, contextType?: string, limit: number = 5): Promise<SearchResult[]> {
    if (!this.index || !this.documents.size) {
      return []
    }

    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2)
    const results: SearchResult[] = []

    for (const contextFile of this.index.contextFiles) {
      // Filter by context type if specified
      if (contextType && contextFile.contextType !== contextType) {
        continue
      }

      const content = this.documents.get(contextFile.filename)
      if (!content) continue

      const lowerContent = content.toLowerCase()
      let relevanceScore = 0
      let matchedTerms: string[] = []

      // Calculate relevance score based on term matches
      for (const term of searchTerms) {
        // Title matches get higher score
        if (contextFile.title.toLowerCase().includes(term)) {
          relevanceScore += 10
          matchedTerms.push(term)
        }

        // Keywords matches get high score
        if (contextFile.keywords.some(keyword => keyword.toLowerCase().includes(term))) {
          relevanceScore += 5
          matchedTerms.push(term)
        }

        // Content matches
        const termCount = (lowerContent.match(new RegExp(term, 'g')) || []).length
        relevanceScore += termCount
        if (termCount > 0) {
          matchedTerms.push(term)
        }
      }

      if (relevanceScore > 0) {
        // Extract relevant snippet
        const snippet = this.extractSnippet(content, searchTerms)

        results.push({
          filename: contextFile.filename,
          title: contextFile.title,
          contextType: contextFile.contextType,
          snippet,
          relevanceScore,
          matchedTerms: [...new Set(matchedTerms)],
          metadata: {
            description: contextFile.description,
            primaryUrl: contextFile.primaryUrl,
            keywords: contextFile.keywords,
            wordCount: contextFile.wordCount
          }
        })
      }
    }

    // Sort by relevance score and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
  }

  /**
   * Get a specific document by its type
   */
  async getDocumentByType(documentType: string): Promise<DocumentResult | null> {
    if (!this.index) return null

    const contextFile = this.index.contextFiles.find(file => file.contextType === documentType)
    if (!contextFile) return null

    const content = this.documents.get(contextFile.filename)
    if (!content) return null

    return {
      filename: contextFile.filename,
      title: contextFile.title,
      contextType: contextFile.contextType,
      content,
      metadata: {
        description: contextFile.description,
        primaryUrl: contextFile.primaryUrl,
        keywords: contextFile.keywords,
        wordCount: contextFile.wordCount,
        lastModified: contextFile.lastModified
      }
    }
  }

  /**
   * Get all available document types
   */
  async getAvailableDocumentTypes(): Promise<{type: string, title: string, description: string}[]> {
    if (!this.index) return []

    return this.index.contextFiles.map(file => ({
      type: file.contextType,
      title: file.title,
      description: file.description
    }))
  }

  /**
   * Extract a relevant snippet from content based on search terms
   */
  private extractSnippet(content: string, searchTerms: string[], maxLength: number = 300): string {
    const lines = content.split('\n')
    let bestSnippet = ''
    let bestScore = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase()
      let score = 0

      for (const term of searchTerms) {
        if (line.includes(term)) {
          score += 1
        }
      }

      if (score > bestScore) {
        bestScore = score

        // Get context around this line
        const start = Math.max(0, i - 1)
        const end = Math.min(lines.length, i + 3)
        const snippetLines = lines.slice(start, end)

        let snippet = snippetLines.join(' ').trim()

        // Limit snippet length
        if (snippet.length > maxLength) {
          snippet = snippet.substring(0, maxLength) + '...'
        }

        bestSnippet = snippet
      }
    }

    return bestSnippet || content.substring(0, maxLength) + '...'
  }

  /**
   * Get context suggestions based on query
   */
  async getContextSuggestions(query: string): Promise<string[]> {
    const lowerQuery = query.toLowerCase()
    const suggestions: string[] = []

    if (!this.index) return suggestions

    // Simple keyword matching to suggest context types
    if (lowerQuery.includes('curriculum') || lowerQuery.includes('learn') || lowerQuery.includes('course')) {
      suggestions.push('curriculum')
    }
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('tuition')) {
      suggestions.push('pricing')
    }
    if (lowerQuery.includes('enroll') || lowerQuery.includes('register') || lowerQuery.includes('apply')) {
      suggestions.push('enrollment')
    }
    if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('build')) {
      suggestions.push('projects')
    }
    if (lowerQuery.includes('schedule') || lowerQuery.includes('time') || lowerQuery.includes('when')) {
      suggestions.push('schedule')
    }
    if (lowerQuery.includes('requirement') || lowerQuery.includes('need') || lowerQuery.includes('equipment')) {
      suggestions.push('requirements')
    }
    if (lowerQuery.includes('help') || lowerQuery.includes('support') || lowerQuery.includes('issue')) {
      suggestions.push('support')
    }
    if (lowerQuery.includes('outcome') || lowerQuery.includes('career') || lowerQuery.includes('job')) {
      suggestions.push('outcomes')
    }
    if (lowerQuery.includes('question') || lowerQuery.includes('faq') || lowerQuery.includes('ask')) {
      suggestions.push('faq')
    }

    return [...new Set(suggestions)]
  }
}

// Singleton instance
export const documentationService = new DocumentationService()