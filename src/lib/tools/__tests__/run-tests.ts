#!/usr/bin/env tsx

/**
 * Simple test execution script
 */

import { runAllTests } from './test-runner';

async function main() {
  console.log('🚀 Starting Bespoke Academy Chatbot Tools Tests...\n');

  try {
    const results = await runAllTests();

    // Exit with appropriate code
    const totalFailed = results.reduce((sum, suite) => sum + suite.failed, 0);
    process.exit(totalFailed > 0 ? 1 : 0);

  } catch (error) {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  }
}

main();