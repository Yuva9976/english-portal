import React, { useState } from 'react';

const GrammarGuide = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', name: 'Introduction', icon: '📖' },
    { id: 'parts', name: 'Parts of Speech', icon: '🏛️' },
    { id: 'structure', name: 'Sentence Structure', icon: '🔨' },
    { id: 'tenses', name: 'Tenses', icon: '⏰' },
    { id: 'mistakes', name: 'Common Mistakes', icon: '⚠️' },
    { id: 'punctuation', name: 'Punctuation', icon: '✏️' },
    { id: 'practice', name: 'Practice', icon: '💪' }
  ];

  const partsOfSpeech = [
    {
      name: 'Nouns',
      icon: '🏛️',
      description: 'Names of people, places, things, or ideas',
      examples: ['dog', 'London', 'happiness', 'book'],
      types: ['Common nouns (dog, city)', 'Proper nouns (John, Paris)', 'Abstract nouns (love, freedom)']
    },
    {
      name: 'Pronouns',
      icon: '👥',
      description: 'Replace nouns to avoid repetition',
      examples: ['he', 'she', 'it', 'they', 'we'],
      types: ['Personal (I, you, he)', 'Possessive (mine, yours)', 'Demonstrative (this, that)']
    },
    {
      name: 'Verbs',
      icon: '🏃',
      description: 'Show actions or states of being',
      examples: ['run', 'is', 'think', 'have'],
      types: ['Action verbs (run, jump)', 'Linking verbs (is, seem)', 'Helping verbs (will, have)']
    },
    {
      name: 'Adjectives',
      icon: '✨',
      description: 'Describe or modify nouns',
      examples: ['big', 'beautiful', 'happy', 'blue'],
      types: ['Descriptive (beautiful)', 'Quantitative (many, few)', 'Demonstrative (this, those)']
    },
    {
      name: 'Adverbs',
      icon: '⚙️',
      description: 'Modify verbs, adjectives, or other adverbs',
      examples: ['quickly', 'very', 'well', 'carefully'],
      types: ['Manner (quickly)', 'Time (yesterday)', 'Place (here)', 'Degree (very)']
    },
    {
      name: 'Prepositions',
      icon: '🌉',
      description: 'Show relationships between words',
      examples: ['in', 'on', 'at', 'under', 'between'],
      types: ['Place (in, on)', 'Time (at, during)', 'Direction (to, from)']
    },
    {
      name: 'Conjunctions',
      icon: '🔗',
      description: 'Connect words, phrases, or clauses',
      examples: ['and', 'but', 'or', 'because', 'although'],
      types: ['Coordinating (and, but)', 'Subordinating (because, if)', 'Correlative (either...or)']
    },
    {
      name: 'Interjections',
      icon: '❗',
      description: 'Express emotion or sudden feeling',
      examples: ['Wow!', 'Oh!', 'Ouch!', 'Hooray!'],
      types: ['Joy (Hooray!)', 'Surprise (Wow!)', 'Pain (Ouch!)', 'Greeting (Hello!)']
    }
  ];

  const tenseData = [
    {
      category: 'Present Tenses',
      color: 'blue',
      tenses: [
        { name: 'Simple Present', form: 'I walk', use: 'Habits, facts, general truths', example: 'I walk to school every day.' },
        { name: 'Present Continuous', form: 'I am walking', use: 'Actions happening now', example: 'I am walking to the store right now.' },
        { name: 'Present Perfect', form: 'I have walked', use: 'Actions completed at an unspecified time', example: 'I have walked this path before.' },
        { name: 'Present Perfect Continuous', form: 'I have been walking', use: 'Actions that started in the past and continue now', example: 'I have been walking for an hour.' }
      ]
    },
    {
      category: 'Past Tenses',
      color: 'purple',
      tenses: [
        { name: 'Simple Past', form: 'I walked', use: 'Completed actions in the past', example: 'I walked to school yesterday.' },
        { name: 'Past Continuous', form: 'I was walking', use: 'Actions in progress in the past', example: 'I was walking when it started raining.' },
        { name: 'Past Perfect', form: 'I had walked', use: 'Actions completed before another past action', example: 'I had walked 5 miles before I stopped.' },
        { name: 'Past Perfect Continuous', form: 'I had been walking', use: 'Ongoing actions before a past moment', example: 'I had been walking for hours before I arrived.' }
      ]
    },
    {
      category: 'Future Tenses',
      color: 'green',
      tenses: [
        { name: 'Simple Future', form: 'I will walk', use: 'Future actions or predictions', example: 'I will walk to school tomorrow.' },
        { name: 'Future Continuous', form: 'I will be walking', use: 'Actions in progress at a future time', example: 'I will be walking at 3 PM.' },
        { name: 'Future Perfect', form: 'I will have walked', use: 'Actions completed before a future time', example: 'I will have walked 10 miles by then.' },
        { name: 'Future Perfect Continuous', form: 'I will have been walking', use: 'Ongoing actions until a future time', example: 'I will have been walking for 2 hours by 5 PM.' }
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Your vs You're",
      wrong: "Your going to love this!",
      correct: "You're going to love this!",
      tip: "You're = You are. Your = possessive (your book)"
    },
    {
      mistake: "Their, There, They're",
      wrong: "Their going to the park over they're.",
      correct: "They're going to the park over there.",
      tip: "They're = They are. Their = possessive. There = location"
    },
    {
      mistake: "Its vs It's",
      wrong: "The dog wagged it's tail.",
      correct: "The dog wagged its tail.",
      tip: "It's = It is. Its = possessive (no apostrophe!)"
    },
    {
      mistake: "Subject-Verb Agreement",
      wrong: "She don't like pizza.",
      correct: "She doesn't like pizza.",
      tip: "Use 'doesn't' with he/she/it, 'don't' with I/you/we/they"
    },
    {
      mistake: "Double Negatives",
      wrong: "I don't need no help.",
      correct: "I don't need any help.",
      tip: "Avoid using two negatives in one sentence"
    },
    {
      mistake: "Me vs I",
      wrong: "Me and John went to the store.",
      correct: "John and I went to the store.",
      tip: "Use 'I' as subject, 'me' as object. Remove the other person to test."
    }
  ];

  const punctuationRules = [
    {
      mark: '.',
      name: 'Period/Full Stop',
      use: 'End of a declarative sentence',
      example: 'I love learning English.'
    },
    {
      mark: ',',
      name: 'Comma',
      use: 'Separate items in a list or clauses',
      example: 'I bought apples, oranges, and bananas.'
    },
    {
      mark: '?',
      name: 'Question Mark',
      use: 'End of a question',
      example: 'How are you today?'
    },
    {
      mark: '!',
      name: 'Exclamation Mark',
      use: 'Show strong emotion',
      example: 'That\'s amazing!'
    },
    {
      mark: ':',
      name: 'Colon',
      use: 'Introduce a list or explanation',
      example: 'You need three things: pen, paper, patience.'
    },
    {
      mark: ';',
      name: 'Semicolon',
      use: 'Connect related sentences',
      example: 'I love tea; she prefers coffee.'
    },
    {
      mark: '"  "',
      name: 'Quotation Marks',
      use: 'Direct speech or quotes',
      example: 'She said, "Hello!"'
    },
    {
      mark: '\'',
      name: 'Apostrophe',
      use: 'Show possession or contractions',
      example: 'John\'s book / It\'s (it is)'
    }
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-rose-600 text-white p-3 shadow-xl flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 z-20"
          >
            <span className="text-lg font-bold">✕</span>
          </button>
          <div className="text-center mb-2">
            <span className="text-3xl block mb-1">📖</span>
            <h2 className="text-2xl font-bold">Grammar Guide</h2>
            <p className="text-white/90 text-sm mt-1">Your comprehensive English grammar reference</p>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="md:w-56 bg-gray-50 p-3 border-r border-gray-200 overflow-y-auto">
            <h3 className="text-sm font-bold text-gray-600 mb-2 uppercase px-2">Contents</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded transition-all duration-200 flex items-center space-x-2 text-sm ${
                    activeSection === section.id
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Introduction */}
            {activeSection === 'intro' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">What is Grammar?</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Grammar is the set of rules that governs how words are combined to form meaningful sentences in a language. It includes the structure, syntax, and organization of language elements.
                  </p>
                  <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r-lg">
                    <p className="text-gray-700 italic">
                      "Grammar is the backbone of clear communication. It helps us express our ideas accurately and be understood by others."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Why is Grammar Important?</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-start space-x-2">
                        <span className="text-xl">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Clear Communication</h4>
                          <p className="text-sm text-gray-600">Express ideas precisely and avoid misunderstandings</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                      <div className="flex items-start space-x-2">
                        <span className="text-xl">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Professional Success</h4>
                          <p className="text-sm text-gray-600">Essential in workplace and academics</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <div className="flex items-start space-x-2">
                        <span className="text-xl">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Credibility</h4>
                          <p className="text-sm text-gray-600">Builds trust and makes you appear knowledgeable</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                      <div className="flex items-start space-x-2">
                        <span className="text-xl">✓</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Better Writing</h4>
                          <p className="text-sm text-gray-600">Improves all forms of writing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Parts of Speech */}
            {activeSection === 'parts' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">The 8 Parts of Speech</h3>
                <p className="text-gray-600 mb-4">
                  Every word in English belongs to one of these eight categories.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                {partsOfSpeech.map((part, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                    <div className="flex items-start space-x-3">
                      <span className="text-3xl flex-shrink-0">{part.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-2">{part.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{part.description}</p>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Examples:</p>
                          <div className="flex flex-wrap gap-2">
                            {part.examples.map((example, i) => (
                              <span key={i} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-sm">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Sentence Structure */}
            {activeSection === 'structure' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Sentence Structure</h3>
                
                <div className="bg-gradient-to-r from-teal-50 to-rose-50 rounded-lg p-4 border border-teal-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Basic Word Order</h4>
                  <div className="flex items-center justify-center space-x-3 text-sm">
                    <div className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold">Subject</div>
                    <span className="text-xl">→</span>
                    <div className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold">Verb</div>
                    <span className="text-xl">→</span>
                    <div className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold">Object</div>
                  </div>
                  <p className="text-center text-gray-600 mt-3 italic">Example: "I (Subject) eat (Verb) apples (Object)."</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Sentence Types</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white border-l-4 border-green-500 p-3 rounded-r-lg">
                      <h5 className="font-bold text-gray-800 mb-1">Simple Sentence</h5>
                      <p className="text-sm text-gray-600 mb-1">One independent clause</p>
                      <p className="text-sm text-gray-700 italic">"The cat sleeps."</p>
                    </div>
                    <div className="bg-white border-l-4 border-blue-500 p-3 rounded-r-lg">
                      <h5 className="font-bold text-gray-800 mb-1">Compound Sentence</h5>
                      <p className="text-sm text-gray-600 mb-1">Two independent clauses</p>
                      <p className="text-sm text-gray-700 italic">"The cat sleeps, and the dog plays."</p>
                    </div>
                    <div className="bg-white border-l-4 border-teal-500 p-3 rounded-r-lg">
                      <h5 className="font-bold text-gray-800 mb-1">Complex Sentence</h5>
                      <p className="text-sm text-gray-600 mb-1">Independent + dependent clause</p>
                      <p className="text-sm text-gray-700 italic">"The cat sleeps when it's tired."</p>
                    </div>
                    <div className="bg-white border-l-4 border-pink-500 p-3 rounded-r-lg">
                      <h5 className="font-bold text-gray-800 mb-1">Compound-Complex</h5>
                      <p className="text-sm text-gray-600 mb-1">2+ independent + dependent clauses</p>
                      <p className="text-sm text-gray-700 italic">"Cat sleeps when tired, and dog plays."</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Forming Questions</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <h5 className="font-semibold text-gray-800 mb-1">Yes/No Questions</h5>
                      <p className="text-sm text-gray-600 mb-1">Auxiliary + subject + verb</p>
                      <p className="text-sm text-gray-700 italic">Are you happy?</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                      <h5 className="font-semibold text-gray-800 mb-1">Wh- Questions</h5>
                      <p className="text-sm text-gray-600 mb-1">Question word + auxiliary + subject</p>
                      <p className="text-sm text-gray-700 italic">Where do you live?</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tenses */}
            {activeSection === 'tenses' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">English Tenses</h3>
                <p className="text-gray-600 mb-3">
                  English has 12 main tenses for different time periods.
                </p>
                <div className="space-y-4">
                {tenseData.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-bold text-gray-700 mb-2">{category.category}</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                    {category.tenses.map((tense, i) => (
                      <div key={i} className="bg-gray-50 border-l-4 border-teal-500 rounded-r p-3">
                        <h5 className="font-bold text-gray-800 text-sm">{tense.name}</h5>
                        <p className="text-sm text-gray-600 italic">{tense.form}</p>
                      </div>
                    ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {activeSection === 'mistakes' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Common Grammar Mistakes</h3>
                <p className="text-gray-600 mb-3">
                  Learn to avoid these frequent errors.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <h4 className="text-base font-bold text-gray-800 mb-2">{item.mistake}</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-red-500 font-bold">✗</span>
                        <p className="text-sm text-gray-700 line-through">{item.wrong}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <p className="text-sm text-gray-700 font-semibold">{item.correct}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Punctuation */}
            {activeSection === 'punctuation' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Punctuation Marks</h3>
                <p className="text-gray-600 mb-3">
                  Proper punctuation makes writing clear.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {punctuationRules.map((rule, index) => (
                    <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-3">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-rose-100 rounded w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl font-bold text-rose-600">{rule.mark}</span>
                        </div>
                        <h4 className="font-bold text-gray-800">{rule.name}</h4>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{rule.example}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice */}
            {activeSection === 'practice' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Practice</h3>
                <p className="text-gray-600 mb-3">
                  Test your knowledge with practice exercises.
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border-2 border-green-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Practice Questions</h4>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-800 mb-2">1. Identify the verb:</p>
                      <p className="text-sm text-gray-700 mb-2">"The cat quickly jumped over the fence."</p>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-teal-600 font-semibold">Show Answer</summary>
                        <p className="mt-2 text-green-600 font-semibold">✓ "jumped" is the verb (action word)</p>
                      </details>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-800 mb-2">2. Which sentence is correct?</p>
                      <p className="text-sm text-gray-700">a) She don't like coffee.</p>
                      <p className="text-sm text-gray-700">b) She doesn't like coffee.</p>
                      <details className="text-sm mt-2">
                        <summary className="cursor-pointer text-teal-600 font-semibold">Show Answer</summary>
                        <p className="mt-2 text-green-600 font-semibold">✓ (b) is correct. Use "doesn't" with she/he/it.</p>
                      </details>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="https://www.englishclub.com/grammar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-600 text-white rounded-lg p-5 hover:bg-teal-700 transition-colors text-center"
                  >
                    <span className="text-3xl mb-2 block">📚</span>
                    <h5 className="font-bold mb-2">EnglishClub Grammar</h5>
                    <p className="text-sm text-blue-100">More lessons and exercises</p>
                  </a>
                  <a
                    href="https://www.grammarly.com/blog/grammar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white rounded-lg p-5 hover:bg-green-700 transition-colors text-center"
                  >
                    <span className="text-3xl mb-2 block">✍️</span>
                    <h5 className="font-bold mb-2">Grammarly Blog</h5>
                    <p className="text-sm text-green-100">Grammar tips and guides</p>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarGuide;
