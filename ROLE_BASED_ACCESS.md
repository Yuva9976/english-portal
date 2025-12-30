# Role-Based Access Control (RBAC) Architecture

## Overview
Three distinct user roles with different permissions, dashboards, and data access.

---

## 1. LEARNER ROLE

### Dashboard Shows:
- ✅ Own progress (0% - 100%)
- ✅ Own completed lessons
- ✅ Own quiz scores
- ✅ Own attendance
- ✅ Available lessons to start

### Can Access:
- `/dashboard` - Learner dashboard
- `/learn/{lesson-id}` - Learn lessons
- `/quiz/{quiz-id}` - Take quizzes
- `/profile` - Own profile only
- `/my-results` - Own quiz results only

### Cannot Access:
- ❌ Other learners' data
- ❌ `/tutor/dashboard` - Teacher features
- ❌ `/admin-dashboard` - Admin features
- ❌ Student management
- ❌ Class creation

### Backend Data Access:
```javascript
// Only their own data
GET /api/dashboard/learner
- Returns: Own progress, lessons, quizzes
- Filter: WHERE user_id = req.user.id

GET /api/quiz/{id}/attempt
- Returns: Only if user enrolled in quiz
- Filter: WHERE quiz_id = {id} AND user_id = req.user.id
```

---

## 2. TEACHER/TUTOR ROLE

### Dashboard Shows:
- ✅ Classes created (count)
- ✅ Students in classes (list)
- ✅ Student progress tracking
- ✅ Quiz performance by student
- ✅ Class statistics
- ✅ Resource usage by students
- ✅ Class attendance

### Can Access:
- `/tutor/dashboard` - Tutor dashboard
- `/tutor/classes` - My classes
- `/tutor/lessons-quizzes` - My lessons/quizzes
- `/tutor/students` - My students only
- `/tutor/resources` - My resources
- `/tutor/settings` - Own settings
- Create/Edit/Delete own lessons
- Create/Manage own classes

### Cannot Access:
- ❌ Other teachers' classes
- ❌ Other teachers' students' data
- ❌ Admin settings
- ❌ System-wide analytics
- ❌ User management
- ❌ Other teachers' resources

### Backend Data Access:
```javascript
// Only their own classes and students
GET /api/tutor/dashboard/overview
- Returns: Own classes, students, stats
- Filter: WHERE teacher_id = req.user.id

GET /api/tutor/classes
- Returns: Only classes created by this teacher
- Filter: WHERE teacher_id = req.user.id

GET /api/tutor/students
- Returns: Students in teacher's classes
- Filter: WHERE class_id IN (teacher's classes)

GET /api/tutor/class/{id}/students
- Only if teacher owns the class
- Filter: WHERE teacher_id = req.user.id AND class_id = {id}
```

---

## 3. ADMIN ROLE

### Dashboard Shows:
- ✅ All users (learners, teachers, admins)
- ✅ All classes and enrollments
- ✅ System-wide analytics
- ✅ User management interface
- ✅ Content management
- ✅ System settings
- ✅ Reports and logs

### Can Access:
- `/admin-dashboard` - System overview
- `/admin/users` - All users management
- `/admin/classes` - All classes
- `/admin/content` - All content
- `/admin/reports` - System reports
- `/admin/settings` - System settings
- View/Edit/Delete anything
- Impersonate users for testing

### Cannot Access:
- ❌ Nothing - Full system access

### Backend Data Access:
```javascript
// All data, no restrictions
GET /api/admin/dashboard
- Returns: System overview, all stats

GET /api/admin/users
- Returns: All users with all data

GET /api/admin/classes
- Returns: All classes

GET /api/admin/reports
- Returns: System-wide analytics
```

---

## Implementation Checklist

### Frontend
- [ ] Navigation menu changes based on role
- [ ] Dashboard component redirects based on role
- [ ] Menu items hidden/shown per role
- [ ] Routes protected by ProtectedRoute with allowedRoles
- [ ] Breadcrumbs show role-specific navigation

### Backend
- [ ] Authentication middleware extracts role
- [ ] Role-checking middleware for protected routes
- [ ] Data queries filter by ownership (user_id, teacher_id, etc.)
- [ ] API responses exclude unauthorized data
- [ ] Audit logging for admin actions
- [ ] 403 Forbidden returned for permission denied

### Database
- [ ] user.role (learner, teacher, admin)
- [ ] user.role_alias (for teacher → tutor mapping)
- [ ] classroom.teacher_id (ownership)
- [ ] class_participant.user_id (enrollment)
- [ ] quiz_attempt.user_id (ownership)
- [ ] lesson.teacher_id (who created it)

---

## Example: Fetching Quiz Scores

### ❌ BAD (Insecure)
```javascript
// Anyone can see anyone's scores
GET /api/quiz/scores → Returns ALL scores
```

### ✅ GOOD (Secure)
```javascript
// Learner fetches own scores
GET /api/dashboard/learner
- Backend: SELECT * FROM quiz_attempt WHERE user_id = {req.user.id}
- Returns: Only own attempts

// Teacher fetches students' scores in their class
GET /api/tutor/class/{classId}/quiz-scores
- Backend: Checks if teacher owns class first
- Then: SELECT * FROM quiz_attempt WHERE user_id IN (students in class)
- Returns: Only their students' scores

// Admin fetches all scores
GET /api/admin/quiz/all-scores
- Backend: SELECT * FROM quiz_attempt (no filter)
- Returns: All attempts
```

---

## Navigation Menu Structure

### LEARNER Menu
```
📊 Dashboard → /dashboard
📚 Learn English → /modules
📝 My Quizzes → /my-results
👤 Profile → /profile
🚪 Logout
```

### TEACHER Menu
```
📊 Dashboard → /tutor/dashboard
🧑‍🏫 My Classes → /tutor/classes
📚 Lessons & Quizzes → /tutor/lessons-quizzes
👨‍🎓 Students → /tutor/students
🗂️ Resources → /tutor/resources
⚙️ Settings → /tutor/settings
🚪 Logout
```

### ADMIN Menu
```
📊 Dashboard → /admin-dashboard
👥 Users → /admin/users
📚 Classes → /admin/classes
📄 Content → /admin/content
📈 Reports → /admin/reports
⚙️ Settings → /admin/settings
🚪 Logout
```

---

## Key Principle: Trust Nothing

**Backend should NEVER trust the frontend role claim!**

```javascript
// ❌ BAD - Trust what user sends
if (req.body.role === 'admin') { grant access }

// ✅ GOOD - Verify from token/session
if (req.user.role === 'admin') { grant access }
// Where req.user comes from JWT verification in auth middleware
```

