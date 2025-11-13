import React from 'react';

const UniversalGrammar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-full relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🌐</span>
            <div>
              <h2 className="text-3xl font-bold">Universal Grammar</h2>
              <p className="text-teal-100 text-sm">Basic principles that apply to all languages</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What is Universal Grammar?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Universal Grammar (UG) is a theory proposed by linguist Noam Chomsky that suggests all humans are born with an innate ability to acquire language. It's the idea that certain grammatical principles are "hardwired" into the human brain.
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
              <p className="text-gray-700 italic">
                "Language is not a cultural artifact that we learn the way we learn to tell time. Instead, it is a distinct piece of the biological makeup of our brains." - Steven Pinker
              </p>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Concepts</h3>
            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🧠</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Innate Language Faculty</h4>
                    <p className="text-gray-600 text-sm">
                      Children are born with a natural ability to learn language. This explains why children worldwide learn their native language naturally without formal instruction, following similar developmental stages.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">🔤</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Common Grammatical Structures</h4>
                    <p className="text-gray-600 text-sm">
                      Despite surface differences, all languages share deep structural similarities. For example, all languages have nouns and verbs, questions and statements, and ways to express past, present, and future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-5">
                <div className="flex items-start space-x-3">
                  <span className="text-3xl">⚙️</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Language Acquisition Device (LAD)</h4>
                    <p className="text-gray-600 text-sm">
                      Chomsky proposed that humans have a mental "device" that helps them acquire language. This LAD contains the basic grammatical principles common to all languages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why It Matters for Learners */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Why It Matters for Language Learners</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">✓</span>
                  You Already Know More Than You Think
                </h4>
                <p className="text-sm text-gray-600">
                  Your native language knowledge helps you learn new languages faster because many grammatical concepts transfer across languages.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">✓</span>
                  Patterns Are Universal
                </h4>
                <p className="text-sm text-gray-600">
                  Understanding universal patterns helps you recognize similarities between languages and learn grammar structures more efficiently.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">✓</span>
                  Natural Learning Process
                </h4>
                <p className="text-sm text-gray-600">
                  Your brain is naturally wired for language. Trust the process and immerse yourself in the language.
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <span className="mr-2">✓</span>
                  Focus on Meaning
                </h4>
                <p className="text-sm text-gray-600">
                  Don't get too caught up in rules. Understanding meaning and context is often more important than perfect grammar.
                </p>
              </div>
            </div>
          </div>

          {/* Examples Across Languages */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Common Patterns Across Languages</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2">Subject-Verb-Object Order</h4>
                <p className="text-sm text-gray-600 mb-3">Most languages follow some version of this pattern:</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">English:</span> <span className="text-blue-600">I</span> <span className="text-purple-600">eat</span> <span className="text-pink-600">apples</span></p>
                  <p><span className="font-semibold">Spanish:</span> <span className="text-blue-600">Yo</span> <span className="text-purple-600">como</span> <span className="text-pink-600">manzanas</span></p>
                  <p><span className="font-semibold">French:</span> <span className="text-blue-600">Je</span> <span className="text-purple-600">mange</span> <span className="text-pink-600">des pommes</span></p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-bold text-gray-800 mb-2">Question Formation</h4>
                <p className="text-sm text-gray-600 mb-3">All languages have ways to form questions, often using word order changes or question words:</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">English:</span> What <span className="italic">do you want?</span></p>
                  <p><span className="font-semibold">Spanish:</span> ¿Qué <span className="italic">quieres?</span></p>
                  <p><span className="font-semibold">Mandarin:</span> 你 <span className="italic">想要 什么？</span> (Nǐ xiǎng yào shénme?)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-bold text-gray-800 mb-2">Plural Forms</h4>
                <p className="text-sm text-gray-600 mb-3">Most languages distinguish between one and many:</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">English:</span> book → book<span className="text-orange-600">s</span></p>
                  <p><span className="font-semibold">Arabic:</span> kitāb → kutub (complete word change)</p>
                  <p><span className="font-semibold">Japanese:</span> hon → hon-tachi (adds suffix)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Fascinating Facts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <span className="text-2xl mb-2 block">🔢</span>
                <h4 className="font-semibold text-gray-800 mb-2">7,000+ Languages</h4>
                <p className="text-sm text-gray-600">There are over 7,000 languages in the world, yet they all share fundamental grammatical principles.</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <span className="text-2xl mb-2 block">👶</span>
                <h4 className="font-semibold text-gray-800 mb-2">Critical Period</h4>
                <p className="text-sm text-gray-600">Children learn languages most easily before age 7-8, supporting the idea of innate language ability.</p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <span className="text-2xl mb-2 block">🧩</span>
                <h4 className="font-semibold text-gray-800 mb-2">Creole Languages</h4>
                <p className="text-sm text-gray-600">When people create new languages (creoles), they independently develop similar grammar structures, suggesting universal principles.</p>
              </div>
              <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                <span className="text-2xl mb-2 block">🌍</span>
                <h4 className="font-semibold text-gray-800 mb-2">Sign Languages Too!</h4>
                <p className="text-sm text-gray-600">Sign languages follow the same universal grammar principles as spoken languages, showing they're not just "translated" but true languages.</p>
              </div>
            </div>
          </div>

          {/* Further Learning */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Continue Learning</h3>
            <div className="space-y-3">
              <a
                href="https://www.youtube.com/results?search_query=noam+chomsky+universal+grammar"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📹</span>
                  <div>
                    <h4 className="font-semibold">Watch: Chomsky on Universal Grammar</h4>
                    <p className="text-sm text-blue-100">YouTube videos explaining the theory</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.chomsky.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <h4 className="font-semibold">Chomsky's Official Site</h4>
                    <p className="text-sm text-blue-100">Explore his work and theories</p>
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
