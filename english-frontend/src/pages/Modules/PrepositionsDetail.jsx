import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

export default function PrepositionsDetail() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);
  
  // Learn More Modal States
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const prepositionTypes = [
    { id: 1, type: 'Prepositions of Time', icon: '⏰', color: 'blue', definition: 'Indicate when an event happens.', examples: ['<strong>At</strong> 5 PM', '<strong>On</strong> Monday', '<strong>In</strong> July'], sampleWords: ['at', 'on', 'in', 'before', 'after'] },
    { id: 2, type: 'Prepositions of Place', icon: '📍', color: 'green', definition: 'Specify a location or position.', examples: ['<strong>In</strong> the box', '<strong>Under</strong> the table', '<strong>Beside</strong> the car'], sampleWords: ['in', 'on', 'at', 'under', 'beside'] },
    { id: 3, type: 'Prepositions of Direction', icon: '➡️', color: 'purple', definition: 'Show movement from one place to another.', examples: ['Go <strong>to</strong> the store', 'Walk <strong>across</strong> the street', 'Jump <strong>over</strong> the fence'], sampleWords: ['to', 'from', 'into', 'over', 'through'] },
    { id: 4, type: 'Prepositions of Manner', icon: '✍️', color: 'orange', definition: 'Describe how an action is performed.', examples: ['Spoke <strong>with</strong> confidence', 'Drove <strong>by</strong> car', 'Wrote it <strong>in</strong> pen'], sampleWords: ['by', 'with', 'in', 'like', 'on'] },
    { id: 5, type: 'Prepositions of Agent/Instrument', icon: '👤', color: 'red', definition: 'Indicate an action conducted by or with something.', examples: ['Written <strong>by</strong> Shakespeare', 'Cut <strong>with</strong> a knife'], sampleWords: ['by', 'with'] },
    { id: 6, type: 'Prepositions of Cause/Purpose', icon: '🎯', color: 'yellow', definition: 'Explain the reason or purpose for something.', examples: ['Crying <strong>from</strong> pain', 'A gift <strong>for</strong> you'], sampleWords: ['for', 'from', 'because of', 'due to'] }
  ];

  const videos = [
    { id: 1, title: 'Prepositions of Place: IN, ON, AT', embedId: '10fEi0i-w4M', description: 'Learn the most common prepositions of place.' },
    { id: 2, title: 'Prepositions of Time Explained', embedId: 'GcdB5bF3_sU', description: 'A clear guide to using prepositions of time correctly.' }
  ];

  const interactiveQuiz = [
    { id: 1, emoji: '📍', question: 'Which preposition of PLACE best fits: "The cat is hiding ___ the bed."', hint: 'Think about the position relative to the bed.', options: ['on', 'under', 'at', 'to'], correct: 1, explanation: 'Correct! "Under" is a preposition of place indicating the cat\'s location.' },
    { id: 2, emoji: '⏰', question: 'Which preposition of TIME is correct: "I will see you ___ Friday."', hint: 'For days of the week, we use a specific preposition.', options: ['in', 'at', 'on', 'by'], correct: 2, explanation: 'Excellent! We use "on" for specific days of the week.' },
    { id: 3, emoji: '➡️', question: 'Identify the preposition of DIRECTION: "He walked ___ the room."', hint: 'This shows movement from outside to inside.', options: ['in', 'at', 'into', 'on'], correct: 2, explanation: 'Great! "Into" shows movement and direction.' },
    { id: 4, emoji: '👤', question: 'Which preposition of AGENT is used here: "The play was written ___ Shakespeare."', hint: 'This shows who created the work.', options: ['with', 'from', 'by', 'for'], correct: 2, explanation: 'Perfect! "By" is used to show the agent or creator.' },
    { id: 5, emoji: '🎯', question: 'Choose the preposition of PURPOSE: "This tool is ___ cutting paper."', hint: 'What is the tool\'s function?', options: ['for', 'with', 'by', 'from'], correct: 0, explanation: 'Fantastic! "For" is used to explain the purpose of something.' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ensure page is at top when this detail view mounts (fixes browser scroll retention)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Sticky Header (Noun/Pronoun/Adjective/Verb-style) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2" title="Back">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">🧭</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Prepositions</h1>
            <span className="text-base text-teal-600 ml-2">Connecting words in English</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-teal-400 to-blue-300 text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-300 hover:text-white'
                }`}
              >
                <span className="mr-1">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 mt-4">
        <section id="overview" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is a Preposition?</h2>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              A <strong>preposition</strong> is a word that links a noun or pronoun to another word in the sentence, showing relationships of time, place, or direction.
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Essential for clear sentences.</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">They are a "closed class" of words.</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              Types of Prepositions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {prepositionTypes.map((prep) => (
                <div key={prep.id} className={`relative rounded-3xl shadow-2xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/60 backdrop-blur-lg border border-${prep.color}-200 hover:border-${prep.color}-400 hover:shadow-[0_8px_32px_0_rgba(168,139,250,0.15)] hover:ring-2 hover:ring-${prep.color}-300`} style={{ borderTop: `6px solid var(--tw-color-${prep.color}-400)` }}>
                  <div className="absolute top-4 right-4 opacity-10 text-7xl pointer-events-none select-none">{prep.icon}</div>
                  <div className="flex items-center gap-3 px-7 pt-8 pb-4 z-10">
                    <span className={`text-4xl drop-shadow-lg`} style={{ color: `var(--tw-color-${prep.color}-500)` }}>{prep.icon}</span>
                    <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight drop-shadow">{prep.type}</h3>
                  </div>
                  <div className="px-7 pb-8 flex-1 flex flex-col z-10">
                    <p className="text-base text-gray-700 leading-relaxed mb-5 font-semibold bg-white/70 rounded-xl px-3 py-2 shadow-sm">{prep.definition}</p>
                    <div className="space-y-4 mb-5">
                      {prep.examples.slice(0, 2).map((example, index) => (
                        <div key={index} className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300">
                          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: example }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto mb-3">
                      {prep.sampleWords.slice(0, 4).map((word, index) => (
                        <span key={index} className={`bg-${prep.color}-100 text-${prep.color}-700 px-2 py-0.5 rounded-full text-sm font-medium`}>{word}</span>
                      ))}
                    </div>
                    <button onClick={() => { setSelectedItem(prep); setShowLearnMoreModal(true); }} className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-rose-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"><span>📚</span> Learn More <span>→</span></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="videos" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">🎥</span>
              Video Lessons
            </h2>
            <p className="text-gray-600 text-sm mb-5">Watch these helpful videos</p>
            <div className="grid md:grid-cols-2 gap-4">
              {videos.map(video => (
                <div key={video.id} className="bg-gradient-to-br from-rose-50 to-teal-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video bg-gray-900">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.embedId}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-base text-gray-800 mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Use prepositions to describe a scene</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">Write a short paragraph describing the location of objects in a room. Use at least five different prepositions.</p>
              </div>
              <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[150px]" placeholder="Type your paragraph here..." />
              <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3">
                {writingRevealed ? 'Hide' : 'Show'} Sample Answer
              </button>
              {writingRevealed && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answer:</h4>
                  <p className="text-sm text-gray-700">The cat is sleeping <strong>on</strong> the sofa. A lamp stands <strong>beside</strong> the chair, and a painting hangs <strong>above</strong> the fireplace. The remote is <strong>under</strong> the cushion, and a book is <strong>in</strong> the bookshelf.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-5 md:p-6 border border-teal-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Find the prepositions in the passage</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Passage:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  The team will meet <strong className="text-blue-600">at</strong> the cafe <strong className="text-blue-600">on</strong> the corner. They will walk <strong className="text-purple-600">through</strong> the park and go <strong className="text-purple-600">over</strong> the bridge.
                </p>
              </div>
              <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                {readingRevealed ? 'Hide' : 'Show'} Prepositions
              </button>
              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Prepositions Identified:</h4>
                  <p className="text-gray-700">at, on, through, over</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="quiz" className="mb-16 scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">🎯</span>
              Quiz Practice
            </h2>
            <p className="text-sm text-gray-600 mb-4">Test your knowledge of prepositions.</p>
            <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); setSingleQuestionMode(false); }} className="inline-block bg-gradient-to-r from-teal-600 to-rose-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
              ▶️ Start Full Quiz
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {interactiveQuiz.map((question, qIndex) => (
              <div key={question.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setModalQuizAnswers({}); setSingleQuestionMode(true); }} className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-400 cursor-pointer transition-all duration-200 transform hover:scale-105">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">Q{question.id}</span>
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">{question.emoji}</span>
                  <p className="text-xs font-semibold text-gray-700 line-clamp-2">{question.question}</p>
                </div>
                <div className="text-xs text-blue-600 font-medium">Click to attempt</div>
              </div>
            ))}
          </div>
        </section>

        {showQuizModal && (
          <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
              {!singleQuestionMode && (
                <div className="h-1.5 bg-slate-100">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-rose-500" style={{ width: `${((currentQuestionIndex + 1) / interactiveQuiz.length) * 100}%` }} />
                </div>
              )}
              <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    {singleQuestionMode ? 'Practice Question' : `Question ${currentQuestionIndex + 1} of ${interactiveQuiz.length}`}
                  </p>
                </div>
                <button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700" title="Close quiz">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {currentQuestionIndex < interactiveQuiz.length ? (
                <div className="p-6 md:p-8">
                  {(() => {
                    const question = interactiveQuiz[currentQuestionIndex];
                    const answered = modalQuizAnswers[question.id];
                    return (
                      <div className="space-y-5">
                        <div className="flex items-start gap-3">
                          <span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span>
                          <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">{question.question}</h4>
                        </div>
                        {!answered && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg">
                            <p className="text-xs md:text-sm text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p>
                          </div>
                        )}
                        <div className="space-y-2.5">
                          {question.options.map((option, index) => (
                            <button key={index} onClick={() => { if (!answered) { const isCorrect = index === question.correct; setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: isCorrect } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered ? (index === question.correct ? 'bg-green-50 border-green-400' : answered.selected === index ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200') : 'bg-white border-slate-300 hover:border-blue-400'}`}>
                              <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 ${answered ? (index === question.correct ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200') : 'bg-blue-100 text-blue-600'}`}>{String.fromCharCode(65 + index)}</span>
                                <span className="flex-1 text-sm md:text-base">{option}</span>
                                {answered && index === question.correct && <span className="text-lg">✅</span>}
                                {answered && answered.selected === index && index !== question.correct && <span className="text-lg">❌</span>}
                              </div>
                            </button>
                          ))}
                        </div>
                        {answered && (
                          <div className={`p-4 rounded-lg border-l-4 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
                            <p className="font-bold">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</p>
                            <p className="text-sm text-gray-700">{question.explanation}</p>
                          </div>
                        )}
                        {!singleQuestionMode && answered && (
                          <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                            <button onClick={() => setCurrentQuestionIndex(p => Math.max(0, p - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2.5 rounded-lg border bg-white">← Previous</button>
                            <button onClick={() => setCurrentQuestionIndex(p => p + 1)} disabled={currentQuestionIndex === interactiveQuiz.length - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white">Next →</button>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="p-6 md:p-8 text-center">
                  <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                  <div className="flex gap-2.5 pt-4 border-t mt-4">
                    <button onClick={() => setShowQuizModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border bg-white">Close</button>
                    <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white">Restart</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5">🔗 Additional Resources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <a href="https://www.englishclub.com/grammar/prepositions.htm" target="_blank" rel="noopener noreferrer" className="bg-blue-50 rounded-lg p-4 border border-blue-200 hover:shadow-md">
                <h3 className="font-semibold text-blue-700">Grammar Guide</h3>
                <p className="text-sm text-gray-600">In-depth guide to prepositions.</p>
              </a>
              <a href="https://www.eslgamesplus.com/prepositions-of-place-esl-fun-game-online/" target="_blank" rel="noopener noreferrer" className="bg-green-50 rounded-lg p-4 border border-green-200 hover:shadow-md">
                <h3 className="font-semibold text-green-700">Interactive Game</h3>
                <p className="text-sm text-gray-600">Practice prepositions of place.</p>
              </a>
              <a href="https://www.perfect-english-grammar.com/prepositions-of-time-exercise-1.html" target="_blank" rel="noopener noreferrer" className="bg-purple-50 rounded-lg p-4 border border-purple-200 hover:shadow-md">
                <h3 className="font-semibold text-purple-700">Worksheets</h3>
                <p className="text-sm text-gray-600">Downloadable exercises.</p>
              </a>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready for More?</h3>
          <p className="text-sm mb-4 text-blue-100">Continue your grammar journey!</p>
          <button onClick={() => navigate('/modules/grammar-hub')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
            Grammar Hub
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
      
      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMoreModal} 
        onClose={() => setShowLearnMoreModal(false)} 
        selectedItem={selectedItem}
        title="Prepositions"
      />
    </div>
  );
}
