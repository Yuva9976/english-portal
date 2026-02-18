import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';

const PrepositionDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);

  const partId = 14; // Preposition ID

  useEffect(() => {
    fetchPartData();
  }, []);

  const fetchPartData = async () => {
    try {
      setLoading(true);
      // Fetch part details (Prepositions)
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
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button onClick={() => navigate(-1)} className="mb-3 flex items-center space-x-1 text-white hover:text-teal-100 text-sm">
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">{data.icon}</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{data.name}</h1>
                <p className="text-sm md:text-base text-teal-100">Master {data.name.toLowerCase()} with examples and practice</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section id="overview" className="mb-12">
          <div className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">What is a {data.name}?</h2>
            <p className="text-sm md:text-base text-slate-700 mb-4">{data.definition}</p>
            <p className="text-sm text-slate-600">{data.importance}</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            <span className="text-3xl mr-2">🧭</span>Key {data.name} Topics
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            {data.types.map((type) => (
              <div key={type.id} className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-md border border-teal-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{type.icon}</span>
                  <h3 className="text-base font-bold text-teal-800">{type.name}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">{type.description}</p>
                <div className="flex flex-wrap gap-1">
                  {type.sample_words?.slice(0, 4).map((w, widx) => (
                    <span key={widx} className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-medium">{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-md p-6 border border-yellow-300 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              <span className="text-2xl mr-2">🌟</span>Pro Tips & Common Mistakes
            </h3>

            <div className="space-y-3">
              {data.rules.map((rule) => (
                <div key={rule.id} className={`bg-${rule.rule_type === 'do' ? 'green' : 'red'}-50 border-l-4 border-${rule.rule_type === 'do' ? 'green' : 'red'}-500 p-3 rounded-r-lg`}>
                  <span className={`font-semibold text-${rule.rule_type === 'do' ? 'green' : 'red'}-700 block mb-1 text-sm`}>{rule.title}</span>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {rule.points.map((point, pidx) => (
                      <li key={pidx}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {data.examples && data.examples.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Examples in Context</h3>
              <div className="space-y-3">
                {data.examples.slice(0, 4).map((ex) => (
                  <div key={ex.id} className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                    <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: ex.sentence }} />
                    <p className="text-xs text-gray-500 mt-1">{ex.usage_pattern}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {data.quiz && data.quiz.length > 0 && (
          <section id="quiz" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                <span className="text-3xl mr-3">🎯</span>Quiz Practice
              </h2>
              <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">▶️ Start Quiz</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.quiz.map((question, qIndex) => {
                const answered = quizAnswers[question.id];
                return (
                  <div key={question.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setModalQuizAnswers({}); }} className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-teal-400 cursor-pointer transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">Q{question.id}</span>
                      {answered && (<span className="text-lg">{answered.correct ? '✅' : '❌'}</span>)}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 line-clamp-2">{question.question}</p>
                    {answered ? (<div className={`text-xs font-medium p-1.5 rounded mt-2 ${answered.correct ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>{answered.correct ? 'Correct!' : 'Try again'}</div>) : (<div className="text-xs text-teal-600 font-medium mt-2">Click to attempt</div>)}
                  </div>
                );
              })}
            </div>

            {showQuizModal && data.quiz && (
              <div className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                  <div className="h-1.5 bg-slate-100" style={{ width: `${((currentQuestionIndex + 1) / data.quiz.length) * 100}%` }}></div>

                  <div className="px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase">Question {currentQuestionIndex + 1} of {data.quiz.length}</p>
                    <button onClick={() => setShowQuizModal(false)} className="p-1.5 hover:bg-slate-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>

                  {currentQuestionIndex < data.quiz.length ? (
                    <div className="p-6 md:p-8">
                      {(() => {
                        const question = data.quiz[currentQuestionIndex];
                        const answered = modalQuizAnswers[question.id];
                        return (
                          <div className="space-y-5">
                            <h4 className="text-lg md:text-xl font-bold text-slate-800">{question.emoji} {question.question}</h4>
                            {!answered && (<div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg"><p className="text-xs md:text-sm text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p></div>)}
                            <div className="space-y-2.5">
                              {question.options.map((option, index) => (
                                <button key={index} onClick={() => { if (!answered) { setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: index === question.correct_answer } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium ${answered ? index === question.correct_answer ? 'bg-green-50 border-green-400' : answered.selected === index ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 hover:border-teal-400 hover:bg-teal-50 cursor-pointer'}`}>
                                  <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs ${answered ? index === question.correct_answer ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-600' : 'bg-teal-100 text-teal-600'}`}>{String.fromCharCode(65 + index)}</span>
                                    <span className="flex-1 text-sm md:text-base text-slate-700">{option}</span>
                                    {answered && index === question.correct_answer && <span className="text-lg">✅</span>}
                                  </div>
                                </button>
                              ))}
                            </div>
                            {answered && (<div className={`p-4 rounded-lg border-l-4 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm font-bold mb-1">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</p><p className="text-sm text-gray-700">{question.explanation}</p></div>)}
                            {answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 disabled:opacity-50">← Previous</button><button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={currentQuestionIndex === data.quiz.length - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg disabled:opacity-50">Next →</button></div>)}
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
                      </div>
                      <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg">🔄 Restart Quiz</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default PrepositionDetail;
