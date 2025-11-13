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
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="w-full h-full relative">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 sticky top-0 z-10">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
              <span className="text-2xl">✕</span>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-4xl">✍️</span>
              <div>
                <h2 className="text-3xl font-bold">Grammar Quizzes</h2>
                <p className="text-purple-100 text-sm">Test your grammar knowledge</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Difficulty Level</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(difficultyInfo).map(([key, info]) => (
                <div
                  key={key}
                  className={`border-2 border-${info.color}-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}
                  onClick={() => handleStartQuiz(key)}
                >
                  <div className="text-center">
                    <span className="text-6xl block mb-4">{info.icon}</span>
                    <h4 className={`text-xl font-bold text-${info.color}-600 mb-2`}>{info.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center justify-center space-x-2">
                        <span>📝</span>
                        <span>{info.questions} Questions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>⏱️</span>
                        <span>{info.time} Time Limit</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span>⭐</span>
                        <span>{key === 'beginner' ? '10' : key === 'intermediate' ? '15' : '20'} pts/question</span>
                      </div>
                    </div>
                    <button className={`mt-4 w-full bg-${info.color}-600 text-white py-2 rounded-lg hover:bg-${info.color}-700 transition-colors font-semibold`}>
                      Start Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <h4 className="font-bold text-lg text-gray-800 mb-3">📊 Features</h4>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Instant feedback on answers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Detailed explanations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Timed challenges</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Achievement badges</span>
                </li>
              </ul>
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
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="w-full h-full flex flex-col">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 text-center">
            <span className="text-7xl block mb-4 animate-bounce">🎉</span>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-green-100">Great job completing the {difficultyInfo[selectedDifficulty].title} quiz!</p>
          </div>

          <div className="p-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-800 mb-2">{percentage}%</div>
                <div className="text-gray-600">Your Score: {score} / {maxScore}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20)}</div>
                  <div className="text-xs text-gray-600">Correct</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{questions.length - (score / (selectedDifficulty === 'beginner' ? 10 : selectedDifficulty === 'intermediate' ? 15 : 20))}</div>
                  <div className="text-xs text-gray-600">Incorrect</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{formatTime(timeUsed)}</div>
                  <div className="text-xs text-gray-600">Time Used</div>
                </div>
              </div>
            </div>

            {badges.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-800 mb-3 text-center">🏆 Badges Earned</h3>
                <div className="flex justify-center space-x-4">
                  {badges.map((badge, index) => (
                    <div key={index} className={`bg-${badge.color}-100 border-2 border-${badge.color}-300 rounded-lg p-3 text-center`}>
                      <span className="text-3xl block">{badge.icon}</span>
                      <span className="text-xs font-semibold text-gray-700">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button onClick={resetQuiz} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Try Another Quiz
              </button>
              <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
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
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-full flex flex-col">
        <div className={`bg-gradient-to-r from-${difficultyInfo[selectedDifficulty].color}-600 to-${difficultyInfo[selectedDifficulty].color}-700 text-white p-6 sticky top-0 z-10`}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{difficultyInfo[selectedDifficulty].icon}</span>
              <span className="font-bold">{difficultyInfo[selectedDifficulty].title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span>⏱️</span>
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="p-8 flex-1 overflow-y-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h3>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : showFeedback && index === currentQ.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-semibold">{option}</span>
                  {showFeedback && index === currentQ.correct && <span className="ml-auto text-green-500">✓</span>}
                  {showFeedback && selectedAnswer === index && !isCorrect && <span className="ml-auto text-red-500">✗</span>}
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
              <p className="font-semibold text-gray-800 mb-2">
                {isCorrect ? '✅ Correct!' : '💡 Explanation:'}
              </p>
              <p className="text-gray-700">{currentQ.explanation}</p>
            </div>
          )}

          {showFeedback && (
            <button
              onClick={handleNextQuestion}
              className={`w-full bg-${difficultyInfo[selectedDifficulty].color}-600 text-white py-3 rounded-lg hover:bg-${difficultyInfo[selectedDifficulty].color}-700 transition-colors font-semibold`}
            >
              {currentQuestion + 1 < questions.length ? 'Next Question →' : 'View Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGrammarQuizzes;
