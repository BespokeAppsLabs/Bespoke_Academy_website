/**
 * Groq API client integration for Bespoke Academy chatbot
 * Enhanced with centralized configuration and improved error handling
 */

import OpenAI from 'openai'
import type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ChatError,
  StreamingChunk,
  ChatConfig
} from './chat'
import {
  getGroqConfig,
  createGroqConfigOverrides,
  type GroqConfig
} from '@/config'
import {
  parseGroqError,
  createGroqError,
  GroqErrorType,
  type GroqApiError,
  logGroqError
} from '@/lib/errors/groq-errors'
import { toolManager } from '@/lib/tools'
import {
  validateChatRequest,
  prepareMessages,
  buildDynamicSystemMessage,
  optimizeConversationHistory,
  generateConciseResponse
} from '@/lib/utils/chat-utils'

export class GroqClient {
  private client: OpenAI
  private config: GroqConfig
  private chatConfig: ChatConfig

  constructor(config?: Partial<ChatConfig>) {
    try {
      this.config = getGroqConfig()
    } catch (error) {
      if (error instanceof Error) {
        throw createGroqError(
          GroqErrorType.CONFIGURATION_ERROR,
          error,
          { timestamp: new Date() }
        )
      }
      throw error
    }

    this.chatConfig = {
      model: this.config.model,
      maxTokens: this.config.maxTokens,
      temperature: this.config.temperature,
      systemMessage: '',
      enableStreaming: this.config.enableStreaming,
      timeoutMs: this.config.timeout,
      ...config
    }

    this.client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
    })
  }

  /**
   * Send a chat completion request with streaming support and tool calling
   */
  async sendChatRequest(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
    const startTime = Date.now()
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    console.log(`🎬 [${requestId}] Starting chat request:`, {
      messageLength: request.message?.length || 0,
      conversationHistoryLength: request.conversationHistory?.length || 0,
      contextType: request.context?.type
    })

    try {
      // Validate request
      validateChatRequest(request)
      console.log(`✅ [${requestId}] Request validation passed`)

      // Prepare messages for the API
      const messages = prepareMessages(request)
      console.log(`📋 [${requestId}] Prepared ${messages.length} messages for API`)

      // Determine if tools should be available
      const availableTools = toolManager.getAvailableTools()
      const shouldUseTools = toolManager.shouldUseTool(request.message)

      console.log(`🔧 [${requestId}] Tool configuration:`, {
        availableToolsCount: availableTools.length,
        shouldUseTools: shouldUseTools.shouldUse,
        detectedTool: shouldUseTools.toolName,
        detectedParameters: shouldUseTools.parameters
      })

      // Create the streaming completion with tool support
      const stream = await this.client.chat.completions.create({
        model: this.chatConfig.model,
        messages,
        max_tokens: this.chatConfig.maxTokens,
        temperature: this.chatConfig.temperature,
        stream: this.chatConfig.enableStreaming,
        tools: shouldUseTools.shouldUse ? availableTools : undefined,
        tool_choice: shouldUseTools.shouldUse ? 'auto' : undefined,
      })

      // Store references for the stream
      const chatConfig = this.chatConfig
      const config = this.config
      const client = this.client // Capture client reference to avoid access issues

      // Return a readable stream formatted for Server-Sent Events
      return new ReadableStream<Uint8Array>({
        async start(controller) {
          const encoder = new TextEncoder()
          let fullResponse = ''
          let toolResults: any[] = []
          let isProcessingTools = false

          try {
            console.log(`🚀 [${requestId}] Starting to process stream...`)
            for await (const chunk of stream as any) {
              const delta = chunk.choices[0]?.delta

              if (delta?.content) {
                fullResponse += delta.content
                const sseChunk = `data: ${JSON.stringify({
                  content: delta.content,
                  type: 'content'
                })}\n\n`
                controller.enqueue(encoder.encode(sseChunk))
              }

              // Handle tool calls
              if (delta?.tool_calls) {
                isProcessingTools = true
                console.log(`🔧 [${requestId}] Tool calls detected in stream:`, delta.tool_calls.length)

                for (const toolCall of delta.tool_calls) {
                  if (toolCall.function) {
                    console.log(`🔧 [${requestId}] Tool call received: ${toolCall.function.name}`)

                    const toolData = {
                      type: toolCall.type || 'function',
                      function: {
                        name: toolCall.function?.name || '',
                        arguments: toolCall.function?.arguments || ''
                      }
                    }

                    const sseChunk = `data: ${JSON.stringify({
                      type: 'tool_call',
                      tool: toolData
                    })}\n\n`

                    // Only send to client for debugging if enabled
                    if (config.enableDebugging) {
                      controller.enqueue(encoder.encode(sseChunk))
                    }
                  }
                }
              }

              // Handle the final completion
              if (chunk.choices[0]?.finish_reason === 'tool_calls') {
                console.log(`🔧 [${requestId}] Tool calls completed, executing tools...`)

                // Extract tool calls from the accumulated response
                console.log(`🔄 [${requestId}] Making non-streaming request to get complete tool calls...`)
                const response = await client.chat.completions.create({
                  model: chatConfig.model,
                  messages,
                  max_tokens: chatConfig.maxTokens,
                  temperature: chatConfig.temperature,
                  stream: false,
                  tools: availableTools,
                  tool_choice: 'auto',
                })

                console.log(`📋 [${requestId}] Received tool response:`, {
                  hasToolCalls: !!response.choices[0]?.message?.tool_calls,
                  toolCallCount: response.choices[0]?.message?.tool_calls?.length || 0
                })

                if (response.choices[0]?.message?.tool_calls) {
                  const toolCalls = response.choices[0].message.tool_calls

                  for (const toolCall of toolCalls) {
                    if ((toolCall as any).function?.name && (toolCall as any).function?.arguments) {
                      console.log(`🚀 [${requestId}] Executing tool: ${(toolCall as any).function.name} with ID: ${(toolCall as any).id}`)

                      const executionStart = Date.now()
                      try {
                        const parameters = JSON.parse((toolCall as any).function.arguments)
                        console.log(`📝 [${requestId}] Tool parameters:`, parameters)

                        const result = await toolManager.executeToolCall(
                          (toolCall as any).function.name,
                          parameters
                        )

                        const executionTime = Date.now() - executionStart
                        console.log(`✅ [${requestId}] Tool ${(toolCall as any).function.name} executed successfully in ${executionTime}ms`)
                        console.log(`📊 [${requestId}] Tool result summary:`, {
                          success: result.success,
                          contentLength: result.content?.length || 0,
                          hasMetadata: !!result.metadata
                        })

                        toolResults.push({
                          tool_call_id: (toolCall as any).id,
                          result: result
                        })

                        // Generate a concise response from tool results
                        console.log(`⚙️ [${requestId}] Generating concise response from tool result...`)
                        const conciseResponse = generateConciseResponse(result)
                        console.log(`💬 [${requestId}] Generated response: "${conciseResponse}"`)

                        const responseChunk = `data: ${JSON.stringify({
                          content: conciseResponse,
                          type: 'tool_result',
                          toolName: (toolCall as any).function.name
                        })}\n\n`

                        console.log(`📤 [${requestId}] Sending response to client...`)
                        controller.enqueue(encoder.encode(responseChunk))

                      } catch (toolError) {
                        const executionTime = Date.now() - executionStart
                        console.error(`❌ [${requestId}] Tool execution error for ${(toolCall as any).function.name} after ${executionTime}ms:`, toolError)

                        const errorResponse = `I encountered an issue while retrieving that information. Let me help you differently.`

                        const errorChunk = `data: ${JSON.stringify({
                          content: errorResponse,
                          type: 'tool_error',
                          error: toolError instanceof Error ? toolError.message : 'Unknown error'
                        })}\n\n`

                        controller.enqueue(encoder.encode(errorChunk))
                      }
                    } else {
                      console.warn(`⚠️ [${requestId}] Tool call missing function name or arguments:`, toolCall)
                    }
                  }
                } else {
                  console.warn(`⚠️ [${requestId}] No tool calls found in response`)
                }
              }

              // Send completion signal
              if (chunk.choices[0]?.finish_reason) {
                const metadata = {
                  model: chatConfig.model,
                  responseTime: Date.now() - startTime,
                  requestId,
                  toolResults: toolResults.length,
                  usedTools: isProcessingTools
                }

                const finalChunk = `data: ${JSON.stringify({
                  isComplete: true,
                  metadata,
                  type: 'completion'
                })}\n\n`
                controller.enqueue(encoder.encode(finalChunk))

                // Log usage statistics
                console.log(`📊 Request ${requestId} completed in ${Date.now() - startTime}ms`)
                if (toolResults.length > 0) {
                  console.log(`🔧 Executed ${toolResults.length} tool(s) successfully`)
                }
              }
            }

            // Send final DONE marker
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()

          } catch (error) {
            console.error(`❌ Stream error for request ${requestId}:`, error)

            const errorChunk = `data: ${JSON.stringify({
              error: error instanceof Error ? error.message : 'Unknown error',
              errorType: parseGroqError(error)?.type || 'UNKNOWN',
              isComplete: true,
              type: 'error'
            })}\n\n`

            controller.enqueue(encoder.encode(errorChunk))
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            controller.close()
          }
        },

        cancel(_reason) {
          console.log(`🚫 Request ${requestId} was cancelled`)
          // Note: controller is not available here, but that's fine for this implementation
        }
      })

    } catch (error) {
      console.error(`❌ Failed to start request ${requestId}:`, error)
      throw createGroqError(
        GroqErrorType.NETWORK_ERROR,
        error instanceof Error ? error : new Error('Unknown error'),
        { requestId, timestamp: new Date() }
      )
    }
  }

  /**
   * Send a non-streaming chat completion request
   */
  async sendNonStreamingChatRequest(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now()
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    try {
      // Validate request
      validateChatRequest(request)

      // Prepare messages for the API
      const messages = prepareMessages(request)

      // Determine if tools should be available
      const availableTools = toolManager.getAvailableTools()
      const shouldUseTools = toolManager.shouldUseTool(request.message)

      const response = await this.client.chat.completions.create({
        model: this.chatConfig.model,
        messages,
        max_tokens: this.chatConfig.maxTokens,
        temperature: this.chatConfig.temperature,
        stream: false,
        tools: shouldUseTools.shouldUse ? availableTools : undefined,
        tool_choice: shouldUseTools.shouldUse ? 'auto' : undefined,
      })

      const choice = response.choices[0]
      if (!choice) {
        throw createGroqError(
          GroqErrorType.SERVICE_UNAVAILABLE,
          new Error('No response from API'),
          { requestId }
        )
      }

      // Handle tool calls in non-streaming mode
      if (choice.message?.tool_calls) {
        console.log(`🔧 Processing ${choice.message.tool_calls.length} tool calls in non-streaming mode`)

        const toolResults: any[] = []

        for (const toolCall of choice.message.tool_calls) {
          if ((toolCall as any).function?.name && (toolCall as any).function?.arguments) {
            try {
              const parameters = JSON.parse((toolCall as any).function.arguments)
              const result = await toolManager.executeToolCall(
                (toolCall as any).function.name,
                parameters
              )

              toolResults.push({
                tool_call_id: (toolCall as any).id,
                result
              })
            } catch (toolError) {
              console.error(`❌ Tool execution error:`, toolError)
              toolResults.push({
                tool_call_id: (toolCall as any).id,
                error: toolError instanceof Error ? toolError.message : 'Unknown error'
              })
            }
          }
        }

        // Create a new message with tool results
        const messagesWithResults = [
          ...messages,
          {
            role: 'assistant' as const,
            content: choice.message.content || undefined,
            tool_calls: choice.message.tool_calls
          },
          ...toolResults.map(result => ({
            role: 'tool' as const,
            content: JSON.stringify(result.result || result.error),
            tool_call_id: result.tool_call_id
          }))
        ]

        // Get final response
        const finalResponse = await this.client.chat.completions.create({
          model: this.chatConfig.model,
          messages: messagesWithResults,
          max_tokens: this.chatConfig.maxTokens,
          temperature: this.chatConfig.temperature,
          stream: false,
        })

        const finalChoice = finalResponse.choices[0]
        if (!finalChoice?.message?.content) {
          throw createGroqError(
            GroqErrorType.SERVICE_UNAVAILABLE,
            new Error('No final response after tool execution'),
            { requestId }
          )
        }

        return {
          content: finalChoice.message.content,
          isComplete: true,
          metadata: {
            model: this.chatConfig.model,
            tokensUsed: 0, // Would need to be calculated from API response
            responseTime: Date.now() - startTime,
            requestId
          }
        }
      }

      return {
        content: choice.message?.content || '',
        isComplete: true,
        metadata: {
          model: this.chatConfig.model,
          tokensUsed: 0, // Would need to be calculated from API response
          responseTime: Date.now() - startTime,
          requestId
        }
      }

    } catch (error) {
      const parsedError = parseGroqError(error)
      logGroqError(parsedError, { requestId, timestamp: new Date() })

      if (parsedError?.type) {
        throw createGroqError(
          parsedError.type,
          error instanceof Error ? error : new Error('Unknown error'),
          { requestId, timestamp: new Date() }
        )
      }

      throw error
    }
  }

  
  /**
   * Get current configuration
   */
  getConfiguration(): GroqConfig {
    return { ...this.config }
  }

  /**
   * Update configuration
   */
  updateConfiguration(newConfig: Partial<ChatConfig>): void {
    this.chatConfig = { ...this.chatConfig, ...newConfig }
  }
}

// Client singleton with enhanced error handling
let groqClientInstance: GroqClient | null = null

/**
 * Get or create a Groq client instance with enhanced error handling
 */
export function getGroqClient(config?: Partial<ChatConfig>): GroqClient {
  if (!groqClientInstance || config) {
    try {
      groqClientInstance = new GroqClient(config)
    } catch (error) {
      console.error('Failed to create Groq client:', error)
      throw error
    }
  }
  return groqClientInstance
}

/**
 * Reset the singleton instance (useful for testing or config changes)
 */
export function resetGroqClient(): void {
  groqClientInstance = null
}

// Export convenience functions with enhanced error handling
export async function sendChatMessage(request: ChatRequest): Promise<ReadableStream<Uint8Array>> {
  try {
    const client = getGroqClient()
    return await client.sendChatRequest(request)
  } catch (error) {
    console.error('Failed to send chat message:', error)
    throw error
  }
}

export async function sendNonStreamingMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const client = getGroqClient()
    return await client.sendNonStreamingChatRequest(request)
  } catch (error) {
    console.error('Failed to send non-streaming message:', error)
    throw error
  }
}

/**
 * Test connection to Groq API
 */
export async function testGroqConnection(): Promise<{ connected: boolean; error?: GroqApiError; models?: string[] }> {
  try {
    const client = getGroqClient()
    const models = await getGroqModels()
    return { connected: true, models: models.models }
  } catch (error) {
    const groqError = parseGroqError(error)
    return {
      connected: false,
      error: groqError || {
        type: 'UNKNOWN',
        message: error instanceof Error ? error.message : 'Unknown error',
        isRetryable: false,
        suggestedAction: 'Check your configuration and try again.'
      }
    }
  }
}

/**
 * Get available models from Groq API
 */
export async function getGroqModels(): Promise<{ models: string[]; error?: GroqApiError }> {
  try {
    const config = getGroqConfig()
    const client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    })

    const models = await client.models.list()
    return {
      models: models.data
        .filter(model => model.id.includes('llama') || model.id.includes('mixtral'))
        .map(model => model.id)
    }
  } catch (error) {
    const groqError = parseGroqError(error)
    return {
      models: [],
      error: groqError || {
        type: 'UNKNOWN',
        message: error instanceof Error ? error.message : 'Unknown error',
        isRetryable: false,
        suggestedAction: 'Check your API key and connection.'
      }
    }
  }
}

/**
 * Get configuration summary (without sensitive data)
 */
export function getGroqConfigurationSummary(): Omit<GroqConfig, 'apiKey'> {
  const config = getGroqConfig()
  const { apiKey, ...safeConfig } = config
  return safeConfig
}