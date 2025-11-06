# Chatbot Troubleshooting Guide

## Common Issues and Solutions

This guide covers common issues that may arise during chatbot implementation and operation, along with their solutions.

## Setup and Installation Issues

### 1. Environment Variables Not Working

**Problem**: Chatbot API calls failing due to missing or incorrect environment variables.

**Symptoms**:
- API returns 401 Unauthorized errors
- Messages about missing API keys
- Development server crashes on startup

**Solutions**:
```bash
# 1. Verify .env.local file exists and contains required variables
cat .env.local

# Should contain:
GROQ_API_KEY=gsk_your_actual_api_key_here
CHATBOT_MODEL=llama3-8b-8192
GROQ_BASE_URL=https://api.groq.com/openai/v1

# 2. Restart development server after adding environment variables
npm run dev

# 3. Verify variables are accessible in the app
# Add this check to your API route:
console.log('API Key exists:', !!process.env.GROQ_API_KEY)
console.log('Model:', process.env.CHATBOT_MODEL)
```

### 2. Package Installation Issues

**Problem**: Dependencies not installing correctly or version conflicts.

**Symptoms**:
- Module not found errors
- Type errors with OpenAI client
- Build process failures

**Solutions**:
```bash
# 1. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 2. For yarn users:
rm -rf node_modules yarn.lock
yarn install

# 3. Verify correct versions
npm list openai
npm list framer-motion

# Should show:
# openai@4.x.x
# framer-motion@10.x.x or higher
```

### 3. TypeScript Configuration Issues

**Problem**: Type errors with OpenAI client or chat components.

**Symptoms**:
- Type errors in IDE
- Build failures due to type mismatches
- Intellisense not working

**Solutions**:
```typescript
// 1. Ensure proper types are imported
import OpenAI, { OpenAIStream } from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources'

// 2. Add to tsconfig.json if needed
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force"
  }
}

// 3. Restart TypeScript server in IDE
# VS Code: Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

## API Integration Issues

### 4. Groq API Connection Failures

**Problem**: Unable to connect to Groq API or receive responses.

**Symptoms**:
- Network connection errors
- Timeout errors
- 500 Internal Server Error from API

**Solutions**:
```typescript
// 1. Test API connection directly
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3-8b-8192",
    "messages": [{"role": "user", "content": "Hello"}]
  }'

// 2. Add error handling and retry logic
async function testGroqConnection() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    console.log('Groq API connection successful')
    return true
  } catch (error) {
    console.error('Groq API connection failed:', error)
    return false
  }
}
```

### 5. Streaming Response Issues

**Problem**: Streaming responses not working correctly or timing out.

**Symptoms**:
- Responses appear all at once instead of streaming
- Connection drops mid-response
- Incomplete message content

**Solutions**:
```typescript
// 1. Ensure proper streaming setup
export async function POST(request: Request) {
  const stream = await groqClient.chatCompletion({
    model: 'llama3-8b-8192',
    messages,
    stream: true, // Essential for streaming
  })

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(`data: ${JSON.stringify({ content })}\n\n`)
            }
          }
          controller.enqueue('data: [DONE]\n\n')
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      }
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    }
  )
}

// 2. Add timeout handling
const timeoutId = setTimeout(() => {
  controller.close()
}, 30000) // 30 second timeout
```

### 6. Model-Specific Issues

**Problem**: Certain models not working or producing poor responses.

**Symptoms**:
- Model not found errors
- Poor response quality
- Slow response times

**Solutions**:
```typescript
// 1. Test different models
const models = [
  'llama3-8b-8192',      // Fast, good for simple queries
  'llama3-70b-8192',     // More capable, slower
  'gemma2-9b-it'         // Alternative option
]

// 2. Implement model selection based on query complexity
function selectModel(query: string): string {
  if (query.length > 200 || query.includes('explain') || query.includes('detailed')) {
    return 'llama3-70b-8192'
  }
  return 'llama3-8b-8192'
}

// 3. Add model fallback
async function getModelResponse(model: string, messages: any[]) {
  try {
    return await groqClient.chatCompletion({ model, messages, stream: true })
  } catch (error) {
    if (model !== 'llama3-8b-8192') {
      console.warn(`${model} failed, trying llama3-8b-8192`)
      return await groqClient.chatCompletion({
        model: 'llama3-8b-8192',
        messages,
        stream: true
      })
    }
    throw error
  }
}
```

## Frontend Issues

### 7. Chat Widget Not Appearing

**Problem**: Floating chat widget not visible on pages.

**Symptoms**:
- No chat bubble visible
- Console errors about missing components
- Component not rendering

**Solutions**:
```typescript
// 1. Check component import and usage
// In layout.tsx:
import { ChatWidget } from '@/components/chat/chat-widget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget /> {/* Ensure this is present */}
      </body>
    </html>
  )
}

// 2. Check CSS z-index issues
// Chat widget should have high z-index
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

// 3. Verify Tailwind classes are applied
<div className="fixed bottom-4 right-4 z-50">
  <ChatWidget />
</div>
```

### 8. Message Display Issues

**Problem**: Messages not displaying correctly or styling issues.

**Symptoms**:
- Messages overlapping
- Incorrect colors or formatting
- Scroll not working

**Solutions**:
```css
/* 1. Add proper message container styling */
.chat-messages {
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 2. Ensure proper message bubble styling */
.message-bubble {
  max-width: 80%;
  word-wrap: break-word;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
}

.message-user {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  align-self: flex-end;
}

.message-assistant {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  align-self: flex-start;
}

/* 3. Add smooth scrolling */
.chat-messages {
  scroll-behavior: smooth;
}
```

### 9. Animation and Transition Issues

**Problem**: Chat animations not working or causing performance issues.

**Symptoms**:
- Jerky animations
- High CPU usage
- Animations not triggering

**Solutions**:
```typescript
// 1. Use Framer Motion for smooth animations
import { motion, AnimatePresence } from 'framer-motion'

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// 2. Apply animations correctly
<AnimatePresence>
  {messages.map((message) => (
    <motion.div
      key={message.id}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <MessageBubble message={message} />
    </motion.div>
  ))}
</AnimatePresence>

// 3. Optimize performance with layoutId
<motion.div layoutId="chat-container">
  {/* Chat content */}
</motion.div>
```

## Performance Issues

### 10. Slow Response Times

**Problem**: Chatbot taking too long to respond.

**Symptoms**:
- Long delays before response appears
- Poor user experience
- High API latency

**Solutions**:
```typescript
// 1. Optimize conversation history
function optimizeHistory(history: Message[]): Message[] {
  // Keep last 10 messages + system message
  const systemMessage = history.find(m => m.role === 'system')
  const recentMessages = history
    .filter(m => m.role !== 'system')
    .slice(-10)

  return systemMessage ? [systemMessage, ...recentMessages] : recentMessages
}

// 2. Add loading indicators
function useLoadingState() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Thinking...')

  const startLoading = (message = 'Thinking...') => {
    setIsLoading(true)
    setLoadingMessage(message)
  }

  const stopLoading = () => {
    setIsLoading(false)
  }

  return { isLoading, loadingMessage, startLoading, stopLoading }
}

// 3. Implement response caching
const responseCache = new Map<string, string>()

function getCachedResponse(prompt: string): string | null {
  return responseCache.get(prompt.toLowerCase()) || null
}
```

### 11. Memory Leaks

**Problem**: Chat component causing memory leaks over time.

**Symptoms**:
- Browser memory usage increasing
- Page becoming slow after extended use
- Component not cleaning up properly

**Solutions**:
```typescript
// 1. Proper cleanup in useEffect
useEffect(() => {
  const handleScroll = () => {
    // Handle scroll events
  }

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])

// 2. Cleanup streaming connections
useEffect(() => {
  let controller: ReadableStreamDefaultController | null = null

  const processStream = async (stream: ReadableStream) => {
    const reader = stream.getReader()

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        // Process chunk
      }
    } finally {
      reader.releaseLock()
      controller?.close()
    }
  }

  return () => {
    controller?.close()
  }
}, [])

// 3. Limit message history size
const MAX_HISTORY_SIZE = 50

function addMessage(history: Message[], newMessage: Message): Message[] {
  const updated = [...history, newMessage]
  return updated.length > MAX_HISTORY_SIZE
    ? updated.slice(-MAX_HISTORY_SIZE)
    : updated
}
```

## Browser Compatibility Issues

### 12. Streaming Not Working in Certain Browsers

**Problem**: Streaming responses not supported in some browsers.

**Symptoms**:
- No response in Safari or older browsers
- Fallback to non-streaming mode needed
- Compatibility issues

**Solutions**:
```typescript
// 1. Detect streaming support
function supportsStreaming(): boolean {
  return typeof ReadableStream !== 'undefined' &&
         typeof TextDecoder !== 'undefined'
}

// 2. Implement fallback for non-streaming browsers
async function sendMessage(message: string, history: Message[]) {
  if (supportsStreaming()) {
    return sendStreamingMessage(message, history)
  } else {
    return sendNonStreamingMessage(message, history)
  }
}

// 3. Non-streaming fallback
async function sendNonStreamingMessage(message: string, history: Message[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      conversationHistory: history,
      stream: false // Tell API not to stream
    })
  })

  const data = await response.json()
  return data.content
}
```

## Debugging Tools and Techniques

### Console Debugging

```javascript
// 1. Add debug logging
console.log('Chat State:', {
  messageCount: messages.length,
  isConnected,
  isTyping,
  lastMessage: messages[messages.length - 1]?.content?.substring(0, 50)
})

// 2. Monitor API calls
console.log('API Request:', {
  messageLength: message.length,
  historySize: conversationHistory.length,
  model: process.env.CHATBOT_MODEL
})

// 3. Track performance
console.time('chat-response')
// ... chat logic
console.timeEnd('chat-response')
```

### Network Debugging

```bash
# 1. Test API endpoints directly
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","conversationHistory":[]}'

# 2. Check response headers
curl -I http://localhost:3000/api/chat

# 3. Monitor network requests in browser dev tools
# Network tab -> Filter by /api/chat -> Check request/response details
```

## Getting Help

### 1. Check Logs First
```bash
# Check Next.js development server logs
npm run dev

# Check Vercel deployment logs
vercel logs

# Check browser console errors
# F12 -> Console tab
```

### 2. Common Error Messages
- **"API key not found"**: Check environment variables
- **"Model not found"**: Verify model name spelling
- **"Stream not supported"**: Browser compatibility issue
- **"Component not found"**: Import path error

### 3. Support Resources
- **Groq API Documentation**: https://console.groq.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Framer Motion Documentation**: https://www.framer.com/motion/

---

**Last Updated**: 2025-10-26
**Troubleshooting Version**: 1.0.0