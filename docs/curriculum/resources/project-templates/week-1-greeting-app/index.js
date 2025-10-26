
// Bespoke Academy - Week 1 Mini-Project: Command-Line Greeting App
// index.js

/**
 * This file contains the complete code for the command-line greeting application.
 * It demonstrates how to use the Node.js `readline` module to get user input
 * from the command line and how to display a personalized greeting.
 */

// 1. Import the `readline` module.
// The `readline` module provides an interface for reading data from a Readable stream
// (such as `process.stdin`) one line at a time.
const readline = require('readline');

// 2. Create an interface to read from the command line.
// We configure it to use the standard input (`process.stdin`) for input
// and the standard output (`process.stdout`) for output.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 3. Ask the user for their name and provide a callback function.
// The `rl.question()` method displays the query (the first argument) by writing it to the output,
// waits for the user to provide input on a new line, and then calls the callback function
// with the user's input as the first argument.
rl.question('Welcome to the Greeting App! What is your name? ', (name) => {
  // 4. Inside the callback, display the personalized greeting.
  // We use a template literal (the backticks ``) to easily embed the `name` variable in the string.
  console.log(`Hello, ${name}! It's a pleasure to meet you.`);

  // 5. Close the readline interface.
  // This is important! If you don't close the interface, the program will not exit.
  rl.close();
});
