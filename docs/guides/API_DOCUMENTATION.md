# 🔌 EnglishClub LMS - API Reference

## Base URL
```
http://localhost:4000/api
```

## Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "learner"
}
```

**Roles:** `learner`, `teacher`, `content_provider`

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner"
  }
}
```

---

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner",
    "roleAlias": "learner"
  }
}
```

---

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "learner"
}
```

---

## 📊 Dashboard APIs

### Learner Dashboard
```http
GET /api/dashboard/learner
Authorization: Bearer <token>
```

**Response:**
```json
{
  "profile": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "xp": 150,
    "level": "Beginner"
  },
  "attendance": {
    "present": 5,
    "total": 5,
    "percent": 100
  },
  "tasks": {
    "total": 3,
    "completed": 1,
    "pending": 2
  },
  "classes": [
    {
      "id": 1,
      "name": "English Grammar 101",
      "progress": 45
    }
  ]
}
```

---

### Learner Classes
```http
GET /api/dashboard/learner/classes
Authorization: Bearer <token>
```

**Response:**
```json
{
  "classes": [
    {
      "id": 1,
      "name": "English Grammar 101",
      "description": "Learn basic grammar",
      "tutor": "Mr. Smith",
      "schedule": "Mon, Wed 10 AM",
      "enrolledAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

### Tutor Dashboard
```http
GET /api/dashboard/tutor
Authorization: Bearer <token>
```

**Response:**
```json
{
  "profile": {
    "id": 2,
    "name": "Mr. Smith"
  },
  "stats": {
    "totalClasses": 3,
    "totalStudents": 25,
    "pendingSubmissions": 5
  },
  "classes": [...]
}
```

---

## 🏫 Class APIs

### Get All Classes
```http
GET /api/classes
```

**Response:**
```json
{
  "classes": [
    {
      "id": 1,
      "name": "English Grammar 101",
      "description": "Learn basic grammar",
      "tutor": {
        "id": 2,
        "name": "Mr. Smith"
      },
      "studentCount": 15
    }
  ]
}
```

---

### Get Class Details
```http
GET /api/classes/:id
Authorization: Bearer <token>
```

---

### Create Class (Tutor only)
```http
POST /api/classes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Advanced Grammar",
  "description": "Master complex grammar rules",
  "schedule": "Tue, Thu 2:00 PM"
}
```

---

### Enroll in Class (Learner)
```http
POST /api/classes/:id/enroll
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Successfully enrolled",
  "enrollment": {
    "id": 1,
    "classId": 1,
    "userId": 1,
    "status": "active"
  }
}
```

---

### Unenroll from Class
```http
DELETE /api/classes/:id/enroll
Authorization: Bearer <token>
```

---

## 📋 Task APIs

### Get My Tasks (Learner)
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Grammar Assignment 1",
      "description": "Complete exercises 1-10",
      "type": "assignment",
      "priority": "high",
      "maxPoints": 100,
      "dueDate": "2026-01-15T23:59:59Z",
      "status": "pending",
      "class": {
        "id": 1,
        "name": "English Grammar 101"
      }
    }
  ]
}
```

---

### Get Task Details
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "title": "Grammar Assignment 1",
  "description": "Complete exercises 1-10",
  "instructions": "1. Read each sentence\n2. Identify parts of speech",
  "type": "assignment",
  "priority": "high",
  "maxPoints": 100,
  "dueDate": "2026-01-15T23:59:59Z",
  "tutor": {
    "id": 2,
    "name": "Mr. Smith"
  },
  "submission": null
}
```

---

### Create Task (Tutor only)
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grammar Assignment",
  "description": "Complete the grammar exercises",
  "instructions": "Read each sentence and identify parts of speech",
  "type": "assignment",
  "priority": "high",
  "maxPoints": 100,
  "dueDate": "2026-01-15T23:59:59",
  "classId": 1
}
```

**Task Types:** `assignment`, `quiz`, `reading`
**Priorities:** `low`, `medium`, `high`

---

### Submit Task (Learner)
```http
POST /api/tasks/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "My submission content here..."
}
```

**Response:**
```json
{
  "message": "Task submitted successfully",
  "submission": {
    "id": 1,
    "taskId": 1,
    "userId": 1,
    "content": "My submission...",
    "status": "submitted",
    "submittedAt": "2026-01-10T14:30:00Z"
  }
}
```

---

### Grade Submission (Tutor only)
```http
PUT /api/tasks/:taskId/submissions/:submissionId/grade
Authorization: Bearer <token>
Content-Type: application/json

{
  "grade": 85,
  "feedback": "Good work! Consider reviewing verb tenses."
}
```

---

## 👥 User APIs

### Get All Users (Admin only)
```http
GET /api/users
Authorization: Bearer <token>
```

---

### Update User Role (Admin only)
```http
PUT /api/users/:id/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "teacher"
}
```

---

## 📚 Content APIs

### Get Lessons
```http
GET /api/lessons
```

**Query Parameters:**
- `category`: Filter by category (grammar, vocabulary, etc.)
- `search`: Search term
- `page`: Page number
- `limit`: Items per page

---

### Get Lesson Details
```http
GET /api/lessons/:id
```

---

## ❌ Error Responses

All errors return:
```json
{
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |

---

## 📝 Examples

### cURL - Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"learner@example.com","password":"learn123"}'
```

### cURL - Get Dashboard (with token)
```bash
curl http://localhost:4000/api/dashboard/learner \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### PowerShell - Login
```powershell
$body = @{email="learner@example.com"; password="learn123"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$response.token
```

### JavaScript - Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Login
const { data } = await api.post('/auth/login', {
  email: 'learner@example.com',
  password: 'learn123'
});

// Set token for future requests
api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

// Get dashboard
const dashboard = await api.get('/dashboard/learner');
```

---

**Last Updated**: January 7, 2026
