# Week 3 — Python Basics (Variables, Input, Output)

## 🎯 This Week's Mission
_Become a Python programmer by mastering variables, input/output, and create an AI-assisted number guessing game that adapts to the player's skill level!_

## 🔥 Last Week Showcase
**Tool Tournament (5 min):**
- "Who built the most amazing calculator or game last week?"
- Quick demos of student-created tools
- Celebrate unique features and creative problem-solving
- "Last week you learned to command AI - this week you'll command Python directly!"

## 🚀 Today's Hook: The Magic of Variables (15 min)

**Live Demo: The Memory Game**
Teacher shows a program that:
```python
name = input("What's your name? ")
favorite_color = input("What's your favorite color? ")
favorite_number = input("What's your favorite number? ")

print(f"\n🎉 Hello {name}! 🎉")
print(f"Since you love {favorite_color}, I created a {favorite_color} program just for you!")
print(f"Your lucky number {favorite_number} means you're going to be an amazing programmer!")
```

**Interactive Demo:** Teacher calls on students and runs the program with their actual answers
- "See how the program remembers what each person said?"
- "This is the magic of variables - they're like memory boxes for your programs!"

**The Week's Promise:**
*"Today you will:*
- *Learn to make programs that remember information*
- *Create programs that talk to users and respond to them*
- *Build a number guessing game that feels like it has a personality*
- *Master the fundamental building blocks of ALL programming"*

## 🧠 Concept Discovery: Python Building Blocks (15 min)

### Variables: Your Program's Memory (8 min)
**What are Variables?**
*"Variables are like labeled boxes where you store information. Once you put something in a box, your program can remember it forever!"*

**Live Examples:**
```python
# Storing text
student_name = "Sarah"
favorite_subject = "Coding"

# Storing numbers
age = 15
grade_level = 9
height = 5.7

# Storing yes/no (boolean)
loves_coding = True
is_tired = False
```

**Fun Memory Game (3 min):**
Teacher calls out variables and students shout out what's stored:
- "What's in student_name?" → Students: "Sarah!"
- "What's in age?" → Students: "15!"

### Input & Output: Talking to Your Program (7 min)

**Input (Listening):**
```python
name = input("What's your name? ")  # Program listens
age = input("How old are you? ")    # Program remembers
```

**Output (Speaking):**
```python
print(f"Hello {name}!")             # Program talks back
print(f"You're {age} years young!") # Program uses what it learned
```

**Interactive Practice:**
- Students type simple input/output examples
- "Make the program ask for favorite food and print something funny about it"

## 🛠️ Hands-On Building: Number Guessing Game with AI (40 min)

### Activity 1: Build the Basic Game Framework (15 min)

**Step 1: The Core Structure**
```python
# Number Guessing Game
import random

secret_number = random.randint(1, 100)
print("🎮 Welcome to the Number Guessing Game! 🎮")
print("I'm thinking of a number between 1 and 100.")

# Get player's name
player_name = input("What's your name? ")
print(f"Hi {player_name}! Let's play!")

# First guess
guess = input("What's your first guess? ")
guess = int(guess)  # Convert text to number

if guess == secret_number:
    print("🎉 AMAZING! You got it on the first try!")
elif guess < secret_number:
    print("📈 Too low! Try a higher number.")
else:
    print("📉 Too high! Try a lower number.")
```

**Teacher-Guided Building:**
- Type code line by line together
- Explain each part as you go
- Students run after each section to see progress

### Activity 2: Add Game Intelligence with AI (15 min)

**Challenge:** "Make your game smarter and more fun!"

**AI Prompt for Enhancements:**
```
"Help me make my number guessing game better. Add:
1. Keep track of how many guesses the player makes
2. Give hints that get warmer or colder
3. Add encouraging messages based on how well they're doing
4. Make it ask if they want to play again
5. Add a scoring system"
```

**Expected AI-Generated Code:**
```python
import random

def play_game():
    secret_number = random.randint(1, 100)
    guesses = 0
    max_guesses = 7

    print(f"\n🎮 Welcome {player_name}! I'm thinking of a number between 1 and 100.")
    print(f"You have {max_guesses} guesses to find it!")

    while guesses < max_guesses:
        guess = input(f"\nGuess #{guesses + 1}: ")
        guess = int(guess)
        guesses += 1

        if guess == secret_number:
            if guesses == 1:
                print("🏆 INCREDIBLE! You're a mind reader! First guess!")
            elif guesses <= 3:
                print("🌟 AMAZING! You're really good at this!")
            elif guesses <= 5:
                print("👏 Great job! You found it!")
            else:
                print("✅ Nice work! You got it!")
            return guesses
        elif guess < secret_number:
            difference = secret_number - guess
            if difference > 20:
                print("❄️ Too low! Much higher!")
            elif difference > 10:
                print("🧊 Too low! Higher!")
            elif difference > 5:
                print("🌡️ Getting warmer! A bit higher!")
            else:
                print("🔥 Very close! Just a little higher!")
        else:
            difference = guess - secret_number
            if difference > 20:
                print("☀️ Too high! Much lower!")
            elif difference > 10:
                print("🔥 Too high! Lower!")
            elif difference > 5:
                print("🌡️ Getting warmer! A bit lower!")
            else:
                print("❄️ Very close! Just a little lower!")

    print(f"\n😢 Game over! The number was {secret_number}.")
    return max_guesses

# Game loop
while True:
    player_name = input("\nWhat's your name? ")
    guesses_used = play_game()

    play_again = input("Do you want to play again? (yes/no): ")
    if play_again.lower() != 'yes':
        print(f"\nThanks for playing, {player_name}! 🎮")
        break
```

### Activity 3: Personalize Your Game (10 min)

**Choose Your Enhancements:**

**Option 1: Themed Game**
```
"AI, help me make my number guessing game space-themed.
Replace numbers with planets, add space facts, make it educational!"
```

**Option 2: Competitive Mode**
```
"Make my game keep track of high scores and let players compete."
```

**Option 3: Story Mode**
```
"Turn my game into a story where finding numbers unlocks adventure parts."
```

## ✨ Creative Challenge: Game Customization (20 min)

### Advanced Features Challenge (10 min)
**Students Choose 2-3 Enhancements:**

**Visual Enhancements:**
- Add colors and emojis using AI
- Create ASCII art for game elements
- Design a cool title screen

**Gameplay Enhancements:**
- Difficulty levels (Easy: 1-50, Hard: 1-1000)
- Time limits for expert players
- Power-ups or hints system
- Multiplayer mode

**AI Personality:**
- Make the game tell jokes
- Add different difficulty levels with different "personalities"
- Create achievements or badges

### AI Prompt Engineering Practice (10 min)
**Advanced Prompt Writing:**
Students craft detailed prompts for their perfect game:

```
"Help me create a number guessing game that:
- Has a [theme] with related emojis and colors
- Includes [specific gameplay feature]
- Tells [type of jokes or facts] between rounds
- Has [scoring system]
- Appeals to [age group] players"
```

## 🎉 Show & Tell: Game Developer Showcase (15 min)

### Playtesting Party (10 min)
- Students pair up and play each other's games
- "What's the coolest feature in your friend's game?"
- Vote for "Most Creative Game," "Hardest Game," "Funniest Game"

### Prompt Sharing (5 min)
- "Share your best AI prompt that generated amazing code"
- Discuss what made certain prompts work better
- Create a class "prompt library" for future reference

## 🔮 Next Week Preview: Logic and Decision Making

**The Teaser:**
*"Next week, we're going to teach our programs to think and make decisions! You'll create 'Choose Your Own Adventure' games where the story changes based on player choices. Your programs will become interactive stories that feel alive! Plus, you'll learn how to make programs that can react to different situations automatically!"*

**Demo Preview:** Quick glimpse of an interactive adventure story where choices lead to different outcomes

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Working number guessing game
✅ AI prompts used for enhancements
✅ List of game features you've added
✅ Ideas for your adventure game next week

### Success Criteria:
🎯 **Number Guessing Game Working with Full Gameplay**
🎯 **At Least 3 Custom Features Added**
🎯 **Variables Used to Store Game State**
🎯 **Input/Output Working Correctly**
🎯 **AI Prompt Skills Demonstrated**

## 🏆 Weekly Achievement Badge: **Variable Master**
*"You've mastered variables and program memory! Your number guessing game proves you can create interactive programs that think and respond."*

**Real-World Connection:** "The variable skills you learned today are used in EVERY computer program! Apps like Instagram use variables to store your username, posts, and likes. Games use variables for scores, lives, and player positions. You're learning the building blocks of all software!"

## 📚 Extension Activities (Optional Homework)

### For Game Developers:
- **Story Mode:** Turn your guessing game into an adventure story
- **Multiplayer:** Add support for two players taking turns
- **Statistics:** Track win rates, average guesses, improvement over time
- **Sound Effects:** Research how to add sound to your game

### Online Resources:
- **Python Variables Tutorial:** In-depth variable practice
- **Interactive Python Exercises:** Hands-on coding challenges
- **Game Development with Python:** Beginner-friendly game programming

### Challenge Problem:
*"Can you create a number guessing game that learns from the player? Maybe it gets easier or harder based on how well the player is doing?"*

---

**Teacher Notes:**
- Use lots of analogies for variables (memory boxes, labeled containers)
- Celebrate every working feature, no matter how small
- Have backup code snippets ready for students who get stuck
- Encourage peer debugging and problem-solving
- Take screenshots of creative games for class portfolio