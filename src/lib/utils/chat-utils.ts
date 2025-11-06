/**
 * Utility functions for chat processing
 */

import type { ChatMessage, ChatRequest } from '../chat';
import { BASE_PROMPT, CONTEXT_PROMPTS } from '../prompts';

/**
 * Validate chat request parameters
 */
export function validateChatRequest(request: ChatRequest): void {
  if (!request.message || typeof request.message !== 'string') {
    throw new Error('Message is required and must be a string');
  }

  if (request.message.length > 2000) {
    throw new Error('Message is too long (max 2000 characters)');
  }

  if (request.conversationHistory && !Array.isArray(request.conversationHistory)) {
    throw new Error('Conversation history must be an array');
  }

  if (request.context && typeof request.context !== 'object') {
    throw new Error('Context must be an object');
  }
}

/**
 * Prepare messages for the API
 */
export function prepareMessages(request: ChatRequest): any[] {
  const messages: any[] = [];

  // Add system message
  const systemMessage = buildDynamicSystemMessage(request);
  messages.push({ role: 'system', content: systemMessage });

  // Add conversation history
  const optimizedHistory = optimizeConversationHistory(request.conversationHistory);
  for (const msg of optimizedHistory) {
    if (msg.sender === 'user') {
      messages.push({ role: 'user', content: msg.content });
    } else if (msg.sender === 'assistant') {
      messages.push({ role: 'assistant', content: msg.content });
    }
  }

  // Add current message
  messages.push({ role: 'user', content: request.message });

  return messages;
}

/**
 * Build dynamic system message based on context and conversation history
 */
export function buildDynamicSystemMessage(request: ChatRequest): string {
  // Add dynamic elements based on conversation history
  let dynamicAdditions = '';
  const messageCount = request.conversationHistory.length;

  if (messageCount > 5) {
    dynamicAdditions += `\n\nThis has been an extended conversation (${messageCount + 1} messages total). Keep responses concise but thorough.`;
  }

  if (messageCount > 0) {
    const lastUserMessage = request.conversationHistory
      .filter(m => m.sender === 'user')
      .pop()?.content.toLowerCase() || '';

    if (lastUserMessage.includes('frustrated') || lastUserMessage.includes('confused')) {
      dynamicAdditions += `\n\nThe user seems to be experiencing some difficulty. Be extra patient and provide clearer, step-by-step explanations.`;
    }
  }

  // Add variety to prevent repetitive responses
  const responseStyleHints = [
    '\n\nProvide a response that is engaging and educational.',
    '\n\nBe conversational while maintaining professionalism.',
    '\n\nOffer practical, actionable advice where possible.',
    '\n\nShare relevant examples from our curriculum when appropriate.'
  ];
  const randomHint = responseStyleHints[Math.floor(Math.random() * responseStyleHints.length)];

  return BASE_PROMPT + (CONTEXT_PROMPTS[request.context.type as keyof typeof CONTEXT_PROMPTS] || '') + dynamicAdditions + randomHint;
}

/**
 * Generate a concise response from tool results
 */
export function generateConciseResponse(toolResult: any): string {
  const { content, metadata } = toolResult

  console.log('🔧 generateConciseResponse called with:', {
    contentLength: content?.length || 0,
    hasMetadata: !!metadata,
    contextType: metadata?.contextType,
    contentPreview: content?.substring(0, 100) + '...'
  })

  if (!content) {
    console.error('❌ No content provided to generateConciseResponse')
    return 'I apologize, but I could not retrieve the information you requested. Please try again or contact support for assistance.'
  }

  // Multiple extraction strategies for robustness
  let overview = ''

  // Strategy 1: Try to find Overview section
  const overviewMatch = content.match(/## Overview\n\n([\s\S]*?)(?=\n\n|\n#|$)/)
  if (overviewMatch) {
    overview = overviewMatch[1].trim()
    console.log('✅ Strategy 1 - Found Overview section:', overview.substring(0, 100) + '...')
  }

  // Strategy 2: Try Key Information section
  if (!overview) {
    const keyInfoMatch = content.match(/## Key Information\n\n([\s\S]*?)(?=\n\n|\n#|$)/)
    if (keyInfoMatch) {
      overview = keyInfoMatch[1].trim()
      console.log('✅ Strategy 2 - Found Key Information section:', overview.substring(0, 100) + '...')
    }
  }

  // Strategy 3: Try first paragraph after any header
  if (!overview) {
    const firstParagraphMatch = content.match(/#[^\n]*\n\n([^\n]+)/)
    if (firstParagraphMatch) {
      overview = firstParagraphMatch[1].trim()
      console.log('✅ Strategy 3 - Found first paragraph:', overview.substring(0, 100) + '...')
    }
  }

  // Strategy 4: Use first meaningful sentence
  if (!overview) {
    const sentences = content.split(/[.!?]+/)
    for (const sentence of sentences) {
      const cleanSentence = sentence.trim()
      if (cleanSentence.length > 20 && !cleanSentence.startsWith('#')) {
        overview = cleanSentence + '.'
        console.log('✅ Strategy 4 - Found first meaningful sentence:', overview)
        break
      }
    }
  }

  // Strategy 5: Fallback to first non-empty line
  if (!overview) {
    const lines = content.split('\n').filter((line: string) => line.trim() && !line.trim().startsWith('#'))
    if (lines.length > 0) {
      overview = lines[0].trim()
      console.log('✅ Strategy 5 - Using first non-header line:', overview)
    }
  }

  // Final fallback
  if (!overview) {
    console.error('❌ All extraction strategies failed')
    return 'I apologize, but I had trouble processing the information. Please try rephrasing your question or contact support for help.'
  }

  // Make overview more concise - get first meaningful sentence
  let conciseOverview = overview
  const sentences = overview.split(/[.!?]+/)
  if (sentences.length > 0) {
    const firstSentence = sentences[0].trim() + '.'
    if (firstSentence.length > 10) {
      conciseOverview = firstSentence.length < 200 ? firstSentence : firstSentence.substring(0, 197) + '...'
    }
  }

  console.log('📝 Concise overview generated:', conciseOverview)

  // Build response based on context type with specific information
  let response = conciseOverview

  if (metadata?.contextType) {
    switch (metadata.contextType) {
      case 'pricing':
        const priceMatch = content.match(/R[\d\s,]+|R[\d,]+/g)
        if (priceMatch && priceMatch.length > 0) {
          response += ` Tuition starts at ${priceMatch[0]}.`
          console.log('💰 Added pricing info:', priceMatch[0])
        }
        break

      case 'schedule':
        const scheduleMatch = content.match(/Friday|weekly|week|sessions|2\+ hours/gi)
        if (scheduleMatch) {
          response += ` Classes meet ${scheduleMatch[0]}.`
          console.log('📅 Added schedule info:', scheduleMatch[0])
        }
        break

      case 'curriculum':
        const phaseMatch = content.match(/(\d+)\s*weeks?|40\s*weeks?/gi)
        if (phaseMatch) {
          response += ` ${phaseMatch[0]} program.`
          console.log('📚 Added curriculum info:', phaseMatch[0])
        }
        break

      case 'requirements':
        const laptopMatch = content.match(/laptop|computer|bring|need|require/gi)
        if (laptopMatch) {
          response += ` Students should bring a ${laptopMatch[0]}.`
          console.log('💻 Added requirements info:', laptopMatch[0])
        }
        break

      case 'enrollment':
        const enrollMatch = content.match(/enroll|register|apply|start|join/gi)
        if (enrollMatch) {
          response += ' Ready to start your AI journey?'
          console.log('🎓 Added enrollment CTA')
        }
        break
    }
  }

  // Final safety check - ensure we never return just a period or empty content
  if (!response || response.trim() === '.' || response.trim().length < 10) {
    console.warn('⚠️ Response too short or empty, providing safe fallback')
    response = 'I found information about that topic. Could you please clarify what specific details you would like to know?'
  }

  console.log('✅ Final response generated:', response)
  return response
}

/**
 * Optimize conversation history to stay within token limits
 */
export function optimizeConversationHistory(history: ChatMessage[], maxHistoryLength: number = 10, maxTokens: number = 4000): ChatMessage[] {
  // Filter out very old messages if history is too long
  let optimized = history;

  if (history.length > maxHistoryLength) {
    // Keep system message (if present) and recent messages
    const systemMessage = history.find(m =>
      m.sender === 'assistant' && m.content.includes('Bespoke Academy')
    );
    const recentMessages = history.slice(-(maxHistoryLength - 1));

    optimized = systemMessage
      ? [systemMessage, ...recentMessages]
      : recentMessages;
  }

  // Simple token estimation (rough approximation: 1 token ≈ 4 characters)
  const estimatedTokens = optimized.reduce((total, msg) =>
    total + Math.ceil(msg.content.length / 4), 0
  );

  if (estimatedTokens > maxTokens) {
    // Further reduce if still too long
    const targetMessages = Math.floor((maxTokens / estimatedTokens) * optimized.length);
    return optimized.slice(-Math.max(targetMessages, 3));
  }

  return optimized;
}