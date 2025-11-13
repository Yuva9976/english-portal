import React, { useState } from 'react';

export default function ReadingQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [showPassage, setShowPassage] = useState(true);

  const handleAnswer = (qId, optionIdx) => {
    if (!submitted) {
      setAnswers({ ...answers, [qId]: optionIdx });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowAnswers(false);
    setShowPassage(true);
  };

  const score = submitted
    ? quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0)
    : 0;

  const percentage = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-2xl mr-3">📖</span>
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Reading Comprehension</h3>
            <p className="text-sm text-green-800">{quiz.instructions}</p>
          </div>
        </div>
      </div>

      {/* Reading Passage */}
      {quiz.passage && (
        <div className="bg-white border-2 border-green-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowPassage(!showPassage)}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 flex items-center justify-between hover:from-green-700 hover:to-teal-700 transition"
          >
            <span className="font-semibold text-lg">📄 Reading Passage</span>
            <span className="text-xl">{showPassage ? '▼' : '▶'}</span>
          </button>
          
          {showPassage && (
            <div className="p-6 prose prose-lg max-w-none">
              {quiz.passage.split('\n\n').map((para, idx) => (
                <p key={idx} className="mb-4 text-gray-800 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Comprehension Questions</h3>
          {!showPassage && (
            <button
              onClick={() => setShowPassage(true)}
              className="text-sm text-green-700 hover:text-green-800 font-semibold underline"
            >
              Show passage ▲
            </button>
          )}
        </div>

        {quiz.questions.map((q, idx) => {
          const isCorrect = submitted && answers[q.id] === q.answer;
          const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.answer;

          return (
            <div
              key={q.id}
              className={`border rounded-lg p-5 transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-green-50 border-green-300'
                    : isWrong
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-300'
                  : 'bg-white border-gray-300 hover:border-green-400'
              }`}
            >
              {/* Question Header */}
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {idx + 1}. {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((option, optionIdx) => {
                  const isSelected = answers[q.id] === optionIdx;
                  const isCorrectOption = optionIdx === q.answer;

                  return (
                    <button
                      key={optionIdx}
                      onClick={() => handleAnswer(q.id, optionIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        submitted
                          ? isCorrectOption
                            ? 'bg-green-100 border-green-500 font-semibold'
                            : isSelected
                            ? 'bg-red-100 border-red-500'
                            : 'bg-gray-50 border-gray-300'
                          : isSelected
                          ? 'bg-green-100 border-green-500'
                          : 'bg-white border-gray-300 hover:border-green-400 hover:bg-green-50'
                      } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700 mr-3">
                          {String.fromCharCode(65 + optionIdx)}.
                        </span>
                        <span className={submitted && isCorrectOption ? 'font-semibold' : ''}>
                          {option}
                        </span>
                        {submitted && isCorrectOption && (
                          <span className="ml-auto text-green-600 font-bold">✓</span>
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <span className="ml-auto text-red-600 font-bold">✗</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && showAnswers && (
                <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit/Results Section */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== quiz.questions.length}
          className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
            Object.keys(answers).length === quiz.questions.length
              ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Your Score</h3>
            <p className="text-4xl font-extrabold">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-lg mt-1">
              {percentage}% - {percentage >= 80 ? 'Excellent comprehension! 🎉' : percentage >= 60 ? 'Good reading! 👍' : 'Keep practicing! 💪'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              {showAnswers ? 'Hide' : 'Show'} Answers & Explanations
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
