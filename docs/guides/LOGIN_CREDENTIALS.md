# ✅ Login Credentials - Correct Credentials

## Valid Test Accounts

### 👨‍🏫 Teacher/Tutor Account
```
Email:    teacher@example.com
Password: teach123
Role:     teacher
Admin:    ❌ DO NOT CHECK "Admin Login" checkbox
```

### 👨‍🎓 Learner Account
```
Email:    learner@example.com
Password: learn123
Role:     learner
Admin:    ❌ DO NOT CHECK "Admin Login" checkbox
```

### 👨‍💼 Admin Account
```
Email:    admin@example.com
Password: password123
Role:     admin
Admin:    ✅ CHECK "Admin Login" checkbox
```

---

## What Was Wrong

You were getting **"Invalid credentials"** error because:
- ✅ Email was correct: `teacher@example.com`
- ❌ Password was incorrect: You entered a different password
- ✅ The correct password is: `teach123`

---

## How to Fix

### Step 1: Clear the Login Form
Go to: `http://localhost:3000/login`

### Step 2: Enter Correct Credentials
- **Email:** `teacher@example.com`
- **Password:** `teach123`
- **Admin checkbox:** Leave unchecked (important!)

### Step 3: Click Login
You should now:
1. ✅ See redirect to `/tutor/dashboard` (your fix!)
2. ✅ See teacher dashboard with lesson data
3. ✅ No error message

---

## If Still Getting Error

### Option 1: Re-seed the Database
If the user doesn't exist, run this command:

```bash
cd english-backend
node seed.js
```

You should see output like:
```
Teacher: teacher@example.com (created=true)
Learner: learner@example.com (created=true)
✅ Seeding complete! You can now log in with:
   Teacher → teacher@example.com / teach123
   Learner → learner@example.com / learn123
```

### Option 2: Check Backend is Running
Make sure your backend server is running:
```bash
cd english-backend
npm start
# Should say: "Server running on port 4000"
```

### Option 3: Check Console Error
Press `F12` in browser and check Console tab:
- Should say "Login successful" (not 401 error)
- Should see navigation to `/tutor/dashboard`

---

## Test Now!

1. Go to: `http://localhost:3000/login`
2. Use: `teacher@example.com` / `teach123`
3. Leave Admin checkbox **unchecked**
4. Click **Login**
5. Should see: `/tutor/dashboard` ✅

---

## Quick Password Reference

| Email | Password | What To Do |
|-------|----------|-----------|
| `teacher@example.com` | `teach123` | Regular login (no checkbox) |
| `learner@example.com` | `learn123` | Regular login (no checkbox) |
| `admin@example.com` | `password123` | Check "Admin Login" checkbox |

---

**The issue is just using wrong password. Try `teach123` instead!** 🚀
