import fs from 'fs';
import path from 'path';
import { ContextMetadata, ContextResponse } from '@/types/context';

export class ChatbotContextTool {
  private readonly contextDir = path.join(process.cwd(), 'docs', 'chatbot');
  private readonly metadataFile = path.join(this.contextDir, 'index.json');
  private cache: Map<string, { content: string; timestamp: number; metadata: ContextMetadata }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async retrieveChatbotContext(contextType: string): Promise<ContextResponse> {
    try {
      // Check cache first
      const cached = this.getCachedContent(contextType);
      if (cached) {
        return cached;
      }

      // Validate context type
      const validTypes = await this.getValidContextTypes();
      if (!validTypes.includes(contextType)) {
        throw new Error(`Invalid context type: ${contextType}. Valid types: ${validTypes.join(', ')}`);
      }

      // Read the context file
      const filePath = path.join(this.contextDir, `${contextType}.md`);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Context file not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      // Get metadata
      const metadata = await this.getFileMetadata(contextType);

      // Cache the result
      this.cacheContent(contextType, content, metadata);

      return {
        content,
        metadata
      };

    } catch (error) {
      console.error('Error retrieving chatbot context:', error);
      throw error;
    }
  }

  private async getValidContextTypes(): Promise<string[]> {
    try {
      const metadataContent = fs.readFileSync(this.metadataFile, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      return metadata.contextFiles.map((file: any) => file.contextType);
    } catch (error) {
      console.error('Error reading metadata file:', error);
      return ['curriculum', 'programs', 'projects', 'pricing', 'schedule', 'requirements', 'support', 'enrollment', 'outcomes', 'faq'];
    }
  }

  private async getFileMetadata(contextType: string): Promise<ContextMetadata> {
    try {
      const metadataContent = fs.readFileSync(this.metadataFile, 'utf-8');
      const metadata = JSON.parse(metadataContent);
      const fileMetadata = metadata.contextFiles.find((file: any) => file.contextType === contextType);

      if (!fileMetadata) {
        throw new Error(`Metadata not found for context type: ${contextType}`);
      }

      // Get file modification time
      const filePath = path.join(this.contextDir, `${contextType}.md`);
      const stats = fs.statSync(filePath);

      return {
        title: fileMetadata.title,
        lastUpdated: stats.mtime.toISOString(),
        relevantUrls: [fileMetadata.primaryUrl, ...(fileMetadata.relatedUrls || [])],
        contextType: fileMetadata.contextType,
        keywords: fileMetadata.keywords || [],
        description: fileMetadata.description
      };
    } catch (error) {
      console.error('Error reading file metadata:', error);
      // Return basic metadata
      return {
        title: contextType.charAt(0).toUpperCase() + contextType.slice(1),
        lastUpdated: new Date().toISOString(),
        relevantUrls: [`/${contextType}`],
        contextType,
        keywords: [contextType],
        description: `Information about ${contextType}`
      };
    }
  }

  private getCachedContent(contextType: string): ContextResponse | null {
    const cached = this.cache.get(contextType);
    if (cached && (Date.now() - cached.timestamp) < this.CACHE_TTL) {
      return {
        content: cached.content,
        metadata: cached.metadata
      };
    }
    return null;
  }

  private cacheContent(contextType: string, content: string, metadata: ContextMetadata): void {
    this.cache.set(contextType, {
      content,
      metadata,
      timestamp: Date.now()
    });

    // Clean old cache entries
    if (this.cache.size > 50) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
  }

  // Method to clear cache for testing or updates
  clearCache(): void {
    this.cache.clear();
  }

  // Method to get all available context types
  async getAvailableContextTypes(): Promise<string[]> {
    return this.getValidContextTypes();
  }

  // Method to validate content
  async validateContent(contextType: string): Promise<boolean> {
    try {
      const filePath = path.join(this.contextDir, `${contextType}.md`);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Basic validation checks
      const requiredSections = ['## Overview', '## Key Information', '## Common Questions'];
      return requiredSections.every(section => content.includes(section));
    } catch (error) {
      console.error('Error validating content:', error);
      return false;
    }
  }
}

// Export singleton instance
export const chatbotContextTool = new ChatbotContextTool();