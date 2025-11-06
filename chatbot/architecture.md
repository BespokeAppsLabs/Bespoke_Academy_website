# Chatbot Architecture Documentation

## System Overview

The Bespoke Academy chatbot is built on a modern, scalable architecture using Next.js 15 with the App Router pattern. The system leverages server-side API routes for AI integration and client-side React components for the user interface.

## Architecture Diagram

```mermaid
graph TB
    subgraph "Client Side"
        A[ChatWidget] --> B[ChatInterface]
        B --> C[MessageBubble]
        B --> D[ChatInput]
        B --> E[TypingIndicator]
        F[LocalStorage] --> G[ConversationHistory]
    end

    subgraph "Server Side"
        H[/api/chat] --> I[Groq API Client]
        I --> J[Groq API]
        H --> K[Message Processing]
        H --> L[Context Management]
    end

    A --> H
    B --> H
    G --> H

    subgraph "External Services"
        J --> M[LLaMA Models]
        N[Bespoke Curriculum Data] --> H
    end
```

## Component Architecture

### Frontend Components

#### ChatWidget (`chat-widget.tsx`)
- **Purpose**: Floating chat bubble trigger
- **State**: Open/closed, unread notifications
- **Dependencies**: Framer Motion for animations
- **Props**: Optional configuration for position and styling

#### ChatInterface (`chat-interface.tsx`)
- **Purpose**: Main chat window container
- **State**: Messages, input value, connection status
- **Dependencies**: Message components, chat input
- **Features**: Message history, scrolling, auto-focus

#### MessageBubble (`message-bubble.tsx`)
- **Purpose**: Individual message display
- **Props**: Content, sender (user/bot), timestamp, metadata
- **Features**: Copy functionality, read receipts
- **Styling**: Different styles for user vs bot messages

#### ChatInput (`chat-input.tsx`)
- **Purpose**: Message input with send functionality
- **Features**: Auto-focus, submit on enter, character limit
- **Validation**: Input sanitization, empty message prevention
- **Accessibility**: Keyboard navigation, screen reader support

#### TypingIndicator (`typing-indicator.tsx`)
- **Purpose**: Animated "bot is typing" indicator
- **Animation**: Framer Motion bounce/pulse effects
- **Timing**: Synchronized with API response streaming

### Backend Architecture

#### API Route (`/api/chat`)
```typescript
export async function POST(request: Request) {
  // 1. Parse and validate request
  // 2. Authenticate API key
  // 3. Process message with context
  // 4. Stream response from Groq
  // 5. Handle errors and timeouts
}
```

#### Groq Client Integration
```typescript
import OpenAI from 'openai'

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
})
```

## Data Flow

### Message Processing Flow
1. **User Input** → ChatInput component
2. **Client Validation** → Message formatting
3. **API Request** → POST /api/chat with message and history
4. **Server Processing** → Context enhancement and prompt building
5. **AI Integration** → Groq API call with streaming
6. **Response Streaming** → Real-time text chunks to client
7. **UI Update** → MessageBubble updates with streaming content
8. **Storage** → LocalStorage for conversation persistence

### Context Management
- **Session Context**: Current page, user role, conversation history
- **Curriculum Context**: Bespoke Academy course information
- **Technical Context**: Error messages, troubleshooting information
- **Conversation Context**: Previous messages, user preferences

## State Management

### Client-side State
```typescript
interface ChatState {
  messages: Message[]
  isConnected: boolean
  isTyping: boolean
  unreadCount: number
  context: ChatContext
}
```

### Message Structure
```typescript
interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
  metadata?: {
    context?: string
    confidence?: number
    sources?: string[]
  }
}
```

### Persistence Strategy
- **LocalStorage**: Conversation history and user preferences
- **Session Storage**: Temporary state during session
- **Memory**: Current component state for real-time updates

## Performance Optimizations

### Frontend Optimizations
- **Lazy Loading**: Chat components load on-demand
- **Virtual Scrolling**: For long conversation histories
- **Debounced Input**: Prevent excessive API calls
- **Optimized Animations**: Hardware-accelerated CSS transforms

### Backend Optimizations
- **Streaming Responses**: Immediate feedback for users
- **Connection Pooling**: Reuse HTTP connections to Groq
- **Response Caching**: Cache common responses
- **Rate Limiting**: Prevent abuse and manage costs

### Network Optimizations
- **Compression**: Gzip for API responses
- **CDN**: Static asset delivery
- **HTTP/2**: Multiplexed requests
- **Optimal Headers**: Caching and compression settings

## Security Architecture

### Authentication & Authorization
- **API Key Validation**: Server-side Groq API key verification
- **Request Signing**: Optional request authentication
- **Rate Limiting**: Per-user request throttling
- **Input Validation**: Comprehensive input sanitization

### Data Protection
- **No PII Storage**: Personal information not persisted
- **Encrypted Transmission**: HTTPS for all communications
- **Input Sanitization**: XSS prevention
- **Content Security Policy**: Additional XSS protection

### Privacy Considerations
- **Local Storage Only**: Conversations stored client-side
- **Optional Analytics**: User can opt out of usage tracking
- **Data Retention**: Automatic cleanup of old conversations
- **Transparency**: Clear data usage policies

## Scalability Considerations

### Horizontal Scaling
- **Stateless API**: Easy horizontal scaling of chat endpoints
- **CDN Distribution**: Global edge caching for static assets
- **Load Balancing**: Multiple API server instances
- **Database Sharding**: If persistent storage needed

### Vertical Scaling
- **Memory Management**: Efficient message history handling
- **CPU Optimization**: Streaming response processing
- **Connection Management**: Proper resource cleanup

## Monitoring & Observability

### Performance Metrics
- **Response Times**: API and AI model response times
- **Error Rates**: Failed requests and API errors
- **User Engagement**: Chat usage patterns and satisfaction
- **System Health**: Server performance and resource usage

### Logging Strategy
- **Structured Logging**: JSON format for easy analysis
- **Error Tracking**: Comprehensive error logging
- **User Actions**: Anonymous usage analytics
- **System Events**: API calls, errors, performance metrics

## Deployment Architecture

### Development Environment
- **Local Development**: Next.js dev server with hot reload
- **Mock API**: Development testing without Groq API
- **Environment Variables**: Local configuration management

### Production Environment
- **Vercel Deployment**: Next.js optimized hosting
- **Edge Functions**: Global API endpoint distribution
- **Environment Management**: Secure production configuration
- **Monitoring**: Application performance monitoring

## Technology Stack Details

### Core Technologies
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library

### AI Integration
- **Groq API**: High-performance LLM inference
- **OpenAI Client**: Compatible API client library
- **Streaming**: Real-time response delivery
- **LLaMA Models**: Open-source language models

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality control
- **TypeScript**: Static type checking

---

**Last Updated**: 2025-10-26
**Architecture Version**: 1.0.0