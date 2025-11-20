# Cheat Sheet: TypeScript Basics

This cheat sheet provides a quick and simple overview of the fundamental TypeScript concepts you will use during the course. It is designed for beginners and focuses on clarity and simple examples.

---

## 1. What is TypeScript?

TypeScript is JavaScript **with types**.  
It helps catch errors early and makes code easier to understand.

- TypeScript files use **.ts** or **.tsx**
- Code is still JavaScript, but with extra safety features

---

## 2. Variables

In TypeScript, you normally use `let` and `const`, just like JavaScript — but with **types**.

### Basic syntax:
```ts
let age: number = 15;
const name: string = "John";
let isActive: boolean = true;
```

### Type Inference  
TypeScript can guess the type for you:

```ts
let score = 90; // TypeScript infers this is a number
```

---

## 3. Basic Types

### **String**
```ts
let message: string = "Hello!";
```

### **Number**
```ts
let rating: number = 4.5;
```

### **Boolean**
```ts
let isStudent: boolean = true;
```

### **Array**
```ts
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];
```

### **Any**  
Avoid when possible.
```ts
let something: any = "Could be anything";
```

### **Union Types**
Allows a variable to have multiple types.
```ts
let id: number | string = 42;
id = "A123";
```

---

## 4. Objects

```ts
let user: { name: string; age: number } = {
  name: "Sarah",
  age: 17,
};
```

---

## 5. Interfaces

Interfaces describe the structure of an object.

```ts
interface Person {
  name: string;
  age: number;
  isStudent?: boolean; // optional
}

let person: Person = {
  name: "Jake",
  age: 16,
};
```

---

## 6. Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Arrow Functions
```ts
const greet = (name: string): string => {
  return `Hello, ${name}`;
};
```

---

## 7. Classes

Classes let us create reusable objects and logic.

```ts
class Student {
  name: string;
  grade: number;

  constructor(name: string, grade: number) {
    this.name = name;
    this.grade = grade;
  }

  getInfo(): string {
    return `${this.name} is in grade ${this.grade}`;
  }
}

const s1 = new Student("Emma", 10);
```

---

## 8. Enums

Useful for fixed sets of values.

```ts
enum Role {
  Student,
  Teacher,
  Admin,
}

let userRole: Role = Role.Student;
```

---

## 9. Type Aliases

```ts
type ID = number | string;

let studentId: ID = 123;
```

---

## 10. Generics (Simple Example)

Generics let you create flexible, reusable functions.

```ts
function wrap<T>(value: T): T[] {
  return [value];
}

const result = wrap<number>(5); // [5]
```

---

## 11. Type Narrowing

TypeScript checks the type **at runtime** when you use conditions.

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

---

## 12. Common Errors

### Missing Type
```ts
let x: number;
x = "hello"; // ❌ Error
```

### Wrong Return Type
```ts
function multiply(a: number, b: number): number {
  return "wrong"; // ❌ Error
}
```

---

## Summary

TypeScript helps you:
- Write safer code  
- Understand your own code better  
- Catch mistakes early  
- Build big projects more easily  

You’ll use these basics throughout the course when building AI-powered projects.

---
