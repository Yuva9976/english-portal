import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';

export default function GrammarDetailPage() {
  const navigate = useNavigate();
  const { partId } = useParams();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await grammarAPI.getPartDetails(partId);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load grammar data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (partId) {
      fetchData();
    }
  }, [partId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading grammar content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    ...(data.types?.length > 0 ? [{ id: 'types', name: 'Types', icon: '🎨' }] : []),
    ...(data.rules?.length > 0 ? [{ id: 'rules', name: 'Rules', icon: '⚖️' }] : []),
    ...(data.exercises?.length > 0 ? [{ id: 'exercises', name: 'Exercises', icon: '✍️' }] : []),
    ...(data.resources?.length > 0 ? [{ id: 'videos', name: 'Videos', icon: '🎥' }] : []),
    ...(data.quiz?.length > 0 ? [{ id: 'quiz', name: 'Quiz', icon: '🎯' }] : []),
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get rules grouped by type
  const doRules = data.rules?.filter(r => r.rule_type === 'do') || [];
  const dontRules = data.rules?.filter(r => r.rule_type === 'dont') || [];

  // Separate exercises by type
  const writingExercises = data.exercises?.filter(e => e.exercise_type === 'writing') || [];
  const readingExercises = data.exercises?.filter(e => e.exercise_type === 'reading') || [];

  // Get video resources
  const videoResources = data.resources?.filter(r => r.resource_type === 'video') || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button onClick={() => navigate(-1)} className="mb-3 flex items-center space-x-1 text-white hover:text-blue-100 transition-colors text-sm">
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">{data.icon}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{data.name}</h1>
                <p className="text-sm md:text-base text-blue-100">Learn about {data.name.toLowerCase()}</p>
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
        {/* Overview Section */}
        <section id="overview" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is a {data.name}?</h2>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              {data.definition}
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0 mt-3">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">{data.importance}</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">{data.name}s are fundamental to English grammar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Types Section */}
        {data.types && data.types.length > 0 && (
          <section id="types" className="mb-12 scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              Types of {data.name}s
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {data.types.map((type) => (
                <div key={type.id} className={`bg-gradient-to-br from-${type.color || 'blue'}-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-${type.color || 'blue'}-200 overflow-hidden flex flex-col h-full`}>
                  <div className={`bg-gradient-to-r from-${type.color || 'blue'}-100 to-${type.color || 'blue'}-50 px-4 py-3 border-b-2 border-${type.color || 'blue'}-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{type.icon}</span>
                      <h3 className={`text-base font-bold text-${type.color || 'blue'}-800`}>{type.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{type.description}</p>
                    {type.examples && type.examples.length > 0 && (
                      <div className="space-y-1.5 mb-3">
                        {type.examples.slice(0, 2).map((example, index) => (
                          <div key={index} className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300">
                            <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: example }} />
                          </div>
                        ))}
                      </div>
                    )}
                    {type.sample_words && type.sample_words.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {type.sample_words.slice(0, 4).map((word, index) => (
                          <span key={index} className={`bg-${type.color || 'blue'}-100 text-${type.color || 'blue'}-700 px-2 py-0.5 rounded-full text-sm font-medium`}>{word}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rules Section */}
        {data.rules && data.rules.length > 0 && (
          <section id="rules" className="mb-12 scroll-mt-32">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <span className="text-2xl mr-2">⚖️</span>
              Rules & Tips
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {doRules.length > 0 && (
                <div className={`bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm`}>
                  <h3 className={`font-semibold text-green-700 mb-2 flex items-center`}><span className="mr-2">✅</span>DOs</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {doRules[0]?.points?.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              )}
              {dontRules.length > 0 && (
                <div className={`bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm`}>
                  <h3 className={`font-semibold text-red-700 mb-2 flex items-center`}><span className="mr-2">❌</span>DON'Ts</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {dontRules[0]?.points?.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Exercises Section */}
        {data.exercises && data.exercises.length > 0 && (
          <section id="exercises" className="mb-12 scroll-mt-32">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Practice Exercises
            </h2>
            <div className="space-y-6">
              {writingExercises.map((exercise, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{exercise.title || 'Writing Practice'}</h3>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h4>
                      <p className="text-gray-700 text-sm">{exercise.prompt}</p>
                    </div>
                    <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[100px]" placeholder="Type your answer here..." />
                    <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3">
                      {writingRevealed ? 'Hide' : 'Show'} Sample Answer
                    </button>
                    {writingRevealed && (
                      <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answer:</h4>
                        <p className="text-sm text-gray-700">{exercise.sample_answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {readingExercises.map((exercise, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 md:p-6 border border-blue-300">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{exercise.title || 'Reading Exercise'}</h3>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">📖 Passage:</h4>
                      <p className="text-gray-700 text-base leading-relaxed">{exercise.passage}</p>
                    </div>
                    <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                      {readingRevealed ? 'Hide' : 'Show'} Answer
                    </button>
                    {readingRevealed && (
                      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                        <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Answer:</h4>
                        <p className="text-gray-700 text-sm">{exercise.sample_answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {videoResources && videoResources.length > 0 && (
          <section id="videos" className="mb-12 scroll-mt-32">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
                <span className="text-2xl mr-2">🎥</span>
                Video Lessons
              </h2>
              <p className="text-gray-600 text-sm mb-5">Watch these helpful videos</p>
              <div className="grid md:grid-cols-2 gap-4">
                {videoResources.map(video => (
                  <div key={video.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                    {video.video_embed_id ? (
                      <div className="aspect-video bg-gray-900">
                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.video_embed_id}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600">Video unavailable</span>
                      </div>
                    )}
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

        {/* Quiz Section */}
        {data.quiz && data.quiz.length > 0 && (
          <section id="quiz" className="mb-16 scroll-mt-32">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-3">
                <span className="text-3xl mr-3">🎯</span>
                Quiz Practice
              </h2>
              <p className="text-sm text-gray-600 mb-4">Test your knowledge</p>
              <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); setSingleQuestionMode(false); }} className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
                ▶️ Start Full Quiz
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.quiz.map((question, qIndex) => (
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
        )}

        {/* Quiz Modal */}
        {showQuizModal && data.quiz && data.quiz.length > 0 && (
          <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
              {!singleQuestionMode && (
                <div className="h-1.5 bg-slate-100">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${((currentQuestionIndex + 1) / data.quiz.length) * 100}%` }} />
                </div>
              )}
              <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    {singleQuestionMode ? 'Practice Question' : `Question ${currentQuestionIndex + 1} of ${data.quiz.length}`}
                  </p>
                </div>
                <button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700" title="Close quiz">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {currentQuestionIndex < data.quiz.length ? (
                <div className="p-6 md:p-8">
                  {(() => {
                    const question = data.quiz[currentQuestionIndex];
                    const answered = modalQuizAnswers[question.id];
                    return (
                      <div className="space-y-5">
                        <div className="flex items-start gap-3">
                          <span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span>
                          <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">{question.question}</h4>
                        </div>
                        {!answered && question.hint && (
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg">
                            <p className="text-xs md:text-sm text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p>
                          </div>
                        )}
                        <div className="space-y-2.5">
                          {question.options && question.options.map((option, index) => (
                            <button key={index} onClick={() => { if (!answered) { const isCorrect = index === question.correct_answer; setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: isCorrect } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered ? (index === question.correct_answer ? 'bg-green-50 border-green-400' : answered.selected === index ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200') : 'bg-white border-slate-300 hover:border-blue-400'}`}>
                              <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 ${answered ? (index === question.correct_answer ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200') : 'bg-blue-100 text-blue-600'}`}>{String.fromCharCode(65 + index)}</span>
                                <span className="flex-1 text-sm md:text-base">{option}</span>
                                {answered && index === question.correct_answer && <span className="text-lg">✅</span>}
                                {answered && answered.selected === index && index !== question.correct_answer && <span className="text-lg">❌</span>}
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
                            <button onClick={() => setCurrentQuestionIndex(p => p + 1)} disabled={currentQuestionIndex === data.quiz.length - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white">Next →</button>
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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready for More?</h3>
          <p className="text-sm mb-4 text-blue-100">Continue your grammar journey!</p>
          <button onClick={() => navigate('/modules/grammar-hub')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
            Grammar Hub
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
