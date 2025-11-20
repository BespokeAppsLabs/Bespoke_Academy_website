# Week 4 — Python Logic (If/Else, Conditions)

## 🎯 This Week's Mission
_Master the art of making programs that think and decide! Create an epic "Choose Your Own Adventure" game where every choice leads to a different story path, powered by conditional logic!_

## 🔥 Last Week Showcase
**Game Gallery (5 min):**
- "Who built an amazing number guessing game last week?"
- Quick demos of the most creative games
- Highlight clever AI prompts and unique features
- "Last week your programs started remembering things - this week they'll start thinking and making decisions!"

## 🚀 Today's Hook: The Power of Choice (15 min)

**Live Demo: Interactive Story Magic**
Teacher runs a mini-adventure where choices matter:
```python
print("🌟 You're exploring a mysterious forest...")
choice = input("Do you go LEFT towards the dark cave or RIGHT towards the glowing river? ")

if choice.upper() == "LEFT":
    print("🦇 You discover bats guarding ancient treasure!")
    second_choice = input("Do you approach the bats or run away? ")
    if second_choice.lower() == "approach":
        print("💎 The bats are friendly! They share their treasure with you!")
    else:
        print("🏃 You escape safely but find nothing.")
elif choice.upper() == "RIGHT":
    print("🧚 You meet magical fairies by the river!")
    print("✨ They grant you one wish for being brave!")
else:
    print("🤷 You stand still and a butterfly lands on your nose. Cute, but no adventure!")

print("📖 THE END - Your choices created this story!")
```

**Interactive Demo:** Run the game 2-3 times with different choices to show branching paths
- "See how the story changes based on your decisions?"
- "This is what we're building today - programs that think and react!"

**The Week's Promise:**
*"Today you will:*
- *Teach your programs to make decisions using if/else logic*
- *Create stories with multiple paths and endings*
- *Build games that react intelligently to player choices*
- *Master the skill that makes ALL interactive software possible"*

## 🧠 Concept Discovery: Decision-Making in Code (15 min)

### If/Else: The Brain of Your Program (8 min)

**What are Conditions?**
*"If/else statements are like the brain's decision-making process. If something is true, do one thing. If it's false, do something else."*

**Real-Life Examples:**
- **IF** it's raining, **THEN** bring an umbrella
- **IF** you're hungry, **THEN** eat food, **ELSE** wait until dinner
- **IF** the light is red, **THEN** stop, **ELSE** go

**Code Examples:**
```python
# Simple if
age = 15
if age >= 13:
    print("You can join our coding class!")

# If/else
temperature = 25
if temperature > 30:
    print("It's hot! Wear shorts.")
else:
    print("Perfect weather!")

# If/elif/else (multiple choices)
grade = 85
if grade >= 90:
    print("Excellent! A+")
elif grade >= 80:
    print("Great job! B+")
elif grade >= 70:
    print("Good work! C")
else:
    print("Keep trying! You'll get there!")
```

### Comparison Operators (The Decision Words) (4 min)
```python
# Equal to
if age == 15:
    print("You're exactly 15!")

# Not equal to
if age != 13:
    print("You're not 13!")

# Greater than/less than
if score > 100:
    print("Amazing score!")

# Greater than or equal to
if height >= 6:
    print("You're tall!")

# Combining conditions
if age >= 13 and age <= 18:
    print("You're a teenager!")

if weather == "sunny" or weather == "cloudy":
    print("Good day for outdoor activities!")
```

**Interactive Practice (3 min):**
- Students write simple conditions about their lives
- "Write a condition about your favorite hobby"
- "Create a decision about your weekend plans"

## 🛠️ Hands-On Building: Epic Adventure Game (40 min)

### Activity 1: Story Foundation (15 min)

**Step 1: Plan Your Adventure**
Students choose a theme:
- 🏰 **Fantasy Quest:** Knight saves the kingdom
- 🚀 **Space Adventure:** Explore alien planets
- 🏫 **School Mystery:** Solve campus secrets
- 🐾 **Animal Rescue:** Save lost pets
- 🎮 **Gaming World:** Inside a video game

**Step 2: Build the Core Structure**
```python
import random
import time

# Epic Adventure Game
print("🌟" * 20)
print("  EPIC ADVENTURE QUEST")
print("🌟" * 20)

# Character creation
player_name = input("What is your hero name? ")
print(f"\n⚔️ Welcome, {player_name} the Brave! ⚔️")

print("\nYou arrive at a crossroads in the mystical forest...")
print("🌲 Path A: A glowing magical portal shimmering with blue light")
print("🗿 Path B: An ancient temple covered in mysterious symbols")
print("🌊 Path C: A rushing river with a small boat")

choice = input("Which path do you choose? (A, B, or C): ").upper()

# First major decision
if choice == "A":
    print("\n✨ You step through the magical portal...")
    print("You're transported to a realm of floating islands!")
    portal_choice = input("Do you: 1) Explore the nearest island or 2) Try to find your way back? ")

    if portal_choice == "1":
        print("🏝️ You discover a friendly dragon who gives you a magic sword!")
        has_sword = True
    else:
        print("🔄 The portal shatters behind you! You're stuck in this realm...")
        has_sword = False

elif choice == "B":
    print("\n🗿 You enter the ancient temple...")
    print("Mysterious carvings tell of a legendary treasure!")
    temple_choice = input("Do you: 1) Follow the carvings or 2) Look for traps? ")

    if temple_choice == "1":
        print("🗺️ The carvings lead you to a golden crown!")
        has_crown = True
    else:
        print("🕳️ You find and disable several traps - you're very clever!")
        is_clever = True

elif choice == "C":
    print("\n🌊 You take the boat across the river...")
    print("On the other side, you meet a wise old wizard!")
    wizard_choice = input("Do you: 1) Ask for magical training or 2) Ask about treasure? ")

    if wizard_choice == "1":
        print("🧙 The wizard teaches you powerful spells!")
        has_magic = True
    else:
        print("💰 The wizard gives you a map to hidden treasure!")
        has_map = True

else:
    print("\n🤔 You hesitate too long at the crossroads...")
    print("A mysterious fog rolls in and you must return another day!")
    print("📖 Your adventure ends before it truly began.")

print(f"\n🎭 Chapter 1 Complete, {player_name}!")
print("Your choices have shaped your destiny...")
```

### Activity 2: Add Consequences and Outcomes (15 min)

**Challenge:** "Make your choices matter!"

**AI Prompt for Story Logic:**
```
"Help me expand my adventure game. Add:
1. Inventory system to track items player finds
2. Skills that improve based on choices
3. Different endings based on what player collected
4. Random events that can be good or bad
5. A final challenge that uses everything the player learned"
```

**Enhanced Story Logic:**
```python
# Add to previous game
inventory = []
skills = []

def show_status():
    print(f"\n📊 {player_name}'s Status:")
    print(f"🎒 Inventory: {inventory}")
    print(f"⭐ Skills: {skills}")
    print("-" * 30)

def final_challenge():
    print(f"\n🏰 You reach the castle of the evil overlord!")
    print("A massive guardian blocks your path...")

    # Different ways to win based on items/skills
    if "magic sword" in inventory:
        print("⚔️ You use the magic sword to defeat the guardian!")
        return True
    elif "wizard training" in skills:
        print("🔮 You cast a powerful spell that banishes the guardian!")
        return True
    elif "treasure map" in inventory:
        print("🗺️ The map reveals a secret passage around the guardian!")
        return True
    elif "clever" in skills:
        print("🧠 You outsmart the guardian with a clever trick!")
        return True
    else:
        print("😰 The guardian is too powerful! You must retreat...")
        return False

# Continue from where we left off
if 'has_sword' in locals() and has_sword:
    inventory.append("magic sword")
    print("⚔️ Magic Sword added to inventory!")

if 'has_magic' in locals() and has_magic:
    skills.append("wizard training")
    print("🔮 Wizard Training added to skills!")

show_status()

# More story branches...
```

### Activity 3: Multiple Endings (10 min)

**Create Different Outcomes:**
```python
# Ending logic
def show_ending():
    print(f"\n🎬 EPIC CONCLUSION for {player_name} the Brave:")
    print("=" * 50)

    if len(inventory) >= 3 and len(skills) >= 2:
        print("👑 LEGENDARY HERO ENDING!")
        print("You become the ruler of the realm!")
        print("Your adventures will be told for generations!")
    elif "magic sword" in inventory:
        print("⚔️ WARRIOR HERO ENDING!")
        print("You become the kingdom's greatest protector!")
    elif "wizard training" in skills:
        print("🧙 WISE MAGE ENDING!")
        print("You become a powerful wizard and advisor to the king!")
    elif len(inventory) >= 2:
        print("💰 WEALTHY ADVENTURER ENDING!")
        print("You retire with your treasure and live happily ever after!")
    else:
        print("🌟 BRAVE ADVENTURER ENDING!")
        print("You may not have found treasure, but you gained wisdom and experience!")

    print(f"\n📈 Final Stats: {len(inventory)} items collected, {len(skills)} skills learned")
    print("🎮 Thanks for playing!")

# Run the ending
show_ending()
```

## ✨ Creative Challenge: Story Enhancement (20 min)

### Advanced Story Features (12 min)
**Students Choose 2-3 Enhancements:**

**Interactive Elements:**
- **Character Stats:** Health, magic, experience points
- **Puzzle Solving:** Riddles that players must solve
- **Combat System:** Simple battles with dice rolls
- **NPCs:** Non-player characters to talk to

**Story Depth:**
- **Backstory Elements:** Why is the hero on this quest?
- **Moral Choices:** Help villagers vs. pursue treasure
- **Hidden Paths:** Secret areas only visible with certain items
- **Time Effects:** Things change if you take too long

**AI Enhancement Prompts:**
```
"Help me add a combat system to my adventure game. Include:
- Health points and attack power
- Simple dice-roll battles
- Different enemies with different difficulty
- Rewards for winning battles"
```

### Polish and Presentation (8 min)
**Final Touches:**
- Add dramatic pauses with `time.sleep(2)`
- Include ASCII art for important scenes
- Create a title screen with character selection
- Add sound effect suggestions (even if just text like "*BANG!*")

## 🎉 Show & Tell: Adventure Showcase (15 min)

### Story Reading Party (10 min)
- Students share their favorite story path
- "What's the most interesting choice in your game?"
- Demonstrate different endings
- Vote for "Most Creative Story," "Most Choices," "Best Ending"

### Design Discussion (5 min)
- "Which if/else structure was most challenging to build?"
- "How did you make your choices feel meaningful?"
- Share tips for writing good adventure branches

## 🔮 Next Week Preview: Working with Files

**The Teaser:**
*"Next week, we're going to teach our programs to remember things even after they close! You'll create projects that can save player progress, store high scores, and even read/write documents. Imagine creating a game that saves your character's level and items, then loads them back next time you play!"*

**Demo Preview:** Quick demo of a program that saves a story to a file and then reads it back

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete adventure game with branching story
✅ At least 3 different story paths
✅ Multiple endings based on player choices
✅ If/else/elif logic structures working
✅ Creative story elements and themes

### Success Criteria:
🎯 **Adventure Game with Multiple Story Paths**
🎯 **Working If/Else/If Logic for Decision Making**
🎯 **At Least 3 Different Endings**
🎯 **Player Choices That Actually Matter**
🎯 **Creative Story Theme and Elements**

## 🏆 Weekly Achievement Badge: **Logic Master**
*"You've mastered conditional logic and program decision-making! Your adventure game proves you can create interactive stories that think and respond."*

**Real-World Connection:** "The if/else logic you learned today runs EVERY interactive application! Video games use it for character decisions, websites use it for user interactions, and even your phone's camera uses it to decide when to focus. You're learning the fundamental building blocks of all intelligent software!"

## 📚 Extension Activities (Optional Homework)

### For Story Writers:
- **Extended Adventure:** Add 5 more story branches to your game
- **Character Development:** Add stats that change based on choices
- **Dialogue System:** Create conversations with characters
- **Illustrations:** Add ASCII art for important scenes

### For Game Designers:
- **Save System:** Research how to save game progress to files
- **Sound Integration:** Look into adding sound effects to Python games
- **Graphics:** Explore simple graphics libraries for visual elements
- **Multiplayer:** Design a two-player adventure mode

### Challenge Problem:
*"Can you create an adventure game that learns from the player? Maybe the story changes based on previous choices, or the game remembers things the player did earlier and references them later?"*

---

**Teacher Notes:**
- Use flowcharts on the board to visualize story branches
- Encourage creativity and unique story themes
- Have a "story prompt jar" for students who need ideas
- Celebrate complex logic and nested if/else structures
- Keep examples of great story branches for inspiration