import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PronunciationHub({ isInline }) {
  const navigate = useNavigate()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [activeExercise, setActiveExercise] = useState(null)
  const [hubViewMode, setHubViewMode] = useState(() => localStorage.getItem('pronunc_hub_view_mode') || 'grid')

  useEffect(() => {
    localStorage.setItem('pronunc_hub_view_mode', hubViewMode)
  }, [hubViewMode])

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
    <div className={isInline ? 'w-full' : 'min-h-screen bg-gradient-to-br from-slate-50 to-white'}>
      {/* Header - Premium Look */}
      {!isInline && (
        <div className='sticky top-0 z-40 bg-white shadow-md border-b border-teal-100'>
          <div className='container mx-auto px-6 py-8 pl-10'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-xl md:text-2xl font-black mb-1.5 bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent uppercase tracking-tight'>🎤 Pronunciation Lab</h1>
                <p className='text-slate-500 text-sm font-semibold opacity-80'>Master pronunciation with native speakers</p>
              </div>
              
              {/* Hub View Switcher */}
              <div className="flex bg-white p-1.5 rounded-[22px] border border-slate-100 shadow-sm">
                 <button
                  onClick={() => setHubViewMode('grid')}
                  className={`w-12 h-12 flex items-center justify-center rounded-[18px] transition-all duration-300 ${hubViewMode === 'grid' ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <span className="text-xl">⊞</span>
                </button>
                <button
                  onClick={() => setHubViewMode('list')}
                  className={`w-12 h-12 flex items-center justify-center rounded-[18px] transition-all duration-300 ${hubViewMode === 'list' ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <span className="text-xl">≡</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline Header */}
      {isInline && (
        <div className='max-w-7xl mx-auto px-6 pt-6 -mb-6'>
           <div className='flex bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-teal-100/50 shadow-sm items-center gap-3'>
              <span className='w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md text-xl'>🎤</span>
              <div>
                <h2 className='text-lg font-bold text-slate-800 leading-tight'>Pronunciation Lab</h2>
                <p className='text-xs text-slate-500 font-medium'>Master pronunciation with native speakers</p>
              </div>
           </div>
        </div>
      )}


      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-12 pl-12'>
        <h2 className='text-lg font-black mb-8 text-slate-800 uppercase tracking-widest flex items-center gap-2'>
           <span className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 text-sm border border-teal-100">🎓</span>
           Available Lessons
        </h2>
        {hubViewMode === 'grid' ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className='group cursor-pointer transform hover:scale-[1.03] transition-all duration-500'
              >
                <div className="relative bg-white p-5 rounded-xl border-2 border-slate-50 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all text-slate-800 h-full overflow-hidden">
                  {/* Top Gradient Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-rose-400" />
                  
                  <div className='flex items-start justify-between mb-4 relative z-10'>
                    <div className='text-4xl group-hover:scale-110 transition-transform duration-500'>{lesson.icon}</div>
                    <div className='text-[9px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-black uppercase tracking-widest'>{lesson.difficulty}</div>
                  </div>
                  
                  <h3 className="text-[17px] font-black mb-1 relative z-10 font-['Outfit'] tracking-tight group-hover:text-teal-600 transition-colors uppercase leading-tight">{lesson.title}</h3>
                  <p className='text-[10px] text-slate-400 font-bold relative z-10 uppercase tracking-widest mb-6'>{lesson.itemCount} lessons</p>
                  
                  {/* Progress info */}
                  <div className="relative z-10 pt-3 border-t border-slate-50">
                    <div className='flex justify-between items-center mb-1.5'>
                      <span className='text-[9px] font-black uppercase tracking-widest text-slate-400'>Progress</span>
                      <span className='text-[11px] font-black text-teal-600'>{lesson.progress}%</span>
                    </div>
                    <div className='w-full bg-slate-100 rounded-full h-1.5 overflow-hidden shadow-inner'>
                      <div className='bg-gradient-to-r from-teal-500 to-rose-400 h-full rounded-full transition-all duration-1000' style={{ width: `${lesson.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
             {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className="group bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-500 cursor-pointer flex items-center gap-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-rose-50 opacity-10 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-125"></div>
                
                <div className={`w-20 h-20 rounded-[24px] bg-gradient-to-br from-teal-50 to-rose-50 border border-slate-50 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                  {lesson.icon}
                </div>

                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-4 mb-2">
                     <h3 className="text-xl font-black text-slate-800 font-['Outfit'] uppercase tracking-tight">{lesson.title}</h3>
                     <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-widest">{lesson.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">📚</span>
                        <span className="text-sm font-bold text-slate-600">{lesson.itemCount} Lessons</span>
                     </div>
                     <div className="flex-1 max-w-[200px]">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                          <span className="text-[11px] font-black text-teal-600">{lesson.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-teal-500 to-rose-400 h-full transition-all duration-1000" style={{ width: `${lesson.progress}%` }}></div>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="relative z-10 pr-4">
                   <div className="w-12 h-12 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-teal-500 group-hover:text-teal-500 transition-all">
                      <span className="text-xl">→</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section - Premium Design */}
        <div className='mt-16 bg-white rounded-2xl p-8 border-2 border-slate-50 shadow-sm relative overflow-hidden'>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-rose-400" />
          <h3 className='text-lg font-black mb-8 flex items-center gap-3 text-slate-800 uppercase tracking-tight'>
            <span className="text-2xl">💡</span> Pronunciation Tips
          </h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[
              { title: 'Listen First', desc: 'Always listen to the native speaker pronunciation first', icon: '🎧' },
              { title: 'Repeat Aloud', desc: 'Speak out loud to practice muscle memory', icon: '🗣️' },
              { title: 'Record Yourself', desc: 'Use the recording feature to compare with native speakers', icon: '🎙️' },
              { title: 'Practice Daily', desc: 'Consistent practice improves pronunciation rapidly', icon: '📅' }
            ].map((tip, idx) => (
              <div key={idx} className='bg-slate-50/50 p-5 rounded-xl border border-slate-100 group hover:border-teal-200 transition-all'>
                <div className='w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm mb-4 border border-slate-100 group-hover:scale-110 transition-transform'>{tip.icon}</div>
                <div className='font-black text-[13px] text-slate-800 mb-2 uppercase tracking-tight'>{tip.title}</div>
                <div className='text-[11px] text-slate-500 font-medium leading-relaxed'>{tip.desc}</div>
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
