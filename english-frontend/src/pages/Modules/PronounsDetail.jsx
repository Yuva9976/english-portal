import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

const PronounsDetail = () => {
  // Banner removed for compact header style
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [learnMoreData, setLearnMoreData] = useState(null);
  const [loadingLearnMore, setLoadingLearnMore] = useState(false);
  const [activeLearnTab, setActiveLearnTab] = useState('overview');

  // Ensure page is at top when this detail view mounts (fixes browser scroll retention)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, []);

  // 9 Types of Pronouns
  const pronounTypes = [
    {
      id: 1,
      type: 'Personal Pronouns',
      icon: '👤',
      color: 'blue',
      definition: 'Refer to specific people or things. Include subject and object forms.',
      examples: ['<strong>I</strong> enjoy reading. She <strong>helped</strong> <strong>him</strong>.', '<strong>We</strong> are learning English together.'],
      sampleWords: ['I, you, he, she, it, we, they', 'me, him, her, us, them']
    },
    {
      id: 2,
      type: 'Possessive Pronouns',
      icon: '🎁',
      color: 'green',
      definition: 'Show ownership or belonging without needing a noun after them.',
      examples: ['This book is <strong>mine</strong>. That pen is <strong>his</strong>.', '<strong>Yours</strong> is on the table. <strong>Theirs</strong> is in the bag.'],
      sampleWords: ['mine, yours, his, hers, its, ours, theirs']
    },
    {
      id: 3,
      type: 'Demonstrative Pronouns',
      icon: '👉',
      color: 'purple',
      definition: 'Point out specific people or things. Show distance or nearness.',
      examples: ['<strong>This</strong> is my favorite song. <strong>That</strong> belongs to him.', '<strong>These</strong> are perfect. <strong>Those</strong> are old.'],
      sampleWords: ['this, that, these, those']
    },
    {
      id: 4,
      type: 'Reflexive Pronouns',
      icon: '🪞',
      color: 'pink',
      definition: 'Used when subject and object are the same person. Show actions reflected back.',
      examples: ['She <strong>taught herself</strong> to code. I <strong>hurt myself</strong> yesterday.', 'They <strong>enjoyed themselves</strong> at the party.'],
      sampleWords: ['myself, yourself, himself, herself, itself, ourselves, themselves']
    },
    {
      id: 5,
      type: 'Relative Pronouns',
      icon: '🔗',
      color: 'orange',
      definition: 'Connect clauses to nouns. Introduce relative/dependent clauses.',
      examples: ['The book <strong>that</strong> I read was great. The person <strong>who</strong> called is here.', 'The house <strong>where</strong> we live is beautiful.'],
      sampleWords: ['who, whom, whose, which, that, where, why']
    },
    {
      id: 6,
      type: 'Interrogative Pronouns',
      icon: '❓',
      color: 'red',
      definition: 'Used to ask questions. Always appear at the beginning of questions.',
      examples: ['<strong>Who</strong> is that? <strong>What</strong> do you want?', '<strong>Which</strong> one is yours? <strong>Whose</strong> is this?'],
      sampleWords: ['who, whom, whose, what, which']
    },
    {
      id: 7,
      type: 'Indefinite Pronouns',
      icon: '❔',
      color: 'indigo',
      definition: 'Refer to people or things that are not specific or known.',
      examples: ['<strong>Someone</strong> left the door open. <strong>Everything</strong> is ready.', '<strong>No one</strong> knows the answer. <strong>Anybody</strong> can help.'],
      sampleWords: ['someone, something, anyone, anything, no one, nothing, everyone, everything']
    },
    {
      id: 8,
      type: 'Intensive Pronouns',
      icon: '⭐',
      color: 'yellow',
      definition: 'Emphasize or intensify a noun or pronoun. Same forms as reflexive.',
      examples: ['<strong>I myself</strong> saw it. The president <strong>herself</strong> attended.', '<strong>You yourself</strong> admitted the truth.'],
      sampleWords: ['myself, yourself, himself, herself, itself, ourselves, themselves']
    },
    {
      id: 9,
      type: 'Reciprocal Pronouns',
      icon: '🤝',
      color: 'teal',
      definition: 'Show mutual action between two or more people. Action goes both ways.',
      examples: ['They <strong>love each other</strong>. We help <strong>one another</strong>.', 'The teammates respect <strong>one another</strong>.'],
      sampleWords: ['each other, one another']
    }
  ];

  // Navigation sections
  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  // Video resources
  const videos = [
    {
      id: 1,
      title: 'What is Pronoun?',
      embedId: 'VdAPL36k8xE',
      description: 'Learn the basics of pronouns and their importance in English.'
    },
    {
      id: 2,
      title: 'Personal vs. Possessive Pronouns',
      embedId: 'VxKRfX_Io7w',
      description: 'Clear explanation of the most common pronouns.'
    }
  ];

  // Comprehensive interactive quiz questions - 10 Questions covering all pronoun types
  const quizQuestions = [
    {
      id: 1,
      type: 'multiple-choice',
      emoji: '👤',
      question: 'Which pronoun is in the OBJECTIVE (object) form?',
      hint: 'Object pronouns receive the action: me, him, her, us, them.',
      options: ['She', 'I', 'him', 'they'],
      correct: 2,
      explanation: '🎯 Correct! "Him" is the objective form of the personal pronoun "he". Use object pronouns after verbs or prepositions.',
      funFact: '📌 Personal pronouns have two forms: Subject (I, you, he) vs. Object (me, you, him)'
    },
    {
      id: 2,
      type: 'multiple-choice',
      emoji: '🎁',
      question: 'Which sentence correctly uses a POSSESSIVE pronoun?',
      hint: 'Possessive pronouns show ownership and stand alone: mine, yours, his, hers, ours, theirs.',
      options: [
        'This pen is her.',
        'The book is mine.',
        'That car is my.',
        'This house is our.'
      ],
      correct: 1,
      explanation: '✨ Perfect! "The book is mine" is correct. Possessive pronouns stand alone - no noun follows them.',
      funFact: '🎯 Don\'t confuse: possessive pronouns (mine) vs. possessive adjectives (my). "This is my book" vs. "This book is mine"'
    },
    {
      id: 3,
      type: 'fill-in-the-blank',
      emoji: '👉',
      question: 'Fill in the blank: "_____ books on the shelf are more interesting than those on the table."',
      hint: 'Use a demonstrative pronoun to point out which books you\'re referring to.',
      options: ['This', 'These', 'That', 'Those'],
      correct: 1,
      explanation: '🎊 Excellent! "These" is correct because "books" is plural and refers to items that are nearby (opposite of "those").',
      funFact: '👉 Demonstrative pronouns: this/these (near), that/those (far). They point out specific items.'
    },
    {
      id: 4,
      type: 'multiple-choice',
      emoji: '🪞',
      question: 'Identify the REFLEXIVE pronoun: "She taught herself to play the guitar."',
      hint: 'Reflexive pronouns show the action reflects back to the subject: -self/-selves words.',
      options: ['She', 'taught', 'herself', 'to play'],
      correct: 2,
      explanation: '🎸 Fantastic! "Herself" is a reflexive pronoun. The subject (she) performs the action on herself.',
      funFact: '🔄 All reflexive pronouns end in -self (singular) or -selves (plural): myself, yourself, himself, ourselves, themselves'
    },
    {
      id: 5,
      type: 'fill-in-the-blank',
      emoji: '🔗',
      question: 'Fill in the blank: "The athlete _____ won the race trained every day."',
      hint: 'This relative pronoun connects the clause to the noun "athlete".',
      options: ['who', 'which', 'that', 'where'],
      correct: 0,
      explanation: '🏃 Perfect! "Who" is correct because it refers to a person (the athlete). Use "that" or "which" for things.',
      funFact: '📝 Relative pronouns: who/whom (people), which (things), that (people or things), where (places), whose (possession)'
    },
    {
      id: 6,
      type: 'multiple-choice',
      emoji: '❓',
      question: 'Which interrogative pronoun correctly completes the question: "_____ of the two options do you prefer?"',
      hint: 'Interrogative pronouns ask questions and often appear at the start.',
      options: ['Who', 'Which', 'What', 'Whose'],
      correct: 1,
      explanation: '✅ Correct! "Which" is used when choosing between specific options. "Who" is for people, "what" is for things.',
      funFact: '❓ Common interrogative pronouns: who, whom, whose, what, which. Always start a question!'
    },
    {
      id: 7,
      type: 'multiple-choice',
      emoji: '❔',
      question: 'Identify the INDEFINITE pronoun: "Someone left their umbrella at the office."',
      hint: 'Indefinite pronouns refer to non-specific or unknown people/things.',
      options: ['left', 'Someone', 'their', 'office'],
      correct: 1,
      explanation: '🎯 Great! "Someone" is indefinite because it refers to an unknown or unspecified person.',
      funFact: '🔍 Indefinite pronouns: someone, something, anyone, anything, no one, nothing, everyone, everything, anybody, somebody'
    },
    {
      id: 8,
      type: 'fill-in-the-blank',
      emoji: '⭐',
      question: 'Fill in the blank: "The president _____ opened the new building."',
      hint: 'This pronoun emphasizes or intensifies the noun/pronoun before it. It has -self/-selves.',
      options: ['herself', 'self', 'oneself', 'herself'],
      correct: 0,
      explanation: '👑 Perfect! "Herself" is an intensive pronoun here, emphasizing that the president personally opened the building.',
      funFact: '⭐ Intensive and reflexive pronouns have the same form (-self/-selves), but different purposes: He hurt himself (reflexive) vs. He saw it himself (intensive)'
    },
    {
      id: 9,
      type: 'multiple-choice',
      emoji: '🤝',
      question: 'Which sentence correctly uses a RECIPROCAL pronoun?',
      hint: 'Reciprocal pronouns show mutual action: "each other" or "one another".',
      options: [
        'They helped each other with homework.',
        'They helped themselves with homework.',
        'They helped other with homework.',
        'They helped themselves to food.'
      ],
      correct: 0,
      explanation: '💪 Excellent! "Each other" is a reciprocal pronoun showing mutual action between both people.',
      funFact: '🤝 Two reciprocal pronouns: "each other" (usually 2 people) and "one another" (groups). Both can be used interchangeably.'
    },
    {
      id: 10,
      type: 'fill-in-the-blank',
      emoji: '🌟',
      question: 'Which set of pronouns best completes: "_____ told _____ that the secret was out"?',
      hint: 'First blank needs a subject pronoun, second needs an object pronoun.',
      options: [
        'I, him',
        'Me, he',
        'I, me',
        'He, I'
      ],
      correct: 0,
      explanation: '✅ Perfect! "I" (subject) is the one doing the telling. "Him" (object) is receiving the information. Subject comes first!',
      funFact: '📌 Subject pronouns: I, you, he, she, it, we, they. Object pronouns: me, you, him, her, it, us, them.'
    }
  ];

  const handleQuiz = (questionId, answerIndex) => {
    const question = quizQuestions.find(q => q.id === questionId);
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
    <div className="min-h-screen bg-white">
      {/* Compact Sticky Header (Noun-style) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.history.state && window.history.state.idx > 0) {
                  navigate(-1);
                } else {
                  navigate('/modules/grammar-hub');
                }
              }}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2"
              title="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">💬</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Pronouns</h1>
            <span className="text-base text-teal-600 ml-2">Make your sentences flow naturally</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${activeSection === section.id
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
          {/* What are Pronouns - Super Compact Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6" style={{ marginLeft: '50px', marginRight: '50px' }}>
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">💬</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-800 leading-tight">What are Pronouns?</h2>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-snug mb-2 pl-7">
              A <strong>pronoun</strong> replaces a noun to avoid repetition. Use them for clearer, more natural communication.
            </p>
            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-teal-200 rounded-lg p-2">
                <p className="text-sm font-semibold text-teal-600">💡 Why Learn?</p>
                <p className="text-base text-gray-700 leading-tight mt-0.5">Clearer, less repetitive speech</p>
              </div>
              <div className="bg-white border border-rose-200 rounded-lg p-2">
                <p className="text-sm font-semibold text-rose-400">🎯 Quick Fact</p>
                <p className="text-base text-gray-700 leading-tight mt-0.5">Essential for fluent English</p>
              </div>
            </div>
          </div>
          {/* 9 Types of Pronouns */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              Nine Types of Pronouns
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {pronounTypes.map((pronoun) => (
                <div key={pronoun.id} className={`relative rounded-2xl shadow-xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/70 border border-${pronoun.color}-200 hover:border-${pronoun.color}-400 hover:shadow-2xl hover:ring-2 hover:ring-${pronoun.color}-300`} style={{ borderTop: `4px solid var(--tw-color-${pronoun.color}-400)`, padding: '10px' }}>
                  <div className="absolute top-3 right-3 opacity-10 text-4xl pointer-events-none select-none">{pronoun.icon}</div>
                  <div className="flex items-center gap-2 px-4 pt-5 pb-2 z-10">
                    <span className={`text-2xl drop-shadow-lg`} style={{ color: `var(--tw-color-${pronoun.color}-500)` }}>{pronoun.icon}</span>
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight drop-shadow">{pronoun.type}</h3>
                  </div>
                  <div className="px-4 pb-5 flex-1 flex flex-col z-10">
                    <p className="text-base text-gray-700 leading-relaxed mb-3 font-medium bg-white/80 rounded-lg px-2 py-1 shadow-sm">{pronoun.definition}</p>
                    <div className="space-y-2 mb-3">
                      {pronoun.examples.slice(0, 2).map((example, index) => (
                        <div key={index} className={`bg-gradient-to-r from-${pronoun.color}-50 to-blue-50 px-3 py-2 rounded-lg border border-${pronoun.color}-100 shadow group-hover:scale-[1.02] group-hover:border-${pronoun.color}-300 transition-all`}>
                          <p className="text-base text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: example }} />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {pronoun.sampleWords.slice(0, 4).map((word, idx) => (
                        <span key={idx} className={`bg-gradient-to-r from-${pronoun.color}-200 to-blue-200 text-${pronoun.color}-700 px-3 py-1 rounded-full text-sm font-bold border border-${pronoun.color}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}>{word}</span>
                      ))}
                    </div>
                    <button onClick={() => { setSelectedType(pronoun); setShowLearnMoreModal(true); }} className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2 rounded-xl font-bold text-base shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.03] group-hover:ring-2 group-hover:ring-teal-400">Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* VIDEO LESSONS */}
        <section id="videos" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 rounded-xl shadow-lg border border-teal-100 p-6 md:p-10" style={{ marginLeft: '15px' }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-teal-700 mb-3 flex items-center gap-2 drop-shadow">
              <span className="text-3xl bg-gradient-to-r from-blue-400 via-teal-400 to-rose-400 bg-clip-text text-transparent">🎥</span>
              Video Lessons
            </h2>
            <p className="text-gray-500 text-base mb-7">Watch these helpful videos.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map(video => (
                <div key={video.id} className="bg-white border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-teal-100 via-blue-50 to-rose-100 flex items-center justify-center relative">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 via-white to-teal-50">
                    <h3 className="font-semibold text-base text-teal-700 mb-1 flex items-center gap-2">
                      <span className="text-lg">🎥</span>
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-700">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WRITING EXERCISE */}
        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-rose-50 rounded-3xl shadow-xl p-8 md:p-10 border-l-4 border-teal-500 card-hover" style={{ marginLeft: '15px' }}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center">
              <span className="text-xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-500 text-base mb-3">Practice using pronouns in your own sentences.</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 shadow-sm mb-3">
              <h3 className="font-semibold text-gray-800 mb-1 text-base flex items-center">
                <span className="mr-2">💡</span> Your Task
              </h3>
              <p className="text-gray-700 text-base">Rewrite the paragraph replacing the nouns with appropriate pronouns to avoid repetition.</p>
            </div>
            <textarea
              className="w-full border-2 border-gray-300 rounded-xl p-3 mb-3 focus:border-green-500 focus:outline-none min-h-[120px] text-base"
              placeholder="Type your sentences here...\n\nExample:\nSarah went to the store. Sarah bought a book. The book was interesting. Sarah read the book at home."
            />
            <div className="flex gap-3 flex-wrap mb-1">
              <button
                onClick={() => setWritingRevealed(!writingRevealed)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow text-base"
              >
                {writingRevealed ? 'Hide' : 'Show'} Sample Answer
              </button>
            </div>
            {writingRevealed && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 animate-fade-in">
                <h4 className="font-bold text-gray-800 mb-2">💡 Sample Answer:</h4>
                <p className="text-gray-700 text-base">She went to the store. She bought a book. It was interesting. She read it at home.</p>
              </div>
            )}
          </div>
        </section>

        {/* READING EXERCISE */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-3xl shadow-xl p-8 md:p-10 border-l-4 border-indigo-500 card-hover" style={{ marginLeft: '15px' }}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center">
              <span className="text-xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-500 text-base mb-3">Read and identify all pronouns.</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm mb-3">
              <h3 className="font-semibold text-gray-800 mb-1 text-base flex items-center">
                <span className="mr-2">💡</span> Read this paragraph
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong className="text-blue-600">I</strong> love reading books because <strong className="text-blue-600">they</strong> transport <strong className="text-blue-600">me</strong> to different worlds.
                <strong className="text-blue-600">My</strong> favorite author is Jane Austen, and <strong className="text-blue-600">her</strong> novels inspire <strong className="text-blue-600">me</strong> every day.
                Last week, <strong className="text-blue-600">I</strong> finished <strong className="text-blue-600">her</strong> masterpiece, and <strong className="text-blue-600">it</strong> was wonderful!
              </p>
            </div>
            <button
              onClick={() => setReadingRevealed(!readingRevealed)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow mb-3"
            >
              {readingRevealed ? 'Hide' : 'Show'} All Pronouns
            </button>
            {readingRevealed && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 animate-fade-in">
                <h4 className="font-semibold text-gray-800 mb-3 text-base">✓ Pronouns Identified:</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-base">
                  <div className="bg-blue-100 p-3 rounded">
                    <span className="font-semibold text-blue-700">Personal:</span>
                    <p className="text-gray-700">I, me, her, it</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <span className="font-semibold text-purple-700">Possessive:</span>
                    <p className="text-gray-700">My</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded">
                    <span className="font-semibold text-indigo-700">Other:</span>
                    <p className="text-gray-700">they</p>
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
              <span className="text-3xl mr-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-rose-400 bg-clip-text text-transparent">🎯</span>
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
            {quizQuestions.map((question, qIndex) => {
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
                      Q{qIndex + 1}
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
                    <div className={`text-xs font-medium p-1.5 rounded ${answered.correct
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
                      style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                )}

                {/* Modal Header - Compact with Close Button on Right */}
                <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                  <div>
                    {!singleQuestionMode && (
                      <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
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
                {currentQuestionIndex < quizQuestions.length ? (
                  <div className="p-6 md:p-8">
                    {(() => {
                      const question = quizQuestions[currentQuestionIndex];
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
                                  <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${answered
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
                            <div className={`p-4 rounded-lg border-l-4 space-y-1.5 ${answered.correct
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
                                disabled={!answered || currentQuestionIndex === quizQuestions.length - 1}
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
                      {Object.keys(modalQuizAnswers).length === quizQuestions.length
                        ? '🎊 Quiz Complete!'
                        : '⏸️ Quiz Paused'}
                    </h3>

                    {Object.keys(modalQuizAnswers).length === quizQuestions.length && (
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
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length === quizQuestions.length
                              ? '🏆 Perfect! You\'re a pronoun master!'
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
                              {quizQuestions.length - Object.values(modalQuizAnswers).filter(a => a.correct).length}
                            </p>
                            <p className="text-xs md:text-sm font-semibold text-slate-600">Incorrect</p>
                          </div>
                          <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200 text-center">
                            <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                              {Math.round((Object.values(modalQuizAnswers).filter(a => a.correct).length / quizQuestions.length) * 100)}%
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
          {Object.keys(quizAnswers).length === quizQuestions.length && (
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

        {/* RESOURCES */}
        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-2xl p-8 md:p-12 max-w-6xl w-full mx-auto border border-teal-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-lg mr-2">🔗</span>
              Additional Resources
            </h2>
            <p className="text-gray-500 text-sm mb-3">Explore more materials to master pronouns.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { title: 'Grammar Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/pronouns.htm', color: 'blue' },
                { title: 'Pronoun Games', icon: '🎮', url: 'https://www.eslgamesplus.com/pronouns/', color: 'green' },
                { title: 'Worksheets', icon: '📄', url: 'https://www.english-grammar-lessons.com/pronoun-exercises', color: 'purple' },
                { title: 'Video Playlist', icon: '📺', url: 'https://www.youtube.com/results?search_query=english+pronouns', color: 'red' },
                { title: 'Practice Quizzes', icon: '✅', url: 'https://www.perfect-english-grammar.com/pronoun-exercises.html', color: 'yellow' },
                { title: 'Interactive Tools', icon: '🛠️', url: 'https://www.grammarly.com/', color: 'indigo' }
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

        {/* Call to Action */}
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

      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={showLearnMoreModal}
        onClose={() => setShowLearnMoreModal(false)}
        selectedItem={selectedType}
        title="Pronouns"
      />
    </div>
  );
};

export default PronounsDetail;
