# Week 11 — Backend API in Python (Flask)

## 🎯 This Week's Mission
_Transform from frontend developers to full-stack engineers! Build your first backend API using Python and Flask. Learn how servers work, create API endpoints, and build the foundation for real web applications that can serve data to any frontend!_

## 🔥 Last Week Showcase
**Full-Stack Portfolio Festival (5 min):**
- "Who built an amazing complete application for Week 10?"
- Quick demos of integrated student portfolio apps
- Highlight full-stack integration, database functionality, and professional polish
- "Phase 1 complete! You've gone from beginners to full-stack developers! Now it's time to level up and learn how to build the servers that power real applications!"

## 🚀 Today's Hook: The Power of Backend APIs (15 min)

**Live Demo: From Client-Side to Server-Side Magic**
Teacher shows the transformation:

**Frontend Only (Limited):**
```javascript
// Static data on frontend
let users = [
    { name: "Sarah", age: 15 },
    { name: "Mike", age: 16 }
];
// Can't share data between devices
// Can't save data permanently
// Limited functionality
```

**Backend API (Unlimited Possibilities):**
```python
# Flask backend serving data to ANY frontend
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(get_users_from_database())

@app.route('/api/users', methods=['POST'])
def create_user():
    new_user = request.json
    save_user_to_database(new_user)
    return jsonify({"message": "User created successfully!"}), 201

# This API can serve:
- Web browsers
- Mobile apps
- Other servers
- IoT devices
- ANY application that needs user data!
```

**The Wow Moment:** Teacher shows a real Flask API running and serving data:
- "See how this Python code is running on a server?"
- "Any application can now connect and get data from this API!"
- "This is how Instagram, Twitter, and Netflix serve data to millions of users!"

**The Phase 2 Promise:**
*"In Phase 2, you will:*
- *Build real backend APIs that can serve data to any application*
- *Create user authentication and authorization systems*
- *Develop social platforms with real-time features*
- *Master the skills that power the entire internet infrastructure*
- *Build production-ready applications that scale to thousands of users"*

## 🧠 Concept Discovery: Understanding Backend Development (15 min)

### What is a Backend? (5 min)
**Simple Explanation:**
*"A backend is like the kitchen of a restaurant. Customers (frontend apps) place orders through a waiter (API), the kitchen (backend) processes the order, and serves the food (data) back to the customer. The backend handles all the business logic, data processing, and storage that users don't see directly."*

**Backend Responsibilities:**
- **API Endpoints:** Handle requests from frontend applications
- **Business Logic:** Process data and make decisions
- **Database Management:** Store, retrieve, and organize data
- **Authentication:** Verify user identity and permissions
- **Security:** Protect data and prevent attacks
- **Performance:** Handle many requests quickly and efficiently

### How APIs Work (5 min)
**Request-Response Cycle:**
```
Frontend App          Backend Server          Database
    |                     |                        |
    |-- GET /users -----> |                        |
    |                     |-- Query DB -----------> |
    |                     |<-- Return Users ------ |
    |<-- JSON Response ---|                        |
    |                     |                        |
```

**HTTP Methods Explained:**
- **GET:** Retrieve data (safe, idempotent)
- **POST:** Create new data
- **PUT/PATCH:** Update existing data
- **DELETE:** Remove data

**API Response Format:**
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "Sarah Johnson",
        "age": 15,
        "email": "sarah@email.com"
    },
    "message": "User retrieved successfully",
    "timestamp": "2024-01-15T10:30:00Z"
}
```

### Introduction to Flask (5 min)
**What is Flask?**
*"Flask is a Python web framework that makes it easy to build web servers and APIs. It's like giving your Python code a voice that can talk to the internet!"*

**Why Flask for Beginners:**
- **Simple syntax:** Easy to learn and understand
- **Minimal setup:** Start building APIs immediately
- **Flexible:** Can grow to complex applications
- **Great documentation:** Excellent learning resources
- **Real-world used:** Powers many production applications

**Basic Flask Structure:**
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')  # Root endpoint
def home():
    return "Welcome to my API!"

@app.route('/api/hello/<name>')  # Dynamic endpoint
def hello(name):
    return {"message": f"Hello, {name}!"}

if __name__ == '__main__':
    app.run(debug=True)  # Start the server
```

## 🛠️ Hands-On Building: Student List API with Flask (40 min)

### Activity 1: Setting Up Flask Development Environment (10 min)

**Step 1: Install Flask and Setup Project**
```bash
# Create project directory
mkdir student_api
cd student_api

# Create virtual environment (best practice)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Flask
pip install flask

# Create project structure
touch app.py
touch requirements.txt
```

**Step 2: Basic Flask Server Structure**
```python
# app.py
from flask import Flask, request, jsonify, abort
from datetime import datetime
import uuid

app = Flask(__name__)

# In-memory database (we'll upgrade to real database later)
students = [
    {
        "id": 1,
        "name": "Sarah Johnson",
        "age": 15,
        "email": "sarah@email.com",
        "grade": 10,
        "skills": ["Python", "JavaScript", "HTML"],
        "join_date": "2024-01-15",
        "active": True
    },
    {
        "id": 2,
        "name": "Mike Chen",
        "age": 16,
        "email": "mike@email.com",
        "grade": 11,
        "skills": ["Python", "React", "CSS"],
        "join_date": "2024-01-20",
        "active": True
    }
]

# Configuration
app.config.update({
    'TESTING': True,
    'DEBUG': True,
    'JSONIFY_PRETTYPRINT_REGULAR': True
})

# Helper functions
def find_student_by_id(student_id):
    """Find student by ID or return None"""
    return next((student for student in students if student['id'] == student_id), None)

def validate_student_data(data):
    """Validate student input data"""
    errors = []

    if not data.get('name') or len(data['name'].strip()) < 2:
        errors.append('Name must be at least 2 characters')

    if not data.get('age') or data['age'] < 13 or data['age'] > 25:
        errors.append('Age must be between 13 and 25')

    if not data.get('email') or '@' not in data['email']:
        errors.append('Valid email is required')

    return errors

# API Routes

@app.route('/')
def home():
    """Root endpoint with API information"""
    return jsonify({
        "name": "Student Management API",
        "version": "1.0.0",
        "description": "A simple API for managing student information",
        "endpoints": {
            "GET /api/students": "Get all students",
            "GET /api/students/<id>": "Get specific student",
            "POST /api/students": "Create new student",
            "PUT /api/students/<id>": "Update student",
            "DELETE /api/students/<id>": "Delete student"
        },
        "total_students": len(students)
    })

@app.route('/api/students', methods=['GET'])
def get_students():
    """Get all students with optional filtering"""
    # Query parameters for filtering
    grade = request.args.get('grade')
    active_only = request.args.get('active_only', 'false').lower() == 'true'

    filtered_students = students.copy()

    # Apply filters
    if grade:
        filtered_students = [s for s in filtered_students if str(s['grade']) == grade]

    if active_only:
        filtered_students = [s for s in filtered_students if s['active']]

    # Add statistics
    response_data = {
        "status": "success",
        "count": len(filtered_students),
        "filters": {
            "grade": grade,
            "active_only": active_only
        },
        "students": filtered_students
    }

    return jsonify(response_data)

@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Get specific student by ID"""
    student = find_student_by_id(student_id)

    if not student:
        return jsonify({
            "status": "error",
            "message": f"Student with ID {student_id} not found"
        }), 404

    return jsonify({
        "status": "success",
        "student": student
    })

@app.route('/api/students', methods=['POST'])
def create_student():
    """Create a new student"""
    if not request.json:
        return jsonify({
            "status": "error",
            "message": "Request must be JSON"
        }), 400

    # Validate input data
    errors = validate_student_data(request.json)
    if errors:
        return jsonify({
            "status": "error",
            "message": "Validation failed",
            "errors": errors
        }), 400

    # Create new student
    new_student = {
        "id": max([s['id'] for s in students]) + 1 if students else 1,
        "name": request.json['name'].strip(),
        "age": request.json['age'],
        "email": request.json['email'].strip().lower(),
        "grade": request.json.get('grade', 10),
        "skills": request.json.get('skills', []),
        "join_date": datetime.now().strftime('%Y-%m-%d'),
        "active": True
    }

    # Check for duplicate email
    if any(s['email'] == new_student['email'] for s in students):
        return jsonify({
            "status": "error",
            "message": "Email already exists"
        }), 409

    students.append(new_student)

    return jsonify({
        "status": "success",
        "message": "Student created successfully",
        "student": new_student
    }), 201  # 201 Created status code

@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update an existing student"""
    student = find_student_by_id(student_id)

    if not student:
        return jsonify({
            "status": "error",
            "message": f"Student with ID {student_id} not found"
        }), 404

    if not request.json:
        return jsonify({
            "status": "error",
            "message": "Request must be JSON"
        }), 400

    # Validate update data
    errors = validate_student_data(request.json)
    if errors:
        return jsonify({
            "status": "error",
            "message": "Validation failed",
            "errors": errors
        }), 400

    # Update student data
    student['name'] = request.json['name'].strip()
    student['age'] = request.json['age']
    student['email'] = request.json['email'].strip().lower()
    student['grade'] = request.json.get('grade', student['grade'])
    student['skills'] = request.json.get('skills', student['skills'])
    student['updated_date'] = datetime.now().strftime('%Y-%m-%d')

    return jsonify({
        "status": "success",
        "message": "Student updated successfully",
        "student": student
    })

@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student"""
    student = find_student_by_id(student_id)

    if not student:
        return jsonify({
            "status": "error",
            "message": f"Student with ID {student_id} not found"
        }), 404

    students.remove(student)

    return jsonify({
        "status": "success",
        "message": f"Student {student['name']} deleted successfully"
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "status": "error",
        "message": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500

# Health check endpoint
@app.route('/api/health')
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "students_count": len(students)
    })

if __name__ == '__main__':
    print("🚀 Starting Student Management API...")
    print("📖 Available endpoints:")
    print("   GET  /api/students - Get all students")
    print("   GET  /api/students/<id> - Get specific student")
    print("   POST /api/students - Create new student")
    print("   PUT  /api/students/<id> - Update student")
    print("   DELETE /api/students/<id> - Delete student")
    print("   GET  /api/health - Health check")
    print("\n🌐 Server running on: http://localhost:5000")
    print("📚 API Documentation: http://localhost:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
```

**requirements.txt:**
```
Flask==2.3.3
Werkzeug==2.3.7
click==8.1.7
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
```

### Activity 2: Testing and Using the API (15 min)

**The API Testing Challenge:** "Test your API using different HTTP methods and requests!"

**Step 1: Start the Server**
```bash
# Activate virtual environment
source venv/bin/activate  # Mac/Linux
# or venv\Scripts\activate  # Windows

# Run the Flask server
python app.py
```

**Step 2: Test with curl (Command Line)**
```bash
# Test GET all students
curl http://localhost:5000/api/students

# Test GET specific student
curl http://localhost:5000/api/students/1

# Test POST new student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Thompson",
    "age": 17,
    "email": "alex@email.com",
    "grade": 12,
    "skills": ["Python", "SQL", "Docker"]
  }'

# Test with filters
curl "http://localhost:5000/api/students?grade=10&active_only=true"
```

**Step 3: Create Simple API Client**
```python
# api_client.py - Test your API with Python
import requests
import json

API_BASE_URL = "http://localhost:5000/api"

class StudentAPIClient:
    def __init__(self, base_url=API_BASE_URL):
        self.base_url = base_url

    def get_all_students(self):
        """Get all students"""
        response = requests.get(f"{self.base_url}/students")
        return response.json()

    def get_student(self, student_id):
        """Get specific student"""
        response = requests.get(f"{self.base_url}/students/{student_id}")
        return response.json()

    def create_student(self, student_data):
        """Create new student"""
        response = requests.post(
            f"{self.base_url}/students",
            json=student_data,
            headers={'Content-Type': 'application/json'}
        )
        return response.json()

    def update_student(self, student_id, student_data):
        """Update student"""
        response = requests.put(
            f"{self.base_url}/students/{student_id}",
            json=student_data,
            headers={'Content-Type': 'application/json'}
        )
        return response.json()

    def delete_student(self, student_id):
        """Delete student"""
        response = requests.delete(f"{self.base_url}/students/{student_id}")
        return response.json()

    def get_students_by_grade(self, grade):
        """Get students by grade"""
        response = requests.get(f"{self.base_url}/students?grade={grade}")
        return response.json()

# Test the API
if __name__ == "__main__":
    client = StudentAPIClient()

    print("🧪 Testing Student Management API\n")

    # Test GET all students
    print("1. Getting all students:")
    result = client.get_all_students()
    print(json.dumps(result, indent=2))

    # Test POST new student
    print("\n2. Creating new student:")
    new_student = {
        "name": "Emma Wilson",
        "age": 15,
        "email": "emma@email.com",
        "grade": 10,
        "skills": ["JavaScript", "React", "CSS"]
    }
    result = client.create_student(new_student)
    print(json.dumps(result, indent=2))

    # Test GET filtered students
    print("\n3. Getting 10th grade students:")
    result = client.get_students_by_grade(10)
    print(json.dumps(result, indent=2))
```

### Activity 3: Advanced API Features (15 min)

**Choose Your Enhancement:**

**Option A: Advanced Filtering and Search**
```python
# Add to app.py
@app.route('/api/students/search', methods=['GET'])
def search_students():
    """Advanced student search"""
    query = request.args.get('q', '').lower()
    min_age = request.args.get('min_age', type=int)
    max_age = request.args.get('max_age', type=int)
    skills = request.args.getlist('skills')

    filtered_students = []

    for student in students:
        # Text search
        if query:
            if (query not in student['name'].lower() and
                query not in student['email'].lower()):
                continue

        # Age filter
        if min_age and student['age'] < min_age:
            continue
        if max_age and student['age'] > max_age:
            continue

        # Skills filter
        if skills and not any(skill in student['skills'] for skill in skills):
            continue

        filtered_students.append(student)

    return jsonify({
        "status": "success",
        "count": len(filtered_students),
        "query": {
            "search": query,
            "min_age": min_age,
            "max_age": max_age,
            "skills": skills
        },
        "students": filtered_students
    })
```

**Option B: Statistics and Analytics Endpoint**
```python
@app.route('/api/students/stats', methods=['GET'])
def get_student_stats():
    """Get student statistics and analytics"""
    if not students:
        return jsonify({
            "status": "success",
            "stats": {
                "total_students": 0,
                "grade_distribution": {},
                "age_distribution": {},
                "skill_popularity": {},
                "average_age": 0,
                "join_trend": {}
            }
        })

    # Calculate statistics
    stats = {
        "total_students": len(students),
        "active_students": len([s for s in students if s['active']]),
        "grade_distribution": {},
        "age_distribution": {},
        "skill_popularity": {},
        "average_age": sum(s['age'] for s in students) / len(students)
    }

    # Grade distribution
    for student in students:
        grade = str(student['grade'])
        stats["grade_distribution"][grade] = stats["grade_distribution"].get(grade, 0) + 1

    # Age distribution
    for student in students:
        age = str(student['age'])
        stats["age_distribution"][age] = stats["age_distribution"].get(age, 0) + 1

    # Skill popularity
    for student in students:
        for skill in student['skills']:
            stats["skill_popularity"][skill] = stats["skill_popularity"].get(skill, 0) + 1

    # Sort by popularity
    stats["skill_popularity"] = dict(
        sorted(stats["skill_popularity"].items(), key=lambda x: x[1], reverse=True)
    )

    return jsonify({
        "status": "success",
        "stats": stats,
        "generated_at": datetime.now().isoformat()
    })
```

## ✨ Creative Challenge: API Enhancement (20 min)

### Advanced API Features (12 min)
**Students Choose 2-3 Enhancements:**

**Production Features:**
- **Rate Limiting:** Prevent API abuse with request limits
- **Pagination:** Handle large datasets efficiently
- **Caching:** Improve performance with response caching
- **Logging:** Track API usage and errors
- **Versioning:** Support multiple API versions

**Advanced Functionality:**
- **Bulk Operations:** Create/update multiple students at once
- **File Upload:** Handle student profile pictures or documents
- **Data Export:** Export student data as CSV or PDF
- **Real-time Updates:** WebSocket support for live data

**AI Enhancement Prompts:**
```
"Help me add advanced features to my Flask student API. I need:
1. Rate limiting to prevent API abuse
2. Pagination for handling large datasets
3. Request/response caching for better performance
4. Comprehensive logging for monitoring
5. Bulk operations for efficiency
6. Data validation and error handling
7. API documentation generation
Make it production-ready and professional!"
```

### API Documentation and Testing (8 min)
**Professional Polish:**
- Create comprehensive API documentation
- Set up automated testing
- Add health check and monitoring endpoints
- Create Postman collection for easy testing

## 🎉 Show & Tell: Backend API Showcase (15 min)

### Live API Demonstrations (10 min)
- Students demonstrate their Flask APIs
- Show different HTTP methods and endpoints
- Demonstrate advanced features like filtering and analytics
- "What's the most impressive API endpoint you built?"

### Backend Development Discussion (5 min)
- "How is backend development different from frontend?"
- "What types of applications would benefit from your API?"
- Discuss API-first development and microservices

## 🔮 Next Week Preview: Frontend-Backend Integration

**The Teaser:**
*"Next week, we're going to connect our frontend applications to backend APIs! You'll learn how web applications talk to servers, create real-time dashboards that update with live data, and build complete full-stack applications that can scale to thousands of users. Imagine building a social media feed that updates instantly, or a dashboard that shows live analytics - that's what we're building next!"*

**Demo Preview:** Quick demo of a frontend application making real API calls to a Flask backend

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete Flask API with all CRUD operations
✅ Multiple API endpoints with proper HTTP methods
✅ Data validation and error handling
✅ API testing with curl and Python client
✅ Advanced features (filtering, analytics, etc.)
✅ Professional code structure and documentation

### Success Criteria:
🎯 **Working Flask API with Complete CRUD Operations**
🎯 **Multiple API Endpoints with Different HTTP Methods**
🎯 **Data Validation and Comprehensive Error Handling**
🎯 **API Testing with curl and Python Client**
🎯 **Advanced Features like Filtering and Analytics**
🎯 **Professional Code Structure and Documentation**

## 🏆 Weekly Achievement Badge: **Backend Developer**
*"You've mastered backend development with Flask! Your student management API proves you can build professional server-side applications that can serve data to any frontend."*

**Real-World Connection:** "The Flask API skills you learned today power millions of web applications! Companies like Netflix, Airbnb, and Uber use similar backend technologies to serve data to their web and mobile applications. You're learning the exact technology that runs the internet's infrastructure!"

## 📚 Extension Activities (Optional Homework)

### For Future Backend Developers:
- **Database Integration:** Connect Flask to PostgreSQL or MongoDB
- **Authentication System:** Implement JWT-based user authentication
- **API Documentation:** Use Flask-RESTX or Swagger for auto-documentation
- **Deployment:** Deploy API to cloud platforms (Heroku, AWS, DigitalOcean)

### Online Resources:
- **Flask Official Documentation:** Comprehensive Flask guide
- **REST API Design:** Best practices for API development
- **API Testing Tools:** Postman and Insomnia tutorials
- **Backend Development:** Advanced backend concepts and patterns

### Challenge Problem:
*"Can you enhance your API with real-time features? Maybe add WebSocket support for live updates, or implement a notification system that pushes updates to connected clients?"*

---

**Teacher Notes:**
- Emphasize the importance of proper error handling and data validation
- Use browser developer tools to show students real API requests and responses
- Discuss API security concerns and best practices
- Celebrate successful API integrations and professional code structure
- Keep examples of working APIs for inspiration and reference