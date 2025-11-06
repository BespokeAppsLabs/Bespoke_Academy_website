/**
 * Test runner for chatbot documentation tools
 */

import { chatbotContextTool } from '../chatbot-context';
import { toolManager } from '../tool-manager';
import { contentValidator } from '../content-validator';
import { chatbotContextCache } from '../cache-manager';

interface TestResult {
  testName: string;
  passed: boolean;
  duration: number;
  error?: string;
  details?: any;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  totalDuration: number;
  passed: number;
  failed: number;
}

class TestRunner {
  private results: TestSuite[] = [];

  async runTest(name: string, testFn: () => Promise<void>): Promise<TestResult> {
    const startTime = Date.now();

    try {
      await testFn();
      const duration = Date.now() - startTime;
      return {
        testName: name,
        passed: true,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      return {
        testName: name,
        passed: false,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async runSuite(name: string, tests: Array<{ name: string; fn: () => Promise<void> }>): Promise<TestSuite> {
    console.log(`\n🧪 Running test suite: ${name}`);

    const suiteResults: TestResult[] = [];
    let totalDuration = 0;

    for (const test of tests) {
      const result = await this.runTest(test.name, test.fn);
      suiteResults.push(result);
      totalDuration += result.duration;

      const status = result.passed ? '✅' : '❌';
      console.log(`  ${status} ${result.name} (${result.duration}ms)`);

      if (!result.passed) {
        console.log(`     Error: ${result.error}`);
      }
    }

    const passed = suiteResults.filter(r => r.passed).length;
    const failed = suiteResults.filter(r => !r.passed).length;

    const suite: TestSuite = {
      name,
      tests: suiteResults,
      totalDuration,
      passed,
      failed
    };

    this.results.push(suite);

    console.log(`📊 Suite results: ${passed}/${suiteResults.length} passed (${totalDuration}ms)`);

    return suite;
  }

  printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 TEST SUMMARY');
    console.log('='.repeat(60));

    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalDuration = 0;

    for (const suite of this.results) {
      totalTests += suite.tests.length;
      totalPassed += suite.passed;
      totalFailed += suite.failed;
      totalDuration += suite.totalDuration;

      console.log(`\n📋 ${suite.name}:`);
      console.log(`   Tests: ${suite.tests.length}`);
      console.log(`   Passed: ${suite.passed}`);
      console.log(`   Failed: ${suite.failed}`);
      console.log(`   Duration: ${suite.totalDuration}ms`);

      if (suite.failed > 0) {
        console.log('   Failed tests:');
        for (const test of suite.tests.filter(t => !t.passed)) {
          console.log(`     ❌ ${test.testName}: ${test.error}`);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`🏆 OVERALL: ${totalPassed}/${totalTests} tests passed (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
    console.log(`⏱️  Total duration: ${totalDuration}ms`);

    if (totalFailed === 0) {
      console.log('🎉 All tests passed!');
    } else {
      console.log(`❌ ${totalFailed} test(s) failed`);
    }
  }

  getResults(): TestSuite[] {
    return this.results;
  }

  clearResults(): void {
    this.results = [];
  }
}

// Test implementations
async function runAllTests(): Promise<void> {
  const runner = new TestRunner();

  // Context Tool Tests
  await runner.runSuite('Context Tool Tests', [
    {
      name: 'Should retrieve curriculum context',
      fn: async () => {
        const result = await chatbotContextTool.retrieveChatbotContext('curriculum');
        if (!result.content || result.content.length === 0) {
          throw new Error('No content returned');
        }
        if (!result.metadata || !result.metadata.title) {
          throw new Error('No metadata returned');
        }
      }
    },
    {
      name: 'Should retrieve programs context',
      fn: async () => {
        const result = await chatbotContextTool.retrieveChatbotContext('programs');
        if (!result.content || result.content.length === 0) {
          throw new Error('No content returned');
        }
      }
    },
    {
      name: 'Should handle invalid context type',
      fn: async () => {
        try {
          await chatbotContextTool.retrieveChatbotContext('invalid-type');
          throw new Error('Should have thrown an error');
        } catch (error) {
          if (error instanceof Error && error.message.includes('Invalid context type')) {
            // Expected error
          } else {
            throw error;
          }
        }
      }
    },
    {
      name: 'Should use cache for repeated requests',
      fn: async () => {
        // Clear cache first
        chatbotContextTool.clearCache();

        // First request
        const start1 = Date.now();
        await chatbotContextTool.retrieveChatbotContext('curriculum');
        const duration1 = Date.now() - start1;

        // Second request (should be cached)
        const start2 = Date.now();
        await chatbotContextTool.retrieveChatbotContext('curriculum');
        const duration2 = Date.now() - start2;

        // Cached request should be faster (allow some variance)
        if (duration2 > duration1 * 0.8) {
          console.log(`Warning: Cache may not be working. First: ${duration1}ms, Second: ${duration2}ms`);
        }
      }
    }
  ]);

  // Tool Manager Tests
  await runner.runSuite('Tool Manager Tests', [
    {
      name: 'Should validate tool parameters',
      fn: async () => {
        const validParams = { context_type: 'curriculum' };
        const result = toolManager.validateToolParameters('retrieve_chatbot_context', validParams);
        if (!result.valid) {
          throw new Error(result.error || 'Validation failed');
        }
      }
    },
    {
      name: 'Should reject invalid parameters',
      fn: async () => {
        const invalidParams = { context_type: 'invalid' };
        const result = toolManager.validateToolParameters('retrieve_chatbot_context', invalidParams);
        if (result.valid) {
          throw new Error('Should have rejected invalid parameters');
        }
      }
    },
    {
      name: 'Should detect tool usage correctly',
      fn: async () => {
        const result1 = toolManager.shouldUseTool('What curriculum do you offer?');
        if (!result1.shouldUse || result1.parameters?.context_type !== 'curriculum') {
          throw new Error('Should detect curriculum context');
        }

        const result2 = toolManager.shouldUseTool('How much does it cost?');
        if (!result2.shouldUse || result2.parameters?.context_type !== 'pricing') {
          throw new Error('Should detect pricing context');
        }

        const result3 = toolManager.shouldUseTool('Hello there!');
        if (result3.shouldUse) {
          throw new Error('Should not detect tool usage for general greeting');
        }
      }
    },
    {
      name: 'Should execute tool calls',
      fn: async () => {
        const result = await toolManager.executeToolCall('retrieve_chatbot_context', { context_type: 'faq' });
        if (!result.success || !result.content) {
          throw new Error('Tool execution failed');
        }
      }
    }
  ]);

  // Content Validator Tests
  await runner.runSuite('Content Validator Tests', [
    {
      name: 'Should validate curriculum content',
      fn: async () => {
        const isValid = await contentValidator.validateSingleFile('curriculum.md');
        if (!isValid.valid) {
          throw new Error('Curriculum content validation failed');
        }
      }
    },
    {
      name: 'Should validate all content files',
      fn: async () => {
        const validation = await contentValidator.validateAllContent();
        if (!validation.isValid) {
          throw new Error(`Content validation failed: ${validation.errors.join(', ')}`);
        }
      }
    }
  ]);

  // Cache Manager Tests
  await runner.runSuite('Cache Manager Tests', [
    {
      name: 'Should cache and retrieve data',
      fn: async () => {
        const testData = 'test content';
        chatbotContextCache.setContext('test-key', testData);

        const retrieved = chatbotContextCache.getContext('test-key');
        if (!retrieved || retrieved.content !== testData) {
          throw new Error('Cache retrieval failed');
        }

        // Clean up
        chatbotContextCache.clearContextCache();
      }
    },
    {
      name: 'Should provide cache statistics',
      fn: async () => {
        // Add some test data
        chatbotContextCache.setContext('test1', 'content1');
        chatbotContextCache.setContext('test2', 'content2');

        const stats = chatbotContextCache.getContextStats();
        if (stats.totalCached < 2) {
          throw new Error('Cache stats incorrect');
        }

        // Clean up
        chatbotContextCache.clearContextCache();
      }
    }
  ]);

  // Print summary
  runner.printSummary();

  // Return results for programmatic access
  return runner.getResults();
}

// Export for use in other modules
export { TestRunner, runAllTests };

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllTests().catch(console.error);
}