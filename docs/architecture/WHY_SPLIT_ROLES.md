# Role-Based Access Control Summary

## Quick Answer to "Why Split Access?"

### 1. **SECURITY** ⚠️
```
Learner A should NOT see:
- Learner B's grades
- Teacher's quiz answers
- Admin settings

Teacher A should NOT see:
- Teacher B's student data
- Admin controls
- Other teacher's class secrets

Admin can see EVERYTHING (by design)
```

### 2. **USER EXPERIENCE** 🎯
```
Learner sees: "My progress, my lessons, my quizzes"
Teacher sees: "My classes, my students, their performance"
Admin sees: "System health, all users, everything"
```

### 3. **DATA INTEGRITY** 🔒
```
❌ Bad: Student can modify quiz answers
✅ Good: Only submitted quiz attempts stored (read-only)

❌ Bad: Teacher can see other teachers' student data
✅ Good: Teacher queries filtered by their class_id

❌ Bad: Admin role assigned by URL parameter
✅ Good: Admin role verified from JWT token
```

---

## The 3-Layer Approach

### Layer 1: Frontend Routes
```jsx
<Route path='/tutor/dashboard' element={
  <ProtectedRoute allowedRoles={['teacher', 'tutor']}>
    <TutorDashboard />
  </ProtectedRoute>
} />

<Route path='/admin-dashboard' element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

**What it does:** Prevents unauthorized users from accessing pages
**Limitation:** Frontend can be bypassed, so NEVER trust it

---

### Layer 2: Backend Route Protection
```javascript
router.get('/api/tutor/dashboard', 
  requireRole(['teacher', 'tutor']),  // ← Checks role
  async (req, res) => {
    // Only executes if role is teacher/tutor
  }
);
```

**What it does:** Rejects requests from unauthorized roles with 403 Forbidden
**Importance:** This is the CRITICAL security layer

---

### Layer 3: Data Filtering
```javascript
// When getting classes, filter by teacher ownership
const classes = await Classroom.findAll({
  where: { teacher_id: req.user.id }  // ← Only their classes
});

// When admin gets classes, no filter
const allClasses = await Classroom.findAll();  // ← All classes
```

**What it does:** Even if someone bypasses roles, they can only access appropriate data
**Importance:** Defense in depth

---

## Real-World Scenario

### Scenario: Learner tries to hack teacher data

**Step 1:** Frontend blocks
```javascript
// Try to navigate to /tutor/dashboard
<ProtectedRoute allowedRoles={['teacher']}>
// Learner redirected to /dashboard ❌
```

**Step 2:** Even if they use developer tools to navigate...
```
// They try: GET /api/tutor/dashboard
// Backend middleware checks role
requireRole(['teacher'])
// Returns: 403 Forbidden ❌
```

**Step 3:** Even if they fake a header...
```javascript
// Header: Authorization: Bearer [fake_token]
// Backend verifies JWT signature
// Invalid token → 401 Unauthorized ❌
```

**Step 4:** They can't change their DB role
```
// Their user record: role = 'learner'
// Queries filter by user_id
// They only see their own data ❌
```

✅ **Multiple layers of security = Protected**

---

## What Each Role Does

| Feature | Learner | Teacher | Admin |
|---------|---------|---------|-------|
| See own dashboard | ✅ | ✅ | ✅ |
| See own progress | ✅ | ❌ | ✅ |
| See own grades | ✅ | ❌ | ✅ |
| Create classes | ❌ | ✅ | ✅ |
| View student data | ❌ | ✅* | ✅ |
| See all users | ❌ | ❌ | ✅ |
| See all classes | ❌ | ❌ | ✅ |
| Change settings | ❌ | Limited | ✅ |
| Delete content | ❌ | Own only | ✅ |
| Delete users | ❌ | ❌ | ✅ |

*Teacher can only see their own students

---

## Quick Reference: What to Change

### For Learner
```javascript
// Backend route
router.get('/dashboard/learner', 
  requireRole(['learner']),
  async (req, res) => {
    // Get only req.user.id data
  }
);
```

### For Teacher
```javascript
// Backend route
router.get('/tutor/dashboard',
  requireRole(['teacher']),
  async (req, res) => {
    // Get classes WHERE teacher_id = req.user.id
    // Get students in those classes
    // Get quizzes for those classes
  }
);
```

### For Admin
```javascript
// Backend route
router.get('/admin/dashboard',
  requireRole(['admin']),
  async (req, res) => {
    // Get ALL data (no WHERE filters)
  }
);
```

---

## Files That Need Implementation

### Frontend
- [ ] Update ProtectedRoute.jsx with allowedRoles checks
- [ ] Create navigation config by role
- [ ] Hide/show menu items based on role
- [ ] Redirect unauthorized access to appropriate dashboard

### Backend
- [ ] Create requireRole middleware
- [ ] Update all routes with role checks
- [ ] Add WHERE filters in queries for learner/teacher
- [ ] No filters for admin (or explicit admin check)

### Database
- Already has: user.role, user.role_alias
- Need: Verify classroom.teacher_id, quiz.teacher_id, etc.

---

## Security Checklist

- [ ] Never trust frontend role - always check on backend
- [ ] Every API endpoint has requireRole middleware
- [ ] All queries filtered by ownership (user_id, teacher_id)
- [ ] JWT token verified before accessing user data
- [ ] 403 responses sent for permission denied
- [ ] Audit log admin actions
- [ ] Passwords hashed with bcrypt
- [ ] No sensitive data in JWT token

---

## Summary

**The key principle:** Different roles need different views of the same system.

- **Learner:** "Show me my stuff"
- **Teacher:** "Show me my class and my students"
- **Admin:** "Show me everything"

Implement this with:
1. Frontend route protection (nice UX)
2. Backend role checking (security)
3. Data filtering by ownership (data integrity)

This is **role-based access control (RBAC)** - industry standard.
