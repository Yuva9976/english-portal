import React, { useState } from 'react';

export default function SpeakingQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [recording, setRecording] = useState({});

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
    setRecording({});
  };

  const toggleRecording = (qId) => {
    // In production, this would use Web Speech API or MediaRecorder
    setRecording({ ...recording, [qId]: !recording[qId] });
    
    // Simulate recording feedback
    if (!recording[qId]) {
      setTimeout(() => {
        setRecording(prev => ({ ...prev, [qId]: false }));
      }, 3000);
    }
  };

  const score = submitted
    ? quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0)
    : 0;

  const percentage = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💬</span>
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">Speaking Practice</h3>
            <p className="text-sm text-purple-800">{quiz.instructions}</p>
          </div>
        </div>
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
                  : 'bg-white border-gray-300 hover:border-purple-400'
              }`}
            >
              {/* Question Header */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {idx + 1}. {q.question}
              </h3>

              {/* Prompt (if available) */}
              {q.prompt && (
                <div className="mb-4 p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                  <p className="text-sm text-purple-900 italic">{q.prompt}</p>
                </div>
              )}

              {/* Pronunciation Guide */}
              {q.pronunciation && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 font-semibold mb-1">📢 Pronunciation:</p>
                  <p className="text-lg font-mono text-blue-900">{q.pronunciation}</p>
                </div>
              )}

              {/* Practice Button (for speaking questions) */}
              {q.pronunciation && (
                <div className="mb-4">
                  <button
                    onClick={() => toggleRecording(q.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      recording[q.id]
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {recording[q.id] ? '🔴 Recording... (3s)' : '🎤 Practice Speaking'}
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 In production, you can record your voice and get pronunciation feedback
                  </p>
                </div>
              )}

              {/* Tips */}
              {q.tips && !submitted && (
                <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-900">
                    <strong>💡 Tip:</strong> {q.tips}
                  </p>
                </div>
              )}

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
                          ? 'bg-purple-100 border-purple-500'
                          : 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
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
                  {q.tips && (
                    <p className="text-sm text-blue-800 mt-2">
                      <strong>💡 Speaking Tip:</strong> {q.tips}
                    </p>
                  )}
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
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Your Score</h3>
            <p className="text-4xl font-extrabold">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-lg mt-1">
              {percentage}% - {percentage >= 80 ? 'Excellent pronunciation! 🎉' : percentage >= 60 ? 'Good speaking! 👍' : 'Keep practicing! 💪'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              {showAnswers ? 'Hide' : 'Show'} Tips & Explanations
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
