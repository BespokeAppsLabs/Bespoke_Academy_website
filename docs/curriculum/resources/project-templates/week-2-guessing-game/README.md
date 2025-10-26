
# Week 2 Mini-Project: Number Guessing Game

## 1. Introduction

Welcome to the Week 2 mini-project! Building on what you learned in Week 1, you will now create a classic number guessing game. This project will introduce you to more fundamental programming concepts and allow you to build a more interactive command-line application.

In this project, you will:

-   Work with **variables** to store and update the state of your game.
-   Use **conditional statements** (`if`, `else if`, `else`) to make decisions.
-   Implement **loops** to allow the user to guess multiple times.
-   Generate **random numbers**.
-   Handle **user input** and provide feedback.

## 2. Learning Objectives

By the end of this project, you will be able to:

-   Declare and use variables of different data types (Number, Boolean).
-   Write conditional logic to compare values and control the flow of your program.
-   Use a loop to repeat a block of code.
-   Generate a random number within a specified range.
-   Convert a string input from the user into a number.
-   Structure a simple interactive game.

## 3. Project Requirements

Your application should perform the following steps:

1.  Generate a random integer between 1 and 100 (inclusive).
2.  Prompt the user to guess the number.
3.  Read the user's guess from the command line.
4.  Compare the user's guess to the random number and provide one of the following feedback messages:
    -   "Too high! Try again."
    -   "Too low! Try again."
    -   "Congratulations! You guessed the number correctly!"
5.  If the guess is incorrect, the application should prompt the user for another guess.
6.  If the guess is correct, the application should terminate.

## 4. Getting Started

### Prerequisites

-   You should have Node.js and a text editor (like VS Code) installed, as per the Week 1 project.

### Setup

1.  **Create a new directory** for your project:

    ```bash
    mkdir week-2-guessing-game
    cd week-2-guessing-game
    ```

2.  **Create a new file** named `index.js`:

    ```bash
    touch index.js
    ```

3.  **Create a `package.json` file**:

    ```bash
    npm init -y
    ```

## 5. Implementation Steps

Open `index.js` in your text editor and follow these steps.

### Step 1: Generate a Random Number

First, you need to generate the secret number that the user has to guess. You can use `Math.random()` to generate a random floating-point number between 0 (inclusive) and 1 (exclusive). You can then scale and shift this number to get an integer in your desired range.

```javascript
// Generate a random integer between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
```

### Step 2: Set up `readline`

Just like in Week 1, you will use the `readline` module to get user input.

```javascript
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
```

### Step 3: Create a Function to Ask for a Guess

It's good practice to put the logic for asking a question and handling the answer inside a function. This makes your code more organized and allows you to call the function repeatedly.

```javascript
function askForGuess() {
  readline.question("Guess the number between 1 and 100: ", (guess) => {
    // We will add the game logic here
  });
}
```

### Step 4: Implement the Game Logic

Inside the callback of `readline.question()`, you need to:

1.  **Convert the user's input to a number.** The input from `readline` is a string, so you need to convert it to a number using `parseInt()` before you can compare it to your `secretNumber`.
2.  **Compare the guess to the secret number.**
3.  **Provide feedback** and either ask for another guess or end the game.

Here's the logic:

```javascript
function askForGuess() {
  readline.question("Guess the number between 1 and 100: ", (input) => {
    const guess = parseInt(input);

    if (guess > secretNumber) {
      console.log("Too high! Try again.");
      askForGuess(); // Ask for another guess
    } else if (guess < secretNumber) {
      console.log("Too low! Try again.");
      askForGuess(); // Ask for another guess
    } else if (guess === secretNumber) {
      console.log("Congratulations! You guessed the number correctly!");
      readline.close(); // End the game
    } else {
      console.log("Invalid input. Please enter a number.");
      askForGuess(); // Ask for another guess
    }
  });
}
```

### Step 5: Start the Game

Finally, you need to make the initial call to your `askForGuess()` function to start the game.

```javascript
// Start the game
askForGuess();
```

## 6. Complete Code

Here is the complete code for your `index.js` file:

```javascript
// index.js

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;

function askForGuess() {
  readline.question("Guess the number between 1 and 100: ", (input) => {
    const guess = parseInt(input);

    if (guess > secretNumber) {
      console.log("Too high! Try again.");
      askForGuess();
    } else if (guess < secretNumber) {
      console.log("Too low! Try again.");
      askForGuess();
    } else if (guess === secretNumber) {
      console.log("Congratulations! You guessed the number correctly!");
      readline.close();
    } else {
      console.log("Invalid input. Please enter a number.");
      askForGuess();
    }
  });
}

console.log("I have selected a random number between 1 and 100.");
askForGuess();
```

## 7. Running Your Application

Run your game from the terminal:

```bash
node index.js
```

Play the game and see if you can guess the secret number!

## 8. Conclusion

Well done! You have now built a more complex interactive application. You have gained experience with variables, conditionals, functions, and loops, which are the building blocks of almost all programs.

In the next project, you will continue to expand on these skills and learn about new concepts.
