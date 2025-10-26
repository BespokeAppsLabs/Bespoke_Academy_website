
# Guide: Setting Up Your Development Environment

## 1. Introduction

Welcome to the world of software development! Before you can start writing code, you need to set up your development environment. This is the set of tools that you will use to create, test, and run your software.

This guide will walk you through the installation and setup of the three essential tools for this course:

1.  **Visual Studio Code (VS Code):** A powerful and popular code editor.
2.  **Node.js:** A JavaScript runtime that lets you run JavaScript on your computer.
3.  **Git:** A version control system for tracking changes to your code.

We will provide instructions for the three major operating systems: **Windows, macOS, and Linux.**

## 2. Installing Visual Studio Code (VS Code)

VS Code is a free, open-source code editor developed by Microsoft. It has excellent support for JavaScript, TypeScript, and many other languages. It also has a vast ecosystem of extensions that can enhance your productivity.

### Steps:

1.  **Go to the VS Code download page:** [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2.  **Download the installer** for your operating system (Windows, macOS, or Linux).
3.  **Run the installer** and follow the on-screen instructions.
    -   **Windows:** We recommend checking the "Add to PATH" option during installation. This will allow you to open VS Code from the command line.
    -   **macOS:** After downloading, drag the `Visual Studio Code.app` file to your `Applications` folder.
    -   **Linux:** Follow the specific instructions for your distribution (e.g., using the `.deb` package for Debian/Ubuntu or the `.rpm` package for Fedora/CentOS).

### Verification:

Open your terminal or command prompt and type:

```bash
code --version
```

If it prints the version number, VS Code is installed correctly.

## 3. Installing Node.js and npm

Node.js is what allows you to run JavaScript code outside of a web browser. It's essential for modern web development. When you install Node.js, you also get **npm** (Node Package Manager), which is used to install and manage third-party libraries (packages) for your projects.

### Steps:

1.  **Go to the Node.js download page:** [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2.  **Download the LTS (Long-Term Support) version** for your operating system. The LTS version is recommended for most users as it is the most stable.
3.  **Run the installer** and follow the on-screen instructions. The installer will install both Node.js and npm.

### Verification:

Open your terminal or command prompt and run the following commands:

```bash
node --version
```

```bash
npm --version
```

If both commands print a version number, Node.js and npm are installed correctly.

## 4. Installing Git

Git is a distributed version control system. It is a fundamental tool for software developers, allowing you to track changes in your code, collaborate with others, and revert to previous versions of your work if something goes wrong.

### Steps:

#### macOS

Git may already be installed on your Mac. To check, open the terminal and run:

```bash
git --version
```

If it's not installed, it will prompt you to install the Xcode Command Line Tools. Follow the prompts to install it. Alternatively, you can install Git with [Homebrew](https://brew.sh/):

```bash
brew install git
```

#### Windows

1.  **Go to the Git download page:** [https://git-scm.com/download/win](https://git-scm.com/download/win)
2.  **Download and run the installer.**
3.  Follow the on-screen instructions. We recommend using the default settings, but make sure to select a text editor that you have installed (like VS Code) when prompted.

#### Linux

You can install Git using the package manager for your distribution. For example:

-   **Debian/Ubuntu:**

    ```bash
    sudo apt-get install git
    ```

-   **Fedora:**

    ```bash
    sudo dnf install git
    ```

### Verification:

Open your terminal or command prompt and run:

```bash
git --version
```

If it prints the version number, Git is installed correctly.

### First-Time Git Configuration

After installing Git, you should configure it with your name and email address. This information will be included in the commits you create.

Run the following commands in your terminal, replacing the example values with your own name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

## 5. Conclusion

Your development environment is now set up and ready to go! You have a powerful code editor, a JavaScript runtime, and a version control system.

These tools are the foundation upon which you will build all of your projects in this course. Take some time to get familiar with them, and don't hesitate to consult their official documentation if you have any questions.

Happy coding!
