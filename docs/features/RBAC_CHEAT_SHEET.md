# 🚀 RBAC Quick Reference Card

## Login Credentials

```
LEARNER:
  Email: learner@example.com
  Pass: learn123
  → Sees: /dashboard

TEACHER:
  Email: teacher@example.com
  Pass: teach123
  → Sees: /tutor/dashboard

ADMIN:
  Email: admin@example.com
  Pass: password123
  Checkbox: ✓ Admin Login
  → Sees: /admin-dashboard
```

---

## Frontend Route Protection

```jsx
// In App.jsx
<Route path='/tutor/dashboard' element={
  <ProtectedRoute allowedRoles={['teacher', 'tutor']}>
    <TutorDashboard />
  </ProtectedRoute>
} />
```

---

## Backend Role Checking

```javascript
// Import
const { requireTeacher, requireAdmin, requireRole } = require('./middleware/rbac');

// Teacher only
router.get('/overview', requireTeacher, handler);

// Admin only
router.get('/users', requireAdmin, handler);

// Multiple roles
router.get('/quiz', requireRole('learner', 'teacher'), handler);
```

---

## Data Filtering

```javascript
// Teacher sees only their classes
router.get('/classes', requireTeacher, async (req, res) => {
  const classes = await Classroom.findAll({
    where: { teacher_id: req.user.id }  // ← FILTER
  });
});

// Admin sees all classes
router.get('/admin/classes', requireAdmin, async (req, res) => {
  const classes = await Classroom.findAll();  // ← NO FILTER
});
```

---

## Check Current User

```javascript
// Frontend
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.role);       // 'teacher', 'learner', 'admin'
console.log(user.roleAlias);  // 'tutor' (for teachers)

// Backend
console.log(req.user.role);       // From DB
console.log(req.user.role_alias); // From DB
```

---

## Three Layers of Security

```
1️⃣ FRONTEND ROUTING
   <ProtectedRoute allowedRoles={['teacher']}>
   → Prevents unauthorized navigation

2️⃣ BACKEND MIDDLEWARE
   requireTeacher middleware
   → Rejects unauthorized API calls

3️⃣ DATA FILTERING
   WHERE user_id = req.user.id
   → Ensures data isolation
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Seeing learner dashboard as teacher | Logout & login again. Check localStorage has roleAlias |
| Getting 403 Forbidden | Backend middleware working. Your role isn't recognized |
| Getting redirected away | ProtectedRoute working. Your role doesn't match allowedRoles |
| API returns 401 | No token. Login first |
| API returns 403 | Token valid but role not authorized |

---

## Middleware Available

```javascript
requireTeacher()    // Check role is 'teacher' or 'tutor'
requireAdmin()      // Check role is 'admin'
requireLearner()    // Check role is 'learner'
requireRole(...roles) // Check role is in list
requireAnyRole([])  // Check role is in array
```

---

## Role Values

```
Database: role = 'teacher', 'learner', 'admin'
Frontend: roleAlias = 'tutor' (for teachers)

Check both:
const userRole = req.user.role_alias || req.user.role;
```

---

## Add Role Check to New Route

```javascript
// 1. Import
const { requireRole } = require('./middleware/rbac');

// 2. Add to route
router.get('/data', 
  requireRole('teacher'),  // ← Add here
  async (req, res) => {
    // Your code
  }
);

// 3. Optional: Filter data
const data = await Model.findAll({
  where: { teacher_id: req.user.id }  // ← Filter by ownership
});
```

---

## Files to Know

| File | Purpose |
|------|---------|
| `middleware/rbac.js` | All role checking functions |
| `src/components/ProtectedRoute.jsx` | Frontend route protection |
| `src/config/navigationByRole.js` | Role-based navigation |
| `middleware/auth.js` | JWT verification |

---

## Test Checklist

- [ ] Login as learner → see learner dashboard
- [ ] Login as teacher → see tutor dashboard
- [ ] Try to access wrong dashboard → get redirected
- [ ] Check Network tab → API calls return 200 OK
- [ ] Check 403 Forbidden → still works (good!)

---

## Remember

✅ Frontend is for UX
✅ Backend is for security
✅ Always filter data by ownership
✅ Always check JWT on backend
✅ Never trust frontend claims

---

**Production Ready: ✅**
