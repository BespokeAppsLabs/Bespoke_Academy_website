# Week 5 — Python + Files (Reading/Writing Simple Files)

## 🎯 This Week's Mission
_Master the art of making programs that remember things forever! Create a powerful note-taking app that saves your thoughts, lists, and ideas to files that persist even after the program closes!_

## 🔥 Last Week Showcase
**Adventure Story Festival (5 min):**
- "Who created an epic adventure game last week?"
- Quick demos of the most interesting story branches
- Highlight clever if/else logic and multiple endings
- "Last week your programs learned to think and make decisions - this week they'll learn to remember things forever!"

## 🚀 Today's Hook: The Power of Persistence (15 min)

**Live Demo: The Memory Program**
Teacher shows a program that saves and remembers:
```python
# First run
print("📝 Memory Book v1.0")
thought = input("What's on your mind today? ")
with open("my_thoughts.txt", "w") as file:
    file.write(thought)
print("✅ Your thought has been saved forever!")

# Later - Reading it back
print("\n📖 Reading your saved thoughts...")
with open("my_thoughts.txt", "r") as file:
    saved_thought = file.read()
print(f"You wrote: {saved_thought}")
```

**Interactive Demo:** Teacher saves a class thought, closes the program, then reopens it to show the thought is still there
- "See how the computer remembered what we wrote even after we closed the program?"
- "This is how ALL apps save your work - games save progress, notes apps save your ideas!"

**The Week's Promise:**
*"Today you will:*
- *Learn to make programs that save information to files*
- *Create a personal note-taking app that never forgets*
- *Build tools that can store lists, diaries, and creative writing*
- *Master the skill that makes data storage and persistence possible"*

## 🧠 Concept Discovery: File Operations (15 min)

### Files: Your Program's Memory Palace (8 min)

**What are Files?**
*"Files are like digital notebooks where your programs can write down information and read it back later. Unlike variables (which forget when the program closes), files remember forever!"*

**Real-Life Examples:**
- **Google Docs:** Saves your writing to a file on their servers
- **Video Games:** Save progress and high scores to files
- **Phone Apps:** Store settings and photos to files
- **School Work:** Documents and assignments are files

**File Operations:**
```python
# Writing to a file (saving)
with open("myfile.txt", "w") as file:  # "w" means write
    file.write("Hello, file world!")
    file.write("\nThis is a new line!")

# Reading from a file (loading)
with open("myfile.txt", "r") as file:  # "r" means read
    content = file.read()
    print(content)

# Appending to a file (adding more)
with open("myfile.txt", "a") as file:  # "a" means append
    file.write("\nThis line was added later!")
```

### File Modes Explained (4 min)
```python
# "w" - Write mode (creates new file or overwrites existing)
with open("diary.txt", "w") as file:
    file.write("Dear diary, today was amazing!")

# "r" - Read mode (reads existing file, error if file doesn't exist)
with open("diary.txt", "r") as file:
    diary_entry = file.read()

# "a" - Append mode (adds to end of existing file)
with open("diary.txt", "a") as file:
    file.write("\nPS: Tomorrow will be even better!")
```

**Interactive Practice (3 min):**
- Students practice writing simple messages to files
- "Write a joke to a file, then read it back"
- "Save your favorite food to a file"

## 🛠️ Hands-On Building: Ultimate Note-Taking App (40 min)

### Activity 1: Basic Note Taker (15 min)

**Step 1: Core Structure**
```python
import os
from datetime import datetime

# Ultimate Note Taker
print("📝" * 20)
print("  ULTIMATE NOTE TAKER")
print("📝" * 20)

def save_note():
    """Save a new note to file"""
    print("\n📄 Create New Note")
    title = input("Give your note a title: ")
    content = input("Write your note: ")

    # Create filename from title (safe for files)
    safe_title = title.replace(" ", "_").lower()
    filename = f"notes/{safe_title}.txt"

    # Create notes directory if it doesn't exist
    if not os.path.exists("notes"):
        os.makedirs("notes")

    # Save note with timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    note_content = f"Title: {title}\nDate: {timestamp}\n\n{content}\n{'='*50}"

    with open(filename, "w") as file:
        file.write(note_content)

    print(f"✅ Note '{title}' saved successfully!")

def read_note():
    """Read an existing note"""
    print("\n📖 Read Note")
    safe_title = input("Enter note title to read: ").replace(" ", "_").lower()
    filename = f"notes/{safe_title}.txt"

    try:
        with open(filename, "r") as file:
            content = file.read()
            print(f"\n{content}")
    except FileNotFoundError:
        print(f"❌ Note '{safe_title}' not found!")

def list_notes():
    """List all saved notes"""
    print("\n📋 Your Notes:")

    if not os.path.exists("notes"):
        print("No notes directory found.")
        return

    notes = os.listdir("notes")
    if not notes:
        print("No notes saved yet!")
        return

    for note in notes:
        if note.endswith(".txt"):
            # Extract title from filename
            title = note.replace("_", " ").replace(".txt", "").title()
            # Get file modification time
            filepath = os.path.join("notes", note)
            mod_time = os.path.getmtime(filepath)
            date = datetime.fromtimestamp(mod_time).strftime("%Y-%m-%d %H:%M")
            print(f"📄 {title} (saved: {date})")

# Main menu
while True:
    print("\n" + "="*50)
    print("What would you like to do?")
    print("1. 📝 Create new note")
    print("2. 📖 Read existing note")
    print("3. 📋 List all notes")
    print("4. ❌ Exit")

    choice = input("Enter your choice (1-4): ")

    if choice == "1":
        save_note()
    elif choice == "2":
        read_note()
    elif choice == "3":
        list_notes()
    elif choice == "4":
        print("👋 Thanks for using Ultimate Note Taker!")
        break
    else:
        print("❌ Invalid choice. Please try again.")
```

### Activity 2: Advanced Features with AI (15 min)

**Challenge:** "Make your note app even more powerful!"

**AI Prompt for Enhanced Features:**
```
"Help me enhance my note-taking app. Add these features:
1. Search function to find notes by keyword
2. Delete function to remove old notes
3. Edit function to modify existing notes
4. Categories/tags system for organizing notes
5. Export function to save notes as backup"
```

**Enhanced Features Implementation:**
```python
def search_notes():
    """Search notes by keyword"""
    print("\n🔍 Search Notes")
    keyword = input("Enter keyword to search for: ").lower()

    if not os.path.exists("notes"):
        print("No notes directory found.")
        return

    found_notes = []
    notes = os.listdir("notes")

    for note in notes:
        if note.endswith(".txt"):
            filepath = os.path.join("notes", note)
            with open(filepath, "r") as file:
                content = file.read().lower()
                if keyword in content:
                    title = note.replace("_", " ").replace(".txt", "").title()
                    found_notes.append(title)

    if found_notes:
        print(f"\n🎯 Found {len(found_notes)} notes containing '{keyword}':")
        for note_title in found_notes:
            print(f"📄 {note_title}")
    else:
        print(f"❌ No notes found containing '{keyword}'")

def delete_note():
    """Delete a note"""
    print("\n🗑️ Delete Note")
    safe_title = input("Enter note title to delete: ").replace(" ", "_").lower()
    filename = f"notes/{safe_title}.txt"

    try:
        os.remove(filename)
        print(f"✅ Note '{safe_title}' deleted successfully!")
    except FileNotFoundError:
        print(f"❌ Note '{safe_title}' not found!")

def edit_note():
    """Edit an existing note"""
    print("\n✏️ Edit Note")
    safe_title = input("Enter note title to edit: ").replace(" ", "_").lower()
    filename = f"notes/{safe_title}.txt"

    try:
        # Read existing note
        with open(filename, "r") as file:
            content = file.read()

        print(f"\nCurrent note content:")
        print("-" * 50)
        print(content)
        print("-" * 50)

        # Get new content
        new_content = input("Enter new content (or press Enter to keep current): ")

        if new_content:
            # Parse old note to keep title and date
            lines = content.split('\n')
            title_line = lines[0] if lines else "Title: Unknown"
            date_line = lines[1] if len(lines) > 1 else f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}"

            # Create updated content
            updated_content = f"{title_line}\n{date_line}\n\n{new_content}\n{'='*50}"

            with open(filename, "w") as file:
                file.write(updated_content)

            print(f"✅ Note '{safe_title}' updated successfully!")
        else:
            print("No changes made.")

    except FileNotFoundError:
        print(f"❌ Note '{safe_title}' not found!")

# Add these to main menu:
# print("5. 🔍 Search notes")
# print("6. ✏️ Edit note")
# print("7. 🗑️ Delete note")
```

### Activity 3: Creative Note Categories (10 min)

**Choose Your Note Specialization:**

**Option A: Study Journal**
```python
# Study-focused note app
def add_study_note():
    subject = input("What subject? ")
    topic = input("What topic? ")
    notes = input("Your study notes: ")

    content = f"Subject: {subject}\nTopic: {topic}\nDate: {datetime.now().strftime('%Y-%m-%d')}\n\n{notes}"

    filename = f"study/{subject}_{topic.replace(' ', '_')}.txt"
    with open(filename, "w") as file:
        file.write(content)
    print(f"📚 Study note saved for {subject}!")
```

**Option B: Creative Writing Journal**
```python
# Creative writing note app
def add_story_prompt():
    print("🎨 Creative Writing Prompt")
    genre = input("What genre? (fantasy, sci-fi, mystery, etc.): ")
    prompt = input("Story idea or writing prompt: ")

    content = f"Genre: {genre}\nPrompt: {prompt}\nDate: {datetime.now().strftime('%Y-%m-%d')}\n\n"
    content += "Your story will go here...\n\n"
    content += "Characters:\n-\n\nPlot ideas:\n-"

    filename = f"stories/{genre}_{datetime.now().strftime('%Y%m%d')}.txt"
    with open(filename, "w") as file:
        file.write(content)
    print(f"✍️ Story prompt saved!")
```

## ✨ Creative Challenge: App Enhancement (20 min)

### Advanced Features (12 min)
**Students Choose 2-3 Enhancements:**

**Productivity Features:**
- **To-Do Lists:** Create and manage task lists
- **Reminders:** Add date-based reminders to notes
- **Templates:** Save note templates for different types
- **Backup System:** Automatic backup to another file

**Creative Features:**
- **Mood Tracking:** Track daily moods and activities
- **Dream Journal:** Special format for dream entries
- **Goal Tracker:** Track progress toward personal goals
- **Quote Collection:** Save inspirational quotes

**AI Enhancement Prompts:**
```
"Help me add a mood tracking feature to my note app. Include:
- Emoji-based mood selection
- Daily mood logging
- Mood history and trends
- Suggestions based on mood patterns"
```

### Polish and User Experience (8 min)
**Final Touches:**
- Add colors and visual organization
- Create better user prompts and menus
- Add keyboard shortcuts for common actions
- Include help text and examples

## 🎉 Show & Tell: Note App Showcase (15 min)

### App Demonstration (10 min)
- Students show their enhanced note apps
- Demonstrate creative features and specializations
- "What's the most useful feature you built?"
- Share interesting notes they've created

### File System Discussion (5 min)
- "How did working with files change what your programs can do?"
- "What types of real-world apps use file storage?"
- Discuss future possibilities with file handling

## 🔮 Next Week Preview: Web Development Foundations

**The Teaser:**
*"Next week, we're going to take our programming skills to the web! You'll learn how websites work and create your own interactive web pages. Imagine taking your note app and putting it online so friends can use it, or building a website that shows off all your creative projects!"*

**Demo Preview:** Quick demo of a simple interactive website with buttons and forms

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Working note-taking application with file operations
✅ At least 3 file operations (read, write, list, search, delete, edit)
✅ Creative categories or specializations
✅ User-friendly menus and error handling
✅ Sample notes and data files created

### Success Criteria:
🎯 **Complete Note-Taking App with File Operations**
🎯 **Files Being Created, Read, and Managed Successfully**
🎯 **User-Friendly Interface with Clear Menus**
🎯 **Creative Features or Specializations Implemented**
🎯 **Proper Error Handling for Missing Files**

## 🏆 Weekly Achievement Badge: **Data Master**
*"You've mastered file operations and persistent storage! Your note-taking app proves you can create programs that remember information forever."*

**Real-World Connection:** "The file skills you learned today power almost every application you use! Google Docs saves your documents, Instagram saves your photos, and games save your progress - all using file operations like you just mastered. You're learning the foundation of all data storage and management systems!"

## 📚 Extension Activities (Optional Homework)

### For Data Enthusiasts:
- **Data Analysis:** Create an app that reads and analyzes text files
- **CSV Creator:** Build an app that creates spreadsheet-compatible files
- **File Manager:** Create a tool to organize and categorize files
- **Backup System:** Build automated backup and restore functionality

### For Creative Coders:
- **Digital Diary:** Extend the note app into a full diary system
- **Recipe Book:** Create a recipe storage and search application
- **Journal System:** Build a comprehensive personal journal app
- **Project Tracker:** Create an app to track personal projects

### Challenge Problem:
*"Can you create a note app that encrypts your notes so only you can read them? Or an app that syncs notes between different files automatically?"*

---

**Teacher Notes:**
- Use visual diagrams to show file operations
- Emphasize the difference between temporary variables and permanent files
- Have backup activities ready if students have file permission issues
- Celebrate creative applications and unique specializations
- Keep examples of student note files for portfolio building