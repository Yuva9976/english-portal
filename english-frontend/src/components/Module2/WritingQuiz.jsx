import React, { useState } from 'react';

export default function WritingQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

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
  };

  const score = submitted
    ? quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0)
    : 0;

  const percentage = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-2xl mr-3">✍️</span>
          <div>
            <h3 className="font-semibold text-orange-900 mb-1">Writing Skills Practice</h3>
            <p className="text-sm text-orange-800">{quiz.instructions}</p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">📝 What You'll Practice:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc pl-5">
          <li>Grammar and sentence structure</li>
          <li>Error identification and correction</li>
          <li>Punctuation and capitalization</li>
          <li>Sentence combining and parallel structure</li>
        </ul>
      </div>

      {/* Questions */}
      <div className="space-y-4">
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
                  : 'bg-white border-gray-300 hover:border-orange-400'
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
                          ? 'bg-orange-100 border-orange-500'
                          : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                      } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start">
                        <span className="font-semibold text-gray-700 mr-3 mt-0.5">
                          {String.fromCharCode(65 + optionIdx)}.
                        </span>
                        <span className={`flex-1 ${submitted && isCorrectOption ? 'font-semibold' : ''}`}>
                          {option}
                        </span>
                        {submitted && isCorrectOption && (
                          <span className="ml-3 text-green-600 font-bold text-xl">✓</span>
                        )}
                        {submitted && isSelected && !isCorrectOption && (
                          <span className="ml-3 text-red-600 font-bold text-xl">✗</span>
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
              ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Your Score</h3>
            <p className="text-4xl font-extrabold">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-lg mt-1">
              {percentage}% - {percentage >= 80 ? 'Excellent writing skills! 🎉' : percentage >= 60 ? 'Good work! 👍' : 'Keep practicing! 💪'}
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Writing Tips:</h4>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc pl-5">
              <li>Always proofread your writing before submitting</li>
              <li>Read your sentences aloud to catch errors</li>
              <li>Use a variety of sentence structures to keep writing interesting</li>
              <li>Practice writing every day, even just a paragraph</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex-1 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold"
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
