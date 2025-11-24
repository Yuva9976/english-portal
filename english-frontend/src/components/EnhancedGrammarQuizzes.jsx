import React, { useState, useEffect } from 'react';

const EnhancedGrammarQuizzes = ({ onClose }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [badges, setBadges] = useState([]);

  const quizzes = {
    beginner: [
      { question: 'Choose the correct article: ___ apple is red.', options: ['A', 'An', 'The', 'No article'], correct: 1, explanation: '"An" is used before words starting with a vowel sound.' },
      { question: 'What is the plural of "child"?', options: ['childs', 'children', 'childes', 'child'], correct: 1, explanation: '"Children" is the irregular plural form of "child".' },
      { question: 'Which word is a verb?', options: ['happy', 'run', 'quickly', 'dog'], correct: 1, explanation: '"Run" is an action word (verb).' },
      { question: 'He ___ to school every day.', options: ['go', 'goes', 'going', 'gone'], correct: 1, explanation: 'Use "goes" with third person singular (he/she/it).' },
      { question: 'Which sentence is correct?', options: ['She dont like pizza', 'She doesnt like pizza', 'She doesn\'t like pizza', 'She not like pizza'], correct: 2, explanation: 'The contraction "doesn\'t" needs an apostrophe.' }
    ],
    intermediate: [
      { question: 'If I ___ rich, I would travel the world.', options: ['am', 'was', 'were', 'be'], correct: 2, explanation: 'Use "were" in second conditional for all subjects.' },
      { question: 'She has been working here ___ 2020.', options: ['since', 'for', 'from', 'until'], correct: 0, explanation: 'Use "since" with a specific point in time.' },
      { question: 'The book ___ by millions of people.', options: ['was read', 'read', 'reads', 'reading'], correct: 0, explanation: 'Passive voice: was/were + past participle.' },
      { question: 'Neither John nor Mary ___ coming to the party.', options: ['is', 'are', 'were', 'be'], correct: 0, explanation: 'With "neither...nor", verb agrees with the closer subject (Mary = singular).' },
      { question: 'I wish I ___ harder for the exam.', options: ['study', 'studied', 'had studied', 'have studied'], correct: 2, explanation: 'Use "had + past participle" to express regret about the past.' }
    ],
    advanced: [
      { question: 'Had I known earlier, I ___ differently.', options: ['would act', 'would have acted', 'will act', 'acted'], correct: 1, explanation: 'Third conditional with inversion: Had + subject + past participle, subject + would have + past participle.' },
      { question: 'The committee ___ its decision tomorrow.', options: ['announce', 'announces', 'will announce', 'are announcing'], correct: 2, explanation: 'Collective nouns like "committee" take singular verbs in American English.' },
      { question: 'Scarcely ___ the door when it started raining.', options: ['I had opened', 'had I opened', 'I opened', 'did I open'], correct: 1, explanation: 'Negative adverbs (scarcely, hardly, rarely) require inversion.' },
      { question: 'The proposal, ___ by the board, was rejected.', options: ['reviewing', 'reviewed', 'having reviewed', 'to review'], correct: 1, explanation: 'Past participle "reviewed" acts as a reduced relative clause (which was reviewed).' },
      { question: 'Not only ___ late, but he also forgot the documents.', options: ['he was', 'was he', 'he is', 'is he'], correct: 1, explanation: '"Not only" requires subject-verb inversion.' }
    ]
  };

  const difficultyInfo = {
    beginner: { icon: '🌱', color: 'green', title: 'Beginner', description: 'Basic grammar fundamentals', questions: 5, time: '3 min' },
    intermediate: { icon: '🚀', color: 'blue', title: 'Intermediate', description: 'Complex structures & tenses', questions: 5, time: '3 min' },
    advanced: { icon: '🏆', color: 'purple', title: 'Advanced', description: 'Advanced grammar mastery', questions: 5, time: '3 min' }
  };

  const getCurrentQuestions = () => {
    return quizzes[selectedDifficulty] || [];
  };

  useEffect(() => {
    if (quizStarted && !quizComplete && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !quizComplete) {
      handleQuizComplete();
    }
  }, [quizStarted, quizComplete, timeLeft]);

  const handleStartQuiz = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(180);
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;
    
    const questions = getCurrentQuestions();
    const correct = answerIndex === questions[currentQuestion].correct;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      const points = selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20;
      setScore(score + points);
    }
  };

  const handleNextQuestion = () => {
    const questions = getCurrentQuestions();
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizComplete(true);
    
    // Award badges
    const newBadges = [];
    const percentage = (score / (getCurrentQuestions().length * (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20))) * 100;
    
    if (percentage >= 80) newBadges.push({ icon: '🏅', name: 'Excellence', color: 'yellow' });
    if (percentage === 100) newBadges.push({ icon: '💯', name: 'Perfect Score', color: 'purple' });
    if (timeLeft > 120) newBadges.push({ icon: '⚡', name: 'Speed Demon', color: 'blue' });
    if (selectedDifficulty === 'advanced' && percentage >= 60) newBadges.push({ icon: '🎓', name: 'Grammar Master', color: 'indigo' });
    
    setBadges(newBadges);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetQuiz = () => {
    setSelectedDifficulty(null);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizComplete(false);
    setTimeLeft(180);
    setBadges([]);
  };

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-white to-rose-50 z-50 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white p-3 shadow-xl">
            <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 z-20">
              <span className="text-lg font-bold">✕</span>
            </button>
            <div className="text-center mb-2">
              <span className="text-3xl block mb-1">✍️</span>
              <h2 className="text-2xl font-bold">Grammar Quizzes</h2>
              <p className="text-white/90 text-sm mt-1">Test your grammar knowledge & earn badges</p>
            </div>
          </div>

          {/* Main Content - No Scroll */}
          <div className="flex-1 overflow-hidden px-6 py-4 flex flex-col">
            <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-4 text-center">Choose Your Difficulty Level</h3>
            
            {/* Difficulty Cards - More Compact */}
            <div className="grid md:grid-cols-3 gap-4 mb-4 flex-shrink-0">
              {Object.entries(difficultyInfo).map(([key, info]) => (
                <div
                  key={key}
                  className="bg-white border-2 border-teal-300 rounded-lg p-4 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:border-rose-400 group"
                  onClick={() => handleStartQuiz(key)}
                >
                  <div className="text-center">
                    <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-5xl block">{info.icon}</span>
                    </div>
                    <h4 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent mb-1">{info.title}</h4>
                    <p className="text-gray-600 text-xs mb-3">{info.description}</p>
                    <div className="space-y-1.5 text-xs text-gray-700 mb-3">
                      <div className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-teal-50 to-rose-50 py-1.5 rounded">
                        <span>📝</span>
                        <span className="font-semibold">{info.questions} Questions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-teal-50 to-rose-50 py-1.5 rounded">
                        <span>⏱️</span>
                        <span className="font-semibold">{info.time} Time Limit</span>
                      </div>
                      <div className="flex items-center justify-center space-x-1.5 bg-gradient-to-r from-teal-50 to-rose-50 py-1.5 rounded">
                        <span>⭐</span>
                        <span className="font-semibold">{key === 'beginner' ? '10' : key === 'intermediate' ? '15' : '20'} pts/question</span>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-sm">
                      Start Quiz →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Info Section - Compact Side by Side */}
            <div className="grid md:grid-cols-2 gap-4 flex-shrink-0">
              {/* Motivational Section */}
              <div className="bg-gradient-to-br from-teal-100 to-purple-100 rounded-lg p-3 border-2 border-teal-300 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <h4 className="font-bold text-sm bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">Why Practice Grammar?</h4>
                </div>
                <p className="text-xs text-gray-700 italic mb-2">"Grammar is the foundation of clear communication. Master it, and unlock the power to express yourself with confidence."</p>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Writing Skills</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Confidence</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Communication</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Excellence</span>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="bg-gradient-to-br from-rose-100 to-purple-100 rounded-lg p-3 border-2 border-rose-300 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📊</span>
                  <h4 className="font-bold text-sm bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent">Quiz Features</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  <li className="flex items-center space-x-2 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Instant feedback on answers</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Detailed explanations</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Timed challenges</span>
                  </li>
                  <li className="flex items-center space-x-2 bg-white/70 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Achievement badges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const questions = getCurrentQuestions();
    const maxScore = questions.length * (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20);
    const percentage = ((score / maxScore) * 100).toFixed(0);
    const timeUsed = 180 - timeLeft;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-white to-rose-50 z-50 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white p-6 text-center shadow-xl">
            <span className="text-5xl block mb-3 animate-bounce">🎉</span>
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-white/90 text-sm">Great job completing the {difficultyInfo[selectedDifficulty].title} quiz!</p>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-center max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-teal-100 via-purple-50 to-rose-100 rounded-xl p-5 mb-5 border-2 border-teal-300 shadow-xl">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent mb-2">{percentage}%</div>
                <div className="text-base text-gray-700 font-semibold">Your Score: <span className="text-teal-600">{score}</span> / <span className="text-rose-600">{maxScore}</span></div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/70 rounded-lg p-3 border-2 border-green-300">
                  <div className="text-2xl font-bold text-green-600">{score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20)}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Correct ✅</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border-2 border-red-300">
                  <div className="text-2xl font-bold text-red-600">{questions.length - (score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20))}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Incorrect ❌</div>
                </div>
                <div className="bg-white/70 rounded-lg p-3 border-2 border-blue-300">
                  <div className="text-2xl font-bold text-blue-600">{formatTime(timeUsed)}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Time Used ⏱️</div>
                </div>
              </div>
            </div>

            {badges.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-base bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent mb-3 text-center flex items-center justify-center gap-2">
                  <span>🏆</span> Badges Earned
                </h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-lg p-3 text-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl block mb-1">{badge.icon}</span>
                      <span className="text-xs font-bold text-gray-800">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button onClick={resetQuiz} className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2">
                <span>🔄</span> Try Another Quiz
              </button>
              <button onClick={onClose} className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-bold text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const questions = getCurrentQuestions();
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-teal-50 via-white to-rose-50 z-50 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white p-4 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <span className="text-xl">{difficultyInfo[selectedDifficulty].icon}</span>
              <span className="font-bold text-sm">{difficultyInfo[selectedDifficulty].title}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-base">⏱️</span>
                <span className="font-bold text-sm">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-base">⭐</span>
                <span className="font-bold text-sm">{score}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 shadow-inner">
              <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 h-2 rounded-full transition-all duration-500 shadow-lg" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-hidden flex flex-col max-w-4xl mx-auto w-full">
          <div className="bg-gradient-to-r from-teal-100/80 to-rose-100/80 rounded-xl p-4 mb-4 border-2 border-teal-300 shadow-lg">
            <div className="flex items-start gap-2">
              <span className="text-xl flex-shrink-0">💭</span>
              <h3 className="text-base font-bold text-gray-800 leading-snug">{currentQ.question}</h3>
            </div>
          </div>

          <div className="space-y-3 mb-4 flex-1 overflow-y-auto">
            {currentQ.options.map((option, index) => {
              const isSelectedAnswer = selectedAnswer === index;
              const isCorrectAnswer = showFeedback && index === currentQ.correct;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-300 shadow-md hover:shadow-lg ${
                    isCorrectAnswer
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 ring-2 ring-green-300'
                      : isSelectedAnswer && !isCorrect
                      ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 ring-2 ring-red-300'
                      : isSelectedAnswer
                      ? 'border-teal-400 bg-gradient-to-r from-teal-50 to-rose-50 ring-2 ring-teal-300 transform scale-105'
                      : 'border-gray-300 bg-white hover:border-teal-400 hover:bg-gradient-to-r hover:from-teal-50 hover:to-rose-50 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 font-bold text-white text-sm shadow-md ${
                        isCorrectAnswer
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : isSelectedAnswer && !isCorrect
                          ? 'bg-gradient-to-r from-red-500 to-red-600'
                          : 'bg-gradient-to-r from-teal-500 to-rose-500'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-semibold text-sm text-gray-800">{option}</span>
                    </div>
                    {showFeedback && isCorrectAnswer && <span className="text-xl flex-shrink-0">✅</span>}
                    {showFeedback && isSelectedAnswer && !isCorrect && <span className="text-xl flex-shrink-0">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`rounded-xl p-3 mb-3 shadow-lg border-2 ${isCorrect ? 'bg-gradient-to-r from-green-50 via-teal-50 to-green-50 border-green-400' : 'bg-gradient-to-r from-rose-50 via-orange-50 to-rose-50 border-rose-400'}`}>
              <div className="flex items-start gap-2">
                <span className="text-2xl flex-shrink-0">{isCorrect ? '🎉' : '💡'}</span>
                <div>
                  <p className="font-bold text-sm text-gray-800 mb-1">
                    {isCorrect ? '🌟 Excellent!' : '🤔 Not quite right'}
                  </p>
                  <p className="text-xs text-gray-700 leading-snug">{currentQ.explanation}</p>
                  {isCorrect && (
                    <div className="mt-1 text-xs font-bold text-teal-600">+{selectedDifficulty === 'beginner' ? '10' : selectedDifficulty === 'intermediate' ? '15' : '20'} points! 🎯</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {showFeedback && (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2"
            >
              {currentQuestion + 1 < questions.length ? (
                <><span>Next Question</span> <span className="text-lg">→</span></>
              ) : (
                <><span>View Results</span> <span className="text-lg">🏁</span></>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGrammarQuizzes;
