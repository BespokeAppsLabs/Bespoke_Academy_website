
# Week 1 Mini-Project: Command-Line Greeting App

## 1. Introduction

Welcome to your first project at Bespoke Academy! This project is designed to help you get comfortable with the basic tools of a software developer and to write your very first lines of code.

You will build a simple command-line application that greets the user by name. This project will introduce you to:

-   **Node.js:** A JavaScript runtime that allows you to run JavaScript code outside of a web browser.
-   **JavaScript:** The programming language you will be using.
-   **The Command Line:** The primary interface for developers to run commands and interact with their system.
-   **File I/O:** Reading from and writing to files (in this case, reading user input from the command line and writing output to the command line).

## 2. Learning Objectives

By the end of this project, you will be able to:

-   Create a new JavaScript file.
-   Write a simple JavaScript program that uses variables and logs output to the console.
-   Run a JavaScript file using Node.js from your terminal.
-   Understand the concept of a command-line application.

## 3. Project Requirements

Your application should do the following:

1.  Prompt the user to enter their name.
2.  Read the user's name from the command line.
3.  Display a personalized greeting message to the user, such as "Hello, [Name]!".

## 4. Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

-   **Node.js:** You can download it from [https://nodejs.org/](https://nodejs.org/).
-   **A text editor:** We recommend [Visual Studio Code](https://code.visualstudio.com/), but you can use any text editor you are comfortable with.

### Setup

1.  **Create a new directory** for your project. You can do this from your terminal:

    ```bash
    mkdir week-1-greeting-app
    cd week-1-greeting-app
    ```

2.  **Create a new file** named `index.js` inside this directory. This is where you will write your JavaScript code.

    ```bash
    touch index.js
    ```

3.  **Create a `package.json` file.** This file is used to manage project dependencies and define scripts. You can create it by running:

    ```bash
    npm init -y
    ```

    This will create a `package.json` file with default values.

## 5. Implementation Steps

Now it's time to write the code! Open the `index.js` file in your text editor and follow these steps.

### Step 1: Display a Prompt

First, you need to ask the user for their name. You can use `console.log()` to display a message in the terminal.

```javascript
console.log("Please enter your name:");
```

### Step 2: Read User Input

To read input from the command line in Node.js, you can use the built-in `readline` module. This module provides an interface for reading data from a readable stream (like the command line) one line at a time.

Here's how you can set it up:

```javascript
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
```

Now, you can use the `readline.question()` method to ask a question and get the user's input.

```javascript
readline.question('What is your name? ', name => {
  // The user's input will be available in the 'name' variable here.
  console.log(`Hello, ${name}!`);
  readline.close();
});
```

### Step 3: Putting It All Together

Here is the complete code for your `index.js` file:

```javascript
// index.js

// 1. Import the readline module
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// 2. Ask the user for their name and greet them
readline.question('What is your name? ', name => {
  console.log(`Hello, ${name}!`);
  readline.close();
});
```

## 6. Running Your Application

To run your application, open your terminal, navigate to your project directory, and run the following command:

```bash
node index.js
```

You should see the prompt "What is your name?". Type your name and press Enter. The application will then display a greeting message with your name.

## 7. Conclusion

Congratulations! You have successfully built your first command-line application. You have learned how to write a simple JavaScript program, run it with Node.js, and interact with the user through the command line.

This is just the beginning of your coding journey. In the coming weeks, you will build on these foundational skills to create more complex and exciting applications.
