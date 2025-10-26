
# Cheat Sheet: JavaScript Basics

This cheat sheet provides a quick reference for the fundamental concepts of JavaScript that you will encounter in the first few weeks of the course.

---

## 1. Variables

Variables are used to store data. In JavaScript, you can declare variables using `let`, `const`, and `var`.

-   **`let`**: Declares a block-scoped, mutable variable.

    ```javascript
    let age = 25;
    age = 26; // This is allowed
    ```

-   **`const`**: Declares a block-scoped, immutable variable (the value cannot be reassigned).

    ```javascript
    const name = "Alice";
    // name = "Bob"; // This will cause an error
    ```

-   **`var`**: The older way of declaring variables. It is function-scoped. It is generally recommended to use `let` and `const` instead.

    ```javascript
    var score = 100;
    ```

---

## 2. Data Types

JavaScript has several primitive data types:

-   **`String`**: A sequence of characters, enclosed in single quotes (`' '`), double quotes (`" "`), or backticks (`` ` ``).

    ```javascript
    let greeting = "Hello, world!";
    let response = 'It\'s a nice day.';
    let dynamic = `Your score is ${score}`;
    ```

-   **`Number`**: Represents both integer and floating-point numbers.

    ```javascript
    let integer = 42;
    let float = 3.14;
    ```

-   **`Boolean`**: Represents `true` or `false`.

    ```javascript
    let isLoggedIn = true;
    let hasPermission = false;
    ```

-   **`null`**: Represents the intentional absence of any object value.

    ```javascript
    let user = null;
    ```

-   **`undefined`**: Represents a variable that has been declared but has not yet been assigned a value.

    ```javascript
    let city;
    console.log(city); // undefined
    ```

-   **`Symbol`**: A unique and immutable primitive value (less common in introductory code).

JavaScript also has a complex data type:

-   **`Object`**: A collection of key-value pairs.

    ```javascript
    let person = {
      firstName: "John",
      lastName: "Doe",
      age: 30
    };
    ```

---

## 3. Operators

### Arithmetic Operators

-   `+` (Addition)
-   `-` (Subtraction)
-   `*` (Multiplication)
-   `/` (Division)
-   `%` (Modulus - remainder of a division)
-   `**` (Exponentiation)

### Comparison Operators

-   `==` (Equal to - performs type coercion)
-   `===` (Strictly equal to - does not perform type coercion)
-   `!=` (Not equal to)
-   `!==` (Strictly not equal to)
-   `>` (Greater than)
-   `<` (Less than)
-   `>=` (Greater than or equal to)
-   `<=` (Less than or equal to)

### Logical Operators

-   `&&` (Logical AND)
-   `||` (Logical OR)
-   `!` (Logical NOT)

---

## 4. Console Output

Use `console.log()` to print messages to the terminal. This is very useful for debugging.

```javascript
console.log("This is a message.");
let myVar = "Some value";
console.log(myVar);
```

---

## 5. Comments

Comments are used to add explanatory notes to your code. They are ignored by the JavaScript engine.

-   **Single-line comment:**

    ```javascript
    // This is a single-line comment
    ```

-   **Multi-line comment:**

    ```javascript
    /*
      This is a
      multi-line comment.
    */
    ```

---

## 6. Type Conversion

-   **`parseInt(string)`**: Converts a string to an integer.

    ```javascript
    let str = "123";
    let num = parseInt(str); // 123
    ```

-   **`parseFloat(string)`**: Converts a string to a floating-point number.

    ```javascript
    let strFloat = "3.14";
    let numFloat = parseFloat(strFloat); // 3.14
    ```

-   **`String(value)`** or `value.toString()`: Converts a value to a string.

    ```javascript
    let num = 100;
    let str = String(num); // "100"
    ```

