# Skill-Specific Quiz System

## Overview
Following EnglishClub's best practices, each LSRW skill now has a specialized quiz component that matches the learning activity type.

## Quiz Types by Skill

### 🎧 Listening Quiz (AudioQuiz.jsx)
**Purpose:** Test audio comprehension and listening skills

**Features:**
- Audio playback buttons for each question
- Transcript display (simulated audio in development)
- Multiple questions per audio clip
- Focus on understanding spoken English

**Quiz Structure:**
- Conversations (shopping, daily interactions)
- Weather reports and announcements
- Train/travel information
- Phone conversations

**Example Questions:**
- "Where are the speakers?" (context identification)
- "What does the customer want?" (detail comprehension)
- "What time does the train depart?" (specific information)

---

### 💬 Speaking Quiz (SpeakingQuiz.jsx)
**Purpose:** Practice pronunciation, intonation, and dialogue skills

**Features:**
- Pronunciation guides (IPA notation)
- Recording simulation (record button with 3s countdown)
- Speaking tips for each question
- Stress and intonation patterns
- Word linking practice

**Quiz Structure:**
- Greeting and responses
- Pronunciation stress patterns
- Polite declining/accepting
- Intonation for questions
- Word linking exercises

**Example Questions:**
- "Practice this greeting..." (dialogue response)
- "Choose the correct pronunciation stress" (PHO-to-graph)
- "Which response is most polite?" (social skills)
- "Practice word linking" (fluency)

---

### 📖 Reading Quiz (ReadingQuiz.jsx)
**Purpose:** Test reading comprehension and passage understanding

**Features:**
- Full passage display (collapsible)
- Comprehension questions
- Reference back to passage while answering
- Toggle passage visibility

**Quiz Structure:**
- Full reading passage (Amazon Rainforest example)
- Fact-finding questions
- Main idea questions
- Inference questions
- Detail questions

**Example Questions:**
- "How large is the Amazon Rainforest?" (specific facts)
- "Why is it called 'lungs of the Earth'?" (concept understanding)
- "What is the main cause of deforestation?" (cause-effect)

---

### ✍️ Writing Quiz (WritingQuiz.jsx)
**Purpose:** Test grammar, sentence construction, and error correction

**Features:**
- Grammar error identification
- Sentence combining
- Punctuation correction
- Parallel structure
- Fragment detection

**Quiz Structure:**
- Subject-verb agreement
- Run-on sentence correction
- Comma usage and lists
- Pronoun case selection
- Sentence fragment identification

**Example Questions:**
- "Which sentence is grammatically correct?"
- "Identify the error in this sentence"
- "Choose the best way to combine these sentences"
- "Fix the run-on sentence"
- "Which has correct punctuation?"

---

### 📘 Grammar Quiz (QuizMCQ.jsx)
**Purpose:** Test comprehensive grammar knowledge

**Features:**
- Standard multiple choice format
- Covers all grammar topics
- Tenses, parts of speech, articles
- Advanced structures (conditionals, passive voice)

**Quiz Structure:**
- Present simple/continuous
- Past tenses
- Parts of speech
- Articles and prepositions
- Conditionals and modals

---

### 📚 Vocabulary & Pronunciation Quizzes
**Vocabulary Quiz:** Word meanings, phrasal verbs, synonyms
**Pronunciation Quiz:** Vowel sounds, word stress, rhyming patterns

---

## Technical Implementation

### Backend API
**Endpoint:** `GET /api/module2/quizzes?lesson={slug}`

**Returns:**
```javascript
{
  quiz_id: 'listening-audio-comprehension',
  lesson_id: 'listening',
  quiz_type: 'audio', // 'speaking', 'reading', 'writing', 'mcq'
  instructions: 'Listen to the audio...',
  questions: [...]
}
```

### Frontend Routing Logic
`LessonView.jsx` automatically routes to the correct quiz component:
- `quiz_type: 'audio'` → AudioQuiz
- `quiz_type: 'speaking'` → SpeakingQuiz  
- `quiz_type: 'reading'` → ReadingQuiz
- `quiz_type: 'writing'` → WritingQuiz
- Default → QuizMCQ (grammar, vocabulary)

### Auto-Open Practice Mode
Use `?practice=1` query parameter:
- `/modules/learn-english/listening?practice=1`
- `/modules/learn-english/speaking?practice=1`

## Shared Features Across All Quiz Types

✅ **Score Calculation:** Percentage and count display
✅ **Show/Hide Answers:** Toggle explanations after submission
✅ **Try Again:** Reset quiz state
✅ **Color Coding:** 
   - Green for correct answers
   - Red for wrong answers
   - Skill-specific accent colors
✅ **Responsive Design:** Mobile-friendly layout
✅ **Progress Feedback:** Performance messages based on score

## Future Enhancements

### Production Ready Features:
1. **Audio Integration:** Replace simulated audio with real MP3/WAV files
2. **Speech Recognition:** Web Speech API for pronunciation feedback
3. **Recording:** MediaRecorder API to save user recordings
4. **AI Scoring:** Pronunciation analysis using speech-to-text
5. **Progress Tracking:** Save quiz attempts and scores to database
6. **Adaptive Difficulty:** Adjust questions based on performance

### EnglishClub-Inspired Additions:
- Dictation exercises (type what you hear)
- Gap-fill exercises (fill in missing words)
- Matching exercises (connect words to definitions)
- Reordering exercises (arrange words/sentences)
- Video-based listening comprehension
- Interactive dialogues with branching

## User Experience Benefits

1. **Authentic Practice:** Each skill uses appropriate interaction method
2. **Immediate Feedback:** Visual indicators and explanations
3. **Flexible Learning:** Can review passage/audio multiple times
4. **Contextual Learning:** Real-world scenarios and examples
5. **Progressive Difficulty:** Questions build from basic to advanced
6. **Clear Instructions:** Each quiz explains what to do
7. **Professional Design:** Clean, modern UI with skill-specific colors

## Color Scheme by Skill

- 🎧 **Listening:** Blue/Purple gradient
- 💬 **Speaking:** Purple/Pink gradient
- 📖 **Reading:** Green/Teal gradient
- ✍️ **Writing:** Orange/Red gradient
- 📘 **Grammar:** Teal/Blue gradient
- 📚 **Vocabulary:** Mixed colors

---

*All components are production-ready with placeholder features for audio/recording that can be replaced with real implementations.*
