import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VocabularyHub() {
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid, list, study

  const topics = [
    {
      id: 1,
      name: 'Travel',
      icon: '✈️',
      color: 'from-blue-500 to-cyan-500',
      wordCount: 45,
      progress: 60,
      difficulty: 'A2'
    },
    {
      id: 2,
      name: 'Business',
      icon: '💼',
      color: 'from-purple-500 to-pink-500',
      wordCount: 52,
      progress: 35,
      difficulty: 'B1'
    },
    {
      id: 3,
      name: 'Academic',
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
      wordCount: 68,
      progress: 28,
      difficulty: 'B2'
    },
    {
      id: 4,
      name: 'Exam Preparation',
      icon: '📝',
      color: 'from-orange-500 to-red-500',
      wordCount: 95,
      progress: 45,
      difficulty: 'B2+',
    },
    {
      id: 5,
      name: 'Everyday Conversation',
      icon: '💬',
      color: 'from-pink-500 to-rose-500',
      wordCount: 38,
      progress: 80,
      difficulty: 'A1'
    },
    {
      id: 6,
      name: 'Literary & Advanced',
      icon: '📖',
      color: 'from-indigo-500 to-purple-500',
      wordCount: 72,
      progress: 15,
      difficulty: 'C1'
    }
  ]

  const sampleWords = [
    {
      id: 1,
      word: 'Serendipity',
      partOfSpeech: 'noun',
      meaning: 'The occurrence of events by chance in a happy or beneficial way',
      example: 'Finding that old photo was pure serendipity.',
      synonyms: ['fortune', 'luck', 'chance'],
      cefrLevel: 'B2',
      topic: 'Academic'
    },
    {
      id: 2,
      word: 'Ephemeral',
      partOfSpeech: 'adjective',
      meaning: 'Lasting for a very short time',
      example: 'The beauty of cherry blossoms is ephemeral.',
      synonyms: ['fleeting', 'temporary', 'transient'],
      cefrLevel: 'C1',
      topic: 'Academic'
    },
    {
      id: 3,
      word: 'Ubiquitous',
      partOfSpeech: 'adjective',
      meaning: 'Present, appearing, or found everywhere',
      example: 'Smartphones have become ubiquitous in modern society.',
      synonyms: ['omnipresent', 'universal', 'pervasive'],
      cefrLevel: 'B2',
      topic: 'Academic'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-white'>
      {/* Header - Premium Look */}
      <div className='sticky top-0 z-40 bg-white shadow-md border-b border-teal-100'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>📚 Vocabulary Master</h1>
              <p className='text-slate-600 text-sm'>Learn 5000+ words with AI-powered flashcards and exercises</p>
            </div>
            <button
              onClick={() => navigate('/grammar-hub')}
              className='px-6 py-3 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-lg text-white rounded-lg font-semibold transition'
            >
              ← Back to Hub
            </button>
          </div>

          {/* View Mode Selector */}
          <div className='flex gap-3 border-t border-teal-100 pt-4'>
            {['grid', 'list', 'study'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-5 py-2 rounded-lg transition font-semibold ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-teal-600 to-rose-400 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode === 'grid' && '⊞ Grid View'}
                {mode === 'list' && '≡ List View'}
                {mode === 'study' && '📖 Study Mode'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {!selectedTopic ? (
          <div>
            {/* Topics Grid */}
            <h2 className='text-2xl font-bold mb-8 text-slate-900'>📚 Select a Topic</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className='group cursor-pointer transform hover:scale-105 transition-all duration-300'
                >
                  <div
                    className={`bg-gradient-to-br ${topic.color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-white mb-5`}
                  >
                    <div className='flex items-start justify-between mb-4'>
                      <div className='text-6xl'>{topic.icon}</div>
                      <div className='text-sm bg-white/20 px-3 py-1 rounded-full font-semibold'>{topic.difficulty}</div>
                    </div>
                    <h3 className='text-xl font-bold mb-3'>{topic.name}</h3>
                    <p className='text-sm text-white/90 font-medium'>{topic.wordCount} words to master</p>
                  </div>

                  {/* Progress Bar - Premium Design */}
                  <div className='bg-white rounded-xl p-5 border border-teal-100 shadow-sm'>
                    <div className='flex justify-between items-center mb-3'>
                      <span className='text-sm font-semibold text-slate-600'>Progress</span>
                      <span className='text-sm font-bold bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>{topic.progress}%</span>
                    </div>
                    <div className='w-full bg-slate-200 rounded-full h-3 overflow-hidden'>
                      <div
                        className='bg-gradient-to-r from-teal-500 to-rose-400 h-3 rounded-full transition-all'
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Topic Detail View */}
            <div className='mb-10'>
              <button
                onClick={() => setSelectedTopic(null)}
                className='px-5 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition font-semibold mb-6 border border-teal-200'
              >
                ← Back to Topics
              </button>
              <div>
                <h2 className='text-2xl font-bold mb-2 text-slate-900'>{topics.find(t => t.id === selectedTopic)?.name}</h2>
                <p className='text-slate-600 text-sm'>Continue learning new words and improve your vocabulary</p>
              </div>
            </div>

            {/* Study Controls */}
            <div className='grid md:grid-cols-4 gap-4 mb-10'>
              {['🃏 Flashcards', '🧩 Matching', '📝 Fill Gaps', '✅ Review'].map((exercise, idx) => (
                <button
                  key={idx}
                  className='px-6 py-4 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-lg text-white rounded-xl font-semibold transition transform hover:scale-105'
                >
                  {exercise}
                </button>
              ))}
            </div>

            {/* Words Display */}
            {viewMode === 'grid' && (
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {sampleWords.map((word) => (
                  <WordCard key={word.id} word={word} />
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className='space-y-4'>
                {sampleWords.map((word) => (
                  <WordListItem key={word.id} word={word} />
                ))}
              </div>
            )}

            {viewMode === 'study' && (
              <StudyMode words={sampleWords} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function WordCard({ word }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className='cursor-pointer perspective'
    >
      <div
        className={`relative w-full h-80 transition-transform duration-300 transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 shadow-lg flex flex-col justify-between ${
            isFlipped ? 'hidden' : ''
          }`}
        >
          <div>
            <div className='text-sm text-purple-100 mb-2'>WORD</div>
            <div className='text-4xl font-bold mb-4'>{word.word}</div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='px-3 py-1 bg-purple-800 rounded-full text-sm'>{word.partOfSpeech}</span>
            <span className='px-3 py-1 bg-yellow-600 rounded-full text-sm font-semibold'>{word.cefrLevel}</span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-6 shadow-lg flex flex-col justify-between ${
            isFlipped ? '' : 'hidden'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className='space-y-3'>
            <div>
              <div className='text-xs text-blue-100 mb-1'>MEANING</div>
              <div className='text-sm font-semibold'>{word.meaning}</div>
            </div>
            <div>
              <div className='text-xs text-blue-100 mb-1'>EXAMPLE</div>
              <div className='text-sm italic'>{word.example}</div>
            </div>
            <div>
              <div className='text-xs text-blue-100 mb-1'>SYNONYMS</div>
              <div className='flex flex-wrap gap-1'>
                {word.synonyms.map((syn, idx) => (
                  <span key={idx} className='text-xs bg-blue-700 px-2 py-1 rounded'>
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='text-xs text-blue-100'>Click to see word →</div>
        </div>
      </div>
    </div>
  )
}

function WordListItem({ word }) {
  return (
    <div className='bg-white rounded-xl p-6 border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition'>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div>
          <div className='text-xs text-slate-500 font-semibold mb-1'>WORD</div>
          <div className='font-bold text-lg text-slate-900'>{word.word}</div>
        </div>
        <div>
          <div className='text-xs text-slate-500 font-semibold mb-1'>PART OF SPEECH</div>
          <div className='text-sm capitalize text-slate-700'>{word.partOfSpeech}</div>
        </div>
        <div>
          <div className='text-xs text-slate-500 font-semibold mb-1'>MEANING</div>
          <div className='text-sm line-clamp-2 text-slate-600'>{word.meaning}</div>
        </div>
        <div>
          <div className='text-xs text-slate-500 font-semibold mb-1'>CEFR</div>
          <div className='px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg text-white text-sm font-bold w-fit'>{word.cefrLevel}</div>
        </div>
        <div className='flex items-end'>
          <button className='px-6 py-2 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-md text-white rounded-lg transition w-full font-semibold'>
            Learn
          </button>
        </div>
      </div>
    </div>
  )
}

function StudyMode({ words }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [studyMode, setStudyMode] = useState('flashcard') // flashcard, quiz, writing

  const currentWord = words[currentIndex]

  return (
    <div className='max-w-2xl mx-auto'>
      {/* Progress */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm text-slate-400'>Word {currentIndex + 1} of {words.length}</span>
          <span className='text-sm font-bold text-teal-400'>
            {Math.round(((currentIndex + 1) / words.length) * 100)}%
          </span>
        </div>
        <div className='w-full bg-slate-700 rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all'
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Mode Selector */}
      <div className='flex gap-2 mb-8'>
        {['flashcard', 'quiz', 'writing'].map((mode) => (
          <button
            key={mode}
            onClick={() => setStudyMode(mode)}
            className={`px-4 py-2 rounded-lg transition ${
              studyMode === mode
                ? 'bg-teal-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {mode === 'flashcard' && '🃏 Flashcard'}
            {mode === 'quiz' && '❓ Quiz'}
            {mode === 'writing' && '✍️ Writing'}
          </button>
        ))}
      </div>

      {/* Study Content */}
      <div className='bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-12 shadow-2xl mb-8 text-center'>
        <div className='text-sm text-purple-100 mb-4'>LEARNING MODE: {studyMode.toUpperCase()}</div>
        
        {studyMode === 'flashcard' && (
          <div>
            <div className='text-5xl font-bold mb-6'>{currentWord.word}</div>
            <div className='text-lg text-purple-100 mb-4'>{currentWord.partOfSpeech}</div>
            <div className='inline-block px-4 py-2 bg-purple-800 rounded-full text-sm font-semibold'>
              {currentWord.cefrLevel}
            </div>
          </div>
        )}

        {studyMode === 'quiz' && (
          <div className='space-y-4'>
            <div className='text-xl font-semibold mb-6'>What does "{currentWord.word}" mean?</div>
            {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, idx) => (
              <button
                key={idx}
                className='w-full p-3 bg-purple-700 hover:bg-purple-800 rounded-lg transition text-left'
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {studyMode === 'writing' && (
          <div className='space-y-4'>
            <div className='text-xl font-semibold mb-6'>Write a sentence using "{currentWord.word}"</div>
            <input
              type='text'
              placeholder='Type your sentence...'
              className='w-full p-4 rounded-lg bg-purple-700 text-white placeholder-purple-300 outline-none focus:bg-purple-800'
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className='flex gap-4 justify-between'>
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className='flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition'
        >
          ← Previous
        </button>
        <div className='flex gap-2'>
          {[
            { emoji: '😟', label: 'Again' },
            { emoji: '🤔', label: 'Hard' },
            { emoji: '👍', label: 'Good' },
            { emoji: '🔥', label: 'Easy' }
          ].map((action, idx) => (
            <button
              key={idx}
              className='px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition'
              title={action.label}
            >
              {action.emoji}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentIndex(Math.min(words.length - 1, currentIndex + 1))}
          disabled={currentIndex === words.length - 1}
          className='flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition font-semibold'
        >
          Next →
        </button>
      </div>
    </div>
  )
}
