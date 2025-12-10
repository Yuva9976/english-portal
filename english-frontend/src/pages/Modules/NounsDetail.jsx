import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

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
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedNounType, setSelectedNounType] = useState(null);
  const [learnMoreData, setLearnMoreData] = useState(null);
  const [loadingLearnMore, setLoadingLearnMore] = useState(false);
  const [activeLearnTab, setActiveLearnTab] = useState('overview');

  // Ensure page is at top when this detail view mounts (fixes browser scroll retention)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      // fallback for older environments
      window.scrollTo(0, 0);
    }
  }, []);

  // All noun types with correct database IDs
  const nounTypes = [
    {
      id: 249,
      type: 'Proper Nouns',
      icon: '⭐',
      color: 'purple',
      definition: 'Specific names of people, places, or things. Always start with a capital letter.',
      examples: ['<strong>John</strong> visited <strong>Paris</strong>.', '<strong>Google</strong> is in <strong>California</strong>.'],
      sampleWords: ['London', 'Sarah', 'Microsoft', 'Monday', 'Christmas']
    },
    {
      id: 250,
      type: 'Common Nouns',
      icon: '🏠',
      color: 'blue',
      definition: 'General names for people, places, things, or groups. Not capitalized unless at sentence start.',
      examples: ['The <strong>dog</strong> barked loudly.', 'She bought a new <strong>book</strong>.'],
      sampleWords: ['table', 'city', 'teacher', 'car', 'mountain']
    },
    {
      id: 251,
      type: 'Concrete Nouns',
      icon: '👁️',
      color: 'green',
      definition: 'Physical objects you can see, touch, hear, taste, or smell.',
      examples: ['The <strong>coffee</strong> smells delicious.', 'I heard the <strong>music</strong> playing.'],
      sampleWords: ['apple', 'rain', 'perfume', 'rock', 'bell']
    },
    {
      id: 252,
      type: 'Abstract Nouns',
      icon: '💭',
      color: 'pink',
      definition: 'Ideas, qualities, or concepts you cannot sense physically.',
      examples: ['<strong>Honesty</strong> is the best policy.', 'She showed great <strong>courage</strong>.'],
      sampleWords: ['love', 'freedom', 'happiness', 'justice', 'time']
    },
    {
      id: 255,
      type: 'Collective Nouns',
      icon: '👥',
      color: 'orange',
      definition: 'Words referring to groups of people, animals, or things.',
      examples: ['The <strong>team</strong> won the match.', 'A <strong>flock</strong> of birds flew by.'],
      sampleWords: ['family', 'committee', 'audience', 'herd', 'class']
    },
    {
      id: 253,
      type: 'Countable Nouns',
      icon: '🔢',
      color: 'teal',
      definition: 'Nouns you can count. They have singular and plural forms.',
      examples: ['Three <strong>apples</strong> are on the table.', 'I have two <strong>cats</strong> at home.'],
      sampleWords: ['cat → cats', 'book → books', 'chair → chairs', 'friend → friends']
    },
    {
      id: 254,
      type: 'Uncountable Nouns',
      icon: '💧',
      color: 'indigo',
      definition: 'Nouns you cannot count individually. They have no plural form.',
      examples: ['I need some <strong>water</strong>.', 'She has much <strong>experience</strong> in teaching.'],
      sampleWords: ['water', 'money', 'information', 'rice', 'furniture']
    },
    {
      id: 256,
      type: 'Compound Nouns',
      icon: '🔗',
      color: 'cyan',
      definition: 'Nouns made of two or more words combined together.',
      examples: ['She made a <strong>birthday cake</strong>.', 'The <strong>football</strong> game was exciting.'],
      sampleWords: ['notebook', 'sunflower', 'toothbrush', 'ice cream', 'mother-in-law']
    },
    {
      id: 257,
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
      icon: '🎭',
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
      emoji: '📚',
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
      emoji: '📚',
      question: 'Identify the ABSTRACT noun: "The strength of her character impressed everyone."',
      hint: 'Abstract nouns represent ideas, qualities, or concepts - things you cannot touch.',
      options: ['character', 'strength', 'everyone', 'impressed'],
      correct: 1,
      explanation: '✨ Perfect! "Strength" is an abstract noun - it\'s a quality or characteristic you cannot physically touch or see.',
      funFact: '💡 Common abstract nouns often end in: -ness, -ment, -tion, -ity (kindness, movement, creation, ability)'
    },
    {
      id: 3,
      type: 'multiple-choice',
      emoji: '📚',
      question: 'Which noun is UNCOUNTABLE (cannot be counted)?',
      hint: 'Can you say "one, two, three" of this item? If not, it\'s uncountable.',
      options: ['chair', 'furniture', 'student', 'pencil'],
      correct: 1,
      explanation: ' Excellent! "Furniture" is uncountable. We say "pieces of furniture" or "some furniture", not "three furnitures".',
      funFact: '💡 Uncountable nouns use: much, some, a lot of - not "many". Examples: water, advice, luggage, baggage'
    },
    {
      id: 4,
      type: 'fill-in-the-blank',
      emoji: '📚',
      question: 'Fill in the blank: "A _____ of musicians performed at the concert."',
      hint: 'This word refers to a group of people working together.',
      options: ['group', 'team', 'band', 'orchestra'],
      correct: 3,
      explanation: '🎭 Great! "Orchestra" is the most specific collective noun here for musicians. "Band" (option 2) is also acceptable.',
      funFact: '🎭 Other collective nouns: cast (actors), crew (sailors), troupe (dancers), ensemble (musicians)'
    },
    {
      id: 5,
      type: 'multiple-choice',
      emoji: '📚',
      question: 'Which word is a COMPOUND noun (made of two or more words)?',
      hint: 'Look for two smaller words combined together to make one noun.',
      options: ['beautiful', 'breakfast', 'running', 'slowly'],
      correct: 1,
      explanation: ' Fantastic! "Breakfast" is a compound noun made from "break" + "fast". It names one specific thing.',
      funFact: '💡 Compound nouns can be: one word (bedroom), two words (ice cream), or hyphenated (sister-in-law)'
    },
    {
      id: 6,
      type: 'fill-in-the-blank',
      emoji: '📚',
      question: 'Fill in the blank: "She could smell the _____ of fresh flowers in the garden."',
      hint: 'This noun refers to something you can perceive with one of your five senses.',
      options: ['scent', 'aroma', 'fragrance', 'all of the above'],
      correct: 3,
      explanation: ' Perfect! All three options (scent, aroma, fragrance) are concrete nouns - things you can physically perceive.',
      funFact: '💡 Concrete nouns appeal to the five senses: smell, taste, touch, sight, and hearing.'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '📚',
      question: 'Identify the noun type: "The committee decided to postpone the meeting."',
      hint: 'This noun represents multiple people acting as one unit. What type is it?',
      options: ['Concrete', 'Collective', 'Possessive', 'Abstract'],
      correct: 1,
      explanation: '💡 Excellent! "Committee" is a collective noun because it refers to a group of people (committee members) as one single unit.',
      funFact: '☝️ More collective nouns: jury, audience, crowd, government, parliament, congress'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      emoji: '📚',
      question: 'Identify which is SINGULAR: "The _____ lay on the table."',
      hint: 'Singular means ONE. Look for a noun that\'s one item.',
      options: ['book', 'books', 'book\'s', 'books\''],
      correct: 0,
      explanation: '💡 Correct! "Book" is singular - it refers to one book. To make it plural, we add -s: books.',
      funFact: '1️⃣ Singular nouns: a book, this person, that dog. Plural nouns: books, people, dogs'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '📚',
      question: 'Which sentence uses NOUNS correctly?',
      hint: 'Look for proper capitalization and correct singular/plural usage.',
      options: [
        'She bought three furnitures for her room.',
        'The Team played in london last week.',
        'He has much experience in teaching.',
        'I need some advices from you.'
      ],
      correct: 2,
      explanation: '✓ Perfect! Option 3 is correct. "Experience" is uncountable (not "experiences"), and we use "much" not "many" with uncountable nouns.',
      funFact: '💡 Common mistake: "advices" (wrong). Advice is uncountable! "Could you give me some advice?"'
    },
    {
      id: 10,
      type: 'fill-in-the-blank',
      emoji: '📚',
      question: 'Which classification fits "Water is essential for human survival"?',
      hint: 'Consider whether water can be counted. Can you say "one water, two waters"?',
      options: ['Countable and Concrete', 'Uncountable and Concrete', 'Countable and Abstract', 'Uncountable and Abstract'],
      correct: 1,
      explanation: '💡 Excellent! "Water" is uncountable (we don\'t say "waters" in general) AND concrete (you can see it, touch it, taste it).',
      funFact: ' Other uncountable concrete nouns: air, sand, rice, oil, sugar, salt, coffee'
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
    { id: 'resources', name: 'Resources', icon: '🎭' }
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

  const handleLearnMore = async (nounType) => {
    setSelectedNounType(nounType);
    setShowLearnMoreModal(true);
    setLoadingLearnMore(true);
    setActiveLearnTab('overview');

    try {
      // Fetch comprehensive learning data from backend - correct port and endpoint
      const response = await fetch(`http://localhost:4000/api/grammar/types/${nounType.id}/learn-more`);
      
      if (!response.ok) {
        throw new Error('Learn More content not available');
      }
      
      const data = await response.json();
      setLearnMoreData(data.content);
    } catch (error) {
      console.error('Error fetching learn more data:', error);
      // Fallback to mock data if backend not available
      setLearnMoreData(generateMockLearnMoreData(nounType));
    } finally {
      setLoadingLearnMore(false);
    }
  };

  const generateMockLearnMoreData = (nounType) => {
    // Generate comprehensive mock data for each noun type
    return {
      overview: {
        title: nounType.type,
        definition: nounType.definition,
        rules: [
          `Always identify ${nounType.type.toLowerCase()} by their specific characteristics`,
          `Use appropriate articles and modifiers with ${nounType.type.toLowerCase()}`,
          `Practice recognizing ${nounType.type.toLowerCase()} in context`
        ],
        keyPoints: [
          `${nounType.type} are essential for clear communication`,
          `They help specify exactly what you're talking about`,
          `Master these to improve your English fluency`
        ]
      },
      exercises: {
        writing: [
          {
            title: 'Sentence Construction',
            instruction: `Write 5 sentences using different ${nounType.type.toLowerCase()}`,
            examples: nounType.sampleWords.slice(0, 3)
          },
          {
            title: 'Creative Writing',
            instruction: `Write a short paragraph (50 words) incorporating at least 5 ${nounType.type.toLowerCase()}`,
            prompt: 'Describe your favorite place or experience'
          }
        ],
        speaking: [
          {
            activity: 'Describe and Explain',
            instruction: `Choose 3 ${nounType.sampleWords[0]} and explain them in 30 seconds each`,
            tips: 'Speak clearly and use complete sentences'
          }
        ],
        grammar: [
          {
            type: 'Fill in the blanks',
            questions: [
              `The ___ is very important. (${nounType.sampleWords[0]})`,
              `I saw a beautiful ___ yesterday. (${nounType.sampleWords[1]})`
            ]
          }
        ]
      },
      videos: [
        {
          title: `Understanding ${nounType.type}`,
          duration: '5:30',
          thumbnail: '',
          description: `Complete guide to ${nounType.type.toLowerCase()} with examples`
        },
        {
          title: `${nounType.type} in Real Life`,
          duration: '8:15',
          thumbnail: '💡',
          description: 'See how native speakers use these in conversation'
        }
      ],
      listening: [
        {
          title: 'Audio Exercise 1',
          instruction: `Listen and identify ${nounType.type.toLowerCase()} in the conversation`,
          duration: '2:00',
          level: 'Intermediate'
        }
      ],
      pronunciation: {
        guide: `Common ${nounType.type.toLowerCase()} and how to pronounce them`,
        words: nounType.sampleWords.map(word => ({
          word: word,
          phonetic: `/${word.toLowerCase()}/`,
          audio: '💡'
        }))
      },
      vocabulary: {
        words: nounType.sampleWords.map(word => ({
          word: word,
          definition: `A type of ${nounType.type.toLowerCase()}`,
          example: `The ${word.toLowerCase()} is commonly used.`,
          synonyms: ['similar word 1', 'similar word 2']
        }))
      },
      reading: {
        passages: [
          {
            title: `${nounType.type} in Context`,
            text: `This passage contains multiple examples of ${nounType.type.toLowerCase()}. ${nounType.examples[0]} ${nounType.examples[1]} Practice identifying them as you read.`,
            questions: [
              `How many ${nounType.type.toLowerCase()} can you find?`,
              'What role do they play in the sentences?'
            ]
          }
        ]
      },
      quiz: {
        questions: [
          {
            question: `Which of these is a ${nounType.type.toLowerCase()}?`,
            options: [nounType.sampleWords[0], 'running', 'quickly', 'beautiful'],
            correct: 0
          },
          {
            question: `Identify the ${nounType.type.toLowerCase()} in: "${nounType.examples[0]}"`,
            type: 'text'
          }
        ]
      },
      resources: {
        downloadable: [
          {
            title: `${nounType.type} Worksheet`,
            type: 'PDF',
            description: 'Printable exercises and activities'
          },
          {
            title: `${nounType.type} Flashcards`,
            type: 'PDF',
            description: '50 flashcards for practice'
          }
        ],
        links: [
          {
            title: 'External Grammar Guide',
            url: '#',
            description: 'Additional resources and examples'
          }
        ]
      }
    };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2" title="Back">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">🎭</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Nouns</h1>
            <span className="text-base text-teal-600 ml-2">Master the building blocks of English</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-teal-400 to-blue-300 text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-300 hover:text-white'
                }`}
              >
                <span className="mr-1">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 mt-4">
        {/* OVERVIEW SECTION */}
        <section id="overview" className="mb-12 scroll-mt-32">
          {/* What are Nouns - Super Compact Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6" style={{marginLeft: '50px', marginRight: '50px'}}>
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">🎭</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-800 leading-tight">What is a Noun?</h2>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-snug mb-2 pl-7">
              A <strong>noun</strong> names a person, place, thing, or idea. Foundation of clear communication.
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-teal-200 rounded-lg p-2">
                <p className="text-sm font-semibold text-teal-600">🎭 Why Learn?</p>
                <p className="text-base text-gray-700 leading-tight mt-0.5">Clear, effective communication</p>
              </div>
              <div className="bg-white border border-rose-200 rounded-lg p-2">
                <p className="text-sm font-semibold text-rose-400">🎭 Quick Fact</p>
                <p className="text-base text-gray-700 leading-tight mt-0.5">25% of English words!</p>
              </div>
            </div>
          </div>

          {/* 10 Types of Nouns - Verb Page UI Style */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center tracking-tight">
              <span className="text-lg mr-2">🎭</span>
              <span className="text-xl font-bold text-gray-800">10 Types of Nouns</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {nounTypes.map((noun) => (
                <div
                  key={noun.id}
                  className={`relative rounded-2xl shadow-xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/70 border border-${noun.color || 'teal'}-200 hover:border-${noun.color || 'teal'}-400 hover:shadow-2xl hover:ring-2 hover:ring-${noun.color || 'teal'}-300`}
                  style={{ borderTop: `4px solid var(--tw-color-${noun.color || 'teal'}-400)` }}
                >
                  <div className="absolute top-3 right-3 opacity-10 text-4xl pointer-events-none select-none">
                    {noun.icon}
                  </div>
                  <div className="flex items-center gap-2 px-4 pt-5 pb-2 z-10">
                    <span className={`text-2xl drop-shadow-lg`} style={{ color: `var(--tw-color-${noun.color || 'teal'}-500)` }}>{noun.icon}</span>
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight drop-shadow">{noun.type}</h3>
                  </div>
                  <div className="px-4 pb-5 flex-1 flex flex-col z-10">
                    <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium bg-white/80 rounded-lg px-2 py-1 shadow-sm">{noun.definition}</p>
                    <div className="space-y-2 mb-3">
                      {noun.examples.slice(0, 2).map((example, index) => (
                        <div
                          key={index}
                          className={`bg-gradient-to-r from-${noun.color || 'teal'}-50 to-blue-50 px-3 py-2 rounded-lg border border-${noun.color || 'teal'}-100 shadow group-hover:scale-[1.02] group-hover:border-${noun.color || 'teal'}-300 transition-all`}
                        >
                          <p
                            className="text-base text-gray-700 font-medium"
                            dangerouslySetInnerHTML={{ __html: example }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {noun.sampleWords.slice(0, 4).map((word, index) => (
                        <span
                          key={index}
                          className={`bg-gradient-to-r from-${noun.color || 'teal'}-200 to-blue-200 text-${noun.color || 'teal'}-700 px-3 py-1 rounded-full text-sm font-bold border border-${noun.color || 'teal'}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleLearnMore(noun)}
                      className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2 rounded-xl font-bold text-base shadow hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.03] group-hover:ring-2 group-hover:ring-teal-400"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips - Compact */}
          <div className="bg-gradient-to-br from-teal-50 via-white to-rose-50 rounded-xl shadow-lg border border-teal-100 p-4 md:p-6 mb-2" style={{marginLeft: '50px'}}>
            <h3 className="text-xl md:text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2 drop-shadow">
              <span className="inline-block text-2xl md:text-3xl bg-gradient-to-r from-teal-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">💡</span>
              Pro Tips & Common Confusions
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`relative rounded-lg shadow border border-${tip.color}-100 p-3 transition-all duration-200 group bg-gradient-to-br from-white to-${tip.color}-50 hover:scale-[1.02] flex items-center min-h-[80px]`}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow border border-${tip.color}-100 mr-3">
                    <span className={`text-xl text-${tip.color}-500`}>{tip.icon}</span>
                  </div>
                  <div>
                    <span className={`font-semibold text-${tip.color}-700 block mb-1 text-base tracking-wide`}>{tip.type}</span>
                    <p className="text-gray-700 text-base font-normal leading-normal">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-teal-50 via-white to-yellow-50 border border-teal-100 rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-teal-700 mb-2 text-base flex items-center gap-2">
                <span className="text-lg">🎭</span>
                Advanced Tips
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-base">
                <li><strong>Plural forms:</strong> Add <span className="text-teal-600 font-bold">"-s"</span> or <span className="text-teal-600 font-bold">"-es"</span> <span className="text-gray-500">(cat → cats, box → boxes)</span></li>
                <li><strong>Irregular plurals:</strong> Some change completely <span className="text-gray-500">(child → children)</span></li>
                <li><strong>Possessive:</strong> Add apostrophe + s <span className="text-gray-500">(John's book)</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* VIDEO LESSONS - Compact */}
        <section id="videos" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 rounded-xl shadow-lg border border-teal-100 p-6 md:p-10" style={{marginLeft: '50px'}}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-teal-700 mb-3 flex items-center gap-2 drop-shadow">
              <span className="text-3xl bg-gradient-to-r from-blue-400 via-teal-400 to-rose-400 bg-clip-text text-transparent">🎬</span>
              Video Lessons
            </h2>
            <p className="text-gray-500 text-base mb-7">Watch these helpful videos.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map(video => (
                <div key={video.id} className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-teal-100 via-blue-50 to-rose-100 flex items-center justify-center relative">
                    {/* If video unavailable, show attractive placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-5xl text-blue-300 mb-2">🎬</span>
                      <span className="text-lg font-semibold text-gray-400">Video unavailable</span>
                      <span className="text-sm text-gray-400">This video is unavailable</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-teal-50">
                    <h3 className="font-semibold text-base text-teal-700 mb-1 flex items-center gap-2">
                      <span className="text-lg">🎬</span>
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-700">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WRITING EXERCISE - Compact */}
        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-rose-50 rounded-3xl shadow-xl p-8 md:p-10 border-l-4 border-teal-500 card-hover" style={{marginLeft: '50px'}}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center">
              <span className="text-xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-500 text-base mb-3">Practice using different types of nouns in your own sentences.</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 shadow-sm mb-3">
              <h3 className="font-semibold text-gray-800 mb-1 text-base flex items-center">
                <span className="mr-2">💡</span> Your Task
              </h3>
              <p className="text-gray-700 text-base">Write five sentences, each using a different type of noun (Common, Proper, Abstract, Collective, Compound).</p>
            </div>
            <textarea
              className="w-full border-2 border-gray-300 rounded-xl p-3 mb-3 focus:border-green-500 focus:outline-none min-h-[120px] text-base"
              placeholder="Type your sentences here...\n\nExample:\n1. The dog (common noun) ran quickly."
            />
            <div className="flex gap-3 flex-wrap mb-1">
              <button
                onClick={() => setWritingRevealed(!writingRevealed)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow text-base"
              >
                {writingRevealed ? 'Hide' : 'Show'} Sample Answer
              </button>
              <button
                onClick={() => setWritingSubmitted(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow text-base"
              >
                Submit for Review
              </button>
            </div>
            {writingSubmitted && (
              <div className="mt-4 bg-blue-50 border border-blue-300 rounded-xl p-5 animate-fade-in">
                <p className="text-blue-800 font-semibold">✓ Submitted! A teacher will review your work soon.</p>
              </div>
            )}
            {writingRevealed && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 animate-fade-in">
                <h4 className="font-bold text-gray-800 mb-2">💡 Sample Answer:</h4>
                <ol className="space-y-2 list-decimal list-inside text-gray-700 text-base">
                  <li>The <span className="bg-blue-100 px-2 py-1 rounded font-semibold">teacher</span> (common) explained the lesson.</li>
                  <li><span className="bg-purple-100 px-2 py-1 rounded font-semibold">London</span> (proper) is a beautiful city.</li>
                  <li>Her <span className="bg-pink-100 px-2 py-1 rounded font-semibold">honesty</span> (abstract) earned respect.</li>
                  <li>The <span className="bg-orange-100 px-2 py-1 rounded font-semibold">committee</span> (collective) made a decision.</li>
                  <li>I left my <span className="bg-rose-100 px-2 py-1 rounded font-semibold">toothbrush</span> (compound) at home.</li>
                </ol>
              </div>
            )}
          </div>
        </section>

        {/* READING EXERCISE - Compact */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-3xl shadow-xl p-8 md:p-10 border-l-4 border-indigo-500 card-hover" style={{marginLeft: '50px'}}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center">
              <span className="text-xl mr-2">📖</span>
              Reading Exercise
            </h2>
            <p className="text-gray-500 text-base mb-3">Read the passage and identify the nouns.</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm mb-3">
              <h3 className="font-semibold text-gray-800 mb-1 text-base flex items-center">
                <span className="mr-2">💡</span> Read this short story
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong className="text-purple-600">Sarah</strong> woke up early on <strong className="text-purple-600">Monday</strong> morning. 
                She needed to catch the <strong className="text-blue-600">train</strong> to <strong className="text-purple-600">London</strong>. 
                Her <strong className="text-pink-600">excitement</strong> was obvious as she packed her <strong className="text-rose-600">suitcase</strong>. 
                The <strong className="text-orange-600">family</strong> gathered to say goodbye, showing their <strong className="text-pink-600">love</strong>. 
                She grabbed her <strong className="text-rose-600">backpack</strong> and headed to the <strong className="text-blue-600">station</strong>.
              </p>
            </div>
            <button
              onClick={() => setReadingRevealed(!readingRevealed)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow mb-3"
            >
              {readingRevealed ? 'Hide' : 'Show'} All Nouns
            </button>
            {readingRevealed && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 animate-fade-in">
                <h4 className="font-semibold text-gray-800 mb-3 text-base">✓ Nouns Identified:</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-base">
                  <div className="bg-purple-100 p-3 rounded">
                    <span className="font-semibold text-purple-700">Proper Nouns:</span>
                    <p className="text-gray-700">Sarah, Monday, London</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <span className="font-semibold text-blue-700">Common Nouns:</span>
                    <p className="text-gray-700">train, station</p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded">
                    <span className="font-semibold text-pink-700">Abstract Nouns:</span>
                    <p className="text-gray-700">excitement, love</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <span className="font-semibold text-orange-700">Collective Nouns:</span>
                    <p className="text-gray-700">family</p>
                  </div>
                  <div className="bg-rose-100 p-3 rounded">
                    <span className="font-semibold text-rose-700">Compound Nouns:</span>
                    <p className="text-gray-700">suitcase, backpack</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INTERACTIVE QUIZ */}
        <section id="quiz" className="mb-16 scroll-mt-32">
          {/* Quiz Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center justify-center mb-3 gradient-text drop-shadow">
              <span className="text-3xl mr-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-rose-400 bg-clip-text text-transparent">🧩</span>
              Quiz Practice
            </h2>
            <p className="text-gray-500 text-base mb-6">Review questions or take the full quiz.</p>
            <button
              onClick={() => {
                setShowQuizModal(true);
                setCurrentQuestionIndex(0);
                setModalQuizAnswers({});
                setSingleQuestionMode(false);
              }}
              className="inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-rose-400 hover:from-blue-600 hover:to-rose-500 text-white font-bold py-3 px-8 rounded-3xl shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              ▶️ Start Full Quiz
            </button>
          </div>

          {/* Quiz Questions Grid - Review Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  className="bg-gradient-to-br from-blue-100 via-indigo-50 to-white rounded-3xl p-5 shadow-xl border-l-4 border-blue-400 card-hover cursor-pointer transition-all duration-300"
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                      Q{question.id}
                    </span>
                    {answered && (
                      <span className={`text-lg ${answered.correct ? '✓' : ''}`}></span>
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
                      className="h-full bg-gradient-to-r from-teal-500 to-rose-500 transition-all duration-300"
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
                                  {answered && index === question.correct && <span className="text-lg">✓</span>}
                                  {answered && answered.selected === index && index !== question.correct && <span className="text-lg"></span>}
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
                                {answered.correct ? '🎓° Correct!' : ' Not quite right!'}
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
                                ⏸ Previous
                              </button>
                              <button
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                disabled={!answered || currentQuestionIndex === interactiveQuiz.length - 1}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-teal-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                                ⏸ Back to Questions
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
                        ? ' Quiz Complete!' 
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
                        <div className="bg-gradient-to-r from-teal-50 to-rose-50 p-5 rounded-xl border border-teal-200">
                          <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length === interactiveQuiz.length
                              ? ' Perfect! You\'re a noun master!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 8
                              ? ' Excellent work!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 6
                              ? '💡 Good effort!'
                              : '💡 Keep practicing!'}
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
                        💡 Restart Quiz
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
                💡 Grid Review Complete!
              </h3>
              <p className="text-gray-700">
                You've answered all questions. Click "Start Full Quiz" for a guided quiz experience.
              </p>
            </div>
          )}
        </section>

        {/* RESOURCES - Compact */}
        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-2xl p-8 md:p-12 max-w-6xl w-full mx-auto border border-teal-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-lg mr-2">📚</span>
              Additional Resources
            </h2>
            <p className="text-gray-500 text-sm mb-3">Explore more materials to master nouns.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { title: 'Grammar Guide', url: 'https://www.englishclub.com/grammar/nouns.htm', color: 'blue', icon: '📘' },
                { title: 'Noun Games', url: 'https://www.eslgamesplus.com/nouns/', color: 'green', icon: '🎮' },
                { title: 'Worksheets', url: 'https://www.perfect-english-grammar.com/nouns-exercises.html', color: 'purple', icon: '📄' },
                { title: 'Video Playlist', url: 'https://www.youtube.com/results?search_query=english+nouns', color: 'red', icon: '🎬' },
                { title: 'Quizzes', url: 'https://www.grammarbook.com/grammar_quiz/nouns_1.asp', color: 'yellow', icon: '📝' },
                { title: 'Dictionary', url: 'https://www.oxfordlearnersdictionaries.com/', color: 'indigo', icon: '📖' }
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-white border border-${resource.color}-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all flex flex-col items-start card-hover`}
                >
                  <span className="text-2xl mb-3">{resource.icon}</span>
                  <h3 className={`font-semibold text-${resource.color}-700 text-lg mb-2`}>{resource.title}</h3>
                  <p className="text-sm text-gray-600">Explore →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action - Compact */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mt-10 flex flex-col items-center card-hover">
          <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2 gradient-text">
            <span className="text-xl">🎓</span>
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">Ready for More?</span>
          </h3>
          <p className="text-gray-700 text-sm mb-3">Continue your grammar journey!</p>
          <div className="flex gap-2">
            <button className="bg-white text-teal-700 font-bold px-4 py-1.5 rounded-full shadow hover:bg-teal-50 transition">Grammar Hub</button>
            <button className="bg-gradient-to-r from-teal-400 via-blue-400 to-rose-400 text-white font-bold px-4 py-1.5 rounded-full shadow hover:scale-105 transition">All Lessons</button>
          </div>
        </div>
      </div>

      <style>{`
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

      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMoreModal} 
        onClose={() => setShowLearnMoreModal(false)} 
        selectedItem={selectedNounType}
        title="Nouns"
      />
    </div>
  );
};

export default NounsDetail;
