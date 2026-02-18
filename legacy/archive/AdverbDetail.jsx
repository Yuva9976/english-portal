import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';

const AdverbDetail = () => {
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

  const partId = 13; // Adverb ID

  useEffect(() => {
    fetchPartData();
  }, []);

  const fetchPartData = async () => {
    try {
      setLoading(true);
      // Fetch part details (Adverbs)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Adverb lesson...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <section id="overview" className="mb-12 scroll-mt-32">
            <div className="bg-gradient-to-r from-slate-50 to-amber-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6">
              <div className="flex items-start gap-2 md:gap-3 mb-2">
                <span className="text-xl md:text-2xl">📖</span>
                <h2 className="text-base md:text-lg font-bold text-slate-800">What is an {data.name}?</h2>
              </div>
              <p className="text-xs md:text-sm text-slate-700 mb-3 pl-7">{data.definition}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border border-amber-200 rounded-lg p-2">
                  <p className="text-xs font-semibold text-amber-700">💡 Why Learn?</p>
                  <p className="text-xs text-slate-600 mt-0.5">{data.importance}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              <span className="text-3xl mr-2">🧭</span>Key {data.name} Topics
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.types.map((type) => (
                <div key={type.id} className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-md border border-amber-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-100 to-amber-50 px-4 py-3 border-b-2 border-amber-200">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{type.icon}</span>
                      <h3 className="text-base font-bold text-amber-800">{type.name}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 mb-3">{type.description}</p>
                    <div className="space-y-1.5 mb-3">
                      {type.examples?.slice(0, 2).map((ex, i) => (
                        <div key={i} className="bg-gray-50 px-2 py-1.5 rounded text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: ex }} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {type.sample_words?.slice(0, 3).map((w, widx) => (
                        <span key={widx} className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-md p-6 border border-yellow-300 mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                <span className="text-2xl mr-2">🌟</span>Pro Tips & Common Mistakes
              </h3>

              <div className="space-y-3">
                {data.rules.map((rule) => (
                  <div key={rule.id} className={`bg-${rule.rule_type === 'do' ? 'green' : 'red'}-50 border-l-4 border-${rule.rule_type === 'do' ? 'green' : 'red'}-500 p-3 rounded-r-lg`}>
                    <span className={`font-semibold text-${rule.rule_type === 'do' ? 'green' : 'red'}-700 block mb-1 text-sm`}>{rule.title}</span>
                    <ul className="text-gray-700 text-sm space-y-1">
                      {rule.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-2">
                          <span className="mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'quiz':
        return (
          <section id="quiz" className="mb-16 scroll-mt-32">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                <span className="text-3xl mr-3">🎯</span>Quiz Practice
              </h2>
              <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); setSingleQuestionMode(false); }} className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">▶️ Start Full Quiz</button>
            </div>

            {data.quiz && data.quiz.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {data.quiz.map((question, qIndex) => {
                  const answered = quizAnswers[question.id];
                  return (
                    <div key={question.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setModalQuizAnswers({}); setSingleQuestionMode(true); }} className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-amber-400 cursor-pointer transition-all transform hover:scale-105">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">Q{question.id}</span>
                        {answered && (<span className="text-lg">{answered.correct ? '✅' : '❌'}</span>)}
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-lg">{question.emoji}</span>
                        <p className="text-xs font-semibold text-gray-700 line-clamp-2">{question.question}</p>
                      </div>
                      {answered ? (<div className={`text-xs font-medium p-1.5 rounded ${answered.correct ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>{answered.correct ? 'Correct!' : 'Try again'}</div>) : (<div className="text-xs text-amber-600 font-medium">Click to attempt</div>)}
                    </div>
                  );
                })}
              </div>
            )}

            {showQuizModal && data.quiz && (
              <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                  {!singleQuestionMode && (
                    <div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all" style={{ width: `${((currentQuestionIndex + 1) / data.quiz.length) * 100}%` }} /></div>
                  )}

                  <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between`}>
                    <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase">{!singleQuestionMode ? `Question ${currentQuestionIndex + 1} of ${data.quiz.length}` : 'Practice Question'}</p>
                    <button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>

                  {currentQuestionIndex < data.quiz.length ? (
                    <div className="p-6 md:p-8">
                      {(() => {
                        const question = data.quiz[currentQuestionIndex];
                        const answered = modalQuizAnswers[question.id];
                        return (
                          <div className="space-y-5">
                            <h4 className="text-lg md:text-xl font-bold text-slate-800">{question.emoji} {question.question}</h4>
                            {!answered && (<div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg"><p className="text-xs md:text-sm text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p></div>)}
                            <div className="space-y-2.5">
                              {question.options.map((option, index) => (
                                <button key={index} onClick={() => { if (!answered) { setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: index === question.correct_answer } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium ${answered ? index === question.correct_answer ? 'bg-green-50 border-green-400' : answered.selected === index ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 hover:border-amber-400 hover:bg-amber-50 cursor-pointer'}`}>
                                  <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs ${answered ? index === question.correct_answer ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-600' : 'bg-amber-100 text-amber-600'}`}>{String.fromCharCode(65 + index)}</span>
                                    <span className="flex-1 text-sm md:text-base text-slate-700">{option}</span>
                                    {answered && index === question.correct_answer && <span className="text-lg">✅</span>}
                                    {answered && answered.selected === index && index !== question.correct_answer && <span className="text-lg">❌</span>}
                                  </div>
                                </button>
                              ))}
                            </div>
                            {answered && (<div className={`p-4 rounded-lg border-l-4 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm font-bold text-gray-800 mb-2">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</p><p className="text-sm text-gray-700">{question.explanation}</p></div>)}
                            {!singleQuestionMode && answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 disabled:opacity-50">← Previous</button><button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={!answered || currentQuestionIndex === data.quiz.length - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm hover:shadow-lg disabled:opacity-50">Next →</button></div>)}
                            {singleQuestionMode && answered && (<button onClick={() => setShowQuizModal(false)} className="w-full mt-4 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg">← Back to Questions</button>)}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-6 md:p-8 text-center space-y-5">
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-800">🎊 Quiz Complete!</h3>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Final Score</p>
                        <div className="text-5xl md:text-6xl font-bold text-amber-600 mb-2">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div>
                        <p className="text-base text-slate-700 font-medium">out of {data.quiz.length * 10} points</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button onClick={() => setShowQuizModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50">Close</button>
                        <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg">🔄 Restart Quiz</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button onClick={() => navigate(-1)} className="mb-3 flex items-center space-x-1 text-white hover:text-amber-100 text-sm">
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">{data.icon}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{data.name}</h1>
                <p className="text-sm md:text-base text-amber-100">Master {data.name.toLowerCase()} with examples and practice</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button key={section.id} onClick={() => scrollToSection(section.id)} className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${activeSection === section.id ? 'bg-white text-amber-600 shadow-md' : 'bg-amber-500 bg-opacity-40 text-white hover:bg-opacity-60'}`}>
                  <span className="mr-1">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {renderSection()}
      </div>

      <style jsx>{`@keyframes fade-in {from {opacity: 0;} to {opacity: 1;}} .animate-fade-in { animation: fade-in 0.3s; }`}</style>
    </div>
  );
};

export default AdverbDetail;
