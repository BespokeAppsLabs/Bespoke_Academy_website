# Bespoke Academy Chatbot Implementation

## Overview
A multi-purpose professional educational assistant chatbot integrated into the Bespoke Academy website, providing students with AI-powered support for coursework, course guidance, and technical assistance.

## Features
- **Multi-purpose Functionality**: Student assistance, course advising, and technical support
- **Floating Widget**: Always accessible chat bubble on all pages
- **Contact Section Integration**: Full chat interface embedded in contact section
- **Professional AI Personality**: Educational assistant with Bespoke Academy knowledge
- **Real-time Streaming**: Instant responses using Groq API
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Consistent with website theme system

## Technical Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Next.js API routes with streaming support
- **AI Integration**: Groq API with LLaMA models
- **State Management**: React hooks with localStorage persistence
- **Animations**: Framer Motion for smooth interactions

## Quick Start

### Prerequisites
- Groq API key (https://console.groq.com)
- Node.js 18+ and npm/yarn

### Installation
1. Install dependencies:
```bash
npm install openai framer-motion
# or
yarn add openai framer-motion
```

2. Set up environment variables:
```bash
GROQ_API_KEY=your_groq_api_key_here
CHATBOT_MODEL=llama3-8b-8192
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## File Structure
```
chatbot/
├── README.md                    # This file
├── architecture.md              # Technical architecture
├── user-flow.md                 # User interaction flows
├── api-integration.md           # Groq API integration details
├── conversation-design.md       # Chatbot personality and guidelines
└── troubleshooting.md           # Common issues and solutions

src/
├── components/
│   ├── chat/
│   │   ├── chat-widget.tsx      # Floating chat bubble
│   │   ├── chat-interface.tsx   # Full chat window
│   │   ├── message-bubble.tsx   # Individual message component
│   │   ├── chat-input.tsx       # Input field with send button
│   │   ├── chat-header.tsx      # Chat window header
│   │   └── typing-indicator.tsx # Typing animation
│   └── ui/                      # Existing UI components
├── lib/
│   ├── chat.ts                  # Chat utilities and types
│   └── groq.ts                  # Groq API client
└── app/
    └── api/
        └── chat/
            └── route.ts         # Chat API endpoint
```

## Usage Examples

### Basic Chat Integration
```tsx
import { ChatWidget } from '@/components/chat/chat-widget'

// Add to layout for site-wide floating widget
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
```

### Contact Section Integration
```tsx
import { ChatInterface } from '@/components/chat/chat-interface'

// Embed in contact section
export function ContactSection() {
  return (
    <section>
      <h2>Get Help</h2>
      <ChatInterface embedded={true} />
    </section>
  )
}
```

## API Endpoints

### POST /api/chat
Processes chat messages and returns streaming responses.

**Request:**
```json
{
  "message": "What courses do you offer?",
  "conversationHistory": [...],
  "context": "course-advising"
}
```

**Response:** Streaming text responses

## Configuration

### Chatbot Personality
- **Role**: Professional Educational Assistant
- **Tone**: Knowledgeable, helpful, encouraging
- **Expertise**: Bespoke Academy curriculum, AI/robotics education
- **Guidelines**: Follow conversation design principles

### Available Models
- `llama3-8b-8192` (recommended for speed)
- `llama3-70b-8192` (for complex queries)
- `gemma2-9b-it` (alternative option)

## Customization

### Styling
All chat components use Tailwind CSS classes and Bespoke Academy design tokens. Customize by modifying:
- Component class names
- CSS variables in `globals.css`
- Theme configuration

### Conversation Flows
Modify chatbot behavior by updating:
- System prompts in API route
- Conversation context handling
- Response filtering and validation

## Performance Considerations
- Streaming responses for immediate feedback
- Local storage for conversation persistence
- Efficient message history management
- Optimized animations with Framer Motion

## Security
- API key validation and rate limiting
- Input sanitization and validation
- Secure data transmission
- No PII storage in conversation history

## Support
For issues and questions:
1. Check [troubleshooting.md](./troubleshooting.md)
2. Review API integration documentation
3. Test with Groq API console
4. Check browser console for errors

---

**Last Updated**: 2025-10-26
**Version**: 1.0.0
**Maintainer**: Bespoke Academy Development Team