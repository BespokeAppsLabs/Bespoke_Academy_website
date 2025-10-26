

// Bespoke Academy - Week 2 Mini-Project: Number Guessing Game
// index.js

/**
 * This file contains the complete code for the number guessing game.
 * It demonstrates the use of variables, conditionals, loops (via recursion with readline),
 * and random number generation to create a simple interactive game.
 */

// 1. Import the `readline` module for command-line interaction.
const readline = require('readline');

// 2. Create the readline interface.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 3. Generate the secret number.
// `Math.random()` returns a number between 0 and 1 (exclusive of 1).
// We multiply by 100 to get a number between 0 and 99.99...
// We use `Math.floor()` to round down to the nearest whole number (0-99).
// We add 1 to get a number in the desired range of 1 to 100.
const secretNumber = Math.floor(Math.random() * 100) + 1;

/**
 * The main game loop function.
 * It prompts the user for a guess, processes the guess, and then calls itself again
 * if the guess is incorrect, creating a loop.
 */
function askForGuess() {
  // 4. Prompt the user for their guess.
  rl.question("I'm thinking of a number between 1 and 100. What is your guess? ", (input) => {
    // 5. Parse the user's input into an integer.
    // The `input` from readline is always a string, so we must convert it.
    const guess = parseInt(input, 10);

    // 6. Check if the input was a valid number.
    // `isNaN` (is Not-a-Number) returns true if the value is not a number.
    if (isNaN(guess)) {
      console.log('That doesn\'t look like a number. Please try again.');
      askForGuess(); // Ask again.
      return; // Stop further execution for this turn.
    }

    // 7. Compare the guess to the secret number and provide feedback.
    if (guess > secretNumber) {
      console.log("Too high! Try again.");
      askForGuess(); // The guess was wrong, so we call the function again.
    } else if (guess < secretNumber) {
      console.log("Too low! Try again.");
      askForGuess(); // The guess was wrong, so we call the function again.
    } else {
      // 8. The guess is correct!
      console.log(`Congratulations! You guessed the number correctly! It was ${secretNumber}.`);
      rl.close(); // Close the interface to end the program.
    }
  });
}

// 9. Start the game!
// Display a welcome message and then make the first call to `askForGuess`.
console.log("Welcome to the Number Guessing Game!");
askForGuess();

