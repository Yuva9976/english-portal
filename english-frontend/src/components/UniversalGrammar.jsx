import React from 'react';

const UniversalGrammar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-full relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-rose-400 text-white p-3 sticky top-0 z-10 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 z-20 shadow-lg"
          >
            <span className="text-lg font-bold">✕</span>
          </button>
          <div className="text-center mb-2">
            <span className="text-3xl block mb-1 animate-pulse">🌐</span>
            <h2 className="text-xl font-bold drop-shadow-lg">Universal Grammar</h2>
            <p className="text-white/90 text-xs mt-1">Basic principles that apply to all languages</p>
          </div>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-rose-400 bg-clip-text text-transparent mb-4">What is Universal Grammar?</h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Universal Grammar (UG) is a theory proposed by linguist Noam Chomsky that suggests all humans are born with an innate ability to acquire language. It's the idea that certain grammatical principles are "hardwired" into the human brain.
            </p>
            <div className="bg-gradient-to-r from-teal-50 via-rose-50 to-orange-50 border-l-4 border-teal-400 p-5 rounded-r-xl shadow-lg">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💭</span>
                <p className="text-gray-800 italic text-sm">
                  "Language is not a cultural artifact that we learn the way we learn to tell time. Instead, it is a distinct piece of the biological makeup of our brains." - <span className="font-bold text-teal-600">Steven Pinker</span>
                </p>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-rose-400 bg-clip-text text-transparent mb-6">Key Concepts</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-teal-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-teal-700 mb-2">Innate Language Faculty</h4>
                    <p className="text-gray-700 text-sm">
                      Children are born with a natural ability to learn language. This explains why children worldwide learn their native language naturally without formal instruction, following similar developmental stages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-rose-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 rounded-full p-3">
                    <span className="text-3xl">🔤</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-rose-700 mb-2">Common Grammatical Structures</h4>
                    <p className="text-gray-700 text-sm">
                      Despite surface differences, all languages share deep structural similarities. For example, all languages have nouns and verbs, questions and statements, and ways to express past, present, and future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-orange-200 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <span className="text-3xl">⚙️</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-orange-700 mb-2">Language Acquisition Device (LAD)</h4>
                    <p className="text-gray-700 text-sm">
                      Chomsky proposed that humans have a mental "device" that helps them acquire language. This LAD contains the basic grammatical principles common to all languages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why It Matters for Learners */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-rose-400 bg-clip-text text-transparent mb-6">Why It Matters for Language Learners</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-teal-700 mb-3 flex items-center text-base">
                  <span className="text-xl mr-3 bg-teal-100 rounded-full w-10 h-10 flex items-center justify-center">✓</span>
                  You Already Know More Than You Think
                </h4>
                <p className="text-gray-700 text-sm">
                  Your native language knowledge helps you learn new languages faster because many grammatical concepts transfer across languages.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-rose-700 mb-3 flex items-center text-base">
                  <span className="text-xl mr-3 bg-rose-100 rounded-full w-10 h-10 flex items-center justify-center">✓</span>
                  Patterns Are Universal
                </h4>
                <p className="text-gray-700 text-sm">
                  Understanding universal patterns helps you recognize similarities between languages and learn grammar structures more efficiently.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-orange-700 mb-3 flex items-center text-base">
                  <span className="text-xl mr-3 bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center">✓</span>
                  Natural Learning Process
                </h4>
                <p className="text-gray-700 text-sm">
                  Your brain is naturally wired for language. Trust the process and immerse yourself in the language.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center text-base">
                  <span className="text-xl mr-3 bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center">✓</span>
                  Focus on Meaning
                </h4>
                <p className="text-gray-700 text-sm">
                  Don't get too caught up in rules. Understanding meaning and context is often more important than perfect grammar.
                </p>
              </div>
            </div>
          </div>

          {/* Examples Across Languages */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-rose-400 bg-clip-text text-transparent mb-6">Common Patterns Across Languages</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-teal-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">📝</span>
                  <h4 className="font-bold text-teal-700 text-lg">Subject-Verb-Object Order</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">Most languages follow some version of this pattern:</p>
                <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm"><span className="font-bold text-teal-600">English:</span> <span className="bg-teal-100 px-2 py-1 rounded font-semibold">I</span> <span className="bg-rose-100 px-2 py-1 rounded font-semibold">eat</span> <span className="bg-orange-100 px-2 py-1 rounded font-semibold">apples</span></p>
                  <p className="text-sm"><span className="font-bold text-teal-600">Spanish:</span> <span className="bg-teal-100 px-2 py-1 rounded font-semibold">Yo</span> <span className="bg-rose-100 px-2 py-1 rounded font-semibold">como</span> <span className="bg-orange-100 px-2 py-1 rounded font-semibold">manzanas</span></p>
                  <p className="text-sm"><span className="font-bold text-teal-600">French:</span> <span className="bg-teal-100 px-2 py-1 rounded font-semibold">Je</span> <span className="bg-rose-100 px-2 py-1 rounded font-semibold">mange</span> <span className="bg-orange-100 px-2 py-1 rounded font-semibold">des pommes</span></p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-rose-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">❓</span>
                  <h4 className="font-bold text-rose-700 text-lg">Question Formation</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">All languages have ways to form questions:</p>
                <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm"><span className="font-bold text-rose-600">English:</span> <span className="italic bg-rose-50 px-2 py-1 rounded">What do you want?</span></p>
                  <p className="text-sm"><span className="font-bold text-rose-600">Spanish:</span> <span className="italic bg-rose-50 px-2 py-1 rounded">¿Qué quieres?</span></p>
                  <p className="text-sm"><span className="font-bold text-rose-600">Mandarin:</span> <span className="italic bg-rose-50 px-2 py-1 rounded">你想要什么？</span></p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-orange-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">🔢</span>
                  <h4 className="font-bold text-orange-700 text-lg">Plural Forms</h4>
                </div>
                <p className="text-gray-700 mb-3 text-sm">Most languages distinguish between one and many:</p>
                <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-sm"><span className="font-bold text-orange-600">English:</span> book → <span className="bg-orange-100 px-2 py-1 rounded font-semibold">books</span></p>
                  <p className="text-sm"><span className="font-bold text-orange-600">Arabic:</span> kitāb → <span className="bg-orange-100 px-2 py-1 rounded font-semibold">kutub</span></p>
                  <p className="text-sm"><span className="font-bold text-orange-600">Japanese:</span> hon → <span className="bg-orange-100 px-2 py-1 rounded font-semibold">hon-tachi</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-rose-400 bg-clip-text text-transparent mb-6">🎉 Fascinating Facts</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <span className="text-3xl mb-3 block">🔢</span>
                <h4 className="font-bold text-teal-700 mb-2 text-base">7,000+ Languages</h4>
                <p className="text-gray-700 text-sm">There are over 7,000 languages in the world, yet they all share fundamental grammatical principles.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-rose-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <span className="text-3xl mb-3 block">👶</span>
                <h4 className="font-bold text-rose-700 mb-2 text-base">Critical Period</h4>
                <p className="text-gray-700 text-sm">Children learn languages most easily before age 7-8, supporting the idea of innate language ability.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <span className="text-3xl mb-3 block">🧩</span>
                <h4 className="font-bold text-orange-700 mb-2 text-base">Creole Languages</h4>
                <p className="text-gray-700 text-sm">When people create new languages (creoles), they independently develop similar grammar structures, suggesting universal principles.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <span className="text-3xl mb-3 block">🌍</span>
                <h4 className="font-bold text-amber-700 mb-2 text-base">Sign Languages Too!</h4>
                <p className="text-gray-700 text-sm">Sign languages follow the same universal grammar principles as spoken languages, showing they're not just "translated" but true languages.</p>
              </div>
            </div>
          </div>

          {/* Further Learning */}
          <div className="bg-gradient-to-r from-teal-400 via-rose-300 to-orange-300 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-xl font-bold">Continue Learning</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.youtube.com/results?search_query=noam+chomsky+universal+grammar"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/30 rounded-full p-2">
                    <span className="text-2xl">📹</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Watch: Chomsky on Universal Grammar</h4>
                    <p className="text-xs text-white/90">YouTube videos explaining the theory</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.chomsky.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/30 rounded-full p-2">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Chomsky's Official Site</h4>
                    <p className="text-xs text-white/90">Explore his work and theories</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalGrammar;
