export interface ContextMetadata {
  title: string;
  lastUpdated: string;
  relevantUrls: string[];
  contextType: string;
  keywords: string[];
  description: string;
}

export interface ContextResponse {
  content: string;
  metadata: ContextMetadata;
}

export interface ToolCallRequest {
  context_type: "curriculum" | "programs" | "projects" | "pricing" | "schedule" | "requirements" | "support" | "enrollment" | "outcomes" | "faq";
}

export interface ToolCallResponse {
  content: string;
  metadata: ContextMetadata;
  success: boolean;
  error?: string;
}

export interface ContextFileMetadata {
  filename: string;
  title: string;
  contextType: string;
  description: string;
  primaryUrl: string;
  relatedUrls: string[];
  lastModified: string;
  wordCount: number;
  keywords: string[];
}

export interface ContextIndex {
  version: string;
  lastUpdated: string;
  contextFiles: ContextFileMetadata[];
  statistics: {
    totalFiles: number;
    totalWords: number;
    averageWordsPerFile: number;
    contextTypes: string[];
  };
  maintenance: {
    reviewSchedule: string;
    contentValidation: string;
    lastValidation: string;
    nextReviewDue: string;
  };
}