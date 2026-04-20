import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
const OPTION_COLORS = [
  { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', badge: 'bg-pink-400', badgeText: 'text-white', hover: 'hover:bg-pink-50' },
  { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', badge: 'bg-teal-400', badgeText: 'text-white', hover: 'hover:bg-teal-50' },
  { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-400', badgeText: 'text-white', hover: 'hover:bg-blue-50' },
  { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', badge: 'bg-purple-400', badgeText: 'text-white', hover: 'hover:bg-purple-50' },
  { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', badge: 'bg-amber-400', badgeText: 'text-white', hover: 'hover:bg-amber-50' },
  { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-700', badge: 'bg-rose-400', badgeText: 'text-white', hover: 'hover:bg-rose-50' },
];

const CARD_ICONS = ['📚', '🧠', '✏️', '🤔', '💡', '🎯', '🌟', '📝', '🔍', '🧩'];

function getScoreEmoji(pct) {
  if (pct >= 90) return { emoji: '🏆', title: 'Outstanding!', msg: 'You absolutely nailed it! Your dedication is showing.', color: 'from-yellow-400 to-amber-500' };
  if (pct >= 70) return { emoji: '🎉', title: 'Great Job!', msg: 'You did really well. Keep up the excellent work!', color: 'from-teal-400 to-emerald-500' };
  if (pct >= 50) return { emoji: '😊', title: 'Not Bad!', msg: 'You are on the right track. A little more practice will do wonders!', color: 'from-blue-400 to-cyan-500' };
  return { emoji: '📚', title: 'Keep Practicing!', msg: 'Every expert was once a beginner. Review the lesson and try again!', color: 'from-rose-400 to-pink-500' };
}

export default function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Role detection
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user?.role || 'learner';
  const isTrialUser = ['content_provider', 'provider', 'teacher', 'tutor', 'admin'].includes(userRole);

  // UI State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [revealedHints, setRevealedHints] = useState({});
  const [showScoreScreen, setShowScoreScreen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const lessonQuizzesRes = await apiClient.get(`/quizzes/lesson/${lessonId}`);
        const quizzes = lessonQuizzesRes.data.quizzes || [];

        if (quizzes.length === 0) {
          setError('No quiz found for this lesson');
          setLoading(false);
          return;
        }

        const currentQuizId = quizzes[0].id;
        setQuizId(currentQuizId);
        setQuizTitle(quizzes[0].title || 'Quiz Practice');

        const fullQuizRes = await apiClient.get(`/quizzes/${currentQuizId}?for=learner`);
        const qs = fullQuizRes.data.questions || fullQuizRes.data || [];
        setQuestions(qs);
      } catch (err) {
        console.error(err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lessonId]);

  async function submit() {
    if (!quizId) return;
    setSubmitting(true);
    setError('');
    try {
      const formattedAnswers = Object.entries(modalQuizAnswers).map(([qId, selections]) => {
        const question = questions.find(q => String(q.id) === String(qId) || String(q._id) === String(qId));
        if (!question) return { questionId: qId, answerIds: [] };

        // Handle both single (string) and multiple (array) selections
        const selectedTexts = Array.isArray(selections) ? selections : [selections];
        const selectedAnswerIds = (question.answers || [])
          .filter(a => selectedTexts.includes(a.text))
          .map(a => a.id);

        return {
          questionId: Number(qId),
          answerIds: selectedAnswerIds
        };
      });

      const payload = {
        answers: formattedAnswers,
        isTrialMode: isTrialUser,
      };
      const res = await apiClient.post(`/quizzes/${quizId}/submit`, payload);
      setResult(res.data);
      setShowQuizModal(false);
      setShowScoreScreen(true);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  function resetQuiz() {
    setResult(null);
    setShowScoreScreen(false);
    setModalQuizAnswers({});
    setRevealedHints({});
    setCurrentQuestionIndex(0);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-teal-600 font-bold text-sm uppercase tracking-widest">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  // Score Screen
  if (showScoreScreen && result) {
    const pct = result.scorePercent ?? Math.round((result.earnedPoints / result.totalPoints) * 100);
    const { emoji, title, msg, color } = getScoreEmoji(pct);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          {/* Score card */}
          <div className={`bg-gradient-to-br ${color} rounded-[3rem] p-12 text-white shadow-2xl mb-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
            <div className="relative z-10">
              <div className="text-8xl mb-4 drop-shadow-lg">{emoji}</div>
              <h1 className="text-4xl font-black mb-2 font-['Outfit'] tracking-tight">{title}</h1>
              <p className="text-white/90 text-lg font-medium mb-8">{msg}</p>
              {isTrialUser && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                  🔬 Trial Mode — Score Not Saved
                </div>
              )}
              <div className="bg-white/20 backdrop-blur-sm rounded-[2rem] p-8 border border-white/30">
                <div className="text-7xl font-black font-['Outfit'] mb-1">{pct}%</div>
                <div className="text-white/80 text-sm font-bold uppercase tracking-widest">Your Score</div>
                <div className="mt-4 text-white/70 text-sm">
                  {result.earnedPoints} / {result.totalPoints} points earned
                </div>
              </div>
            </div>
          </div>

          {/* Per-question breakdown */}
          {result.details && (
            <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6 mb-8 text-left">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Question Results</h3>
              <div className="grid grid-cols-5 gap-2">
                {result.details.map((d, idx) => (
                  <div key={idx} className={`p-3 rounded-xl text-center text-sm font-bold border ${d.correct ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                    <div className="text-lg mb-1">{d.correct ? '✅' : '❌'}</div>
                    <div className="text-xs">Q{idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 py-4 bg-white border-2 border-teal-200 text-teal-700 font-black rounded-2xl hover:bg-teal-50 transition-all text-sm uppercase tracking-widest"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => navigate(`/lessons/${lessonId}`)}
              className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-black rounded-2xl hover:shadow-lg hover:shadow-teal-500/30 transition-all text-sm uppercase tracking-widest"
            >
              📖 Back to Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/lessons/${lessonId}`)}
            className="flex items-center gap-3 text-slate-600 hover:text-teal-600 transition-colors group px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-bold text-sm">Back to Lesson</span>
          </button>
          {isTrialUser && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold uppercase tracking-wider">
              🔬 Trial Mode — Answers Not Saved
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-8 rounded-3xl text-center shadow-lg border border-red-100 mb-8">
            <span className="text-5xl mb-4 block">⚠️</span>
            <p className="font-bold mb-4 text-xl">{error}</p>
          </div>
        )}

        {/* --- QUIZ GRID --- */}
        <section id="quiz" className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center mb-3 drop-shadow tracking-tight">
              <span className="text-4xl mr-3">🧩</span>
              Quiz Practice
            </h2>
            <p className="text-gray-500 text-base mb-2 font-medium">{quizTitle}</p>
            <p className="text-gray-400 text-sm mb-8">Review questions or take the full quiz.</p>

            {!result && (
              <button
                onClick={() => {
                  setShowQuizModal(true);
                  setCurrentQuestionIndex(0);
                  setSingleQuestionMode(false);
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                ▶️ Start Full Quiz
              </button>
            )}
          </div>

          {/* Question Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
            {questions.map((question, qIndex) => {
              const qId = question.id || question._id;
              const isAnswered = modalQuizAnswers[qId] !== undefined;

              let det = null;
              if (result && result.details) {
                det = result.details.find(d => String(d.questionId) === String(qId));
              }

              return (
                <div
                  key={qId}
                  onClick={() => {
                    setShowQuizModal(true);
                    setCurrentQuestionIndex(qIndex);
                    setSingleQuestionMode(true);
                  }}
                  className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 hover:border-blue-300 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/40 to-teal-50/40 rounded-bl-full" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-gradient-to-r from-orange-400 to-amber-400 text-white font-black text-xs px-3 py-1 rounded-full shadow-sm shadow-orange-200">
                        Q{qIndex + 1}
                      </span>
                      {det && (
                        <span className={`text-xl ${det.correct ? 'text-green-500' : 'text-red-500'}`}>
                          {det.correct ? '✅' : '❌'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-2 mb-4">
                      <span className="text-2xl opacity-80 group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5">
                        {CARD_ICONS[qIndex % CARD_ICONS.length]}
                      </span>
                      <p className="text-sm font-bold text-slate-700 line-clamp-3 leading-snug">
                        {question.text || question.question}
                      </p>
                    </div>

                    {det ? (
                      <div className="space-y-3">
                        <div className={`text-xs font-black p-3 rounded-xl uppercase tracking-widest text-center border shadow-sm ${det.correct ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                          {det.correct ? 'Match Verified ✓' : 'Correction Needed ✗'}
                        </div>

                        <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-400" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                              Selected: <span className="text-slate-700">{(question.answers || []).filter(a => det.selected?.includes(Number(a.id))).map(a => a.text).join(', ') || 'None'}</span>
                            </p>
                          </div>
                          {!det.correct && (
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-teal-400" />
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                                Correct: <span className="text-slate-700">{(question.answers || []).filter(a => det.correctAnswerIds?.includes(Number(a.id))).map(a => a.text).join(', ')}</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest border rounded-[1rem] p-3 transition-colors shadow-sm ${isAnswered ? 'bg-teal-50 text-teal-600 border-teal-100' : 'bg-slate-50 text-blue-500 border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200'}`}>
                        {isAnswered ? '✓ Assessment Committed' : 'Diagnose Concept'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- QUIZ MODAL --- */}
        {showQuizModal && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden">

              {/* Progress bar for full quiz */}
              {!singleQuestionMode && (
                <div className="h-1.5 bg-slate-100">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              )}

              {/* Modal header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div>
                  {!singleQuestionMode ? (
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                  ) : (
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Practice Question</p>
                  )}
                </div>
                <button
                  onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }}
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700 shadow-sm border border-slate-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {currentQuestionIndex < questions.length ? (() => {
                const question = questions[currentQuestionIndex];
                const qId = question.id || question._id;
                const selectedText = modalQuizAnswers[qId];

                let det = null;
                if (result && result.details) {
                  det = result.details.find(d => String(d.questionId) === String(qId));
                }
                const isSubmitted = !!result;
                const hintRevealed = revealedHints[qId];

                // Practice Mode: Show answer immediately if not in a full quiz submission
                const showExplanation = isSubmitted || (singleQuestionMode && selectedText);

                // Logic for check correct/wrong in practice mode (immediate feedback)
                let isCorrect = false;
                const correctAnswers = (question.answers || []).filter(a => a.isCorrect);
                const correctTexts = correctAnswers.map(a => a.text).sort();

                if (selectedText) {
                  if (question.type === 'multiple') {
                    const sortedSelected = [...selectedText].sort();
                    isCorrect = sortedSelected.length === correctTexts.length &&
                      sortedSelected.every((val, index) => val === correctTexts[index]);
                  } else {
                    isCorrect = correctTexts.includes(selectedText);
                  }
                }

                return (
                  <div className="p-6 md:p-10">
                    <div className="space-y-8">
                      {/* Question Header */}
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-indigo-200 flex-shrink-0 animate-bounce-subtle">
                          🧠
                        </div>
                        <div className="pt-1">
                          <h4 className="text-2xl font-black text-slate-800 leading-tight font-['Outfit'] tracking-tight">
                            {question.text || question.question}
                          </h4>
                          {question.type === 'multiple' && (
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 block">Multiple Binary Selection Required</span>
                          )}
                        </div>
                      </div>

                      {/* Hint Section */}
                      {question.hint && !showExplanation && (
                        <div className="animate-fadeIn">
                          {!hintRevealed ? (
                            <button
                              onClick={() => setRevealedHints(prev => ({ ...prev, [qId]: true }))}
                              className="flex items-center gap-3 text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-6 py-3 rounded-2xl transition-all shadow-sm group"
                            >
                              <span className="text-lg group-hover:rotate-12 transition-transform">💡</span>
                              REVEAL STRATEGIC HINT
                            </button>
                          ) : (
                            <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-[2rem] text-sm text-amber-800 font-semibold flex items-start gap-4 shadow-inner">
                              <span className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center text-xl shadow-md flex-shrink-0">💡</span>
                              <div className="pt-2 italic">"{question.hint}"</div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Options Grid */}
                      <div className="space-y-4">
                        {(question.answers || question.options || []).map((opt, index) => {
                          const optText = typeof opt === 'string' ? opt : opt.text;
                          const isSelected = Array.isArray(selectedText)
                            ? selectedText.includes(optText)
                            : selectedText === optText;
                          const color = OPTION_COLORS[index % OPTION_COLORS.length];
                          const label = OPTION_LABELS[index];

                          let btnClass = `w-full p-5 rounded-[2rem] border-2 transition-all duration-300 text-left flex items-center gap-5 cursor-pointer relative overflow-hidden group/opt`;
                          let labelClass = `w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 transition-transform duration-300 group-hover/opt:scale-110 shadow-lg ${color.badge} ${color.badgeText}`;

                          if (!showExplanation) {
                            if (isSelected) {
                              btnClass += ` ${color.bg} ${color.border} shadow-xl shadow-teal-500/10 -translate-y-1`;
                            } else {
                              btnClass += ` bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50 shadow-sm`;
                            }
                          } else {
                            // Revealed State (Practice or Submitted)
                            const isThisCorrect = typeof opt === 'object' ? opt.isCorrect : (det?.correctAnswerIds?.includes(opt.id));

                            if (isThisCorrect) {
                              btnClass += ' bg-teal-50 border-teal-400 shadow-xl shadow-teal-500/20';
                              labelClass = 'w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 bg-teal-500 text-white shadow-teal-500/30';
                            } else if (isSelected && !isThisCorrect) {
                              btnClass += ' bg-rose-50 border-rose-300 opacity-80';
                              labelClass = 'w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 bg-rose-500 text-white shadow-rose-500/30';
                            } else {
                              btnClass += ' bg-slate-50 border-slate-100 opacity-40 grayscale-[0.5]';
                            }
                          }

                          return (
                            <button
                              key={index}
                              onClick={() => {
                                if (!showExplanation) {
                                  if (question.type === 'multiple') {
                                    const currentSelections = Array.isArray(selectedText) ? selectedText : [];
                                    const nextSelections = currentSelections.includes(optText)
                                      ? currentSelections.filter(t => t !== optText)
                                      : [...currentSelections, optText];
                                    setModalQuizAnswers(prev => ({ ...prev, [qId]: nextSelections }));
                                  } else {
                                    setModalQuizAnswers(prev => ({ ...prev, [qId]: optText }));
                                  }
                                }
                              }}
                              disabled={showExplanation}
                              className={btnClass}
                            >
                              <span className={labelClass}>
                                {showExplanation ? (
                                  (typeof opt === 'object' ? opt.isCorrect : det?.correctAnswerIds?.includes(opt.id)) ? '✓' :
                                    (isSelected ? '✗' : label)
                                ) : label}
                              </span>
                              <div className="flex-1">
                                <span className={`text-lg font-bold tracking-tight ${isSelected && !showExplanation ? color.text : 'text-slate-700'}`}>
                                  {optText}
                                </span>
                              </div>

                              {isSelected && !showExplanation && (
                                <div className={`w-3 h-3 rounded-full ${color.badge} animate-pulse shadow-lg shadow-teal-500/50`} />
                              )}

                              {showExplanation && (typeof opt === 'object' ? opt.isCorrect : det?.correctAnswerIds?.includes(opt.id)) && (
                                <span className="text-[10px] font-black text-teal-600 bg-teal-100 px-3 py-1.5 rounded-full uppercase tracking-widest border border-teal-200 shadow-sm">Verified Match</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
                      {showExplanation && (
                        <div className={`p-6 rounded-[2.5rem] border-l-[12px] animate-slideUp border shadow-2xl ${(isSubmitted ? det?.correct : isCorrect)
                            ? 'bg-teal-50 border-teal-500 shadow-teal-500/10'
                            : 'bg-orange-50 border-orange-400 shadow-orange-500/10'
                          }`}>
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-3xl">
                              {(isSubmitted ? det?.correct : isCorrect) ? '🎓' : '💡'}
                            </span>
                            <p className="font-black text-xl text-slate-800 font-['Outfit'] tracking-tight">
                              {(isSubmitted ? det?.correct : isCorrect) ? 'Linguistic Accuracy Confirmed' : 'Conceptual Correction'}
                            </p>
                          </div>
                          <p className="text-slate-700 font-medium text-base leading-relaxed pl-12">
                            {question.explanation || (isCorrect ? "Perfect! Your understanding of this concept is strong." : "Review the lesson material to strengthen this logic node.")}
                          </p>
                        </div>
                      )}

                      {/* Action & Nav Footer */}
                      <div className="flex gap-4 pt-8 border-t border-slate-100">
                        {(!singleQuestionMode && !isSubmitted) && (
                          <button
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="px-8 py-4 rounded-2xl border-2 border-slate-100 bg-white text-slate-500 font-black hover:bg-slate-50 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs uppercase tracking-widest"
                          >
                            ← PREV NODE
                          </button>
                        )}

                        {singleQuestionMode || isSubmitted ? (
                          <button
                            onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }}
                            className="flex-1 px-8 py-5 rounded-[2rem] bg-slate-900 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-900/40 hover:-translate-y-1 active:scale-95"
                          >
                            EXIT SIMULATION
                          </button>
                        ) : (
                          currentQuestionIndex === questions.length - 1 ? (
                            <button
                              onClick={submit}
                              disabled={submitting || Object.keys(modalQuizAnswers).length < questions.length}
                              className="flex-1 px-8 py-5 rounded-[2rem] bg-gradient-to-r from-teal-500 to-teal-400 text-white font-black text-sm uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-teal-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-1 active:scale-95"
                            >
                              {submitting ? 'PROCESSING...' : 'UPLOAD RESULTS 🔥'}
                            </button>
                          ) : (
                            <button
                              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                              className="flex-1 px-8 py-5 rounded-[2rem] bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-black text-sm uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:scale-95"
                            >
                              NEXT SEGMENT →
                            </button>
                          )
                        )}
                      </div>

                      {/* Interaction Sentinel */}
                      {!singleQuestionMode && !isSubmitted && currentQuestionIndex === questions.length - 1 && Object.keys(modalQuizAnswers).length < questions.length && (
                        <div className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-100 animate-pulse">
                          <p className="text-[10px] text-amber-700 font-black uppercase tracking-[0.2em]">
                            Attention: {questions.length - Object.keys(modalQuizAnswers).length} logic nodes remain unresolved. Complete all to verify results.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })() : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
