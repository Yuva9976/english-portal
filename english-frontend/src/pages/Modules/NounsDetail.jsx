import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NounsDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [writingSubmitted, setWritingSubmitted] = useState(false);

  // All 10 noun types
  const nounTypes = [
    {
      id: 1,
      type: 'Proper Nouns',
      icon: '⭐',
      color: 'purple',
      definition: 'Specific names of people, places, or things. Always start with a capital letter.',
      examples: ['<strong>John</strong> visited <strong>Paris</strong>.', '<strong>Google</strong> is in <strong>California</strong>.'],
      sampleWords: ['London', 'Sarah', 'Microsoft', 'Monday', 'Christmas']
    },
    {
      id: 2,
      type: 'Common Nouns',
      icon: '🏠',
      color: 'blue',
      definition: 'General names for people, places, things, or groups. Not capitalized unless at sentence start.',
      examples: ['The <strong>dog</strong> barked loudly.', 'She bought a new <strong>book</strong>.'],
      sampleWords: ['table', 'city', 'teacher', 'car', 'mountain']
    },
    {
      id: 3,
      type: 'Concrete Nouns',
      icon: '👁️',
      color: 'green',
      definition: 'Physical objects you can see, touch, hear, taste, or smell.',
      examples: ['The <strong>coffee</strong> smells delicious.', 'I heard the <strong>music</strong> playing.'],
      sampleWords: ['apple', 'rain', 'perfume', 'rock', 'bell']
    },
    {
      id: 4,
      type: 'Abstract Nouns',
      icon: '💭',
      color: 'pink',
      definition: 'Ideas, qualities, or concepts you cannot sense physically.',
      examples: ['<strong>Honesty</strong> is the best policy.', 'She showed great <strong>courage</strong>.'],
      sampleWords: ['love', 'freedom', 'happiness', 'justice', 'time']
    },
    {
      id: 5,
      type: 'Collective Nouns',
      icon: '👥',
      color: 'orange',
      definition: 'Words referring to groups of people, animals, or things.',
      examples: ['The <strong>team</strong> won the match.', 'A <strong>flock</strong> of birds flew by.'],
      sampleWords: ['family', 'committee', 'audience', 'herd', 'class']
    },
    {
      id: 6,
      type: 'Countable Nouns',
      icon: '🔢',
      color: 'teal',
      definition: 'Nouns you can count. They have singular and plural forms.',
      examples: ['Three <strong>apples</strong> are on the table.', 'I have two <strong>cats</strong> at home.'],
      sampleWords: ['cat → cats', 'book → books', 'chair → chairs', 'friend → friends']
    },
    {
      id: 7,
      type: 'Uncountable Nouns',
      icon: '💧',
      color: 'indigo',
      definition: 'Nouns you cannot count individually. They have no plural form.',
      examples: ['I need some <strong>water</strong>.', 'She has much <strong>experience</strong> in teaching.'],
      sampleWords: ['water', 'money', 'information', 'rice', 'furniture']
    },
    {
      id: 8,
      type: 'Singular Nouns',
      icon: '1️⃣',
      color: 'cyan',
      definition: 'Name one person, place, or thing.',
      examples: ['A <strong>boy</strong> is playing.', 'The <strong>car</strong> is red.'],
      sampleWords: ['boy', 'car', 'apple', 'dog', 'city']
    },
    {
      id: 9,
      type: 'Plural Nouns',
      icon: '👥',
      color: 'violet',
      definition: 'Name more than one person, place, or thing.',
      examples: ['Many <strong>boys</strong> are playing.', 'The <strong>cars</strong> are red.'],
      sampleWords: ['boys', 'cars', 'apples', 'dogs', 'cities']
    },
    {
      id: 10,
      type: 'Compound Nouns',
      icon: '🔗',
      color: 'rose',
      definition: 'Words made by joining two or more words together.',
      examples: ['I need <strong>toothpaste</strong>.', 'Meet me at the <strong>bus stop</strong>.'],
      sampleWords: ['toothpaste', 'bus stop', 'mother-in-law', 'swimming pool']
    }
  ];

  // YouTube videos
  const videos = [
    {
      id: 1,
      title: 'English Nouns - Types and Examples',
      embedId: 'BFSj4JHzyto',
      description: 'A comprehensive introduction to nouns for beginners'
    },
    {
      id: 2,
      title: 'Common vs Proper Nouns Explained',
      embedId: 'Fm8tF5VGe8k',
      description: 'Learn the difference between common and proper nouns'
    }
  ];

  // Comprehensive Interactive Quiz - 10 Questions covering all noun types
  const interactiveQuiz = [
    {
      id: 1,
      type: 'multiple-choice',
      emoji: '⭐',
      question: 'Which of the following is a PROPER noun?',
      hint: 'Proper nouns name specific people, places, or things and are capitalized.',
      options: ['school', 'Oxford University', 'building', 'teacher'],
      correct: 1,
      explanation: '🎯 Correct! "Oxford University" is a proper noun because it\'s the specific name of an institution and is capitalized.',
      funFact: '💡 All proper nouns must start with a capital letter, whether at the beginning or middle of a sentence.'
    },
    {
      id: 2,
      type: 'multiple-choice',
      emoji: '💭',
      question: 'Identify the ABSTRACT noun: "The strength of her character impressed everyone."',
      hint: 'Abstract nouns represent ideas, qualities, or concepts - things you cannot touch.',
      options: ['character', 'strength', 'everyone', 'impressed'],
      correct: 1,
      explanation: '✨ Perfect! "Strength" is an abstract noun - it\'s a quality or characteristic you cannot physically touch or see.',
      funFact: '📚 Common abstract nouns often end in: -ness, -ment, -tion, -ity (kindness, movement, creation, ability)'
    },
    {
      id: 3,
      type: 'multiple-choice',
      emoji: '💧',
      question: 'Which noun is UNCOUNTABLE (cannot be counted)?',
      hint: 'Can you say "one, two, three" of this item? If not, it\'s uncountable.',
      options: ['chair', 'furniture', 'student', 'pencil'],
      correct: 1,
      explanation: '🏆 Excellent! "Furniture" is uncountable. We say "pieces of furniture" or "some furniture", not "three furnitures".',
      funFact: '🔢 Uncountable nouns use: much, some, a lot of - not "many". Examples: water, advice, luggage, baggage'
    },
    {
      id: 4,
      type: 'fill-in-the-blank',
      emoji: '👥',
      question: 'Fill in the blank: "A _____ of musicians performed at the concert."',
      hint: 'This word refers to a group of people working together.',
      options: ['group', 'team', 'band', 'orchestra'],
      correct: 3,
      explanation: '🎵 Great! "Orchestra" is the most specific collective noun here for musicians. "Band" (option 2) is also acceptable.',
      funFact: '🎭 Other collective nouns: cast (actors), crew (sailors), troupe (dancers), ensemble (musicians)'
    },
    {
      id: 5,
      type: 'multiple-choice',
      emoji: '🔗',
      question: 'Which word is a COMPOUND noun (made of two or more words)?',
      hint: 'Look for two smaller words combined together to make one noun.',
      options: ['beautiful', 'breakfast', 'running', 'slowly'],
      correct: 1,
      explanation: '🥐 Fantastic! "Breakfast" is a compound noun made from "break" + "fast". It names one specific thing.',
      funFact: '🔤 Compound nouns can be: one word (bedroom), two words (ice cream), or hyphenated (sister-in-law)'
    },
    {
      id: 6,
      type: 'fill-in-the-blank',
      emoji: '👁️',
      question: 'Fill in the blank: "She could smell the _____ of fresh flowers in the garden."',
      hint: 'This noun refers to something you can perceive with one of your five senses.',
      options: ['scent', 'aroma', 'fragrance', 'all of the above'],
      correct: 3,
      explanation: '🌸 Perfect! All three options (scent, aroma, fragrance) are concrete nouns - things you can physically perceive.',
      funFact: '👃 Concrete nouns appeal to the five senses: smell, taste, touch, sight, and hearing.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '📊',
      question: 'Identify the noun type: "The committee decided to postpone the meeting."',
      hint: 'This noun represents multiple people acting as one unit. What type is it?',
      options: ['Concrete', 'Collective', 'Possessive', 'Abstract'],
      correct: 1,
      explanation: '👥 Excellent! "Committee" is a collective noun because it refers to a group of people (committee members) as one single unit.',
      funFact: '🏛️ More collective nouns: jury, audience, crowd, government, parliament, congress'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      emoji: '✏️',
      question: 'Identify which is SINGULAR: "The _____ lay on the table."',
      hint: 'Singular means ONE. Look for a noun that\'s one item.',
      options: ['book', 'books', 'book\'s', 'books\''],
      correct: 0,
      explanation: '📖 Correct! "Book" is singular - it refers to one book. To make it plural, we add -s: books.',
      funFact: '1️⃣ Singular nouns: a book, this person, that dog. Plural nouns: books, people, dogs'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '🎓',
      question: 'Which sentence uses NOUNS correctly?',
      hint: 'Look for proper capitalization and correct singular/plural usage.',
      options: [
        'She bought three furnitures for her room.',
        'The Team played in london last week.',
        'He has much experience in teaching.',
        'I need some advices from you.'
      ],
      correct: 2,
      explanation: '✅ Perfect! Option 3 is correct. "Experience" is uncountable (not "experiences"), and we use "much" not "many" with uncountable nouns.',
      funFact: '🔍 Common mistake: "advices" (wrong). Advice is uncountable! "Could you give me some advice?"'
    },
    {
      id: 10,
      type: 'fill-in-the-blank',
      emoji: '🌟',
      question: 'Which classification fits "Water is essential for human survival"?',
      hint: 'Consider whether water can be counted. Can you say "one water, two waters"?',
      options: ['Countable and Concrete', 'Uncountable and Concrete', 'Countable and Abstract', 'Uncountable and Abstract'],
      correct: 1,
      explanation: '💧 Excellent! "Water" is uncountable (we don\'t say "waters" in general) AND concrete (you can see it, touch it, taste it).',
      funFact: '🌊 Other uncountable concrete nouns: air, sand, rice, oil, sugar, salt, coffee'
    }
  ];

  const tips = [
    { icon: '✅', type: 'DO', text: 'Always capitalize proper nouns.', color: 'green' },
    { icon: '✅', type: 'DO', text: 'Use "a" or "an" with singular countable nouns.', color: 'green' },
    { icon: '❌', type: "DON'T", text: 'Don\'t pluralize uncountable nouns.', color: 'red' },
    { icon: '❌', type: "DON'T", text: 'Don\'t forget articles with countable nouns.', color: 'red' }
  ];

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const handleInteractiveQuiz = (questionId, answerIndex) => {
    const question = interactiveQuiz.find(q => q.id === questionId);
    const isCorrect = answerIndex === question.correct;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: { selected: answerIndex, correct: isCorrect }
    }));

    if (isCorrect) {
      setQuizScore(prev => prev + 10);
    }
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Compact Sticky Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center space-x-1 text-white hover:text-blue-100 transition-colors text-sm"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">🏛️</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Nouns</h1>
                <p className="text-sm md:text-base text-blue-100">Master the building blocks of English</p>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex flex-wrap gap-2">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                    activeSection === section.id
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'bg-blue-500 bg-opacity-40 text-white hover:bg-opacity-60'
                  }`}
                >
                  <span className="mr-1">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* OVERVIEW SECTION */}
        <section id="overview" className="mb-12 scroll-mt-32">
          {/* What are Nouns - Compact */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">📖</span>
              What are Nouns?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              A <strong>noun</strong> is a word that names a person, place, thing, or idea. Nouns are the foundation of sentences, serving as subjects and objects.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">💡</span>
                  Why Learn Nouns?
                </h3>
                <p className="text-gray-700 text-sm">
                  Understanding nouns helps you construct clear sentences and communicate effectively in English.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">🎯</span>
                  Quick Fact
                </h3>
                <p className="text-gray-700 text-sm">
                  Nouns make up about 25% of all words in typical English text!
                </p>
              </div>
            </div>
          </div>

          {/* 10 Types of Nouns - Compact Design */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              10 Types of Nouns
            </h2>
            
            {/* Compact Cards Grid - 2-3 per row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {nounTypes.map((noun) => (
                <div
                  key={noun.id}
                  className={`bg-gradient-to-br from-${noun.color}-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-${noun.color}-200 overflow-hidden flex flex-col h-full`}
                >
                  {/* Card Header - Compact */}
                  <div className={`bg-gradient-to-r from-${noun.color}-100 to-${noun.color}-50 px-4 py-3 border-b-2 border-${noun.color}-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{noun.icon}</span>
                      <h3 className={`text-base font-bold text-${noun.color}-800`}>{noun.type}</h3>
                    </div>
                  </div>
                  
                  {/* Card Body - Tight Spacing */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Definition */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{noun.definition}</p>
                    
                    {/* Examples - Minimal */}
                    <div className="space-y-1.5 mb-3">
                      {noun.examples.slice(0, 2).map((example, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300"
                        >
                          <p
                            className="text-sm text-gray-700"
                            dangerouslySetInnerHTML={{ __html: example }}
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Sample Words - Compact Tags */}
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {noun.sampleWords.slice(0, 4).map((word, index) => (
                        <span
                          key={index}
                          className={`bg-${noun.color}-100 text-${noun.color}-700 px-2 py-0.5 rounded-full text-sm font-medium`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips - Compact */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-md p-5 md:p-6 border border-yellow-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🌟</span>
              Pro Tips & Common Confusions
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`bg-${tip.color}-50 border-l-4 border-${tip.color}-500 p-3 rounded-r-lg`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <span className={`font-semibold text-${tip.color}-700 block mb-0.5 text-sm`}>
                        {tip.type}
                      </span>
                      <p className="text-gray-700 text-sm">{tip.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-base text-gray-800 mb-3 flex items-center">
                <span className="text-lg mr-1.5">💎</span>
                Advanced Tips
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Plural forms:</strong> Add "-s" or "-es" (cat → cats, box → boxes)</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Irregular plurals:</strong> Some change completely (child → children)</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Possessive:</strong> Add apostrophe + s (John's book)</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* VIDEO LESSONS - Compact */}
        <section id="videos" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">🎥</span>
              Video Lessons
            </h2>
            <p className="text-gray-600 text-sm mb-5">Watch these helpful videos</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {videos.map(video => (
                <div key={video.id} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-video bg-gray-900">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-base text-gray-800 mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WRITING EXERCISE - Compact */}
        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Practice using different types of nouns</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">
                  Write five sentences, each using a different type of noun (Common, Proper, Abstract, Collective, Compound).
                </p>
              </div>

              <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[200px]"
                placeholder="Type your sentences here...&#10;&#10;Example:&#10;1. The dog (common noun) ran quickly."
              />

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setWritingRevealed(!writingRevealed)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {writingRevealed ? 'Hide' : 'Show'} Sample Answer
                </button>
                <button
                  onClick={() => setWritingSubmitted(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Submit for Review
                </button>
              </div>

              {writingSubmitted && (
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg animate-fade-in">
                  <p className="text-blue-800 font-semibold">✓ Submitted! A teacher will review your work soon.</p>
                </div>
              )}

              {writingRevealed && (
                <div className="mt-6 bg-green-50 border-2 border-green-300 rounded-xl p-6 animate-fade-in">
                  <h4 className="font-bold text-gray-800 mb-4">📋 Sample Answer:</h4>
                  <ol className="space-y-3 list-decimal list-inside text-gray-700">
                    <li>The <span className="bg-blue-100 px-2 py-1 rounded font-semibold">teacher</span> (common) explained the lesson.</li>
                    <li><span className="bg-purple-100 px-2 py-1 rounded font-semibold">London</span> (proper) is a beautiful city.</li>
                    <li>Her <span className="bg-pink-100 px-2 py-1 rounded font-semibold">honesty</span> (abstract) earned respect.</li>
                    <li>The <span className="bg-orange-100 px-2 py-1 rounded font-semibold">committee</span> (collective) made a decision.</li>
                    <li>I left my <span className="bg-rose-100 px-2 py-1 rounded font-semibold">toothbrush</span> (compound) at home.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* READING EXERCISE - Compact */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 md:p-6 border border-blue-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Read the passage and identify the nouns</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Read this short story:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  <strong className="text-purple-600">Sarah</strong> woke up early on <strong className="text-purple-600">Monday</strong> morning. 
                  She needed to catch the <strong className="text-blue-600">train</strong> to <strong className="text-purple-600">London</strong>. 
                  Her <strong className="text-pink-600">excitement</strong> was obvious as she packed her <strong className="text-rose-600">suitcase</strong>. 
                  The <strong className="text-orange-600">family</strong> gathered to say goodbye, showing their <strong className="text-pink-600">love</strong>. 
                  She grabbed her <strong className="text-rose-600">backpack</strong> and headed to the <strong className="text-blue-600">station</strong>.
                </p>
              </div>

              <button
                onClick={() => setReadingRevealed(!readingRevealed)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
              >
                {readingRevealed ? 'Hide' : 'Show'} All Nouns
              </button>

              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Nouns Identified:</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-purple-100 p-2 rounded">
                      <span className="font-semibold text-purple-700">Proper Nouns:</span>
                      <p className="text-gray-700">Sarah, Monday, London</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <span className="font-semibold text-blue-700">Common Nouns:</span>
                      <p className="text-gray-700">train, station</p>
                    </div>
                    <div className="bg-pink-100 p-2 rounded">
                      <span className="font-semibold text-pink-700">Abstract Nouns:</span>
                      <p className="text-gray-700">excitement, love</p>
                    </div>
                    <div className="bg-orange-100 p-2 rounded">
                      <span className="font-semibold text-orange-700">Collective Nouns:</span>
                      <p className="text-gray-700">family</p>
                    </div>
                    <div className="bg-rose-100 p-2 rounded">
                      <span className="font-semibold text-rose-700">Compound Nouns:</span>
                      <p className="text-gray-700">suitcase, backpack</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* INTERACTIVE QUIZ */}
        <section id="quiz" className="mb-16 scroll-mt-32">
          {/* Quiz Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-2">
              <span className="text-3xl mr-3">🎯</span>
              Fun Quiz Time!
            </h2>
            <p className="text-sm text-gray-600">Test what you've learned! 🌟</p>
          </div>

          {/* Score Badge - Centered */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-6 py-3 shadow-lg">
              <div className="text-center text-white">
                <div className="text-3xl font-bold">{quizScore}</div>
                <div className="text-xs font-semibold uppercase tracking-wide">Points</div>
              </div>
            </div>
          </div>

          {/* Quiz Container - Constrained Width */}
          <div className="max-w-3xl mx-auto space-y-4">
            {interactiveQuiz.map((question, qIndex) => {
              const answered = quizAnswers[question.id];
              return (
                <div key={question.id} className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                  {/* Question Header - Compact */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl flex-shrink-0">{question.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">Q{question.id}</span>
                        <span className="text-xs text-gray-500 font-medium">{qIndex + 1}/{interactiveQuiz.length}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Hint Section - Compact */}
                  {!answered && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-2.5 mb-3 rounded-r-lg">
                      <p className="text-xs md:text-sm text-blue-800">
                        <span className="font-semibold">💡 Hint:</span> {question.hint}
                      </p>
                    </div>
                  )}

                  {/* Options - Neat & Compact */}
                  <div className="space-y-2 mb-3">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !answered && handleInteractiveQuiz(question.id, index)}
                        disabled={answered}
                        className={`w-full p-2.5 md:p-3 rounded-lg border text-left text-xs md:text-sm font-medium transition-all duration-200 ${
                          answered
                            ? index === question.correct
                              ? 'bg-green-50 border-green-400 text-green-900 shadow-sm'
                              : answered.selected === index
                              ? 'bg-red-50 border-red-400 text-red-900 shadow-sm'
                              : 'bg-gray-50 border-gray-200 text-gray-400'
                            : 'bg-white border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-sm'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span className="flex items-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold mr-2 flex-shrink-0">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </span>
                          {answered && index === question.correct && <span className="text-base md:text-lg">✅</span>}
                          {answered && answered.selected === index && index !== question.correct && <span className="text-base md:text-lg">❌</span>}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Feedback - Compact */}
                  {answered && (
                    <div className="space-y-2 animate-fade-in">
                      <div className={`p-2.5 rounded-lg border-l-4 ${
                        answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'
                      }`}>
                        <p className="text-xs md:text-sm text-gray-800 leading-relaxed">
                          <span className="font-semibold">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</span>
                          {' '}{question.explanation}
                        </p>
                      </div>
                      
                      {answered.correct && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-2.5 rounded-r-lg">
                          <p className="text-xs md:text-sm text-purple-900 leading-relaxed">
                            <span className="font-semibold">🎓 Fun Fact:</span>
                            {' '}{question.funFact}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Completion - Centered */}
          {Object.keys(quizAnswers).length === interactiveQuiz.length && (
            <div className="max-w-2xl mx-auto mt-6 bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-xl p-5 md:p-6 text-center shadow-lg border-2 border-yellow-400 animate-fade-in">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {quizScore >= 60 ? '🏆 Outstanding!' : quizScore >= 40 ? '👏 Great Job!' : '📚 Keep Learning!'}
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-3">
                You scored <span className="font-bold text-yellow-600 text-lg md:text-xl">{quizScore}</span> out of <span className="font-bold">80 points</span>
              </p>
              
              {quizScore === 80 && (
                <div className="inline-block bg-yellow-200 border-2 border-yellow-500 rounded-full px-5 py-2 mb-2">
                  <span className="text-xl md:text-2xl mr-2">🥇</span>
                  <span className="font-bold text-yellow-800 text-base md:text-lg">Perfect Score!</span>
                </div>
              )}
              
              <p className="text-xs md:text-sm text-gray-600 mt-2">
                {quizScore >= 60 
                  ? "Amazing work! You're a noun expert! 🌟" 
                  : quizScore >= 40 
                  ? "Good effort! Keep practicing to master nouns! 💪"
                  : "Review the material and try again! You've got this! 🚀"}
              </p>
            </div>
          )}
        </section>

        {/* RESOURCES - Compact */}
        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              Additional Resources
            </h2>
            <p className="text-gray-600 text-sm mb-5">Explore more materials to master nouns</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Grammar Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/nouns.htm', color: 'blue' },
                { title: 'Noun Games', icon: '🎮', url: 'https://www.eslgamesplus.com/nouns/', color: 'green' },
                { title: 'Worksheets', icon: '📄', url: 'https://www.perfect-english-grammar.com/nouns-exercises.html', color: 'purple' },
                { title: 'Video Playlist', icon: '📺', url: 'https://www.youtube.com/results?search_query=english+nouns', color: 'red' },
                { title: 'Quizzes', icon: '✅', url: 'https://www.grammarbook.com/grammar_quiz/nouns_1.asp', color: 'yellow' },
                { title: 'Dictionary', icon: '📚', url: 'https://www.oxfordlearnersdictionaries.com/', color: 'indigo' }
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-br from-${resource.color}-50 to-${resource.color}-100 rounded-lg p-4 border border-${resource.color}-300 hover:shadow-md transition-all`}
                >
                  <span className="text-2xl block mb-2">{resource.icon}</span>
                  <h3 className={`font-semibold text-${resource.color}-700 text-base mb-1`}>{resource.title}</h3>
                  <p className="text-sm text-gray-600">Explore →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Compact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready for More?</h3>
          <p className="text-sm mb-4 text-blue-100">
            Continue your grammar journey!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/modules/grammar-hub')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Grammar Hub
            </button>
            <button
              onClick={() => navigate('/modules/learn-english')}
              className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
            >
              All Lessons
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NounsDetail;
