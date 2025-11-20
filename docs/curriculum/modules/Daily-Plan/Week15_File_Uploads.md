# Week 15 — File Uploads

## 🎯 This Week's Mission
_Master the art of file handling! Build comprehensive file upload systems with image processing, document management, cloud storage integration, and rich media support. Learn how to handle multiple file types, validate uploads, process images, and create professional media management systems!_

## 🔥 Last Week Showcase
**Personalization Festival (5 min):**
- "Who built an amazing personalized user profile system last week?"
- Quick demos of customized dashboards, smart recommendations, and behavioral analytics
- Highlight theme switching, widget customization, and user-centric design
- "Last week you mastered personalization! This week we're going to add the ability for users to upload and manage files - a critical feature for modern applications!"

## 🚀 Today's Hook: The Power of File Management (15 min)

**Live Demo: Static vs Media-Rich Applications**
Teacher shows two versions of the same application:

**Static Application (Limited):**
```javascript
// Text-only profiles
{
    name: "Sarah Johnson",
    bio: "I love coding!",
    avatar: null,          // No picture
    resume: null,          // No file uploads
    portfolio: null        // No work samples
}
```

**Media-Rich Application (Professional):**
```javascript
// Rich media profiles
{
    name: "Sarah Johnson",
    bio: "I love coding!",
    avatar: "https://cdn.example.com/avatars/sarah.jpg",
    resume: "https://cdn.example.com/docs/sarah_resume.pdf",
    portfolio: [
        "https://cdn.example.com/projects/project1.png",
        "https://cdn.example.com/projects/project2.mp4"
    ],
    gallery: "https://cdn.example.com/galleries/sarah-work/",
    documents: "https://cdn.example.com/docs/sarah-files/"
}
```

**The Media Moment:** Teacher demonstrates a real file upload system:
- "See how this application handles multiple file types?"
- "Watch the progress bars, image previews, and cloud storage integration!"
- "This is how LinkedIn, Instagram, and professional applications manage user media!"

**The Week's Promise:**
*"Today you will:*
- *Build comprehensive file upload systems with progress tracking*
- *Master image processing, resizing, and optimization*
- *Handle multiple file types including documents, images, and media*
- *Implement cloud storage integration for scalable file management*
- *Learn the security and performance techniques for handling user uploads*"

## 🧠 Concept Discovery: File Upload Fundamentals (15 min)

### Why File Uploads Matter (5 min)
**User Experience Benefits:**
- **Rich Content:** Users can share photos, videos, documents
- **Professional Profiles:** Resumes, portfolios, work samples
- **Social Sharing:** Images, videos, and media content
- **Data Import:** CSV, JSON, and document uploads
- **Collaboration:** File sharing and document management

**Real-World Examples:**
- **Social Media:** Instagram, TikTok, Facebook photo/video uploads
- **Professional Networks:** LinkedIn resumes and portfolio uploads
- **Cloud Storage:** Google Drive, Dropbox, OneDrive file management
- **E-commerce:** Product images, specifications, documents
- **Educational Platforms:** Assignment submissions, course materials

### File Upload Challenges (5 min)
**Technical Challenges:**
```javascript
// 1. File Size Limits
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
}

// 2. File Type Validation
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('File type not allowed');
}

// 3. Security Risks
function sanitizeFileName(filename) {
    // Remove dangerous characters
    return filename.replace(/[^a-zA-Z0-9.]/g, '_');
}

// 4. Storage Management
function generateUniqueFileName(originalName) {
    const extension = originalName.split('.').pop();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return `${timestamp}_${random}.${extension}`;
}
```

**Storage Solutions:**
- **Local Storage:** Store files on server filesystem
- **Cloud Storage:** AWS S3, Google Cloud Storage, Azure Blob
- **CDN Integration:** Content delivery networks for fast access
- **Database Storage:** File metadata and paths in database

### File Processing Pipeline (5 min)
**Upload Process Flow:**
```
1. Client Selection → User chooses file(s)
2. Client Validation → Size, type, basic checks
3. Upload Request → Send to server with progress
4. Server Validation → Security, permissions, limits
5. File Processing → Resize, optimize, convert
6. Storage → Save to filesystem or cloud
7. Database → Save metadata and paths
8. Response → Return file info to client
9. Client Update → Display new content
```

**Common File Operations:**
```javascript
// Image Processing
function processImage(file) {
    // Resize for different uses
    return {
        thumbnail: resize(file, 150, 150),      // Profile picture
        medium: resize(file, 800, 600),          // Gallery view
        large: resize(file, 1920, 1080),         // Full size
        optimized: optimizeForWeb(file)         // Compressed
    };
}

// Document Processing
function processDocument(file) {
    // Extract metadata
    return {
        type: file.type,
        size: file.size,
        name: sanitizeFileName(file.name),
        uploaded: new Date().toISOString(),
        thumbnail: generateDocumentThumbnail(file)
    };
}
```

## 🛠️ Hands-On Building: Comprehensive File Upload System (40 min)

### Activity 1: Backend File Upload System (15 min)

**Step 1: Enhanced Flask Backend with File Uploads**
```python
# file_uploads_app.py - Flask with comprehensive file upload system
from flask import Flask, request, jsonify, send_file
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from functools import wraps
import jwt
import datetime
import json
import os
import uuid
import imghdr
from PIL import Image
import magic
from cryptography.fernet import Fernet

app = Flask(__name__)

# Configuration
app.config.update({
    'SECRET_KEY': 'your-secret-key-change-in-production',
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///file_uploads.db',
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'UPLOAD_FOLDER': 'uploads',
    'MAX_CONTENT_LENGTH': 16 * 1024 * 1024,  # 16MB max file size
    'ALLOWED_EXTENSIONS': {
        'image': {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'},
        'document': {'pdf', 'doc', 'docx', 'txt', 'md'},
        'video': {'mp4', 'avi', 'mov', 'wmv'},
        'audio': {'mp3', 'wav', 'ogg'}
    }
})

# Create upload directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'images'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'documents'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'videos'), exist_ok=True)
os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], 'thumbnails'), exist_ok=True)

db = SQLAlchemy(app)

# File encryption key (in production, use environment variable)
app.config['ENCRYPTION_KEY'] = Fernet.generate_key().decode()

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='user')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    last_login = db.Column(db.DateTime)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_token(self):
        token = jwt.encode({
            'user_id': self.id,
            'username': self.username,
            'role': self.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, app.config['SECRET_KEY'], algorithm='HS256')

        return token

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    original_filename = db.Column(db.String(255), nullable=False)
    stored_filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.Integer, nullable=False)
    file_type = db.Column(db.String(100), nullable=False)
    mime_type = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # image, document, video, audio
    description = db.Column(db.Text)
    is_public = db.Column(db.Boolean, default=False)
    download_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # Image-specific fields
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    thumbnail_path = db.Column(db.String(500))

    # Processing status
    processing_status = db.Column(db.String(50), default='pending')  # pending, processing, completed, failed
    processing_error = db.Column(db.Text)

    user = db.relationship('User', backref='uploaded_files')

    def to_dict(self):
        return {
            'id': self.id,
            'original_filename': self.original_filename,
            'file_size': self.file_size,
            'file_type': self.file_type,
            'mime_type': self.mime_type,
            'category': self.category,
            'description': self.description,
            'is_public': self.is_public,
            'download_count': self.download_count,
            'width': self.width,
            'height': self.height,
            'thumbnail_path': self.thumbnail_path,
            'processing_status': self.processing_status,
            'created_at': self.created_at.isoformat(),
            'download_url': f'/api/files/{self.id}/download',
            'view_url': f'/api/files/{self.id}/view',
            'thumbnail_url': f'/api/files/{self.id}/thumbnail' if self.thumbnail_path else None
        }

# Helper functions
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

def allowed_file(filename, category):
    """Check if file is allowed for the given category"""
    if '.' not in filename:
        return False

    extension = filename.rsplit('.', 1)[1].lower()
    return extension in app.config['ALLOWED_EXTENSIONS'].get(category, [])

def get_file_category(mime_type):
    """Determine file category from MIME type"""
    if mime_type.startswith('image/'):
        return 'image'
    elif mime_type.startswith('video/'):
        return 'video'
    elif mime_type.startswith('audio/'):
        return 'audio'
    elif mime_type in ['application/pdf', 'text/plain']:
        return 'document'
    else:
        return 'document'

def generate_unique_filename(original_filename, category):
    """Generate a unique filename while preserving extension"""
    # Get file extension
    if '.' in original_filename:
        extension = original_filename.rsplit('.', 1)[1].lower()
    else:
        extension = 'bin'

    # Generate unique name
    timestamp = datetime.datetime.utcnow().strftime('%Y%m%d_%H%M%S')
    random_string = uuid.uuid4().hex[:8]
    unique_name = f"{timestamp}_{random_string}.{extension}"

    # Organize by category
    return os.path.join(category, unique_name)

def create_thumbnail(image_path, thumbnail_path, size=(300, 300)):
    """Create a thumbnail from an image"""
    try:
        with Image.open(image_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1] if img.mode == 'P' else None)
                img = background

            # Create thumbnail
            img.thumbnail(size, Image.Resampling.LANCZOS)

            # Save thumbnail
            img.save(thumbnail_path, 'JPEG', quality=85, optimize=True)

        return True
    except Exception as e:
        print(f"Error creating thumbnail: {e}")
        return False

def get_image_metadata(image_path):
    """Get metadata for an image file"""
    try:
        with Image.open(image_path) as img:
            return {
                'width': img.width,
                'height': img.height,
                'format': img.format,
                'mode': img.mode
            }
    except Exception:
        return None

def scan_for_malware(file_path):
    """Basic malware scanning (in production, use professional antivirus API)"""
    try:
        # Check file size (extremely large files might be suspicious)
        file_size = os.path.getsize(file_path)
        if file_size > app.config['MAX_CONTENT_LENGTH']:
            return False

        # Check file header (first few bytes)
        with open(file_path, 'rb') as f:
            header = f.read(1024)

        # Basic checks for suspicious content
        suspicious_patterns = [
            b'<script',
            b'javascript:',
            b'vbscript:',
            b'<?php',
            b'<%',
            b'eval(',
            b'exec(',
            b'system('
        ]

        for pattern in suspicious_patterns:
            if pattern in header.lower():
                return False

        return True

    except Exception:
        return False

# File Upload Routes
@app.route('/api/upload', methods=['POST'])
@token_required
def upload_file(current_user):
    """Handle file upload with validation and processing"""
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file provided!'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'message': 'No file selected!'}), 400

        # Basic file validation
        if file.filename == '':
            return jsonify({'message': 'No file selected!'}), 400

        # Determine file category
        mime_type = file.content_type or 'application/octet-stream'
        category = get_file_category(mime_type)

        # Validate file type
        if not allowed_file(file.filename, category):
            return jsonify({
                'message': f'File type not allowed for {category} files!'
            }), 400

        # Generate secure filename
        original_filename = secure_filename(file.filename)
        stored_filename = generate_unique_filename(original_filename, category)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], stored_filename)

        # Save the file
        file.save(file_path)

        # Scan for malware
        if not scan_for_malware(file_path):
            os.remove(file_path)
            return jsonify({'message': 'File upload blocked for security reasons!'}), 400

        # Get file metadata
        file_size = os.path.getsize(file_path)

        # Create database record
        uploaded_file = UploadedFile(
            user_id=current_user.id,
            original_filename=original_filename,
            stored_filename=stored_filename,
            file_path=file_path,
            file_size=file_size,
            file_type=original_filename.split('.')[-1].lower(),
            mime_type=mime_type,
            category=category,
            description=request.form.get('description', ''),
            is_public=request.form.get('is_public', 'false').lower() == 'true',
            processing_status='processing'
        )

        # Process image files
        if category == 'image':
            # Get image metadata
            metadata = get_image_metadata(file_path)
            if metadata:
                uploaded_file.width = metadata['width']
                uploaded_file.height = metadata['height']

            # Create thumbnail
            thumbnail_filename = generate_unique_filename(f"thumb_{original_filename}", 'images')
            thumbnail_path = os.path.join(app.config['UPLOAD_FOLDER'], thumbnail_filename)

            if create_thumbnail(file_path, thumbnail_path):
                uploaded_file.thumbnail_path = thumbnail_path

        db.session.add(uploaded_file)
        db.session.commit()

        # Update processing status
        uploaded_file.processing_status = 'completed'
        db.session.commit()

        # Track upload activity
        track_activity(current_user, 'file_upload', {
            'file_id': uploaded_file.id,
            'filename': original_filename,
            'category': category,
            'file_size': file_size
        })

        return jsonify({
            'message': 'File uploaded successfully!',
            'file': uploaded_file.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Upload failed: {str(e)}'}), 500

@app.route('/api/upload/multiple', methods=['POST'])
@token_required
def upload_multiple_files(current_user):
    """Handle multiple file uploads"""
    try:
        if 'files' not in request.files:
            return jsonify({'message': 'No files provided!'}), 400

        files = request.files.getlist('files')

        if not files:
            return jsonify({'message': 'No files selected!'}), 400

        uploaded_files = []
        errors = []

        for file in files:
            if file.filename == '':
                continue

            try:
                # Process each file individually
                result = process_single_file(file, current_user)
                if result['success']:
                    uploaded_files.append(result['file'])
                else:
                    errors.append({
                        'filename': file.filename,
                        'error': result['message']
                    })
            except Exception as e:
                errors.append({
                    'filename': file.filename,
                    'error': str(e)
                })

        return jsonify({
            'message': f'Uploaded {len(uploaded_files)} files successfully!',
            'uploaded_files': uploaded_files,
            'errors': errors,
            'total_uploaded': len(uploaded_files),
            'total_errors': len(errors)
        })

    except Exception as e:
        return jsonify({'message': f'Multiple upload failed: {str(e)}'}), 500

def process_single_file(file, current_user):
    """Process a single file upload"""
    try:
        # Validation and processing logic (similar to upload_file)
        mime_type = file.content_type or 'application/octet-stream'
        category = get_file_category(mime_type)

        if not allowed_file(file.filename, category):
            return {
                'success': False,
                'message': f'File type not allowed for {category} files!'
            }

        original_filename = secure_filename(file.filename)
        stored_filename = generate_unique_filename(original_filename, category)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], stored_filename)

        file.save(file_path)

        if not scan_for_malware(file_path):
            os.remove(file_path)
            return {
                'success': False,
                'message': 'File upload blocked for security reasons!'
            }

        file_size = os.path.getsize(file_path)

        uploaded_file = UploadedFile(
            user_id=current_user.id,
            original_filename=original_filename,
            stored_filename=stored_filename,
            file_path=file_path,
            file_size=file_size,
            file_type=original_filename.split('.')[-1].lower(),
            mime_type=mime_type,
            category=category,
            processing_status='completed'
        )

        if category == 'image':
            metadata = get_image_metadata(file_path)
            if metadata:
                uploaded_file.width = metadata['width']
                uploaded_file.height = metadata['height']

            thumbnail_filename = generate_unique_filename(f"thumb_{original_filename}", 'images')
            thumbnail_path = os.path.join(app.config['UPLOAD_FOLDER'], thumbnail_filename)

            if create_thumbnail(file_path, thumbnail_path):
                uploaded_file.thumbnail_path = thumbnail_path

        db.session.add(uploaded_file)
        db.session.commit()

        return {
            'success': True,
            'file': uploaded_file.to_dict()
        }

    except Exception as e:
        db.session.rollback()
        return {
            'success': False,
            'message': str(e)
        }

@app.route('/api/files', methods=['GET'])
@token_required
def get_user_files(current_user):
    """Get files uploaded by the current user"""
    try:
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category = request.args.get('category', '')
        search = request.args.get('search', '')

        query = UploadedFile.query.filter_by(user_id=current_user.id)

        # Filter by category
        if category:
            query = query.filter_by(category=category)

        # Search by filename
        if search:
            query = query.filter(UploadedFile.original_filename.ilike(f'%{search}%'))

        # Pagination
        files = query.order_by(UploadedFile.created_at.desc()).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        return jsonify({
            'files': [file.to_dict() for file in files.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': files.total,
                'pages': files.pages,
                'has_next': files.has_next,
                'has_prev': files.has_prev
            }
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get files: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>', methods=['GET'])
@token_required
def get_file_info(file_id):
    """Get information about a specific file"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to access the file
        if uploaded_file.user_id != current_user.id and not uploaded_file.is_public:
            return jsonify({'message': 'Access denied!'}), 403

        return jsonify({
            'file': uploaded_file.to_dict()
        })

    except Exception as e:
        return jsonify({'message': f'Failed to get file info: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>/download', methods=['GET'])
@token_required
def download_file(file_id):
    """Download a file"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to download the file
        if uploaded_file.user_id != current_user.id and not uploaded_file.is_public:
            return jsonify({'message': 'Access denied!'}), 403

        # Increment download count
        uploaded_file.download_count += 1
        db.session.commit()

        # Send file
        return send_file(
            uploaded_file.file_path,
            as_attachment=True,
            download_name=uploaded_file.original_filename,
            mimetype=uploaded_file.mime_type
        )

    except Exception as e:
        return jsonify({'message': f'Download failed: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>/view', methods=['GET'])
@token_required
def view_file(file_id):
    """View a file in browser (if possible)"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to view the file
        if uploaded_file.user_id != current_user.id and not uploaded_file.is_public:
            return jsonify({'message': 'Access denied!'}), 403

        return send_file(
            uploaded_file.file_path,
            mimetype=uploaded_file.mime_type
        )

    except Exception as e:
        return jsonify({'message': f'View failed: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>/thumbnail', methods=['GET'])
@token_required
def get_file_thumbnail(file_id):
    """Get file thumbnail"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to view the file
        if uploaded_file.user_id != current_user.id and not uploaded_file.is_public:
            return jsonify({'message': 'Access denied!'}), 403

        if not uploaded_file.thumbnail_path:
            # Return default icon based on file type
            return jsonify({'message': 'No thumbnail available'}), 404

        return send_file(uploaded_file.thumbnail_path)

    except Exception as e:
        return jsonify({'message': f'Failed to get thumbnail: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>', methods=['PUT'])
@token_required
def update_file_info(file_id):
    """Update file metadata"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to update the file
        if uploaded_file.user_id != current_user.id:
            return jsonify({'message': 'Access denied!'}), 403

        data = request.get_json()

        # Update allowed fields
        if 'description' in data:
            uploaded_file.description = data['description']

        if 'is_public' in data:
            uploaded_file.is_public = data['is_public']

        db.session.commit()

        return jsonify({
            'message': 'File updated successfully!',
            'file': uploaded_file.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Update failed: {str(e)}'}), 500

@app.route('/api/files/<int:file_id>', methods=['DELETE'])
@token_required
def delete_file(file_id):
    """Delete a file"""
    try:
        uploaded_file = UploadedFile.query.get_or_404(file_id)

        # Check if user has permission to delete the file
        if uploaded_file.user_id != current_user.id:
            return jsonify({'message': 'Access denied!'}), 403

        # Delete files from filesystem
        if os.path.exists(uploaded_file.file_path):
            os.remove(uploaded_file.file_path)

        if uploaded_file.thumbnail_path and os.path.exists(uploaded_file.thumbnail_path):
            os.remove(uploaded_file.thumbnail_path)

        # Delete database record
        db.session.delete(uploaded_file)
        db.session.commit()

        return jsonify({'message': 'File deleted successfully!'})

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Delete failed: {str(e)}'}), 500

@app.route('/api/files/stats', methods=['GET'])
@token_required
def get_file_stats(current_user):
    """Get file upload statistics"""
    try:
        stats = {
            'total_files': UploadedFile.query.filter_by(user_id=current_user.id).count(),
            'total_size': db.session.query(func.sum(UploadedFile.file_size)).filter_by(user_id=current_user.id).scalar() or 0,
            'by_category': {},
            'recent_uploads': []
        }

        # Files by category
        categories = db.session.query(
            UploadedFile.category,
            func.count(UploadedFile.id).label('count')
        ).filter_by(user_id=current_user.id).group_by(UploadedFile.category).all()

        for category, count in categories:
            stats['by_category'][category] = count

        # Recent uploads (last 10)
        recent_files = UploadedFile.query.filter_by(user_id=current_user.id)\
            .order_by(UploadedFile.created_at.desc())\
            .limit(10)\
            .all()

        stats['recent_uploads'] = [file.to_dict() for file in recent_files]

        return jsonify({'stats': stats})

    except Exception as e:
        return jsonify({'message': f'Failed to get stats: {str(e)}'}), 500

# Utility function for activity tracking
def track_activity(user, activity_type, data=None):
    """Track user activity (from previous week)"""
    # Implementation from Week 14
    pass

if __name__ == '__main__':
    print("📁 Starting File Upload Management API...")
    print("📖 Available endpoints:")
    print("   POST /api/upload - Upload single file")
    print("   POST /api/upload/multiple - Upload multiple files")
    print("   GET  /api/files - Get user's files")
    print("   GET  /api/files/<id> - Get file info")
    print("   GET  /api/files/<id>/download - Download file")
    print("   GET  /api/files/<id>/view - View file")
    print("   GET  /api/files/<id>/thumbnail - Get thumbnail")
    print("   PUT  /api/files/<id> - Update file info")
    print("   DELETE /api/files/<id> - Delete file")
    print("   GET  /api/files/stats - Get upload statistics")
    print("\n🌐 Server running on: http://localhost:5000")

    app.run(debug=True, host='0.0.0.0', port=5000)
```

### Activity 2: Frontend File Upload Interface (15 min)

**Step 2: Modern File Upload Frontend**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload Manager</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="file_uploads.css">
</head>
<body>
    <div class="upload-manager">
        <!-- Header -->
        <header class="upload-header">
            <div class="header-content">
                <h1><i class="fas fa-cloud-upload-alt"></i> File Upload Manager</h1>
                <div class="header-controls">
                    <button class="btn btn-primary" onclick="uploadManager.openUploadModal()">
                        <i class="fas fa-plus"></i> Upload Files
                    </button>
                    <button class="btn btn-secondary" onclick="uploadManager.toggleView()">
                        <i class="fas fa-th"></i> Grid View
                    </button>
                </div>
            </div>
        </header>

        <!-- Stats Section -->
        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-file"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="totalFiles">0</div>
                        <div class="stat-label">Total Files</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-database"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="totalSize">0 MB</div>
                        <div class="stat-label">Total Size</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-images"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="imageCount">0</div>
                        <div class="stat-label">Images</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="documentCount">0</div>
                        <div class="stat-label">Documents</div>
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
                        <label for="categoryFilter">Category:</label>
                        <select id="categoryFilter" onchange="uploadManager.applyFilters()">
                            <option value="">All Categories</option>
                            <option value="image">Images</option>
                            <option value="document">Documents</option>
                            <option value="video">Videos</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="searchInput">Search:</label>
                        <input type="text" id="searchInput" placeholder="Search files..." onkeyup="uploadManager.applyFilters()">
                    </div>
                    <div class="filter-group">
                        <label for="sortOrder">Sort:</label>
                        <select id="sortOrder" onchange="uploadManager.applyFilters()">
                            <option value="created_at_desc">Newest First</option>
                            <option value="created_at_asc">Oldest First</option>
                            <option value="file_size_desc">Largest First</option>
                            <option value="file_size_asc">Smallest First</option>
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary" onclick="uploadManager.clearFilters()">
                        <i class="fas fa-times"></i> Clear
                    </button>
                </div>
            </div>
        </section>

        <!-- Files Section -->
        <section class="files-section">
            <div class="section-header">
                <h3><i class="fas fa-folder"></i> Your Files</h3>
                <div class="section-controls">
                    <span id="fileCount" class="file-count">0 files</span>
                    <div class="view-controls">
                        <button class="view-btn active" onclick="uploadManager.setView('grid')" data-view="grid">
                            <i class="fas fa-th"></i>
                        </button>
                        <button class="view-btn" onclick="uploadManager.setView('list')" data-view="list">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="filesContainer" class="files-grid">
                <!-- Files will be loaded here -->
            </div>
        </section>

        <!-- Upload Modal -->
        <div id="uploadModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-cloud-upload-alt"></i> Upload Files</h3>
                    <button class="btn btn-secondary" onclick="uploadManager.closeUploadModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Drag & Drop Area -->
                    <div id="dropZone" class="drop-zone">
                        <div class="drop-zone-content">
                            <i class="fas fa-cloud-upload-alt fa-3x"></i>
                            <h3>Drop files here to upload</h3>
                            <p>or click to browse</p>
                            <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                                <i class="fas fa-folder-open"></i> Choose Files
                            </button>
                            <input type="file" id="fileInput" multiple style="display: none;" onchange="uploadManager.handleFileSelect(event)">
                        </div>
                    </div>

                    <!-- File List -->
                    <div id="fileList" class="file-list" style="display: none;">
                        <h4>Files to Upload:</h4>
                        <div id="fileItems" class="file-items">
                            <!-- File items will be added here -->
                        </div>
                        <div class="file-list-actions">
                            <button class="btn btn-secondary" onclick="uploadManager.clearFileList()">
                                <i class="fas fa-times"></i> Clear All
                            </button>
                            <button class="btn btn-primary" onclick="uploadManager.uploadFiles()" id="uploadBtn">
                                <i class="fas fa-upload"></i> Upload Files
                            </button>
                        </div>
                    </div>

                    <!-- Upload Progress -->
                    <div id="uploadProgress" class="upload-progress" style="display: none;">
                        <h4>Upload Progress:</h4>
                        <div class="progress-items" id="progressItems">
                            <!-- Progress items will be added here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- File Details Modal -->
        <div id="fileDetailsModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-file"></i> File Details</h3>
                    <button class="btn btn-secondary" onclick="uploadManager.closeDetailsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="fileDetailsContent">
                    <!-- File details will be loaded here -->
                </div>
            </div>
        </div>

        <!-- Loading Overlay -->
        <div id="loadingOverlay" class="loading-overlay hidden">
            <div class="loading-spinner">
                <i class="fas fa-circle-notch fa-spin"></i>
                <p>Loading...</p>
            </div>
        </div>
    </div>

    <script src="file_uploads.js"></script>
</body>
</html>
```

### Activity 3: JavaScript File Upload Handler (10 min)

```javascript
// file_uploads.js - Complete file upload management
class FileUploadManager {
    constructor() {
        this.apiBaseUrl = 'http://localhost:5000/api';
        this.token = localStorage.getItem('authToken');
        this.files = [];
        this.filteredFiles = [];
        this.currentView = 'grid';
        this.filters = {
            category: '',
            search: '',
            sort: 'created_at_desc'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFiles();
        this.loadStats();
    }

    setupEventListeners() {
        // Drag and drop
        const dropZone = document.getElementById('dropZone');

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            this.handleFileSelect(e);
        });

        // Prevent default drag behaviors
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
        });
    }

    handleFileSelect(event) {
        const files = event.target.files || event.dataTransfer.files;
        const fileList = document.getElementById('fileList');
        const fileItems = document.getElementById('fileItems');

        // Show file list
        fileList.style.display = 'block';

        // Add files to list
        Array.from(files).forEach(file => {
            const fileItem = this.createFileItem(file);
            fileItems.appendChild(fileItem);
        });

        // Enable upload button
        document.getElementById('uploadBtn').disabled = files.length === 0;
    }

    createFileItem(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.fileName = file.name;
        fileItem.dataset.fileSize = file.size;

        const fileIcon = this.getFileIcon(file.type);
        const fileSize = this.formatFileSize(file.size);
        const isImage = file.type.startsWith('image/');

        fileItem.innerHTML = `
            <div class="file-item-icon">
                ${isImage ?
                    `<img src="${URL.createObjectURL(file)}" alt="${file.name}">` :
                    `<i class="${fileIcon}"></i>`
                }
            </div>
            <div class="file-item-info">
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-details">
                    <span class="file-item-size">${fileSize}</span>
                    <span class="file-item-type">${file.type}</span>
                </div>
                ${isImage ? `<img src="${URL.createObjectURL(file)}" alt="" class="file-item-preview">` : ''}
            </div>
            <div class="file-item-actions">
                <button class="btn btn-sm btn-secondary" onclick="uploadManager.removeFile(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        return fileItem;
    }

    getFileIcon(mimeType) {
        const iconMap = {
            'image/jpeg': 'fas fa-image',
            'image/png': 'fas fa-image',
            'image/gif': 'fas fa-image',
            'application/pdf': 'fas fa-file-pdf',
            'text/plain': 'fas fa-file-alt',
            'application/msword': 'fas fa-file-word',
            'video/mp4': 'fas fa-video',
            'audio/mpeg': 'fas fa-music',
            'application/zip': 'fas fa-file-archive'
        };

        return iconMap[mimeType] || 'fas fa-file';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    removeFile(button) {
        const fileItem = button.closest('.file-item');
        fileItem.remove();

        // Check if any files remain
        const fileItems = document.querySelectorAll('.file-item');
        document.getElementById('uploadBtn').disabled = fileItems.length === 0;

        if (fileItems.length === 0) {
            document.getElementById('fileList').style.display = 'none';
        }
    }

    clearFileList() {
        document.getElementById('fileItems').innerHTML = '';
        document.getElementById('fileList').style.display = 'none';
        document.getElementById('uploadBtn').disabled = true;
        document.getElementById('fileInput').value = '';
    }

    async uploadFiles() {
        const fileItems = document.querySelectorAll('.file-item');
        const files = [];

        // Collect files from input or drag & drop
        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length > 0) {
            files.push(...Array.from(fileInput.files));
        }

        if (files.length === 0) {
            this.showError('No files to upload');
            return;
        }

        try {
            this.showLoading(true);

            // Show progress
            document.getElementById('uploadProgress').style.display = 'block';
            const progressItems = document.getElementById('progressItems');
            progressItems.innerHTML = '';

            // Upload files
            if (files.length === 1) {
                // Single file upload
                await this.uploadSingleFile(files[0]);
            } else {
                // Multiple file upload
                await this.uploadMultipleFiles(files);
            }

            // Close modal and refresh files
            this.closeUploadModal();
            this.loadFiles();
            this.loadStats();
            this.showSuccess('Files uploaded successfully!');

        } catch (error) {
            this.showError('Upload failed: ' + error.message);
        } finally {
            this.showLoading(false);
            document.getElementById('uploadProgress').style.display = 'none';
        }
    }

    async uploadSingleFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await this.makeAPIRequest('/upload', {
            method: 'POST',
            body: formData,
            headers: {} // Don't set Content-Type for FormData
        });

        return response;
    }

    async uploadMultipleFiles(files) {
        const formData = new FormData();

        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await this.makeAPIRequest('/upload/multiple', {
            method: 'POST',
            body: formData,
            headers: {} // Don't set Content-Type for FormData
        });

        return response;
    }

    async loadFiles() {
        try {
            const params = new URLSearchParams();

            if (this.filters.category) {
                params.append('category', this.filters.category);
            }
            if (this.filters.search) {
                params.append('search', this.filters.search);
            }
            if (this.filters.sort) {
                params.append('sort', this.filters.sort);
            }

            const response = await this.makeAPIRequest(`/files?${params}`);
            this.files = response.files;
            this.filteredFiles = response.files;
            this.displayFiles();

        } catch (error) {
            this.showError('Failed to load files: ' + error.message);
        }
    }

    displayFiles() {
        const container = document.getElementById('filesContainer');
        const count = document.getElementById('fileCount');

        // Update count
        count.textContent = `${this.filteredFiles.length} file${this.filteredFiles.length !== 1 ? 's' : ''}`;

        if (this.filteredFiles.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open fa-3x"></i>
                    <h3>No files found</h3>
                    <p>Try adjusting your filters or upload some files!</p>
                    <button class="btn btn-primary" onclick="uploadManager.openUploadModal()">
                        <i class="fas fa-plus"></i> Upload Files
                    </button>
                </div>
            `;
            return;
        }

        // Render files based on current view
        container.innerHTML = this.filteredFiles.map(file =>
            this.currentView === 'grid' ? this.createFileCard(file) : this.createFileListItem(file)
        ).join('');
    }

    createFileCard(file) {
        const isImage = file.category === 'image';
        const hasThumbnail = file.thumbnail_url;

        return `
            <div class="file-card" data-file-id="${file.id}">
                <div class="file-card-header">
                    ${hasThumbnail ?
                        `<img src="${file.thumbnail_url}" alt="${file.original_filename}" class="file-thumbnail">` :
                        `<div class="file-icon">
                            <i class="${this.getFileIcon(file.mime_type)}"></i>
                        </div>`
                    }
                </div>
                <div class="file-card-body">
                    <div class="file-title">${file.original_filename}</div>
                    <div class="file-details">
                        <span class="file-size">${this.formatFileSize(file.file_size)}</span>
                        <span class="file-type">${file.file_type.toUpperCase()}</span>
                    </div>
                    ${file.description ? `<p class="file-description">${file.description}</p>` : ''}
                </div>
                <div class="file-card-footer">
                    <div class="file-actions">
                        ${isImage ?
                            `<button class="btn btn-sm btn-secondary" onclick="uploadManager.viewFile(${file.id})" title="View">
                                <i class="fas fa-eye"></i>
                            </button>` :
                            `<button class="btn btn-sm btn-secondary" onclick="uploadManager.downloadFile(${file.id})" title="Download">
                                <i class="fas fa-download"></i>
                            </button>`
                        }
                        <button class="btn btn-sm btn-secondary" onclick="uploadManager.viewDetails(${file.id})" title="Details">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="uploadManager.deleteFile(${file.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="file-public-status">
                        ${file.is_public ?
                            '<i class="fas fa-globe text-success" title="Public"></i>' :
                            '<i class="fas fa-lock text-muted" title="Private"></i>'
                        }
                    </div>
                </div>
            </div>
        `;
    }

    createFileListItem(file) {
        const isImage = file.category === 'image';
        const hasThumbnail = file.thumbnail_url;

        return `
            <div class="file-list-item" data-file-id="${file.id}">
                <div class="file-list-icon">
                    ${hasThumbnail ?
                        `<img src="${file.thumbnail_url}" alt="${file.original_filename}" class="file-thumbnail-small">` :
                        `<i class="${this.getFileIcon(file.mime_type)}"></i>`
                    }
                </div>
                <div class="file-list-info">
                    <div class="file-list-name">${file.original_filename}</div>
                    <div class="file-list-details">
                        <span class="file-size">${this.formatFileSize(file.file_size)}</span>
                        <span class="file-type">${file.file_type.toUpperCase()}</span>
                        <span class="file-date">${this.formatDate(file.created_at)}</span>
                    </div>
                </div>
                <div class="file-list-actions">
                    ${isImage ?
                        `<button class="btn btn-sm btn-secondary" onclick="uploadManager.viewFile(${file.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>` :
                        `<button class="btn btn-sm btn-secondary" onclick="uploadManager.downloadFile(${file.id})" title="Download">
                            <i class="fas fa-download"></i>
                        </button>`
                    }
                    <button class="btn btn-sm btn-secondary" onclick="uploadManager.viewDetails(${file.id})" title="Details">
                        <i class="fas fa-info-circle"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="uploadManager.deleteFile(${file.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    async viewFile(fileId) {
        try {
            window.open(`${this.apiBaseUrl}/files/${fileId}/view`, '_blank');
        } catch (error) {
            this.showError('Failed to view file: ' + error.message);
        }
    }

    async downloadFile(fileId) {
        try {
            window.location.href = `${this.apiBaseUrl}/files/${fileId}/download`;
        } catch (error) {
            this.showError('Failed to download file: ' + error.message);
        }
    }

    async viewDetails(fileId) {
        try {
            const response = await this.makeAPIRequest(`/files/${fileId}`);
            this.showFileDetails(response.file);
        } catch (error) {
            this.showError('Failed to get file details: ' + error.message);
        }
    }

    showFileDetails(file) {
        const modal = document.getElementById('fileDetailsModal');
        const content = document.getElementById('fileDetailsContent');

        content.innerHTML = `
            <div class="file-details-grid">
                <div class="file-details-preview">
                    ${file.thumbnail_url ?
                        `<img src="${file.thumbnail_url}" alt="${file.original_filename}" class="details-thumbnail">` :
                        `<div class="details-icon">
                            <i class="${this.getFileIcon(file.mime_type)} fa-5x"></i>
                        </div>`
                    }
                </div>
                <div class="file-details-info">
                    <h4>${file.original_filename}</h4>
                    <div class="details-grid">
                        <div class="detail-item">
                            <label>Size:</label>
                            <span>${this.formatFileSize(file.file_size)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Type:</label>
                            <span>${file.mime_type}</span>
                        </div>
                        <div class="detail-item">
                            <label>Category:</label>
                            <span>${file.category}</span>
                        </div>
                        <div class="detail-item">
                            <label>Uploaded:</label>
                            <span>${this.formatDate(file.created_at)}</span>
                        </div>
                        ${file.width ? `
                        <div class="detail-item">
                            <label>Dimensions:</label>
                            <span>${file.width} × ${file.height}</span>
                        </div>` : ''}
                        <div class="detail-item">
                            <label>Downloads:</label>
                            <span>${file.download_count}</span>
                        </div>
                        <div class="detail-item">
                            <label>Visibility:</label>
                            <span>${file.is_public ? 'Public' : 'Private'}</span>
                        </div>
                    </div>
                    ${file.description ? `
                        <div class="file-description">
                            <label>Description:</label>
                            <p>${file.description}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="file-details-actions">
                <button class="btn btn-secondary" onclick="uploadManager.downloadFile(${file.id})">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-primary" onclick="uploadManager.closeDetailsModal()">
                    Close
                </button>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    async deleteFile(fileId) {
        if (!confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            this.showLoading(true);

            await this.makeAPIRequest(`/files/${fileId}`, {
                method: 'DELETE'
            });

            this.loadFiles();
            this.loadStats();
            this.showSuccess('File deleted successfully!');

        } catch (error) {
            this.showError('Failed to delete file: ' + error.message);
        } finally {
            this.showLoading(false);
        }
    }

    async loadStats() {
        try {
            const response = await this.makeAPIRequest('/files/stats');
            const stats = response.stats;

            document.getElementById('totalFiles').textContent = stats.total_files;
            document.getElementById('totalSize').textContent = this.formatFileSize(stats.total_size);
            document.getElementById('imageCount').textContent = stats.by_category.image || 0;
            document.getElementById('documentCount').textContent = stats.by_category.document || 0;

        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    }

    setView(view) {
        this.currentView = view;
        const container = document.getElementById('filesContainer');
        const buttons = document.querySelectorAll('.view-btn');

        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });

        container.className = view === 'grid' ? 'files-grid' : 'files-list';
        this.displayFiles();
    }

    applyFilters() {
        this.filters = {
            category: document.getElementById('categoryFilter').value,
            search: document.getElementById('searchInput').value.toLowerCase(),
            sort: document.getElementById('sortOrder').value
        };

        this.filterFiles();
    }

    filterFiles() {
        let filtered = [...this.files];

        // Apply category filter
        if (this.filters.category) {
            filtered = filtered.filter(file => file.category === this.filters.category);
        }

        // Apply search filter
        if (this.filters.search) {
            filtered = filtered.filter(file =>
                file.original_filename.toLowerCase().includes(this.filters.search)
            );
        }

        // Apply sort
        filtered.sort((a, b) => {
            const sortField = this.filters.sort.split('_')[0];
            const sortOrder = this.filters.sort.split('_')[1];

            let comparison = 0;

            if (sortField === 'created_at') {
                comparison = new Date(a.created_at) - new Date(b.created_at);
            } else if (sortField === 'file_size') {
                comparison = a.file_size - b.file_size;
            } else if (sortField === 'name') {
                comparison = a.original_filename.localeCompare(b.original_filename);
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        this.filteredFiles = filtered;
        this.displayFiles();
    }

    clearFilters() {
        document.getElementById('categoryFilter').value = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('sortOrder').value = 'created_at_desc';

        this.filters = {
            category: '',
            search: '',
            sort: 'created_at_desc'
        };

        this.filterFiles();
    }

    openUploadModal() {
        document.getElementById('uploadModal').classList.remove('hidden');
        document.getElementById('fileInput').click();
    }

    closeUploadModal() {
        document.getElementById('uploadModal').classList.add('hidden');
        this.clearFileList();
    }

    closeDetailsModal() {
        document.getElementById('fileDetailsModal').classList.add('hidden');
    }

    toggleView() {
        const currentView = this.currentView;
        this.setView(currentView === 'grid' ? 'list' : 'grid');

        const button = event.target.closest('.btn');
        button.innerHTML = currentView === 'grid' ?
            '<i class="fas fa-list"></i> List View' :
            '<i class="fas fa-th"></i> Grid View';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    showError(message) {
        alert('Error: ' + message);
    }

    showSuccess(message) {
        alert('Success: ' + message);
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        window.location.href = '/login.html';
    }
}

// Initialize the file upload manager
const uploadManager = new FileUploadManager();
```

## ✨ Creative Challenge: Advanced File Management (20 min)

### Professional File Features (12 min)
**Students Choose 2-3 Advanced Features:**

**Cloud Storage Integration:**
- **Amazon S3:** Direct upload to cloud storage
- **Google Cloud Storage:** Google Drive integration
- **CDN Integration:** Fast content delivery worldwide
- **Backup Systems:** Automated file backup and recovery

**Advanced Processing:**
- **Image Optimization:** Auto-compression and format conversion
- **Document Conversion:** Convert between formats (PDF, Word, etc.)
- **Video Processing:** Thumbnail generation and transcoding
- **Virus Scanning:** Real-time malware detection

**AI Enhancement Prompts:**
```
"Help me add advanced file management features. I need:
1. Cloud storage integration with AWS S3 for scalability
2. Automatic image optimization and format conversion
3. Video transcoding with multiple quality options
4. Advanced virus scanning and security checks
5. Intelligent file categorization using machine learning
6. Automated backup and disaster recovery
7. File versioning and rollback capabilities
Make it enterprise-grade with unlimited scalability!"
```

### User Experience Enhancements (8 min)
**Professional Features:**
- **Bulk Operations:** Select and process multiple files
- **Drag-and-Drop**: Intuitive file selection interface
- **Progress Tracking:** Real-time upload progress with pause/resume
- **File Previews:** Rich preview generation for all file types
- **Search and Filtering**: Advanced file organization and discovery

## 🎉 Show & Tell: File Management Showcase (15 min)

### File System Demonstrations (10 min)
- Students demonstrate their complete file upload systems
- Show different file types, processing, and management features
- Demonstrate advanced features like image optimization and cloud storage
- "What's the most impressive file management feature you implemented?"

### Technical Discussion (5 min)
- "What are the most challenging aspects of file upload systems?"
- "How do you balance user experience with security and performance?"
- Discuss storage solutions, scalability, and best practices

## 🔮 Next Week Preview: Mini Social Feed

**The Teaser:**
*"Next week, we're going to build a complete social interaction system! You'll create social feeds, post creation, commenting systems, and real-time interactions. Imagine building a platform where users can share updates, like and comment on content, follow each other, and build a community - that's what we're building next!"*

**Demo Preview:** Quick demo of a social media feed with posts, comments, likes, and real-time updates

## 📋 Materials & Success Checklist

### What You Need Today:
✅ Complete file upload system with multiple file type support
✅ Image processing with thumbnail generation and optimization
✅ File validation, security scanning, and malware protection
✅ Multiple file upload with progress tracking
✅ Cloud storage integration and scalable file management
✅ Professional user interface with drag-and-drop and preview

### Success Criteria:
🎯 **Complete File Upload System with Multiple File Types**
🎯 **Image Processing with Thumbnails and Optimization**
🎯 **File Security Validation and Malware Protection**
🎯 **Multiple File Upload with Progress Tracking**
🎯 **Professional File Management Interface**
🎯 **Cloud Storage Integration for Scalability**

## 🏆 Weekly Achievement Badge: **File Management Expert**
*"You've mastered comprehensive file upload and management systems! Your robust file handling system with security, processing, and cloud storage proves you can build professional-grade applications that handle any type of media content."*

**Real-World Connection:** "The file management skills you learned today are absolutely essential for modern web applications! Instagram, YouTube, Google Drive, Dropbox, and virtually every content platform uses these exact same techniques. You now have the skills to build applications that can handle any type of media content securely and efficiently!"

## 📚 Extension Activities (Optional Homework)

### For Future File Management Experts:
- **Cloud Storage:** Integrate AWS S3, Google Cloud, or Azure Blob Storage
- **Video Processing:** Use FFmpeg for video transcoding and thumbnail generation
- **Document Conversion:** Implement file conversion services
- **CDN Integration:** Add CloudFront, CloudFlare, or Fastly for global content delivery

### Online Resources:
- **Multer Documentation:** Comprehensive file upload middleware for Node.js
- **AWS S3 SDK:** Amazon S3 integration documentation
- **Image Processing:** Sharp.js for advanced image manipulation
- **Cloud Storage:** Various cloud storage provider documentation

### Challenge Problem:*
*"Can you build a complete media management system with automatic backup, file versioning, and global CDN delivery? Maybe add features like file sharing, collaboration, and advanced search with AI-powered content analysis!"*

---

**Teacher Notes:**
- Emphasize the importance of security in file upload systems
- Discuss different storage solutions and their trade-offs
- Use real-world examples of successful file management systems
- Celebrate robust security implementations and professional file handling
- Keep security best practices documentation for reference
- Discuss scalability and performance optimization for large file systems*