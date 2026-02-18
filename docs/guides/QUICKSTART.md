# 🚀 EnglishClub LMS - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start Backend
```bash
cd english-backend
node app.js
```
✅ Should see: `Server running on port 4000`

### 2. Start Frontend
```bash
cd english-frontend
npm run dev
```
✅ Should see: `Local: http://localhost:3000`

### 3. Open Browser
Go to: **http://localhost:3000**

---

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| 🎓 Student | `learner@example.com` | `learn123` |
| 👨‍🏫 Tutor | `teacher@example.com` | `teach123` |
| 🔐 Admin | `admin@example.com` | `admin123` |

---

## 📱 Quick Navigation

### As Student (Learner)
1. Login → Go to `/learner`
2. **Dashboard** - See your stats, courses, progress
3. **My Classes** - View enrolled classes
4. **Browse Classes** - Find new classes to join
5. **My Tasks** - View and submit assignments

### As Tutor (Teacher)
1. Login → Go to `/tutor/dashboard`
2. **Dashboard** - Teaching overview
3. **My Classes** - Manage your classes
4. **Create Task** - Assign homework
5. **Students** - View student progress

### As Admin
1. Login → Go to `/admin-dashboard`
2. Manage users, content, and system settings

---

## 🎨 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User login |
| Register | `/register` | New account |
| Learner Dashboard | `/learner` | Student home |
| Tutor Dashboard | `/tutor/dashboard` | Teacher home |
| Grammar Hub | `/grammar-hub` | Learning content |
| Learn English | `/modules/learn-english` | Courses |

---

## 🆘 Common Issues

### Backend won't start?
```bash
# Check if MySQL is running
# Check .env file has correct DB credentials
```

### Frontend shows blank?
```bash
# Clear cache and restart
npm run dev -- --force
```

### Can't login?
```bash
# Make sure backend is running on port 4000
# Check browser console for errors
```

---

## 📞 Need Help?

See full documentation in `DOCUMENTATION.md`
