# 🧪 Testing Guide - Grammar Parts of Speech System

## Quick Start Testing

### 1. Start the Backend Server
```bash
cd english-backend
npm start
```

Expected output:
```
✅ Sequelize: Connection has been established successfully.
🚀 Server is running on port 5000
📍 API: http://localhost:5000
```

### 2. Start the Frontend Development Server
```bash
cd english-frontend
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
```

### 3. Test the API Endpoints

#### Test 3.1: Get All Parts of Speech
```bash
curl http://localhost:5000/api/grammar/parts-of-speech
```

Expected response:
```json
[
  {
    "id": 1,
    "name": "Noun",
    "definition": "Words that name people, places, things, or ideas.",
    "importance": "Nouns form the foundation of sentences...",
    "icon": "📦"
  },
  ... (7 more parts)
]
```

#### Test 3.2: Get Noun Details (with all relationships)
```bash
curl http://localhost:5000/api/grammar/parts-of-speech/1
```

Expected response structure:
```json
{
  "id": 1,
  "name": "Noun",
  "definition": "...",
  "importance": "...",
  "icon": "📦",
  "types": [
    {
      "id": 1,
      "name": "Common Noun",
      "description": "...",
      "icon": "📝",
      "examples": ["..."],
      "sample_words": ["..."],
      "color": "blue"
    },
    ... (3 more types)
  ],
  "rules": [
    {
      "id": 1,
      "rule_type": "do",
      "title": "...",
      "points": ["..."],
      "color": "green",
      "icon": "✅"
    },
    ... (1 DON'T rule)
  ],
  "examples": [
    {
      "id": 1,
      "sentence": "The cat sat on the mat.",
      "usage_pattern": "Subject",
      "category": "Simple"
    },
    ... (3 more)
  ],
  "exercises": [
    {
      "id": 1,
      "exercise_type": "writing",
      "title": "...",
      "prompt": "...",
      "passage": "...",
      "sample_answer": "..."
    },
    ... (1 reading exercise)
  ],
  "quiz": [
    {
      "id": 1,
      "emoji": "❓",
      "question": "...",
      "question_type": "multiple-choice",
      "hint": "...",
      "options": ["Option A", "Option B", "Option C"],
      "correct_answer": 0,
      "explanation": "..."
    },
    ... (2-3 more questions)
  ],
  "resources": [
    {
      "id": 1,
      "title": "...",
      "url": "...",
      "description": "...",
      "resource_type": "video",
      "video_embed_id": "..."
    },
    ... (1 more resource)
  ]
}
```

---

## Frontend Testing Steps

### Step 1: Navigate to Parts of Speech Index
1. Open browser: http://localhost:5173/
2. Click on "Learn Grammar" or navigate to `/modules/parts-of-speech`
3. Should see:
   - ✅ Grid of 8 colored cards
   - ✅ Each card shows: Icon, Name, Definition
   - ✅ "Recommended Learning Path" section
   - ✅ Introduction text

### Step 2: Click on a Part (e.g., Noun)
1. Click the Noun card
2. Should navigate to `/modules/noun`
3. Page should load with:
   - ✅ Part title (Noun)
   - ✅ Definition section
   - ✅ Loading indicator (briefly visible)
   - ✅ All data sections loading

### Step 3: Verify Data Sections Load

#### Overview Section
- ✅ Definition visible
- ✅ Icon displayed
- ✅ Importance statement visible

#### Types Section
- ✅ Grid showing 4 types (Common, Proper, Abstract, Collective)
- ✅ Each type has: Name, Description, Icon, Sample Words
- ✅ Color-coded backgrounds

#### Rules Section
- ✅ Two subsections: "DO's" and "DON'Ts"
- ✅ Each rule group has: Title, Points list, Icon, Color
- ✅ Visual distinction between DO and DON'T

#### Examples Section
- ✅ 4 example sentences displayed
- ✅ Each example shows: Sentence, Usage Pattern, Category
- ✅ Real-world examples are meaningful

#### Writing Exercise Section
- ✅ Exercise title and prompt visible
- ✅ "Show Answer" button present
- ✅ Click button reveals sample answer
- ✅ Can toggle answer visibility

#### Reading Exercise Section
- ✅ Passage text visible
- ✅ "Show Answer" button
- ✅ Sample answers reveal when clicked

#### Quiz Section
- ✅ Quiz modal appears when quiz button clicked
- ✅ Shows questions one at a time
- ✅ Multiple choice options visible
- ✅ Submit button works
- ✅ Correct/incorrect feedback shown
- ✅ Explanation displayed
- ✅ Score calculated and shown
- ✅ Can restart quiz

#### Resources Section
- ✅ 2 resources displayed
- ✅ Video embed visible (YouTube)
- ✅ Article links clickable
- ✅ Descriptions show

### Step 4: Test Interactive Features

#### Test 4.1: Quiz Modal
1. Scroll to Quiz section
2. Click "Take Quiz" button
3. Verify:
   - ✅ Modal appears with first question
   - ✅ 2-3 options displayed
   - ✅ "Submit" button works
   - ✅ After submit: Shows if correct/incorrect
   - ✅ Displays explanation
   - ✅ Next button to continue
   - ✅ Score updates (e.g., "1/3 correct")
   - ✅ On last question: "Complete Quiz" instead of "Next"
   - ✅ Final screen shows total score

#### Test 4.2: Exercise Reveal
1. Scroll to Writing Exercise
2. Click "Show Answer" button
3. Verify:
   - ✅ Sample answer appears below
   - ✅ Button text changes to "Hide Answer"
   - ✅ Click again to hide answer

#### Test 4.3: Navigation
1. Go back to Parts of Speech Index (`/modules/parts-of-speech`)
2. Click a different part (e.g., Pronoun at `/modules/pronoun`)
3. Verify:
   - ✅ New content loads
   - ✅ Color scheme changes (purple-pink)
   - ✅ Different data displayed
   - ✅ Quiz questions are different

### Step 5: Test Responsive Design

#### Mobile View (320px - 640px)
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone SE or similar
4. Navigate to `/modules/noun`
5. Verify:
   - ✅ Layout is single column
   - ✅ Text is readable
   - ✅ Buttons are tappable
   - ✅ Images scale appropriately
   - ✅ No horizontal scrolling needed

#### Tablet View (768px - 1024px)
1. Select iPad in device toolbar
2. Verify:
   - ✅ Grid shows 2-3 columns on index
   - ✅ Content sections are properly sized
   - ✅ Modal fits on screen

#### Desktop View (1920px+)
1. Full screen desktop
2. Verify:
   - ✅ Grid shows 4 columns on index
   - ✅ Optimal spacing
   - ✅ Hover effects work
   - ✅ All content visible without scrolling

---

## Error Handling Tests

### Test 1: Network Error
1. Stop backend server
2. Navigate to `/modules/noun`
3. Wait for API call to fail
4. Verify:
   - ✅ Error message displays
   - ✅ Page doesn't crash
   - ✅ User sees helpful message

### Test 2: Invalid Part ID
1. Navigate to `/modules/noun/999` (non-existent)
2. Verify:
   - ✅ 404 error or "not found" message
   - ✅ Can navigate back

### Test 3: Slow Network
1. Open DevTools → Network tab
2. Throttle to "Slow 3G"
3. Navigate to `/modules/noun`
4. Verify:
   - ✅ Loading spinner visible
   - ✅ Can see progress
   - ✅ Content loads eventually

---

## Database Verification

### Check Seeded Data
```bash
# Connect to PostgreSQL
psql -U postgres -d english_portal

# Check parts of speech
SELECT COUNT(*) FROM parts_of_speech;
# Expected: 8

# Check grammar types
SELECT COUNT(*) FROM grammar_types;
# Expected: ~32

# Check all quiz questions
SELECT COUNT(*) FROM grammar_quiz_questions;
# Expected: 16-24

# Verify specific part
SELECT id, name, icon FROM parts_of_speech WHERE id = 1;
# Expected: 1 | Noun | 📦
```

---

## Performance Testing

### Metrics to Monitor
1. **API Response Time**
   - `/api/grammar/parts-of-speech` should be < 100ms
   - `/api/grammar/parts-of-speech/1` should be < 200ms

2. **Page Load Time**
   - Index page: < 1s
   - Detail page: < 1.5s

3. **Component Render Time**
   - Quiz modal opens: < 200ms
   - Data updates: < 100ms

---

## Browser Compatibility

Test on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Checklist for Production Readiness

- [ ] All 8 parts load correctly
- [ ] Quiz modal works with proper scoring
- [ ] Exercises reveal/hide properly
- [ ] Resources load with embeds
- [ ] Responsive design verified
- [ ] No console errors
- [ ] API endpoints respond correctly
- [ ] Database seeded successfully
- [ ] Navigation works between all pages
- [ ] Error handling in place
- [ ] Loading states display
- [ ] Colors match brand guidelines
- [ ] All text is readable
- [ ] Images load properly
- [ ] Performance acceptable

---

## Common Issues & Solutions

### Issue: "Cannot GET /api/grammar/parts-of-speech"
**Solution:** Backend grammar routes not mounted. Check `app.js` has:
```javascript
if (grammarRoutes) app.use('/api/grammar/parts-of-speech', grammarRoutes);
```

### Issue: Components not found (404)
**Solution:** Check all files exist in `src/pages/Modules/`:
- PartsOfSpeechIndex.jsx
- NounDetail.jsx
- PronounDetail.jsx
- AdjectiveDetail.jsx
- AdverbDetail.jsx
- PrepositionDetail.jsx
- ConjunctionDetail.jsx
- InterjectionDetail.jsx

### Issue: Quiz modal doesn't show
**Solution:** Check browser console for errors. Verify quiz data includes options array.

### Issue: Responsive design broken on mobile
**Solution:** Check Tailwind classes are correct. Verify breakpoint prefixes (sm:, md:, lg:, xl:).

---

## Quick Debug Commands

### Check Database Connection
```bash
node -e "require('dotenv').config(); const {sequelize} = require('./models/grammar'); sequelize.authenticate().then(() => console.log('✅ DB Connected')).catch(e => console.log('❌', e.message))"
```

### Check API Routes
```bash
curl http://localhost:5000/api/grammar/parts-of-speech | jq '.[0]'
```

### Check Component Renders
```javascript
// In browser console
document.querySelector('[data-testid="noun-overview"]')
```

---

## Success Criteria

✅ **Complete when:**
- All 8 parts of speech load from API
- Quiz modal works with correct scoring
- All exercises can reveal/hide answers
- Resources load with proper embeds
- Responsive design works on all screen sizes
- No errors in browser console
- Navigation between all pages works smoothly
- API responds in < 200ms
- Database has all seeded data

---

**Testing completed by:** [Your Name]  
**Date:** [Date]  
**Status:** READY FOR PRODUCTION ✅

