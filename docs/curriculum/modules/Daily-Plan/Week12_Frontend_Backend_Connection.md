# Week 12 — Connecting Frontend to Backend

## 🎯 This Week's Mission
_Bridge the gap between frontend and backend! Learn how web applications communicate with servers, create real-time dashboards that pull data from APIs, and build complete full-stack applications that feel alive and responsive to user interactions!_

## 🔥 Last Week Showcase
**Backend API Festival (5 min):**
- "Who built an amazing backend API last week?"
- Quick demos of Flask APIs with different endpoints and features
- Highlight advanced filtering, analytics, and professional error handling
- "Last week you became backend developers! This week we're going to connect those powerful backends to beautiful frontends and create truly interactive applications!"

## 🚀 Today's Hook: The Magic of Full-Stack Integration (15 min)

**Live Demo: Static vs Dynamic Applications**
Teacher shows two versions of the same application:

**Static Version (Limited):**
```html
<!-- Hardcoded data -->
<div class="student-card">
    <h3>Sarah Johnson</h3>
    <p>Age: 15</p>
    <p>Email: sarah@email.com</p>
    <!-- Data never changes -->
</div>
```

**Dynamic Version (Alive!):**
```javascript
// Live data from backend API
fetch('/api/students')
    .then(response => response.json())
    .then(data => {
        data.students.forEach(student => {
            createStudentCard(student); // Real-time creation!
        });
    });

// Updates automatically when backend data changes!
// Can handle thousands of users!
// Real-time interactions!
```

**The Wow Moment:** Teacher shows the dynamic application pulling live data:
- "See how this application is loading real data from our backend API?"
- "If we add a new student on the backend, it appears here instantly!"
- "This is how modern web applications like Facebook, Instagram, and Netflix work!"

**The Week's Promise:**
*"Today you will:*
- *Master the art of connecting frontend applications to backend APIs*
- *Create real-time dashboards that update with live server data*
- *Build applications that can handle thousands of users and data points*
- *Learn the exact technology that powers modern web applications*"

## 🧠 Concept Discovery: Frontend-Backend Communication (15 min)

### How Web Applications Talk to Servers (5 min)
**The Request-Response Cycle:**
```
1. User clicks "Add Student" button (Frontend)
2. JavaScript sends HTTP request to backend
3. Backend processes request, validates data
4. Backend saves data to database
5. Backend sends JSON response back to frontend
6. Frontend updates UI with new data
7. User sees new student immediately!
```

**JavaScript Fetch API:**
```javascript
// GET request - retrieve data
fetch('/api/students')
    .then(response => response.json())
    .then(data => {
        console.log('Students loaded:', data);
        displayStudents(data.students);
    })
    .catch(error => {
        console.error('Error loading students:', error);
    });

// POST request - create data
fetch('/api/students', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'New Student',
        age: 16,
        email: 'student@email.com'
    })
})
.then(response => response.json())
.then(data => {
    console.log('Student created:', data);
    refreshStudentList(); // Update UI
});
```

### Understanding Async Programming (5 min)
**What is Asynchronous?**
*"Asynchronous programming means doing multiple things at once. Instead of waiting for one task to finish before starting another, JavaScript can start a request and continue doing other things while waiting for the response."*

**Why It's Important:**
- **Better User Experience:** Applications don't freeze while loading data
- **Performance:** Can handle multiple operations simultaneously
- **Real-Time Updates:** Data can update without page refresh
- **Modern Web Standards:** Required for modern web applications

**Promises and Async/Await:**
```javascript
// Traditional Promises
function loadStudents() {
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            displayStudents(data.students);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Modern Async/Await (cleaner and more readable)
async function loadStudents() {
    try {
        const response = await fetch('/api/students');
        const data = await response.json();
        displayStudents(data.students);
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Even cleaner with multiple requests
async function loadAppData() {
    try {
        const [studentsResponse, statsResponse] = await Promise.all([
            fetch('/api/students'),
            fetch('/api/students/stats')
        ]);

        const students = await studentsResponse.json();
        const stats = await statsResponse.json();

        displayStudents(students.students);
        displayStats(stats.stats);
    } catch (error) {
        console.error('Error loading app data:', error);
    }
}
```

### Real-Time vs Static Applications (5 min)
**Static Application Characteristics:**
- **Fixed Content:** Data is hardcoded in HTML/JavaScript
- **No Updates:** Content never changes unless manually updated
- **Limited Scale:** Can handle only a few users
- **Simple Deployment:** Easy to host and serve
- **Fast Loading:** No server processing required

**Dynamic Application Characteristics:**
- **Live Data:** Content comes from database via API
- **Real-Time Updates:** Content changes automatically
- **Scalable:** Can handle thousands of users
- **Complex Infrastructure:** Requires backend server and database
- **Rich Features:** User authentication, real-time interactions, etc.

**When to Use Each:**
- **Static:** Portfolios, blogs, documentation sites
- **Dynamic:** Social media, e-commerce, dashboards, user systems

## 🛠️ Hands-On Building: Real-Time Student Dashboard (40 min)

### Activity 1: Frontend-Backend Integration Setup (15 min)

**Step 1: Project Structure**
```
student_dashboard/
├── backend/
│   ├── app.py              # Flask API from Week 11
│   ├── requirements.txt
│   └── venv/
├── frontend/
│   ├── index.html          # Dashboard frontend
│   ├── style.css           # Styling
│   ├── script.js           # JavaScript for API calls
│   └── assets/             # Images, icons
└── README.md               # Project documentation
```

**Step 2: Dashboard Frontend HTML**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dashboard-container">
        <!-- Header -->
        <header class="dashboard-header">
            <div class="header-content">
                <h1><i class="fas fa-graduation-cap"></i> Student Dashboard</h1>
                <div class="header-controls">
                    <button id="refreshBtn" class="btn btn-secondary">
                        <i class="fas fa-sync-alt"></i> Refresh
                    </button>
                    <button id="addStudentBtn" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Add Student
                    </button>
                </div>
            </div>
        </header>

        <!-- Loading Indicator -->
        <div id="loadingOverlay" class="loading-overlay hidden">
            <div class="loading-spinner">
                <i class="fas fa-circle-notch fa-spin"></i>
                <p>Loading data...</p>
            </div>
        </div>

        <!-- Stats Section -->
        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="totalStudents">0</div>
                        <div class="stat-label">Total Students</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="avgAge">0</div>
                        <div class="stat-label">Average Age</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="totalSkills">0</div>
                        <div class="stat-label">Different Skills</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="activeStudents">0</div>
                        <div class="stat-label">Active Students</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filters Section -->
        <section class="filters-section">
            <div class="filters-container">
                <h3><i class="fas fa-filter"></i> Filters</h3>
                <div class="filter-controls">
                    <div class="filter-group">
                        <label for="gradeFilter">Grade:</label>
                        <select id="gradeFilter">
                            <option value="">All Grades</option>
                            <option value="9">9th Grade</option>
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="searchInput">Search:</label>
                        <input type="text" id="searchInput" placeholder="Search students...">
                    </div>
                    <div class="filter-group">
                        <label for="activeFilter">Status:</label>
                        <select id="activeFilter">
                            <option value="">All Students</option>
                            <option value="true">Active Only</option>
                            <option value="false">Inactive Only</option>
                        </select>
                    </div>
                    <button id="clearFiltersBtn" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Clear
                    </button>
                </div>
            </div>
        </section>

        <!-- Students Section -->
        <section class="students-section">
            <div class="section-header">
                <h3><i class="fas fa-users"></i> Students</h3>
                <div class="section-controls">
                    <span id="studentCount" class="student-count">0 students</span>
                    <div class="view-controls">
                        <button id="gridViewBtn" class="view-btn active" data-view="grid">
                            <i class="fas fa-th"></i>
                        </button>
                        <button id="listViewBtn" class="view-btn" data-view="list">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="studentsContainer" class="students-grid">
                <!-- Students will be loaded here -->
            </div>
        </section>

        <!-- Error Message -->
        <div id="errorMessage" class="error-message hidden">
            <i class="fas fa-exclamation-triangle"></i>
            <span id="errorText"></span>
            <button id="dismissErrorBtn" class="btn btn-secondary">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <!-- Success Message -->
        <div id="successMessage" class="success-message hidden">
            <i class="fas fa-check-circle"></i>
            <span id="successText"></span>
        </div>
    </div>

    <!-- Add Student Modal -->
    <div id="addStudentModal" class="modal hidden">
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-user-plus"></i> Add New Student</h3>
                <button id="closeModalBtn" class="btn btn-secondary">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="addStudentForm">
                    <div class="form-group">
                        <label for="studentName">Full Name *</label>
                        <input type="text" id="studentName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="studentAge">Age *</label>
                        <input type="number" id="studentAge" name="age" min="13" max="25" required>
                    </div>
                    <div class="form-group">
                        <label for="studentEmail">Email *</label>
                        <input type="email" id="studentEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="studentGrade">Grade</label>
                        <select id="studentGrade" name="grade">
                            <option value="9">9th Grade</option>
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="studentSkills">Skills (comma-separated)</label>
                        <input type="text" id="studentSkills" name="skills"
                               placeholder="Python, JavaScript, HTML">
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancelAddBtn" class="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

**Step 3: Dashboard CSS**
```css
/* style.css */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --warning-color: #f6ad55;
    --danger-color: #e53e3e;
    --dark-color: #2d3748;
    --light-color: #f7fafc;
    --border-color: #e2e8f0;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    color: var(--dark-color);
}

.dashboard-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

/* Header */
.dashboard-header {
    background: white;
    border-radius: 12px;
    padding: 20px 30px;
    margin-bottom: 30px;
    box-shadow: var(--shadow-lg);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-content h1 {
    color: var(--primary-color);
    font-size: 2rem;
    font-weight: 700;
}

.header-content h1 i {
    margin-right: 15px;
}

.header-controls {
    display: flex;
    gap: 15px;
}

/* Buttons */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.btn-secondary {
    background: var(--light-color);
    color: var(--dark-color);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover {
    background: var(--border-color);
}

.btn-success {
    background: var(--success-color);
    color: white;
}

.btn-danger {
    background: var(--danger-color);
    color: white;
}

/* Loading */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-overlay.hidden {
    display: none;
}

.loading-spinner {
    text-align: center;
    color: var(--primary-color);
}

.loading-spinner i {
    font-size: 3rem;
    margin-bottom: 20px;
}

.loading-spinner p {
    font-size: 1.2rem;
    font-weight: 600;
}

/* Stats Section */
.stats-section {
    margin-bottom: 30px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.stat-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.stat-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    opacity: 0.8;
}

.stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--dark-color);
    line-height: 1;
}

.stat-label {
    color: #718096;
    font-size: 0.9rem;
    margin-top: 5px;
}

/* Filters Section */
.filters-section {
    background: white;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: var(--shadow);
}

.filters-container h3 {
    color: var(--dark-color);
    margin-bottom: 20px;
    font-size: 1.2rem;
}

.filters-container h3 i {
    margin-right: 10px;
    color: var(--primary-color);
}

.filter-controls {
    display: flex;
    gap: 20px;
    align-items: end;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.filter-group label {
    font-weight: 600;
    color: var(--dark-color);
    font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
    padding: 10px 15px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.filter-group input:focus,
.filter-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Students Section */
.students-section {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: var(--shadow);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.section-header h3 {
    color: var(--dark-color);
    font-size: 1.2rem;
}

.section-header h3 i {
    margin-right: 10px;
    color: var(--primary-color);
}

.section-controls {
    display: flex;
    align-items: center;
    gap: 20px;
}

.student-count {
    color: #718096;
    font-size: 0.9rem;
}

.view-controls {
    display: flex;
    gap: 5px;
}

.view-btn {
    padding: 8px 12px;
    border: 2px solid var(--border-color);
    background: white;
    color: #718096;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Student Cards */
.students-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.students-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.student-card {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
    padding: 25px;
    color: white;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.student-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.student-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.student-card-header {
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
}

.student-name {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 5px;
}

.student-email {
    font-size: 0.9rem;
    opacity: 0.9;
}

.student-details {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 10px;
    margin-bottom: 15px;
}

.student-detail {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
}

.student-detail i {
    width: 20px;
    text-align: center;
}

.student-skills {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal.hidden {
    display: none;
}

.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    padding: 25px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    color: var(--dark-color);
    font-size: 1.3rem;
}

.modal-body {
    padding: 25px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--dark-color);
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-actions {
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 25px;
}

/* Messages */
.error-message,
.success-message {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 1000;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
}

.error-message {
    background: var(--danger-color);
    color: white;
}

.success-message {
    background: var(--success-color);
    color: white;
}

.message.hidden {
    display: none;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Utility Classes */
.hidden {
    display: none !important;
}

/* Responsive Design */
@media (max-width: 768px) {
    .dashboard-container {
        padding: 15px;
    }

    .header-content {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .filter-controls {
        flex-direction: column;
        align-items: stretch;
    }

    .section-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }

    .students-grid {
        grid-template-columns: 1fr;
    }
}
```

### Activity 2: JavaScript for API Integration (15 min)

**The Integration Challenge:** "Create the JavaScript that connects your beautiful frontend to your powerful backend!"

```javascript
// script.js
class StudentDashboard {
    constructor() {
        this.apiBaseUrl = 'http://localhost:5000/api'; // Backend API URL
        this.students = [];
        this.currentView = 'grid';
        this.filters = {
            grade: '',
            search: '',
            active: ''
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Button events
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        document.getElementById('addStudentBtn').addEventListener('click', () => {
            this.showAddStudentModal();
        });

        // Filter events
        document.getElementById('gradeFilter').addEventListener('change', (e) => {
            this.filters.grade = e.target.value;
            this.applyFilters();
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        document.getElementById('activeFilter').addEventListener('change', (e) => {
            this.filters.active = e.target.value;
            this.applyFilters();
        });

        document.getElementById('clearFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        // View controls
        document.getElementById('gridViewBtn').addEventListener('click', () => {
            this.changeView('grid');
        });

        document.getElementById('listViewBtn').addEventListener('click', () => {
            this.changeView('list');
        });

        // Modal events
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.hideAddStudentModal();
        });

        document.getElementById('cancelAddBtn').addEventListener('click', () => {
            this.hideAddStudentModal();
        });

        document.getElementById('addStudentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addStudent();
        });

        // Error message
        document.getElementById('dismissErrorBtn').addEventListener('click', () => {
            this.hideError();
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAddStudentModal();
            }
        });
    }

    async loadInitialData() {
        try {
            this.showLoading(true);

            // Load students and stats in parallel
            const [studentsResponse, statsResponse] = await Promise.all([
                this.fetchFromAPI('/students'),
                this.fetchFromAPI('/students/stats')
            ]);

            this.students = studentsResponse.students;
            this.updateStats(statsResponse.stats);
            this.displayStudents(this.students);

        } catch (error) {
            this.showError('Failed to load data. Please try again.');
            console.error('Error loading initial data:', error);
        } finally {
            this.showLoading(false);
        }
    }

    async fetchFromAPI(endpoint) {
        const response = await fetch(`${this.apiBaseUrl}${endpoint}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async makeAPIRequest(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    updateStats(stats) {
        // Animate number counting
        this.animateNumber('totalStudents', stats.total_students);
        this.animateNumber('avgAge', Math.round(stats.average_age));
        this.animateNumber('totalSkills', Object.keys(stats.skill_popularity || {}).length);
        this.animateNumber('activeStudents', stats.active_students || stats.total_students);
    }

    animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const startValue = parseInt(element.textContent) || 0;
        const duration = 1000; // 1 second
        const startTime = Date.now();

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    displayStudents(students) {
        const container = document.getElementById('studentsContainer');
        const count = document.getElementById('studentCount');

        // Update count
        count.textContent = `${students.length} student${students.length !== 1 ? 's' : ''}`;

        if (students.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #718096;">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                    <h3>No students found</h3>
                    <p>Try adjusting your filters or add new students.</p>
                </div>
            `;
            return;
        }

        // Generate student cards
        container.innerHTML = students.map(student => this.createStudentCard(student)).join('');
    }

    createStudentCard(student) {
        return `
            <div class="student-card" data-student-id="${student.id}">
                <div class="student-card-header">
                    <div class="student-name">${this.escapeHtml(student.name)}</div>
                    <div class="student-email">${this.escapeHtml(student.email)}</div>
                </div>
                <div class="student-details">
                    <div class="student-detail">
                        <i class="fas fa-birthday-cake"></i>
                        <span>${student.age} years old</span>
                    </div>
                    <div class="student-detail">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Grade ${student.grade}</span>
                    </div>
                    <div class="student-detail">
                        <i class="fas fa-calendar"></i>
                        <span>Joined ${student.join_date}</span>
                    </div>
                    <div class="student-detail">
                        <i class="fas fa-circle" style="color: ${student.active ? '#48bb78' : '#e53e3e'};"></i>
                        <span>${student.active ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
                <div class="student-skills">
                    ${(student.skills || []).map(skill =>
                        `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    applyFilters() {
        let filtered = [...this.students];

        // Apply grade filter
        if (this.filters.grade) {
            filtered = filtered.filter(student =>
                student.grade.toString() === this.filters.grade
            );
        }

        // Apply search filter
        if (this.filters.search) {
            filtered = filtered.filter(student => {
                const searchLower = this.filters.search.toLowerCase();
                return student.name.toLowerCase().includes(searchLower) ||
                       student.email.toLowerCase().includes(searchLower) ||
                       (student.skills || []).some(skill =>
                           skill.toLowerCase().includes(searchLower)
                       );
            });
        }

        // Apply active filter
        if (this.filters.active !== '') {
            const isActive = this.filters.active === 'true';
            filtered = filtered.filter(student => student.active === isActive);
        }

        this.displayStudents(filtered);
    }

    clearFilters() {
        this.filters = {
            grade: '',
            search: '',
            active: ''
        };

        document.getElementById('gradeFilter').value = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('activeFilter').value = '';

        this.displayStudents(this.students);
    }

    changeView(view) {
        this.currentView = view;
        const container = document.getElementById('studentsContainer');
        const gridBtn = document.getElementById('gridViewBtn');
        const listBtn = document.getElementById('listViewBtn');

        if (view === 'grid') {
            container.className = 'students-grid';
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        } else {
            container.className = 'students-list';
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        }
    }

    async refreshData() {
        try {
            this.showLoading(true);
            await this.loadInitialData();
            this.showSuccess('Data refreshed successfully!');
        } catch (error) {
            this.showError('Failed to refresh data. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    showAddStudentModal() {
        document.getElementById('addStudentModal').classList.remove('hidden');
        document.getElementById('studentName').focus();
    }

    hideAddStudentModal() {
        document.getElementById('addStudentModal').classList.add('hidden');
        document.getElementById('addStudentForm').reset();
    }

    async addStudent() {
        const form = document.getElementById('addStudentForm');
        const formData = new FormData(form);

        const studentData = {
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            email: formData.get('email'),
            grade: parseInt(formData.get('grade')),
            skills: formData.get('skills').split(',').map(s => s.trim()).filter(s => s)
        };

        try {
            this.showLoading(true);

            const response = await this.makeAPIRequest('/students', {
                method: 'POST',
                body: JSON.stringify(studentData)
            });

            this.students.push(response.student);
            this.applyFilters(); // Refresh display with current filters
            this.hideAddStudentModal();
            this.showSuccess(`Student ${studentData.name} added successfully!`);

        } catch (error) {
            this.showError(`Failed to add student: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }

    startAutoRefresh() {
        // Refresh data every 30 seconds
        setInterval(() => {
            this.refreshData();
        }, 30000);
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        errorText.textContent = message;
        errorElement.classList.remove('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        document.getElementById('errorMessage').classList.add('hidden');
    }

    showSuccess(message) {
        const successElement = document.getElementById('successMessage');
        const successText = document.getElementById('successText');

        successText.textContent = message;
        successElement.classList.remove('hidden');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            successElement.classList.add('hidden');
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StudentDashboard();
});
```

### Activity 3: Running the Complete Application (10 min)

**The Full-Stack Integration Challenge:**
1. **Start the Backend Server:**
```bash
cd backend
source venv/bin/activate  # Mac/Linux
# or venv\Scripts\activate  # Windows
python app.py
```

2. **Start the Frontend Server:**
```bash
# In a new terminal, go to frontend directory
cd frontend
# Use any simple HTTP server
python -m http.server 8000
# or with Node.js
npx serve .
# or with PHP
php -S localhost:8000
```

3. **Test the Integration:**
- Open http://localhost:8000 in your browser
- Verify data loads from backend API
- Test adding new students
- Test filters and search
- Verify real-time updates work

## ✨ Creative Challenge: Advanced Features (20 min)

### Real-Time Enhancements (12 min)
**Students Choose 2-3 Advanced Features:**

**Real-Time Updates:**
- **WebSocket Integration:** Real-time data without refresh
- **Server-Sent Events:** Live notifications
- **Auto-Save:** Automatic form saving
- **Live Collaboration:** Multiple users editing simultaneously

**Advanced UI/UX:**
- **Data Visualization:** Charts and graphs for student statistics
- **Export Features:** Download student data as CSV or PDF
- **Bulk Operations:** Select and edit multiple students
- **Advanced Search:** Fuzzy search with suggestions

**Performance Optimizations:**
- **Lazy Loading:** Load data as needed
- **Caching:** Store frequently accessed data
- **Pagination:** Handle large datasets efficiently
- **Debouncing:** Optimize search performance

**AI Enhancement Prompts:**
```
"Help me add real-time updates to my student dashboard. I want:
1. WebSocket integration for live data updates
2. Real-time notifications for student changes
3. Live statistics that update automatically
4. Multiple-user support with live collaboration
5. Connection status indicators
6. Automatic reconnection handling
Make it feel like a professional real-time application!"
```

### Professional Polish (8 min)
**Production-Ready Features:**
- **Error Boundaries:** Graceful error handling
- **Offline Support:** Basic functionality without internet
- **Performance Monitoring:** Track application performance
- **Accessibility:** WCAG compliance and keyboard navigation
- **Mobile Optimization:** Perfect mobile experience

## 🎉 Show & Tell: Full-Stack Integration Showcase (15 min)

### Live Application Demonstrations (10 min)
- Students demonstrate their complete integrated applications
- Show real-time data flow from backend to frontend
- Demonstrate advanced features and optimizations
- "What's the most impressive integration feature you built?"

### Full-Stack Discussion (5 min)
- "How did connecting frontend to backend change your understanding of web applications?"
- "What types of applications would you like to build with these skills?"
- Discuss modern web architecture and career opportunities

## 🔮 Next Week Preview: Authentication Systems

**The Teaser:**
*"Next week, we're going to add user authentication and authorization systems! You'll learn how to build login/logout functionality, protect certain features for different user types, and create secure applications that can handle real user accounts. Imagine building a system where students can create their own accounts, teachers can manage their classes, and administrators have access to special features - that's what we're building next!"*

**Demo Preview:** Quick demo of a multi-role authentication system with different user permissions

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete frontend-backend integration with real-time data flow
✅ Working dashboard that pulls data from Flask API
✅ Real-time updates and user interactions
✅ Advanced filtering, searching, and display features
✅ Error handling and loading states
✅ Professional UI/UX design with responsive layout

### Success Criteria:
🎯 **Complete Frontend-Backend Integration Working**
🎯 **Real-Time Data Loading from API**
🎯 **Interactive Dashboard with Filters and Search**
🎯 **Add Student Functionality with API Integration**
🎯 **Professional Error Handling and User Feedback**
🎯 **Responsive Design for All Devices**

## 🏆 Weekly Achievement Badge: **Full-Stack Integration Expert**
*"You've mastered frontend-backend integration! Your real-time dashboard proves you can build complete, professional web applications that seamlessly connect beautiful frontends to powerful backends."*

**Real-World Connection:** "The integration skills you learned today are exactly how professional web applications are built! Companies like Google, Facebook, and Amazon use these exact same patterns to connect their frontends to backend services. You're now building applications with the same architecture and technology that runs the modern web!"

## 📚 Extension Activities (Optional Homework)

### For Future Full-Stack Developers:
- **Real-Time Chat:** Add a chat system using WebSockets
- **Data Visualization:** Integrate Chart.js or D3.js for analytics
- **Mobile App:** Create a React Native or Flutter app that uses your API
- **Progressive Web App:** Convert your dashboard to a PWA with offline support

### Online Resources:
- **Fetch API Documentation:** Complete guide to making HTTP requests
- **Async/Await Tutorial:** Master asynchronous JavaScript
- **REST API Design:** Best practices for API development
- **Modern Frontend Architecture:** Patterns and best practices

### Challenge Problem:
*"Can you build a real-time collaboration feature where multiple users can see when other users are viewing or editing student data? Maybe add user presence indicators or live cursors showing what others are doing!"*

---

**Teacher Notes:**
- Use browser developer tools to show students real network requests
- Emphasize the importance of proper error handling and user feedback
- Discuss CORS (Cross-Origin Resource Sharing) and security considerations
- Celebrate successful integrations and professional applications
- Keep working examples for inspiration and future reference