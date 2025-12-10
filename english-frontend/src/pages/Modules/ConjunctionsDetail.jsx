import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

export default function ConjunctionsDetail() {
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
    { id: 'types', name: 'Types', icon: '🔗' },
    { id: 'rules', name: 'Rules', icon: '⚖️' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const conjunctionTypes = [
    { id: 1, type: 'Coordinating', icon: '🤝', color: 'blue', definition: 'Connect words, phrases, or independent clauses of equal rank.', examples: ['I like tea <strong>and</strong> coffee.', 'She is smart, <strong>but</strong> lazy.'], sampleWords: ['and', 'but', 'or', 'nor', 'for', 'so', 'yet'] },
    { id: 2, type: 'Subordinating', icon: '↘️', color: 'green', definition: 'Introduce a dependent clause and connect it to an independent clause.', examples: ['He left <strong>because</strong> he was tired.', '<strong>Although</strong> it was raining, we went out.'], sampleWords: ['because', 'since', 'while', 'although', 'if', 'unless', 'after'] },
    { id: 3, type: 'Correlative', icon: '🔄', color: 'purple', definition: 'Pairs of conjunctions that work together to connect two balanced elements.', examples: ['<strong>Either</strong> you go, <strong>or</strong> I will.', 'She is <strong>not only</strong> smart <strong>but also</strong> funny.'], sampleWords: ['either/or', 'neither/nor', 'not only/but also', 'both/and'] },
  ];

  const rules = [
    { icon: '✅', title: 'Tips', color: 'green', points: [
      'Use a comma before coordinating conjunctions in compound sentences.',
      'Match the conjunction type to the relationship you want to show.',
      'Correlative conjunctions must be used in pairs.'
    ] },
    { icon: '❌', title: 
      
      "DON'Ts", color: 'red', points: [
      'Don\'t use a comma before subordinating conjunctions at the start of a sentence.',
      'Don\'t mix up correlative pairs (e.g., "either...and").',
      'Don\'t overuse conjunctions in one sentence.'
    ] }
  ];

  const videos = [
    { id: 1, title: 'Coordinating Conjunctions (FANBOYS)', embedId: 'RPoBE-E8VOc', description: 'A simple explanation of the seven coordinating conjunctions.' },
    { id: 2, title: 'Subordinating & Correlative Conjunctions', embedId: 'SbiwGdBzO2c', description: 'Learn how to use more complex conjunctions.' }
  ];

  const interactiveQuiz = [
    { id: 1, emoji: '🤝', question: 'Which coordinating conjunction fits best: "I wanted to go to the beach, ___ it was raining."', hint: 'Think about a word that shows contrast.', options: ['and', 'so', 'but', 'for'], correct: 2, explanation: 'Correct! "But" is used to show a contrast between two ideas.' },
    { id: 2, emoji: '↘️', question: 'Which subordinating conjunction introduces a condition: "___ you study, you will pass the test."', hint: 'This word sets up a requirement.', options: ['Because', 'If', 'While', 'Although'], correct: 1, explanation: 'Excellent! "If" introduces a conditional clause.' },
    { id: 3, emoji: '🔄', question: 'Complete the correlative conjunction pair: "He is neither friendly ___ helpful."', hint: 'This is a negative pairing.', options: ['or', 'and', 'but', 'nor'], correct: 3, explanation: 'Great! "Neither" is always paired with "nor".' },
    { id: 4, emoji: '🤝', question: 'Identify the conjunction type in: "She is smart and kind."', hint: 'It connects two words of equal importance.', options: ['Subordinating', 'Correlative', 'Coordinating'], correct: 2, explanation: 'Perfect! "And" is a coordinating conjunction.' },
    { id: 5, emoji: '↘️', question: 'Choose the best conjunction: "I will wait here ___ you get back."', hint: 'This word indicates a duration of time.', options: ['until', 'because', 'if', 'so'], correct: 0, explanation: 'Fantastic! "Until" specifies how long the action will last.' }
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
            <span className="text-2xl md:text-3xl">🔗</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Conjunctions</h1>
            <span className="text-base text-teal-600 ml-2">The joining words of English</span>
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
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is a Conjunction?</h2>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              A <strong>conjunction</strong> is a word used to connect words, phrases, or clauses in a sentence. They are essential for creating complex and fluent sentences.
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Builds sophisticated sentence structures.</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Coordinating conjunctions can be remembered with the acronym FANBOYS.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <span className="text-3xl mr-2">🎨</span>
            Types of Conjunctions
          </h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {conjunctionTypes.map((conj) => (
              <div key={conj.id} className={`relative rounded-3xl shadow-2xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/60 backdrop-blur-lg border border-${conj.color}-200 hover:border-${conj.color}-400 hover:shadow-[0_8px_32px_0_rgba(168,139,250,0.15)] hover:ring-2 hover:ring-${conj.color}-300`} style={{ borderTop: `6px solid var(--tw-color-${conj.color}-400)` }}>
                <div className="absolute top-4 right-4 opacity-10 text-7xl pointer-events-none select-none">{conj.icon}</div>
                <div className="flex items-center gap-3 px-7 pt-8 pb-4 z-10">
                  <span className={`text-4xl drop-shadow-lg`} style={{ color: `var(--tw-color-${conj.color}-500)` }}>{conj.icon}</span>
                  <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight drop-shadow">{conj.type} Conjunctions</h3>
                </div>
                <div className="px-7 pb-8 flex-1 flex flex-col z-10">
                  <p className="text-base text-gray-700 leading-relaxed mb-5 font-semibold bg-white/70 rounded-xl px-3 py-2 shadow-sm">{conj.definition}</p>
                  <div className="space-y-4 mb-5">
                    {conj.examples.slice(0, 2).map((example, index) => (
                      <div key={index} className={`bg-gradient-to-r from-${conj.color}-50 to-blue-50 px-5 py-3 rounded-xl border border-${conj.color}-100 shadow group-hover:scale-[1.03] group-hover:border-${conj.color}-300 transition-all`}>
                        <p className="text-base text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: example }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 mb-5">
                    {conj.sampleWords.slice(0, 4).map((word, idx) => (
                      <span key={idx} className={`bg-gradient-to-r from-${conj.color}-200 to-blue-200 text-${conj.color}-700 px-5 py-2 rounded-full text-base font-bold border border-${conj.color}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}>{word}</span>
                    ))}
                  </div>
                  <button onClick={() => { setSelectedItem(conj); setShowLearnMoreModal(true); }} className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.04] group-hover:ring-2 group-hover:ring-teal-400">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="rules" className="mb-12 scroll-mt-32">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center">
            <span className="text-2xl mr-2">⚖️</span>
            Common Rules & Mistakes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {rules.map(rule => (
              <div key={rule.title} className={`bg-${rule.color}-50 border-l-4 border-${rule.color}-500 p-4 rounded-lg shadow-sm`}>
                <h3 className={`font-semibold text-${rule.color}-700 mb-2 flex items-center`}><span className="mr-2">{rule.icon}</span>{rule.title}</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {rule.points.map((pt, i) => <li key={i}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Practice
            </h2>
            <p className="text-gray-600 text-sm mb-4">Combine sentences using conjunctions</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">Combine the following pairs of sentences into one sentence using an appropriate conjunction (and, but, so, because, although).</p>
                 <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
                    <li>The sun was shining. It was cold outside.</li>
                    <li>She studied hard. She passed the exam.</li>
                </ul>
              </div>
              <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[100px]" placeholder="Type your combined sentences here..." />
              <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3">
                {writingRevealed ? 'Hide' : 'Show'} Sample Answers
              </button>
              {writingRevealed && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answers:</h4>
                  <p className="text-sm text-gray-700">The sun was shining, <strong>but</strong> it was cold outside.</p>
                  <p className="text-sm text-gray-700 mt-1">She studied hard, <strong>so</strong> she passed the exam.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 md:p-6 border border-blue-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Find the conjunctions in the passage</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Passage:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  I went to the store, <strong className="text-blue-600">but</strong> I forgot to buy milk. <strong className="text-purple-600">Although</strong> it was late, I had to go back <strong className="text-green-600">because</strong> we needed it for breakfast.
                </p>
              </div>
              <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                {readingRevealed ? 'Hide' : 'Show'} Conjunctions
              </button>
              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Conjunctions Identified:</h4>
                  <p className="text-gray-700">but, Although, because</p>
                </div>
              )}
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
                <div key={video.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
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

        <section id="quiz" className="mb-16 scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">🎯</span>
              Quiz Practice
            </h2>
            <p className="text-sm text-gray-600 mb-4">Test your knowledge of conjunctions.</p>
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
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${((currentQuestionIndex + 1) / interactiveQuiz.length) * 100}%` }} />
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
              <a href="https://www.grammarly.com/blog/conjunctions/" target="_blank" rel="noopener noreferrer" className="bg-blue-50 rounded-lg p-4 border border-blue-200 hover:shadow-md">
                <h3 className="font-semibold text-blue-700">Grammarly Guide</h3>
                <p className="text-sm text-gray-600">A comprehensive guide to conjunctions.</p>
              </a>
              <a href="https://www.englishclub.com/grammar/conjunctions-quiz.htm" target="_blank" rel="noopener noreferrer" className="bg-green-50 rounded-lg p-4 border border-green-200 hover:shadow-md">
                <h3 className="font-semibold text-green-700">Interactive Quiz</h3>
                <p className="text-sm text-gray-600">Test your knowledge with more questions.</p>
              </a>
              <a href="https://www.gingersoftware.com/content/grammar-rules/conjunctions/" target="_blank" rel="noopener noreferrer" className="bg-purple-50 rounded-lg p-4 border border-purple-200 hover:shadow-md">
                <h3 className="font-semibold text-purple-700">Ginger Software</h3>
                <p className="text-sm text-gray-600">Rules and examples for conjunctions.</p>
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
        title="Conjunctions"
      />
    </div>
  );
}
