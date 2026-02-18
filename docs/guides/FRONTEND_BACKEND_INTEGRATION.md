# 🎓 Frontend-Backend Integration Guide

## ✅ What's Been Done

### 1. **Updated API Client** (`src/apiClient.js`)
- ✅ Changed base URL from `http://localhost:4000/api` (existing)
- ✅ Updated grammar API endpoints to match backend routes:
  - `getAllParts()` → `GET /api/grammar`
  - `getPartDetails(id)` → `GET /api/grammar/:id`
  - `getQuiz(id)` → `GET /api/grammar/:id/quiz`
  - etc.

### 2. **Enhanced VerbsDetail Component** (`src/pages/Modules/VerbsDetail.jsx`)
- ✅ Added API data fetching with `useEffect`
- ✅ Integrated `grammarAPI` from apiClient
- ✅ Supports fallback to hardcoded data if API fails
- ✅ Dynamically loads quiz questions from API
- ✅ Shows question count in "Start Full Quiz" button
- ✅ Handles both multiple-choice and fill-in-the-blank questions

### 3. **Updated Backend Routes** (`app.js`)
- ✅ Changed grammar routes mount point from `/api/grammar/parts-of-speech` to `/api/grammar`
- ✅ Simpler, cleaner API structure

---

## 🚀 How to Run

### Terminal 1: Start Backend Server
```bash
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-backend
node app.js
```

Expected output:
```
✅ Sequelize: Connection has been established successfully.
🚀 Server listening on http://0.0.0.0:4000 (PORT=4000)
Registered routes:
...
```

### Terminal 2: Start Frontend Dev Server
```bash
cd c:\Users\indhu\OneDrive\Desktop\vishnu\english-frontend
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Terminal 3 (Optional): Test API
```bash
# Test if backend is running
curl http://localhost:4000/api/ping

# Get all parts of speech
curl http://localhost:4000/api/grammar

# Get Verbs (ID 11) with quiz
curl http://localhost:4000/api/grammar/11
curl http://localhost:4000/api/grammar/11/quiz
```

---

## 📱 Access the Application

1. **Frontend**: http://localhost:5173/
2. **Backend API**: http://localhost:4000/api
3. **Verbs Module**: http://localhost:5173/modules/grammar-hub/verbs

---

## 🔌 API Endpoints (Backend on Port 4000)

### Grammar API (`/api/grammar`)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/grammar` | GET | List all parts of speech |
| `/api/grammar/:id` | GET | Get part with all learning materials |
| `/api/grammar/:id/types` | GET | Get grammar types for a part |
| `/api/grammar/:id/rules` | GET | Get grammar rules for a part |
| `/api/grammar/:id/examples` | GET | Get usage examples for a part |
| `/api/grammar/:id/exercises` | GET | Get exercises for a part |
| `/api/grammar/:id/quiz` | GET | Get quiz questions for a part |
| `/api/grammar/:id/resources` | GET | Get resources for a part |

**Part IDs:**
- 10 = Pronoun
- 11 = Verb
- 12 = Adjective
- 13 = Adverb
- 14 = Preposition
- 15 = Conjunction
- 16 = Interjection

---

## 🎯 Component Integration

### VerbsDetail Component (`VerbsDetail.jsx`)

The component now:

1. **Fetches data on mount** using `useEffect`
```javascript
useEffect(() => {
  const fetchVerbData = async () => {
    try {
      const partResponse = await grammarAPI.getPartDetails(11);
      setApiData(partResponse.data);
      const quizResponse = await grammarAPI.getQuiz(11);
      setQuizQuestions(quizResponse.data || []);
    } catch (err) {
      // Falls back to hardcoded data
    }
  };
  fetchVerbData();
}, []);
```

2. **Uses API data when available**
- Displays quiz questions from API instead of hardcoded ones
- Shows question count in button text
- Handles both MCQ and fill-in-blank formats

3. **Has graceful fallback**
- If API fails, component still works with hardcoded data
- Shows error message but doesn't crash

### Quiz Question Handling

The component supports both question types:

**Multiple Choice (from Pronouns & Verbs data):**
```javascript
{
  "id": 1,
  "question": "Which pronoun can replace 'Maria'?",
  "question_type": "multiple-choice",
  "options": ["him", "she", "their", "them"],
  "correct_answer": 1,  // Index of correct option
  "explanation": "..."
}
```

**Fill-in-the-Blank (from Adjectives, Adverbs, etc.):**
```javascript
{
  "id": 51,
  "question": "The _____ house is on the corner.",
  "question_type": "fill-blank",
  "options": ["red"],
  "correct_answer": "red",  // Actual answer
  "explanation": "..."
}
```

---

## 📝 Step-by-Step Testing

### 1. Verify Backend API
```bash
# Terminal with backend running
curl http://localhost:4000/api/grammar | jq '.[0]'
```

Should return:
```json
{
  "id": 9,
  "name": "Noun",
  "icon": "📚",
  "definition": "...",
  "importance": "..."
}
```

### 2. Verify Verbs Data
```bash
curl http://localhost:4000/api/grammar/11 | jq '.types[0]'
```

Should return grammar types for Verbs.

### 3. Test Frontend
1. Open http://localhost:5173
2. Navigate to: Modules → Grammar Hub → Verbs
3. You should see:
   - Learning material loaded
   - Quiz questions from API (if available)
   - Full quiz functionality

### 4. Check Quiz Questions
```bash
curl http://localhost:4000/api/grammar/11/quiz | jq '.[0]'
```

Should return actual quiz questions from database.

---

## ✨ Features Now Available

### Backend
- ✅ 320+ quiz questions in database
- ✅ Serves learning materials via API
- ✅ Supports multiple parts of speech
- ✅ Flexible question types (MCQ, fill-blank)

### Frontend
- ✅ Fetches data from live API
- ✅ Dynamic quiz from backend data
- ✅ Shows question count
- ✅ Handles different question types
- ✅ Beautiful UI with explanations
- ✅ Score tracking

---

##  Troubleshooting

### Backend won't start
```bash
# Check if port 4000 is in use
netstat -ano | findstr :4000

# Kill process on that port
taskkill /PID <PID> /F

# Try again
node app.js
```

### API returns 404 error
- Check backend is running on port 4000
- Verify correct endpoint path
- Check API client baseURL is correct

### Frontend can't reach API
- Make sure backend is running
- Check CORS is enabled (it is in app.js)
- Open browser console (F12) to see error

### Quiz questions not loading
- Check API endpoint: `http://localhost:4000/api/grammar/11/quiz`
- Make sure data was seeded: `node seed_parts_of_speech.js`
- Check browser console for API errors

---

## 🔄 Data Flow

```
User visits Verbs page
        ↓
Component mounts (useEffect)
        ↓
Fetches: GET /api/grammar/11
         GET /api/grammar/11/quiz
        ↓
Updates state with API data
        ↓
Renders learning materials and quiz
        ↓
User takes quiz
        ↓
Questions answered from API data
        ↓
Score calculated and shown
```

---

## 📂 File Structure

```
english-frontend/
├── src/
│   ├── apiClient.js                    ← Updated API client
│   └── pages/Modules/
│       └── VerbsDetail.jsx             ← Updated with API integration
│
english-backend/
├── app.js                              ← Updated route mounting
├── routes/grammar.js                   ← Grammar API endpoints
├── models/grammar.js                   ← Database models
├── data/                               ← 14 JSON learning files
├── seed_parts_of_speech.js             ← Loads data into DB
└── verify_data.js                      ← Verifies data integrity
```

---

## 🎯 Next Steps

### Immediate
1. ✅ Start both backend and frontend
2. ✅ Test Verbs page loads quiz from API
3. ✅ Try other parts (they'll use hardcoded data initially)

### Short Term
1. Update other detail components to fetch from API:
   - `PronounDetail.jsx` (ID 10)
   - `AdjectiveDetail.jsx` (ID 12)
   - etc.

2. Create reusable hook for API fetching:
```javascript
// useGrammarPart.js
export function useGrammarPart(partId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    grammarAPI.getPartDetails(partId)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [partId]);
  
  return { data, loading };
}
```

3. Use in any component:
```javascript
const { data, loading } = useGrammarPart(11); // For Verbs
```

---

## 💡 Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check console** - Browser console (F12) shows API errors
3. **Test endpoints first** - Use curl/Postman before testing in UI
4. **Reload page** - If changes don't show, hard refresh (Ctrl+Shift+R)
5. **Check network tab** - See actual API requests and responses

---

## ✅ Success Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] API ping works: `curl http://localhost:4000/api/ping`
- [ ] Parts endpoint works: `curl http://localhost:4000/api/grammar`
- [ ] Verbs page loads: http://localhost:5173/modules/grammar-hub/verbs
- [ ] Quiz questions appear on page
- [ ] Can click and answer quiz questions
- [ ] Score displays after quiz

---

**Backend & Frontend are now integrated! 🎉**

The VerbsDetail component now dynamically loads quiz questions from your backend API. As you add the same integration to other components, your entire app will be powered by real data from the database.
