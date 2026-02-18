# EnglishClub LMS - Complete Documentation

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [User Roles & Permissions](#user-roles--permissions)
5. [Installation & Setup](#installation--setup)
6. [Frontend Structure](#frontend-structure)
7. [Backend API Reference](#backend-api-reference)
8. [Database Schema](#database-schema)
9. [Features by Role](#features-by-role)
10. [Color Theme & Design](#color-theme--design)
11. [Testing Guide](#testing-guide)
12. [Deployment](#deployment)

---

## 🎯 Project Overview

**EnglishClub LMS** is a comprehensive Learning Management System designed for English language education. It provides a platform for students to learn, tutors to teach, and content providers to create educational materials.

### Key Features
- 🎓 **Multi-role system** - Learners, Tutors, Content Providers, Admins
- 📚 **Grammar Hub** - Parts of speech, vocabulary, pronunciation
- 📋 **Task Management** - Assignments, quizzes with deadlines
- 🏫 **Class Management** - Enrollment, attendance tracking
- 📊 **Progress Tracking** - XP points, completion rates, certificates
- 🔐 **Authentication** - JWT-based secure login system

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite)                │
│                      Port: 3000/3001/5173                   │
├─────────────────────────────────────────────────────────────┤
│  Pages          │  Components       │  Layouts              │
│  - Home         │  - NavBar         │  - MainLayout         │
│  - Login        │  - SiteFooter     │  - LearnerLayout      │
│  - Register     │  - LearnerSidebar │  - TutorDashboard     │
│  - Learner      │  - TutorSidebar   │    Layout             │
│  - Tutor        │  - StatCards      │                       │
│  - Admin        │  - ProgressRing   │                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                     │
│                        Port: 4000                           │
├─────────────────────────────────────────────────────────────┤
│  Routes             │  Middleware        │  Models          │
│  - /api/auth        │  - authMiddleware  │  - User          │
│  - /api/dashboard   │  - roleMiddleware  │  - Class         │
│  - /api/classes     │  - errorHandler    │  - Task          │
│  - /api/tasks       │                    │  - Enrollment    │
│  - /api/content     │                    │  - Submission    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Sequelize ORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL)                         │
│                      Port: 3306                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Library |
| Vite | 5.x | Build Tool |
| React Router | 6.x | Client-side Routing |
| Tailwind CSS | 3.x | Styling |
| Axios | 1.x | HTTP Client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x+ | Runtime |
| Express.js | 4.x | Web Framework |
| Sequelize | 6.x | ORM |
| MySQL | 8.x | Database |
| JWT | - | Authentication |
| bcryptjs | - | Password Hashing |

---

## 👥 User Roles & Permissions

### 1. 🎓 Learner (Student)
```
Permissions:
├── View Dashboard
├── Browse & Enroll in Classes
├── View Tasks & Submit Assignments
├── Track Progress & XP
├── View Certificates
├── Access Grammar Hub
└── View Learn English Content
```

### 2. 👨‍🏫 Tutor (Teacher)
```
Permissions:
├── All Learner permissions PLUS:
├── Create & Manage Classes
├── Create Tasks & Assignments
├── Grade Student Submissions
├── View Student Progress
├── Take Attendance
└── Access Teacher Tools
```

### 3. 📚 Content Provider
```
Permissions:
├── Create Learning Content
├── Manage Lessons & Quizzes
├── Upload Resources
├── Edit Content Categories
└── View Content Analytics
```

### 4. 🔐 Admin
```
Permissions:
├── All permissions PLUS:
├── User Management
├── System Configuration
├── View All Analytics
├── Manage Roles
└── Content Moderation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MySQL 8+ database
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/Yuva9976/english-portal.git
cd english-portal
```

### Step 2: Backend Setup
```bash
cd english-backend
npm install

# Create .env file
echo "PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=english_lms
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_jwt_secret_key" > .env

# Start backend
node app.js
```

### Step 3: Frontend Setup
```bash
cd english-frontend
npm install

# Start frontend
npm run dev
```

### Step 4: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

---

## 📁 Frontend Structure

```
english-frontend/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx              # Main navigation bar
│   │   ├── SiteFooter.jsx          # Site-wide footer
│   │   ├── LearnerSidebar.jsx      # Learner dashboard sidebar
│   │   ├── TutorSidebar.jsx        # Tutor dashboard sidebar
│   │   └── TutorDashboardLayout.jsx
│   │
│   ├── layouts/
│   │   ├── MainLayout.jsx          # Public pages layout
│   │   └── LearnerLayout.jsx       # Learner pages layout
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── LearnerDashboard.jsx    # Main learner dashboard
│   │   ├── LearnerClasses.jsx      # My Classes page
│   │   ├── LearnerTasks.jsx        # My Tasks page
│   │   ├── BrowseClasses.jsx       # Browse available classes
│   │   ├── TaskDetail.jsx          # Task details & submission
│   │   │
│   │   ├── AdminDashboard.jsx
│   │   ├── ContentProviderDashboard.jsx
│   │   └── GrammarHub/
│   │       ├── GrammarHub.jsx
│   │       ├── NounDetail.jsx
│   │       ├── VerbDetail.jsx
│   │       └── ...
│   │
│   ├── apiClient.js                # Axios instance
│   ├── App.jsx                     # Main app with routes
│   └── main.jsx                    # Entry point
│
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔌 Backend API Reference

### Authentication APIs

#### POST `/api/auth/register`
Register a new user.
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "learner" | "teacher" | "content_provider"
}

Response:
{
  "message": "User registered successfully",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

#### POST `/api/auth/login`
Login and receive JWT token.
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "name": "John Doe", "role": "learner" }
}
```

### Dashboard APIs

#### GET `/api/dashboard/learner`
Get learner dashboard data (requires auth).
```json
Response:
{
  "profile": { "name": "John", "email": "...", "xp": 150 },
  "attendance": { "present": 5, "total": 5, "percent": 100 },
  "tasks": { "total": 3, "completed": 1, "pending": 2 },
  "classes": [...]
}
```

#### GET `/api/dashboard/learner/classes`
Get enrolled classes for learner.

#### GET `/api/dashboard/tutor`
Get tutor dashboard data.

### Class APIs

#### GET `/api/classes`
Get all available classes.

#### POST `/api/classes`
Create a new class (tutor only).
```json
Request:
{
  "name": "English Grammar 101",
  "description": "Learn basic grammar",
  "schedule": "Mon, Wed, Fri 10:00 AM"
}
```

#### POST `/api/classes/:id/enroll`
Enroll in a class (learner).

### Task APIs

#### GET `/api/tasks`
Get tasks for current user.

#### POST `/api/tasks`
Create a new task (tutor only).
```json
Request:
{
  "title": "Grammar Assignment",
  "description": "Complete exercises",
  "instructions": "...",
  "type": "assignment",
  "priority": "high",
  "maxPoints": 100,
  "dueDate": "2026-01-15T23:59:59"
}
```

#### POST `/api/tasks/:id/submit`
Submit task (learner).
```json
Request:
{
  "content": "My submission text..."
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('learner', 'teacher', 'content_provider', 'admin'),
  roleAlias VARCHAR(50),
  xp INT DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Classes Table
```sql
CREATE TABLE Classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schedule VARCHAR(255),
  tutorId INT REFERENCES Users(id),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Enrollments Table
```sql
CREATE TABLE Enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT REFERENCES Users(id),
  classId INT REFERENCES Classes(id),
  status ENUM('active', 'completed', 'dropped'),
  enrolledAt DATETIME,
  UNIQUE(userId, classId)
);
```

### Tasks Table
```sql
CREATE TABLE Tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructions TEXT,
  type ENUM('assignment', 'quiz', 'reading'),
  priority ENUM('low', 'medium', 'high'),
  maxPoints INT DEFAULT 100,
  dueDate DATETIME,
  tutorId INT REFERENCES Users(id),
  classId INT REFERENCES Classes(id),
  createdAt DATETIME
);
```

### TaskSubmissions Table
```sql
CREATE TABLE TaskSubmissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  taskId INT REFERENCES Tasks(id),
  userId INT REFERENCES Users(id),
  content TEXT,
  grade INT,
  feedback TEXT,
  status ENUM('pending', 'submitted', 'graded'),
  submittedAt DATETIME,
  UNIQUE(taskId, userId)
);
```

---

## 🎨 Color Theme & Design

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Teal | `#0d9488` | Primary brand, buttons, links |
| Cyan | `#06b6d4` | Secondary accents, gradients |
| Rose | `#f43f5e` | Highlights, notifications |
| Slate | `#64748b` | Text, backgrounds |

### Gradients
```css
/* Primary Button */
background: linear-gradient(to right, #14b8a6, #06b6d4);

/* Sidebar */
background: linear-gradient(to bottom, #0f766e, #0f172a);

/* Footer */
background: linear-gradient(to bottom-right, #134e4a, #0f172a, #881337);

/* Cards */
background: linear-gradient(to bottom-right, #14b8a6, #06b6d4);
```

### Typography
- **Headings**: Bold, Slate-800
- **Body**: Regular, Slate-600
- **Links**: Medium, Teal-600
- **Font Size**: Base 16px (text-base)

---

## ✅ Features by Role

### Learner Dashboard Features
| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/learner` | Overview with stats, progress |
| My Classes | `/learner/classes` | Enrolled classes list |
| Browse Classes | `/learner/browse` | Discover new classes |
| My Tasks | `/learner/tasks` | View & submit assignments |
| My Progress | `/learner/progress` | XP, completion tracking |
| Certificates | `/learner/certificates` | Earned certificates |
| Settings | `/learner/settings` | Profile settings |

### Tutor Dashboard Features
| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/tutor/dashboard` | Teaching overview |
| My Classes | `/tutor/classes` | Manage classes |
| Students | `/tutor/students` | Student management |
| Create Tasks | `/tutor/tasks` | Assignment creation |
| Grade | `/tutor/grade` | Grade submissions |

### Admin Features
| Feature | Route | Description |
|---------|-------|-------------|
| Dashboard | `/admin-dashboard` | System overview |
| Users | `/admin/users` | User management |
| Content | `/admin/content` | Content moderation |

---

## 🧪 Testing Guide

### Test Accounts
```
Learner:
  Email: learner@example.com
  Password: learn123

Teacher:
  Email: teacher@example.com
  Password: teach123

Admin:
  Email: admin@example.com
  Password: admin123

Content Provider:
  Email: provider@example.com
  Password: provider123
```

### Manual Testing Checklist

#### Authentication
- [ ] Register new learner account
- [ ] Register new tutor account
- [ ] Register content provider account
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (should fail)
- [ ] Logout functionality

#### Learner Flow
- [ ] View dashboard with stats
- [ ] Browse available classes
- [ ] Enroll in a class
- [ ] View enrolled classes
- [ ] View assigned tasks
- [ ] Submit a task
- [ ] Check progress

#### Tutor Flow
- [ ] Create a new class
- [ ] Assign a task to class
- [ ] View student submissions
- [ ] Grade a submission

---

## 🚢 Deployment

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
PORT=4000
DB_HOST=your-db-host
DB_PORT=3306
DB_NAME=english_lms
DB_USER=your-db-user
DB_PASS=your-db-password
JWT_SECRET=your-secure-jwt-secret
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-api-domain.com
```

### Build Commands

```bash
# Frontend build
cd english-frontend
npm run build

# Output in dist/ folder
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Railway, Render, or AWS EC2
- **Database**: PlanetScale, AWS RDS, or DigitalOcean Managed DB

---

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/Yuva9976/english-portal/issues
- Email: support@englishclub.com

---

## 📄 License

This project is licensed under the MIT License.

---

**Last Updated**: January 7, 2026
**Version**: 1.0.0
