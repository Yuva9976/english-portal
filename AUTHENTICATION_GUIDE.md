# Authentication & Password Management Guide

## Overview
This guide explains the authentication system with admin login, and password reset features.

---

## 1. User Types

### Learner (Student)
- Can access learning materials
- Can take quizzes
- Can track progress
- **Cannot** access admin features

### Teacher (Instructor)
- Can access learning materials
- Can manage student progress
- Can use teacher tools
- Can access admin features (if checked "Admin Login")

### Admin
- Master account created by system administrator only
- Can manage all users
- Can manage content
- Can access admin dashboard
- **Cannot** be created through registration page (security)

---

## 2. Login

### Regular User Login
**URL:** `http://localhost:3000/login`

1. Enter email and password
2. Leave "Admin Login" checkbox **unchecked**
3. Click "Login"
4. Redirected to `/dashboard`

### Admin/Teacher Login
**URL:** `http://localhost:3000/login`

1. Enter email and password
2. **Check** "Admin Login" checkbox
3. Click "Admin Login"
4. Redirected to `/admin-dashboard`
5. **Only works if user role is "admin" or "teacher"**

---

## 3. Registration

### Register as Learner or Teacher
**URL:** `http://localhost:3000/register`

**Available Roles:**
- Learner (student) - Default
- Teacher (instructor) - Requires approval

**Note:** Admin accounts cannot be created through registration page (security reasons)

---

## 4. Password Management

### Forgot Password
**URL:** `http://localhost:3000/forgot-password`

**Steps:**
1. Click "Forgot Password?" on login page
2. Enter your registered email
3. Click "Send Reset Link"
4. Check your email for reset link (development: see terminal logs)
5. Click link in email
6. You'll be redirected to password reset page

### Reset Password
**URL:** `http://localhost:3000/reset-password?token=YOUR_TOKEN`

**Steps:**
1. Follow link from email
2. Enter new password (minimum 6 characters)
3. Confirm password (must match)
4. Click "Reset Password"
5. Redirected to login page
6. Login with new password

**Token Expiry:** 1 hour from when reset link is sent

---

## 5. Test Credentials

### Admin Account
```
Email: admin@example.com
Password: password123
Role: admin
```

### Teacher Account
```
Email: teacher@example.com
Password: password123
Role: teacher
```

### Learner Account
```
Email: learner@example.com
Password: password123
Role: learner
```

---

## 6. Backend Endpoints

### Authentication
- `POST /auth/register` - Create new account
- `POST /auth/login` - Regular user login
- `POST /auth/admin-login` - Admin/teacher login (checks role)
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user (requires token)

### Password Management
- `POST /auth/forgot-password` - Send password reset link
- `POST /auth/reset-password` - Reset password with token

---

## 7. Security Features

✅ **Password Hashing**
- Bcrypt with salt (10 rounds)
- Passwords never stored in plaintext

✅ **JWT Tokens**
- Secure token-based authentication
- 7-day expiration
- httpOnly cookies for XSS protection

✅ **Role-Based Access**
- `/admin-login` endpoint checks user role
- Returns 403 (Forbidden) if not admin/teacher
- `/admin-dashboard` requires admin/teacher role

✅ **Reset Token Security**
- JWT-based reset tokens
- 1-hour expiration
- Token includes user ID for verification

✅ **Password Requirements**
- Minimum 6 characters
- Hashed with bcrypt before storage

---

## 8. Email Integration (Development)

### Current Setup (Development)
- Password reset links are logged to backend console
- You can see the link in terminal output
- No actual email is sent

### Production Setup
To enable email sending:

1. Install email library (Nodemailer):
```bash
npm install nodemailer
```

2. Configure in `auth.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email in forgot-password endpoint
```

3. Set environment variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## 9. Frontend Pages

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/login` | Regular login |
| Register | `/register` | Create new account |
| Forgot Password | `/forgot-password` | Request password reset |
| Reset Password | `/reset-password?token=` | Reset password with token |
| Dashboard | `/dashboard` | User dashboard (learner) |
| Admin Dashboard | `/admin-dashboard` | Admin dashboard (admin/teacher) |

---

## 10. User Flow Diagram

```
User Visit /login
    ↓
[Unchecked: Admin Login] → POST /auth/login → /dashboard
    ↓
[Checked: Admin Login] → POST /auth/admin-login → /admin-dashboard (if admin/teacher)
    ↓
                         → Error if not admin/teacher
```

```
Forgot Password Flow
/forgot-password
    ↓
Enter email
    ↓
POST /auth/forgot-password
    ↓
Email sent with reset link (dev: see terminal)
    ↓
Click link → /reset-password?token=...
    ↓
Enter new password
    ↓
POST /auth/reset-password
    ↓
Success → /login
```

---

## 11. Key Implementation Details

### Login.jsx
- State: `isAdmin` boolean
- Dynamic URL: `isAdmin ? '/auth/admin-login' : '/auth/login'`
- Dynamic navigation: `isAdmin ? '/admin-dashboard' : '/dashboard'`
- Admin checkbox visible and functional

### Register.jsx
- Role dropdown: Learner or Teacher only
- Admin option removed (security)
- Note: "Admin accounts are created by the system administrator only"

### ForgotPassword.jsx
- Simple email input
- Sends reset link request
- Shows success/error messages
- Auto-redirects to login after success

### ResetPassword.jsx
- Token extracted from URL query parameter
- Password and confirm password validation
- Minimum 6 character requirement
- Shows invalid link error if token missing/expired

---

## 12. Database Schema

### Users Table
```
id (Primary Key)
name
email (Unique)
password_hash
role (enum: 'learner', 'teacher', 'admin')
createdAt
updatedAt
```

---

## 13. Troubleshooting

### "Login failed" error
1. Check credentials are correct
2. Verify user exists: `admin@example.com`
3. Ensure password is `password123`
4. Check backend server is running (port 4000)

### "Admin access required" error
1. The email exists but user is not admin/teacher
2. Only admin/teacher roles can use admin login
3. Register as teacher or login with admin account

### "Invalid or expired reset link"
1. Token has expired (1 hour limit)
2. Request new reset link from forgot password page
3. Check URL has correct token parameter

### Password reset link not working
1. **Development:** Check backend terminal for reset link
2. Copy full link from terminal logs
3. Open link in browser directly

---

## 14. Color Scheme Applied
- Primary color: Teal (#16b5a8 / teal-600)
- All authentication pages use teal-700 for headings
- Buttons use teal-600 with teal-700 hover
- Links use teal-600 color
- Consistent with home page design

---

## 15. Next Steps

- [ ] Implement email sending for password reset (Nodemailer)
- [ ] Add admin dashboard page
- [ ] Add user management features
- [ ] Add email verification for registration
- [ ] Add two-factor authentication (optional)
- [ ] Add password strength indicator
- [ ] Add rate limiting for login attempts

---

**Last Updated:** November 19, 2025
**Version:** 1.0 - Complete Authentication System
