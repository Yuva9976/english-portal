import React, { useState, useRef } from 'react';

export default function AudioQuiz({ quiz }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

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
    setCurrentAudio(null);
  };

  const playAudio = (audioText, questionId) => {
    // In production, this would play actual audio from audioUrl
    // For now, we'll display the audio text as a substitute
    setCurrentAudio({ text: audioText, questionId });
    
    // Simulate audio playback UI feedback
    if (audioRef.current) {
      audioRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const score = submitted
    ? quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0)
    : 0;

  const percentage = submitted ? Math.round((score / quiz.questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <span className="text-2xl mr-3">🎧</span>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Listening Exercise</h3>
            <p className="text-sm text-blue-800">{quiz.instructions}</p>
          </div>
        </div>
      </div>

      {/* Audio Player Info */}
      {currentAudio && (
        <div ref={audioRef} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">▶</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-900">Now Playing</p>
              <p className="text-xs text-purple-700">Question {currentAudio.questionId}</p>
            </div>
          </div>
          <div className="bg-white rounded p-3 text-sm text-gray-700 italic">
            <strong className="text-purple-700">Audio transcript:</strong> {currentAudio.text}
          </div>
          <p className="text-xs text-purple-600 mt-2">💡 In production, actual audio would play here</p>
        </div>
      )}

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
                  : 'bg-white border-gray-300 hover:border-teal-400'
              }`}
            >
              {/* Question Header with Audio Button */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                  {idx + 1}. {q.question}
                </h3>
                {q.audioUrl && (
                  <button
                    onClick={() => playAudio(q.audioText, q.id)}
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-semibold"
                    title="Play audio"
                  >
                    <span className="text-lg">🔊</span>
                    Play
                  </button>
                )}
              </div>

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
                          ? 'bg-teal-100 border-teal-500'
                          : 'bg-white border-gray-300 hover:border-teal-400 hover:bg-teal-50'
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
              ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Your Score</h3>
            <p className="text-4xl font-extrabold">
              {score} / {quiz.questions.length}
            </p>
            <p className="text-lg mt-1">
              {percentage}% - {percentage >= 80 ? 'Excellent! 🎉' : percentage >= 60 ? 'Good job! 👍' : 'Keep practicing! 💪'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
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
