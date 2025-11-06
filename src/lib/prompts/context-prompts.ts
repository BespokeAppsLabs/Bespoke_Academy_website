/**
 * Context-specific prompt additions for different conversation types
 */

export const CONTEXT_PROMPTS = {
  'course-advising': `
Focus on course information, prerequisites, and recommendations.
Highlight our beginner-friendly approach and hands-on learning methodology.
Be informative about curriculum structure and learning outcomes.`,

  'technical-support': `
Provide step-by-step troubleshooting assistance.
If the issue requires human intervention, guide them to contact support.
Be patient and methodical in problem-solving approach.`,

  'general-inquiry': `
Be informative about the academy while being conversational.
Ask clarifying questions to better understand their needs.
Provide comprehensive overview of our educational approach.`,

  'learning-assistance': `
Offer educational support and study tips.
Encourage curiosity and confidence in learning technical topics.
Provide clear explanations with relevant examples.`
};

export type ContextType = keyof typeof CONTEXT_PROMPTS;