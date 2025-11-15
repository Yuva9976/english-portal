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
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);

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
          {/* What are Nouns - Super Compact Header Card */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What are Nouns?</h2>
              </div>
            </div>
            
            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              A <strong>noun</strong> names a person, place, thing, or idea. Foundation of clear communication.
            </p>
            
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Clear, effective communication</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">25% of English words!</p>
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
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">🎯</span>
              Quiz Practice
            </h2>
            <p className="text-sm text-gray-600 mb-4">Review questions or take the full quiz</p>
            
            {/* Start Quiz Button */}
            <button
              onClick={() => {
                setShowQuizModal(true);
                setCurrentQuestionIndex(0);
                setModalQuizAnswers({});
                setSingleQuestionMode(false);
              }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              ▶️ Start Full Quiz
            </button>
          </div>

          {/* Quiz Questions Grid - Review Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {interactiveQuiz.map((question, qIndex) => {
              const answered = quizAnswers[question.id];
              return (
                <div
                  key={question.id}
                  onClick={() => {
                    setShowQuizModal(true);
                    setCurrentQuestionIndex(qIndex);
                    setModalQuizAnswers({});
                    setSingleQuestionMode(true);
                  }}
                  className="bg-white rounded-lg p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-400 cursor-pointer transition-all duration-200 transform hover:scale-105"
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                      Q{question.id}
                    </span>
                    {answered && (
                      <span className={`text-lg ${answered.correct ? '✅' : '❌'}`}></span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{question.emoji}</span>
                    <p className="text-xs font-semibold text-gray-700 line-clamp-2">
                      {question.question}
                    </p>
                  </div>

                  {/* Answer Status */}
                  {answered && (
                    <div className={`text-xs font-medium p-1.5 rounded ${
                      answered.correct 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {answered.correct ? 'Correct!' : 'Try again'}
                    </div>
                  )}
                  
                  {!answered && (
                    <div className="text-xs text-blue-600 font-medium">
                      Click to attempt
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Modal - Modern Compact Design */}
          {showQuizModal && (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                {/* Progress Bar - Hidden in Single Question Mode */}
                {!singleQuestionMode && (
                  <div className="h-1.5 bg-slate-100">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / interactiveQuiz.length) * 100}%` }}
                    ></div>
                  </div>
                )}

                {/* Modal Header - Compact with Close Button on Right */}
                <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                  <div>
                    {!singleQuestionMode && (
                      <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Question {currentQuestionIndex + 1} of {interactiveQuiz.length}</p>
                    )}
                    {singleQuestionMode && (
                      <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Practice Question</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 md:gap-6">
                    {!singleQuestionMode && (
                      <div className="text-right">
                        <div className="text-lg md:text-xl font-bold text-blue-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div>
                        <div className="text-xs text-slate-500">points</div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setShowQuizModal(false);
                        setSingleQuestionMode(false);
                      }}
                      className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                      title="Close quiz"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Content - One Question */}
                {currentQuestionIndex < interactiveQuiz.length ? (
                  <div className="p-6 md:p-8">
                    {(() => {
                      const question = interactiveQuiz[currentQuestionIndex];
                      const answered = modalQuizAnswers[question.id];

                      return (
                        <div className="space-y-5">
                          {/* Question with Emoji */}
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              <span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span>
                              <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">
                                {question.question}
                              </h4>
                            </div>
                          </div>

                          {/* Hint */}
                          {!answered && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg">
                              <p className="text-xs md:text-sm text-blue-700">
                                <span className="font-semibold">💡 Hint:</span> {question.hint}
                              </p>
                            </div>
                          )}

                          {/* Options */}
                          <div className="space-y-2.5">
                            {question.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  if (!answered) {
                                    const isCorrect = index === question.correct;
                                    setModalQuizAnswers(prev => ({
                                      ...prev,
                                      [question.id]: { selected: index, correct: isCorrect }
                                    }));
                                  }
                                }}
                                disabled={answered}
                                className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered
                                  ? index === question.correct
                                      ? 'bg-green-50 border-green-400 shadow-sm'
                                      : answered.selected === index
                                      ? 'bg-red-50 border-red-400 shadow-sm'
                                      : 'bg-slate-50 border-slate-200 text-slate-500'
                                    : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${
                                    answered
                                      ? index === question.correct
                                        ? 'bg-green-200 text-green-700'
                                        : answered.selected === index
                                        ? 'bg-red-200 text-red-700'
                                        : 'bg-slate-200 text-slate-600'
                                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  <span className="flex-1 text-sm md:text-base text-slate-700 group-hover:text-slate-800">{option}</span>
                                  {answered && index === question.correct && <span className="text-lg">✅</span>}
                                  {answered && answered.selected === index && index !== question.correct && <span className="text-lg">❌</span>}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Feedback */}
                          {answered && (
                            <div className={`p-4 rounded-lg border-l-4 space-y-1.5 ${
                              answered.correct
                                ? 'bg-green-50 border-green-500'
                                : 'bg-orange-50 border-orange-500'
                            }`}>
                              <p className="font-bold text-base">
                                {answered.correct ? '🎉 Correct!' : '❌ Not quite right!'}
                              </p>
                              <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                                {question.explanation}
                              </p>
                            </div>
                          )}

                          {answered?.correct && (
                            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
                              <p className="text-xs md:text-sm text-purple-800">
                                <span className="font-bold">🎓 Fun Fact:</span> {question.funFact}
                              </p>
                            </div>
                          )}

                          {/* Navigation - Hidden in Single Question Mode */}
                          {!singleQuestionMode && answered && (
                            <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                              <button
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestionIndex === 0}
                                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                ← Previous
                              </button>
                              <button
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                disabled={!answered || currentQuestionIndex === interactiveQuiz.length - 1}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                              >
                                Next →
                              </button>
                            </div>
                          )}

                          {/* Close Button - Shown in Single Question Mode */}
                          {singleQuestionMode && answered && (
                            <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                              <button
                                onClick={() => {
                                  setShowQuizModal(false);
                                  setSingleQuestionMode(false);
                                }}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                              >
                                ← Back to Questions
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Results Screen */
                  <div className="p-6 md:p-8 text-center space-y-5">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                      {Object.keys(modalQuizAnswers).length === interactiveQuiz.length 
                        ? '🎊 Quiz Complete!' 
                        : '⏸️ Quiz Paused'}
                    </h3>

                    {Object.keys(modalQuizAnswers).length === interactiveQuiz.length && (
                      <>
                        {/* Score Card */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 space-y-2">
                          <p className="text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wide">Final Score</p>
                          <div className="text-5xl md:text-6xl font-bold text-amber-600">
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}
                          </div>
                          <p className="text-base text-slate-700 font-medium">out of 100 points</p>
                        </div>

                        {/* Performance Message */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-200">
                          <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length === interactiveQuiz.length
                              ? '🏆 Perfect! You\'re a noun master!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 8
                              ? '🥇 Excellent work!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 6
                              ? '👏 Good effort!'
                              : '📚 Keep practicing!'}
                          </p>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200 text-center">
                            <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                              {Object.values(modalQuizAnswers).filter(a => a.correct).length}
                            </p>
                            <p className="text-xs md:text-sm font-semibold text-slate-600">Correct</p>
                          </div>
                          <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-200 text-center">
                            <p className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
                              {interactiveQuiz.length - Object.values(modalQuizAnswers).filter(a => a.correct).length}
                            </p>
                            <p className="text-xs md:text-sm font-semibold text-slate-600">Incorrect</p>
                          </div>
                          <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200 text-center">
                            <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                              {Math.round((Object.values(modalQuizAnswers).filter(a => a.correct).length / interactiveQuiz.length) * 100)}%
                            </p>
                            <p className="text-xs md:text-sm font-semibold text-slate-600">Accuracy</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setShowQuizModal(false)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setModalQuizAnswers({});
                        }}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                      >
                        🔄 Restart Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quiz Completion - For Grid View */}
          {Object.keys(quizAnswers).length === interactiveQuiz.length && (
            <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-xl p-6 text-center shadow-lg border-2 border-yellow-400 animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                📊 Grid Review Complete!
              </h3>
              <p className="text-gray-700">
                You've answered all questions. Click "Start Full Quiz" for a guided quiz experience.
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
