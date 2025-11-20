

# Cheat Sheet: Python Basics

This cheat sheet gives a simple and friendly overview of Python basics for beginners.  
It is designed for students learning to build AI-powered projects quickly without deep syntax knowledge.

---

## 1. What is Python?

Python is one of the easiest programming languages to learn.  
It is used in:
- AI & Machine Learning  
- Data Science  
- Web Development  
- Robotics  
- Automation  

Python files use **.py**

---

## 2. Variables

You don’t need to specify types in Python.

```python
age = 15
name = "John"
is_student = True
height = 1.72
```

---

## 3. Basic Data Types

### **String**
```python
message = "Hello!"
```

### **Integer**
```python
count = 10
```

### **Float**
```python
price = 12.99
```

### **Boolean**
```python
is_active = False
```

### **List**
```python
numbers = [1, 2, 3]
names = ["Alice", "Bob"]
```

### **Dictionary (Object)**
```python
user = {
    "name": "Sarah",
    "age": 17
}
```

### **None (Python’s null)**
```python
nothing = None
```

---

## 4. Operators

### **Math**
```python
5 + 3
8 - 2
4 * 2
10 / 3
10 // 3   # integer division
2 ** 3    # exponent
```

### **Comparison**
```python
a == b
a != b
a > b
a < b
```

### **Logical**
```python
and
or
not
```

---

## 5. Printing Output

```python
print("Hello, world!")
print(age)
```

---

## 6. Comments

### Single-line
```python
# This is a comment
```

### Multi-line
```python
"""
This is a
multi-line comment
"""
```

---

## 7. Conditional Statements

```python
age = 16

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")
```

---

## 8. Loops

### **For Loop**
```python
for i in range(5):
    print(i)
```

### **While Loop**
```python
count = 0
while count < 3:
    print(count)
    count += 1
```

---

## 9. Functions

```python
def greet(name):
    return f"Hello, {name}"

print(greet("Liam"))
```

---

## 10. Classes

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def info(self):
        return f"{self.name} is in grade {self.grade}"

s = Student("Emma", 10)
print(s.info())
```

---

## 11. Importing Libraries

```python
import math
print(math.sqrt(16))
```

AI/ML libraries students may see later:
```python
import numpy as np
import pandas as pd
import torch
```

---

## 12. Errors (Common Examples)

### Wrong Indentation
```python
if True:
print("Hi")  # ❌ ERROR
```

### Wrong Name
```python
prit("hello")  # ❌ NameError
```

### Wrong Type
```python
age = "15"
print(age + 5)  # ❌ TypeError
```

---

## Summary

Python is:
- Easy to read  
- Beginner-friendly  
- Very powerful for AI  
- Used in real-world systems  

You will use these basics to build AI, automation, robotics, and web projects throughout the course.

---