import React, { useState, useEffect } from 'react';

// Sample grammar questions
const quizQuestions = [
  {
    id: 1,
    question: "Which word is a NOUN in this sentence? 'The happy dog ran quickly.'",
    options: ["happy", "dog", "ran", "quickly"],
    correctAnswer: "dog",
    explanation: "A noun is a person, place, thing, or idea. 'Dog' is a thing/animal!"
  },
  {
    id: 2,
    question: "Choose the correct verb form: 'She _____ to school every day.'",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: "goes",
    explanation: "With 'she/he/it', we add 's' to the verb in present tense!"
  },
  {
    id: 3,
    question: "Which is the ADJECTIVE? 'The beautiful flower blooms in spring.'",
    options: ["flower", "beautiful", "blooms", "spring"],
    correctAnswer: "beautiful",
    explanation: "An adjective describes a noun. 'Beautiful' describes the flower!"
  },
  {
    id: 4,
    question: "What type of word is 'quickly'? 'She runs quickly.'",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correctAnswer: "Adverb",
    explanation: "Adverbs describe HOW something is done. 'Quickly' tells us how she runs!"
  },
  {
    id: 5,
    question: "Choose the correct pronoun: '_____ is my best friend.'",
    options: ["Me", "I", "He", "Him"],
    correctAnswer: "He",
    explanation: "Use 'He' as a subject pronoun. 'Me' and 'Him' are object pronouns!"
  },
  {
    id: 6,
    question: "Which word connects the two ideas? 'I like tea ____ coffee.'",
    options: ["but", "and", "or", "because"],
    correctAnswer: "and",
    explanation: "'And' is a conjunction that adds two similar things together!"
  },
  {
    id: 7,
    question: "Identify the preposition: 'The cat is under the table.'",
    options: ["cat", "is", "under", "table"],
    correctAnswer: "under",
    explanation: "Prepositions show relationships between words. 'Under' shows location!"
  },
  {
    id: 8,
    question: "Which sentence is correct?",
    options: [
      "She don't like pizza",
      "She doesn't like pizza",
      "She doesn't likes pizza",
      "She don't likes pizza"
    ],
    correctAnswer: "She doesn't like pizza",
    explanation: "Use 'doesn't' (does not) with she/he/it, and the base form of the verb!"
  },
  {
    id: 9,
    question: "What is the past tense of 'go'?",
    options: ["goed", "went", "gone", "going"],
    correctAnswer: "went",
    explanation: "'Go' is an irregular verb. Its past tense is 'went', not 'goed'!"
  },
  {
    id: 10,
    question: "Which word shows strong emotion? 'Wow! That's amazing!'",
    options: ["Wow", "That's", "amazing", "!"],
    correctAnswer: "Wow",
    explanation: "'Wow' is an interjection - it expresses sudden emotion or feeling!"
  }
];

const GrammarQuiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (quizComplete || timeLeft === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setQuizComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizComplete, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (answer) => {
    if (showFeedback) return; // Prevent clicking during feedback
    
    setSelectedAnswer(answer);
    const correct = answer === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);
    setQuizComplete(false);
    setTimeLeft(300);
  };

  const getScoreMessage = () => {
    const percentage = (score / (quizQuestions.length * 10)) * 100;
    if (percentage === 100) return { text: "🏆 Perfect Score! You're a Grammar Master!", color: "text-yellow-600" };
    if (percentage >= 80) return { text: "🌟 Excellent! Keep up the great work!", color: "text-green-600" };
    if (percentage >= 60) return { text: "👍 Good job! You're on the right track!", color: "text-blue-600" };
    if (percentage >= 40) return { text: "📚 Nice try! Practice makes perfect!", color: "text-purple-600" };
    return { text: "💪 Keep learning! You'll get better!", color: "text-pink-600" };
  };

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (quizComplete) {
    const scoreMessage = getScoreMessage();
    const percentage = (score / (quizQuestions.length * 10)) * 100;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-scale-in">
          {/* Confetti Animation */}
          {percentage >= 80 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-20px`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '🌟', '✨', '🎊', '⭐'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-2xl">✕</span>
          </button>

          <div className="text-center">
            {/* Trophy/Badge */}
            <div className="text-8xl mb-4 animate-bounce-slow">
              {percentage === 100 ? '🏆' : percentage >= 80 ? '🌟' : percentage >= 60 ? '🎯' : percentage >= 40 ? '📚' : '💪'}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className={`text-2xl font-bold mb-6 ${scoreMessage.color}`}>{scoreMessage.text}</p>

            {/* Score Display */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">{score}</div>
              <div className="text-lg text-gray-700">out of {quizQuestions.length * 10} points</div>
              <div className="text-sm text-gray-600 mt-2">
                {Math.round(percentage)}% Correct • {Math.floor(score / 10)}/{quizQuestions.length} Questions
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-xl font-bold text-green-600">{Math.floor(score / 10)}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-2xl mb-1">❌</div>
                <div className="text-xl font-bold text-red-600">{quizQuestions.length - Math.floor(score / 10)}</div>
                <div className="text-xs text-gray-600">Wrong</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-xl font-bold text-blue-600">{formatTime(300 - timeLeft)}</div>
                <div className="text-xs text-gray-600">Time Taken</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handlePlayAgain}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔄 Play Again
              </button>
              <button
                onClick={() => {
                  const text = `I scored ${score}/${quizQuestions.length * 10} on the Grammar Quiz! 🎯`;
                  if (navigator.share) {
                    navigator.share({ title: 'Grammar Quiz Score', text });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('Score copied to clipboard!');
                  }
                }}
                className="bg-white border-2 border-purple-600 text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                📤 Share Score
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 relative ${shake ? 'animate-shake' : ''}`}>
        {/* Confetti for correct answers */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              >
                {['🎉', '⭐', '✨', '🌟'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <span className="text-2xl">✕</span>
        </button>

        {/* Header with Progress and Stats */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="text-xs opacity-90">Score</div>
                <div className="text-2xl font-bold">{score}</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="text-xs opacity-90">Time</div>
                <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Question</div>
              <div className="text-2xl font-bold">{currentQuestion + 1}/{quizQuestions.length}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-green-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="absolute -top-1 right-0 text-xs font-semibold bg-yellow-400 text-purple-900 px-2 py-1 rounded-full">
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          {/* Question */}
          <div className="mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <span className="text-3xl flex-shrink-0">❓</span>
              <h3 className="text-xl font-bold text-gray-800 leading-relaxed">{question.question}</h3>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;
              const showResult = showFeedback;

              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102";
              
              if (!showResult) {
                buttonClass += " border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:shadow-md";
              } else if (isSelected && isCorrect) {
                buttonClass += " border-green-500 bg-green-50 shadow-lg scale-102";
              } else if (isSelected && !isCorrect) {
                buttonClass += " border-red-500 bg-red-50";
              } else if (isCorrectOption && showFeedback) {
                buttonClass += " border-green-500 bg-green-50";
              } else {
                buttonClass += " border-gray-200 bg-gray-50 opacity-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-semibold text-gray-800">{option}</span>
                    </div>
                    {showResult && isSelected && (
                      <span className="text-2xl">
                        {isCorrect ? '✅' : '❌'}
                      </span>
                    )}
                    {showResult && !isSelected && isCorrectOption && (
                      <span className="text-2xl">✅</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {showFeedback && (
            <div className={`rounded-xl p-5 mb-6 animate-slide-up ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <div className="flex items-start space-x-3">
                <span className="text-3xl flex-shrink-0">
                  {isCorrect ? '🎉' : '💡'}
                </span>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? 'Correct! Well done! 🌟' : 'Not quite! 🤔'}
                  </h4>
                  
                  {!showExplanation && !isCorrect && (
                    <button
                      onClick={() => setShowExplanation(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold underline"
                    >
                      Show me the answer 👉
                    </button>
                  )}

                  {(showExplanation || isCorrect) && (
                    <div className="mt-2">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        <span className="font-semibold">Explanation:</span> {question.explanation}
                      </p>
                      {!isCorrect && (
                        <p className="text-gray-600 text-sm mt-2">
                          <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-102 flex items-center justify-center space-x-2"
            >
              <span>{currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
              <span className="text-xl">{currentQuestion < quizQuestions.length - 1 ? '→' : '🏁'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-shake {
          animation: shake 0.5s;
        }

        .animate-confetti {
          animation: confetti 3s linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default GrammarQuiz;
