import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarQuiz from '../../components/GrammarQuiz';
import GrammarGuide from '../../components/GrammarGuide';
import UniversalGrammar from '../../components/UniversalGrammar';
import TwentyGrammarRules from '../../components/TwentyGrammarRules';
import GrammarVocabulary from '../../components/GrammarVocabulary';
import EnhancedGrammarQuizzes from '../../components/EnhancedGrammarQuizzes';

const GrammarHub = () => {
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGrammarGuide, setShowGrammarGuide] = useState(false);
  const [showUniversalGrammar, setShowUniversalGrammar] = useState(false);
  const [showTwentyRules, setShowTwentyRules] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showEnhancedQuizzes, setShowEnhancedQuizzes] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Grammar Hub</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Master English grammar with comprehensive lessons, interactive quizzes, and expert resources</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-10 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center"><span className="text-3xl mr-3">📚</span>What is Grammar?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Grammar is the system of rules that governs how words are combined to form meaningful sentences. It includes the structure, syntax, and organization of language, helping us communicate clearly and effectively in both written and spoken forms.</p>
          
          <div className="border-l-4 border-primary bg-primary/10 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              Why is grammar important?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
              Good grammar helps you communicate clearly and be understood correctly. It's essential for writing, speaking professionally, and expressing your ideas precisely. Whether you're writing an email, giving a presentation, or having a conversation, proper grammar ensures your message is clear.
            </p>
          </div>
        </div>

        {/* Brief History of English Grammar */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Brief History of English Grammar</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg shadow-md p-6 border-t-4 border-accent hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">📜</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Old English</h3>
              <p className="text-sm text-primary font-semibold mb-3 text-center">(450-1150)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
                English grammar was heavily influenced by Germanic languages. It had complex inflections (word endings that show grammatical function).
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg shadow-md p-6 border-t-4 border-primary hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">🏰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Middle English</h3>
              <p className="text-sm text-primary font-semibold mb-3 text-center">(1150-1500)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
                After the Norman Conquest, French influenced English grammar. The language simplified, and word order became more important.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg shadow-md p-6 border-t-4 border-secondary hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-3">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Modern English</h3>
              <p className="text-sm text-primary font-semibold mb-3 text-center">(1500-Present)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
                Grammar rules were standardized. English became a global language, adapting and evolving with technology and cultural exchange.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Grammar Resources */}
        <div className="mb-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Quick Grammar Resources</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <button onClick={() => setShowGrammarGuide(true)} className="group bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-300 border-2 border-primary/50 hover:border-primary flex flex-col items-center justify-center min-h-[140px] transform hover:-translate-y-2">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📖</span>
              <span className="text-base font-bold text-gray-800 dark:text-white">Grammar Guide</span>
            </button>
            <button onClick={() => setShowUniversalGrammar(true)} className="group bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-300 border-2 border-primary/50 hover:border-primary flex flex-col items-center justify-center min-h-[140px] transform hover:-translate-y-2">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🌐</span>
              <span className="text-base font-bold text-gray-800 dark:text-white">Universal Grammar</span>
            </button>
            <button onClick={() => setShowTwentyRules(true)} className="group bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-300 border-2 border-accent/50 hover:border-accent flex flex-col items-center justify-center min-h-[140px] transform hover:-translate-y-2">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📋</span>
              <span className="text-base font-bold text-gray-800 dark:text-white">20 Grammar Rules</span>
            </button>
            <button onClick={() => setShowVocabulary(true)} className="group bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-300 border-2 border-secondary/50 hover:border-secondary flex flex-col items-center justify-center min-h-[140px] transform hover:-translate-y-2">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📝</span>
              <span className="text-base font-bold text-gray-800 dark:text-white">Grammar Vocabulary</span>
            </button>
            <button onClick={() => setShowEnhancedQuizzes(true)} className="group bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-300 border-2 border-accent/50 hover:border-accent flex flex-col items-center justify-center min-h-[140px] transform hover:-translate-y-2">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">✍️</span>
              <span className="text-base font-bold text-gray-800 dark:text-white">Grammar Quizzes</span>
            </button>
          </div>
        </div>

        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-2 border-accent/50 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="bg-gradient-to-r from-accent to-blue-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-1">Grammar Quiz of the Day</h3>
                    <p className="text-purple-100 text-sm">Test your skills with today's challenge</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowQuiz(true)} 
                  className="bg-white text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/10 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
                >
                  <span>Start Quiz</span>
                  <span>→</span>
                </button>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-r from-accent/10 to-blue-500/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">10</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">5 min</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">Goal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Modal */}
        {showQuiz && <GrammarQuiz onClose={() => setShowQuiz(false)} />}

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-accent mb-6 text-center">Parts of Speech</h2>
          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mb-6 max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-accent">What are Parts of Speech?</span> Parts of speech are categories that describe the function of words in a sentence. Understanding these 8 fundamental categories helps you construct grammatically correct sentences and communicate effectively.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Noun */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-blue-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏛️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Noun</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Names a person, place, thing, or idea</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/nouns')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-blue-500 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/nouns-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Pronoun */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-green-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">💬</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Pronoun</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Replaces a noun to avoid repetition</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/pronouns')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-green-500 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/pronouns-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Verb */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-purple-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🏃</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Verb</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Expresses action or state of being</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/verbs')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-purple-500 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/verbs-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Adjective */}
            <div className="group bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/50 dark:to-pink-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-pink-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">✨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Adjective</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Describes or modifies a noun</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/adjectives')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-pink-500 text-pink-700 dark:text-pink-400 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/adjectives-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Adverb */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-yellow-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">⚙️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Adverb</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Modifies a verb, adjective, or adverb</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/adverbs')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-yellow-500 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/adverbs-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Preposition */}
            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-indigo-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🌉</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Preposition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Shows relationship between words</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/prepositions')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-indigo-500 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/prepositions-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Conjunction */}
            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-red-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">🔗</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Conjunction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Connects words, phrases, or clauses</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/conjunctions')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-red-500 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/conjunctions-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300">Quiz</button>
              </div>
            </div>

            {/* Interjection */}
            <div className="group bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 rounded-lg shadow-md hover:shadow-lg p-5 transition-all duration-300 border-l-4 border-teal-500 hover:-translate-y-1">
              <div className="text-center mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">❗</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center">Interjection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center leading-relaxed">Expresses emotion or feeling</p>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/grammar-hub/interjections')} className="flex-1 px-3 py-2 text-xs font-semibold border-2 border-teal-500 text-teal-700 dark:text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all duration-300">Learn</button>
                <button onClick={() => navigate('/modules/grammar-hub/interjections-quiz')} className="flex-1 px-3 py-2 text-xs font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300">Quiz</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Grammar Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-accent mb-8 text-center">Recommended Grammar Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">📘</span>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-600 text-lg mb-2">EnglishClub Grammar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Comprehensive grammar lessons with clear explanations and practical examples for all levels
                  </p>
                  <a href="https://www.englishclub.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Visit EnglishClub.com →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">✍️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-green-600 text-lg mb-2">Grammarly Handbook</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Modern grammar guides with practical writing tips and insights into common mistakes
                  </p>
                  <a href="https://www.grammarly.com/blog/category/handbook/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Visit Grammarly.com →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">🇬🇧</span>
                <div className="flex-1">
                  <h3 className="font-bold text-red-600 text-lg mb-2">British Council</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Interactive grammar exercises and detailed explanations for learners at all levels
                  </p>
                  <a href="https://learnenglish.britishcouncil.org/grammar" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                    Visit BritishCouncil.org →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">📚</span>
                <div className="flex-1">
                  <h3 className="font-bold text-accent text-lg mb-2">Oxford Learner's</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Authoritative grammar reference from Oxford University Press with detailed examples
                  </p>
                  <a href="https://www.oxfordlearnersdictionaries.com/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-purple-700 transition">
                    Visit Oxford Dictionaries →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">🎓</span>
                <div className="flex-1">
                  <h3 className="font-bold text-indigo-600 text-lg mb-2">Cambridge English</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Grammar blog and comprehensive resources from Cambridge University experts
                  </p>
                  <a href="https://www.cambridge.org/elt/blog/grammar/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                    Visit Cambridge.org →
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">⭐</span>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-600 text-lg mb-2">Perfect English Grammar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Free downloadable PDFs and detailed grammar explanations with practice exercises
                  </p>
                  <a href="https://www.perfect-english-grammar.com/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 text-sm font-medium bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition">
                    Visit Perfect-English-Grammar.com →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-accent mb-8 text-center">Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">Common Mistakes</h3>
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/50">
                  <div className="flex items-start">
                    <span className="text-red-500 font-bold mr-2 text-lg">✗</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 dark:text-red-400 line-through mb-1">I seen that movie</p>
                      <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-1">✓ I saw that movie</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">Use simple past tense, not past participle</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/50">
                  <div className="flex items-start">
                    <span className="text-red-500 font-bold mr-2 text-lg">✗</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 dark:text-red-400 line-through mb-1">Me and John went</p>
                      <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-1">✓ John and I went</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">Subject pronouns come first; use 'I' not 'me'</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800/50">
                  <div className="flex items-start">
                    <span className="text-red-500 font-bold mr-2 text-lg">✗</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-700 dark:text-red-400 line-through mb-1">Your going there</p>
                      <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-1">✓ You're going there</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 italic">You're = you are; your = possessive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-600 mb-4">Irregular Verbs</h3>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-5 border border-cyan-200 dark:border-cyan-800/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-cyan-300 dark:border-cyan-700">
                      <th className="text-left py-2 px-2 font-bold text-cyan-800 dark:text-cyan-300">Base</th>
                      <th className="text-left py-2 px-2 font-bold text-cyan-800 dark:text-cyan-300">Past</th>
                      <th className="text-left py-2 px-2 font-bold text-cyan-800 dark:text-cyan-300">Past Participle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-cyan-200 dark:border-cyan-800">
                      <td className="py-2 px-2 text-gray-700 dark:text-gray-300">go</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">went</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">gone</td>
                    </tr>
                    <tr className="border-b border-cyan-200 dark:border-cyan-800">
                      <td className="py-2 px-2 text-gray-700 dark:text-gray-300">see</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">saw</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">seen</td>
                    </tr>
                    <tr className="border-b border-cyan-200 dark:border-cyan-800">
                      <td className="py-2 px-2 text-gray-700 dark:text-gray-300">eat</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">ate</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">eaten</td>
                    </tr>
                    <tr className="border-b border-cyan-200 dark:border-cyan-800">
                      <td className="py-2 px-2 text-gray-700 dark:text-gray-300">write</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">wrote</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">written</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-gray-700 dark:text-gray-300">take</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">took</td>
                      <td className="py-2 px-2 text-gray-800 dark:text-gray-200 font-semibold">taken</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center">Grammar Learning Tips</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/70 rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">Start with basics - master parts of speech first</p>
            </div>
            <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/70 rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">Practice with real examples, not just rules</p>
            </div>
            <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/70 rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">Read English texts to see grammar in context</p>
            </div>
            <div className="flex items-start space-x-3 bg-white/70 dark:bg-gray-800/70 rounded-lg p-5 shadow-sm">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">Complete exercises after every lesson</p>
            </div>
          </div>
        </div>

        {/* FAQ and Study Plan - Side by Side on Desktop */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-blue-600 mr-3">❓</span>
                    What is the best way to learn English grammar?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  Start with the fundamentals - the 8 parts of speech. Practice regularly with exercises, read English texts to see grammar in context, and apply what you learn through writing and speaking. Consistency is key!
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-green-600 mr-3">❓</span>
                    How long does it take to master English grammar?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  It varies by person, but with consistent practice (30-60 minutes daily), most learners see significant improvement in 3-6 months. Basic grammar can be learned in weeks, but mastery takes continuous practice and exposure to the language.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-purple-600 mr-3">❓</span>
                    Do I need to memorize all grammar rules?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  No! Focus on understanding concepts and patterns rather than memorizing rules. Through practice and exposure, grammar becomes intuitive. Start with common rules, practice them, and gradually expand your knowledge.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-red-600 mr-3">❓</span>
                    What are the most common grammar mistakes?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  Common mistakes include: confusing "your/you're", "their/there/they're", subject-verb agreement errors, incorrect tense usage, and misusing "me/I". Check our Quick Reference section above for more examples and corrections.
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-yellow-600 mr-3">❓</span>
                    How can I practice grammar effectively?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  Take our daily quizzes, complete exercises after each lesson, write sentences using new grammar rules, read English books and articles, and practice speaking. Mix different practice methods for best results!
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
                <summary className="cursor-pointer p-4 font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <span className="text-teal-600 mr-3">❓</span>
                    Is grammar more important than vocabulary?
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 pt-0 text-gray-700 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-700">
                  Both are equally important! Grammar provides the structure to organize words correctly, while vocabulary gives you the words to express ideas. Focus on building both skills simultaneously for effective communication.
                </div>
              </details>
            </div>
          </div>

          {/* Study Plan Section */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-6 text-center">Your Grammar Learning Journey</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 flex-shrink-0">
                  <span className="text-xl">1️⃣</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Week 1-2: Foundation</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Learn the 8 parts of speech and basic sentence structure</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Parts of Speech</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Sentence Types</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-green-500">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0">
                  <span className="text-xl">2️⃣</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Week 3-4: Tenses</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Master present, past, and future tenses with practice exercises</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verb Tenses</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Time Expressions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-purple-500">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-2 flex-shrink-0">
                  <span className="text-xl">3️⃣</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Week 5-6: Advanced Structures</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Complex sentences, conditionals, and passive voice</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Conditionals</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Passive Voice</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border-l-4 border-yellow-500">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-2 flex-shrink-0">
                  <span className="text-xl">4️⃣</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 text-sm">Week 7+: Practice & Perfect</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Regular quizzes, writing practice, and real-world application</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Daily Quizzes</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Writing Practice</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button onClick={() => navigate('/modules/learn-english/grammar')} className="bg-accent text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-700 shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                Start Your Journey →
              </button>
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
