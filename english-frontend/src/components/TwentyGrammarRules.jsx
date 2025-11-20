import React, { useState } from 'react';

const TwentyGrammarRules = ({ onClose }) => {
  const [completedRules, setCompletedRules] = useState([]);

  const rules = [
    {
      id: 1,
      rule: 'Subject-Verb Agreement',
      explanation: 'The verb must agree with the subject in number (singular/plural).',
      example: '✓ She walks (singular) vs. They walk (plural)',
      wrong: '✗ She walk to school',
      tip: 'Add "s" to verbs with he/she/it in present tense'
    },
    {
      id: 2,
      rule: 'Use of Articles (a, an, the)',
      explanation: 'Use "a" before consonant sounds, "an" before vowel sounds, "the" for specific things.',
      example: '✓ a book, an apple, the sun',
      wrong: '✗ a apple, an book',
      tip: 'Listen to the sound, not just the letter'
    },
    {
      id: 3,
      rule: 'Pronoun-Antecedent Agreement',
      explanation: 'Pronouns must agree with the nouns they replace.',
      example: '✓ John lost his keys (both singular)',
      wrong: '✗ John lost their keys',
      tip: 'Make sure the pronoun matches in number and gender'
    },
    {
      id: 4,
      rule: 'Correct Verb Tenses',
      explanation: 'Use the appropriate tense for the time period.',
      example: '✓ I ate yesterday (past), I eat now (present)',
      wrong: '✗ I eat yesterday',
      tip: 'Match the tense to time words (yesterday, now, tomorrow)'
    },
    {
      id: 5,
      rule: 'Use of Apostrophes',
      explanation: 'Use apostrophes for possession and contractions, not plurals.',
      example: '✓ John\'s book, It\'s (it is) cold',
      wrong: '✗ Apple\'s on sale (should be Apples)',
      tip: 'Never use apostrophes for simple plurals'
    },
    {
      id: 6,
      rule: 'Double Negatives',
      explanation: 'Avoid using two negatives in one clause.',
      example: '✓ I don\'t need any help',
      wrong: '✗ I don\'t need no help',
      tip: 'Two negatives make a positive in English'
    },
    {
      id: 7,
      rule: 'Run-on Sentences',
      explanation: 'Don\'t join independent clauses without proper punctuation or conjunctions.',
      example: '✓ I love tea, and she loves coffee.',
      wrong: '✗ I love tea she loves coffee',
      tip: 'Use periods, semicolons, or conjunctions to separate ideas'
    },
    {
      id: 8,
      rule: 'Sentence Fragments',
      explanation: 'Every sentence needs a subject and a verb.',
      example: '✓ The dog barks. (complete)',
      wrong: '✗ Running down the street. (no subject)',
      tip: 'Ask: Who did what? If you can\'t answer, it\'s incomplete'
    },
    {
      id: 9,
      rule: 'Comparative and Superlative Forms',
      explanation: 'Use -er/-est for short adjectives, more/most for longer ones.',
      example: '✓ bigger, biggest; more beautiful, most beautiful',
      wrong: '✗ more big, beautifuler',
      tip: '1-2 syllables: add -er/-est; 3+ syllables: use more/most'
    },
    {
      id: 10,
      rule: 'Subject Pronouns vs. Object Pronouns',
      explanation: 'Use I/he/she/we/they as subjects; me/him/her/us/them as objects.',
      example: '✓ He and I went. Give it to him and me.',
      wrong: '✗ Him and me went. Give it to he and I.',
      tip: 'Remove the other person to test: "I went" not "Me went"'
    },
    {
      id: 11,
      rule: 'Comma Usage',
      explanation: 'Use commas to separate items in lists and independent clauses.',
      example: '✓ I bought apples, oranges, and bananas.',
      wrong: '✗ I bought apples oranges and bananas',
      tip: 'Think of commas as brief pauses in speech'
    },
    {
      id: 12,
      rule: 'Who vs. Whom',
      explanation: 'Use "who" as subject, "whom" as object.',
      example: '✓ Who called? (subject) To whom am I speaking? (object)',
      wrong: '✗ Whom called? To who am I speaking?',
      tip: 'Replace with he/him: "He called" = who; "to him" = whom'
    },
    {
      id: 13,
      rule: 'Its vs. It\'s',
      explanation: 'Its = possessive; It\'s = it is or it has.',
      example: '✓ The dog wagged its tail. It\'s raining.',
      wrong: '✗ The dog wagged it\'s tail',
      tip: 'Try replacing with "it is" - if it works, use it\'s'
    },
    {
      id: 14,
      rule: 'There, Their, They\'re',
      explanation: 'There = place; Their = possessive; They\'re = they are.',
      example: '✓ They\'re going to their house over there.',
      wrong: '✗ Their going to there house over they\'re',
      tip: 'They\'re has an apostrophe because it\'s a contraction'
    },
    {
      id: 15,
      rule: 'Affect vs. Effect',
      explanation: 'Affect = verb (to influence); Effect = noun (result).',
      example: '✓ The weather affects my mood. The effect was dramatic.',
      wrong: '✗ The weather effects my mood',
      tip: 'Affect is an Action; Effect is the End result'
    },
    {
      id: 16,
      rule: 'Fewer vs. Less',
      explanation: 'Fewer = countable items; Less = uncountable quantities.',
      example: '✓ fewer apples, less water',
      wrong: '✗ less apples, fewer water',
      tip: 'If you can count it, use fewer'
    },
    {
      id: 17,
      rule: 'Active vs. Passive Voice',
      explanation: 'Active voice is clearer and more direct.',
      example: '✓ The dog chased the cat (active) vs. The cat was chased by the dog (passive)',
      wrong: '✗ Overusing passive: The ball was thrown by me',
      tip: 'Prefer active voice unless the doer is unknown or unimportant'
    },
    {
      id: 18,
      rule: 'Dangling Modifiers',
      explanation: 'Make sure modifiers clearly refer to the right word.',
      example: '✓ Walking to school, I saw a bird.',
      wrong: '✗ Walking to school, the bird was seen. (The bird wasn\'t walking)',
      tip: 'The subject after the comma should be doing the action'
    },
    {
      id: 19,
      rule: 'Parallel Structure',
      explanation: 'Use the same grammatical form for items in a list.',
      example: '✓ I like swimming, running, and cycling.',
      wrong: '✗ I like swimming, to run, and cycling',
      tip: 'All items should have the same structure'
    },
    {
      id: 20,
      rule: 'Split Infinitives',
      explanation: 'While sometimes acceptable, avoid placing adverbs between "to" and the verb.',
      example: '✓ to go boldly (preferred) vs. to boldly go (split)',
      wrong: '✗ to really quickly run (double split)',
      tip: 'It\'s not always wrong, but consider alternatives for formal writing'
    }
  ];

  const toggleRule = (id) => {
    if (completedRules.includes(id)) {
      setCompletedRules(completedRules.filter(ruleId => ruleId !== id));
    } else {
      setCompletedRules([...completedRules, id]);
    }
  };

  const progress = (completedRules.length / rules.length) * 100;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-full relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-rose-600 text-white p-6 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">📋</span>
              <div>
                <h2 className="text-3xl font-bold">20 Essential Grammar Rules</h2>
                <p className="text-teal-100 text-sm">Master these rules for correct English</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Your Progress</span>
              <span>{completedRules.length} / {rules.length} completed</span>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-700">
              <span className="font-semibold">💡 Tip:</span> Click the checkbox next to each rule as you learn it to track your progress!
            </p>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => {
              const isCompleted = completedRules.includes(rule.id);
              return (
                <div
                  key={rule.id}
                  className={`border-2 rounded-lg p-5 transition-all duration-300 ${
                    isCompleted
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-teal-500'
                      }`}
                    >
                      {isCompleted && <span className="text-xl">✓</span>}
                    </button>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">
                          Rule {rule.id}: {rule.rule}
                        </h3>
                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                          #{rule.id}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-3">{rule.explanation}</p>

                      <div className="space-y-2 mb-3">
                        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
                          <p className="text-sm text-gray-700">{rule.example}</p>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                          <p className="text-sm text-gray-700">{rule.wrong}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-700">💡 Quick Tip:</span> {rule.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Practice Section */}
          <div className="mt-8 bg-gradient-to-r from-teal-600 to-rose-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Ready to Practice?</h3>
            <p className="mb-4">Test your knowledge of these rules with interactive exercises!</p>
            <div className="flex gap-3">
              <a
                href="https://www.grammarly.com/blog/grammar-rules/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                More Grammar Rules →
              </a>
              <button
                onClick={() => {
                  const blob = new Blob([
                    '20 ESSENTIAL GRAMMAR RULES\n\n' +
                    rules.map(r => `${r.id}. ${r.rule}\n${r.explanation}\n${r.example}\n${r.tip}\n`).join('\n')
                  ], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = '20-grammar-rules.txt';
                  a.click();
                }}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                📥 Download Rules
              </button>
            </div>
          </div>

          {/* Completion Message */}
          {completedRules.length === rules.length && (
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 text-center animate-scale-in">
              <span className="text-6xl block mb-3">🎉</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h3>
              <p className="text-gray-700">
                You've completed all 20 grammar rules! You're on your way to grammar mastery!
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TwentyGrammarRules;
