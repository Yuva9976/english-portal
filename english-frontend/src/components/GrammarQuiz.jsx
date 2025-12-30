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
    if (percentage >= 40) return { text: "📚 Nice try! Practice makes perfect!", color: "text-rose-600" };
    return { text: "💪 Keep learning! You'll get better!", color: "text-pink-600" };
  };

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-fade-in">
      <div className={`bg-white rounded-2xl shadow-2xl border-2 border-teal-400 max-w-2xl w-11/12 sm:w-full h-[92vh] overflow-hidden relative animate-scale-in ${shake ? 'animate-shake' : ''}`}>

        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-transparent rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-rose-400/30 to-transparent rounded-br-2xl pointer-events-none"></div>

        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-600 to-rose-400 shadow-lg flex items-center justify-center text-white hover:shadow-xl hover:scale-110 transition-all duration-300" aria-label="Close quiz">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {quizComplete ? (
          // Completion screen
          <div className="text-center px-4 py-6 h-full flex flex-col justify-center">
            <div className="mb-4">
              <div className="text-4xl mb-3 animate-pulse">{score / (quizQuestions.length * 10) >= 0.8 ? '🏆' : '🎯'}</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-2">{getScoreMessage().text}</h2>
            </div>
            
            <div className="bg-gradient-to-r from-teal-100/50 via-purple-100/50 to-rose-100/50 rounded-2xl p-5 mb-5 border-2 border-teal-200/50">
              <div className="text-base text-gray-700 mb-1">Your Score</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">{score}</div>
              <div className="text-sm text-gray-600 mt-1">out of <span className="font-semibold">{quizQuestions.length * 10}</span> points</div>
              <div className="mt-3 text-base font-semibold text-teal-700">{Math.round((score / (quizQuestions.length * 10)) * 100)}% Correct!</div>
            </div>

            <div className="flex gap-3 justify-center">
              <button 
                onClick={handlePlayAgain} 
                className="px-5 py-2.5 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                🔄 Play Again
              </button>
              <button 
                onClick={onClose} 
                className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // Active quiz
          <div className="flex flex-col h-full p-4 overflow-hidden">
            {/* Quiz Header with Gradient */}
            <div className="mb-3 text-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-1">Grammar Quiz Challenge</h2>
              <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-teal-400 to-rose-400 rounded-full"></div>
            </div>

            {/* Top bar */}
            <div className="flex items-center justify-between mb-3 bg-gradient-to-r from-teal-50 to-rose-50 rounded-xl p-3 border border-teal-200/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">Question {currentQuestion + 1}/{quizQuestions.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden shadow-inner border border-teal-200/30">
              <div className="bg-gradient-to-r from-teal-500 via-purple-400 to-rose-400 h-2 transition-all duration-500 ease-out shadow-lg" style={{ width: `${progressPercentage}%` }} />
            </div>

            {/* Question & options */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-teal-100/60 to-rose-100/60 rounded-xl p-3 mb-3 border-2 border-teal-300/50 shadow-md">
                <div className="flex items-start gap-2">
                  <span className="text-2xl flex-shrink-0">💭</span>
                  <h3 className="text-base font-bold text-gray-800 leading-snug">{quizQuestions[currentQuestion].question}</h3>
                </div>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = showFeedback && option === quizQuestions[currentQuestion].correctAnswer;
                  
                  let buttonClass = 'w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-lg';
                  
                  if (showFeedback && isCorrectAnswer) {
                    buttonClass += ' bg-gradient-to-r from-green-50 to-green-100 border-green-400 ring-2 ring-green-300';
                  } else if (showFeedback && isSelected && !isCorrect) {
                    buttonClass += ' bg-gradient-to-r from-red-50 to-red-100 border-red-400 ring-2 ring-red-300';
                  } else if (isSelected) {
                    buttonClass += ' bg-gradient-to-r from-teal-100 to-rose-100 border-teal-400 ring-2 ring-teal-300 transform scale-105';
                  } else {
                    buttonClass += ' bg-white border-gray-300 hover:border-teal-400 hover:bg-gradient-to-r hover:from-teal-50 hover:to-rose-50 hover:transform hover:scale-102';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={buttonClass}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all duration-300 ${
                          showFeedback && isCorrectAnswer 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : showFeedback && isSelected && !isCorrect
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            : 'bg-gradient-to-r from-teal-500 to-rose-500 text-white'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="text-sm font-medium text-gray-800">{option}</div>
                      </div>
                      {isSelected && showFeedback && (
                        <div className="text-xl flex-shrink-0 animate-bounce">
                          {isCorrect ? '✅' : '❌'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`rounded-xl p-3 mt-3 shadow-lg border-2 animate-slide-up ${
                  isCorrect 
                    ? 'bg-gradient-to-r from-green-50 via-teal-50 to-green-50 border-green-400' 
                    : 'bg-gradient-to-r from-rose-50 via-orange-50 to-rose-50 border-rose-400'
                }`}>
                  <div className="flex items-start space-x-2">
                    <span className="text-2xl flex-shrink-0">{isCorrect ? '🎉' : '💡'}</span>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-rose-700'}`}>
                        {isCorrect ? '🌟 Excellent!' : '🤔 Not quite right'}
                      </h4>
                      <p className="text-xs text-gray-700 leading-snug">{quizQuestions[currentQuestion].explanation}</p>
                      {isCorrect && (
                        <div className="mt-1 text-xs font-semibold text-teal-600">+10 points! 🎯</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center gap-2 bg-gradient-to-r from-teal-100 to-rose-100 px-3 py-1.5 rounded-lg border border-teal-300">
                <span className="text-base">🏆</span>
                <span className="text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">Score: {score}</span>
              </div>
              {showFeedback ? (
                <button 
                  onClick={handleNext} 
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-1 text-sm"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>Next <span>→</span></>
                  ) : (
                    <>Finish <span>🏁</span></>
                  )}
                </button>
              ) : (
                <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">Choose answer ☝️</div>
              )}
            </div>
          </div>
        )}

        {/* Custom Styles */}
        <style>{`
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
            0% { transform: scale(0.9); opacity: 0; } 
            100% { transform: scale(1); opacity: 1; } 
          }
          @keyframes slide-up { 
            0% { transform: translateY(30px); opacity: 0; } 
            100% { transform: translateY(0); opacity: 1; } 
          }
          @keyframes bounce-slow { 
            0%, 100% { transform: translateY(0); } 
            50% { transform: translateY(-10px); } 
          }
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(13, 148, 136, 0.3); }
            50% { box-shadow: 0 0 40px rgba(251, 113, 133, 0.5); }
          }

          .animate-shake { animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97); }
          .animate-confetti { animation: confetti 3s linear forwards; }
          .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
          .animate-fade-in { animation: fade-in 0.3s ease-out; }
          .hover\\:scale-102:hover { transform: scale(1.02); }
          
          /* Scrollbar styling */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #14b8a6, #fb7185); border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #0d9488, #f43f5e); }
        `}</style>
      </div>
    </div>
  );
};

export default GrammarQuiz;
