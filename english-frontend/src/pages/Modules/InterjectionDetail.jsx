import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';

const InterjectionDetail = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);

  const partId = 16; // Interjection ID

  useEffect(() => {
    fetchPartData();
  }, []);

  const fetchPartData = async () => {
    try {
      setLoading(true);
      // Fetch part details (Interjections)
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

  const data = apiData;

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'types', name: 'Types', icon: '📚' },
    { id: 'tips', name: 'Tips', icon: '💡' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="bg-gradient-to-r from-teal-500 to-rose-400 text-white sticky top-[128px] z-40">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <button onClick={() => navigate(-1)} className="mb-2 flex items-center space-x-1 text-white hover:text-purple-100 text-sm">
            <span className="text-base">←</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl">{data.icon}</span>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{data.name}</h1>
                <p className="text-xs md:text-sm text-purple-100">Master {data.name.toLowerCase()} & add emotion to your writing</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all bg-white bg-opacity-30 text-white hover:bg-opacity-50 backdrop-blur-sm"
                >
                  <span className="mr-1">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 mt-4">
        <section id="overview" className="mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">What is an {data.name}?</h2>
            <p className="text-sm md:text-base text-slate-700 mb-4">{data.definition}</p>
            <p className="text-sm text-slate-600">{data.importance}</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Key {data.name} Types</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {data.types.map((type) => (
              <div key={type.id} className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md border border-purple-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{type.icon}</span>
                  <h3 className="text-base font-bold text-purple-800">{type.name}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">{type.description}</p>
                <div className="flex flex-wrap gap-1">
                  {type.examples?.slice(0, 2).map((w, widx) => (
                    <span key={widx} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 rounded-xl shadow-md p-6 border border-yellow-300 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🌟 Usage Guide</h3>

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
              <h3 className="text-xl font-bold text-gray-800 mb-4">📖 Dialogue Examples</h3>
              <div className="space-y-3">
                {data.examples.slice(0, 4).map((ex) => (
                  <div key={ex.id} className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                    <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: ex.sentence }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {data.quiz && data.quiz.length > 0 && (
          <section id="quiz" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🎯 Quiz Practice</h2>
              <button onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg">▶️ Start Quiz</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.quiz.map((question, qIndex) => {
                const answered = quizAnswers[question.id];
                return (
                  <div key={question.id} onClick={() => { setShowQuizModal(true); setCurrentQuestionIndex(qIndex); setModalQuizAnswers({}); }} className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg cursor-pointer transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">Q{question.id}</span>
                      {answered && (<span className="text-lg">{answered.correct ? '✅' : '❌'}</span>)}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 line-clamp-2">{question.question}</p>
                    {answered ? (<div className={`text-xs font-medium p-1.5 rounded mt-2 ${answered.correct ? 'bg-green-50' : 'bg-orange-50'}`}>{answered.correct ? 'Correct!' : 'Try again'}</div>) : (<div className="text-xs text-purple-600 font-medium mt-2">Click to attempt</div>)}
                  </div>
                );
              })}
            </div>

            {showQuizModal && data.quiz && (
              <div className="fixed inset-0 bg-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
                  <div className="h-1.5 bg-purple-300" style={{ width: `${((currentQuestionIndex + 1) / data.quiz.length) * 100}%` }}></div>

                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Question {currentQuestionIndex + 1} of {data.quiz.length}</p>
                    <button onClick={() => setShowQuizModal(false)} className="p-1.5 hover:bg-slate-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>

                  {currentQuestionIndex < data.quiz.length ? (
                    <div className="p-6">
                      {(() => {
                        const question = data.quiz[currentQuestionIndex];
                        const answered = modalQuizAnswers[question.id];
                        return (
                          <div className="space-y-5">
                            <h4 className="text-lg font-bold text-slate-800">{question.emoji} {question.question}</h4>
                            {!answered && (<div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-lg"><p className="text-xs text-blue-700"><span className="font-semibold">💡 Hint:</span> {question.hint}</p></div>)}
                            <div className="space-y-2">
                              {question.options.map((option, index) => (
                                <button key={index} onClick={() => { if (!answered) { setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: index === question.correct_answer } })); } }} disabled={answered} className={`w-full p-3 rounded-lg border-2 transition-all text-left font-medium text-sm ${answered ? index === question.correct_answer ? 'bg-green-50 border-green-400' : answered.selected === index ? 'bg-red-50 border-red-400' : 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 hover:border-purple-400 hover:bg-purple-50 cursor-pointer'}`}>
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${answered ? index === question.correct_answer ? 'bg-green-200' : answered.selected === index ? 'bg-red-200' : 'bg-slate-200' : 'bg-purple-100 text-purple-600'}`}>{String.fromCharCode(65 + index)}</span>
                                    <span>{option}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {answered && (<div className={`p-3 rounded-lg border-l-4 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm font-bold mb-1">{answered.correct ? '✅ Correct!' : '❌ Try again'}</p><p className="text-sm text-gray-700">{question.explanation}</p></div>)}
                            {answered && (<div className="flex gap-2 pt-4 border-t"><button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 disabled:opacity-50">← Previous</button><button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={currentQuestionIndex === data.quiz.length - 1} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium text-sm hover:shadow-lg disabled:opacity-50">Next →</button></div>)}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <h3 className="text-3xl font-bold text-slate-800 mb-4">🎊 Complete!</h3>
                      <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200 mb-4">
                        <div className="text-5xl font-bold text-amber-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div>
                        <p className="text-sm text-slate-700 mt-2">out of {data.quiz.length * 10} points</p>
                      </div>
                      <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium">🔄 Restart</button>
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

export default InterjectionDetail;
