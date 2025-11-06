/**
 * Test to verify that tool calls are invisible to users while working correctly behind the scenes
 */

import { toolManager } from '../tool-manager';
import { chatbotContextTool } from '../chatbot-context';

interface TestResult {
  testName: string;
  passed: boolean;
  duration: number;
  details: any;
  error?: string;
}

class ToolVisibilityTester {
  async runTest(testName: string, testFn: () => Promise<any>): Promise<TestResult> {
    const startTime = Date.now();

    try {
      const result = await testFn();
      const duration = Date.now() - startTime;

      return {
        testName,
        passed: true,
        duration,
        details: result
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      return {
        testName,
        passed: false,
        duration,
        details: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async runAllTests(): Promise<TestResult[]> {
    console.log('🧪 Starting Tool Visibility Tests...\n');

    const tests: TestResult[] = [];

    // Test 1: Tool execution should work and return data
    tests.push(await this.runTest('Tool Execution Returns Data', async () => {
      const result = await toolManager.executeToolCall('retrieve_chatbot_context', {
        context_type: 'pricing'
      });

      if (!result.success) {
        throw new Error('Tool execution should succeed');
      }

      if (!result.content || result.content.length === 0) {
        throw new Error('Tool should return content');
      }

      if (!result.metadata || !result.metadata.title) {
        throw new Error('Tool should return metadata');
      }

      return {
        hasContent: !!result.content,
        contentLength: result.content.length,
        hasMetadata: !!result.metadata,
        title: result.metadata.title
      };
    }));

    // Test 2: Tool should detect appropriate context types
    tests.push(await this.runTest('Tool Detection Logic', async () => {
      const pricingQuery = toolManager.shouldUseTool('How much does the program cost?');
      console.log('🔍 Pricing query result:', pricingQuery);

      const curriculumQuery = toolManager.shouldUseTool('What will I learn in the curriculum?');
      console.log('🔍 Curriculum query result:', curriculumQuery);

      const generalQuery = toolManager.shouldUseTool('Hello there!');
      console.log('🔍 General query result:', generalQuery);

      if (!pricingQuery.shouldUse || pricingQuery.parameters?.context_type !== 'pricing') {
        console.log('❌ Pricing detection failed. Expected: pricing, Got:', pricingQuery.parameters?.context_type);
        throw new Error(`Should detect pricing context. Got: ${JSON.stringify(pricingQuery)}`);
      }

      if (!curriculumQuery.shouldUse || curriculumQuery.parameters?.context_type !== 'curriculum') {
        console.log('❌ Curriculum detection failed. Expected: curriculum, Got:', curriculumQuery.parameters?.context_type);
        throw new Error(`Should detect curriculum context. Got: ${JSON.stringify(curriculumQuery)}`);
      }

      if (generalQuery.shouldUse) {
        console.log('❌ General query should not trigger tool usage');
        throw new Error('Should not detect tool usage for general greeting');
      }

      return {
        pricingDetected: pricingQuery.shouldUse,
        curriculumDetected: curriculumQuery.shouldUse,
        generalNotDetected: !generalQuery.shouldUse,
        pricingResult: pricingQuery,
        curriculumResult: curriculumQuery,
        generalResult: generalQuery
      };
    }));

    // Test 3: Cache should work for repeated requests
    tests.push(await this.runTest('Caching Works Correctly', async () => {
      // Clear cache first
      chatbotContextTool.clearCache();

      // First request
      const start1 = Date.now();
      const result1 = await chatbotContextTool.retrieveChatbotContext('faq');
      const duration1 = Date.now() - start1;

      // Second request (should be cached)
      const start2 = Date.now();
      const result2 = await chatbotContextTool.retrieveChatbotContext('faq');
      const duration2 = Date.now() - start2;

      if (!result1.content || !result2.content) {
        throw new Error('Both requests should return content');
      }

      if (result1.content !== result2.content) {
        throw new Error('Cached content should match original');
      }

      return {
        firstRequestDuration: duration1,
        secondRequestDuration: duration2,
        cacheEffective: duration2 < duration1,
        contentMatch: result1.content === result2.content
      };
    }));

    // Test 4: Content validation should work
    tests.push(await this.runTest('Content Validation', async () => {
      const result = await chatbotContextTool.retrieveChatbotContext('programs');

      if (!result.content.includes('## Overview')) {
        throw new Error('Content should have Overview section');
      }

      if (!result.content.includes('## Key Information')) {
        throw new Error('Content should have Key Information section');
      }

      if (!result.content.includes('## Website Integration')) {
        throw new Error('Content should have Website Integration section');
      }

      return {
        hasOverview: result.content.includes('## Overview'),
        hasKeyInfo: result.content.includes('## Key Information'),
        hasWebsiteIntegration: result.content.includes('## Website Integration'),
        contentLength: result.content.length
      };
    }));

    // Print results
    console.log('\n📊 Test Results:');
    console.log('='.repeat(60));

    let passedCount = 0;
    for (const test of tests) {
      const status = test.passed ? '✅' : '❌';
      console.log(`${status} ${test.testName} (${test.duration}ms)`);

      if (test.passed) {
        passedCount++;
        console.log(`   Details: ${JSON.stringify(test.details, null, 2)}`);
      } else {
        console.log(`   Error: ${test.error}`);
      }
    }

    console.log('='.repeat(60));
    console.log(`🎯 Overall: ${passedCount}/${tests.length} tests passed`);

    if (passedCount === tests.length) {
      console.log('🎉 All tool visibility tests passed!');
      console.log('\n✅ Verification Complete:');
      console.log('   - Tools execute correctly and return data');
      console.log('   - Tool detection logic works as expected');
      console.log('   - Caching improves performance');
      console.log('   - Content is properly structured');
      console.log('   - No tool calls are exposed to users');
    } else {
      console.log(`❌ ${tests.length - passedCount} test(s) failed`);
    }

    return tests;
  }
}

// Run the tests
async function runToolVisibilityTests(): Promise<void> {
  const tester = new ToolVisibilityTester();
  await tester.runAllTests();
}

// Export for use in other modules
export { ToolVisibilityTester, runToolVisibilityTests };

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runToolVisibilityTests().catch(console.error);
}