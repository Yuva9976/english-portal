import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

const AdjectivesDetail = () => {
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
    { id: 'types', name: 'Types', icon: '🎨' },
    { id: 'rules', name: 'Rules', icon: '⚙️' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const types = [
    { id: 1, type: 'Descriptive', icon: '🎨', color: 'purple', definition: 'Describe qualities: color, size, shape.', examples: ['a <strong>small</strong> dog', 'an <strong>old</strong> book'], sampleWords: ['small', 'beautiful', 'blue'] },
    { id: 2, type: 'Quantitative', icon: '🔢', color: 'blue', definition: 'Show amount or number.', examples: ['<strong>many</strong> people', '<strong>few</strong> options'], sampleWords: ['many', 'few', 'several'] },
    { id: 3, type: 'Demonstrative', icon: '👉', color: 'green', definition: 'Point out which one: this/that/these/those.', examples: ['<strong>this</strong> book', '<strong>those</strong> chairs'], sampleWords: ['this', 'that', 'these'] },
    { id: 4, type: 'Possessive', icon: '🎁', color: 'teal', definition: 'Show ownership: my/your/his/her/its/our/their.', examples: ['<strong>my</strong> car', '<strong>her</strong> idea'], sampleWords: ['my', 'your', 'their'] }
  ];

  const tips = [
    { icon: '✅', type: 'DO', text: 'Place adjectives before the noun they modify.', color: 'green' },
    { icon: '❌', type: "DON'T", text: 'Don\'t use too many adjectives — prefer clarity.', color: 'red' }
  ];

  const videos = [
    { id: 1, title: 'Adjectives Explained', embedId: 'dQw4w9WgXcQ', description: 'Basic adjective uses and examples.' }
  ];

  const interactiveQuiz = [
    { id: 1, type: 'multiple-choice', emoji: '🎯', question: 'Choose the adjective: "The sky is ___"', hint: 'Look for a describing word', options: ['run', 'blue', 'quickly', 'happily'], correct: 1, explanation: '"Blue" describes the sky.' },
    { id: 2, type: 'multiple-choice', emoji: '🔢', question: 'Which is a quantitative adjective?', hint: 'Shows number or amount', options: ['fast', 'many', 'blue', 'loud'], correct: 1, explanation: '"Many" shows quantity.' }
  ];

  const scrollToSection = (id) => { setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

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
      {/* Compact Sticky Header (Noun/Pronoun-style) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2" title="Back">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">🖌️</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Adjectives</h1>
            <span className="text-base text-teal-600 ml-2">Describe and give detail to nouns</span>
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
            <div className="flex items-start gap-2 md:gap-3 mb-2"><span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0"><h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is an adjective?</h2></div>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">An <strong>adjective</strong> modifies a noun to add detail or limit reference (which one, what kind, how many).</p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5"><p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p><p className="text-xs text-slate-600 leading-tight mt-0.5">Adds clarity and color to writing.</p></div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5"><p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p><p className="text-xs text-slate-600 leading-tight mt-0.5">Order: opinion-size-age-shape-color-origin-material-purpose noun</p></div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center tracking-tight">
              <span className="text-lg mr-2">🎨</span>
              <span className="text-xl font-bold text-gray-800">Types of Adjectives</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {types.map((type) => (
                <div
                  key={type.id}
                  className={`relative rounded-2xl shadow-xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/70 border border-${type.color || 'teal'}-200 hover:border-${type.color || 'teal'}-400 hover:shadow-2xl hover:ring-2 hover:ring-${type.color || 'teal'}-300`}
                  style={{ borderTop: `4px solid var(--tw-color-${type.color || 'teal'}-400)` }}
                >
                  <div className="absolute top-3 right-3 opacity-10 text-4xl pointer-events-none select-none">
                    {type.icon}
                  </div>
                  <div className="flex items-center gap-2 px-4 pt-5 pb-2 z-10">
                    <span className={`text-2xl drop-shadow-lg`} style={{ color: `var(--tw-color-${type.color || 'teal'}-500)` }}>{type.icon}</span>
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight drop-shadow">{type.type}</h3>
                  </div>
                  <div className="px-4 pb-5 flex-1 flex flex-col z-10">
                    <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium bg-white/80 rounded-lg px-2 py-1 shadow-sm">{type.definition}</p>
                    <div className="space-y-2 mb-3">
                      {type.examples.slice(0, 2).map((example, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r from-${type.color || 'teal'}-50 to-blue-50 px-3 py-2 rounded-lg border border-${type.color || 'teal'}-100 shadow group-hover:scale-[1.02] group-hover:border-${type.color || 'teal'}-300 transition-all`}
                        >
                          <p
                            className="text-base text-gray-700 font-medium"
                            dangerouslySetInnerHTML={{ __html: example }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {type.sampleWords.slice(0, 4).map((word, index) => (
                        <span
                          key={index}
                          className={`bg-gradient-to-r from-${type.color || 'teal'}-200 to-blue-200 text-${type.color || 'teal'}-700 px-3 py-1 rounded-full text-sm font-bold border border-${type.color || 'teal'}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => { setSelectedItem(type); setShowLearnMoreModal(true); }}
                      className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2 rounded-xl font-bold text-base shadow hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.03] group-hover:ring-2 group-hover:ring-teal-400"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-md p-5 md:p-6 border border-yellow-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="text-2xl mr-2">🌟</span>Pro Tips & Common Mistakes</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">{tips.map((tip,idx)=>(<div key={idx} className={`bg-${tip.color}-50 border-l-4 border-${tip.color}-500 p-3 rounded-r-lg`}><div className="flex items-start gap-2"><span className="text-xl flex-shrink-0">{tip.icon}</span><div><span className={`font-semibold text-${tip.color}-700 block mb-0.5 text-sm`}>{tip.type}</span><p className="text-gray-700 text-sm">{tip.text}</p></div></div></div>))}</div>
          </div>
        </section>

        <section id="videos" className="mb-12 scroll-mt-32"><div className="bg-white rounded-xl shadow-md p-6"><h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">🎥</span>Video Lessons</h2><p className="text-gray-600 text-sm mb-5">Short lessons to reinforce usage</p><div className="grid md:grid-cols-2 gap-4">{videos.map(video=> (<div key={video.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"><div className="aspect-video bg-gray-900"><iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.embedId}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div><div className="p-3"><h3 className="font-semibold text-base text-gray-800 mb-1">{video.title}</h3><p className="text-sm text-gray-600">{video.description}</p></div></div>))}</div></div></section>

        <section id="writing" className="mb-12 scroll-mt-32"><div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300"><h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">✍️</span>Writing Exercise</h2><p className="text-gray-600 text-sm mb-4">Practice choosing clear, natural modifiers</p><div className="bg-white rounded-lg p-4 shadow-sm"><div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4"><h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3><p className="text-gray-700 text-sm">Write five short sentences using different adjective types and order them naturally.</p></div><textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[200px]" placeholder={"Type your sentences here...\n\nExample:\n1. The small brown dog barked loudly."} /><div className="flex gap-3 flex-wrap"><button onClick={() => setWritingRevealed(!writingRevealed)} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">{writingRevealed ? 'Hide' : 'Show'} Sample Answer</button><button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit for Review</button></div>{writingRevealed && (<div className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-6 animate-fade-in"><h4 className="font-bold text-gray-800 mb-4">📋 Sample Answer:</h4><ol className="space-y-3 list-decimal list-inside text-gray-700"><li>The <span className="font-semibold">old</span> house looked charming.</li><li>She bought <span className="font-semibold">three</span> red apples.</li><li>I prefer the <span className="font-semibold">quiet</span> corner for study.</li></ol></div>)}</div></div></section>

        <section id="reading" className="mb-12 scroll-mt-32"><div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 md:p-6 border border-blue-300"><h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">📚</span>Reading Exercise</h2><p className="text-gray-600 text-sm mb-4">Identify adjectives and their roles in context</p><div className="bg-white rounded-lg p-4 shadow-sm"><div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4"><h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Read this passage:</h3><p className="text-gray-700 text-base leading-relaxed">The <strong className="text-purple-600">ancient</strong> tree stood beside a <strong className="text-blue-600">quiet</strong> pond. Its <strong className="text-pink-600">mossy</strong> trunk showed <strong className="text-orange-600">many</strong> years of weather.</p></div><button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">{readingRevealed ? 'Hide' : 'Show'} Adjective Highlights</button>{readingRevealed && (<div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in"><h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Adjectives Identified:</h4><div className="grid sm:grid-cols-2 gap-2 text-sm"><div className="bg-purple-100 p-2 rounded"><span className="font-semibold text-purple-700">Descriptive:</span><p className="text-gray-700">ancient, mossy</p></div><div className="bg-blue-100 p-2 rounded"><span className="font-semibold text-blue-700">Quantitative:</span><p className="text-gray-700">many</p></div></div></div>)}</div></div></section>

        <section id="quiz" className="mb-16 scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center justify-center mb-3"><span className="text-3xl mr-3">🎯</span>Quiz Practice</h2>
            <p className="text-base text-gray-600 mb-4">Try short practice questions below</p>
            <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); setSingleQuestionMode(false); }} className="inline-block bg-gradient-to-r from-teal-500 to-rose-400 text-white font-bold py-3 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">▶️ Start Full Quiz</button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {interactiveQuiz.map((q, qIndex) => {
              const answered = modalQuizAnswers[q.id];
              return (
                <div key={q.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setSingleQuestionMode(true); setModalQuizAnswers({}); }} className="relative rounded-2xl shadow-xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/70 border border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:ring-2 hover:ring-blue-300 cursor-pointer">
                  <div className="absolute top-3 right-3 opacity-10 text-3xl pointer-events-none select-none">
                    {q.emoji}
                  </div>
                  <div className="flex items-center gap-2 px-4 pt-5 pb-2 z-10">
                    <span className="text-xl drop-shadow-lg text-blue-500">{q.emoji}</span>
                    <span className="font-bold text-gray-800 tracking-tight drop-shadow">Q{q.id}</span>
                  </div>
                  <div className="px-4 pb-5 flex-1 flex flex-col z-10">
                    <p className="text-base text-gray-700 font-medium mb-3">{q.question}</p>
                    {!answered ? (
                      <div className="text-xs text-blue-600 font-medium">Click to attempt</div>
                    ) : (
                      <div className={`text-xs font-medium p-1.5 rounded ${answered.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>{answered.correct ? 'Correct!' : 'Try again'}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {showQuizModal && (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                {!singleQuestionMode && (<div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-teal-500 to-rose-500" style={{ width: `${((currentQuestionIndex + 1) / interactiveQuiz.length) * 100}%` }} /></div>)}
                <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                  <div>{!singleQuestionMode ? (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Question {currentQuestionIndex + 1} of {interactiveQuiz.length}</p>) : (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Practice Question</p>)}</div>
                  <div className="flex items-center gap-4 md:gap-6"><button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700" title="Close quiz"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
                </div>
                {currentQuestionIndex < interactiveQuiz.length ? (
                  <div className="p-6 md:p-8">
                    {(() => {
                      const question = interactiveQuiz[currentQuestionIndex];
                      const answered = modalQuizAnswers[question.id];
                      return (
                        <div className="space-y-5">
                          <div className="space-y-2"><div className="flex items-start gap-3"><span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span><h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">{question.question}</h4></div></div>
                          {!answered && (<div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg"><p className="text-xs md:text-sm text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p></div>)}
                          <div className="space-y-2.5">{question.options.map((option, index) => (<button key={index} onClick={() => { if (!answered) { const isCorrect = index === question.correct; setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: isCorrect } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered ? index === question.correct ? 'bg-green-50 border-green-400 shadow-sm' : answered.selected === index ? 'bg-red-50 border-red-400 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'}`}><div className="flex items-center gap-3"><span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${answered ? index === question.correct ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'}`}>{String.fromCharCode(65 + index)}</span><span className="flex-1 text-sm md:text-base text-slate-700 group-hover:text-slate-800">{option}</span>{answered && index === question.correct && <span className="text-lg">✅</span>}{answered && answered.selected === index && index !== question.correct && <span className="text-lg">❌</span>}</div></button>))}</div>
                          {answered && (<div className={`p-4 rounded-lg border-l-4 mb-6 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm text-gray-800 mb-2"><span className="font-bold">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</span></p><p className="text-sm text-gray-700 leading-relaxed mb-3">{question.explanation}</p></div>)}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="p-6 md:p-8 text-center space-y-5">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800">🎊 Quiz Complete!</h3>
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => setShowQuizModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 transition-colors">Close</button><button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg transition-all">🔄 Restart Quiz</button></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section id="resources" className="mb-12 scroll-mt-32"><div className="bg-white rounded-xl shadow-md p-6"><h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">🔗</span>Additional Resources</h2><p className="text-gray-600 text-sm mb-5">Explore more materials to master adjectives</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{[{ title: 'Adjective Order Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/adjectives-order.htm', color: 'blue' }].map((resource, index) => (<a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className={`bg-gradient-to-br from-${resource.color}-50 to-${resource.color}-100 rounded-lg p-4 border border-${resource.color}-300 hover:shadow-md transition-all`}><span className="text-2xl block mb-2">{resource.icon}</span><h3 className={`font-semibold text-${resource.color}-700 text-base mb-1`}>{resource.title}</h3><p className="text-sm text-gray-600">Explore →</p></a>))}</div></div></section>

        <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-rose-400 rounded-2xl shadow-xl p-8 text-white text-center mt-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
            <span className="text-3xl">🎓</span>
            Ready for More?
          </h3>
          <p className="text-base mb-4 text-teal-100">Try quizzes and exercises to sharpen adjective skills.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/modules/grammar-hub')} className="bg-white text-teal-600 px-8 py-3 rounded-xl font-semibold hover:bg-teal-50 transition-colors shadow-xl">Grammar Hub</button>
            <button onClick={() => navigate('/modules/learn-english')} className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors shadow-xl">All Lessons</button>
          </div>
        </div>
      </div>

      <style>{`@keyframes fade-in {from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);} } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
      
      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMoreModal} 
        onClose={() => setShowLearnMoreModal(false)} 
        selectedItem={selectedItem}
        title="Adjectives"
      />
    </div>
  );
};

export default AdjectivesDetail;
