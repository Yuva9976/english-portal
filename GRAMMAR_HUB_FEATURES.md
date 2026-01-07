# Grammar Hub & Advanced Learning Features - Implementation Plan

## Overview
This document outlines the implementation of Grammar Hub with Vocabulary, Pronunciation, and advanced learning features.

## Architecture

### Frontend Structure
```
src/
├── pages/
│   ├── GrammarHub/
│   │   ├── GrammarHubDashboard.jsx
│   │   ├── VocabularyHub.jsx
│   │   ├── PronunciationHub.jsx
│   │   ├── VocabularyTopic.jsx
│   │   ├── WordDetail.jsx
│   │   └── PronunciationLesson.jsx
│   └── Exercises/
│       ├── Flashcards.jsx
│       ├── MatchingGame.jsx
│       ├── FillInTheGap.jsx
│       ├── MinimalPairListening.jsx
│       ├── ShadowingSentences.jsx
│       └── TongueTwisters.jsx
├── components/
│   ├── AudioPlayer.jsx
│   ├── RecordingWidget.jsx
│   ├── WordCard.jsx
│   ├── ProgressBar.jsx
│   ├── QuizCard.jsx
│   └── FeatureCard.jsx
└── services/
    ├── vocabularyService.js
    ├── pronunciationService.js
    └── grammarService.js
```

### Backend Structure
```
routes/
├── vocabulary.js
├── pronunciation.js
├── grammar.js
├── exercises.js
└── progress.js

models/
├── Vocabulary.js
├── Pronunciation.js
├── Grammar.js
├── UserProgress.js
└── Exercise.js

controllers/
├── vocabularyController.js
├── pronunciationController.js
├── grammarController.js
├── exerciseController.js
└── progressController.js
```

## Database Schema

### Vocabulary Table
```javascript
{
  id, topicId, word, partOfSpeech, meaning, example,
  synonyms: [{ word, definition }],
  cefrLevel, imageUrl, createdAt
}
```

### Pronunciation Table
```javascript
{
  id, lessonId, text, ipa, audioUrl, difficulty,
  examples: [{ text, audioUrl }], createdAt
}
```

### User Progress Table
```javascript
{
  userId, lessonId, exerciseType, score, attempts,
  lastReviewed, nextReviewDate, createdAt
}
```

### User Recordings Table
```javascript
{
  id, userId, pronunciationId, audioUrl, score,
  feedback, comparisonMetrics, createdAt
}
```

## Feature Implementation Order
1. ✅ Navbar updates
2. Grammar Hub Dashboard (this request)
3. Vocabulary Section
4. Pronunciation Section
5. Exercises
6. Spaced Repetition Review
7. Progress Tracking

## Color Scheme
- Primary: Teal (#0d9488)
- Secondary: Yellow (#eab308)
- Accent: Coral (#ff6b6b)
- Dark: Slate (#1e293b)
