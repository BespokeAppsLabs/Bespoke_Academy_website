# Week 14 — User Profiles

## 🎯 This Week's Mission
_Transform your authentication system into a personalized user experience! Build sophisticated user profiles with customizable dashboards, personal settings, preferences management, and user activity tracking. Create applications that remember each user and adapt to their individual needs and interests!_

## 🔥 Last Week Showcase
**Authentication Security Festival (5 min):**
- "Who built an amazing authentication system last week?"
- Quick demos of login systems with password security and role-based permissions
- Highlight secure authentication flows and protection mechanisms
- "Last week you mastered security! This week we're going to personalize the experience - making each user feel like the application was built just for them!"

## 🚀 Today's Hook: The Power of Personalization (15 min)

**Live Demo: Generic vs Personalized Applications**
Teacher shows two versions of the same application:

**Generic Application (Cold):**
```javascript
// Same experience for everyone
showDashboard(); // Same dashboard for all users
showWelcomeMessage("Welcome, User!"); // Impersonal
showDefaultTheme(); // Same colors, same layout
showAllFeatures(); // Same features for everyone
```

**Personalized Application (Amazing):**
```javascript
// Tailored experience for each user
showDashboard(user.preferences.layout); // User's chosen layout
showWelcomeMessage(`Welcome back, ${user.name}! Last here ${user.lastLogin}`);
showUserTheme(user.preferences.theme); // User's favorite colors
showPersonalizedFeatures(user.role, user.interests); // Relevant features
showRecentActivity(user.recentItems); // User's recent work
```

**The Personalization Moment:** Teacher shows a personalized dashboard:
- "See how this application remembers Sarah's favorite theme and layout?"
- "Notice how it shows Mike's recent projects and suggested next steps?"
- "This is how Netflix, Spotify, and Amazon create experiences that feel personal and engaging!"

**The Week's Promise:**
*"Today you will:*
- *Build sophisticated user profiles with personal preferences and settings*
- *Create customizable dashboards that adapt to individual user needs*
- *Implement user activity tracking and personalization algorithms*
- *Master the user experience techniques that make applications addictive and engaging*
- *Build applications that feel like they were designed specifically for each user"*

## 🧠 Concept Discovery: User Experience Personalization (15 min)

### Why Personalization Matters (5 min)
**User Engagement Benefits:**
- **Higher Retention:** Personalized apps have 40% higher user retention
- **Increased Usage:** Users spend 2x more time on personalized platforms
- **Better Conversion:** Personalization increases conversion rates by 20%
- **User Satisfaction:** Personalized experiences have 60% higher satisfaction ratings

**Real-World Examples:**
- **Netflix:** Recommends shows based on viewing history
- **Amazon:** Shows products based on browsing and purchase history
- **Spotify:** Creates personalized playlists and recommendations
- **YouTube:** Tailors video recommendations to user interests
- **Instagram:** Shows content from accounts user interacts with most

### Types of Personalization (5 min)

**Visual Personalization:**
```javascript
// Themes and appearance
user.preferences = {
    theme: 'dark',           // dark, light, auto
    primaryColor: '#667eea', // User's favorite color
    fontSize: 'medium',      // small, medium, large
    layout: 'grid',         // grid, list, cards
    sidebarCollapsed: false
};
```

**Content Personalization:**
```javascript
// Relevant content based on user behavior
user.personalization = {
    interests: ['coding', 'gaming', 'music'],
    skillLevel: 'intermediate',
    recentActivity: ['Python course', 'JavaScript project'],
    learningGoals: ['Full-stack development', 'Machine learning'],
    preferredLearningStyle: 'visual'
};
```

**Functional Personalization:**
```javascript
// Customized features and workflows
user.workflow = {
    favoriteTools: ['VS Code', 'Git', 'Chrome DevTools'],
    quickActions: ['new project', 'run tests', 'deploy'],
    dashboardWidgets: ['stats', 'recent projects', 'calendar'],
    notifications: {
        email: true,
        push: false,
        frequency: 'daily'
    }
};
```

### Data Collection and Privacy (5 min)
**Ethical Data Collection:**
```javascript
// Always ask for consent
if (!user.consentsToTracking) {
    useDefaultExperience();
    return;
}

// Be transparent about what you collect
user.dataCollection = {
    pageViews: true,           // Which pages they visit
    featureUsage: true,        // Which features they use
    timeSpent: false,          // How long they spend (optional)
    location: false,           // Geographic data (optional)
    personalInfo: false        // Sensitive personal data (avoid)
};

// Allow users to control their data
user.dataControls = {
    viewingHistory: true,      // Can see their own activity
    deleteHistory: true,       // Can delete their data
    exportData: true,          // Can download their data
    optOutTracking: true       // Can disable tracking
};
```

**Privacy Best Practices:**
- **Transparency:** Clearly explain what data you collect and why
- **Consent:** Always ask for permission before collecting personal data
- **Control:** Give users control over their data and privacy settings
- **Security:** Protect all personal data with encryption and security measures
- **Minimal Collection:** Only collect data necessary for personalization

## 🛠️ Hands-On Building: Advanced User Profile System (40 min)

### Activity 1: Enhanced User Profile Database (15 min)

**Step 1: Extended User Profile Model**
```python
# profiles_app.py - Enhanced Flask with user profiles
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import datetime
import json

app = Flask(__name__)
app.config.update({
    'SECRET_KEY': 'your-secret-key-change-in-production',
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///profiles.db',
    'SQLALCHEMY_TRACK_MODIFICATIONS': False
})

db = SQLAlchemy(app)

# Enhanced User Model with Profile Data
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    last_login = db.Column(db.DateTime)

    # Profile Information
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    bio = db.Column(db.Text)
    avatar_url = db.Column(db.String(500))
    birth_date = db.Column(db.Date)
    location = db.Column(db.String(100))
    website = db.Column(db.String(200))
    github_username = db.Column(db.String(100))

    # Learning Preferences
    skill_level = db.Column(db.String(20), default='beginner')  # beginner, intermediate, advanced
    learning_goals = db.Column(db.Text)  # JSON array
    interests = db.Column(db.Text)        # JSON array
    preferred_learning_style = db.Column(db.String(50))  # visual, auditory, kinesthetic

    # App Preferences (JSON)
    preferences = db.Column(db.Text)      # Theme, layout, notifications, etc.

    # Privacy Settings
    privacy_settings = db.Column(db.Text) # JSON: profile visibility, data sharing, etc.

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username

    def get_preferences(self):
        """Get user preferences as dictionary"""
        if self.preferences:
            try:
                return json.loads(self.preferences)
            except:
                return self.get_default_preferences()
        return self.get_default_preferences()

    def set_preferences(self, prefs):
        """Set user preferences from dictionary"""
        self.preferences = json.dumps(prefs)

    def get_default_preferences(self):
        """Get default preferences for new users"""
        return {
            'theme': 'light',
            'language': 'en',
            'timezone': 'UTC',
            'dateFormat': 'MM/DD/YYYY',
            'notifications': {
                'email': True,
                'push': True,
                'updates': True,
                'reminders': True
            },
            'dashboard': {
                'layout': 'grid',
                'widgets': ['stats', 'recent_activity', 'upcoming_deadlines'],
                'items_per_page': 20
            },
            'privacy': {
                'profile_visible': True,
                'activity_visible': True,
                'show_email': False,
                'show_location': False
            }
        }

    def get_privacy_settings(self):
        """Get privacy settings as dictionary"""
        if self.privacy_settings:
            try:
                return json.loads(self.privacy_settings)
            except:
                return self.get_default_privacy_settings()
        return self.get_default_privacy_settings()

    def set_privacy_settings(self, settings):
        """Set privacy settings from dictionary"""
        self.privacy_settings = json.dumps(settings)

    def get_default_privacy_settings(self):
        """Get default privacy settings"""
        return {
            'profile_visible': True,
            'activity_visible': True,
            'show_email': False,
            'show_location': False,
            'allow_messages': True,
            'data_collection': True,
            'analytics': True
        }

    def get_learning_data(self):
        """Get learning-related data"""
        return {
            'skill_level': self.skill_level,
            'learning_goals': json.loads(self.learning_goals) if self.learning_goals else [],
            'interests': json.loads(self.interests) if self.interests else [],
            'preferred_learning_style': self.preferred_learning_style
        }

    def set_learning_data(self, data):
        """Set learning-related data"""
        if 'learning_goals' in data:
            self.learning_goals = json.dumps(data['learning_goals'])
        if 'interests' in data:
            self.interests = json.dumps(data['interests'])
        if 'skill_level' in data:
            self.skill_level = data['skill_level']
        if 'preferred_learning_style' in data:
            self.preferred_learning_style = data['preferred_learning_style']

    def to_dict(self, include_sensitive=False):
        """Convert user to dictionary with customizable fields"""
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email if include_sensitive else None,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'bio': self.bio,
            'avatar_url': self.avatar_url,
            'birth_date': self.birth_date.isoformat() if self.birth_date else None,
            'location': self.location,
            'website': self.website,
            'github_username': self.github_username
        }

        # Add learning data
        data.update(self.get_learning_data())

        # Add preferences (respect privacy settings)
        privacy = self.get_privacy_settings()
        if privacy.get('profile_visible', True):
            data['preferences'] = self.get_preferences()
            data['privacy_settings'] = privacy

        return data

# User Activity Tracking
class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)  # login, page_view, action, etc.
    activity_data = db.Column(db.Text)  # JSON with additional data
    ip_address = db.Column(db.String(45))
    user_agent = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship('User', backref='activities')

    def to_dict(self):
        return {
            'id': self.id,
            'activity_type': self.activity_type,
            'activity_data': json.loads(self.activity_data) if self.activity_data else {},
            'ip_address': self.ip_address,
            'created_at': self.created_at.isoformat()
        }

# User Favorites and Bookmarks
class UserFavorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_type = db.Column(db.String(50), nullable=False)  # student, course, project, etc.
    item_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship('User', backref='favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'item_type': self.item_type,
            'item_id': self.item_id,
            'created_at': self.created_at.isoformat()
        }

# Create database tables
with app.app_context():
    db.create_all()

# Helper functions (from Week 13)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'message': 'Token is missing or invalid!'}), 401

        try:
            token = token[7:]
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

# Track user activity
def track_activity(user, activity_type, data=None):
    """Track user activity for personalization"""
    activity = UserActivity(
        user_id=user.id,
        activity_type=activity_type,
        activity_data=json.dumps(data) if data else None,
        ip_address=request.remote_addr,
        user_agent=request.headers.get('User-Agent', '')
    )
    db.session.add(activity)
    db.session.commit()

# Authentication routes (from Week 13 with activity tracking)
@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login with activity tracking"""
    try:
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'message': 'Username and password are required!'}), 400

        user = User.query.filter_by(username=data['username']).first()

        if not user or not user.check_password(data['password']):
            return jsonify({'message': 'Invalid username or password!'}), 401

        if not user.is_active:
            return jsonify({'message': 'Account is deactivated!'}), 401

        # Track login activity
        track_activity(user, 'login', {
            'success': True,
            'remember_me': data.get('remember_me', False)
        })

        # Update last login
        user.last_login = datetime.datetime.utcnow()
        db.session.commit()

        # Generate token
        token = jwt.encode({
            'user_id': user.id,
            'username': user.username,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)  # 7 days
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'message': 'Login successful!',
            'token': token,
            'user': user.to_dict()
        }), 200

    except Exception as e:
        return jsonify({'message': f'Login failed: {str(e)}'}), 500

# Profile Management Routes
@app.route('/api/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get current user's complete profile"""
    try:
        # Get user's recent activities
        recent_activities = UserActivity.query.filter_by(user_id=current_user.id)\
            .order_by(UserActivity.created_at.desc())\
            .limit(10)\
            .all()

        # Get user's favorites
        favorites = UserFavorite.query.filter_by(user_id=current_user.id).all()

        profile_data = current_user.to_dict(include_sensitive=True)
        profile_data['recent_activities'] = [activity.to_dict() for activity in recent_activities]
        profile_data['favorites'] = [favorite.to_dict() for favorite in favorites]

        return jsonify({
            'user': profile_data
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get profile: {str(e)}'}), 500

@app.route('/api/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    """Update user's profile information"""
    try:
        data = request.get_json()

        # Update basic profile info
        if 'first_name' in data:
            current_user.first_name = data['first_name']
        if 'last_name' in data:
            current_user.last_name = data['last_name']
        if 'bio' in data:
            current_user.bio = data['bio']
        if 'location' in data:
            current_user.location = data['location']
        if 'website' in data:
            current_user.website = data['website']
        if 'github_username' in data:
            current_user.github_username = data['github_username']

        # Update learning preferences
        learning_data = {}
        if 'skill_level' in data or 'learning_goals' in data or 'interests' in data or 'preferred_learning_style' in data:
            if 'skill_level' in data:
                learning_data['skill_level'] = data['skill_level']
            if 'learning_goals' in data:
                learning_data['learning_goals'] = data['learning_goals']
            if 'interests' in data:
                learning_data['interests'] = data['interests']
            if 'preferred_learning_style' in data:
                learning_data['preferred_learning_style'] = data['preferred_learning_style']

            current_user.set_learning_data(learning_data)

        db.session.commit()

        # Track profile update activity
        track_activity(current_user, 'profile_update', {
            'fields_updated': list(data.keys())
        })

        return jsonify({
            'message': 'Profile updated successfully!',
            'user': current_user.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update profile: {str(e)}'}), 500

@app.route('/api/profile/preferences', methods=['PUT'])
@token_required
def update_preferences(current_user):
    """Update user's app preferences"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'message': 'No preferences provided!'}), 400

        # Get current preferences and merge with new ones
        current_prefs = current_user.get_preferences()

        # Deep merge preferences
        def deep_merge(target, source):
            for key, value in source.items():
                if key in target and isinstance(target[key], dict) and isinstance(value, dict):
                    deep_merge(target[key], value)
                else:
                    target[key] = value

        deep_merge(current_prefs, data)
        current_user.set_preferences(current_prefs)

        db.session.commit()

        # Track preferences update activity
        track_activity(current_user, 'preferences_update', {
            'preferences_updated': list(data.keys())
        })

        return jsonify({
            'message': 'Preferences updated successfully!',
            'preferences': current_user.get_preferences()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update preferences: {str(e)}'}), 500

@app.route('/api/profile/privacy', methods=['PUT'])
@token_required
def update_privacy_settings(current_user):
    """Update user's privacy settings"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'message': 'No privacy settings provided!'}), 400

        current_user.set_privacy_settings(data)
        db.session.commit()

        # Track privacy settings update activity
        track_activity(current_user, 'privacy_update', {
            'settings_updated': list(data.keys())
        })

        return jsonify({
            'message': 'Privacy settings updated successfully!',
            'privacy_settings': current_user.get_privacy_settings()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update privacy settings: {str(e)}'}), 500

@app.route('/api/profile/upload-avatar', methods=['POST'])
@token_required
def upload_avatar(current_user):
    """Upload user avatar (simplified version)"""
    try:
        if 'avatar' not in request.files:
            return jsonify({'message': 'No avatar file provided!'}), 400

        file = request.files['avatar']

        if file.filename == '':
            return jsonify({'message': 'No file selected!'}), 400

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            return jsonify({'message': 'Invalid file type! Only PNG, JPG, JPEG, GIF allowed.'}), 400

        # In production, save to cloud storage (AWS S3, etc.)
        # For demo, we'll just store a URL
        avatar_url = f"https://api.dicebear.com/7.x/avataaars/svg?seed={current_user.username}"

        current_user.avatar_url = avatar_url
        db.session.commit()

        # Track avatar upload activity
        track_activity(current_user, 'avatar_upload', {
            'file_type': file.filename.split('.')[-1]
        })

        return jsonify({
            'message': 'Avatar uploaded successfully!',
            'avatar_url': avatar_url
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to upload avatar: {str(e)}'}), 500

@app.route('/api/profile/favorites', methods=['GET'])
@token_required
def get_favorites(current_user):
    """Get user's favorites"""
    try:
        favorites = UserFavorite.query.filter_by(user_id=current_user.id).all()

        return jsonify({
            'favorites': [favorite.to_dict() for favorite in favorites]
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get favorites: {str(e)}'}), 500

@app.route('/api/profile/favorites', methods=['POST'])
@token_required
def add_favorite(current_user):
    """Add item to user's favorites"""
    try:
        data = request.get_json()

        if not data or not data.get('item_type') or not data.get('item_id'):
            return jsonify({'message': 'Item type and ID are required!'}), 400

        # Check if already favorited
        existing = UserFavorite.query.filter_by(
            user_id=current_user.id,
            item_type=data['item_type'],
            item_id=data['item_id']
        ).first()

        if existing:
            return jsonify({'message': 'Item already in favorites!'}), 409

        favorite = UserFavorite(
            user_id=current_user.id,
            item_type=data['item_type'],
            item_id=data['item_id']
        )

        db.session.add(favorite)
        db.session.commit()

        # Track favorite activity
        track_activity(current_user, 'favorite_added', {
            'item_type': data['item_type'],
            'item_id': data['item_id']
        })

        return jsonify({
            'message': 'Added to favorites!',
            'favorite': favorite.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to add favorite: {str(e)}'}), 500

@app.route('/api/profile/favorites/<int:favorite_id>', methods=['DELETE'])
@token_required
def remove_favorite(current_user, favorite_id):
    """Remove item from user's favorites"""
    try:
        favorite = UserFavorite.query.filter_by(
            id=favorite_id,
            user_id=current_user.id
        ).first()

        if not favorite:
            return jsonify({'message': 'Favorite not found!'}), 404

        db.session.delete(favorite)
        db.session.commit()

        # Track favorite removal activity
        track_activity(current_user, 'favorite_removed', {
            'item_type': favorite.item_type,
            'item_id': favorite.item_id
        })

        return jsonify({'message': 'Removed from favorites!'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to remove favorite: {str(e)}'}), 500

# Personalization API
@app.route('/api/personalized/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user):
    """Get personalized recommendations based on user profile and activity"""
    try:
        user_data = current_user.get_learning_data()
        user_prefs = current_user.get_preferences()

        # Analyze user's recent activities
        recent_activities = UserActivity.query.filter_by(user_id=current_user.id)\
            .order_by(UserActivity.created_at.desc())\
            .limit(20)\
            .all()

        # Generate recommendations based on:
        # 1. User's interests and skill level
        # 2. Recent activities
        # 3. Learning goals
        # 4. Popular items among similar users

        recommendations = []

        # Interest-based recommendations
        interests = user_data.get('interests', [])
        if interests:
            recommendations.extend([
                {
                    'type': 'course',
                    'title': f'Advanced {interests[0].title()} Tutorial',
                    'description': f'Based on your interest in {interests[0]}',
                    'reason': 'interest_match',
                    'priority': 'high'
                }
            ])

        # Skill level recommendations
        skill_level = user_data.get('skill_level', 'beginner')
        if skill_level == 'beginner':
            recommendations.extend([
                {
                    'type': 'tutorial',
                    'title': 'Getting Started Guide',
                    'description': 'Perfect for beginners!',
                    'reason': 'skill_level_match',
                    'priority': 'high'
                }
            ])
        elif skill_level == 'intermediate':
            recommendations.extend([
                {
                    'type': 'project',
                    'title': 'Intermediate Challenge Project',
                    'description': 'Test your intermediate skills',
                    'reason': 'skill_level_match',
                    'priority': 'medium'
                }
            ])

        # Activity-based recommendations
        activity_types = [a.activity_type for a in recent_activities]
        if 'student_created' in activity_types:
            recommendations.extend([
                {
                    'type': 'student',
                    'title': 'Create Another Student Profile',
                    'description': 'You seem to enjoy creating student profiles',
                    'reason': 'activity_pattern',
                    'priority': 'medium'
                }
            ])

        return jsonify({
            'recommendations': recommendations[:10],  # Limit to 10 recommendations
            'based_on': {
                'interests': interests,
                'skill_level': skill_level,
                'recent_activities': len(recent_activities),
                'learning_goals': user_data.get('learning_goals', [])
            }
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get recommendations: {str(e)}'}), 500

if __name__ == '__main__':
    print("👤 Starting Enhanced User Profile API...")
    print("📖 Available endpoints:")
    print("   GET  /api/profile - Get complete user profile")
    print("   PUT  /api/profile - Update profile information")
    print("   PUT  /api/profile/preferences - Update preferences")
    print("   PUT  /api/profile/privacy - Update privacy settings")
    print("   POST /api/profile/upload-avatar - Upload avatar")
    print("   GET  /api/profile/favorites - Get favorites")
    print("   POST /api/profile/favorites - Add favorite")
    print("   DELETE /api/profile/favorites/<id> - Remove favorite")
    print("   GET  /api/personalized/recommendations - Get recommendations")
    print("\n🌐 Server running on: http://localhost:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
```

### Activity 2: Personalized Frontend Experience (15 min)

**Step 2: Personalized Dashboard Frontend**
```javascript
// personalized_dashboard.js - Frontend with personalization
class PersonalizedDashboard {
    constructor() {
        this.apiBaseUrl = 'http://localhost:5000/api';
        this.currentUser = null;
        this.token = localStorage.getItem('authToken');
        this.userProfile = null;

        this.init();
    }

    async init() {
        if (this.token) {
            await this.loadUserProfile();
            await this.setupPersonalizedDashboard();
            this.trackActivity('dashboard_load');
        } else {
            this.showLoginForm();
        }
    }

    async loadUserProfile() {
        try {
            const response = await this.makeAPIRequest('/profile');
            this.userProfile = response.user;
            this.currentUser = this.userProfile;
            this.applyUserPreferences();
        } catch (error) {
            console.error('Failed to load user profile:', error);
            this.logout();
        }
    }

    applyUserPreferences() {
        if (!this.userProfile || !this.userProfile.preferences) return;

        const prefs = this.userProfile.preferences;

        // Apply theme
        this.applyTheme(prefs.theme || 'light');

        // Apply language
        if (prefs.language) {
            document.documentElement.lang = prefs.language;
        }

        // Apply dashboard layout
        if (prefs.dashboard && prefs.dashboard.layout) {
            this.setDashboardLayout(prefs.dashboard.layout);
        }

        // Apply dashboard widgets
        if (prefs.dashboard && prefs.dashboard.widgets) {
            this.setDashboardWidgets(prefs.dashboard.widgets);
        }
    }

    applyTheme(theme) {
        const body = document.body;

        // Remove all theme classes
        body.classList.remove('theme-light', 'theme-dark', 'theme-auto');

        if (theme === 'auto') {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
        } else {
            body.classList.add(`theme-${theme}`);
        }

        // Save theme preference
        if (this.userProfile) {
            this.updatePreferences({ theme });
        }
    }

    setDashboardLayout(layout) {
        const container = document.getElementById('dashboardContainer');
        container.classList.remove('layout-grid', 'layout-list', 'layout-cards');
        container.classList.add(`layout-${layout}`);

        // Save layout preference
        if (this.userProfile) {
            this.updatePreferences({ dashboard: { layout } });
        }
    }

    setDashboardWidgets(widgets) {
        const widgetsContainer = document.getElementById('widgetsContainer');
        if (!widgetsContainer) return;

        // Clear existing widgets
        widgetsContainer.innerHTML = '';

        // Add enabled widgets
        widgets.forEach(widget => {
            const widgetElement = this.createWidget(widget);
            if (widgetElement) {
                widgetsContainer.appendChild(widgetElement);
            }
        });

        // Save widgets preference
        if (this.userProfile) {
            this.updatePreferences({ dashboard: { widgets } });
        }
    }

    createWidget(widgetType) {
        const widgets = {
            'stats': () => this.createStatsWidget(),
            'recent_activity': () => this.createRecentActivityWidget(),
            'upcoming_deadlines': () => this.createUpcomingDeadlinesWidget(),
            'learning_progress': () => this.createLearningProgressWidget(),
            'recommendations': () => this.createRecommendationsWidget()
        };

        return widgets[widgetType] ? widgets[widgetType]() : null;
    }

    createStatsWidget() {
        return `
            <div class="widget stats-widget">
                <div class="widget-header">
                    <h3><i class="fas fa-chart-bar"></i> Your Statistics</h3>
                    <button class="widget-toggle" onclick="dashboard.toggleWidget(this)">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                <div class="widget-content">
                    <div class="stat-grid">
                        <div class="stat-item">
                            <div class="stat-value">${this.userProfile.recent_activities?.length || 0}</div>
                            <div class="stat-label">Activities</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.userProfile.favorites?.length || 0}</div>
                            <div class="stat-label">Favorites</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.userProfile.skill_level || 'Beginner'}</div>
                            <div class="stat-label">Skill Level</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${this.userProfile.interests?.length || 0}</div>
                            <div class="stat-label">Interests</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createRecentActivityWidget() {
        const activities = this.userProfile.recent_activities || [];
        if (activities.length === 0) {
            return `
                <div class="widget recent-activity-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-history"></i> Recent Activity</h3>
                    </div>
                    <div class="widget-content">
                        <p class="empty-state">No recent activity</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="widget recent-activity-widget">
                <div class="widget-header">
                    <h3><i class="fas fa-history"></i> Recent Activity</h3>
                    <button class="widget-toggle" onclick="dashboard.toggleWidget(this)">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                <div class="widget-content">
                    <div class="activity-list">
                        ${activities.slice(0, 5).map(activity => `
                            <div class="activity-item">
                                <div class="activity-icon">
                                    ${this.getActivityIcon(activity.activity_type)}
                                </div>
                                <div class="activity-details">
                                    <div class="activity-title">${this.getActivityTitle(activity)}</div>
                                    <div class="activity-time">${this.formatTime(activity.created_at)}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    createRecommendationsWidget() {
        return `
            <div class="widget recommendations-widget">
                <div class="widget-header">
                    <h3><i class="fas fa-magic"></i> Recommended for You</h3>
                    <button class="widget-toggle" onclick="dashboard.toggleWidget(this)">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                <div class="widget-content">
                    <div id="recommendationsList">
                        <div class="loading-spinner">
                            <i class="fas fa-circle-notch fa-spin"></i>
                            <p>Loading recommendations...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getActivityIcon(activityType) {
        const icons = {
            'login': '🔐',
            'profile_update': '👤',
            'preferences_update': '⚙️',
            'favorite_added': '⭐',
            'student_created': '👨‍🎓',
            'avatar_upload': '📷'
        };
        return icons[activityType] || '📝';
    }

    getActivityTitle(activity) {
        const titles = {
            'login': 'Logged in',
            'profile_update': 'Updated profile',
            'preferences_update': 'Updated preferences',
            'favorite_added': 'Added to favorites',
            'student_created': 'Created student profile',
            'avatar_upload': 'Updated avatar'
        };
        return titles[activity.activity_type] || 'Unknown activity';
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    async loadRecommendations() {
        try {
            const response = await this.makeAPIRequest('/personalized/recommendations');
            this.displayRecommendations(response.recommendations);
        } catch (error) {
            console.error('Failed to load recommendations:', error);
        }
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendationsList');
        if (!container) return;

        if (recommendations.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No recommendations available yet.</p>
                    <p>Keep using the app to get personalized suggestions!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="recommendations-list">
                ${recommendations.map(rec => `
                    <div class="recommendation-item">
                        <div class="recommendation-icon">
                            ${this.getRecommendationIcon(rec.type)}
                        </div>
                        <div class="recommendation-content">
                            <div class="recommendation-title">${rec.title}</div>
                            <div class="recommendation-description">${rec.description}</div>
                            <div class="recommendation-reason">
                                <i class="fas fa-info-circle"></i>
                                ${this.getRecommendationReason(rec.reason)}
                            </div>
                        </div>
                        <div class="recommendation-priority">
                            ${this.getPriorityBadge(rec.priority)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getRecommendationIcon(type) {
        const icons = {
            'course': '📚',
            'tutorial': '📖',
            'project': '🛠️',
            'student': '👨‍🎓',
            'tool': '🔧'
        };
        return icons[type] || '💡';
    }

    getRecommendationReason(reason) {
        const reasons = {
            'interest_match': 'Based on your interests',
            'skill_level_match': 'Matches your skill level',
            'activity_pattern': 'Based on your recent activity',
            'popular_choice': 'Popular among users like you'
        };
        return reasons[reason] || 'Personalized for you';
    }

    getPriorityBadge(priority) {
        const badges = {
            'high': '<span class="badge badge-high">High Priority</span>',
            'medium': '<span class="badge badge-medium">Medium</span>',
            'low': '<span class="badge badge-low">Low</span>'
        };
        return badges[priority] || '';
    }

    toggleWidget(button) {
        const widget = button.closest('.widget');
        const content = widget.querySelector('.widget-content');
        const icon = button.querySelector('i');

        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.className = 'fas fa-chevron-up';
        } else {
            content.style.display = 'none';
            icon.className = 'fas fa-chevron-down';
        }
    }

    async updatePreferences(updates) {
        try {
            await this.makeAPIRequest('/profile/preferences', {
                method: 'PUT',
                body: JSON.stringify(updates)
            });
        } catch (error) {
            console.error('Failed to update preferences:', error);
        }
    }

    async trackActivity(activityType, data = {}) {
        try {
            await this.makeAPIRequest('/profile/activity', {
                method: 'POST',
                body: JSON.stringify({
                    activity_type: activityType,
                    activity_data: data
                })
            });
        } catch (error) {
            console.error('Failed to track activity:', error);
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

        if (this.token) {
            config.headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, config);

        if (response.status === 401) {
            this.logout();
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    async setupPersonalizedDashboard() {
        // Load personalized HTML
        document.body.innerHTML = await this.loadPersonalizedHTML();

        // Apply user preferences
        this.applyUserPreferences();

        // Setup personalized event listeners
        this.setupPersonalizedEventListeners();

        // Load personalized content
        await this.loadRecommendations();
        await this.loadPersonalizedContent();

        // Track dashboard load with personalization data
        this.trackActivity('personalized_dashboard_load', {
            theme: this.userProfile.preferences?.theme,
            layout: this.userProfile.preferences?.dashboard?.layout,
            widgets: this.userProfile.preferences?.dashboard?.widgets
        });
    }

    async loadPersonalizedHTML() {
        return `
            <div class="personalized-dashboard">
                <!-- Personalized Header -->
                <header class="dashboard-header">
                    <div class="header-content">
                        <div class="user-greeting">
                            <h1>Welcome back, ${this.userProfile.first_name || this.userProfile.username}!</h1>
                            <p class="greeting-subtitle">${this.getPersonalizedGreeting()}</p>
                        </div>
                        <div class="header-controls">
                            <div class="user-menu">
                                <div class="user-avatar">
                                    ${this.userProfile.avatar_url ?
                                        `<img src="${this.userProfile.avatar_url}" alt="Avatar">` :
                                        `<i class="fas fa-user-circle"></i>`
                                    }
                                </div>
                                <div class="user-info">
                                    <div class="user-name">${this.userProfile.get_full_name()}</div>
                                    <div class="user-role">${this.userProfile.role}</div>
                                </div>
                            </div>
                            <div class="header-actions">
                                <button class="btn btn-secondary" onclick="dashboard.showSettings()">
                                    <i class="fas fa-cog"></i> Settings
                                </button>
                                <button class="btn btn-secondary" onclick="dashboard.logout()">
                                    <i class="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Personalized Navigation -->
                <nav class="dashboard-nav">
                    <div class="nav-content">
                        <button class="nav-item active" data-section="dashboard">
                            <i class="fas fa-home"></i>
                            <span>Dashboard</span>
                        </button>
                        <button class="nav-item" data-section="profile">
                            <i class="fas fa-user"></i>
                            <span>Profile</span>
                        </button>
                        <button class="nav-item" data-section="students">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Students</span>
                        </button>
                        <button class="nav-item" data-section="favorites">
                            <i class="fas fa-star"></i>
                            <span>Favorites</span>
                        </button>
                        <button class="nav-item" data-section="settings">
                            <i class="fas fa-cog"></i>
                            <span>Settings</span>
                        </button>
                    </div>
                </nav>

                <!-- Main Content Area -->
                <main class="dashboard-main">
                    <div id="dashboardContainer" class="dashboard-container layout-grid">
                        <!-- Quick Actions -->
                        <div class="quick-actions-section">
                            <div class="section-header">
                                <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
                            </div>
                            <div class="quick-actions-grid">
                                <button class="quick-action-btn" onclick="dashboard.addStudent()">
                                    <i class="fas fa-user-plus"></i>
                                    <span>Add Student</span>
                                </button>
                                <button class="quick-action-btn" onclick="dashboard.viewStats()">
                                    <i class="fas fa-chart-bar"></i>
                                    <span>View Stats</span>
                                </button>
                                <button class="quick-action-btn" onclick="dashboard.openRecommendations()">
                                    <i class="fas fa-magic"></i>
                                    <span>Get Tips</span>
                                </button>
                                <button class="quick-action-btn" onclick="dashboard.toggleTheme()">
                                    <i class="fas fa-palette"></i>
                                    <span>Change Theme</span>
                                </button>
                            </div>
                        </div>

                        <!-- Personalized Widgets -->
                        <div class="widgets-section">
                            <div class="section-header">
                                <h3><i class="fas fa-th"></i> Your Dashboard</h3>
                                <div class="widget-controls">
                                    <button class="btn btn-secondary" onclick="dashboard.customizeDashboard()">
                                        <i class="fas fa-edit"></i> Customize
                                    </button>
                                </div>
                            </div>
                            <div id="widgetsContainer" class="widgets-grid">
                                <!-- Widgets will be loaded here -->
                            </div>
                        </div>

                        <!-- Learning Progress -->
                        <div class="learning-progress-section">
                            <div class="section-header">
                                <h3><i class="fas fa-chart-line"></i> Learning Progress</h3>
                            </div>
                            <div class="progress-container">
                                <div class="skill-level-indicator">
                                    <div class="skill-level" data-level="${this.userProfile.skill_level || 'beginner'}">
                                        <div class="skill-level-text">${(this.userProfile.skill_level || 'beginner').charAt(0).toUpperCase() + (this.userProfile.skill_level || 'beginner').slice(1)}</div>
                                    </div>
                                </div>
                                <div class="learning-stats">
                                    <div class="learning-stat">
                                        <div class="stat-value">${this.userProfile.interests?.length || 0}</div>
                                        <div class="stat-label">Interests</div>
                                    </div>
                                    <div class="learning-stat">
                                        <div class="stat-value">${this.userProfile.learning_goals?.length || 0}</div>
                                        <div class="stat-label">Goals</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <!-- Settings Modal -->
            <div id="settingsModal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-cog"></i> Settings</h3>
                        <button class="btn btn-secondary" onclick="dashboard.closeSettings()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Settings will be loaded here -->
                    </div>
                </div>
            </div>
        `;
    }

    getPersonalizedGreeting() {
        const hour = new Date().getHours();
        const skillLevel = this.userProfile.skill_level || 'beginner';
        const interests = this.userProfile.interests || [];

        let timeGreeting = '';
        if (hour < 12) timeGreeting = 'Good morning';
        else if (hour < 17) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';

        let personalizedMessage = `${timeGreeting}! Ready to continue your ${skillLevel} learning journey?`;

        if (interests.length > 0) {
            personalizedMessage += ` We see you're interested in ${interests.slice(0, 2).join(' and ')}.`;
        }

        return personalizedMessage;
    }

    // ... more personalized methods would go here
}

// Initialize the personalized dashboard
const dashboard = new PersonalizedDashboard();
```

### Activity 3: Advanced Personalization Features (10 min)

**The Personalization Challenge:**
1. **User Preference Testing:**
```javascript
// Test theme switching
dashboard.applyTheme('dark');
dashboard.applyTheme('light');
dashboard.applyTheme('auto');

// Test layout changes
dashboard.setDashboardLayout('list');
dashboard.setDashboardLayout('cards');

// Test widget customization
dashboard.setDashboardWidgets(['stats', 'recommendations']);
```

2. **Recommendation Testing:**
```javascript
// Test personalized recommendations
await dashboard.loadRecommendations();

// Test activity tracking
dashboard.trackActivity('feature_used', { feature: 'recommendations' });
```

3. **Profile Management Testing:**
```javascript
// Test profile updates
await dashboard.updateProfile({
    bio: 'Passionate learner and developer',
    skill_level: 'intermediate',
    interests: ['JavaScript', 'Python', 'Machine Learning']
});
```

## ✨ Creative Challenge: Advanced Personalization (20 min)

### AI-Powered Personalization (12 min)
**Students Choose 2-3 Advanced Features:**

**Smart Recommendations:**
- **Machine Learning:** Pattern recognition for content suggestions
- **Collaborative Filtering:** "Users like you also liked..."
- **Content-Based Filtering:** Similar items based on attributes
- **Time-Based Recommendations:** Contextual suggestions

**Behavioral Analytics:**
- **User Journey Mapping:** Track user paths through application
- **Feature Usage Analysis:** Identify most/least used features
- **Engagement Patterns:** Optimal times for notifications
- **Drop-off Points:** Where users abandon tasks

**AI Enhancement Prompts:**
```
"Help me add AI-powered personalization to my dashboard. I need:
1. Machine learning recommendations based on user behavior
2. Smart content suggestions using collaborative filtering
3. Behavioral analytics to understand user patterns
4. Predictive recommendations for next steps
5. A/B testing framework for personalization effectiveness
6. User segmentation for targeted experiences
Make it intelligent and adaptive to each user!"
```

### Advanced User Experience (8 min)
**Professional Features:**
- **Smart Notifications:** Context-aware, non-intrusive alerts
- **Progressive Disclosure:** Show advanced features as users advance
- **Keyboard Shortcuts:** Power user features
- **Dark Mode Variations:** Multiple theme options
- **Accessibility Features:** WCAG compliance for all users

## 🎉 Show & Tell: Personalization Showcase (15 min)

### Personalized Demonstrations (10 min)
- Students demonstrate their personalized dashboards
- Show different themes, layouts, and user experiences
- Demonstrate smart recommendations and behavioral analytics
- "What's the most impressive personalization feature you built?"

### User Experience Discussion (5 min)
- "How does personalization change the way users interact with applications?"
- "What ethical considerations should we keep in mind with personalization?"
- Discuss data privacy, consent, and user trust

## 🔮 Next Week Preview: File Uploads and Media Management

**The Teaser:**
*"Next week, we're going to master file uploads and media management! You'll learn how to handle image uploads, file storage, document management, and rich media content. Imagine building a system where users can upload profile pictures, share documents, manage galleries, and work with all types of media - that's what we're building next!"*

**Demo Preview:** Quick demo of a file upload system with image preview, drag-and-drop, and cloud storage integration

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete user profile system with personal preferences
✅ Advanced user preferences management with themes and layouts
✅ User activity tracking and behavioral analytics
✅ Personalized recommendation system
✅ Customizable dashboard with widgets
✅ Privacy settings and data management controls

### Success Criteria:
🎯 **Complete User Profile Management System**
🎯 **Advanced Personalization with Themes and Layouts**
🎯 **User Activity Tracking and Behavioral Analytics**
🎯 **Personalized Recommendation Engine**
🎯 **Customizable Dashboard Experience**
🎯 **Privacy Controls and Ethical Data Management**

## 🏆 Weekly Achievement Badge: **Personalization Expert**
*"You've mastered user personalization and experience design! Your sophisticated profile system with customized dashboards, smart recommendations, and behavioral analytics proves you can create engaging, personalized applications that adapt to individual user needs."*

**Real-World Connection:** "The personalization skills you learned today are used by the world's most successful applications! Netflix, Spotify, Amazon, and Instagram all use these exact same techniques to create addictive, engaging experiences. You now have the skills to build applications that users will love and return to again and again!"

## 📚 Extension Activities (Optional Homework)

### For Future UX/Personalization Experts:
- **A/B Testing Framework:** Build tools to test different personalization strategies
- **Advanced Analytics:** Implement Google Analytics or Mixpanel integration
- **Machine Learning:** Use TensorFlow.js for client-side ML recommendations
- **Progressive Web App:** Add offline personalization capabilities

### Online Resources:
- **UX Design Patterns:** Comprehensive guide to user experience design
- **Personalization Algorithms:** Technical implementation of recommendation systems
- **Data Privacy Laws:** Understanding GDPR and privacy regulations
- **Behavioral Psychology:** Understanding user behavior and motivation

### Challenge Problem:
*"Can you build a system that learns from user behavior and automatically adapts the interface? Maybe an AI assistant that observes user patterns and suggests optimizations, or a smart notification system that learns the best times to interrupt users!"*

---

**Teacher Notes:**
- Emphasize the ethical considerations of personalization and data collection
- Discuss privacy laws and user consent management
- Use real-world examples of successful personalization
- Celebrate creative personalization features and user-centric design
- Keep user experience research and testing methodologies in mind
- Discuss accessibility and inclusive design in personalization