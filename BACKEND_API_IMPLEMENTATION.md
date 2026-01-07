# Backend API Implementation Guide - Grammar Hub Features

## Database Schema

### 1. Vocabulary Table
```sql
CREATE TABLE vocabularies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  topicId INT NOT NULL,
  word VARCHAR(100) NOT NULL,
  partOfSpeech VARCHAR(50),
  meaning TEXT,
  example TEXT,
  synonyms JSON,
  cefrLevel VARCHAR(10),
  imageUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topicId) REFERENCES vocabulary_topics(id)
);
```

### 2. Vocabulary Topics Table
```sql
CREATE TABLE vocabulary_topics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  difficulty VARCHAR(10),
  imageUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Pronunciation Items Table
```sql
CREATE TABLE pronunciations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lessonId INT NOT NULL,
  text VARCHAR(255) NOT NULL,
  ipa VARCHAR(255),
  audioUrl VARCHAR(255),
  difficulty VARCHAR(10),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lessonId) REFERENCES pronunciation_lessons(id)
);
```

### 4. Pronunciation Lessons Table
```sql
CREATE TABLE pronunciation_lessons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  difficulty VARCHAR(10),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Pronunciation Examples Table
```sql
CREATE TABLE pronunciation_examples (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pronunciationId INT NOT NULL,
  text VARCHAR(255),
  ipa VARCHAR(255),
  audioUrl VARCHAR(255),
  FOREIGN KEY (pronunciationId) REFERENCES pronunciations(id)
);
```

### 6. User Recordings Table
```sql
CREATE TABLE user_recordings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  pronunciationId INT NOT NULL,
  audioUrl VARCHAR(255),
  score INT,
  feedback TEXT,
  comparisonMetrics JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (pronunciationId) REFERENCES pronunciations(id)
);
```

### 7. User Progress Table
```sql
CREATE TABLE user_progress (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  vocabularyId INT,
  pronunciationId INT,
  exerciseType VARCHAR(50),
  score INT,
  attempts INT DEFAULT 1,
  lastReviewed TIMESTAMP,
  nextReviewDate TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (vocabularyId) REFERENCES vocabularies(id),
  FOREIGN KEY (pronunciationId) REFERENCES pronunciations(id)
);
```

### 8. Spaced Repetition Schedule Table
```sql
CREATE TABLE spaced_repetition_schedule (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  itemId INT NOT NULL,
  itemType ENUM('vocabulary', 'pronunciation'),
  interval INT DEFAULT 1,
  factor DECIMAL(3,2) DEFAULT 2.5,
  nextDueDate TIMESTAMP,
  lastReviewDate TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

## API Endpoints

### Vocabulary APIs
```
GET  /api/vocabulary/topics                    # Get all topics
GET  /api/vocabulary/topics/:topicId           # Get topic with words
GET  /api/vocabulary/words/:wordId             # Get word details
POST /api/vocabulary/words                     # Create word (admin)
PUT  /api/vocabulary/words/:wordId             # Update word (admin)
DELETE /api/vocabulary/words/:wordId           # Delete word (admin)
```

### Pronunciation APIs
```
GET  /api/pronunciation/lessons                # Get all lessons
GET  /api/pronunciation/lessons/:lessonId      # Get lesson with items
GET  /api/pronunciation/items/:itemId          # Get pronunciation item
GET  /api/pronunciation/items/:itemId/examples # Get examples
POST /api/pronunciation/items                  # Create item (admin)
POST /api/pronunciation/upload-recording       # Upload user recording
POST /api/pronunciation/score-recording        # Score recording (with mock scoring)
```

### Progress & Spaced Repetition APIs
```
GET  /api/progress/user/:userId                # Get user progress
GET  /api/progress/review-items                # Get items due for review
POST /api/progress/mark-complete               # Mark item as completed
POST /api/progress/update-spaced-repetition    # Update SR schedule
GET  /api/progress/stats                       # Get user statistics
```

### Exercises APIs
```
GET  /api/exercises/flashcards/:topicId        # Get flashcard set
GET  /api/exercises/minimal-pair/:lessonId     # Get minimal pair items
POST /api/exercises/submit-attempt             # Submit exercise attempt
GET  /api/exercises/results                    # Get exercise results
```

## Implementation Examples

### 1. Pronunciation Scoring (Mock)
```javascript
// routes/pronunciation.js
router.post('/score-recording', async (req, res) => {
  try {
    const { recordingId, referenceAudioUrl } = req.body;
    
    // Mock scoring logic (replace with actual ML/audio analysis)
    const score = Math.floor(Math.random() * 30) + 70; // 70-100
    
    const feedback = {
      score,
      stressPattern: score > 85 ? 'Good' : 'Needs work',
      clarity: score > 80 ? 'Clear' : 'Could be clearer',
      pace: score > 75 ? 'Appropriate' : 'Too fast/slow',
      suggestions: [
        'Focus on word stress',
        'Elongate vowels slightly',
        'Clear consonants'
      ]
    };
    
    const comparisonMetrics = {
      pitchAccuracy: score > 80 ? 'High' : 'Medium',
      timingAccuracy: score > 85 ? 'High' : 'Medium',
      spectralSimilarity: (score / 100).toFixed(2)
    };
    
    // Save recording with score
    await UserRecording.create({
      userId: req.user.id,
      recordingId,
      score,
      feedback: JSON.stringify(feedback),
      comparisonMetrics: JSON.stringify(comparisonMetrics)
    });
    
    res.json({ score, feedback, comparisonMetrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. Spaced Repetition Algorithm
```javascript
// utils/spacedRepetition.js
const INTERVALS = [1, 3, 7, 14, 30]; // days

function calculateNextReview(factor, lastInterval, correct) {
  const newFactor = correct 
    ? Math.max(1.3, factor + (0.1 - (5 - 3) * (0.08 + (5 - 3) * 0.02)))
    : Math.max(1.3, factor - 0.2);
  
  const nextInterval = correct
    ? lastInterval === 0 ? 1 : Math.round(lastInterval * newFactor)
    : 1;
  
  const nextDueDate = new Date();
  nextDueDate.setDate(nextDueDate.getDate() + nextInterval);
  
  return { newFactor, nextInterval, nextDueDate };
}

module.exports = { calculateNextReview };
```

### 3. Progress Tracking
```javascript
// routes/progress.js
router.post('/update-progress', async (req, res) => {
  try {
    const { itemId, itemType, score, exerciseType } = req.body;
    
    let progress = await UserProgress.findOne({
      userId: req.user.id,
      vocabularyId: itemType === 'vocabulary' ? itemId : null,
      pronunciationId: itemType === 'pronunciation' ? itemId : null
    });
    
    if (!progress) {
      progress = await UserProgress.create({
        userId: req.user.id,
        [itemType === 'vocabulary' ? 'vocabularyId' : 'pronunciationId']: itemId,
        exerciseType,
        score,
        attempts: 1
      });
    } else {
      progress.attempts += 1;
      progress.score = Math.max(progress.score, score);
      progress.lastReviewed = new Date();
    }
    
    // Update spaced repetition schedule
    const { newFactor, nextDueDate } = calculateNextReview(
      progress.factor || 2.5,
      progress.interval || 0,
      score >= 70
    );
    
    progress.factor = newFactor;
    progress.nextReviewDate = nextDueDate;
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 4. Get Review Items
```javascript
// routes/progress.js
router.get('/review-items', async (req, res) => {
  try {
    const items = await UserProgress.find({
      userId: req.user.id,
      nextReviewDate: { $lte: new Date() }
    })
    .populate('vocabularyId')
    .populate('pronunciationId')
    .limit(10);
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Frontend Integration

### Service Layer Example
```javascript
// services/vocabularyService.js
import apiClient from '../apiClient';

export const vocabularyService = {
  getTopics: () => apiClient.get('/api/vocabulary/topics'),
  getWordsByTopic: (topicId) => apiClient.get(`/api/vocabulary/topics/${topicId}`),
  getWord: (wordId) => apiClient.get(`/api/vocabulary/words/${wordId}`),
  submitFlashcardAttempt: (wordId, score) => 
    apiClient.post('/api/exercises/submit-attempt', {
      itemId: wordId,
      itemType: 'vocabulary',
      exerciseType: 'flashcard',
      score
    })
};

export const pronunciationService = {
  getLessons: () => apiClient.get('/api/pronunciation/lessons'),
  getLesson: (lessonId) => apiClient.get(`/api/pronunciation/lessons/${lessonId}`),
  uploadRecording: (file, pronunciationId) => {
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('pronunciationId', pronunciationId);
    return apiClient.post('/api/pronunciation/upload-recording', formData);
  },
  scoreRecording: (recordingId) => 
    apiClient.post('/api/pronunciation/score-recording', { recordingId })
};

export const progressService = {
  getReviewItems: () => apiClient.get('/api/progress/review-items'),
  updateProgress: (data) => apiClient.post('/api/progress/update-progress', data),
  getUserStats: () => apiClient.get('/api/progress/stats')
};
```

## Setup Instructions

1. **Create database tables** using the SQL schemas above
2. **Install dependencies**: `npm install express-multer dotenv`
3. **Create routes** in `routes/vocabulary.js`, `routes/pronunciation.js`, `routes/progress.js`
4. **Create controllers** for business logic
5. **Add middleware** for file uploads (multer for recordings)
6. **Implement mock pronunciation scoring** or integrate with actual audio analysis library
7. **Test all endpoints** with Postman

## Audio Upload Handling
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/recordings');
  },
  filename: (req, file, cb) => {
    cb(null, `recording-${Date.now()}.wav`);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files allowed'));
    }
  }
});

router.post('/upload-recording', upload.single('audio'), async (req, res) => {
  // Handle recording upload
});
```

## Testing Checklist
- [ ] GET all vocabulary topics
- [ ] GET vocabulary words by topic
- [ ] POST create vocabulary word (admin)
- [ ] GET pronunciation lessons
- [ ] POST upload recording
- [ ] GET score recording
- [ ] GET review items (spaced repetition)
- [ ] POST update progress
- [ ] Verify flashcard scoring
- [ ] Verify spaced repetition algorithm
