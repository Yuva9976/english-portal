import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PronunciationHub() {
  const navigate = useNavigate()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [activeExercise, setActiveExercise] = useState(null)

  const lessons = [
    {
      id: 1,
      title: 'Vowel Sounds (A-E)',
      icon: '🔊',
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'A1',
      itemCount: 12,
      progress: 75
    },
    {
      id: 2,
      title: 'Consonant Clusters',
      icon: '📢',
      color: 'from-purple-500 to-pink-500',
      difficulty: 'A2',
      itemCount: 18,
      progress: 40
    },
    {
      id: 3,
      title: 'Stress & Intonation',
      icon: '🎵',
      color: 'from-green-500 to-emerald-500',
      difficulty: 'B1',
      itemCount: 15,
      progress: 55
    },
    {
      id: 4,
      title: 'Connected Speech',
      icon: '💬',
      color: 'from-orange-500 to-red-500',
      difficulty: 'B2',
      itemCount: 20,
      progress: 30
    }
  ]

  const pronunciationItems = [
    {
      id: 1,
      text: 'Serendipity',
      ipa: '/ˌserənˈdɪpɪti/',
      audioUrl: '/audio/serendipity.mp3',
      difficulty: 'B2',
      examples: [
        { text: 'It was sheer serendipity', ipa: '/ɪt wəz ʃɪr ˌserənˈdɪpɪti/' },
        { text: 'What a happy serendipity!', ipa: '/wɑt ə ˈhæpi ˌserənˈdɪpɪti/' }
      ]
    },
    {
      id: 2,
      text: 'Mediterranean',
      ipa: '/ˌmedɪtəˈreɪniən/',
      audioUrl: '/audio/mediterranean.mp3',
      difficulty: 'B1',
      examples: [
        { text: 'Mediterranean climate', ipa: '/ˌmedɪtəˈreɪniən ˈklaɪmət/' }
      ]
    },
    {
      id: 3,
      text: 'Worcestershire',
      ipa: '/ˈwʊstərʃə/',
      audioUrl: '/audio/worcestershire.mp3',
      difficulty: 'B2',
      examples: [
        { text: 'Worcestershire sauce', ipa: '/ˈwʊstərʃə sɔs/' }
      ]
    }
  ]

  if (selectedLesson) {
    return (
      <PronunciationLessonDetail
        lesson={lessons.find(l => l.id === selectedLesson)}
        items={pronunciationItems}
        onBack={() => setSelectedLesson(null)}
        activeExercise={activeExercise}
        onExerciseSelect={setActiveExercise}
      />
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-white'>
      {/* Header - Premium Look */}
      <div className='sticky top-0 z-40 bg-white shadow-md border-b border-teal-100'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>🎤 Pronunciation Lab</h1>
              <p className='text-slate-600 text-sm'>Master pronunciation with native speaker audio and recording</p>
            </div>
            <button
              onClick={() => navigate('/grammar-hub')}
              className='px-6 py-3 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-lg text-white rounded-lg font-semibold transition'
            >
              ← Back to Hub
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <h2 className='text-2xl font-bold mb-8 text-slate-900'>🎓 Available Lessons</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson.id)}
              className='group cursor-pointer transform hover:scale-105 transition-all duration-300'
            >
              <div
                className={`bg-gradient-to-br ${lesson.color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-white mb-5`}
              >
                <div className='flex items-start justify-between mb-4'>
                  <div className='text-6xl'>{lesson.icon}</div>
                  <div className='text-sm bg-white/20 px-3 py-1 rounded-full font-semibold'>{lesson.difficulty}</div>
                </div>
                <h3 className='text-xl font-bold mb-3'>{lesson.title}</h3>
                <p className='text-sm text-white/90 font-medium'>{lesson.itemCount} lessons to master</p>
              </div>

              {/* Progress Bar - Premium Design */}
              <div className='bg-white rounded-xl p-5 border border-teal-100 shadow-sm'>
                <div className='flex justify-between items-center mb-3'>
                  <span className='text-sm font-semibold text-slate-600'>Progress</span>
                  <span className='text-sm font-bold bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>{lesson.progress}%</span>
                </div>
                <div className='w-full bg-slate-200 rounded-full h-3 overflow-hidden'>
                  <div
                    className='bg-gradient-to-r from-teal-500 to-rose-400 h-3 rounded-full'
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section - Premium Design */}
        <div className='mt-12 bg-white rounded-2xl p-8 border border-teal-100 shadow-md'>
          <h3 className='text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900'>
            💡 Pronunciation Tips
          </h3>
          <div className='grid md:grid-cols-2 gap-6'>
            {[
              { title: '🎧 Listen First', desc: 'Always listen to the native speaker pronunciation first' },
              { title: '🗣️ Repeat Aloud', desc: 'Speak out loud to practice muscle memory' },
              { title: '🎙️ Record Yourself', desc: 'Use the recording feature to compare with native speakers' },
              { title: '📅 Practice Daily', desc: 'Consistent practice improves pronunciation rapidly' }
            ].map((tip, idx) => (
              <div key={idx} className='bg-gradient-to-br from-slate-50 to-teal-50 p-6 rounded-xl border border-teal-100 hover:border-teal-300 transition'>
                <div className='font-bold text-lg text-slate-900 mb-2'>{tip.title}</div>
                <div className='text-slate-600'>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PronunciationLessonDetail({ lesson, items, onBack, activeExercise, onExerciseSelect }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingScore, setRecordingScore] = useState(null)
  const [isLooping, setIsLooping] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const currentItem = items[currentItemIndex]

  // Use browser's Text-to-Speech API
  const playAudio = (text) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = playbackSpeed
    utterance.pitch = 1
    utterance.volume = 1
    utterance.lang = 'en-US'

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => {
      setIsPlaying(false)
      if (isLooping) {
        setTimeout(() => playAudio(text), 500)
      }
    }

    window.speechSynthesis.speak(utterance)
  }

  const pauseAudio = () => {
    window.speechSynthesis.pause()
    setIsPlaying(false)
  }

  const stopAudio = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  // Update playback speed when changed
  useEffect(() => {
    if (isPlaying) {
      stopAudio()
    }
  }, [playbackSpeed])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        // Mock scoring - in production, send to backend
        const score = Math.floor(Math.random() * 30) + 70 // 70-100
        setRecordingScore(score)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setIsRecording(false)
  }

  if (activeExercise) {
    return (
      <PronunciationExercise
        exercise={activeExercise}
        lesson={lesson}
        onBack={() => onExerciseSelect(null)}
      />
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
      {/* Header */}
      <div className='sticky top-0 z-40 bg-slate-900 border-b border-slate-700 shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <button
            onClick={onBack}
            className='px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition mb-4'
          >
            ← Back
          </button>
          <h1 className='text-2xl font-bold'>{lesson.title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-12'>
        {/* Progress */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-slate-400'>Item {currentItemIndex + 1} of {items.length}</span>
            <span className='text-sm font-bold text-teal-400'>
              {Math.round(((currentItemIndex + 1) / items.length) * 100)}%
            </span>
          </div>
          <div className='w-full bg-slate-700 rounded-full h-2'>
            <div
              className='bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all'
              style={{ width: `${((currentItemIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Pronunciation Display */}
        <div className='bg-slate-800 rounded-lg p-12 border border-slate-700 mb-8'>
          <div className='text-center space-y-4'>
            <div className='text-5xl font-bold'>{currentItem.text}</div>
            <div className='text-2xl text-slate-400 font-mono'>{currentItem.ipa}</div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className='bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8'>
          <div className='flex items-center justify-center gap-4 mb-6 flex-wrap'>
            {/* Play/Pause Button */}
            <button
              onClick={() => isPlaying ? pauseAudio() : playAudio(currentItem.text)}
              className='px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition text-lg'
            >
              {isPlaying ? '⏸️ Pause' : '🔊 Play'}
            </button>

            {/* Speed Controls */}
            <div className='flex gap-2'>
              {[
                { speed: 0.75, label: '🐌 Slow' },
                { speed: 1, label: '▶️ Normal' },
                { speed: 1.5, label: '⚡ Fast' }
              ].map((option) => (
                <button
                  key={option.speed}
                  onClick={() => setPlaybackSpeed(option.speed)}
                  className={`px-4 py-2 rounded-lg transition ${
                    playbackSpeed === option.speed
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Loop Button */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                isLooping
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              🔁 Loop {isLooping ? 'ON' : 'OFF'}
            </button>

            {/* Stop Button */}
            <button
              onClick={stopAudio}
              className='px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition'
            >
              ⏹️ Stop
            </button>
          </div>

          {/* Example Sentences */}
          {currentItem.examples.length > 0 && (
            <div className='mt-6 space-y-3 border-t border-slate-700 pt-6'>
              <div className='text-sm font-semibold text-slate-400 mb-4'>EXAMPLE SENTENCES</div>
              {currentItem.examples.map((example, idx) => (
                <div key={idx} className='bg-slate-700 p-4 rounded-lg'>
                  <div className='font-semibold mb-1'>{example.text}</div>
                  <div className='text-sm text-slate-400 font-mono mb-3'>{example.ipa}</div>
                  <button
                    onClick={() => playAudio(example.text)}
                    className='text-sm px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded transition font-semibold'
                  >
                    🔊 Hear Sentence
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recording Section */}
        <div className='bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8'>
          <h3 className='text-xl font-bold mb-4'>🎙️ Record & Compare</h3>
          
          <div className='flex gap-4 mb-6'>
            {isRecording ? (
              <button
                onClick={stopRecording}
                className='flex-1 px-6 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition'
              >
                ⏹️ Stop Recording
              </button>
            ) : (
              <button
                onClick={startRecording}
                className='flex-1 px-6 py-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold text-white transition'
              >
                🎙️ Start Recording
              </button>
            )}
          </div>

          {recordingScore && (
            <div className='bg-slate-700 p-6 rounded-lg'>
              <div className='text-center'>
                <div className='text-6xl font-bold text-yellow-400 mb-2'>{recordingScore}%</div>
                <div className='text-lg font-semibold mb-4'>
                  {recordingScore >= 85
                    ? '✨ Excellent!'
                    : recordingScore >= 70
                    ? '👍 Good!'
                    : '🎯 Keep practicing!'}
                </div>
                <div className='space-y-2 text-sm text-slate-300'>
                  <p>✓ Stress pattern matches well</p>
                  <p>⚠️ Final vowel slightly elongated</p>
                  <p>✓ Consonants are clear</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercise Buttons */}
        <div className='grid md:grid-cols-2 gap-4 mb-8'>
          {[
            { id: 'minimal-pair', name: 'Minimal Pair Listening', emoji: '👂' },
            { id: 'shadowing', name: 'Shadowing Sentences', emoji: '🗣️' },
            { id: 'tongue-twisters', name: 'Tongue Twisters', emoji: '💨' },
            { id: 'dialogue', name: 'Dialogue Practice', emoji: '💬' }
          ].map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => onExerciseSelect(exercise.id)}
              className='p-6 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition text-lg'
            >
              {exercise.emoji} {exercise.name}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className='flex gap-4'>
          <button
            onClick={() => setCurrentItemIndex(Math.max(0, currentItemIndex - 1))}
            disabled={currentItemIndex === 0}
            className='flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg transition'
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentItemIndex(Math.min(items.length - 1, currentItemIndex + 1))}
            disabled={currentItemIndex === items.length - 1}
            className='flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 rounded-lg transition font-semibold'
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

function PronunciationExercise({ exercise, lesson, onBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userResponse, setUserResponse] = useState('')

  const exerciseContent = {
    'minimal-pair': {
      title: 'Minimal Pair Listening',
      description: 'Listen and identify which word you hear',
      steps: [
        {
          question: 'Do you hear "bat" or "but"?',
          audio1: 'bat.mp3',
          audio2: 'but.mp3',
          options: ['bat', 'but'],
          correct: 'but'
        }
      ]
    },
    'shadowing': {
      title: 'Shadowing Sentences',
      description: 'Listen and repeat immediately after the speaker',
      steps: [
        {
          sentence: 'The quick brown fox jumps over the lazy dog.',
          ipa: '/ðə kwɪk braʊn fɑks dʒʌmps oʊvər ðə ˈleɪzi dɔg/',
          instruction: 'Listen first, then click Start Recording and repeat'
        }
      ]
    },
    'tongue-twisters': {
      title: 'Tongue Twisters',
      description: 'Practice difficult sound combinations',
      steps: [
        {
          text: 'Sally sells seashells by the seashore',
          speeds: ['slow', 'normal', 'fast'],
          instruction: 'Start with slow speed and gradually increase'
        }
      ]
    },
    'dialogue': {
      title: 'Dialogue Practice',
      description: 'Practice natural conversation patterns',
      steps: [
        {
          speaker1: 'Hi, how are you?',
          speaker2: 'I\'m doing well, thanks for asking!',
          instruction: 'Practice both speaker parts'
        }
      ]
    }
  }

  const content = exerciseContent[exercise]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
      {/* Header */}
      <div className='sticky top-0 z-40 bg-slate-900 border-b border-slate-700 shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <button
            onClick={onBack}
            className='px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition mb-4'
          >
            ← Back to Lesson
          </button>
          <h1 className='text-2xl font-bold'>{content.title}</h1>
          <p className='text-slate-400 mt-1'>{content.description}</p>
        </div>
      </div>

      {/* Exercise Content */}
      <div className='max-w-4xl mx-auto px-6 py-12'>
        <div className='bg-slate-800 rounded-lg p-8 border border-slate-700'>
          {content.title === 'Minimal Pair Listening' && (
            <MinimalPairExercise steps={content.steps} />
          )}
          {content.title === 'Shadowing Sentences' && (
            <ShadowingExercise steps={content.steps} />
          )}
          {content.title === 'Tongue Twisters' && (
            <TongueTwisterExercise steps={content.steps} />
          )}
          {content.title === 'Dialogue Practice' && (
            <DialogueExercise steps={content.steps} />
          )}
        </div>
      </div>
    </div>
  )
}

function MinimalPairExercise({ steps }) {
  const [selected, setSelected] = useState(null)
  const step = steps[0]

  return (
    <div className='space-y-8'>
      <div className='text-2xl font-bold text-center mb-8'>{step.question}</div>

      <div className='flex gap-6 mb-8'>
        {['audio1', 'audio2'].map((key, idx) => (
          <button
            key={idx}
            className='flex-1 p-8 bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-bold text-lg transition'
          >
            🔊 Option {idx + 1}
          </button>
        ))}
      </div>

      <div className='space-y-3'>
        {step.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(option)}
            className={`w-full p-4 rounded-lg font-semibold transition text-lg ${
              selected === option
                ? 'bg-teal-600 border-2 border-teal-400'
                : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <button className='w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold transition'>
        Check Answer
      </button>
    </div>
  )
}

function ShadowingExercise({ steps }) {
  const [isRecording, setIsRecording] = useState(false)
  const step = steps[0]

  return (
    <div className='space-y-8'>
      <div className='bg-slate-700 p-6 rounded-lg'>
        <div className='text-lg font-semibold mb-2'>{step.sentence}</div>
        <div className='text-sm text-slate-400 font-mono mb-4'>{step.ipa}</div>
      </div>

      <div className='text-center space-y-4'>
        <div className='text-sm text-slate-400 mb-6'>{step.instruction}</div>
        <button className='px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition mb-4'>
          🔊 Listen First
        </button>

        {isRecording ? (
          <button
            onClick={() => setIsRecording(false)}
            className='w-full px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-lg transition'
          >
            ⏹️ Stop Recording
          </button>
        ) : (
          <button
            onClick={() => setIsRecording(true)}
            className='w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold text-lg transition'
          >
            🎙️ Start Recording
          </button>
        )}
      </div>
    </div>
  )
}

function TongueTwisterExercise({ steps }) {
  const [currentSpeed, setCurrentSpeed] = useState('slow')
  const step = steps[0]

  return (
    <div className='space-y-8'>
      <div className='bg-slate-700 p-8 rounded-lg text-center'>
        <div className='text-3xl font-bold mb-4'>{step.text}</div>
        <div className='text-sm text-slate-400'>{step.instruction}</div>
      </div>

      <div className='flex gap-2 justify-center'>
        {step.speeds.map((speed) => (
          <button
            key={speed}
            onClick={() => setCurrentSpeed(speed)}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              currentSpeed === speed
                ? 'bg-teal-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {speed === 'slow' && '🐌 Slow'}
            {speed === 'normal' && '▶️ Normal'}
            {speed === 'fast' && '⚡ Fast'}
          </button>
        ))}
      </div>

      <button className='w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition'>
        🔊 Play at {currentSpeed} speed
      </button>

      <button className='w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold text-lg transition'>
        🎙️ Record & Compare
      </button>
    </div>
  )
}

function DialogueExercise({ steps }) {
  const step = steps[0]

  return (
    <div className='space-y-6'>
      <div className='bg-blue-700 p-6 rounded-lg border-l-4 border-blue-400'>
        <div className='text-sm text-blue-200 mb-2'>SPEAKER 1</div>
        <div className='text-xl font-semibold'>{step.speaker1}</div>
      </div>

      <div className='bg-pink-700 p-6 rounded-lg border-l-4 border-pink-400'>
        <div className='text-sm text-pink-200 mb-2'>SPEAKER 2</div>
        <div className='text-xl font-semibold'>{step.speaker2}</div>
      </div>

      <div className='space-y-4'>
        <button className='w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition'>
          🔊 Listen to Full Dialogue
        </button>
        <button className='w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold text-lg transition'>
          🎙️ Practice Speaker 1
        </button>
        <button className='w-full px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-lg font-bold text-lg transition'>
          🎙️ Practice Speaker 2
        </button>
      </div>
    </div>
  )
}
