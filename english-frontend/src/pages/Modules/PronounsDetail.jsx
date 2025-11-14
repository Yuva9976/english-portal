import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PronounsDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});

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
      title: 'What are Pronouns?',
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
              <span className="text-3xl md:text-4xl">💬</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Pronouns</h1>
                <p className="text-sm md:text-base text-blue-100">Master pronouns in English</p>
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
          {/* What are Pronouns */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-500">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">📖</span>
              What are Pronouns?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              A <strong>pronoun</strong> is a word that takes the place of a noun. Instead of repeating "John" or "Sarah," we use pronouns like "he" or "she" to make our speech and writing clearer and less repetitive.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">💡</span>
                  Why Learn Pronouns?
                </h3>
                <p className="text-gray-700 text-sm">
                  Pronouns are essential for smooth, natural communication. They help avoid repetition and make sentences flow better.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">🎯</span>
                  Quick Fact
                </h3>
                <p className="text-gray-700 text-sm">
                  Pronouns are used thousands of times daily in English! Understanding them is key to fluent communication.
                </p>
              </div>
            </div>
          </div>

          {/* 9 Types of Pronouns */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              9 Types of Pronouns
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {pronounTypes.map((pronoun) => (
                <div
                  key={pronoun.id}
                  className={`bg-gradient-to-br from-${pronoun.color}-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-${pronoun.color}-200 overflow-hidden flex flex-col h-full`}
                >
                  <div className={`bg-gradient-to-r from-${pronoun.color}-100 to-${pronoun.color}-50 px-4 py-3 border-b-2 border-${pronoun.color}-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{pronoun.icon}</span>
                      <h3 className={`text-base font-bold text-${pronoun.color}-800`}>{pronoun.type}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{pronoun.definition}</p>
                    
                    <div className="space-y-1.5 mb-3">
                      {pronoun.examples.slice(0, 2).map((example, index) => (
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
                    
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {pronoun.sampleWords.slice(0, 4).map((word, index) => (
                        <span
                          key={index}
                          className={`bg-${pronoun.color}-100 text-${pronoun.color}-700 px-2 py-0.5 rounded-full text-sm font-medium`}
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
        </section>

        {/* VIDEO LESSONS */}
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

        {/* WRITING EXERCISE */}
        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Practice using pronouns correctly</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">
                  Rewrite the paragraph replacing the nouns with appropriate pronouns to avoid repetition.
                </p>
              </div>

              <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[150px] text-base"
                placeholder="Write your answer here..."
                defaultValue="Sarah went to the store. Sarah bought a book. The book was interesting. Sarah read the book at home."
              />

              <button
                onClick={() => setWritingRevealed(!writingRevealed)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3"
              >
                {writingRevealed ? 'Hide' : 'Show'} Sample Answer
              </button>

              {writingRevealed && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answer:</h4>
                  <p className="text-sm text-gray-700">
                    <strong>She</strong> went to the store. <strong>She</strong> bought a book. <strong>It</strong> was interesting. <strong>She</strong> read <strong>it</strong> at home.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* READING EXERCISE */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 md:p-6 border border-blue-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Read and identify all pronouns</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Read this paragraph:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  <strong className="text-blue-600">I</strong> love reading books because <strong className="text-blue-600">they</strong> transport <strong className="text-blue-600">me</strong> to different worlds. 
                  <strong className="text-blue-600">My</strong> favorite author is Jane Austen, and <strong className="text-blue-600">her</strong> novels inspire <strong className="text-blue-600">me</strong> every day. 
                  Last week, <strong className="text-blue-600">I</strong> finished <strong className="text-blue-600">her</strong> masterpiece, and <strong className="text-blue-600">it</strong> was wonderful!
                </p>
              </div>

              <button
                onClick={() => setReadingRevealed(!readingRevealed)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
              >
                {readingRevealed ? 'Hide' : 'Show'} All Pronouns
              </button>

              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Pronouns Identified:</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <span className="font-semibold text-blue-700">Personal:</span>
                      <p className="text-gray-700">I, me, her, it</p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded">
                      <span className="font-semibold text-purple-700">Possessive:</span>
                      <p className="text-gray-700">My</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <span className="font-semibold text-indigo-700">Other:</span>
                      <p className="text-gray-700">they</p>
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
              }}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              ▶️ Start Full Quiz
            </button>
          </div>

          {/* Quiz Questions Grid - Review Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quizQuestions.map((question, qIndex) => {
              const answered = quizAnswers[question.id];
              return (
                <div
                  key={question.id}
                  onClick={() => {
                    setShowQuizModal(true);
                    setCurrentQuestionIndex(qIndex);
                    setModalQuizAnswers({});
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

          {/* Quiz Modal - Full Screen One Question at a Time */}
          {showQuizModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
                  <div>
                    <h3 className="text-2xl font-bold">Pronouns Quiz</h3>
                    <p className="text-sm text-blue-100">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                  </div>
                  <button
                    onClick={() => setShowQuizModal(false)}
                    className="text-2xl hover:text-blue-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content - One Question */}
                {currentQuestionIndex < quizQuestions.length ? (
                  <div className="p-8">
                    {(() => {
                      const question = quizQuestions[currentQuestionIndex];
                      const answered = modalQuizAnswers[question.id];

                      return (
                        <div className="space-y-6">
                          {/* Question */}
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-4xl">{question.emoji}</span>
                              <div>
                                <span className="bg-yellow-400 text-white font-bold text-xs px-3 py-1 rounded-full">
                                  Q{question.id}
                                </span>
                              </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-800">
                              {question.question}
                            </h4>
                          </div>

                          {/* Hint */}
                          {!answered && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                              <p className="text-sm text-blue-800">
                                <span className="font-semibold">💡 Hint:</span> {question.hint}
                              </p>
                            </div>
                          )}

                          {/* Options */}
                          <div className="space-y-3">
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
                                className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all text-base ${
                                  answered
                                    ? index === question.correct
                                      ? 'bg-green-50 border-green-500 text-green-900'
                                      : answered.selected === index
                                      ? 'bg-red-50 border-red-500 text-red-900'
                                      : 'bg-gray-50 border-gray-300 text-gray-500'
                                    : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 font-bold mr-3 flex-shrink-0">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  {option}
                                  {answered && index === question.correct && <span className="ml-auto text-2xl">✅</span>}
                                  {answered && answered.selected === index && index !== question.correct && <span className="ml-auto text-2xl">❌</span>}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Feedback */}
                          {answered && (
                            <div className="space-y-4 animate-fade-in">
                              <div className={`p-4 rounded-lg border-l-4 ${
                                answered.correct
                                  ? 'bg-green-50 border-green-500'
                                  : 'bg-orange-50 border-orange-500'
                              }`}>
                                <p className="font-semibold text-lg mb-2">
                                  {answered.correct ? '🎉 Correct!' : '❌ Not quite!'}
                                </p>
                                <p className="text-sm text-gray-800">
                                  {question.explanation}
                                </p>
                              </div>

                              {answered.correct && (
                                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                                  <p className="text-sm text-purple-900">
                                    <span className="font-semibold">🎓 Fun Fact:</span> {question.funFact}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Navigation */}
                          <div className="flex gap-3 pt-4 border-t">
                            <button
                              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                              disabled={currentQuestionIndex === 0}
                              className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                              ← Previous
                            </button>
                            <button
                              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                              disabled={!answered || currentQuestionIndex === quizQuestions.length - 1}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                            >
                              Next →
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Results Screen */
                  <div className="p-8 text-center space-y-6">
                    <h3 className="text-3xl font-bold text-gray-800">
                      {Object.keys(modalQuizAnswers).length === quizQuestions.length 
                        ? '🎊 Quiz Complete!' 
                        : '⏸️ Quiz Paused'}
                    </h3>

                    {Object.keys(modalQuizAnswers).length === quizQuestions.length && (
                      <>
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6">
                          <p className="text-sm text-gray-600 mb-2">Your Score</p>
                          <div className="text-5xl font-bold text-orange-600">
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}
                            <span className="text-2xl text-gray-600">/100</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-lg font-semibold text-gray-800">
                            {Object.values(modalQuizAnswers).filter(a => a.correct).length === quizQuestions.length
                              ? '🏆 Perfect Score! You\'re a pronoun master!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 8
                              ? '🥇 Excellent work!'
                              : Object.values(modalQuizAnswers).filter(a => a.correct).length >= 6
                              ? '👏 Good effort!'
                              : '📚 Keep practicing!'}
                          </p>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowQuizModal(false)}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setModalQuizAnswers({});
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Restart Quiz
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
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              Additional Resources
            </h2>
            <p className="text-gray-600 text-sm mb-5">Explore more materials to master pronouns</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready for More?</h3>
          <p className="text-sm mb-4 text-blue-100">
            Continue your grammar journey!
          </p>
          <button
            onClick={() => navigate('/modules/grammar-hub')}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
          >
            Back to Grammar Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default PronounsDetail;
