
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarQuiz from '../../components/GrammarQuiz';
import GrammarGuide from '../../components/GrammarGuide';
import UniversalGrammar from '../../components/UniversalGrammar';
import TwentyGrammarRules from '../../components/TwentyGrammarRules';
import GrammarVocabulary from '../../components/GrammarVocabulary';
import EnhancedGrammarQuizzes from '../../components/EnhancedGrammarQuizzes';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const GradientHeading = ({ children, className = '' }) => (
  <h2
    className={`text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm ${className}`}
  >
    {children}
  </h2>
);

const GrammarHub = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGrammarGuide, setShowGrammarGuide] = useState(false);
  const [showUniversalGrammar, setShowUniversalGrammar] = useState(false);
  const [showTwentyRules, setShowTwentyRules] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showEnhancedQuizzes, setShowEnhancedQuizzes] = useState(false);

  // Fetch parts-of-speech IDs from the backend so Learn buttons use real DB IDs
  const [partsMap, setPartsMap] = useState({});

  useEffect(() => {
    fetch(`${API}/grammar`)
      .then((r) => r.ok ? r.json() : [])
      .then((parts) => {
        const map = {};
        parts.forEach((p) => {
          // normalize: 'Noun' -> 'noun', 'Interjection' -> 'interjection'
          map[p.name.toLowerCase()] = p.id;
        });
        setPartsMap(map);
      })
      .catch(() => { });
  }, []);

  // Helper: navigate to dynamic lesson or fall back to legacy route
  const goToLesson = (name, fallback) => {
    const id = partsMap[name.toLowerCase()];
    if (id) navigate(`/modules/grammar-hub/lesson/${id}`);
    else navigate(fallback);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50 relative overflow-x-hidden">
      {/* Compact Premium Header */}
      <div className="w-full flex justify-center pt-6 pb-4">
        <div className="w-full max-w-4xl px-4">
          <div className="relative rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl p-4 md:p-6 flex items-center gap-4 md:gap-6">
            <div className="flex-none">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md">
                <span className="text-2xl md:text-3xl">📚</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 truncate">Grammar Hub</h1>
              <p className="text-sm md:text-base text-slate-700 mt-1 truncate">Explore clear lessons, fast practice, and smart quizzes — sharpen grammar in minutes a day.</p>
              <div className="mt-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <button onClick={() => navigate('/modules/grammar-hub')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-sm font-semibold shadow hover:scale-[1.02] transition">Explore</button>
                  <button onClick={() => setShowQuiz(true)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-teal-700 border border-teal-200 text-sm font-semibold shadow-sm hover:shadow-md transition">Quiz of the Day</button>
                  <a href="#parts-of-speech" className="ml-2 text-xs text-slate-600 hover:underline">Jump to parts</a>
                </div>
                <div className="w-28 h-1 bg-gradient-to-r from-teal-400 via-blue-400 to-rose-400 rounded-full mt-3" />
              </div>
            </div>
            {/* decorative accent removed per request */}
          </div>
        </div>
      </div>

      {/* What is Grammar - premium, screen-friendly card */}
      <div className="flex justify-center items-center w-full mt-2 mb-8">
        <div className="w-full max-w-6xl px-4">
          <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-lg p-8 md:p-10 w-full border border-teal-100" style={{ minHeight: '240px' }}>
            <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center"><span className="text-3xl mr-2">📚</span>What is Grammar?</h2>
            <p className="text-gray-700 mb-6 text-base leading-relaxed">Grammar is the system of rules that governs how words are combined to form meaningful sentences. It includes the structure, syntax, and organization of language, helping us communicate clearly and effectively in both written and spoken forms.</p>
            <div className="bg-[#f2f8fd] border-l-4 border-[#0080ff] rounded-lg p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center"><span className="text-xl mr-2">💡</span>Why is grammar important?</h3>
              <p className="text-gray-700 text-sm italic">Good grammar helps you communicate clearly and be understood correctly. It's essential for writing, speaking professionally, and expressing your ideas precisely. Whether you're writing an email, giving a presentation, or having a conversation, proper grammar ensures your message is clear.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brief History */}
      <div className="mb-16 max-w-6xl mx-auto">
        <GradientHeading className="md:text-4xl tracking-tight">Brief History of English Grammar</GradientHeading>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-300 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center mb-3">
              <span className="text-3xl">📜</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Old English</h3>
            <p className="text-sm text-teal-600 font-semibold mb-3 text-center">(450-1150)</p>
            <div className="flex-1">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                English grammar was heavily influenced by Germanic languages. It had complex inflections (word endings that show grammatical function).
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-cyan-300 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center mb-3">
              <span className="text-3xl">🏰</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Middle English</h3>
            <p className="text-sm text-teal-600 font-semibold mb-3 text-center">(1150-1500)</p>
            <div className="flex-1">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                After the Norman Conquest, French influenced English grammar. The language simplified, and word order became more important.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-rose-300 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="text-center mb-3">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Modern English</h3>
            <p className="text-sm text-rose-600 font-semibold mb-3 text-center">(1500-Present)</p>
            <div className="flex-1">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                Grammar rules were standardized. English became a global language, adapting and evolving with technology and cultural exchange.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Grammar Resources */}
      <div className="mb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Quick Grammar Resources</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <div onClick={() => setShowGrammarGuide(true)} role="button" className="group relative bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 p-4 flex flex-col items-center justify-center h-44 md:h-48">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-rose-400 shadow-md" aria-hidden />
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white text-xl md:text-2xl shadow-xl mb-2 transform transition-transform duration-300 group-hover:scale-110">📖</div>
              <div className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400">Grammar Guide</div>
            </div>
          </div>
          <div onClick={() => setShowUniversalGrammar(true)} role="button" className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden flex items-center justify-center h-44 md:h-48">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="text-center">
              <div className="text-3xl mb-2">🌐</div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">Universal Grammar</div>
            </div>
          </div>
          <div onClick={() => setShowTwentyRules(true)} role="button" className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden flex items-center justify-center h-44 md:h-48">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">20 Grammar Rules</div>
            </div>
          </div>
          <div onClick={() => setShowVocabulary(true)} role="button" className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden flex items-center justify-center h-44 md:h-48">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">Grammar Vocabulary</div>
            </div>
          </div>
          <div onClick={() => setShowEnhancedQuizzes(true)} role="button" className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden flex items-center justify-center h-44 md:h-48">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="text-center">
              <div className="text-3xl mb-2">✍️</div>
              <div className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">Grammar Quizzes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Quiz of the Day - simplified banner */}
      <div className="mb-16 max-w-6xl mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 flex flex-col items-center text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-rose-50/50" aria-hidden />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center text-white text-3xl shadow-lg mb-6 mx-auto">
                🎯
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-6 font-['Outfit']">Quiz of the Day</h3>
              <button 
                onClick={() => setShowQuiz(true)} 
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-rose-400 text-white font-bold text-lg shadow-xl shadow-teal-500/20 hover:scale-[1.05] transition-all duration-300"
              >
                Start Quiz
              </button>
            </div>
            {/* simple bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-cyan-300 to-rose-400" aria-hidden />
          </div>
        </div>
      </div>

      {/* Parts of Speech */}
      <div id="parts-of-speech" className="mb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Parts of Speech</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Noun */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏛️</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Noun</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Names a person, place, thing, or idea</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('noun', '/modules/grammar-hub/nouns')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/nouns-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Pronoun */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">💬</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Pronoun</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Replaces a noun to avoid repetition</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('pronoun', '/modules/grammar-hub/pronouns')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/pronouns-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Verb */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏃‍♂️</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Verb</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Expresses action or state of being</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('verb', '/modules/grammar-hub/verbs')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/verbs-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Adjective */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">✨</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Adjective</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Describes or modifies a noun</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('adjective', '/modules/grammar-hub/adjectives')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/adjectives-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Adverb */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">⚙️</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Adverb</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Modifies a verb, adjective, or adverb</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('adverb', '/modules/grammar-hub/adverbs')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/adverbs-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Preposition */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🧭</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Preposition</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Shows relationship between words</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('preposition', '/modules/grammar-hub/prepositions')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/prepositions-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Conjunction */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🔗</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Conjunction</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Connects words, phrases, or clauses</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('conjunction', '/modules/grammar-hub/conjunctions')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/conjunctions-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
          {/* Interjection */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
            <div className="p-5">
              <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">❗</span></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Interjection</h3>
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Expresses emotion or feeling</p>
              <div className="flex gap-2">
                <button onClick={() => goToLesson('interjection', '/modules/grammar-hub/interjections')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/interjections-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Grammar Resources */}
        <div className="mb-16 mt-20 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Recommended Grammar Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* EnglishClub Grammar */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xl shadow-lg flex-none">
                  <span className="sr-only">EnglishClub</span>📘
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">EnglishClub Grammar</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Comprehensive lessons</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">Clear explanations, practical examples, and exercises for all levels — ideal for steady progress.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://www.englishclub.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Free • Beginner → Advanced</span>
              </div>
            </div>

            {/* Grammarly Handbook */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xl shadow-lg flex-none">✍️</div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Grammarly Handbook</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Practical writing tips</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">Modern guidance and examples focused on common writing mistakes and professional tone.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://www.grammarly.com/handbook/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Tips • Examples</span>
              </div>
            </div>

            {/* British Council */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-lg flex-none">GB</div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">British Council</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Interactive exercises</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">Well-structured lessons and interactive practice designed for learners worldwide.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://learnenglish.britishcouncil.org/grammar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Interactive • Exercises</span>
              </div>
            </div>

            {/* Oxford Learner's */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-lg flex-none">📚</div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Oxford Learner's</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Authoritative reference</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">In-depth grammar explanations from Oxford with clear examples and references.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://www.oxfordlearnersdictionaries.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Reference • Detailed</span>
              </div>
            </div>

            {/* Cambridge English */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-lg flex-none">🎓</div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Cambridge English</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Expert resources</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">Trusted materials and articles from Cambridge to strengthen grammar understanding.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://www.cambridgeenglish.org/learning-english/grammar/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Authority • Guides</span>
              </div>
            </div>

            {/* Perfect English Grammar */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/30 flex flex-col h-full transform hover:-translate-y-1 transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xl shadow-lg flex-none">⭐</div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">Perfect English Grammar</h3>
                  <div className="text-xs text-teal-700 font-semibold mb-2">Practice exercises</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">Free downloadable PDFs and clear grammar explanations with lots of practice exercises.</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <a href="https://www.perfect-english-grammar.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition font-semibold">Visit →</a>
                <span className="text-xs text-slate-500">Exercises • PDFs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grammar Learning Tips */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Grammar Learning Tips</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 bg-white rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 text-sm leading-relaxed">Start with basics - master parts of speech first</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 text-sm leading-relaxed">Practice with real examples, not just rules</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 text-sm leading-relaxed">Review and revise regularly</p>
            </div>
            <div className="flex items-start space-x-3 bg-white rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 text-sm leading-relaxed">Use grammar in writing and speaking</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div>
            <GradientHeading>Frequently Asked Questions</GradientHeading>
            <div className="bg-white rounded-lg shadow-md p-6">
              <details className="mb-4">
                <summary className="font-semibold cursor-pointer text-gray-800">What is the best way to learn English grammar?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">Practice regularly, use real examples, and review your mistakes. Use quizzes and writing exercises to reinforce learning.</div>
              </details>
              <details className="mb-4">
                <summary className="font-semibold cursor-pointer text-gray-800">How long does it take to master English grammar?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">It depends on your starting level and practice frequency. Consistent daily practice can show results in a few months.</div>
              </details>
              <details className="mb-4">
                <summary className="font-semibold cursor-pointer text-gray-800">Do I need to memorize all grammar rules?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">No! Focus on understanding concepts and patterns. Practice and exposure make grammar intuitive over time.</div>
              </details>
              <details className="mb-4">
                <summary className="font-semibold cursor-pointer text-gray-800">What are the most common grammar mistakes?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">Confusing similar words (their/there/they're), subject-verb agreement, tense errors, and punctuation mistakes.</div>
              </details>
              <details className="mb-4">
                <summary className="font-semibold cursor-pointer text-gray-800">How can I practice grammar effectively?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">Use quizzes, write daily, and get feedback. Try to use new grammar in real conversations and writing.</div>
              </details>
              <details>
                <summary className="font-semibold cursor-pointer text-gray-800">Is grammar more important than vocabulary?</summary>
                <div className="p-4 pt-0 text-gray-700 text-sm leading-relaxed border-t border-gray-100">Both are important! Grammar gives structure, vocabulary gives you the words. Build both for best results.</div>
              </details>
            </div>
          </div>
          <div>
            <GradientHeading>Your Grammar Learning Journey</GradientHeading>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="flex items-center mb-2"><span className="text-2xl font-bold text-teal-600 mr-3">1</span><span className="font-bold text-gray-800">Week 1-2: Foundation</span></div>
                <div className="ml-8 text-sm text-gray-600 mb-2">Learn the 8 parts of speech and basic sentence structure</div>
                <div className="ml-8 flex flex-wrap gap-2 mb-2"><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">Parts of Speech</span><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">Sentence Types</span></div>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-2"><span className="text-2xl font-bold text-cyan-600 mr-3">2</span><span className="font-bold text-gray-800">Week 3-4: Tenses</span></div>
                <div className="ml-8 text-sm text-gray-600 mb-2">Master present, past, and future tenses with practice exercises</div>
                <div className="ml-8 flex flex-wrap gap-2 mb-2"><span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs">Verb Tenses</span><span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs">Time Expressions</span></div>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-2"><span className="text-2xl font-bold text-rose-600 mr-3">3</span><span className="font-bold text-gray-800">Week 5-6: Advanced Structures</span></div>
                <div className="ml-8 text-sm text-gray-600 mb-2">Complex sentences, conditionals, and passive voice</div>
                <div className="ml-8 flex flex-wrap gap-2 mb-2"><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">Conditionals</span><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">Passive Voice</span></div>
              </div>
              <div className="mb-6">
                <div className="flex items-center mb-2"><span className="text-2xl font-bold text-teal-600 mr-3">4</span><span className="font-bold text-gray-800">Week 7+: Practice & Perfect</span></div>
                <div className="ml-8 text-sm text-gray-600 mb-2">Regular quizzes, writing practice, and real-world application</div>
                <div className="ml-8 flex flex-wrap gap-2 mb-2"><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">Daily Quizzes</span><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">Writing Practice</span></div>
              </div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-4 bg-gradient-to-r from-teal-600 to-rose-400 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">Start Your Journey →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showQuiz && <GrammarQuiz onClose={() => setShowQuiz(false)} />}
      {showGrammarGuide && <GrammarGuide onClose={() => setShowGrammarGuide(false)} />}
      {showUniversalGrammar && <UniversalGrammar onClose={() => setShowUniversalGrammar(false)} />}
      {showTwentyRules && <TwentyGrammarRules onClose={() => setShowTwentyRules(false)} />}
      {showVocabulary && <GrammarVocabulary onClose={() => setShowVocabulary(false)} />}
      {showEnhancedQuizzes && <EnhancedGrammarQuizzes onClose={() => setShowEnhancedQuizzes(false)} />}
    </div>
  );
};

export default GrammarHub;
