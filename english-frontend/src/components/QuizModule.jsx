import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function QuizModule() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'What is the past tense of "go"?',
      options: ['goed', 'went', 'gone', 'going'],
      correct: 1,
    },
    {
      id: 2,
      question: 'Which sentence is correct?',
      options: [
        'She go to school.',
        'She goes to school.',
        'She going to school.',
        'She gone to school.',
      ],
      correct: 1,
    },
    {
      id: 3,
      question: 'Choose the correct spelling:',
      options: ['occured', 'occured', 'occurred', 'occurerd'],
      correct: 2,
    },
  ])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  function handleAnswer(questionId, optionIndex) {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: optionIndex })
    }
  }

  function handleSubmit() {
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    const finalScore = Math.round((correctCount / questions.length) * 100)
    setScore(finalScore)
    setSubmitted(true)

    // Optional: Send to backend
    // apiClient.post(`/quizzes/${quizId}/attempt`, { answers, score: finalScore })
  }

  function handleReset() {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Grammar Quiz</h1>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="border-l-4 border-teal-600 pl-4 py-3 bg-slate-50 rounded">
              <div className="font-semibold text-slate-800 mb-3">
                {idx + 1}. {q.question}
              </div>
              <div className="space-y-2">
                {q.options.map((option, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-slate-100">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === optIdx}
                      onChange={() => handleAnswer(q.id, optIdx)}
                      className="w-4 h-4 accent-teal-600"
                    />
                    <span className="text-slate-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-teal-50 border-2 border-teal-600 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-blue-700 mb-2">{score}%</div>
            <div className="text-xl text-slate-800 mb-4">
              {score >= 80 ? '🎉 Excellent!' : score >= 60 ? '👍 Good job!' : '📚 Keep practicing!'}
            </div>
            <div className="text-slate-600">
              You answered {Math.round((score / 100) * questions.length)} out of {questions.length} questions correctly.
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correct
              return (
                <div key={q.id} className={`border-l-4 pl-4 py-3 rounded ${isCorrect ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}>
                  <div className="font-semibold mb-2">
                    {idx + 1}. {q.question}
                    {isCorrect ? ' ✅' : ' ❌'}
                  </div>
                  <div className="text-sm text-slate-700">
                    Your answer: <span className="font-semibold">{q.options[answers[q.id]]}</span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-green-700 mt-1">
                      Correct answer: <span className="font-semibold">{q.options[q.correct]}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  )
}
