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

  // Lock body scroll while this modal is mounted to avoid double scrollbars
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

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
      <div className="fixed inset-0 z-50" data-component="EnhancedGrammarQuizzes">
        <div className="absolute inset-0" style={{ backgroundColor: '#fbfcff' }} />
        <div className="relative w-full h-full flex flex-col">
          {/* Premium White Sticky Header */}
          <div className="bg-white/90 backdrop-blur-md px-5 py-4 border-b sticky top-0 z-20" style={{backgroundColor: 'rgba(255,255,255,0.94)'}}>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:scale-105 transition-transform">
              <span className="text-lg font-bold">✕</span>
            </button>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Grammar Quizzes</h2>
              <p className="text-sm text-gray-600 mt-1">Test your grammar knowledge & earn badges</p>
            </div>
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-teal-300 via-purple-200 to-rose-300 opacity-90" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-6 text-center">Choose Your Difficulty Level</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
              {Object.entries(difficultyInfo).map(([key, info]) => (
                <div
                  key={key}
                  onClick={() => handleStartQuiz(key)}
                  className="bg-white/95 border border-gray-100 rounded-3xl p-6 pt-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="flex justify-center -mt-6 mb-3">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl shadow-xl ring-4 ring-white/80">
                      <span className="text-3xl">{info.icon}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-rose-500">{info.title}</h4>
                    <p className="text-sm text-gray-600 mt-2 mb-4">{info.description}</p>

                    <div className="flex flex-col gap-3 mb-4 px-2">
                      <div className="flex items-center justify-between bg-white/60 rounded-full py-2 px-3 text-xs text-gray-700 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2"><span>📝</span><span className="font-medium">{info.questions} Questions</span></div>
                        <div className="text-xs text-gray-500">Quick</div>
                      </div>

                      <div className="flex items-center justify-between bg-white/60 rounded-full py-2 px-3 text-xs text-gray-700 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2"><span>⏱️</span><span className="font-medium">{info.time} Time Limit</span></div>
                        <div className="text-xs text-gray-500">Timed</div>
                      </div>

                      <div className="flex items-center justify-between bg-white/60 rounded-full py-2 px-3 text-xs text-gray-700 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2"><span>⭐</span><span className="font-medium">{key === 'beginner' ? '10' : key === 'intermediate' ? '15' : '20'} pts/question</span></div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <button className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-3 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-sm">
                        Start Quiz →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💡</span>
                  <h4 className="font-bold text-sm">Why Practice Grammar?</h4>
                </div>
                <p className="text-xs text-gray-700 italic mb-2">"Grammar is the foundation of clear communication. Master it, and unlock the power to express yourself with confidence."</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-2 bg-white/60 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Writing Skills</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 px-2 py-1.5 rounded">
                    <span className="text-green-500 text-sm">✓</span>
                    <span className="font-semibold">Confidence</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📊</span>
                  <h4 className="font-bold text-sm">Quiz Features</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Instant feedback on answers</li>
                  <li>• Detailed explanations</li>
                  <li>• Timed challenges & badges</li>
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
      <div className="fixed inset-0 z-50" data-component="EnhancedGrammarQuizzes-results">
        <div className="absolute inset-0" style={{ backgroundColor: '#fbfcff' }} />
        <div className="relative w-full h-full flex flex-col">
          <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
            <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 shadow-sm transition">
              <span className="text-lg font-bold">✕</span>
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">Quiz Complete!</h2>
              <p className="text-xs text-gray-500 mt-1">Great job completing the {difficultyInfo[selectedDifficulty].title} quiz!</p>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <div className="bg-gray-50 rounded-lg p-5 mb-5 border border-gray-100">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-rose-600 bg-clip-text text-transparent mb-2">{percentage}%</div>
                <div className="text-base text-gray-700 font-semibold">Your Score: <span className="text-teal-600">{score}</span> / <span className="text-rose-600">{maxScore}</span></div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20)}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Correct ✅</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{questions.length - (score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20))}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Incorrect ❌</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{formatTime(timeUsed)}</div>
                  <div className="text-xs text-gray-700 font-semibold mt-1">Time Used ⏱️</div>
                </div>
              </div>
            </div>

            {badges.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold text-base mb-3 text-center flex items-center justify-center gap-2">
                  <span>🏆</span> Badges Earned
                </h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {badges.map((badge, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center shadow-sm">
                      <span className="text-3xl block mb-1">{badge.icon}</span>
                      <span className="text-xs font-bold text-gray-800">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 max-w-md mx-auto">
              <button onClick={resetQuiz} className="w-full bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-3 rounded-lg hover:shadow transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2">
                <span>🔄</span> Try Another Quiz
              </button>
              <button onClick={onClose} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-bold text-sm">
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
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ backgroundColor: '#fbfcff' }}>
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
