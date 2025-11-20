import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InterjectionsDetail() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'types', name: 'Types', icon: '🎉' },
    { id: 'tips', name: 'Tips', icon: '💡' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const interjectionTypes = [
    { id: 1, type: 'Greetings', icon: '👋', color: 'blue', definition: 'Used to greet someone.', examples: ['<strong>Hello!</strong> How are you?', '<strong>Hi!</strong> Nice to meet you.'], sampleWords: ['Hello', 'Hi', 'Hey'] },
    { id: 2, type: 'Joy', icon: '😄', color: 'green', definition: 'Express happiness or excitement.', examples: ['<strong>Wow!</strong> That is amazing.', '<strong>Hooray!</strong> We won.'], sampleWords: ['Wow', 'Hooray', 'Yay'] },
    { id: 3, type: 'Surprise', icon: '😮', color: 'purple', definition: 'Show astonishment or surprise.', examples: ['<strong>Oh!</strong> I did not see you there.', '<strong>What!</strong> You are kidding.'], sampleWords: ['Oh', 'What', 'Gosh'] },
    { id: 4, type: 'Pain/Sorrow', icon: '😢', color: 'orange', definition: 'Express pain, grief, or sadness.', examples: ['<strong>Ouch!</strong> That hurt.', '<strong>Alas!</strong> He is gone.'], sampleWords: ['Ouch', 'Alas', 'Oh no'] },
  ];

  const tips = [
    { icon: '💡', title: 'Pro Tips', color: 'green', points: [
      'Use interjections to add emotion and personality to your writing.',
      'Most interjections are followed by an exclamation mark (!).',
      'Keep interjections short and clear.'
    ] },
    { icon: '❌', title: 'Common Mistakes', color: 'red', points: [
      'Don\'t overuse interjections—they lose impact.',
      'Don\'t use interjections in formal writing.',
      'Don\'t forget the exclamation mark for strong feelings.'
    ] }
  ];

  const videos = [
    { id: 1, title: 'What Are Interjections?', embedId: 'wD82a4nC3sw', description: 'A quick and fun guide to understanding interjections.' },
    { id: 2, title: 'Using Interjections in English', embedId: 'y-JM9ahz-aA', description: 'Learn how to use interjections to show emotion.' }
  ];

  const interactiveQuiz = [
    { id: 1, emoji: '👋', question: 'Which interjection is used for greeting: "___! Welcome to our home."', hint: 'Think of a common friendly greeting.', options: ['Wow', 'Hello', 'Ouch', 'Alas'], correct: 1, explanation: 'Correct! "Hello" is a standard interjection for greeting someone.' },
    { id: 2, emoji: '😄', question: 'Which interjection expresses joy: "___! We are going on vacation!"', hint: 'This word shows excitement.', options: ['Oh no', 'Hooray', 'Well', 'Hmm'], correct: 1, explanation: 'Excellent! "Hooray" is used to express joy and excitement.' },
    { id: 3, emoji: '😮', question: 'Identify the interjection for surprise: "___! I can\'t believe you did that!"', hint: 'This shows astonishment.', options: ['What', 'Hi', 'Yay', 'Ouch'], correct: 0, explanation: 'Great! "What!" can be used as an interjection to express surprise or disbelief.' },
    { id: 4, emoji: '😢', question: 'Which interjection shows pain: "___! I stubbed my toe."', hint: 'This is a common exclamation when you get hurt.', options: ['Hey', 'Wow', 'Ouch', 'Gosh'], correct: 2, explanation: 'Perfect! "Ouch" is the classic interjection for expressing sudden pain.' },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button onClick={() => navigate(-1)} className="mb-3 flex items-center space-x-1 text-white hover:text-blue-100 transition-colors text-sm">
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">😮</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Interjections</h1>
                <p className="text-sm md:text-base text-blue-100">Words that express strong emotion</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${activeSection === section.id ? 'bg-white text-blue-600 shadow-md' : 'bg-blue-500 bg-opacity-40 text-white hover:bg-opacity-60'}`}>
                  <span className="mr-1">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section id="overview" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is an Interjection?</h2>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              An <strong>interjection</strong> is a word or phrase that expresses a strong feeling or sudden emotion. They are often followed by an exclamation mark.
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Adds emotion and personality to writing.</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Interjections are not grammatically connected to the rest of the sentence.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <span className="text-3xl mr-2">🎨</span>
            Types of Interjections
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {interjectionTypes.map((interj) => (
              <div key={interj.id} className={`bg-gradient-to-br from-${interj.color}-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-${interj.color}-200 overflow-hidden flex flex-col h-full`}>
                <div className={`bg-gradient-to-r from-${interj.color}-100 to-${interj.color}-50 px-4 py-3 border-b-2 border-${interj.color}-200`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{interj.icon}</span>
                    <h3 className={`text-base font-bold text-${interj.color}-800`}>{interj.type}</h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{interj.definition}</p>
                  <div className="space-y-1.5 mb-3">
                    {interj.examples.slice(0, 2).map((example, index) => (
                      <div key={index} className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300">
                        <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: example }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {interj.sampleWords.slice(0, 3).map((word, index) => (
                      <span key={index} className={`bg-${interj.color}-100 text-${interj.color}-700 px-2 py-0.5 rounded-full text-sm font-medium`}>{word}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tips" className="mb-12 scroll-mt-32">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Pro Tips & Common Mistakes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map(tip => (
              <div key={tip.title} className={`bg-${tip.color}-50 border-l-4 border-${tip.color}-500 p-4 rounded-lg shadow-sm`}>
                <h3 className={`font-semibold text-${tip.color}-700 mb-2 flex items-center`}><span className="mr-2">{tip.icon}</span>{tip.title}</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {tip.points.map((pt, i) => <li key={i}>{pt}</li>)}
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
            <p className="text-gray-600 text-sm mb-4">Write sentences using interjections</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">Write a sentence for each situation using an appropriate interjection:
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
                    <li>You see a beautiful sunset.</li>
                    <li>You accidentally drop a glass.</li>
                </ul>
                </p>
              </div>
              <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[100px]" placeholder="Type your sentences here..." />
              <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3">
                {writingRevealed ? 'Hide' : 'Show'} Sample Answers
              </button>
              {writingRevealed && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answers:</h4>
                  <p className="text-sm text-gray-700"><strong>Wow!</strong> The sunset is beautiful.</p>
                  <p className="text-sm text-gray-700 mt-1"><strong>Oops!</strong> I dropped the glass.</p>
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
            <p className="text-gray-600 text-sm mb-4">Find the interjections in the passage</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Passage:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  <strong className="text-blue-600">Hey!</strong> Are you coming with us? <strong className="text-purple-600">Oh,</strong> I did not know you were busy. <strong className="text-green-600">Well,</strong> maybe next time.
                </p>
              </div>
              <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                {readingRevealed ? 'Hide' : 'Show'} Interjections
              </button>
              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Interjections Identified:</h4>
                  <p className="text-gray-700">Hey!, Oh,, Well,</p>
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
            <p className="text-sm text-gray-600 mb-4">Test your knowledge of interjections.</p>
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
              <a href="https://www.grammarly.com/blog/interjection/" target="_blank" rel="noopener noreferrer" className="bg-blue-50 rounded-lg p-4 border border-blue-200 hover:shadow-md">
                <h3 className="font-semibold text-blue-700">Grammarly Guide</h3>
                <p className="text-sm text-gray-600">A detailed look at interjections.</p>
              </a>
              <a href="https://www.gingersoftware.com/content/grammar-rules/interjection/" target="_blank" rel="noopener noreferrer" className="bg-green-50 rounded-lg p-4 border border-green-200 hover:shadow-md">
                <h3 className="font-semibold text-green-700">Ginger Software</h3>
                <p className="text-sm text-gray-600">Examples and rules for using interjections.</p>
              </a>
              <a href="https://www.englishclub.com/grammar/interjections.htm" target="_blank" rel="noopener noreferrer" className="bg-purple-50 rounded-lg p-4 border border-purple-200 hover:shadow-md">
                <h3 className="font-semibold text-purple-700">English Club</h3>
                <p className="text-sm text-gray-600">Learn about different types of interjections.</p>
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
    </div>
  );
}
