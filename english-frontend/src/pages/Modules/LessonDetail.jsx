import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// ─── XP Toast notification ─────────────────────────────────────────────────
const XPToast = ({ message, xp, onClose }) => (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce">
        <span className="text-3xl">🏆</span>
        <div>
            <p className="font-bold text-lg">+{xp} XP Earned!</p>
            <p className="text-sm opacity-90">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-white/70 hover:text-white text-xl">✕</button>
    </div>
);


export default function LessonDetail() {
    const { partId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('overview');

    // Quiz state - card grid + modal
    const [quizCardAnswers, setQuizCardAnswers] = useState({});
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [quizModalIndex, setQuizModalIndex] = useState(0);
    const [quizModalAnswers, setQuizModalAnswers] = useState({});
    const [singleQuestionMode, setSingleQuestionMode] = useState(false);
    const [quizModalDone, setQuizModalDone] = useState(false);

    // Writing exercise
    const [writingText, setWritingText] = useState('');
    const [writingSubmitted, setWritingSubmitted] = useState(false);
    const [showSampleAnswer, setShowSampleAnswer] = useState(false);

    // Reading exercise
    const [showReadingAnswers, setShowReadingAnswers] = useState(false);

    // XP / Complete
    const [completing, setCompleting] = useState(false);
    const [toast, setToast] = useState(null);
    const [alreadyCompleted, setAlreadyCompleted] = useState(false);

    // ─── Fetch lesson data ──────────────────────────────────────────────────
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`${API}/grammar/${partId}`)
            .then((r) => {
                if (!r.ok) throw new Error(`Failed to load lesson (${r.status})`);
                return r.json();
            })
            .then((data) => {
                setLesson(data);
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'auto' });
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [partId]);

    // ─── Complete lesson (award XP) ────────────────────────────────────────
    const handleComplete = async () => {
        const token =
            localStorage.getItem('token') ||
            document.cookie.match(/token=([^;]+)/)?.[1];

        setCompleting(true);
        try {
            const res = await fetch(`${API}/grammar/${partId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                credentials: 'include',
            });
            const data = await res.json();

            if (data.already_completed) {
                setAlreadyCompleted(true);
                setToast({ message: 'You have already completed this lesson.', xp: 0 });
            } else {
                setAlreadyCompleted(true);
                setToast({ message: data.message, xp: data.xp_earned });
            }
            setTimeout(() => setToast(null), 4000);
        } catch (err) {
            console.error(err);
        } finally {
            setCompleting(false);
        }
    };

    // ─── Quiz interaction ──────────────────────────────────────────────────
    const handleQuizAnswer = (questionId, answerIndex, correctAnswer) => {
        if (quizAnswers[questionId] !== undefined) return; // already answered
        const isCorrect =
            String(answerIndex) === String(correctAnswer) ||
            (Array.isArray(correctAnswer) && correctAnswer.includes(String(answerIndex)));
        setQuizAnswers((prev) => ({ ...prev, [questionId]: { selected: answerIndex, isCorrect } }));
    };

    // ─── Scroll to section ─────────────────────────────────────────────────
    const scrollTo = (id) => {
        setActiveSection(id);
        document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
    };

    // ─── Loading / Error states ────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-teal-600 font-semibold text-lg">Loading lesson…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <span className="text-5xl">⚠️</span>
                    <h2 className="text-xl font-bold text-red-600 mt-4 mb-2">Could not load lesson</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    // ─── Derivatives from lesson data ──────────────────────────────────────
    const { name, definition, importance, icon, types = [], rules = [], examples = [], exercises = [], quiz = [], resources = [] } = lesson;

    const doRules = rules.filter((r) => r.rule_type === 'do');
    const dontRules = rules.filter((r) => r.rule_type === 'dont');
    const writingExercises = exercises.filter((e) => e.exercise_type === 'writing');
    const readingExercises = exercises.filter((e) => e.exercise_type === 'reading');

    const navItems = [
        { id: 'overview', icon: '📖', label: 'Overview' },
        ...(types.length ? [{ id: 'types', icon: '🗂️', label: 'Types' }] : []),
        ...(rules.length ? [{ id: 'rules', icon: '📋', label: 'Rules' }] : []),
        ...(examples.length ? [{ id: 'examples', icon: '💡', label: 'Examples' }] : []),
        ...(writingExercises.length ? [{ id: 'writing', icon: '✍️', label: 'Writing' }] : []),
        ...(readingExercises.length ? [{ id: 'reading', icon: '📚', label: 'Reading' }] : []),
        ...(quiz.length ? [{ id: 'quiz', icon: '🎯', label: 'Quiz' }] : []),
        ...(resources.length ? [{ id: 'resources', icon: '🔗', label: 'Resources' }] : []),
    ];


    return (
        <div className="min-h-screen bg-slate-50/30">
            {/* XP Toast */}
            {toast && <XPToast message={toast.message} xp={toast.xp} onClose={() => setToast(null)} />}

            {/* ── Sticky Header ── */}
            <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto max-w-7xl px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-slate-400 hover:bg-slate-100 rounded-xl p-2 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="text-2xl">{icon || '📚'}</span>
                            <h1 className="text-lg font-black text-slate-800 tracking-tight font-['Outfit']">{name}</h1>
                        </div>
                        <div className="hidden sm:block">
                            <button
                                onClick={handleComplete}
                                disabled={alreadyCompleted}
                                className={`px-5 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${alreadyCompleted 
                                    ? 'bg-teal-50 text-[#0D9488] border border-teal-100' 
                                    : 'bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white hover:shadow-lg hover:shadow-teal-500/20 active:scale-95'}`}
                            >
                                {alreadyCompleted ? '✓ Completed' : 'Complete Lesson'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 pb-1">
                        {navItems.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => scrollTo(n.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === n.id
                                    ? 'bg-[#0D9488] text-white shadow-md'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                    }`}
                            >
                                <span className="mr-1.5">{n.icon}</span>{n.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col lg:flex-row gap-8 py-10">
                    {/* ── Sidebar Navigation ── */}
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-2 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/50">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-3 mb-4">Lesson Contents</p>
                            {navItems.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => scrollTo(n.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeSection === n.id
                                        ? 'bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white shadow-xl shadow-teal-500/20 transform scale-[1.02]'
                                        : 'text-slate-400 hover:bg-slate-50 hover:text-[#0D9488]'
                                        }`}
                                >
                                    <span className="text-lg">{n.icon}</span>
                                    <span>{n.label}</span>
                                    {activeSection === n.id && (
                                        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* ── Main Content ── */}
                    <main className="flex-1 space-y-12 min-w-0">
                        {/* Course Context Header */}
                        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm shadow-slate-200/50">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase tracking-widest rounded-lg border border-teal-100">
                                    Curriculum Core
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tighter font-['Outfit'] mb-4">
                                {lesson.title}
                            </h1>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl italic">
                                "{lesson.description}"
                            </p>
                        </div>

                        {/* ── Overview ── */}
                        <section id="section-overview" className="scroll-mt-32">
                            <div className="bg-gradient-to-br from-white via-white to-teal-50/30 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-teal-100/50 p-10">
                                <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 font-['Outfit'] uppercase">
                                    <span className="w-10 h-10 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-xl">{icon || '📚'}</span>
                                    Lexical Analysis
                                </h2>
                                <p className="text-slate-600 text-base leading-relaxed font-medium bg-slate-50/50 p-6 rounded-3xl border border-slate-100 mb-6">{definition}</p>
                                {importance && (
                                    <div className="bg-white border-l-4 border-[#F43F5E] rounded-2xl p-6 shadow-sm border border-slate-100">
                                        <p className="text-[10px] font-black text-[#F43F5E] uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] animate-pulse"></span>
                                            Strategic Importance
                                        </p>
                                        <p className="text-sm font-semibold text-slate-700 leading-relaxed">{importance}</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* -- Types -- */}
                        {types.length > 0 && (
                            <section id="section-types" className="scroll-mt-32 space-y-8">
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4 px-2">
                                    Categorical Classifications
                                    <span className="flex-1 h-px bg-slate-100"></span>
                                </h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(() => {
                                        const palette = ['teal', 'pink', 'indigo', 'orange', 'purple', 'rose', 'cyan'];
                                        const borderColors = ['#0D9488', '#F43F5E', '#6366f1', '#f59e0b', '#a855f7', '#e11d48', '#0891b2'];
                                        return types.map((t, idx) => {
                                            const color = palette[idx % palette.length];
                                            const borderColor = borderColors[idx % borderColors.length];
                                            return (
                                                <div key={t.id}
                                                    className="relative rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/30 p-8 flex flex-col h-full group hover:border-teal-400/50 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                                >
                                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                                                    <div className="flex items-center gap-3 mb-6 relative z-10">
                                                        <span className="text-2xl">{t.icon || '📌'}</span>
                                                        <h3 className="text-lg font-black text-slate-800 tracking-tight font-['Outfit'] uppercase">{t.name}</h3>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors">
                                                        {t.description}
                                                    </p>
                                                    
                                                    {Array.isArray(t.sample_words) && t.sample_words.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {t.sample_words.slice(0, 4).map((w, i) => (
                                                                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
                                                                    {w}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <button
                                                        onClick={() => scrollTo('resources')}
                                                        className="mt-auto w-full py-3 bg-slate-50 text-slate-400 font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-[#0D9488] hover:text-white transition-all shadow-sm"
                                                    >
                                                        Deep Dive →
                                                    </button>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </section>
                        )}

                        {/* -- Rules -- */}
                        {rules.length > 0 && (
                            <section id="section-rules" className="scroll-mt-32">
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-10 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                                    <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3 font-['Outfit'] uppercase relative z-10">
                                        <span className="w-10 h-10 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-xl">📋</span>
                                        Linguistic Protocols
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                        {rules.map((r) => {
                                            const isDo = r.rule_type === 'do';
                                            return (
                                                <div key={r.id} className={`p-6 rounded-3xl border ${isDo ? 'bg-teal-50/30 border-teal-100' : 'bg-pink-50/30 border-pink-100'}`}>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${isDo ? 'bg-teal-100 text-[#0D9488]' : 'bg-pink-100 text-[#F43F5E]'}`}>
                                                            {isDo ? '✓' : '✕'}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDo ? 'text-[#0D9488]' : 'text-[#F43F5E]'}`}>
                                                            {r.title || (isDo ? 'Best Practice' : 'Common Pitfall')}
                                                        </span>
                                                    </div>
                                                    {Array.isArray(r.points) && r.points.map((p, i) => (
                                                        <p key={i} className="text-sm font-semibold text-slate-600 leading-relaxed mb-1 italic">"{p}"</p>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* -- Examples -- */}
                        {examples.length > 0 && (
                            <section id="section-examples" className="scroll-mt-32 space-y-8">
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4 px-2">
                                    Contextual Realization
                                    <span className="flex-1 h-px bg-slate-100"></span>
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {examples.map((ex, idx) => (
                                        <div key={ex.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                            <div className="flex items-start gap-4">
                                                <span className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-300 font-black text-xs flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-colors duration-500">
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-800 leading-relaxed mb-4 italic" dangerouslySetInnerHTML={{ __html: ex.sentence }} />
                                                    {ex.usage_pattern && (
                                                        <span className="px-3 py-1 bg-teal-50 text-[#0D9488] text-[9px] font-black uppercase tracking-widest rounded-lg border border-teal-100">
                                                            {ex.usage_pattern}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Practical Labs ── */}
                        {(writingExercises.length > 0 || readingExercises.length > 0) && (
                            <section id="practical-labs" className="scroll-mt-32 space-y-8">
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4 px-2">
                                    Syntactic Laboratory
                                    <span className="flex-1 h-px bg-slate-100"></span>
                                </h2>
                                {writingExercises.map((ex) => (
                                    <div key={ex.id} className="bg-white rounded-[2.5rem] p-10 text-slate-800 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:border-teal-400/30 transition-all duration-500">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex items-center gap-4 mb-8 relative z-10">
                                            <span className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">✍️</span>
                                            <div>
                                                <span className="text-[10px] font-black text-[#F43F5E] uppercase tracking-[0.2em] block mb-1">Production Protocol</span>
                                                <h3 className="text-xl font-black font-['Outfit'] uppercase tracking-tight text-slate-800">{ex.title}</h3>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 mb-8 relative z-10">
                                            <p className="text-slate-500 text-sm font-medium italic leading-relaxed">"{ex.prompt}"</p>
                                        </div>
                                        <textarea
                                            className="w-full bg-white border border-slate-100 rounded-3xl p-6 text-slate-700 text-sm font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400/50 outline-none min-h-[160px] transition-all mb-8 relative z-10 shadow-inner"
                                            placeholder="Forge your response..."
                                            value={writingText}
                                            onChange={(e) => setWritingText(e.target.value)}
                                        />
                                        <div className="flex flex-wrap gap-4 relative z-10">
                                            <button
                                                onClick={() => setWritingSubmitted(true)}
                                                className="px-8 py-5 bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-xl transition-all active:scale-95 shadow-lg shadow-teal-500/20"
                                            >
                                                Transmit Entry
                                            </button>
                                            {ex.sample_answer && (
                                                <button
                                                    onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                                                    className="px-8 py-5 bg-white text-slate-400 border border-slate-100 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95"
                                                >
                                                    {showSampleAnswer ? 'Hide Reference' : 'View Reference'}
                                                </button>
                                            )}
                                        </div>
                                        {writingSubmitted && (
                                            <div className="mt-8 p-5 bg-teal-50 border border-teal-100 rounded-2xl text-[#0D9488] text-[10px] font-black uppercase tracking-widest animate-fadeIn flex items-center gap-3">
                                                <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-ping"></span>
                                                ✓ Data recorded for lexical assessment.
                                            </div>
                                        )}
                                        {showSampleAnswer && ex.sample_answer && (
                                            <div className="mt-8 p-8 bg-slate-50/80 border border-slate-100 rounded-[2rem] animate-slideUp">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Model Realization</span>
                                                <p className="text-slate-600 text-sm font-medium leading-relaxed italic border-l-2 border-teal-400 pl-6">"{ex.sample_answer}"</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </section>
                        )}

                        {/* ── Quiz ── */}
                        {quiz.length > 0 && (
                            <section id="section-quiz" className="scroll-mt-32 space-y-10">
                                <div className="text-center">
                                    <h2 className="text-xl font-black text-slate-800 mb-2 font-['Outfit'] uppercase tracking-tight">Cognitive Checkpoint</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Structural & Lexical Recall</p>
                                    <button
                                        onClick={() => { setShowQuizModal(true); setQuizModalIndex(0); setQuizModalAnswers({}); setSingleQuestionMode(false); }}
                                        className="px-10 py-5 bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white font-black rounded-[2rem] hover:shadow-2xl hover:shadow-teal-500/30 transition-all uppercase tracking-widest text-xs active:scale-95"
                                    >
                                        🚀 Initiate Full Assessment
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {quiz.map((q, qi) => {
                                        const answered = quizCardAnswers[q.id];
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => { setShowQuizModal(true); setQuizModalIndex(qi); setQuizModalAnswers({}); setSingleQuestionMode(true); }}
                                                className={`p-6 rounded-[2rem] border transition-all text-center group ${answered 
                                                    ? 'bg-white border-teal-100 shadow-lg' 
                                                    : 'bg-white border-slate-100 hover:border-teal-500/30'}`}
                                            >
                                                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-lg mx-auto mb-4 group-hover:bg-teal-50 transition-colors">
                                                    {q.emoji || '❓'}
                                                </div>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 block">Task {qi + 1}</span>
                                                {answered && (
                                                    <div className={`text-[10px] font-black uppercase tracking-widest ${answered.isCorrect ? 'text-[#0D9488]' : 'text-[#F43F5E]'}`}>
                                                        {answered.isCorrect ? 'Mastered' : 'Retry'}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* ── Resources ── */}
                        {resources.length > 0 && (
                            <section id="section-resources" className="scroll-mt-32 space-y-6">
                                <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4 px-2">
                                    Extended Repository
                                    <span className="flex-1 h-px bg-slate-100"></span>
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {resources.map((r) => (
                                        <a
                                            key={r.id}
                                            href={r.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-4 bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-xl hover:border-teal-400 group transition-all"
                                        >
                                            <span className="w-12 h-12 rounded-2xl bg-slate-50 text-[#0D9488] flex items-center justify-center text-xl group-hover:bg-teal-50 transition-colors">
                                                {r.resource_type === 'video' ? '🎬' : r.resource_type === 'article' ? '📄' : '🔗'}
                                            </span>
                                            <div>
                                                <p className="font-black text-slate-800 text-xs uppercase tracking-tight mb-1">{r.title}</p>
                                                {r.description && <p className="text-[10px] font-medium text-slate-400 italic">"{r.description}"</p>}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Finalization CTA ── */}
                        <div className="pt-20 pb-10">
                            <button
                                onClick={handleComplete}
                                disabled={completing || alreadyCompleted}
                                className={`w-full py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-2xl ${alreadyCompleted
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                    : 'bg-slate-900 text-white hover:bg-[#0D9488] hover:shadow-teal-500/40 active:scale-[0.98]'
                                    }`}
                            >
                                {alreadyCompleted ? '✓ Curriculum Milestone Achieved' : completing ? 'Transmitting Data...' : 'Finalize Module & Commit Progress'}
                            </button>
                        </div>
                    </main>
                </div>
            </div>

            {/* Assessment Modal Fragment (Logic needs to be inside the component) */}
            {/* The showQuizModal logic is handled inside the main render via the IIFE at 503 */}
        </div>
    );
}
