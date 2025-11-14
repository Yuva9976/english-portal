import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PronounsDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [writingSubmitted, setWritingSubmitted] = useState(false);

  // 8 pronoun types with comprehensive information
  const pronounTypes = [
    {
      id: 1,
      type: 'Personal Pronouns',
      icon: '👤',
      color: 'blue',
      definition: 'Replace specific people or things. Change form based on case (subject, object, possessive).',
      examples: ['<strong>I</strong> love reading.', '<strong>She</strong> gave <strong>him</strong> a book.'],
      sampleWords: ['I, you, he, she, it', 'we, they, me, us']
    },
    {
      id: 2,
      type: 'Possessive Pronouns',
      icon: '🔑',
      color: 'green',
      definition: 'Show ownership or belonging. Stand alone without a noun after them.',
      examples: ['That book is <strong>mine</strong>.', 'This pen is <strong>yours</strong>.'],
      sampleWords: ['mine, yours, his', 'hers, ours, theirs']
    },
    {
      id: 3,
      type: 'Reflexive Pronouns',
      icon: '🪞',
      color: 'purple',
      definition: 'Refer back to the subject. End in -self or -selves.',
      examples: ['She made it <strong>herself</strong>.', 'They enjoyed <strong>themselves</strong>.'],
      sampleWords: ['myself, yourself', 'himself, herself', 'ourselves, themselves']
    },
    {
      id: 4,
      type: 'Demonstrative Pronouns',
      icon: '👉',
      color: 'pink',
      definition: 'Point to specific things. Indicate nearness or distance.',
      examples: ['<strong>This</strong> is amazing!', '<strong>Those</strong> are beautiful.'],
      sampleWords: ['this, that', 'these, those']
    },
    {
      id: 5,
      type: 'Interrogative Pronouns',
      icon: '❓',
      color: 'orange',
      definition: 'Used to ask questions about people or things.',
      examples: ['<strong>Who</strong> is calling?', '<strong>What</strong> did you see?'],
      sampleWords: ['who, whom, whose', 'what, which']
    },
    {
      id: 6,
      type: 'Relative Pronouns',
      icon: '🔗',
      color: 'teal',
      definition: 'Connect clauses or phrases to a noun or pronoun.',
      examples: ['The girl <strong>who</strong> called is here.', 'The book <strong>that</strong> I read was good.'],
      sampleWords: ['who, whom, whose', 'which, that']
    },
    {
      id: 7,
      type: 'Indefinite Pronouns',
      icon: '🌟',
      color: 'indigo',
      definition: 'Refer to non-specific people or things. Don\'t refer to a particular person or thing.',
      examples: ['<strong>Everyone</strong> is here.', '<strong>Something</strong> is wrong.'],
      sampleWords: ['anyone, everyone', 'somebody, nothing', 'all, some, any']
    },
    {
      id: 8,
      type: 'Reciprocal Pronouns',
      icon: '🤝',
      color: 'rose',
      definition: 'Express mutual actions or relationships between two or more people.',
      examples: ['They love <strong>each other</strong>.', 'We help <strong>one another</strong>.'],
      sampleWords: ['each other', 'one another']
    }
  ];

  // YouTube videos about pronouns
  const videos = [
    {
      id: 1,
      title: 'English Pronouns - Complete Guide',
      embedId: 'B1-vjRgRgYQ',
      description: 'A comprehensive introduction to all types of pronouns'
    },
    {
      id: 2,
      title: 'Personal Pronouns Explained',
      embedId: 'FJLggQZe8tM',
      description: 'Learn about subject and object pronouns with examples'
    }
  ];

  // Interactive Quiz - Fun and Engaging
  const interactiveQuiz = [
    {
      id: 1,
      emoji: '👤',
      question: 'Which word is a personal pronoun?',
      hint: 'Personal pronouns replace names of people or things!',
      options: ['book', 'she', 'running', 'beautiful'],
      correct: 1,
      explanation: '🎯 Correct! "She" is a personal pronoun that refers to a female person.',
      funFact: '💡 Personal pronouns change form: I/me, he/him, she/her!'
    },
    {
      id: 2,
      emoji: '🔑',
      question: 'Find the possessive pronoun in: "The car is mine."',
      hint: 'Which word shows ownership?',
      options: ['The', 'car', 'is', 'mine'],
      correct: 3,
      explanation: '🎉 Excellent! "Mine" is a possessive pronoun showing that the car belongs to me.',
      funFact: '🌟 Possessive pronouns: mine, yours, his, hers, ours, theirs'
    },
    {
      id: 3,
      emoji: '🪞',
      question: 'Which is a reflexive pronoun?',
      hint: 'Look for words ending in -self or -selves!',
      options: ['me', 'myself', 'my', 'mine'],
      correct: 1,
      explanation: '✨ Perfect! "Myself" is a reflexive pronoun that refers back to the subject "I".',
      funFact: '📚 Reflexive pronouns always end in -self or -selves'
    },
    {
      id: 4,
      emoji: '👉',
      question: 'Identify the demonstrative pronoun: "That is amazing!"',
      hint: 'Which word points to something?',
      options: ['That', 'is', 'amazing', 'None'],
      correct: 0,
      explanation: '🏆 Amazing! "That" is a demonstrative pronoun pointing to something specific.',
      funFact: '🦁 This/that for singular, these/those for plural!'
    },
    {
      id: 5,
      emoji: '❓',
      question: 'Which is an interrogative pronoun?',
      hint: 'Used to ask questions!',
      options: ['where', 'who', 'when', 'why'],
      correct: 1,
      explanation: '🎊 Brilliant! "Who" is an interrogative pronoun used to ask about people.',
      funFact: '🔤 Interrogative pronouns: who, whom, whose, what, which'
    },
    {
      id: 6,
      emoji: '🔗',
      question: 'Find the relative pronoun: "The man who called is here."',
      hint: 'Which word connects the clause?',
      options: ['The', 'man', 'who', 'called'],
      correct: 2,
      explanation: '🍎 Fantastic! "Who" is a relative pronoun connecting the clause to "man".',
      funFact: '🌈 Relative pronouns introduce dependent clauses!'
    },
    {
      id: 7,
      emoji: '🌟',
      question: 'Which is an indefinite pronoun?',
      hint: 'Refers to non-specific things!',
      options: ['this', 'everyone', 'which', 'myself'],
      correct: 1,
      explanation: '🐕 Well done! "Everyone" is an indefinite pronoun referring to all people in general.',
      funFact: '✏️ Indefinite pronouns: someone, anyone, everyone, nothing, etc.'
    },
    {
      id: 8,
      emoji: '🤝',
      question: 'Find the reciprocal pronoun: "They help each other."',
      hint: 'Shows mutual action!',
      options: ['They', 'help', 'each other', 'None'],
      correct: 2,
      explanation: '👦👦 Awesome! "Each other" is a reciprocal pronoun showing mutual help.',
      funFact: '📖 Only two reciprocal pronouns: each other and one another'
    }
  ];

  const tips = [
    { icon: '✅', type: 'DO', text: 'Use "I" for subjects and "me" for objects.', color: 'green' },
    { icon: '✅', type: 'DO', text: 'Match pronouns with their antecedents in number.', color: 'green' },
    { icon: '❌', type: "DON'T", text: 'Don\'t confuse "its" (possessive) with "it\'s" (it is).', color: 'red' },
    { icon: '❌', type: "DON'T", text: 'Don\'t use "myself" when "I" or "me" is correct.', color: 'red' }
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Compact Sticky Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center space-x-1 text-white hover:text-green-100 transition-colors text-sm"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl md:text-4xl">👥</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Pronouns</h1>
                <p className="text-sm md:text-base text-green-100">Master the words that replace nouns</p>
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
                      ? 'bg-white text-green-600 shadow-md'
                      : 'bg-green-500 bg-opacity-40 text-white hover:bg-opacity-60'
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
          {/* What are Pronouns - Compact */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-green-500">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">📖</span>
              What are Pronouns?
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              A <strong>pronoun</strong> is a word that takes the place of a noun or noun phrase. Pronouns help us avoid repetition and make sentences flow more naturally. Without pronouns, we would have to repeat the same nouns over and over!
            </p>
            
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">💡</span>
                  Why Learn Pronouns?
                </h3>
                <p className="text-gray-700 text-sm">
                  Pronouns make your speech and writing more natural and less repetitive. They're essential for clear communication.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-1 flex items-center text-sm">
                  <span className="text-lg mr-1.5">🎯</span>
                  Quick Fact
                </h3>
                <p className="text-gray-700 text-sm">
                  Pronouns are among the most frequently used words in English!
                </p>
              </div>
            </div>
          </div>

          {/* 8 Types of Pronouns - Compact Design */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🎨</span>
              8 Types of Pronouns
            </h2>
            
            {/* Compact Cards Grid - 2-3 per row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {pronounTypes.map((pronoun) => (
                <div
                  key={pronoun.id}
                  className={`bg-gradient-to-br from-${pronoun.color}-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-${pronoun.color}-200 overflow-hidden flex flex-col h-full`}
                >
                  {/* Card Header - Compact */}
                  <div className={`bg-gradient-to-r from-${pronoun.color}-100 to-${pronoun.color}-50 px-4 py-3 border-b-2 border-${pronoun.color}-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{pronoun.icon}</span>
                      <h3 className={`text-base font-bold text-${pronoun.color}-800`}>{pronoun.type}</h3>
                    </div>
                  </div>
                  
                  {/* Card Body - Tight Spacing */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Definition */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{pronoun.definition}</p>
                    
                    {/* Examples - Minimal */}
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
                    
                    {/* Sample Words - Compact Tags */}
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
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Subject pronouns:</strong> I, you, he, she, it, we, they (before verbs)</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Object pronouns:</strong> me, you, him, her, it, us, them (after verbs/prepositions)</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <p className="text-gray-700"><strong>Agreement:</strong> Pronouns must match their antecedents in number and gender</p>
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
                <div key={video.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
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
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md p-5 md:p-6 border border-purple-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Practice using different types of pronouns</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-purple-100 border-l-4 border-purple-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">
                  Write five sentences, each using a different type of pronoun (Personal, Possessive, Reflexive, Demonstrative, Interrogative).
                </p>
              </div>

              <textarea
                className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-purple-500 focus:outline-none min-h-[200px]"
                placeholder="Type your sentences here...&#10;&#10;Example:&#10;1. She (personal pronoun) loves reading."
              />

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setWritingRevealed(!writingRevealed)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
                <div className="mt-6 bg-purple-50 border-2 border-purple-300 rounded-xl p-6 animate-fade-in">
                  <h4 className="font-bold text-gray-800 mb-4">📋 Sample Answer:</h4>
                  <ol className="space-y-3 list-decimal list-inside text-gray-700">
                    <li><span className="bg-blue-100 px-2 py-1 rounded font-semibold">She</span> (personal) loves to paint.</li>
                    <li>That backpack is <span className="bg-green-100 px-2 py-1 rounded font-semibold">mine</span> (possessive).</li>
                    <li>He cooked dinner <span className="bg-purple-100 px-2 py-1 rounded font-semibold">himself</span> (reflexive).</li>
                    <li><span className="bg-pink-100 px-2 py-1 rounded font-semibold">This</span> (demonstrative) is delicious!</li>
                    <li><span className="bg-orange-100 px-2 py-1 rounded font-semibold">Who</span> (interrogative) is coming?</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* READING EXERCISE - Compact */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-5 md:p-6 border border-teal-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-600 text-sm mb-4">Read the passage and identify the pronouns</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-teal-100 border-l-4 border-teal-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Read this short story:</h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  <strong className="text-blue-600">She</strong> looked at <strong className="text-blue-600">herself</strong> in the mirror. 
                  The reflection was <strong className="text-green-600">hers</strong>, but <strong className="text-pink-600">this</strong> didn't feel real. 
                  <strong className="text-orange-600">Who</strong> was <strong className="text-blue-600">she</strong> becoming? 
                  <strong className="text-indigo-600">Everyone</strong> said <strong className="text-blue-600">they</strong> supported <strong className="text-blue-600">her</strong>. 
                  <strong className="text-blue-600">We</strong> help <strong className="text-rose-600">each other</strong>, <strong className="text-blue-600">they</strong> told <strong className="text-blue-600">her</strong>.
                </p>
              </div>

              <button
                onClick={() => setReadingRevealed(!readingRevealed)}
                className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg font-medium hover:bg-teal-700 transition-colors mb-3"
              >
                {readingRevealed ? 'Hide' : 'Show'} All Pronouns
              </button>

              {readingRevealed && (
                <div className="bg-teal-50 border border-teal-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Pronouns Identified:</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <span className="font-semibold text-blue-700">Personal:</span>
                      <p className="text-gray-700">She, herself, her, they, we</p>
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <span className="font-semibold text-green-700">Possessive:</span>
                      <p className="text-gray-700">hers</p>
                    </div>
                    <div className="bg-pink-100 p-2 rounded">
                      <span className="font-semibold text-pink-700">Demonstrative:</span>
                      <p className="text-gray-700">this</p>
                    </div>
                    <div className="bg-orange-100 p-2 rounded">
                      <span className="font-semibold text-orange-700">Interrogative:</span>
                      <p className="text-gray-700">Who</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <span className="font-semibold text-indigo-700">Indefinite:</span>
                      <p className="text-gray-700">Everyone</p>
                    </div>
                    <div className="bg-rose-100 p-2 rounded">
                      <span className="font-semibold text-rose-700">Reciprocal:</span>
                      <p className="text-gray-700">each other</p>
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
            <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-xl px-6 py-3 shadow-lg">
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
                        <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">Q{question.id}</span>
                        <span className="text-xs text-gray-500 font-medium">{qIndex + 1}/{interactiveQuiz.length}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">
                        {question.question}
                      </h3>
                    </div>
                  </div>

                  {/* Hint Section - Compact */}
                  {!answered && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-2.5 mb-3 rounded-r-lg">
                      <p className="text-xs md:text-sm text-green-800">
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
                            : 'bg-white border-gray-300 hover:border-green-400 hover:bg-green-50 hover:shadow-sm'
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
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-2.5 rounded-r-lg">
                          <p className="text-xs md:text-sm text-blue-900 leading-relaxed">
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
            <div className="max-w-2xl mx-auto mt-6 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-xl p-5 md:p-6 text-center shadow-lg border-2 border-green-400 animate-fade-in">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {quizScore >= 60 ? '🏆 Outstanding!' : quizScore >= 40 ? '👏 Great Job!' : '📚 Keep Learning!'}
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-3">
                You scored <span className="font-bold text-green-600 text-lg md:text-xl">{quizScore}</span> out of <span className="font-bold">80 points</span>
              </p>
              
              {quizScore === 80 && (
                <div className="inline-block bg-green-200 border-2 border-green-500 rounded-full px-5 py-2 mb-2">
                  <span className="text-xl md:text-2xl mr-2">🥇</span>
                  <span className="font-bold text-green-800 text-base md:text-lg">Perfect Score!</span>
                </div>
              )}
              
              <p className="text-xs md:text-sm text-gray-600 mt-2">
                {quizScore >= 60 
                  ? "Amazing work! You're a pronoun expert! 🌟" 
                  : quizScore >= 40 
                  ? "Good effort! Keep practicing to master pronouns! 💪"
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
            <p className="text-gray-600 text-sm mb-5">Explore more materials to master pronouns</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { title: 'Pronoun Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/pronouns.htm', color: 'blue' },
                { title: 'Pronoun Games', icon: '🎮', url: 'https://www.eslgamesplus.com/pronouns/', color: 'green' },
                { title: 'Worksheets', icon: '📄', url: 'https://www.perfect-english-grammar.com/pronouns-exercises.html', color: 'purple' },
                { title: 'Video Tutorials', icon: '📺', url: 'https://www.youtube.com/results?search_query=english+pronouns', color: 'red' },
                { title: 'Practice Quizzes', icon: '✅', url: 'https://www.grammarbook.com/grammar_quiz/pronouns_1.asp', color: 'yellow' },
                { title: 'Reference Guide', icon: '📚', url: 'https://www.grammarly.com/blog/pronouns/', color: 'indigo' }
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready for More?</h3>
          <p className="text-sm mb-4 text-green-100">
            Continue your grammar journey!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/modules/grammar-hub')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
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

export default PronounsDetail;
