# 🔐 Authentication & Roles/Permissions Guide

## System Overview

The English Learning Platform has **3 user roles** with different permissions and dashboards:

---

## 1️⃣ LEARNER (Default Role)

### Who is a Learner?
- Students/regular users who want to **learn English**
- Default role when registering if no role is specified

### What Can They Do?
✅ Browse and access lessons  
✅ Complete lessons and track progress  
✅ Take quizzes and see scores  
✅ View their dashboard with:
  - Total lessons completed
  - Progress on current lessons (sections)
  - Quiz attempt history with scores  
✅ Subscribe to newsletter  

### What Can't They Do?
❌ Create or edit lessons  
❌ See other students' progress  
❌ Access teacher/admin dashboards  
❌ Manage user accounts  

### Learner Dashboard Data (`GET /api/dashboard/learner/:userId`)
```json
{
  "userId": 1,
  "lessonsTotal": 50,
  "lessonsCompletedCount": 5,
  "lessonsProgress": [
    {
      "lessonId": 1,
      "title": "Past Tense",
      "totalSections": 4,
      "completedSections": 3,
      "completed": false
    }
  ],
  "quizAttempts": [
    {
      "id": 1,
      "user_id": 1,
      "quiz_id": 2,
      "score_percent": 85,
      "submitted_at": "2025-11-11T10:30:00Z"
    }
  ]
}
```

### Test Login (Learner)
```
Email: learner@example.com
Password: password123
Role: learner
```

---

## 2️⃣ TEACHER

### Who is a Teacher?
- English instructors who **create and manage lessons**
- Assigned the `teacher` role during registration

### What Can They Do?
✅ Create lessons and sections  
✅ Edit their own lessons  
✅ Delete their own lessons  
✅ View teacher dashboard showing:
  - All lessons they created
  - Number of students enrolled in each lesson
  - Average completion percentage
  - Average quiz scores  
✅ Create and manage quizzes for their lessons  
✅ See student progress on their content  

### What Can't They Do?
❌ Edit lessons from other teachers  
❌ See other teachers' lessons  
❌ Delete students or manage accounts  
❌ Access admin features  

### Teacher Dashboard Data (`GET /api/dashboard/teacher/:teacherId`)
```json
{
  "teacherId": 2,
  "lessons": [
    {
      "lessonId": 1,
      "title": "Past Tense Basics",
      "studentsStarted": 12,
      "avgCompletionPercent": 75,
      "avgQuizScore": 82
    },
    {
      "lessonId": 2,
      "title": "Present Perfect",
      "studentsStarted": 8,
      "avgCompletionPercent": 60,
      "avgQuizScore": 78
    }
  ]
}
```

### Test Login (Teacher)
```
Email: teacher@example.com
Password: password123
Role: teacher
```

---

## 3️⃣ ADMIN

### Who is an Admin?
- Platform administrators with **full control**
- Assigned the `admin` role during registration

### What Can They Do?
✅ Access all dashboards  
✅ Create, edit, delete any lessons  
✅ Manage all users (view, suspend, delete)  
✅ Approve teacher accounts  
✅ View system analytics  
✅ Manage platform settings  

### What Can't They Do?
❌ This role should have full access to everything

### Test Login (Admin)
```
Email: admin@example.com
Password: password123
Role: admin
```

---

## 📊 Comparison Table

| Feature | Learner | Teacher | Admin |
|---------|---------|---------|-------|
| Browse Lessons | ✅ | ✅ | ✅ |
| Take Quizzes | ✅ | ✅ | ✅ |
| Create Lessons | ❌ | ✅ | ✅ |
| Edit Own Lessons | ❌ | ✅ | ✅ |
| Edit Others' Lessons | ❌ | ❌ | ✅ |
| Delete Lessons | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ✅ (Own) | ✅ |
| Admin Dashboard | ❌ | ❌ | ✅ |

---

## 🔑 Authentication Flow

### Registration
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "learner"  // Optional: defaults to "learner"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner"
  }
}
```

### Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner"
  }
}
```

### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer {token}

Response:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "learner"
  }
}
```

### Logout
```
POST /api/auth/logout
Response: { "ok": true }
```

---

## 🛡️ Protected Routes (Require Login)

```
✅ GET  /api/dashboard/learner/:userId
✅ GET  /api/dashboard/teacher/:teacherId
✅ POST /api/quizzes/:id/attempt
✅ GET  /api/auth/me
✅ POST /api/lessons (for teachers/admins only)
✅ PUT  /api/lessons/:id (for teachers/admins only)
✅ DELETE /api/lessons/:id (for teachers/admins only)
```

---

## 💾 Database Structure

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('learner', 'teacher', 'admin') DEFAULT 'learner',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## 🎯 What We Need to Build Next

### For Learner Role:
- [ ] Learner Dashboard Page (show progress, completed lessons, quiz scores)
- [ ] Lesson Details Page (show sections, mark complete, start quiz)
- [ ] Quiz Taking Interface (already partially done)
- [ ] Progress Tracking

### For Teacher Role:
- [ ] Teacher Dashboard (show created lessons, student engagement)
- [ ] Lesson Creator/Editor (create and edit lessons)
- [ ] Quiz Manager (create quizzes for lessons)
- [ ] Student Progress Analytics

### For Admin Role:
- [ ] Admin Dashboard (system overview, user management)
- [ ] User Management (view, edit, delete users)
- [ ] Content Management (manage all lessons)
- [ ] System Analytics

---

## 📝 Summary

**You have 3 user types:**
1. **Learner** - Takes lessons, completes sections, takes quizzes
2. **Teacher** - Creates lessons, tracks student progress, manages quizzes
3. **Admin** - Full control, manages users and all content

Each role can see different dashboards with relevant data. Next, we'll connect the frontend to show the right dashboard based on the user's role!

