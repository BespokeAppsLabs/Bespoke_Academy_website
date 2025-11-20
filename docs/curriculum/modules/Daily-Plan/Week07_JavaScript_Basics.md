# Week 7 — JavaScript Basics (with AI)

## 🎯 This Week's Mission
_Become a web interactivity expert! Master JavaScript programming to create interactive buttons, alerts, animations, and dynamic content that makes your websites feel alive and responsive to every user action!_

## 🔥 Last Week Showcase
**Website Launch Party (5 min):**
- "Who built an amazing personal website last week?"
- Quick demos of student landing pages with HTML, CSS, and JavaScript
- Highlight unique themes, personalizations, and interactive features
- "Last week you learned to build websites - this week you'll learn to make them truly interactive and alive!"

## 🚀 Today's Hook: The Power of Interactivity (15 min)

**Live Demo: The Magic Interactive Card**
Teacher shows the transformation:

**Static HTML Card:**
```html
<div class="card">
    <h3>About Me</h3>
    <p>I'm a 15-year-old coder</p>
    <button>Click Me</button>
</div>
```

**Interactive JavaScript-Powered Card (after transformation):**
- Button that counts clicks and changes colors
- Card that flips when hovered
- Dynamic content that loads user information
- Animations and transitions triggered by user actions

**The Wow Moment:** Teacher demonstrates how the same card becomes interactive with JavaScript
- "See how this static website now responds to everything you do?"
- "This interactivity is what separates amazing websites from boring ones!"

**The Week's Promise:**
*"Today you will:*
- *Master JavaScript programming for web interactivity*
- *Create interactive elements that respond to user actions*
- *Build animations, form validation, and dynamic content*
- *Learn the skills that power modern web applications"*

## 🧠 Concept Discovery: JavaScript Fundamentals (15 min)

### Variables and Data Types in JavaScript (5 min)
**JavaScript Variables:**
```javascript
// Different ways to declare variables
let name = "Sarah";           // Can change later
const age = 15;              // Cannot change (constant)
var hobby = "coding";        // Older way, avoid using

// Different data types
let text = "Hello World";    // String (text)
let number = 42;             // Number
let isLearning = true;       // Boolean (true/false)
let nothing = null;          // Null (empty value)
let list = ["item1", "item2"]; // Array
let person = {               // Object
    name: "Alex",
    age: 16
};

// Template literals (modern string formatting)
let message = `Hi, I'm ${name} and I'm ${age} years old!`;
```

### Functions: Reusable Code Blocks (5 min)
**JavaScript Functions:**
```javascript
// Function declaration
function greetPerson(name) {
    return `Hello, ${name}! Welcome to my website!`;
}

// Function expression
const calculateAge = (birthYear) => {
    return 2024 - birthYear;
};

// Using functions
console.log(greetPerson("Maria"));      // "Hello, Maria! Welcome to my website!"
console.log(calculateAge(2008));         // 16

// Functions with no parameters
function showWelcomeMessage() {
    alert("Welcome to my amazing website!");
}

// Functions with multiple parameters
function calculateScore(correct, total) {
    let percentage = (correct / total) * 100;
    return `You scored ${percentage.toFixed(1)}%`;
}
```

### DOM Manipulation: Talking to Web Pages (5 min)
**What is the DOM?**
*"The DOM (Document Object Model) is like a map of your web page that JavaScript can read and modify. It's how your code talks to HTML elements."*

**DOM Selection and Modification:**
```javascript
// Select elements (different methods)
let element1 = document.getElementById('myId');           // By ID
let elements2 = document.getElementsByClassName('myClass'); // By class
let elements3 = document.getElementsByTagName('p');         // By tag name
let element4 = document.querySelector('.mySelector');     // CSS selector

// Modify content
element1.innerHTML = "New content!";
element1.textContent = "Just text, no HTML";

// Modify styles
element1.style.color = "blue";
element1.style.backgroundColor = "#ffff00";
element1.style.fontSize = "20px";

// Add/remove classes
element1.classList.add('active');
element1.classList.remove('hidden');
element1.classList.toggle('highlight');
```

## 🛠️ Hands-On Building: Interactive Web Card (40 min)

### Activity 1: Basic Interactive Card Structure (15 min)

**Step 1: HTML Foundation**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Web Card</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .card {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 400px;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .profile-img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
        }

        .btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
            transition: all 0.3s ease;
            font-size: 16px;
        }

        .btn:hover {
            background: #45a049;
            transform: scale(1.05);
        }

        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }

        .stat-box {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 10px;
            transition: background 0.3s ease;
        }

        .stat-box:hover {
            background: #e0e0e0;
        }

        .message {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            min-height: 50px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="profile-img" id="profileIcon">👤</div>
        <h2 id="userName">Your Name</h2>
        <p id="userTitle">Your Title</p>

        <div class="stats">
            <div class="stat-box">
                <h3 id="clickCount">0</h3>
                <p>Clicks</p>
            </div>
            <div class="stat-box">
                <h3 id="visitCount">1</h3>
                <p>Visits</p>
            </div>
        </div>

        <div class="message" id="messageBox"></div>

        <button class="btn" onclick="sayHello()">Say Hello</button>
        <button class="btn" onclick="changeColor()">Change Color</button>
        <button class="btn" onclick="tellJoke()">Tell Joke</button>
        <button class="btn" onclick="flipCard()">Flip Card</button>
    </div>

    <script>
        // Your JavaScript will go here
    </script>
</body>
</html>
```

### Activity 2: JavaScript Interactivity with AI (15 min)

**Challenge:** "Add dynamic JavaScript functionality to make the card truly interactive!"

**AI Prompt for JavaScript Features:**
```
"Help me add JavaScript functionality to my interactive web card. Include:
1. Click counter that updates when buttons are clicked
2. Color change functionality for the card background
3. Random joke display function
4. Card flip animation
5. Local storage to remember visit count
6. Personal greeting based on time of day
7. Hover effects and animations
Make it fun and engaging for teenagers!"
```

**Enhanced JavaScript Implementation:**
```javascript
// Global variables
let clicks = 0;
let visits = 1;
let isFlipped = false;
let colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'];
let currentColorIndex = 0;

// Load saved data on page load
window.onload = function() {
    // Load visit count from local storage
    let savedVisits = localStorage.getItem('cardVisits');
    if (savedVisits) {
        visits = parseInt(savedVisits);
    }
    updateVisitCount();

    // Set personalized greeting based on time
    setGreeting();

    // Set random initial color
    changeColor();
};

function setGreeting() {
    let name = prompt("What's your name?") || "Friend";
    let hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    document.getElementById('userName').textContent = name;
    document.getElementById('userTitle').textContent = `${greeting}! 👋`;
}

function sayHello() {
    clicks++;
    updateClickCount();

    let name = document.getElementById('userName').textContent;
    let messages = [
        `Hello ${name}! Thanks for visiting! 🎉`,
        `Hi there ${name}! You're awesome! ⭐`,
        `Hey ${name}! Keep being amazing! 💪`,
        `${name}, you're doing great! 🌟`
    ];

    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showMessage(randomMessage, '#e3f2fd');
}

function changeColor() {
    clicks++;
    updateClickCount();

    let card = document.querySelector('.card');
    currentColorIndex = (currentColorIndex + 1) % colors.length;

    // Animate color change
    card.style.transition = 'background-color 0.5s ease';
    card.style.backgroundColor = colors[currentColorIndex];

    showMessage(`Color changed! Current visits: ${visits}`, '#fff3e0');
}

function tellJoke() {
    clicks++;
    updateClickCount();

    let jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
        "Why don't scientists trust atoms? Because they make up everything! ⚛️",
        "Why did the computer go to the doctor? It had a virus! 🤒",
        "What do you call a fake noodle? An impasta! 🍝"
    ];

    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    showMessage(randomJoke, '#f3e5f5');
}

function flipCard() {
    clicks++;
    updateClickCount();

    let card = document.querySelector('.card');

    if (!isFlipped) {
        card.style.transform = 'rotateY(180deg)';
        card.innerHTML = `
            <div style="transform: rotateY(180deg);">
                <h2>🎉 Back of Card!</h2>
                <p>This is the back side of your interactive card!</p>
                <p>You've clicked ${clicks} times!</p>
                <p>You've visited ${visits} times!</p>
                <button class="btn" onclick="flipCard()">Flip Back</button>
            </div>
        `;
        isFlipped = true;
    } else {
        location.reload(); // Reset to original state
    }
}

function updateClickCount() {
    document.getElementById('clickCount').textContent = clicks;

    // Add animation when counter updates
    let clickElement = document.getElementById('clickCount');
    clickElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        clickElement.style.transform = 'scale(1)';
    }, 200);
}

function updateVisitCount() {
    visits++;
    localStorage.setItem('cardVisits', visits);
    document.getElementById('visitCount').textContent = visits;
}

function showMessage(text, bgColor) {
    let messageBox = document.getElementById('messageBox');
    messageBox.textContent = text;
    messageBox.style.backgroundColor = bgColor;
    messageBox.style.display = 'block';

    // Animate message appearance
    messageBox.style.opacity = '0';
    messageBox.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        messageBox.style.transition = 'all 0.3s ease';
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';
    }, 100);

    // Hide message after 5 seconds
    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 300);
    }, 5000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'h':
            sayHello();
            break;
        case 'c':
            changeColor();
            break;
        case 'j':
            tellJoke();
            break;
        case 'f':
            flipCard();
            break;
    }
});
```

### Activity 3: Advanced JavaScript Features (10 min)

**Choose Your Enhancement:**

**Option A: Form Validation**
```javascript
// Add to card HTML:
/*
<div id="contactForm" style="display:none; margin-top:20px;">
    <h3>Contact Me</h3>
    <input type="email" id="emailInput" placeholder="Your email" style="margin:5px; padding:8px; border-radius:5px; border:1px solid #ccc;">
    <br>
    <textarea id="messageInput" placeholder="Your message" style="margin:5px; padding:8px; border-radius:5px; border:1px solid #ccc; width:200px; height:80px;"></textarea>
    <br>
    <button class="btn" onclick="submitForm()">Send Message</button>
</div>
<button class="btn" onclick="toggleContactForm()">Contact Me</button>
*/

function toggleContactForm() {
    let form = document.getElementById('contactForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function submitForm() {
    let email = document.getElementById('emailInput').value;
    let message = document.getElementById('messageInput').value;

    if (!email.includes('@')) {
        showMessage('Please enter a valid email address! 📧', '#ffebee');
        return;
    }

    if (message.length < 5) {
        showMessage('Message must be at least 5 characters long! ✍️', '#ffebee');
        return;
    }

    showMessage(`Message sent! (Demo mode - email: ${email}) 📨`, '#e8f5e8');
    document.getElementById('emailInput').value = '';
    document.getElementById('messageInput').value = '';
}
```

**Option B: Animation System**
```javascript
// Add to existing CSS
/*
.card.dancing {
    animation: dance 2s ease-in-out;
}

@keyframes dance {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-10px) rotate(-5deg); }
    75% { transform: translateX(10px) rotate(5deg); }
}
*/

function startDance() {
    clicks++;
    updateClickCount();

    let card = document.querySelector('.card');
    card.classList.add('dancing');

    showMessage('💃 Dancing card! 💃', '#fffbf0');

    setTimeout(() => {
        card.classList.remove('dancing');
    }, 2000);
}
```

## ✨ Creative Challenge: Interactive Enhancement (20 min)

### Advanced JavaScript Features (12 min)
**Students Choose 2-3 Enhancements:**

**Interactive Elements:**
- **Drag and Drop:** Make elements draggable around the page
- **Keyboard Controls:** Add keyboard shortcuts for all functions
- **Sound Effects:** Add audio feedback for interactions
- **Particle Effects:** Create animated particles on click

**Data Features:**
- **Weather Display:** Show current weather using free API
- **Random Quote Generator:** Display inspirational quotes
- **Todo List:** Add a mini todo list to the card
- **Timer/Stopwatch:** Add time tracking functionality

**AI Enhancement Prompts:**
```
"Help me add drag and drop functionality to my interactive card. I want:
- Elements that can be dragged around the page
- Snap-to-grid positioning for neat arrangement
- Visual feedback during dragging
- Position saving in local storage"
```

### Personalization and Polish (8 min)
**Final Touches:**
- Add personal interests and hobbies to content
- Customize colors and animations to match personality
- Add social media links or contact information
- Create personalized messages based on user input

## 🎉 Show & Tell: Interactive Card Showcase (15 min)

### Interactive Demonstration (10 min)
- Students present their interactive cards
- Demonstrate all button functions and animations
- Show advanced features like form validation or animations
- "What's your favorite interactive feature you built?"

### JavaScript Discussion (5 min)
- "How was JavaScript different from Python?"
- "What types of interactive websites would you like to build?"
- Discuss real-world applications of JavaScript

## 🔮 Next Week Preview: APIs and External Data

**The Teaser:**
*"Next week, we're going to connect our websites to the entire internet! You'll learn how to use APIs to pull in live data like weather, news, or random facts. Imagine building a website that shows real-time weather, displays the latest sports scores, or generates random jokes from the internet!"*

**Demo Preview:** Quick demo of a weather app that pulls real data from a weather API

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete interactive web card with HTML, CSS, and JavaScript
✅ Multiple interactive buttons and functions
✅ Animations and dynamic content
✅ Local storage for data persistence
✅ Advanced features (forms, validation, animations, etc.)

### Success Criteria:
🎯 **Interactive Web Card with Multiple JavaScript Functions**
🎯 **Working Buttons That Trigger Different Actions**
🎯 **Animations and Dynamic Content Updates**
🎯 **Data Persistence Using Local Storage**
🎯 **Advanced Interactive Features Implemented**

## 🏆 Weekly Achievement Badge: **JavaScript Expert**
*"You've mastered JavaScript web interactivity! Your interactive card proves you can create dynamic, responsive websites that respond to every user action."*

**Real-World Connection:** "The JavaScript skills you learned today power almost every modern website! Social media feeds that update automatically, shopping carts that calculate totals, forms that validate in real-time, and animations that respond to user interactions - all powered by JavaScript just like you used today!"

## 📚 Extension Activities (Optional Homework)

### For Future Web Developers:
- **Mini Game:** Create a simple browser-based game using JavaScript
- **Calculator App:** Build a working calculator with full functionality
- **Quiz App:** Create an interactive quiz with scoring system
- **Weather App:** Use a weather API to display real weather data

### Online Resources:
- **JavaScript.info:** Comprehensive JavaScript tutorial
- **MDN JavaScript Guide:** Official Mozilla documentation
- **FreeCodeCamp JavaScript:** Free interactive JavaScript course
- **CodeWars:** JavaScript coding challenges and problems

### Challenge Problem:
*"Can you create a multi-page interactive experience? Maybe a card that can switch between different 'pages' or modes, each with different interactive features?"*

---

**Teacher Notes:**
- Use browser developer tools to show students how JavaScript works in real websites
- Emphasize the event-driven nature of JavaScript (responding to user actions)
- Have backup code snippets for students who get stuck with specific functions
- Celebrate creative interactive features and unique personalizations
- Take screenshots of working interactive cards for class portfolio