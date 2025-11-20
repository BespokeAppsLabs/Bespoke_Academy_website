# Week 13 — Basic Login System

## 🎯 This Week's Mission
_Master the art of user authentication! Build a complete login and registration system with password security, session management, and user role protection. Learn the fundamental security concepts that power virtually every modern web application!_

## 🔥 Last Week Showcase
**Full-Stack Integration Festival (5 min):**
- "Who built an amazing connected frontend-backend application last week?"
- Quick demos of real-time dashboards with live API integration
- Highlight seamless data flow, responsive design, and professional polish
- "Last week you connected the frontend to backend! This week we're going to add the most critical feature of all: user authentication and security!"

## 🚀 Today's Hook: The Power of Authentication (15 min)

**Live Demo: Protected vs Unprotected Applications**
Teacher shows two versions of the same application:

**Unprotected Version (Dangerous):**
```javascript
// Anyone can access anything!
fetch('/api/students/1/delete') // No authentication!
fetch('/api/students/all') // No permissions!
fetch('/api/admin/settings') // Anyone can be admin!
```

**Protected Version (Secure):**
```javascript
// Must be logged in
if (!isLoggedIn()) {
    return redirect('/login');
}

// Must have correct permissions
if (!hasPermission('delete_students')) {
    return showError('Access denied!');
}

// Secure API calls
fetch('/api/students', {
    headers: {
        'Authorization': `Bearer ${user.token}`
    }
});
```

**The Security Moment:** Teacher demonstrates a real authentication flow:
- "See how this application protects sensitive data?"
- "Only authenticated users can access student records"
- "Admins have special permissions that regular users don't"
- "This is how Facebook, Instagram, and banking apps protect your data!"

**The Week's Promise:**
*"Today you will:*
- *Build a complete authentication system with login and registration*
- *Master password security and session management*
- *Implement user roles and permission systems*
- *Learn the security fundamentals that protect user data worldwide*
- *Create professional applications that protect user privacy and security*"

## 🧠 Concept Discovery: Authentication Fundamentals (15 min)

### What is Authentication? (5 min)
**Simple Explanation:**
*"Authentication is like a security guard for your application. It checks who someone is (authentication) and what they're allowed to do (authorization). Just like you need a key to enter your house and different keys for different rooms, users need credentials to access applications and different permissions for different features."*

**Authentication vs Authorization:**
- **Authentication:** "Who are you?" (Login, passwords, tokens)
- **Authorization:** "What are you allowed to do?" (Permissions, roles, access control)

**Common Authentication Methods:**
- **Password-based:** Username + password (most common)
- **Multi-factor:** Password + phone/email code (more secure)
- **Social login:** Google, Facebook, GitHub (convenient)
- **Biometric:** Fingerprint, face recognition (secure)

### Password Security (5 min)
**Why Password Security Matters:**
```javascript
// ❌ NEVER store passwords like this!
user.password = "password123";  // Plain text - very bad!

// ❌ Bad encryption (easily reversible)
user.password = encrypt("password123");

// ✅ Good - one-way hashing
user.password = hash("password123");  // Can't be reversed!

// Example of hashing:
const hashedPassword = bcrypt.hash("password123");
// $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO8e
```

**Password Security Best Practices:**
- **Never store plain text passwords**
- **Use strong hashing algorithms** (bcrypt, Argon2)
- **Add salt** (random data to prevent rainbow table attacks)
- **Enforce strong passwords** (length, complexity)
- **Implement rate limiting** (prevent brute force attacks)

### Session Management (5 min)
**What are Sessions?**
*"A session is like a temporary pass that users get after logging in. It proves they're authenticated without sending their password with every request. Think of it like a wristband at an amusement park - once you show your ticket at the entrance, you can ride rides all day by just showing your wristband."*

**How Sessions Work:**
```
1. User logs in with username/password
2. Server verifies credentials
3. Server creates a unique session token
4. Server sends token to client (cookie/header)
5. Client sends token with every request
6. Server validates token and grants access
```

**Session Security:**
- **HTTPS Only:** Never send tokens over unencrypted connections
- **HTTPOnly Cookies:** Prevent JavaScript access to tokens
- **Short Expiration:** Tokens should expire relatively quickly
- **Secure Storage:** Store tokens securely on client-side

## 🛠️ Hands-On Building: Complete Authentication System (40 min)

### Activity 1: Backend Authentication System (15 min)

**Step 1: Enhanced Flask Backend with Authentication**
```python
# auth_app.py - Enhanced Flask with authentication
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import datetime
import uuid

app = Flask(__name__)

# Configuration
app.config.update({
    'SECRET_KEY': 'your-secret-key-change-in-production',
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///students.db',
    'SQLALCHEMY_TRACK_MODIFICATIONS': False
})

# Initialize database
db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')  # admin, teacher, user
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    last_login = db.Column(db.DateTime)

    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if password matches hash"""
        return check_password_hash(self.password_hash, password)

    def generate_token(self):
        """Generate JWT token for user"""
        token = jwt.encode({
            'user_id': self.id,
            'username': self.username,
            'role': self.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return token

    def to_dict(self):
        """Convert user to dictionary (excluding password)"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    skills = db.Column(db.Text)  # JSON string
    join_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'email': self.email,
            'grade': self.grade,
            'skills': eval(self.skills) if self.skills else [],
            'join_date': self.join_date.isoformat(),
            'created_by': self.created_by,
            'is_active': self.is_active
        }

# Create database tables
with app.app_context():
    db.create_all()

# Helper Functions
def token_required(f):
    """Decorator to require token for endpoint"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]

            # Decode token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])

            if not current_user or not current_user.is_active:
                return jsonify({'message': 'Invalid or inactive user!'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

def admin_required(f):
    """Decorator to require admin role"""
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role != 'admin':
            return jsonify({'message': 'Admin access required!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

def teacher_required(f):
    """Decorator to require teacher or admin role"""
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.role not in ['admin', 'teacher']:
            return jsonify({'message': 'Teacher or admin access required!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# Authentication Routes

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()

        # Validation
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'message': 'Username and password are required!'}), 400

        if len(data['password']) < 8:
            return jsonify({'message': 'Password must be at least 8 characters long!'}), 400

        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already exists!'}), 409

        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already exists!'}), 409

        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            role=data.get('role', 'user')  # Default to 'user' role
        )
        user.set_password(data['password'])

        db.session.add(user)
        db.session.commit()

        return jsonify({
            'message': 'User registered successfully!',
            'user': user.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Registration failed: {str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Authenticate user and return token"""
    try:
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'message': 'Username and password are required!'}), 400

        user = User.query.filter_by(username=data['username']).first()

        if not user or not user.check_password(data['password']):
            return jsonify({'message': 'Invalid username or password!'}), 401

        if not user.is_active:
            return jsonify({'message': 'Account is deactivated!'}), 401

        # Update last login
        user.last_login = datetime.datetime.utcnow()
        db.session.commit()

        # Generate token
        token = user.generate_token()

        return jsonify({
            'message': 'Login successful!',
            'token': token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'message': f'Login failed: {str(e)}'}), 500

@app.route('/api/auth/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get current user profile"""
    return jsonify({
        'user': current_user.to_dict()
    })

@app.route('/api/auth/change-password', methods=['PUT'])
@token_required
def change_password(current_user):
    """Change user password"""
    try:
        data = request.get_json()

        if not data or not data.get('current_password') or not data.get('new_password'):
            return jsonify({'message': 'Current and new passwords are required!'}), 400

        if not current_user.check_password(data['current_password']):
            return jsonify({'message': 'Current password is incorrect!'}), 401

        if len(data['new_password']) < 8:
            return jsonify({'message': 'New password must be at least 8 characters long!'}), 400

        current_user.set_password(data['new_password'])
        db.session.commit()

        return jsonify({'message': 'Password changed successfully!'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Password change failed: {str(e)}'}), 500

# Student CRUD Routes with Authentication

@app.route('/api/students', methods=['GET'])
@token_required
def get_students(current_user):
    """Get all students (accessible to all authenticated users)"""
    try:
        # Filter by user role
        if current_user.role == 'user':
            # Regular users can only see students they created
            students = Student.query.filter_by(created_by=current_user.id, is_active=True).all()
        else:
            # Teachers and admins can see all students
            students = Student.query.filter_by(is_active=True).all()

        return jsonify({
            'students': [student.to_dict() for student in students]
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get students: {str(e)}'}), 500

@app.route('/api/students', methods=['POST'])
@token_required
def create_student(current_user):
    """Create new student"""
    try:
        data = request.get_json()

        # Validation
        if not data or not data.get('name') or not data.get('email'):
            return jsonify({'message': 'Name and email are required!'}), 400

        # Check for existing email
        if Student.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Student with this email already exists!'}), 409

        student = Student(
            name=data['name'],
            age=data.get('age', 15),
            email=data['email'],
            grade=data.get('grade', 10),
            skills=str(data.get('skills', [])),
            created_by=current_user.id
        )

        db.session.add(student)
        db.session.commit()

        return jsonify({
            'message': 'Student created successfully!',
            'student': student.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to create student: {str(e)}'}), 500

@app.route('/api/students/<int:student_id>', methods=['PUT'])
@token_required
def update_student(current_user, student_id):
    """Update student"""
    try:
        student = Student.query.get_or_404(student_id)

        # Check permissions
        if current_user.role == 'user' and student.created_by != current_user.id:
            return jsonify({'message': 'Access denied!'}), 403

        data = request.get_json()

        # Update fields
        if 'name' in data:
            student.name = data['name']
        if 'age' in data:
            student.age = data['age']
        if 'email' in data:
            student.email = data['email']
        if 'grade' in data:
            student.grade = data['grade']
        if 'skills' in data:
            student.skills = str(data['skills'])

        db.session.commit()

        return jsonify({
            'message': 'Student updated successfully!',
            'student': student.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update student: {str(e)}'}), 500

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
@teacher_required
def delete_student(current_user, student_id):
    """Delete student (requires teacher or admin role)"""
    try:
        student = Student.query.get_or_404(student_id)

        # Soft delete (mark as inactive instead of actually deleting)
        student.is_active = False
        db.session.commit()

        return jsonify({
            'message': 'Student deleted successfully!'
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete student: {str(e)}'}), 500

# Admin-only routes

@app.route('/api/admin/users', methods=['GET'])
@token_required
@admin_required
def get_all_users(current_user):
    """Get all users (admin only)"""
    try:
        users = User.query.all()
        return jsonify({
            'users': [user.to_dict() for user in users]
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get users: {str(e)}'}), 500

@app.route('/api/admin/users/<int:user_id>/toggle-status', methods=['PUT'])
@token_required
@admin_required
def toggle_user_status(current_user, user_id):
    """Activate/deactivate user (admin only)"""
    try:
        user = User.query.get_or_404(user_id)

        if user.id == current_user.id:
            return jsonify({'message': 'Cannot deactivate your own account!'}), 400

        user.is_active = not user.is_active
        db.session.commit()

        status = 'activated' if user.is_active else 'deactivated'
        return jsonify({
            'message': f'User {status} successfully!',
            'user': user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to toggle user status: {str(e)}'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🔐 Starting Authenticated Student Management API...")
    print("📖 Available endpoints:")
    print("   POST /api/auth/register - Register new user")
    print("   POST /api/auth/login - User login")
    print("   GET  /api/auth/profile - Get user profile")
    print("   PUT  /api/auth/change-password - Change password")
    print("   GET  /api/students - Get students (authenticated)")
    print("   POST /api/students - Create student (authenticated)")
    print("   PUT  /api/students/<id> - Update student (authenticated)")
    print("   DELETE /api/students/<id> - Delete student (teacher/admin)")
    print("   GET  /api/admin/users - Get all users (admin)")
    print("\n🌐 Server running on: http://localhost:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
```

**Updated requirements.txt:**
```txt
Flask==2.3.3
Flask-SQLAlchemy==3.0.5
Flask-JWT-Extended==4.5.2
Werkzeug==2.3.7
PyJWT==2.8.0
SQLAlchemy==2.0.20
click==8.1.7
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
```

### Activity 2: Frontend Authentication Integration (15 min)

**Step 2: Enhanced Frontend with Authentication**
```javascript
// auth_dashboard.js - Enhanced dashboard with authentication
class AuthenticatedDashboard {
    constructor() {
        this.apiBaseUrl = 'http://localhost:5000/api';
        this.currentUser = null;
        this.token = localStorage.getItem('authToken');

        this.init();
    }

    async init() {
        if (this.token) {
            await this.verifyToken();
        } else {
            this.showLoginForm();
        }
    }

    async verifyToken() {
        try {
            const response = await this.makeAPIRequest('/auth/profile');
            this.currentUser = response.user;
            this.setupAuthenticatedDashboard();
        } catch (error) {
            console.log('Token verification failed:', error);
            this.logout();
        }
    }

    showLoginForm() {
        document.body.innerHTML = `
            <div class="auth-container">
                <div class="auth-card">
                    <div class="auth-header">
                        <h2><i class="fas fa-graduation-cap"></i> Student Management</h2>
                        <p>Please login to continue</p>
                    </div>

                    <!-- Login Form -->
                    <form id="loginForm" class="auth-form">
                        <h3>Login</h3>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="loginUsername" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="loginPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-sign-in-alt"></i> Login
                        </button>
                        <p class="auth-link">
                            Don't have an account?
                            <a href="#" id="showRegisterLink">Register here</a>
                        </p>
                    </form>

                    <!-- Registration Form (Initially Hidden) -->
                    <form id="registerForm" class="auth-form hidden">
                        <h3>Register</h3>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" id="registerUsername" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="registerEmail" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="registerPassword" required>
                            <small>Must be at least 8 characters</small>
                        </div>
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" id="confirmPassword" required>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-user-plus"></i> Register
                        </button>
                        <p class="auth-link">
                            Already have an account?
                            <a href="#" id="showLoginLink">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        `;

        this.setupAuthEventListeners();
    }

    setupAuthEventListeners() {
        // Form switching
        document.getElementById('showRegisterLink').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('registerForm').classList.remove('hidden');
        });

        document.getElementById('showLoginLink').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');
        });

        // Login form
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.login();
        });

        // Registration form
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.register();
        });
    }

    async login() {
        try {
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            this.showLoading(true);

            const response = await this.makeAPIRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });

            this.token = response.token;
            this.currentUser = response.user;

            localStorage.setItem('authToken', this.token);
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

            await this.setupAuthenticatedDashboard();
            this.showSuccess('Login successful!');

        } catch (error) {
            this.showError('Login failed: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async register() {
        try {
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                this.showError('Passwords do not match!');
                return;
            }

            if (password.length < 8) {
                this.showError('Password must be at least 8 characters long!');
                return;
            }

            this.showLoading(true);

            await this.makeAPIRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password })
            });

            // Clear form and switch to login
            document.getElementById('registerForm').reset();
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('loginForm').classList.remove('hidden');

            this.showSuccess('Registration successful! Please login.');

        } catch (error) {
            this.showError('Registration failed: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async setupAuthenticatedDashboard() {
        // Load the main dashboard HTML
        document.body.innerHTML = await this.loadDashboardHTML();

        // Display user info
        this.displayUserInfo();

        // Setup dashboard event listeners
        this.setupDashboardEventListeners();

        // Load initial data
        await this.loadInitialData();

        // Start auto-refresh
        this.startAutoRefresh();
    }

    displayUserInfo() {
        const userInfoElement = document.getElementById('userInfo');
        if (userInfoElement && this.currentUser) {
            userInfoElement.innerHTML = `
                <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>${this.currentUser.username}</span>
                    <span class="user-role">${this.currentUser.role}</span>
                    <button class="btn btn-secondary" onclick="dashboard.logout()">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            `;
        }

        // Show/hide admin features
        if (this.currentUser.role === 'admin') {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'block';
            });
        } else {
            document.querySelectorAll('.admin-only').forEach(el => {
                el.style.display = 'none';
            });
        }

        // Show/hide teacher features
        if (this.currentUser.role === 'teacher' || this.currentUser.role === 'admin') {
            document.querySelectorAll('.teacher-only').forEach(el => {
                el.style.display = 'block';
            });
        } else {
            document.querySelectorAll('.teacher-only').forEach(el => {
                el.style.display = 'none';
            });
        }
    }

    async makeAPIRequest(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add authorization header if token exists
        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, config);

        if (response.status === 401) {
            // Token expired or invalid
            this.logout();
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        this.token = null;
        this.currentUser = null;
        this.showLoginForm();
        this.showSuccess('Logged out successfully!');
    }

    async loadDashboardHTML() {
        // This would return the dashboard HTML from Week 12
        // with added authentication features
        return `
            <div class="dashboard-container">
                <!-- Authenticated Header -->
                <header class="dashboard-header">
                    <div class="header-content">
                        <h1><i class="fas fa-graduation-cap"></i> Student Dashboard</h1>
                        <div class="header-controls">
                            <div id="userInfo"></div>
                        </div>
                    </div>
                </header>

                <!-- Stats Section -->
                <section class="stats-section">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fas fa-users"></i></div>
                            <div class="stat-info">
                                <div class="stat-number" id="totalStudents">0</div>
                                <div class="stat-label">Total Students</div>
                            </div>
                        </div>
                        <!-- Other stat cards... -->
                    </div>
                </section>

                <!-- Admin-only User Management -->
                <section class="admin-only" style="display: none;">
                    <div class="section-header">
                        <h3><i class="fas fa-users-cog"></i> User Management</h3>
                        <button class="btn btn-secondary" onclick="dashboard.loadUsers()">
                            <i class="fas fa-refresh"></i> Refresh Users
                        </button>
                    </div>
                    <div id="usersContainer"></div>
                </section>

                <!-- Students Section -->
                <section class="students-section">
                    <div class="section-header">
                        <h3><i class="fas fa-users"></i> Students</h3>
                        <div class="section-controls">
                            <span id="studentCount" class="student-count">0 students</span>
                            <button class="btn btn-primary" onclick="dashboard.showAddStudentModal()">
                                <i class="fas fa-plus"></i> Add Student
                            </button>
                        </div>
                    </div>
                    <div id="studentsContainer" class="students-grid"></div>
                </section>

                <!-- Loading overlay -->
                <div id="loadingOverlay" class="loading-overlay hidden">
                    <div class="loading-spinner">
                        <i class="fas fa-circle-notch fa-spin"></i>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ... rest of the dashboard methods from Week 12
    // but with authentication checks

    async deleteStudent(studentId) {
        // Check if user has permission (teacher or admin)
        if (!['teacher', 'admin'].includes(this.currentUser.role)) {
            this.showError('Permission denied! Only teachers and admins can delete students.');
            return;
        }

        try {
            this.showLoading(true);

            await this.makeAPIRequest(`/students/${studentId}`, {
                method: 'DELETE'
            });

            this.students = this.students.filter(s => s.id !== studentId);
            this.displayStudents(this.students);
            this.showSuccess('Student deleted successfully!');

        } catch (error) {
            this.showError('Failed to delete student: ' + error.message);
        } finally {
            this.showLoading(false);
        }
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
        // Error display logic
        alert('Error: ' + message);
    }

    showSuccess(message) {
        // Success display logic
        alert('Success: ' + message);
    }
}

// Initialize the authenticated dashboard
const dashboard = new AuthenticatedDashboard();
```

### Activity 3: Testing the Authentication System (10 min)

**The Authentication Testing Challenge:**
1. **Test User Registration:**
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword123"
  }'
```

2. **Test User Login:**
```bash
# Login and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepassword123"
  }'
```

3. **Test Protected Endpoint:**
```bash
# Access protected endpoint with token
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

4. **Test Admin Features:**
```bash
# Create admin user (you'll need to do this in code or database)
# Then test admin-only endpoints
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

## ✨ Creative Challenge: Advanced Security Features (20 min)

### Security Enhancements (12 min)
**Students Choose 2-3 Security Features:**

**Multi-Factor Authentication:**
- **Email Verification:** Send codes to user email
- **SMS Verification:** Phone-based 2FA
- **TOTP:** Time-based one-time passwords
- **Backup Codes:** Recovery codes for lost devices

**Advanced Security:**
- **Rate Limiting:** Prevent brute force attacks
- **Account Lockout:** Temporary locks after failed attempts
- **Session Management:** Multiple device management
- **Security Headers:** CSRF protection, security policies
- **Audit Logging:** Track all authentication events

**AI Enhancement Prompts:**
```
"Help me add advanced security features to my authentication system. I need:
1. Rate limiting to prevent brute force attacks
2. Account lockout after failed login attempts
3. Email verification for new registrations
4. Session management with device tracking
5. Security audit logging
6. Password strength validation
7. Two-factor authentication options
Make it enterprise-grade secure!"
```

### User Experience Enhancements (8 min)
**Professional Features:**
- **Remember Me:** Persistent login options
- **Password Reset:** Secure password recovery
- **Profile Management:** User settings and preferences
- **Activity History:** Login history tracking
- **Dark Mode:** Theme switching for user preferences

## 🎉 Show & Tell: Authentication System Showcase (15 min)

### Security Demonstrations (10 min)
- Students demonstrate their complete authentication systems
- Show different user roles and permissions
- Demonstrate security features and protections
- "What's the most impressive security feature you implemented?"

### Security Discussion (5 min)
- "Why is authentication so important for web applications?"
- "What security considerations did you learn about?"
- Discuss privacy, data protection, and user trust

## 🔮 Next Week Preview: User Profiles and Personalization

**The Teaser:**
*"Next week, we're going to build sophisticated user profile systems! You'll create personalized dashboards, user settings management, and advanced profile features. Imagine building a system where each student has their own personalized space, custom settings, and tailored experience - that's what we're building next!"*

**Demo Preview:** Quick demo of a personalized user dashboard with custom settings and preferences

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete authentication system with registration and login
✅ Password hashing and security best practices
✅ JWT token-based session management
✅ User roles and permission system
✅ Protected API endpoints with authorization
✅ Frontend authentication integration with user session management

### Success Criteria:
🎯 **Complete User Registration and Login System**
🎯 **Secure Password Storage with Hashing**
🎯 **JWT Token-Based Authentication**
🎯 **User Roles and Permission System**
🎯 **Protected API Endpoints**
🎯 **Frontend Integration with Session Management**

## 🏆 Weekly Achievement Badge: **Authentication Expert**
*"You've mastered user authentication and security! Your complete login system with password security, session management, and role-based permissions proves you can build secure, professional applications that protect user data and privacy."*

**Real-World Connection:** "The authentication skills you learned today are absolutely critical for modern web development! Every application that handles user data - from banking apps to social media to e-commerce - uses these exact same security principles. You now have the skills to build applications that protect user privacy and maintain the highest security standards!"

## 📚 Extension Activities (Optional Homework)

### For Future Security Experts:
- **Multi-Factor Authentication:** Implement 2FA with email or SMS
- **OAuth Integration:** Add Google/Facebook login options
- **Security Monitoring:** Create a security dashboard to monitor threats
- **Penetration Testing:** Learn to test your own applications for vulnerabilities

### Online Resources:
- **OWASP Security Guide:** Comprehensive web application security
- **JWT Documentation:** Deep dive into JSON Web Tokens
- **Password Security:** Understanding hashing and encryption
- **Web Security Best Practices:** Modern security patterns

### Challenge Problem:
*"Can you implement a complete audit logging system that tracks every authentication attempt, API call, and data change? Maybe add real-time security alerts for suspicious activity patterns!"*

---

**Teacher Notes:**
- Emphasize the critical importance of security in web applications
- Use real-world examples of security breaches and their impact
- Discuss the balance between security and user experience
- Celebrate proper security implementations and professional code
- Keep security best practices documentation for reference
- Discuss ethical considerations and privacy laws (GDPR, COPPA for educational apps)