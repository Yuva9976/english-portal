import React, { useEffect, useState } from 'react';
import apiClient from '../../apiClient';

export default function QuizMCQ({ lessonId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    apiClient.get(`/module2/quizzes?lesson=${lessonId}`)
      .then((response) => setQuiz(response.data.quizzes?.[0] || null))
      .catch((err) => console.error('Failed to load quiz', err));
  }, [lessonId]);

  if (!quiz) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <div className="text-5xl mb-4">🎯</div>
        <p className="text-gray-600 text-lg">No quiz available for this lesson yet.</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon for practice exercises!</p>
      </div>
    );
  }

  const handleSelect = (qId, idx) => {
    if (!submitted) {
      setAnswers((s) => ({ ...s, [qId]: idx }));
    }
  };

  const [showExplanations, setShowExplanations] = useState(false);

  const checkAnswers = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct += 1;
    });
    setScore(correct);
    setSubmitted(true);
    setShowExplanations(false); // Hide explanations initially
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setShowExplanations(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const percentage = (score / quiz.questions.length) * 100;
    if (percentage === 100) return '🎉 Perfect! Excellent work!';
    if (percentage >= 80) return '✅ Great job! Well done!';
    if (percentage >= 60) return '👍 Good effort! Keep practicing!';
    return '📚 Keep learning! Try again!';
  };

  return (
    <div className="space-y-6">
      {/* Score Display */}
      {submitted && score !== null && (
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border-2 border-teal-300 shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Score</h3>
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score} / {quiz.questions.length}
            </div>
            <p className="text-xl text-gray-700 mb-4">{getScoreMessage()}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowExplanations(!showExplanations)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                {showExplanations ? 'Hide Answers 🙈' : 'Show Correct Answers 📖'}
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
              >
                Try Again 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {quiz.questions.map((q, index) => {
        const isCorrect = submitted && answers[q.id] === q.answer;
        const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.answer;
        
        return (
          <div
            key={q.id}
            className={`p-6 rounded-lg border-2 transition-all ${
              submitted
                ? isCorrect
                  ? 'bg-green-50 border-green-400'
                  : isWrong
                  ? 'bg-red-50 border-red-400'
                  : 'bg-gray-50 border-gray-300'
                : 'bg-white border-gray-200 hover:border-teal-300'
            }`}
          >
            {/* Question Header */}
            <div className="flex items-start mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{q.question}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 ml-11">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === i;
                const isCorrectOption = i === q.answer;
                
                return (
                  <label
                    key={i}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      submitted
                        ? isCorrectOption
                          ? 'bg-green-100 border-green-500'
                          : isSelected && !isCorrectOption
                          ? 'bg-red-100 border-red-500'
                          : 'bg-gray-50 border-gray-200'
                        : isSelected
                        ? 'bg-teal-50 border-teal-500'
                        : 'bg-white border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      onChange={() => handleSelect(q.id, i)}
                      checked={isSelected}
                      disabled={submitted}
                      className="w-5 h-5 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <span className={`ml-3 text-gray-800 ${isSelected ? 'font-semibold' : ''}`}>
                      {opt}
                    </span>
                    {submitted && isCorrectOption && (
                      <span className="ml-auto text-green-600 font-bold">✓ Correct</span>
                    )}
                    {submitted && isSelected && !isCorrectOption && (
                      <span className="ml-auto text-red-600 font-bold">✗ Wrong</span>
                    )}
                  </label>
                );
              })}
            </div>

            {/* Explanation - Only show when "Show Answers" is clicked */}
            {submitted && showExplanations && q.explanation && (
              <div className="mt-4 ml-11 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2 text-xl">💡</span>
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Explanation:</p>
                    <p className="text-blue-800">{q.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Submit Button */}
      {!submitted && (
        <div className="flex justify-center pt-4">
          <button
            onClick={checkAnswers}
            disabled={Object.keys(answers).length !== quiz.questions.length}
            className={`px-8 py-4 rounded-lg font-bold text-lg transition-all transform shadow-lg ${
              Object.keys(answers).length === quiz.questions.length
                ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:from-teal-700 hover:to-blue-700 hover:scale-105 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {Object.keys(answers).length === quiz.questions.length
              ? 'Check My Answers ✓'
              : `Answer All Questions (${Object.keys(answers).length}/${quiz.questions.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
