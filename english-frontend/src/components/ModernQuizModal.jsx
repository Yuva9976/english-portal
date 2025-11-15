/**
 * ModernQuizModal - Elegant Quiz Experience Component
 * 
 * Features:
 * - Clean card-style design with centered layout
 * - Slim progress bar at top
 * - Question counter and points display
 * - Modern answer option styling with hover effects
 * - Responsive design (mobile & desktop)
 * - Beautiful results screen with statistics
 */

export const ModernQuizModal = ({
  showQuizModal,
  currentQuestionIndex,
  quizQuestions,
  modalQuizAnswers,
  onClose,
  onAnswerSelect,
  onNavigate,
  onRestart,
}) => {
  if (!showQuizModal) return null;

  const isQuestionMode = currentQuestionIndex < quizQuestions.length;
  const question = isQuestionMode ? quizQuestions[currentQuestionIndex] : null;
  const answered = isQuestionMode ? modalQuizAnswers[question.id] : null;
  const correctCount = Object.values(modalQuizAnswers).filter(a => a.correct).length;
  const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
      {/* Main Quiz Container - Centered Card */}
      <div className="w-full max-w-xl">
        {isQuestionMode ? (
          // Question Screen
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="relative">
              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-100">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Header with Question Counter, Points, and Close Button */}
              <div className="px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-blue-600">{correctCount * 10}</div>
                    <div className="text-xs text-slate-500">points</div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                    title="Close quiz"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="space-y-6">
                {/* Question Header */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-snug">
                        {question.question}
                      </h3>
                    </div>
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

                {/* Answer Options */}
                <div className="space-y-2.5">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!answered) {
                          const isCorrect = index === question.correct;
                          onAnswerSelect(question.id, index, isCorrect);
                        }
                      }}
                      disabled={answered}
                      className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group cursor-pointer ${
                        answered
                          ? index === question.correct
                            ? 'bg-green-50 border-green-400 shadow-sm'
                            : answered.selected === index
                            ? 'bg-red-50 border-red-400 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                          : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50'
                      } ${answered ? 'cursor-default' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${
                          answered
                            ? index === question.correct
                              ? 'bg-green-200 text-green-700'
                              : answered.selected === index
                              ? 'bg-red-200 text-red-700'
                              : 'bg-slate-200 text-slate-600'
                            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-sm md:text-base text-slate-700 group-hover:text-slate-800">{option}</span>
                        {answered && index === question.correct && <span className="text-lg">✅</span>}
                        {answered && answered.selected === index && index !== question.correct && <span className="text-lg">❌</span>}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Feedback Message */}
                {answered && (
                  <div className={`p-4 rounded-lg border-l-4 space-y-1.5 ${
                    answered.correct
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

                {/* Navigation Buttons */}
                <div className="flex gap-2.5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('prev')}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => onNavigate('next')}
                    disabled={!answered || currentQuestionIndex === quizQuestions.length - 1}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Results Screen
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                  🎊 Quiz Complete!
                </h2>
                <p className="text-slate-600 text-sm md:text-base">Here's how you performed</p>
              </div>

              {Object.keys(modalQuizAnswers).length === quizQuestions.length && (
                <>
                  {/* Score Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 md:p-7 border-2 border-amber-200 space-y-2 text-center">
                    <p className="text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">Final Score</p>
                    <div className="text-5xl md:text-6xl font-bold text-amber-600">
                      {correctCount * 10}
                    </div>
                    <p className="text-base md:text-lg text-slate-700 font-medium">out of 100 points</p>
                  </div>

                  {/* Performance Message */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 text-center">
                    <p className="text-lg md:text-2xl font-bold text-slate-800 leading-relaxed">
                      {correctCount === quizQuestions.length
                        ? '🏆 Perfect! You\'re a quiz master!'
                        : correctCount >= 8
                        ? '🥇 Excellent work! Outstanding!'
                        : correctCount >= 6
                        ? '👏 Good job! Keep practicing!'
                        : '📚 Keep learning! Try again!'}
                    </p>
                  </div>

                  {/* Statistics Grid */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                        {correctCount}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-slate-600">Correct</p>
                    </div>
                    <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-200 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-red-600 mb-1">
                        {quizQuestions.length - correctCount}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-slate-600">Incorrect</p>
                    </div>
                    <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                        {Math.round((correctCount / quizQuestions.length) * 100)}%
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-slate-600">Accuracy</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={onRestart}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm md:text-base hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      🔄 Restart Quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernQuizModal;
