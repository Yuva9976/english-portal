# 🧪 Frontend Testing Guide - Live & Ready

## ✅ System Status

### 🟢 Backend Server
- **Status:** Running
- **Port:** 4000
- **URL:** http://localhost:4000
- **API Base:** http://localhost:4000/api
- **Process ID:** Check with `Get-Process node`

### 🟢 Frontend Server  
- **Status:** Running
- **Port:** 5173
- **URL:** http://localhost:5173
- **Dev Server:** npm run dev

### 📊 Database
- **Status:** ✅ All 8 parts seeded
- **Total Questions:** 357
- **Learning Materials:** Complete for all parts

---

## 🎯 Quick Test Steps

### **Step 1: Open Frontend**
```
URL: http://localhost:5173
```

### **Step 2: Navigate to Verbs**
```
Click: Grammar Hub → Verbs
```

### **Step 3: Load Learn More**
```
Click: "Learn More" button
Expected: Page loads with Verbs learning material from API
```

### **Step 4: Start Quiz**
```
Click: "Start Full Quiz (37 questions)"
Expected: Modal opens showing quiz questions from API
```

### **Step 5: Answer Questions**
```
- Answer each question
- Submit answer
- View explanation
- Progress bar updates
```

### **Step 6: Check Score**
```
Expected: Final score out of 370 points (37 questions × 10)
Should match API data, not hardcoded values
```

---

## 🔍 What Should Happen

### ✅ Expected Behaviors

1. **Learning Material Loads**
   - Grammar types display: Action, Linking, Helping, Modal verbs
   - Rules show DO/DON'T examples
   - Examples display real-world usage
   - Resources and videos load

2. **Quiz Loads from API**
   - Quiz title shows: "37 Verbs Quiz Questions"
   - NOT "10 Verbs Quiz Questions"
   - Questions come from database, not hardcoded

3. **Quiz Functionality Works**
   - Questions display with options
   - Progress bar updates: X/37
   - Answer submission works
   - Explanations display
   - Score calculation is accurate

4. **Data is from API**
   - Browser Network tab shows: GET `/api/grammar/11/quiz`
   - Response has 37 question objects
   - Each question has options, correct_answer, explanation

---

## 🧬 Browser Console Testing

### **Check API Calls (F12 Developer Tools)**

1. **Open Developer Tools**
   ```
   Press: F12
   ```

2. **Go to Network Tab**
   ```
   Click: Network tab
   ```

3. **Reload Page**
   ```
   Press: F5 (refresh)
   ```

4. **Look for API Requests**
   ```
   Filter: localhost:4000
   
   Expected requests:
   - GET /api/grammar/11 (learning data)
   - GET /api/grammar/11/quiz (quiz questions)
   ```

5. **Verify Response Status**
   ```
   Should see: 200 OK (not 404 or errors)
   ```

6. **Check Response Data**
   ```
   Click request → Response tab
   Should show quiz questions JSON with 37 items
   ```

### **Check Browser Console**

1. **Open Console Tab**
   ```
   Press: F12 → Console tab
   ```

2. **Look for Errors**
   ```
   Should NOT see:
   - 404 errors
   - CORS errors
   - undefined variables
   - API connection errors
   ```

3. **Verify API Responses**
   ```
   Log in console shows API responses loaded
   ```

---

## 📋 Testing Checklist

### **Learning Material**
- [ ] Page loads without errors
- [ ] Grammar types display correctly
- [ ] Rules show with examples
- [ ] Examples display with usage patterns
- [ ] Exercises display
- [ ] Videos/resources load

### **Quiz Functionality**
- [ ] Quiz modal opens
- [ ] Shows 37 questions (not 10)
- [ ] Questions display correctly
- [ ] Multiple choice options visible
- [ ] Can select answer
- [ ] Submit button works
- [ ] Correct/incorrect feedback shows
- [ ] Explanation displays
- [ ] Progress bar updates

### **API Integration**
- [ ] Network requests successful (200 status)
- [ ] Data from API, not hardcoded
- [ ] Question count is 37 (from API)
- [ ] Score calculates to 370 max
- [ ] All questions have proper format

### **Performance**
- [ ] Page loads in < 2 seconds
- [ ] No console errors
- [ ] Smooth interactions
- [ ] No lag when answering
- [ ] Images/videos load properly

---

## 🔧 Troubleshooting

### **API Connection Issues**

**Problem:** "Failed to load content. Using fallback data"

**Solution:**
1. Check backend is running: `Get-Process node`
2. Verify port 4000: `http://localhost:4000/api/grammar/11`
3. Check CORS settings in backend
4. Restart backend:
   ```
   Ctrl+C to stop
   cd english-backend
   node app.js
   ```

### **No Quiz Questions Showing**

**Problem:** Quiz modal empty or showing hardcoded questions

**Solution:**
1. Check Network tab for `/api/grammar/11/quiz` request
2. If 404: Backend routes not configured
3. If empty response: Check database has data
4. Run verification: `node verify_data.js`

### **Wrong Question Count**

**Problem:** Shows 10 questions instead of 37

**Solution:**
1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+Shift+R
3. Check VerbsDetail.jsx uses API data
4. Verify apiClient.js has correct baseURL

### **CORS Errors**

**Problem:** Request blocked by CORS policy

**Solution:**
1. Check backend app.js has CORS enabled
2. Verify origin is http://localhost:5173
3. Restart backend after CORS changes
4. Clear browser cache

### **Port Already in Use**

**Problem:** Port 4000 or 5173 already taken

**Solution:**
```powershell
# Kill process on port 4000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess -Force

# Kill process on port 5173
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess -Force

# Restart servers
cd english-backend
node app.js

# In another terminal
cd english-frontend
npm run dev
```

---

## 📊 Test Scenarios

### **Scenario 1: Verify API Data Loading**
```
1. Open Verbs page
2. F12 → Network tab
3. Refresh page
4. Look for GET /api/grammar/11
5. Response should have all verb types, rules, examples
✅ PASS: Data displays on page
```

### **Scenario 2: Verify Quiz from API**
```
1. Click "Start Full Quiz"
2. F12 → Network tab
3. Look for GET /api/grammar/11/quiz
4. Response should have 37 questions
✅ PASS: 37 questions display in quiz
```

### **Scenario 3: Verify Quiz Functionality**
```
1. Click answer on question 1
2. Submit answer
3. See explanation
4. Progress shows 1/37
✅ PASS: All quiz features work
```

### **Scenario 4: Verify Final Score**
```
1. Answer all 37 questions
2. View final score
3. Should show X out of 370
✅ PASS: Score calculation correct
```

---

## 🎓 API Endpoints Reference

### **Learning Data**
```
GET /api/grammar/11
Response:
{
  "id": 11,
  "name": "Verb",
  "types": [...],
  "rules": [...],
  "examples": [...],
  "exercises": [...],
  "resources": [...]
}
```

### **Quiz Questions**
```
GET /api/grammar/11/quiz
Response:
{
  "data": [
    {
      "id": 1,
      "question": "Which word is a verb?",
      "question_type": "multiple-choice",
      "options": ["beautiful", "run", "fast", "slow"],
      "correct_answer": "1",
      "explanation": "..."
    },
    // ... 37 total questions
  ],
  "count": 37
}
```

---

## 📈 Performance Metrics

### **Expected Load Times**
- Page load: < 2 seconds
- API responses: < 500ms
- Quiz modal open: < 1 second
- Answer submission: < 1 second

### **Expected Data Sizes**
- Learning data response: ~50KB
- Quiz questions response: ~100KB
- Total time to fully load: < 3 seconds

---

## ✨ Success Criteria

### **✅ Testing Complete When:**
1. ✅ Both servers running (backend + frontend)
2. ✅ Frontend loads without errors
3. ✅ Learning material displays from API
4. ✅ Quiz shows 37 questions (not hardcoded 10)
5. ✅ API requests visible in Network tab (200 status)
6. ✅ Quiz functionality works (answer, submit, score)
7. ✅ Score calculation correct (out of 370)
8. ✅ No console errors
9. ✅ Smooth user experience

### **🚀 Ready for Next Phase When:**
- All above criteria met
- No critical bugs found
- API integration verified
- Database queries working
- Frontend rendering correctly

---

## 📝 Notes

- **VerbsDetail.jsx** already updated with API integration
- **Other components** still use hardcoded data (need update)
- **API client** configured to http://localhost:4000
- **Database** has all 8 parts with full learning materials
- **357 total questions** ready for use

---

## 🔗 Quick Links

### **Local URLs**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- API: http://localhost:4000/api
- Verbs endpoint: http://localhost:4000/api/grammar/11

### **File Locations**
- Frontend component: `english-frontend/src/pages/Modules/VerbsDetail.jsx`
- API client: `english-frontend/src/apiClient.js`
- Backend server: `english-backend/app.js`
- Database models: `english-backend/models/grammar.js`

---

## 📞 Support

**If something breaks:**
1. Check browser console (F12)
2. Check Network tab for API status
3. Check backend terminal for errors
4. Verify both servers are running
5. Check database connection
6. Review error messages for hints

**For more help:**
- See FRONTEND_BACKEND_INTEGRATION.md
- See DATA_PREPARATION_COMPLETE.md
- See backend error logs in terminal

---

**Status: 🟢 READY FOR TESTING**

Start by opening http://localhost:5173 in your browser! 🚀
