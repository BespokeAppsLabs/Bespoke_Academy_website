/**
 * DocumentationResult component for displaying tool search results
 * Renders documentation search results and tool invocations in the chat
 */

"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, Search, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DocumentationResultProps {
  toolCall?: any
  toolResult?: any
  className?: string
}

interface SearchResult {
  title: string
  filename: string
  contextType: string
  snippet: string
  relevanceScore: number
  primaryUrl: string
  description: string
  keywords: string[]
}

export function DocumentationResult({
  toolCall,
  toolResult,
  className
}: DocumentationResultProps) {
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set())

  if (!toolCall && !toolResult) return null

  const toggleResult = (index: number) => {
    const newExpanded = new Set(expandedResults)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedResults(newExpanded)
  }

  // Render tool invocation (search in progress)
  if (toolCall) {
    const toolName = toolCall.toolName
    const args = toolCall.args || {}

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex gap-3 max-w-full",
          className
        )}
      >
        <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30">
          <Search className="h-3 w-3" />
        </div>
        <div className="flex-1">
          <div className={cn(
            "rounded-lg px-3 py-2 max-w-[600px]",
            "bg-blue-950/20 border border-blue-800/30 text-blue-300",
            "text-xs font-mono"
          )}>
            <div className="flex items-center gap-2">
              <div className="animate-pulse">
                <Search className="h-3 w-3" />
              </div>
              <span>
                {toolName === 'searchDocumentation' && `Searching documentation for "${args.query}"`}
                {toolName === 'getDocumentByType' && `Loading ${args.documentType} document`}
                {toolName === 'getAvailableDocumentTypes' && 'Getting available document types'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Render tool result
  if (toolResult) {
    const result = toolResult.result

    // Handle search results
    if (result.results && Array.isArray(result.results)) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex gap-3 max-w-full",
            className
          )}
        >
          <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            <BookOpen className="h-3 w-3" />
          </div>
          <div className="flex-1 space-y-3">
            <div className={cn(
              "rounded-lg px-3 py-2 max-w-[600px]",
              "bg-emerald-950/20 border border-emerald-800/30"
            )}>
              <div className="flex items-center gap-2 text-emerald-300 text-xs">
                <BookOpen className="h-3 w-3" />
                <span className="font-medium">
                  Found {result.totalResults} document{result.totalResults !== 1 ? 's' : ''} for "{result.query}"
                </span>
              </div>
            </div>

            {/* Search results */}
            <div className="space-y-2">
              {result.results.map((searchResult: SearchResult, index: number) => (
                <Card
                  key={index}
                  className={cn(
                    "bg-zinc-800/50 border-zinc-700 text-zinc-100 p-3",
                    "hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
                  )}
                >
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-emerald-400" />
                          <h4 className="font-medium text-emerald-400">{searchResult.title}</h4>
                          <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-400">
                            {searchResult.contextType}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-400">{searchResult.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleResult(index)}
                        className="h-6 w-6 p-0 text-zinc-400 hover:text-white"
                      >
                        {expandedResults.has(index) ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </Button>
                    </div>

                    {/* Snippet */}
                    <div className="text-sm text-zinc-200 leading-relaxed">
                      <p className="line-clamp-2">{searchResult.snippet}</p>
                    </div>

                    {/* Expanded content */}
                    {expandedResults.has(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2 pt-2 border-t border-zinc-700"
                      >
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-1">
                          {searchResult.keywords.slice(0, 5).map((keyword, kidx) => (
                            <Badge
                              key={kidx}
                              variant="secondary"
                              className="text-xs bg-zinc-700 text-zinc-300"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-7 text-xs border-zinc-600 hover:bg-zinc-700"
                          >
                            <a
                              href={searchResult.primaryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Full Document
                            </a>
                          </Button>
                          <div className="text-xs text-zinc-500">
                            Relevance: {Math.round((searchResult.relevanceScore / 10) * 100)}%
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      )
    }

    // Handle single document result
    if (result.content) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex gap-3 max-w-full",
            className
          )}
        >
          <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            <FileText className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <Card
              className={cn(
                "bg-zinc-800/50 border-zinc-700 text-zinc-100 p-4",
                "hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
              )}
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-emerald-400" />
                      <h4 className="font-medium text-emerald-400">{result.title}</h4>
                      <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-400">
                        {result.contextType}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400">{result.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-7 text-xs border-zinc-600 hover:bg-zinc-700"
                  >
                    <a
                      href={result.primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Full
                    </a>
                  </Button>
                </div>

                {/* Content preview */}
                <div className="text-sm text-zinc-200 leading-relaxed max-h-40 overflow-y-auto">
                  <p>{result.content.substring(0, 500)}{result.content.length > 500 ? '...' : ''}</p>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1">
                  {result.keywords.slice(0, 8).map((keyword: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-zinc-700 text-zinc-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      )
    }

    // Handle error results
    if (result.error) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex gap-3 max-w-full",
            className
          )}
        >
          <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-400/30">
            <Search className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <div className={cn(
              "rounded-lg px-3 py-2 max-w-[600px]",
              "bg-red-950/20 border border-red-800/30 text-red-300",
              "text-xs"
            )}>
              <span>{result.error}</span>
              {result.availableTypes && (
                <div className="mt-2">
                  <span className="font-medium">Available document types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.availableTypes.map((type: any, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-red-600/30 text-red-400"
                      >
                        {type.type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )
    }

    // Handle available document types
    if (Array.isArray(result)) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex gap-3 max-w-full",
            className
          )}
        >
          <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
            <BookOpen className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <div className={cn(
              "rounded-lg px-3 py-2 max-w-[600px]",
              "bg-emerald-950/20 border border-emerald-800/30 text-emerald-300",
              "text-xs"
            )}>
              <div className="font-medium mb-2">Available Documents:</div>
              <div className="grid grid-cols-1 gap-1">
                {result.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 py-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div>
                      <span className="font-medium">{doc.title}</span>
                      <span className="text-emerald-400/70 ml-2">({doc.type})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    // Fallback for unknown result types
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex gap-3 max-w-full",
          className
        )}
      >
        <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-full bg-zinc-500/20 text-zinc-400 border border-zinc-400/30">
          <BookOpen className="h-3 w-3" />
        </div>
        <div className="flex-1">
          <div className={cn(
            "rounded-lg px-3 py-2 max-w-[600px]",
            "bg-zinc-800/50 border border-zinc-700 text-zinc-300",
            "text-xs font-mono"
          )}>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}