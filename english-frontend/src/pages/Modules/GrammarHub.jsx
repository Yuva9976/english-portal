

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarQuiz from '../../components/GrammarQuiz';
import GrammarGuide from '../../components/GrammarGuide';
import UniversalGrammar from '../../components/UniversalGrammar';
import TwentyGrammarRules from '../../components/TwentyGrammarRules';
import GrammarVocabulary from '../../components/GrammarVocabulary';
import EnhancedGrammarQuizzes from '../../components/EnhancedGrammarQuizzes';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50 relative overflow-x-hidden">
      {/* Header - aligned and sized as in screenshot */}
      <div className="w-full flex flex-col items-center justify-center pt-8 pb-2">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent drop-shadow-lg" style={{fontFamily:'inherit'}}>Grammar Hub</h1>
        <p className="text-base text-gray-700 mb-1 font-medium">Master English grammar with comprehensive lessons, interactive quizzes, and expert resources.</p>
        <p className="text-base text-gray-500">Your all-in-one platform for learning, practicing, and perfecting grammar skills.</p>
      </div>

      {/* What is Grammar - centered card, adjusted width/height/font as screenshot */}
      <div className="flex justify-center items-center w-full mt-2 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12 max-w-4xl w-full mx-4" style={{minHeight:'320px'}}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent mb-6 flex items-center"><span className="text-3xl mr-2">📚</span>What is Grammar?</h2>
          <p className="text-gray-700 mb-6 text-base leading-relaxed">Grammar is the system of rules that governs how words are combined to form meaningful sentences. It includes the structure, syntax, and organization of language, helping us communicate clearly and effectively in both written and spoken forms.</p>
          <div className="bg-[#f2f8fd] border-l-4 border-[#0080ff] rounded-lg p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center"><span className="text-xl mr-2">💡</span>Why is grammar important?</h3>
            <p className="text-gray-700 text-sm italic">Good grammar helps you communicate clearly and be understood correctly. It's essential for writing, speaking professionally, and expressing your ideas precisely. Whether you're writing an email, giving a presentation, or having a conversation, proper grammar ensures your message is clear.</p>
          </div>
        </div>
      </div>

      {/* Brief History */}
      <div className="mb-16 max-w-6xl mx-auto">
        <GradientHeading>Brief History of English Grammar</GradientHeading>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">📜</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Old English</h3>
              <p className="text-sm text-teal-600 font-semibold mb-3 text-center">(450-1150)</p>
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                English grammar was heavily influenced by Germanic languages. It had complex inflections (word endings that show grammatical function).
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-cyan-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">🏰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Middle English</h3>
              <p className="text-sm text-teal-600 font-semibold mb-3 text-center">(1150-1500)</p>
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                After the Norman Conquest, French influenced English grammar. The language simplified, and word order became more important.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-rose-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Modern English</h3>
              <p className="text-sm text-rose-600 font-semibold mb-3 text-center">(1500-Present)</p>
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                Grammar rules were standardized. English became a global language, adapting and evolving with technology and cultural exchange.
              </p>
            </div>
          </div>
        </div>

      {/* Quick Grammar Resources */}
      <div className="mb-16 max-w-6xl mx-auto">
        <GradientHeading>Quick Grammar Resources</GradientHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <button onClick={() => setShowGrammarGuide(true)} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 p-6 flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📖</span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Grammar Guide</span>
            </button>
            <button onClick={() => setShowUniversalGrammar(true)} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 p-6 flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🌐</span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Universal Grammar</span>
            </button>
            <button onClick={() => setShowTwentyRules(true)} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 p-6 flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📋</span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">20 Grammar Rules</span>
            </button>
            <button onClick={() => setShowVocabulary(true)} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 p-6 flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📝</span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Grammar Vocabulary</span>
            </button>
            <button onClick={() => setShowEnhancedQuizzes(true)} className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 p-6 flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">✍️</span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-teal-600 transition-colors">Grammar Quizzes</span>
            </button>
          </div>
        </div>
        
      {/* Grammar Quiz of the Day */}
      <div className="mb-16 max-w-6xl mx-auto text-center">
        <GradientHeading className="mb-4">🎯 Grammar Quiz of the Day</GradientHeading>
        <p className="text-gray-700 mb-4">Test your grammar skills with a new quiz every day!</p>
        <button onClick={() => setShowQuiz(true)} className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg">
          Start Quiz
        </button>
      </div>

      {/* Parts of Speech */}
      <div id="parts-of-speech" className="mb-16 max-w-6xl mx-auto">
        <GradientHeading>Parts of Speech</GradientHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Noun */}
          <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400" />
                    <div className="p-5">
                      <div className="text-center mb-3"><span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏛️</span></div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">Noun</h3>
                      <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">Names a person, place, thing, or idea</p>
                      <div className="flex gap-2">
                        <button onClick={() => navigate('/modules/grammar-hub/nouns')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/pronouns')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/verbs')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/adjectives')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/adverbs')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/prepositions')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/conjunctions')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
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
                        <button onClick={() => navigate('/modules/grammar-hub/interjections')} className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300">Learn</button>
                        <button onClick={() => navigate('/modules/grammar-hub/interjections-quiz')} className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg transition-all duration-300">Quiz</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Grammar Resources */}
      <div className="mb-16 mt-20 max-w-6xl mx-auto">
        <GradientHeading>Recommended Grammar Resources</GradientHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* EnglishClub Grammar */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">📘</span>
              <div className="flex-1">
                <h3 className="font-bold text-teal-600 text-lg mb-2">EnglishClub Grammar</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Comprehensive grammar lessons with clear explanations and practical examples for all levels</p>
                <a href="https://www.englishclub.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit EnglishClub.com →</a>
              </div>
            </div>
          </div>
          {/* Grammarly Handbook */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">✍️</span>
              <div className="flex-1">
                <h3 className="font-bold text-rose-600 text-lg mb-2">Grammarly Handbook</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Modern grammar guides with practical writing tips and insights into common mistakes</p>
                <a href="https://www.grammarly.com/handbook/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit Grammarly Handbook →</a>
              </div>
            </div>
          </div>
          {/* British Council */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">GB</span>
              <div className="flex-1">
                <h3 className="font-bold text-teal-600 text-lg mb-2">British Council</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Interactive grammar exercises and detailed explanations for learners at all levels</p>
                <a href="https://learnenglish.britishcouncil.org/grammar" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit BritishCouncil.org →</a>
              </div>
            </div>
          </div>
          {/* Oxford Learner's */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">📚</span>
              <div className="flex-1">
                <h3 className="font-bold text-teal-700 text-lg mb-2">Oxford Learner's</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Authoritative grammar reference from Oxford University Press with detailed examples</p>
                <a href="https://www.oxfordlearnersdictionaries.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit Oxford Dictionaries →</a>
              </div>
            </div>
          </div>
          {/* Cambridge English */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">🎓</span>
              <div className="flex-1">
                <h3 className="font-bold text-rose-700 text-lg mb-2">Cambridge English</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Grammar blog and comprehensive resources from Cambridge University experts</p>
                <a href="https://www.cambridgeenglish.org/learning-english/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit Cambridge.org →</a>
              </div>
            </div>
          </div>
          {/* Perfect English Grammar */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200">
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-3">⭐</span>
              <div className="flex-1">
                <h3 className="font-bold text-teal-600 text-lg mb-2">Perfect English Grammar</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Free downloadable PDFs and detailed grammar explanations with practice exercises</p>
                <a href="https://www.perfect-english-grammar.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-md hover:shadow-lg hover:scale-105 transition-all">Visit Perfect-English-Grammar.com →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Learning Tips */}
      <div className="mb-16 max-w-4xl mx-auto">
        <GradientHeading>Grammar Learning Tips</GradientHeading>
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
