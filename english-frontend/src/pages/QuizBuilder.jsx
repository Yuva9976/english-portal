import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'

export default function QuizBuilder() {
  const navigate = useNavigate()
  const { lessonId, quizId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    passingScore: 70
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          type: 'multiple-choice',
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }))
  }

  const updateQuestion = (index, field, value) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions]
      if (field === 'options') {
        newQuestions[index].options = value
      } else {
        newQuestions[index][field] = value
      }
      return { ...prev, questions: newQuestions }
    })
  }

  const deleteQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || formData.questions.length === 0) {
      setError('Title and at least one question required')
      return
    }

    setLoading(true)
    try {
      if (quizId) {
        await apiClient.put(`/content-provider/quizzes/${quizId}`, formData)
      } else {
        await apiClient.post(`/content-provider/quizzes/${lessonId}`, formData)
      }

      navigate(-1)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className='mb-8 text-slate-400 hover:text-white transition flex items-center gap-2'
        >
          ← Back
        </button>

        <div className='bg-slate-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold mb-8'>📋 Quiz Builder</h1>

          {error && (
            <div className='mb-6 p-4 bg-red-600 text-red-100 rounded-lg'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Quiz Title */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Quiz Title *</label>
              <input
                type='text'
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder='e.g., Present Perfect Test'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder='Quiz instructions and description...'
                rows='3'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Passing Score */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Passing Score (%)</label>
              <input
                type='number'
                value={formData.passingScore}
                onChange={(e) => setFormData(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                min='0'
                max='100'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Questions */}
            <div className='mt-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold'>Questions ({formData.questions.length})</h2>
                <button
                  type='button'
                  onClick={addQuestion}
                  className='px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition'
                >
                  + Add Question
                </button>
              </div>

              {formData.questions.length === 0 ? (
                <div className='text-center py-12 bg-slate-700 rounded-lg'>
                  <div className='text-4xl mb-3'>❓</div>
                  <p className='text-slate-400 mb-6'>No questions yet. Add your first question!</p>
                  <button
                    type='button'
                    onClick={addQuestion}
                    className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
                  >
                    Add Question
                  </button>
                </div>
              ) : (
                <div className='space-y-6'>
                  {formData.questions.map((question, qIndex) => (
                    <div key={question.id} className='bg-slate-700 p-6 rounded-lg'>
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='font-bold text-lg'>Question {qIndex + 1}</h3>
                        <button
                          type='button'
                          onClick={() => deleteQuestion(qIndex)}
                          className='px-3 py-1 bg-red-600 text-xs font-bold rounded hover:bg-red-700 transition'
                        >
                          Delete
                        </button>
                      </div>

                      {/* Question Text */}
                      <div className='mb-4'>
                        <input
                          type='text'
                          value={question.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          placeholder='Type your question here...'
                          className='w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
                        />
                      </div>

                      {/* Answer Options */}
                      <div className='space-y-3'>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className='flex items-center gap-3'>
                            <input
                              type='radio'
                              name={`correct-${qIndex}`}
                              checked={question.correctAnswer === oIndex}
                              onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                              className='w-4 h-4 cursor-pointer'
                            />
                            <input
                              type='text'
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options]
                                newOptions[oIndex] = e.target.value
                                updateQuestion(qIndex, 'options', newOptions)
                              }}
                              placeholder={`Option ${oIndex + 1}`}
                              className='flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
                            />
                            <span className='text-xs text-slate-400'>
                              {question.correctAnswer === oIndex ? '✓ Correct' : 'Wrong'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className='flex gap-4 pt-6 border-t border-slate-700'>
              <button
                type='button'
                onClick={() => navigate(-1)}
                className='flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading || formData.questions.length === 0}
                className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition disabled:opacity-50'
              >
                {loading ? 'Saving...' : 'Save Quiz'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
