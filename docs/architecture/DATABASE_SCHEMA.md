# 🗄️ EnglishClub LMS - Database Schema

## Overview

The database uses **MySQL** with **Sequelize ORM**. All tables use `id` as primary key with auto-increment.

---

## Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Users     │────<│  Enrollments │>────│   Classes    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                                         │
       │                                         │
       ▼                                         ▼
┌──────────────┐                         ┌──────────────┐
│    Tasks     │<────────────────────────│   Lessons    │
└──────────────┘                         └──────────────┘
       │
       │
       ▼
┌──────────────┐
│ Submissions  │
└──────────────┘
```

---

## Tables

### 👤 Users
Stores all user accounts.

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('learner', 'teacher', 'content_provider', 'admin') DEFAULT 'learner',
    roleAlias VARCHAR(50),
    xp INT DEFAULT 0,
    level VARCHAR(50) DEFAULT 'Beginner',
    avatarUrl VARCHAR(500),
    isActive BOOLEAN DEFAULT TRUE,
    lastLoginAt DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_users_role ON Users(role);
```

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(255) | User's full name |
| email | VARCHAR(255) | Unique email address |
| password | VARCHAR(255) | Bcrypt hashed password |
| role | ENUM | User role |
| roleAlias | VARCHAR(50) | Display role name |
| xp | INT | Experience points |
| level | VARCHAR(50) | User level |

---

### 🏫 Classes
Stores class/course information.

```sql
CREATE TABLE Classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    schedule VARCHAR(255),
    tutorId INT NOT NULL,
    maxStudents INT DEFAULT 30,
    isActive BOOLEAN DEFAULT TRUE,
    startDate DATE,
    endDate DATE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tutorId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_classes_tutor ON Classes(tutorId);
```

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| name | VARCHAR(255) | Class name |
| description | TEXT | Class description |
| schedule | VARCHAR(255) | Schedule info |
| tutorId | INT | Foreign key to Users |
| maxStudents | INT | Maximum enrollment |

---

### 📝 Enrollments
Links students to classes.

```sql
CREATE TABLE Enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    classId INT NOT NULL,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    progress INT DEFAULT 0,
    enrolledAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME,
    
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES Classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (userId, classId)
);

-- Indexes
CREATE INDEX idx_enrollments_user ON Enrollments(userId);
CREATE INDEX idx_enrollments_class ON Enrollments(classId);
```

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| userId | INT | Foreign key to Users |
| classId | INT | Foreign key to Classes |
| status | ENUM | Enrollment status |
| progress | INT | Completion percentage |

---

### 📋 Tasks
Stores assignments, quizzes, and tasks.

```sql
CREATE TABLE Tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    type ENUM('assignment', 'quiz', 'reading', 'practice') DEFAULT 'assignment',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    maxPoints INT DEFAULT 100,
    dueDate DATETIME,
    tutorId INT NOT NULL,
    classId INT,
    isPublished BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tutorId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES Classes(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_tasks_tutor ON Tasks(tutorId);
CREATE INDEX idx_tasks_class ON Tasks(classId);
CREATE INDEX idx_tasks_duedate ON Tasks(dueDate);
```

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| title | VARCHAR(255) | Task title |
| description | TEXT | Brief description |
| instructions | TEXT | Detailed instructions |
| type | ENUM | Task type |
| priority | ENUM | Priority level |
| maxPoints | INT | Maximum points |
| dueDate | DATETIME | Due date/time |

---

### 📤 TaskSubmissions
Stores student submissions for tasks.

```sql
CREATE TABLE TaskSubmissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    taskId INT NOT NULL,
    userId INT NOT NULL,
    content TEXT,
    fileUrl VARCHAR(500),
    grade INT,
    feedback TEXT,
    status ENUM('pending', 'submitted', 'graded', 'returned') DEFAULT 'pending',
    submittedAt DATETIME,
    gradedAt DATETIME,
    gradedBy INT,
    
    FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (gradedBy) REFERENCES Users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_submission (taskId, userId)
);

-- Indexes
CREATE INDEX idx_submissions_task ON TaskSubmissions(taskId);
CREATE INDEX idx_submissions_user ON TaskSubmissions(userId);
CREATE INDEX idx_submissions_status ON TaskSubmissions(status);
```

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| taskId | INT | Foreign key to Tasks |
| userId | INT | Foreign key to Users |
| content | TEXT | Submission content |
| grade | INT | Score (0-maxPoints) |
| feedback | TEXT | Tutor feedback |
| status | ENUM | Submission status |

---

### 📅 Attendance
Tracks class attendance.

```sql
CREATE TABLE Attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    classId INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('present', 'absent', 'late', 'excused') DEFAULT 'present',
    notes VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES Classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_attendance (userId, classId, date)
);

-- Indexes
CREATE INDEX idx_attendance_user ON Attendance(userId);
CREATE INDEX idx_attendance_class ON Attendance(classId);
CREATE INDEX idx_attendance_date ON Attendance(date);
```

---

### 📚 Lessons
Stores learning content.

```sql
CREATE TABLE Lessons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category ENUM('grammar', 'vocabulary', 'pronunciation', 'listening', 'speaking', 'reading', 'writing'),
    subcategory VARCHAR(100),
    difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    duration INT, -- in minutes
    authorId INT,
    isPublished BOOLEAN DEFAULT TRUE,
    viewCount INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (authorId) REFERENCES Users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_lessons_category ON Lessons(category);
CREATE INDEX idx_lessons_author ON Lessons(authorId);
```

---

### 🏆 Certificates
Stores earned certificates.

```sql
CREATE TABLE Certificates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    classId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issueDate DATE NOT NULL,
    certificateUrl VARCHAR(500),
    
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (classId) REFERENCES Classes(id) ON DELETE SET NULL
);
```

---

## Sample Data

### Insert Test Users
```sql
-- Admin
INSERT INTO Users (name, email, password, role) VALUES 
('Admin User', 'admin@example.com', '$2b$10$...', 'admin');

-- Teacher
INSERT INTO Users (name, email, password, role) VALUES 
('Mr. Smith', 'teacher@example.com', '$2b$10$...', 'teacher');

-- Learner
INSERT INTO Users (name, email, password, role) VALUES 
('John Doe', 'learner@example.com', '$2b$10$...', 'learner');

-- Content Provider
INSERT INTO Users (name, email, password, role) VALUES 
('Content Creator', 'provider@example.com', '$2b$10$...', 'content_provider');
```

### Insert Sample Class
```sql
INSERT INTO Classes (name, description, schedule, tutorId) VALUES 
('English Grammar 101', 'Learn fundamental grammar rules', 'Mon, Wed, Fri 10:00 AM', 2);
```

### Insert Sample Task
```sql
INSERT INTO Tasks (title, description, instructions, type, priority, maxPoints, dueDate, tutorId, classId) VALUES 
('Grammar Assignment 1', 'Complete the grammar exercises', 'Identify parts of speech in each sentence', 'assignment', 'high', 100, '2026-01-15 23:59:59', 2, 1);
```

---

## Sequelize Models

### User Model
```javascript
// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('learner', 'teacher', 'content_provider', 'admin'),
      defaultValue: 'learner'
    },
    xp: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Class, { foreignKey: 'tutorId', as: 'taughtClasses' });
    User.hasMany(models.Enrollment, { foreignKey: 'userId' });
    User.hasMany(models.TaskSubmission, { foreignKey: 'userId' });
  };

  return User;
};
```

---

## Queries

### Get User Dashboard Data
```sql
SELECT 
  u.id, u.name, u.email, u.xp,
  COUNT(DISTINCT e.classId) as enrolledClasses,
  COUNT(DISTINCT ts.id) as completedTasks
FROM Users u
LEFT JOIN Enrollments e ON u.id = e.userId AND e.status = 'active'
LEFT JOIN TaskSubmissions ts ON u.id = ts.userId AND ts.status = 'graded'
WHERE u.id = ?
GROUP BY u.id;
```

### Get User's Enrolled Classes with Progress
```sql
SELECT 
  c.id, c.name, c.description, c.schedule,
  e.progress, e.enrolledAt,
  u.name as tutorName
FROM Classes c
JOIN Enrollments e ON c.id = e.classId
JOIN Users u ON c.tutorId = u.id
WHERE e.userId = ? AND e.status = 'active';
```

### Get Pending Tasks for User
```sql
SELECT 
  t.id, t.title, t.description, t.type, t.priority, t.dueDate, t.maxPoints,
  c.name as className,
  ts.status as submissionStatus
FROM Tasks t
JOIN Classes c ON t.classId = c.id
JOIN Enrollments e ON c.id = e.classId
LEFT JOIN TaskSubmissions ts ON t.id = ts.taskId AND ts.userId = e.userId
WHERE e.userId = ? 
  AND e.status = 'active'
  AND (ts.status IS NULL OR ts.status = 'pending')
  AND t.dueDate > NOW()
ORDER BY t.dueDate ASC;
```

---

**Last Updated**: January 7, 2026
