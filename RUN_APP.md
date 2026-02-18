# 🚀 Quick Start - Frontend & Backend

## The Fastest Way to Get Everything Running

### Open 2 Terminals

**Terminal 1 - Backend:**
```bash
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-backend
node app.js
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend
npm run dev
```

That's it! 

---

## Access Your App

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Verbs Module | http://localhost:5173/modules/grammar-hub/verbs |
| Backend API | http://localhost:4000/api/grammar |

---

## What You'll See

When you visit the Verbs page:
- ✅ Learning materials (from backend)
- ✅ Quiz questions (from database - 37 questions!)
- ✅ Full quiz interface
- ✅ Score tracking
- ✅ Beautiful animations

---

## Available Parts

| ID | Part | Questions |
|----|------|-----------|
| 10 | Pronoun | 60 |
| 11 | Verb | 37 |
| 12 | Adjective | 60 |
| 13 | Adverb | 40 |
| 14 | Preposition | 40 |
| 15 | Conjunction | 40 |
| 16 | Interjection | 40 |

Access any part by changing the path:
- http://localhost:5173/modules/grammar-hub/pronouns (uses ID 10)
- http://localhost:5173/modules/grammar-hub/adjectives (uses ID 12)
- etc.

---

## Test the API

```bash
# Get all parts
curl http://localhost:4000/api/grammar

# Get Verbs (ID 11)
curl http://localhost:4000/api/grammar/11

# Get Verbs quiz questions
curl http://localhost:4000/api/grammar/11/quiz

# Test if backend is running
curl http://localhost:4000/api/ping
```

---

## If Something Breaks

### Backend won't start
```bash
# Check what's using port 4000
netstat -ano | findstr :4000

# Kill it (replace PID with number from above)
taskkill /PID 12345 /F

# Try again
node app.js
```

### Frontend won't start
```bash
# Make sure dependencies are installed
npm install

# Try again
npm run dev
```

### API returns errors
1. Check backend is running
2. Check terminal output for errors
3. See **[docs/guides/FRONTEND_BACKEND_INTEGRATION.md](docs/guides/FRONTEND_BACKEND_INTEGRATION.md)** for troubleshooting

---

## File Locations

**Backend**: `c:\Users\indhu\OneDrive\Desktop\vishnu\english-backend\`
**Frontend**: `c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend\`
**Documentation**: `c:\Users\indhu\OneDrive\Desktop\vishnu\docs\`

---

## Documentation Files

| File | Purpose |
|------|---------|
| **[docs/guides/FRONTEND_BACKEND_INTEGRATION.md](docs/guides/FRONTEND_BACKEND_INTEGRATION.md)** | Complete integration guide |
| **[docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)** | System design & architecture |
| **[docs/guides/SETUP_GUIDE.md](docs/guides/SETUP_GUIDE.md)** | Detailed setup instructions |

---

## Everything is Ready! 🎉

Your app has:
- ✅ 320+ Quiz Questions
- ✅ Complete Learning Materials
- ✅ Beautiful UI
- ✅ Working API
- ✅ Database with all content

**Just run the 2 commands above and you're ready to go!**
