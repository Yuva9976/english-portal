import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verbQuizzes, adjectiveQuizzes, adverbQuizzes, prepositionQuizzes, conjunctionQuizzes, determinerQuizzes, interjectionQuizzes } from '../../data/quizzes';

const GrammarQuizGame = ({ quizType = 'nouns' }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Import comprehensive quizzes
  const nounQuestions = [
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

  const pronounQuestions = [
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

  const verbQuestions = (verbQuizzes && verbQuizzes.comprehensive) ? verbQuizzes.comprehensive : [];
  const adjectiveQuestions = (adjectiveQuizzes && adjectiveQuizzes.comprehensive) ? adjectiveQuizzes.comprehensive : [];
  const adverbQuestions = (adverbQuizzes && adverbQuizzes.comprehensive) ? adverbQuizzes.comprehensive : [];
  const prepositionQuestions = (prepositionQuizzes && prepositionQuizzes.comprehensive) ? prepositionQuizzes.comprehensive : [];
  const conjunctionQuestions = (conjunctionQuizzes && conjunctionQuizzes.comprehensive) ? conjunctionQuizzes.comprehensive : [];
  const determinerQuestions = (determinerQuizzes && determinerQuizzes.comprehensive) ? determinerQuizzes.comprehensive : [];
  const interjectionQuestions = (interjectionQuizzes && interjectionQuizzes.comprehensive) ? interjectionQuizzes.comprehensive : [];

  const questions = quizType === 'nouns'
    ? nounQuestions
    : quizType === 'pronouns'
    ? pronounQuestions
    : quizType === 'verbs'
    ? verbQuestions
    : quizType === 'adjectives'
    ? adjectiveQuestions
    : quizType === 'adverbs'
    ? adverbQuestions
    : quizType === 'prepositions'
    ? prepositionQuestions
    : quizType === 'conjunctions'
    ? conjunctionQuestions
    : quizType === 'determiners'
    ? determinerQuestions
    : quizType === 'interjections'
    ? interjectionQuestions
    : nounQuestions;

  const quizTitle = quizType === 'nouns'
    ? 'Comprehensive Nouns Quiz'
    : quizType === 'pronouns'
    ? 'Comprehensive Pronouns Quiz'
    : quizType === 'verbs'
    ? 'Comprehensive Verbs Quiz'
    : quizType === 'adjectives'
    ? 'Comprehensive Adjectives Quiz'
    : quizType === 'adverbs'
    ? 'Comprehensive Adverbs Quiz'
    : quizType === 'prepositions'
    ? 'Comprehensive Prepositions Quiz'
    : quizType === 'conjunctions'
    ? 'Comprehensive Conjunctions Quiz'
    : quizType === 'determiners'
    ? 'Comprehensive Determiners Quiz'
    : quizType === 'interjections'
    ? 'Comprehensive Interjections Quiz'
    : 'Comprehensive Quiz';

  const handleAnswer = (answerIndex) => {
    const question = questions[currentQuestionIndex];
    const isCorrect = answerIndex === question.correct;
    
    setQuizAnswers(prev => ({
      ...prev,
      [question.id]: { selected: answerIndex, correct: isCorrect }
    }));

    if (isCorrect) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setQuizScore(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 pt-6">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-6 md:p-8 mx-auto mt-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {quizType === 'nouns' ? '🏛️' : '💬'} {quizTitle}
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              {quizType === 'nouns' 
                ? 'Test your knowledge of noun types, usage, and identification!' 
                : 'Test your knowledge of pronoun types, usage, and identification!'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-rose-50 rounded-lg p-4 mb-6 border-l-4 border-teal-500">
            <h2 className="font-bold text-gray-800 mb-2 text-base">📋 Quiz Information:</h2>
            <ul className="space-y-1.5 text-gray-700 text-sm">
              <li className="flex items-center"><span className="mr-2">✅</span> <strong>10 Questions</strong> - Multiple choice and fill-in-the-blank</li>
              <li className="flex items-center"><span className="mr-2">⏱️</span> <strong>~10-15 minutes</strong> - No time limit</li>
              <li className="flex items-center"><span className="mr-2">🎯</span> <strong>100 Points</strong> - 10 points per correct answer</li>
              <li className="flex items-center"><span className="mr-2">💡</span> <strong>Hints Available</strong> - Get help with each question</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-teal-600">10</div>
              <div className="text-xs text-teal-700 font-medium mt-0.5">Questions</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-yellow-600">100</div>
              <div className="text-xs text-yellow-700 font-medium mt-0.5">Points</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-600">8-9</div>
              <div className="text-xs text-blue-700 font-medium mt-0.5">Questions/Topic</div>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-rose-600">100%</div>
              <div className="text-xs text-rose-700 font-medium mt-0.5">Goal</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setQuizStarted(true)}
              className="flex-1 bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300"
            >
              Start Quiz 🚀
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (quizScore / 100) * 100;
    const grade = percentage === 100 ? 'A+ Perfect!' : percentage >= 80 ? 'A Excellent!' : percentage >= 60 ? 'B Good' : 'C Keep Practicing';

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">
              {percentage === 100 ? '🏆' : percentage >= 80 ? '🥇' : percentage >= 60 ? '🥈' : '📚'}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Quiz Complete!</h1>
            <p className="text-gray-600 text-sm">Great effort! Review your results below.</p>
          </div>

          <div className="bg-gradient-to-r from-teal-100 to-rose-100 rounded-lg p-6 text-center mb-6 border-2 border-teal-400">
            <div className="text-4xl font-bold text-gray-800 mb-1.5">{quizScore}/100</div>
            <div className="text-lg font-bold text-gray-700 mb-1">{grade}</div>
            <div className="text-sm text-gray-600">You answered {Object.values(quizAnswers).filter(a => a.correct).length} out of 10 correctly!</div>
          </div>

          <div className="space-y-2.5 mb-6">
            {questions.map((q, index) => (
              <div
                key={q.id}
                className={`p-4 rounded-lg border-l-4 ${
                  quizAnswers[q.id]?.correct
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {quizAnswers[q.id]?.correct ? (
                        <span className="text-green-600 font-bold">✅ Correct</span>
                      ) : (
                        <span className="text-red-600 font-bold">❌ Incorrect</span>
                      )}
                      <span className="text-sm text-gray-600">Q{index + 1}</span>
                    </div>
                    <p className="text-gray-800 font-medium text-sm">{q.question}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={restartQuiz}
              className="flex-1 bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const isAnswered = quizAnswers[question.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 pt-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-xs font-bold bg-gradient-to-r from-teal-500 to-rose-400 text-white px-2.5 py-0.5 rounded-full">
              {quizScore} pts
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-rose-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 md:p-6 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{question.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Fill-in-the-Blank'}
                </span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-gray-800">{question.question}</h2>
            </div>
          </div>

          {question.hint && !isAnswered && (
            <details className="mb-4 bg-teal-50 rounded-lg border border-teal-200">
              <summary className="cursor-pointer p-2.5 font-semibold text-teal-700 hover:bg-teal-100 transition text-sm">
                💡 Need a hint?
              </summary>
              <div className="px-2.5 pb-2.5 text-teal-700 text-xs">{question.hint}</div>
            </details>
          )}

          {/* Options */}
          <div className="space-y-2 mb-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !isAnswered && handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-2.5 md:p-3 rounded-lg border-2 text-left text-sm font-medium transition-all duration-200 ${
                  isAnswered
                    ? index === question.correct
                      ? 'bg-green-50 border-green-400 text-green-900'
                      : index === quizAnswers[question.id]?.selected
                      ? 'bg-red-50 border-red-400 text-red-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                    : 'bg-white border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold mr-2.5">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                  {isAnswered && index === question.correct && <span className="text-xl">✅</span>}
                  {isAnswered && index === quizAnswers[question.id]?.selected && index !== question.correct && <span className="text-xl">❌</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`p-3 rounded-lg border-l-4 mb-4 ${
              quizAnswers[question.id].correct
                ? 'bg-green-50 border-green-500'
                : 'bg-orange-50 border-orange-500'
            }`}>
              <p className="text-xs text-gray-800 mb-1.5">
                <span className="font-bold">{quizAnswers[question.id].correct ? '🎉 Correct!' : '📝 Not quite!'}</span>
              </p>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">{question.explanation}</p>
              {question.funFact && (
                <p className="text-xs italic text-gray-700">{question.funFact}</p>
              )}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
            >
              {currentQuestionIndex === questions.length - 1 ? 'View Results 🎯' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrammarQuizGame;
