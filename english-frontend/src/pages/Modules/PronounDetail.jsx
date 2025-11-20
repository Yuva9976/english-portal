import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';

const PronounDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const partId = 10; // Pronoun ID

  useEffect(() => {
    fetchPartData();
  }, []);

  const fetchPartData = async () => {
    try {
      setLoading(true);
      // Fetch part details (Pronouns)
      const partResponse = await grammarAPI.getPartDetails(partId);
      setApiData(partResponse.data);
      
      // Fetch quiz questions
      const quizResponse = await grammarAPI.getQuiz(partId);
      setQuizQuestions(quizResponse.data || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-rose-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Pronoun lesson...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="bg-gradient-to-r from-teal-600 to-rose-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center space-x-1 text-white hover:text-teal-100 transition-colors text-sm"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">{data.icon}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{data.name}</h1>
                <p className="text-sm md:text-base text-purple-100">Master {data.name.toLowerCase()} with examples and practice</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                    activeSection === section.id
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'bg-teal-500 bg-opacity-40 text-white hover:bg-opacity-60'
                  }`}
                >
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
          <div className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is a {data.name}?</h2>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              {data.definition}
            </p>

            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">{data.importance}</p>
              </div>
              <div className="bg-white border border-pink-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-pink-700">🎯 Key Point</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">{data.name}s reduce repetition and create fluency.</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🧭</span>
              Key {data.name} Topics
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {data.types.map((type) => (
                <div key={type.id} className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-teal-200 overflow-hidden flex flex-col h-full">
                  <div className="bg-gradient-to-r from-teal-100 to-teal-50 px-4 py-3 border-b-2 border-teal-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{type.icon}</span>
                      <h3 className="text-base font-bold text-purple-800">{type.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{type.description}</p>

                    <div className="space-y-1.5 mb-3">
                      {type.examples?.slice(0, 2).map((ex, i) => (
                        <div key={i} className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300">
                          <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: ex }} />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-auto">
                      {type.sample_words?.slice(0, 4).map((w, widx) => (
                        <span key={widx} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-sm font-medium">{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-md p-5 md:p-6 border border-yellow-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🌟</span>
              Pro Tips & Common Mistakes
            </h3>

            <div className="space-y-3">
              {data.rules.map((rule) => (
                <div key={rule.id} className={`bg-${rule.rule_type === 'do' ? 'green' : 'red'}-50 border-l-4 border-${rule.rule_type === 'do' ? 'green' : 'red'}-500 p-3 rounded-r-lg`}>
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{rule.icon}</span>
                    <div>
                      <span className={`font-semibold text-${rule.rule_type === 'do' ? 'green' : 'red'}-700 block mb-0.5 text-sm`}>{rule.title}</span>
                      <ul className="text-gray-700 text-sm space-y-1">
                        {rule.points.map((point, pidx) => (
                          <li key={pidx} className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {data.resources && data.resources.filter(r => r.resource_type === 'video').length > 0 && (
          <section id="videos" className="mb-12 scroll-mt-32">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center"><span className="text-2xl mr-2">🎥</span>Video Lessons</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {data.resources.filter(r => r.resource_type === 'video').slice(0, 2).map(video => (
                  <div key={video.id} className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-video bg-gray-900">
                      {video.video_embed_id ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.video_embed_id}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">Video unavailable</div>
                      )}
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
        )}

        {data.exercises && data.exercises.find(e => e.exercise_type === 'writing') && (
          <section id="writing" className="mb-12 scroll-mt-32">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="text-2xl mr-2">✍️</span>Writing Exercise</h2>

              <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                {data.exercises.filter(e => e.exercise_type === 'writing').map(exercise => (
                  <div key={exercise.id}>
                    <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 {exercise.title}</h3>
                      <p className="text-gray-700 text-sm">{exercise.prompt}</p>
                    </div>

                    <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[200px]" placeholder="Type your answer here..." />

                    <div className="flex gap-3 flex-wrap">
                      <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">{writingRevealed ? 'Hide' : 'Show'} Sample Answer</button>
                      <button onClick={() => setWritingSubmitted(true)} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit for Review</button>
                    </div>

                    {writingSubmitted && (<div className="mt-4 bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg animate-fade-in"><p className="text-teal-800 font-semibold">✓ Submitted! A teacher will review your work soon.</p></div>)}

                    {writingRevealed && (
                      <div className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-6 animate-fade-in">
                        <h4 className="font-bold text-gray-800 mb-4">📋 Sample Answer:</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{exercise.sample_answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.exercises && data.exercises.find(e => e.exercise_type === 'reading') && (
          <section id="reading" className="mb-12 scroll-mt-32">
            <div className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl shadow-md p-5 md:p-6 border border-teal-300">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center"><span className="text-2xl mr-2">📚</span>Reading Exercise</h2>

              <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                {data.exercises.filter(e => e.exercise_type === 'reading').map(exercise => (
                  <div key={exercise.id}>
                    <div className="bg-teal-100 border-l-4 border-teal-500 p-3 rounded-r-lg mb-4">
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 {exercise.title}</h3>
                      <p className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: exercise.passage }} />
                    </div>

                    <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                      {readingRevealed ? 'Hide' : 'Show'} Answer
                    </button>

                    {readingRevealed && (
                      <div className="bg-teal-50 border border-teal-300 rounded-lg p-4 animate-fade-in">
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Answer:</h4>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{exercise.sample_answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.quiz && data.quiz.length > 0 && (
          <section id="quiz" className="mb-16 scroll-mt-32">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-3"><span className="text-3xl mr-3">🎯</span>Quiz Practice</h2>

              <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); setSingleQuestionMode(false); }} className="inline-block bg-gradient-to-r from-teal-600 to-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">▶️ Start Full Quiz</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.quiz.map((question, qIndex) => {
                const answered = quizAnswers[question.id];
                return (
                  <div key={question.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setModalQuizAnswers({}); setSingleQuestionMode(true); }} className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-purple-400 cursor-pointer transition-all duration-200 transform hover:scale-105">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">Q{question.id}</span>
                      {answered && (<span className={`text-lg ${answered.correct ? '✅' : '❌'}`}></span>)}
                    </div>

                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-lg">{question.emoji}</span>
                      <p className="text-xs font-semibold text-gray-700 line-clamp-2">{question.question}</p>
                    </div>

                    {answered ? (<div className={`text-xs font-medium p-1.5 rounded ${answered.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>{answered.correct ? 'Correct!' : 'Try again'}</div>) : (<div className="text-xs text-purple-600 font-medium">Click to attempt</div>)}
                  </div>
                );
              })}
            </div>

            {showQuizModal && (
              <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                  {!singleQuestionMode && (
                    <div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-teal-500 to-rose-500 transition-all" style={{ width: `${((currentQuestionIndex + 1) / data.quiz.length) * 100}%` }} /></div>
                  )}

                  <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                    <div>{!singleQuestionMode ? (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Question {currentQuestionIndex + 1} of {data.quiz.length}</p>) : (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Practice Question</p>)}</div>
                    <div className="flex items-center gap-4 md:gap-6">
                      {!singleQuestionMode && (<div className="text-right"><div className="text-lg md:text-xl font-bold text-purple-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div><div className="text-xs text-slate-500">points</div></div>)}
                      <button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700" title="Close quiz"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                  </div>

                  {currentQuestionIndex < data.quiz.length ? (
                    <div className="p-6 md:p-8">
                      {(() => {
                        const question = data.quiz[currentQuestionIndex];
                        const answered = modalQuizAnswers[question.id];
                        return (
                          <div className="space-y-5">
                            <div className="space-y-2">
                              <div className="flex items-start gap-3"><span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span><h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">{question.question}</h4></div>
                            </div>

                            {!answered && (<div className="bg-teal-50 border-l-4 border-teal-500 p-3 md:p-4 rounded-lg"><p className="text-xs md:text-sm text-teal-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p></div>)}

                            <div className="space-y-2.5">
                              {question.options.map((option, index) => (
                                <button key={index} onClick={() => { if (!answered) { const isCorrect = index === question.correct_answer; setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: isCorrect } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered ? index === question.correct_answer ? 'bg-green-50 border-green-400 shadow-sm' : answered.selected === index ? 'bg-red-50 border-red-400 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-white border-slate-300 hover:border-purple-400 hover:bg-purple-50 cursor-pointer'}`}>
                                  <div className="flex items-center gap-3"><span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${answered ? index === question.correct_answer ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-600' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'}`}>{String.fromCharCode(65 + index)}</span><span className="flex-1 text-sm md:text-base text-slate-700 group-hover:text-slate-800">{option}</span>{answered && index === question.correct_answer && <span className="text-lg">✅</span>}{answered && answered.selected === index && index !== question.correct_answer && <span className="text-lg">❌</span>}</div>
                                </button>
                              ))}
                            </div>

                            {answered && (<div className={`p-4 rounded-lg border-l-4 mb-6 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm text-gray-800 mb-2"><span className="font-bold">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</span></p><p className="text-sm text-gray-700 leading-relaxed mb-3">{question.explanation}</p></div>)}

                            {!singleQuestionMode && answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">← Previous</button><button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={!answered || currentQuestionIndex === data.quiz.length - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm md:text-base hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">Next →</button></div>)}

                            {singleQuestionMode && answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg transition-all">← Back to Questions</button></div>)}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-6 md:p-8 text-center space-y-5">
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-800">{Object.keys(modalQuizAnswers).length === data.quiz.length ? '🎊 Quiz Complete!' : '⏸️ Quiz Paused'}</h3>
                      {Object.keys(modalQuizAnswers).length === data.quiz.length && (
                        <>
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 space-y-2">
                            <p className="text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wide">Final Score</p>
                            <div className="text-5xl md:text-6xl font-bold text-amber-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div>
                            <p className="text-base text-slate-700 font-medium">out of {data.quiz.length * 10} points</p>
                          </div>

                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200 text-center"><p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{Object.values(modalQuizAnswers).filter(a => a.correct).length}</p><p className="text-xs md:text-sm font-semibold text-slate-600">Correct</p></div>
                            <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-200 text-center"><p className="text-2xl md:text-3xl font-bold text-red-600 mb-1">{data.quiz.length - Object.values(modalQuizAnswers).filter(a => a.correct).length}</p><p className="text-xs md:text-sm font-semibold text-slate-600">Incorrect</p></div>
                            <div className="bg-teal-50 p-3 md:p-4 rounded-lg border border-teal-200 text-center"><p className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">{Math.round((Object.values(modalQuizAnswers).filter(a => a.correct).length / data.quiz.length) * 100)}%</p><p className="text-xs md:text-sm font-semibold text-slate-600">Accuracy</p></div>
                          </div>
                        </>
                      )}

                      <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
                        <button onClick={() => setShowQuizModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 transition-colors">Close</button>
                        <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg transition-all">🔄 Restart Quiz</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {data.resources && data.resources.length > 0 && (
          <section id="resources" className="mb-12 scroll-mt-32">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center"><span className="text-2xl mr-2">🔗</span>Additional Resources</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.resources.slice(0, 6).map((resource) => (
                  <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-300 hover:shadow-md transition-all">
                    <span className="text-2xl block mb-2">📖</span>
                    <h3 className="font-semibold text-purple-700 text-base mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600">Explore →</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="bg-gradient-to-r from-teal-600 to-rose-600 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready to practice?</h3>
          <p className="text-sm mb-4 text-purple-100">Try quizzes and exercises to sharpen your skills.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/modules/parts-of-speech')} className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors shadow-lg">All Parts</button>
            <button onClick={() => navigate('/modules/learn-english')} className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg">All Lessons</button>
          </div>
        </div>
      </div>

      <style jsx>{`@keyframes fade-in {from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);} } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
    </div>
  );
};

export default PronounDetail;
