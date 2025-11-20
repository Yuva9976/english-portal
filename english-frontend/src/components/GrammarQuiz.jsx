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
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-xl border border-gray-100 max-w-2xl w-11/12 sm:w-full max-h-[95vh] overflow-y-auto relative animate-scale-in p-6 sm:p-8 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent ${shake ? 'animate-shake' : ''}`}>

        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50" aria-label="Close quiz">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {quizComplete ? (
          // Completion screen
          <div className="text-center px-4 py-6">
            <div className="text-3xl mb-3">{getScoreMessage().text}</div>
            <div className="text-sm text-gray-600 mb-4">You scored <span className="font-semibold text-gray-800">{score}</span> out of <span className="font-semibold">{quizQuestions.length * 10}</span></div>

            {score / (quizQuestions.length * 10) >= 0.8 && (
              <div className="mb-4 text-5xl">🎉</div>
            )}

            <div className="flex gap-3 justify-center mt-4">
              <button onClick={handlePlayAgain} className="px-4 py-2 bg-teal-600 text-white rounded-md">Play Again</button>
              <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">Close</button>
            </div>
          </div>
        ) : (
          // Active quiz
          <div className="flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-700">Question {currentQuestion + 1}/{quizQuestions.length}</div>
              <div className="text-sm text-gray-600">Time: <span className="font-semibold text-gray-800">{formatTime(timeLeft)}</span></div>
            </div>

            {/* Progress */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
              <div className="bg-teal-500 h-2" style={{ width: `${progressPercentage}%` }} />
            </div>

            {/* Question & options */}
            <div className="px-1 py-2 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <h3 className="text-base font-semibold text-gray-800 mb-3">{quizQuestions[currentQuestion].question}</h3>

              <div className="space-y-2">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const base = 'w-full text-left px-4 py-3 rounded-md border transition-colors duration-150 flex items-center justify-between';
                  const cls = isSelected ? `${base} bg-teal-50 border-teal-200` : `${base} bg-white border-gray-200 hover:bg-gray-50`;

                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={cls}
                      disabled={showFeedback}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-semibold">{String.fromCharCode(65 + index)}</div>
                        <div className="text-sm text-gray-800">{option}</div>
                      </div>
                      {isSelected && showFeedback && (
                        <div className="text-sm text-gray-700">{isCorrect ? '✔' : '✖'}</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`rounded-xl p-4 mt-4 ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl flex-shrink-0">{isCorrect ? '🎉' : '💡'}</span>
                    <div className="flex-1">
                      <h4 className={`font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{isCorrect ? 'Correct!' : 'Not quite'}</h4>
                      <p className="text-sm text-gray-700">{quizQuestions[currentQuestion].explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-end">
              {showFeedback ? (
                <button onClick={handleNext} className="px-4 py-2 bg-teal-600 text-white rounded-md">{currentQuestion < quizQuestions.length - 1 ? 'Next' : 'Finish'}</button>
              ) : (
                <div className="text-sm text-gray-500">Select an answer to continue</div>
              )}
            </div>
          </div>
        )}

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
          @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0; } }
          @keyframes scale-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes slide-up { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

          .animate-shake { animation: shake 0.5s; }
          .animate-confetti { animation: confetti 3s linear forwards; }
          .animate-scale-in { animation: scale-in 0.3s ease-out; }
          .animate-slide-up { animation: slide-up 0.3s ease-out; }
          .animate-bounce-slow { animation: bounce-slow 2s infinite; }
          .hover\\:scale-102:hover { transform: scale(1.02); }
        `}</style>
      </div>
    </div>
  );
};

export default GrammarQuiz;
