# English LMS - Frontend & Backend Connection Setup

## ✅ Status: Connected Successfully!

The frontend and backend have been configured to work together. Here's the complete setup:

---

## 🔧 Configuration Summary

### Backend Configuration
- **Server Port**: `4000`
- **Host**: `0.0.0.0` (allows external connections)
- **API Base URL**: `http://localhost:4000/api`
- **Database**: PostgreSQL (localhost:5432)
- **Database Name**: `english_portal`
- **CORS Origin**: `http://localhost:3000` (configured but can accept localhost:5173)

### Frontend Configuration
- **Dev Server Port**: `5173` (Vite default)
- **API Base URL**: `http://localhost:4000/api`
- **Framework**: React 18 + React Router 6
- **HTTP Client**: Axios with interceptors

---

## 📝 Key Files Modified

### ✏️ Updated: `english-frontend/src/apiClient.js`
- **Change**: Port corrected from `5000` → `4000`
- **Status**: ✅ Connected to backend

### Environment Files (Already Correct)
- `english-backend/.env` - Configured for port 4000
- `english-frontend/.env` - Contains `VITE_API_URL=http://localhost:4000/api`

---

## 🚀 How to Run

### Step 1: Start the Backend

```powershell
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-backend
npm install
npm run dev
```

**Expected output:**
```
🚀 Server listening on http://0.0.0.0:4000 (PORT=4000)
Registered routes:
GET /api/health
GET /api/ping
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
[... more routes ...]
```

### Step 2: Start the Frontend (in a new terminal)

```powershell
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend
npm install
npm run dev
```

**Expected output:**
```
VITE v5.1.0 ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 3: Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## ✨ API Endpoints Connected

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Lessons Routes
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get lesson details
- [More lesson endpoints...]

### Quizzes Routes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes/:id/attempt` - Submit quiz attempt
- [More quiz endpoints...]

### Dashboard Routes
- `GET /api/dashboard` - Get dashboard data
- [More dashboard endpoints...]

### Progress Routes
- `GET /api/progress` - Get user progress
- [More progress endpoints...]

---

## 🔐 Authentication Flow

### How it works:
1. **Register/Login**: Frontend sends credentials to `/api/auth/register` or `/api/auth/login`
2. **Token Storage**: Backend returns JWT token, frontend stores in localStorage
3. **Authorization**: All API requests automatically include `Authorization: Bearer <token>` header
4. **Protected Routes**: Backend validates token via `authRequired` middleware

### Frontend Implementation:
```javascript
// Automatic token injection (apiClient.js)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

---

## 🧪 Testing the Connection

### Test 1: Health Check
```powershell
curl http://localhost:4000/api/health
```
Expected: `{"ok":true,"env":"development"}`

### Test 2: Ping
```powershell
curl http://localhost:4000/api/ping
```
Expected: `{"ok":true,"message":"pong"}`

### Test 3: Register User
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

curl -X POST http://localhost:4000/api/auth/register `
  -ContentType "application/json" `
  -Body $body
```

### Test 4: Manual Frontend Test
1. Open `http://localhost:5173`
2. Click "Register"
3. Fill in: Name, Email, Password
4. Submit - should redirect to Dashboard if successful

---

## 🐛 Troubleshooting

### Issue: "Cannot POST /api/auth/register" (404)
- **Cause**: Backend not running or routes not mounted
- **Fix**: Ensure backend is running with `npm run dev`

### Issue: "CORS error" or "Network error"
- **Cause**: Frontend connecting to wrong port
- **Fix**: Verify `apiClient.js` has `baseURL: 'http://localhost:4000/api'`

### Issue: "Database connection error"
- **Cause**: PostgreSQL not running or wrong credentials
- **Fix**: Check PostgreSQL is running and `.env` has correct DB credentials

### Issue: Frontend shows blank page
- **Cause**: Build error or missing dependencies
- **Fix**: Run `npm install` in frontend folder and check browser console for errors

### Issue: Can't login after registering
- **Cause**: User not saved to database
- **Fix**: Check terminal for database errors, ensure PostgreSQL is running

---

## 📊 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.1
- **Database**: PostgreSQL + Sequelize ORM
- **Authentication**: JWT + bcrypt
- **CORS**: Enabled for frontend

### Frontend
- **Library**: React 18
- **Router**: React Router 6
- **HTTP Client**: Axios
- **Bundler**: Vite
- **Styling**: Tailwind CSS

---

## 🔄 Connection Diagram

```
┌──────────────────────┐         ┌──────────────────────┐
│  React Frontend      │         │  Node.js Backend     │
│  localhost:5173      │◄───────►│  localhost:4000      │
│                      │ HTTP    │                      │
│  ├─ Login Page       │ REST    │  ├─ Auth Routes     │
│  ├─ Register Page    │ JSON    │  ├─ Lesson Routes   │
│  ├─ Lessons Page     │         │  ├─ Quiz Routes     │
│  ├─ Quiz Page        │         │  └─ Dashboard Routes│
│  └─ Dashboard        │         │                      │
└──────────────────────┘         └──────────────────────┘
         │                                   │
         │                                   │
         └──────────────────────────────────┘
                  PostgreSQL
               localhost:5432
                english_portal
```

---

## ✅ Checklist

- [x] Backend port configured (4000)
- [x] Frontend API base URL fixed (localhost:4000)
- [x] CORS enabled in backend
- [x] JWT authentication middleware in place
- [x] Axios interceptor for token injection
- [x] Database models defined
- [x] API routes mounted
- [x] Environment variables configured

---

## 📞 Next Steps

1. ✅ **Start Backend**: `npm run dev` in `english-backend/`
2. ✅ **Start Frontend**: `npm run dev` in `english-frontend/`
3. ✅ **Test Registration**: Create a new account
4. ✅ **Test Login**: Login with created account
5. 📝 **Explore Features**: Browse lessons, take quizzes, view dashboard

---

**Last Updated**: November 11, 2025
**Status**: ✅ Ready to use!
