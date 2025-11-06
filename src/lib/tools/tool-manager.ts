import { chatbotContextTool } from './chatbot-context';
import { ContextResponse, ToolCallRequest, ToolCallResponse } from '@/types/context';

export class ToolManager {
  private toolUsageStats: Map<string, number> = new Map();
  private errorStats: Map<string, number> = new Map();

  async executeToolCall(toolName: string, parameters: any): Promise<any> {
    const startTime = Date.now();
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    console.log(`📊 [${executionId}] Starting tool execution: ${toolName}`);
    console.log(`📊 [${executionId}] Parameters:`, JSON.stringify(parameters, null, 2));

    try {
      let result;

      switch (toolName) {
        case 'retrieve_chatbot_context':
          result = await this.executeContextRetrieval(parameters);
          break;
        default:
          throw new Error(`Unknown tool: ${toolName}`);
      }

      // Track successful usage
      this.incrementToolUsage(toolName);

      const executionTime = Date.now() - startTime;
      console.log(`✅ [${executionId}] Tool ${toolName} executed successfully in ${executionTime}ms`);
      console.log(`📊 [${executionId}] Result preview:`, {
        success: result.success,
        contentLength: result.content ? result.content.length : 0,
        hasMetadata: !!result.metadata
      });

      // Log performance metrics
      if (executionTime > 100) {
        console.warn(`⚠️ [${executionId}] Slow tool execution detected: ${executionTime}ms (>100ms)`);
      }

      return result;

    } catch (error) {
      // Track error
      this.incrementErrorCount(toolName);

      const executionTime = Date.now() - startTime;
      console.error(`❌ [${executionId}] Tool ${toolName} failed after ${executionTime}ms:`, error);
      console.error(`❌ [${executionId}] Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      throw error;
    }
  }

  private async executeContextRetrieval(parameters: ToolCallRequest): Promise<ToolCallResponse> {
    try {
      const { context_type } = parameters;

      if (!context_type) {
        throw new Error('context_type parameter is required');
      }

      const contextResponse: ContextResponse = await chatbotContextTool.retrieveChatbotContext(context_type);

      return {
        content: contextResponse.content,
        metadata: contextResponse.metadata,
        success: true
      };

    } catch (error) {
      return {
        content: '',
        metadata: {
          title: 'Error',
          lastUpdated: new Date().toISOString(),
          relevantUrls: [],
          contextType: parameters.context_type || 'unknown',
          keywords: [],
          description: 'Error occurred while retrieving context'
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Get available tools
  getAvailableTools(): any[] {
    return [
      {
        type: "function",
        function: {
          name: "retrieve_chatbot_context",
          description: "Retrieve relevant context information about Bespoke Academy programs, curriculum, and services",
          parameters: {
            type: "object",
            properties: {
              context_type: {
                type: "string",
                enum: ["curriculum", "programs", "projects", "pricing", "schedule", "requirements", "support", "enrollment", "outcomes", "faq"],
                description: "The type of context information needed to answer the user's question"
              }
            },
            required: ["context_type"]
          }
        }
      }
    ];
  }

  // Determine if a tool should be used based on user message
  shouldUseTool(message: string): { shouldUse: boolean; toolName?: string; parameters?: any } {
    const lowerMessage = message.toLowerCase();

    // Context detection rules - ordered by specificity (most specific first)
    const contextPatterns = {
      pricing: ['cost', 'price', 'payment', 'tuition', 'afford', 'expensive', 'fee'],
      enrollment: ['enroll', 'register', 'sign up', 'join', 'start', 'apply'],
      schedule: ['when', 'time', 'schedule', 'friday', 'duration', 'how long', 'calendar'],
      requirements: ['need', 'require', 'computer', 'hardware', 'software', 'equipment'],
      support: ['help', 'issue', 'problem', 'troubleshoot', 'contact', 'support'],
      projects: ['projects', 'build', 'create', 'portfolio', 'showcase', 'make', 'develop'],
      outcomes: ['outcome', 'career', 'future', 'skills', 'portfolio', 'result'],
      curriculum: ['curriculum', 'learn', 'weekly', 'phase', 'what will', 'teach', 'study'],
      programs: ['class', 'format', 'teachers', 'students', 'about', 'academy'],
      faq: ['question', 'faq', 'common', 'ask', 'wondering', 'confused']
    };

    // Check each pattern
    for (const [contextType, patterns] of Object.entries(contextPatterns)) {
      if (patterns.some(pattern => lowerMessage.includes(pattern))) {
        return {
          shouldUse: true,
          toolName: 'retrieve_chatbot_context',
          parameters: { context_type: contextType }
        };
      }
    }

    return { shouldUse: false };
  }

  // Get tool usage statistics
  getToolUsageStats(): { toolName: string; usageCount: number; errorCount: number }[] {
    const stats: { toolName: string; usageCount: number; errorCount: number }[] = [];

    for (const [toolName, usageCount] of this.toolUsageStats.entries()) {
      stats.push({
        toolName,
        usageCount,
        errorCount: this.errorStats.get(toolName) || 0
      });
    }

    return stats.sort((a, b) => b.usageCount - a.usageCount);
  }

  // Reset statistics
  resetStats(): void {
    this.toolUsageStats.clear();
    this.errorStats.clear();
  }

  private incrementToolUsage(toolName: string): void {
    const current = this.toolUsageStats.get(toolName) || 0;
    this.toolUsageStats.set(toolName, current + 1);
  }

  private incrementErrorCount(toolName: string): void {
    const current = this.errorStats.get(toolName) || 0;
    this.errorStats.set(toolName, current + 1);
  }

  // Validate tool parameters
  validateToolParameters(toolName: string, parameters: any): { valid: boolean; error?: string } {
    switch (toolName) {
      case 'retrieve_chatbot_context':
        if (!parameters.context_type) {
          return { valid: false, error: 'context_type parameter is required' };
        }

        const validTypes = ['curriculum', 'programs', 'projects', 'pricing', 'schedule', 'requirements', 'support', 'enrollment', 'outcomes', 'faq'];
        if (!validTypes.includes(parameters.context_type)) {
          return { valid: false, error: `Invalid context_type. Must be one of: ${validTypes.join(', ')}` };
        }

        return { valid: true };

      default:
        return { valid: false, error: `Unknown tool: ${toolName}` };
    }
  }
}

// Export singleton instance
export const toolManager = new ToolManager();