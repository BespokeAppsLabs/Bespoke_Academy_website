import fs from 'fs';
import path from 'path';
import { ContextFileMetadata } from '@/types/context';

export class ContentValidator {
  private readonly contextDir = path.join(process.cwd(), 'docs', 'chatbot');
  private readonly metadataFile = path.join(this.contextDir, 'index.json');

  async validateAllContent(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    fileResults: { [filename: string]: { valid: boolean; issues: string[] } }
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const fileResults: { [filename: string]: { valid: boolean; issues: string[] } } = {};

    try {
      // Read metadata
      const metadata = await this.readMetadata();

      // Validate each context file
      for (const fileMetadata of metadata.contextFiles) {
        const validation = await this.validateSingleFile(fileMetadata.filename, fileMetadata);
        fileResults[fileMetadata.filename] = validation;

        if (!validation.valid) {
          errors.push(`File ${fileMetadata.filename}: ${validation.issues.join(', ')}`);
        }
      }

      // Validate metadata consistency
      const metadataValidation = await this.validateMetadataConsistency(metadata);
      errors.push(...metadataValidation.errors);
      warnings.push(...metadataValidation.warnings);

    } catch (error) {
      errors.push(`Failed to validate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fileResults
    };
  }

  async validateSingleFile(filename: string, expectedMetadata?: ContextFileMetadata): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    const filePath = path.join(this.contextDir, filename);

    // Check file exists
    if (!fs.existsSync(filePath)) {
      issues.push('File does not exist');
      return { valid: false, issues };
    }

    // Read and validate content
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check required sections
    const requiredSections = [
      '## Overview',
      '## Key Information',
      '## Common Questions',
      '## Website Integration'
    ];

    for (const section of requiredSections) {
      if (!content.includes(section)) {
        issues.push(`Missing required section: ${section}`);
      }
    }

    // Check title consistency
    const titleMatch = content.match(/^# (.+)$/m);
    if (!titleMatch) {
      issues.push('Missing main title (should be "# [Title]")');
    } else if (expectedMetadata && titleMatch[1] !== expectedMetadata.title) {
      issues.push(`Title mismatch: file has "${titleMatch[1]}", metadata expects "${expectedMetadata.title}"`);
    }

    // Check for common questions format
    const questionMatches = content.match(/\*\*Q: (.+?)\*\*/g);
    if (!questionMatches || questionMatches.length < 3) {
      issues.push('Should include at least 3 common questions in the format "**Q: [Question]**"');
    }

    // Check website integration section
    if (!content.includes('Primary URL:') || !content.includes('Related URLs:')) {
      issues.push('Website Integration section should include "Primary URL:" and "Related URLs:"');
    }

    // Check content length (should be substantial but not too long)
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 200) {
      issues.push('Content seems too short (less than 200 words)');
    } else if (wordCount > 2000) {
      issues.push('Content is quite long (over 2000 words), consider condensing');
    }

    // Check for forbidden characters or formatting issues
    if (content.includes('\t')) {
      issues.push('Contains tabs instead of spaces');
    }

    // Validate URLs
    const urlMatches = content.match(/\/[a-zA-Z0-9\-_\/]+/g);
    if (urlMatches) {
      for (const url of urlMatches) {
        if (!this.isValidUrlFormat(url)) {
          issues.push(`Invalid URL format: ${url}`);
        }
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  private async readMetadata(): Promise<any> {
    try {
      const content = fs.readFileSync(this.metadataFile, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read metadata file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async validateMetadataConsistency(metadata: any): Promise<{ errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check metadata structure
    const requiredFields = ['version', 'lastUpdated', 'contextFiles', 'statistics'];
    for (const field of requiredFields) {
      if (!metadata[field]) {
        errors.push(`Missing required metadata field: ${field}`);
      }
    }

    // Check context files
    if (metadata.contextFiles && Array.isArray(metadata.contextFiles)) {
      const expectedFiles = ['curriculum.md', 'programs.md', 'projects.md', 'pricing.md', 'schedule.md', 'requirements.md', 'support.md', 'enrollment.md', 'outcomes.md', 'faq.md'];

      for (const expectedFile of expectedFiles) {
        const found = metadata.contextFiles.find((file: any) => file.filename === expectedFile);
        if (!found) {
          errors.push(`Missing metadata for required file: ${expectedFile}`);
        }
      }

      // Validate each file metadata
      for (const fileMetadata of metadata.contextFiles) {
        const requiredFileFields = ['filename', 'title', 'contextType', 'primaryUrl'];
        for (const field of requiredFileFields) {
          if (!fileMetadata[field]) {
            errors.push(`File ${fileMetadata.filename || 'unknown'} missing required field: ${field}`);
          }
        }
      }
    }

    // Check version format
    if (metadata.version && !/^\d+\.\d+\.\d+$/.test(metadata.version)) {
      warnings.push('Version should follow semantic versioning (e.g., "1.0.0")');
    }

    // Check date format
    if (metadata.lastUpdated && !/^\d{4}-\d{2}-\d{2}$/.test(metadata.lastUpdated)) {
      warnings.push('lastUpdated should be in YYYY-MM-DD format');
    }

    return { errors, warnings };
  }

  private isValidUrlFormat(url: string): boolean {
    // Basic URL validation for internal URLs
    return /^\/[a-zA-Z0-9\-_\/]*$/.test(url) && !url.includes('//');
  }

  // Method to sanitize content
  sanitizeContent(content: string): string {
    return content
      // Replace tabs with 2 spaces
      .replace(/\t/g, '  ')
      // Fix multiple consecutive empty lines
      .replace(/\n{3,}/g, '\n\n')
      // Fix spaces before punctuation
      .replace(/\s+([.,!?])/g, '$1')
      // Ensure proper spacing around headers
      .replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2')
      .trim();
  }

  // Method to extract key information from content
  extractKeyInfo(content: string): { overview: string; keyPoints: string[]; questions: string[] } {
    const result = {
      overview: '',
      keyPoints: [] as string[],
      questions: [] as string[]
    };

    // Extract overview
    const overviewMatch = content.match(/## Overview\n\n([\s\S]*?)(?=\n\n|\n#|$)/);
    if (overviewMatch) {
      result.overview = overviewMatch[1].trim();
    }

    // Extract key information points
    const keyInfoMatch = content.match(/## Key Information\n\n(.+?)(?=\n\n|\n#|$)/);
    if (keyInfoMatch) {
      const bulletPoints = keyInfoMatch[1].match(/^- (.+)$/gm);
      if (bulletPoints) {
        result.keyPoints = bulletPoints.map(point => point.replace(/^- /, '').trim());
      }
    }

    // Extract questions
    const questionMatches = content.match(/\*\*Q: (.+?)\*\*\s*\nA: (.+?)(?=\n\n|\n\*\*Q:|\n#|$)/);
    if (questionMatches) {
      for (const match of questionMatches) {
        const questionMatch = match.match(/\*\*Q: (.+?)\*\*/);
        if (questionMatch) {
          result.questions.push(questionMatch[1]);
        }
      }
    }

    return result;
  }
}

// Export singleton instance
export const contentValidator = new ContentValidator();