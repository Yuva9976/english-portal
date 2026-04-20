import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizMCQ({ lessonId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({}); // Track which questions are "answered" and showing feedback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/quizzes/lesson/${lessonId}`)
      .then((response) => {
        setQuiz(response.data.quizzes?.[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load quiz', err);
        setLoading(false);
      });
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-pulse">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Synchronizing Practice Matrix...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-12 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
        <div className="text-6xl mb-6 opacity-20">🎯</div>
        <p className="text-slate-500 font-bold text-lg font-['Outfit']">No Practice Nodes Available</p>
        <p className="text-slate-400 text-sm mt-2 font-medium">Provision a quiz for this lesson to enable simulations.</p>
      </div>
    );
  }

  const handleSelect = (qId, optId) => {
    // If already revealed for this question, don't allow changes in "Immediate Feedback" mode
    if (revealed[qId]) return;

    const question = quiz.questions.find(q => q.id === qId);
    const isMultiple = question?.type === 'multiple';

    if (isMultiple) {
      setAnswers(prev => {
        const current = Array.isArray(prev[qId]) ? prev[qId] : [];
        const next = current.includes(optId)
          ? current.filter(id => id !== optId)
          : [...current, optId].sort();
        return { ...prev, [qId]: next };
      });
    } else {
      setAnswers(prev => ({ ...prev, [qId]: optId }));
      // For single choice, reveal immediately
      setRevealed(prev => ({ ...prev, [qId]: true }));
    }
  };

  const handleMultipleSubmit = (qId) => {
    setRevealed(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center text-xl shadow-lg shadow-teal-500/20">⚡</span>
          <div>
            <h3 className="text-2xl font-black text-slate-800 font-['Outfit'] tracking-tighter uppercase leading-none">{quiz.title || 'Knowledge Assessment'}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Simulating Professional Proficiency</p>
          </div>
        </div>
        <div className="px-4 py-1.5 bg-slate-900 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/5">
          {quiz.questions?.length || 0} MODULES
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-12">
        {quiz.questions.map((q, index) => {
          const isRevealed = revealed[q.id];
          const userAns = answers[q.id];
          const correctAnsIds = (q.answers || []).filter(a => a.isCorrect).map(a => a.id).sort();

          let isCorrect = false;
          if (isRevealed) {
            if (q.type === 'multiple') {
              const userAnsIds = Array.isArray(userAns) ? [...userAns].sort() : [];
              isCorrect = userAnsIds.length === correctAnsIds.length && userAnsIds.every((v, i) => v === correctAnsIds[i]);
            } else {
              isCorrect = userAns === correctAnsIds[0];
            }
          }

          return (
            <div
              key={q.id}
              className={`relative bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border transition-all duration-500 ${isRevealed
                  ? isCorrect
                    ? 'border-teal-200 shadow-xl shadow-teal-500/5'
                    : 'border-rose-200 shadow-xl shadow-rose-500/5'
                  : 'border-slate-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-slate-200/50'
                }`}
            >
              {/* Question Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center font-black text-slate-400 shadow-lg text-lg group-hover:scale-110 transition-transform font-['Outfit']">
                {index + 1}
              </div>

              {/* Question Text */}
              <div className="mb-8 pl-4 border-l-4 border-teal-500/20 flex justify-between items-start">
                <div>
                  <p className="text-lg md:text-xl font-black text-slate-800 leading-tight font-['Outfit'] tracking-tight">
                    {q.question}
                  </p>
                  {q.type === 'multiple' && (
                    <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100">
                      Multiple Choice Required
                    </span>
                  )}
                </div>
                {q.hint && !isRevealed && (
                  <button
                    onClick={() => {
                      const hintEl = document.getElementById(`hint-${q.id}`);
                      if (hintEl) hintEl.classList.toggle('hidden');
                    }}
                    className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 hover:bg-amber-100 transition-colors shadow-sm cursor-help"
                    title="Need a hint?"
                  >
                    💡
                  </button>
                )}
              </div>

              {/* Hint Display (Hidden by default) */}
              {q.hint && !isRevealed && (
                <div id={`hint-${q.id}`} className="hidden mb-6 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl animate-fadeIn">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Cognitive Prompt</span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 italic">"{q.hint}"</p>
                </div>
              )}

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(q.answers || q.options || []).map((opt, i) => {
                  const optText = typeof opt === 'string' ? opt : (opt.text || '');
                  const optId = (typeof opt === 'object' && opt.id) ? opt.id : optText;

                  const isSelected = q.type === 'multiple'
                    ? (Array.isArray(userAns) && userAns.includes(optId))
                    : userAns === optId;

                  const isCorrectOpt = opt.isCorrect;
                  const label = OPTION_LABELS[i] || '?';

                  // Styling logic
                  let stateStyle = "border-slate-100 bg-white hover:border-teal-300 hover:bg-teal-50/30";
                  let labelStyle = "bg-slate-100 text-slate-400 group-hover:bg-teal-500 group-hover:text-white";

                  if (isSelected && !isRevealed) {
                    stateStyle = "border-[#0D9488] bg-teal-50/50 ring-4 ring-teal-500/5";
                    labelStyle = "bg-[#0D9488] text-white shadow-lg shadow-teal-500/30";
                  } else if (isRevealed) {
                    if (isCorrectOpt) {
                      stateStyle = "border-[#0D9488] bg-teal-50 ring-4 ring-teal-500/10 scale-[1.02] z-10";
                      labelStyle = "bg-[#0D9488] text-white shadow-xl shadow-teal-500/40";
                    } else if (isSelected && !isCorrectOpt) {
                      stateStyle = "border-[#F43F5E] bg-rose-50 opacity-90";
                      labelStyle = "bg-[#F43F5E] text-white shadow-lg shadow-rose-500/30";
                    } else {
                      stateStyle = "border-slate-50 bg-slate-50/30 opacity-40 grayscale-[0.5]";
                      labelStyle = "bg-slate-200 text-slate-400";
                    }
                  }

                  return (
                    <button
                      key={optId}
                      onClick={() => handleSelect(q.id, optId)}
                      disabled={isRevealed}
                      className={`group flex items-center p-5 rounded-3xl border-2 transition-all duration-300 text-left relative overflow-hidden ${stateStyle}`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-base transition-all duration-300 flex-shrink-0 font-['Outfit'] ${labelStyle}`}>
                        {label}
                      </span>
                      <span className={`ml-4 font-bold text-sm tracking-tight leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                        {optText}
                      </span>

                      {isRevealed && isCorrectOpt && (
                        <span className="ml-auto w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs animate-bounce shadow-lg shadow-teal-500/40">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Multiple Choice Confirm (only if not revealed) */}
              {q.type === 'multiple' && !isRevealed && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => handleMultipleSubmit(q.id)}
                    disabled={!userAns || userAns.length === 0}
                    className="px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-400 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.25em] hover:shadow-2xl hover:shadow-teal-500/30 disabled:opacity-30 transition-all active:scale-95 shadow-xl"
                  >
                    COMMIT ASSESSMENT ✓
                  </button>
                </div>
              )}

              {/* Hint & Explanation reveal (Refactored for Screenshot 1031) */}
              {isRevealed && (
                <div className={`mt-10 p-6 rounded-2xl border-t-2 shadow-sm animate-fadeIn ${isCorrect ? 'bg-teal-50/30 border-[#0D9488]' : 'bg-rose-50/30 border-[#F43F5E]'
                  }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{isCorrect ? '🎯' : '💡'}</span>
                    <h4 className={`font-black text-[10px] uppercase tracking-[0.2em] ${isCorrect ? 'text-teal-700' : 'text-rose-700'}`}>
                      {isCorrect ? 'Logical Verification Successful' : 'System Insight'}
                    </h4>
                  </div>
                  <p className="text-slate-800 text-xs font-bold leading-relaxed border-l-2 border-slate-100 pl-4 py-1">
                    {q.explanation || 'No detailed explanation provided for this logic node. Consult the lesson material for further depth.'}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Matrix */}
      <div className="bg-slate-900 rounded-[3.5rem] p-12 text-center relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h3 className="text-white font-black text-2xl font-['Outfit'] tracking-tight mb-4 lowercase">--- end of practice matrix ---</h3>
          <p className="text-slate-400 text-sm font-semibold max-w-sm mx-auto mb-10 leading-relaxed uppercase tracking-widest opacity-60">Complete all nodes to achieve total system proficiency.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-teal-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Reset Core Hub 🔄
          </button>
        </div>
      </div>
    </div>
  );
}
