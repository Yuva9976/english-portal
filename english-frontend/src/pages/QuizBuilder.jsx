import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'

const OPTION_LABELS = ['A', 'B', 'C', 'D']
const OPTION_BADGE_COLORS = [
  'bg-pink-500 text-white shadow-pink-500/30',
  'bg-teal-500 text-white shadow-teal-500/30',
  'bg-blue-500 text-white shadow-blue-500/30',
  'bg-purple-500 text-white shadow-purple-500/30',
]

export default function QuizBuilder() {
  const navigate = useNavigate()
  const { lessonId, quizId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    passingScore: 70
  })
  const [fetching, setFetching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  React.useEffect(() => {
    if (quizId) loadQuiz()
  }, [quizId])

  const loadQuiz = async () => {
    setFetching(true)
    try {
      const res = await apiClient.get(`/content-provider/quizzes/${lessonId}`)
      const quiz = res.data.quizzes.find(q => q.id === parseInt(quizId))
      if (quiz) {
        setFormData({
          title: quiz.title,
          description: quiz.description,
          passingScore: quiz.passing_score_percent || 70,
          questions: quiz.questions.map(q => ({
            id: q.id,
            question: q.text,
            type: q.type,
            hint: q.hint || '',
            explanation: q.explanation || '',
            options: q.answers.map(a => a.text),
            correctAnswer: q.answers.findIndex(a => a.isCorrect)
          }))
        })
      }
    } catch (err) {
      setError('Failed to load quiz')
    } finally {
      setFetching(false)
    }
  }

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: Date.now(),
          type: 'multiple-choice',
          question: '',
          hint: '',
          explanation: '',
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
      setError('Quiz title and at least one question are required.')
      return
    }
    for (let i = 0; i < formData.questions.length; i++) {
      const q = formData.questions[i]
      if (!q.question.trim()) { setError(`Question ${i + 1} text is required.`); return }
      const emptyOpts = q.options.filter(o => !o.trim())
      if (emptyOpts.length > 0) { setError(`All options in Question ${i + 1} must be filled.`); return }
    }

    setLoading(true)
    setError('')
    try {
      let res
      if (quizId) {
        res = await apiClient.put(`/content-provider/quizzes/${quizId}`, formData)
      } else {
        res = await apiClient.post(`/content-provider/quizzes/${lessonId}`, formData)
      }

      setSuccess(`Quiz ${quizId ? 'Updated' : 'Created'}! Returning to Logic Matrix...`);
      
      setTimeout(() => {
        const userRole = JSON.parse(localStorage.getItem('user'))?.role || 'provider'
        const isTutor = userRole === 'tutor' || userRole === 'teacher'
        const courseId = res.data?.courseId;
        if (isTutor && courseId) {
          navigate(`/tutor/classes/${courseId}/resources`)
        } else if (courseId) {
          navigate(`/content-provider/courses/${courseId}/lessons`)
        } else {
          // Fallback if courseId is somehow missing from response
          navigate(-1)
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save quiz')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-teal-600 font-bold text-sm uppercase tracking-widest">Loading Quiz...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {success && (
              <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-[#0D9488] text-white rounded-2xl shadow-2xl shadow-teal-500/40 font-black text-sm uppercase tracking-widest animate-bounce flex items-center gap-4 border-4 border-white">
                <span className="text-xl">✨</span>
                {success}
              </div>
            )}
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
            >←</button>
            <div>
              <h1 className="text-xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                {quizId ? 'Edit Quiz' : 'Create Quiz'}
              </h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Quiz Builder</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/content-provider/bulk-upload?lessonId=${lessonId}`)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 font-bold rounded-xl hover:bg-amber-100 border border-amber-200 transition text-sm"
          >
            <span>🚀</span> Bulk Upload
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 font-bold text-sm">
            <span className="text-xl">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Meta */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
            <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3 font-['Outfit']">
              <span className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center text-lg">📋</span>
              Quiz Details
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Quiz Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Present Perfect Mastery Test"
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 font-semibold focus:bg-white focus:border-teal-400 outline-none transition text-base"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief quiz instructions..."
                    rows={3}
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 font-semibold focus:bg-white focus:border-teal-400 outline-none transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Passing Score (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.passingScore}
                      onChange={e => setFormData(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
                      min={0} max={100}
                      className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 font-semibold focus:bg-white focus:border-teal-400 outline-none transition"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all"
                      style={{ width: `${formData.passingScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-800 font-['Outfit'] flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center text-lg">❓</span>
                Questions
                {formData.questions.length > 0 && (
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-black rounded-full border border-teal-200">
                    {formData.questions.length} added
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition shadow-lg shadow-teal-500/20 text-sm"
              >
                + Add Question
              </button>
            </div>

            {formData.questions.length === 0 ? (
              <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-16 text-center">
                <div className="text-6xl mb-4">❓</div>
                <p className="text-slate-500 font-bold mb-6">No questions yet. Add your first question!</p>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-8 py-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition"
                >
                  Add First Question
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.questions.map((question, qIndex) => (
                  <div key={question.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    {/* Question header */}
                    <div className="px-8 py-5 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 text-white flex items-center justify-center font-black text-sm shadow-md">
                          Q{qIndex + 1}
                        </span>
                        <span className="text-sm font-bold text-slate-600">Multiple Choice Question</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteQuestion(qIndex)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white text-rose-500 hover:bg-rose-50 border border-rose-200 rounded-xl font-bold text-xs transition"
                      >
                        🗑 Delete
                      </button>
                    </div>

                    <div className="p-8 space-y-6">
                      {/* Question text */}
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Question Text *</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={e => updateQuestion(qIndex, 'question', e.target.value)}
                          placeholder="Type your question here..."
                          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-800 font-semibold focus:bg-white focus:border-teal-400 outline-none transition"
                        />
                      </div>

                      {/* Options */}
                      <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Answer Options *</label>
                        <p className="text-xs text-slate-400 mb-4">Click the label to mark the correct answer</p>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className={`flex items-center gap-5 p-4 rounded-[1.5rem] border-2 transition-all duration-300 ${question.correctAnswer === oIndex ? 'border-teal-400 bg-teal-50/50 shadow-inner' : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'}`}>
                              <button
                                type="button"
                                onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                title="Mark as correct"
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 transition-all duration-300 ${question.correctAnswer === oIndex ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/40 scale-110' : `${OPTION_BADGE_COLORS[oIndex % OPTION_BADGE_COLORS.length]}`}`}
                              >
                                {question.correctAnswer === oIndex ? '✓' : OPTION_LABELS[oIndex]}
                              </button>
                              <input
                                type="text"
                                value={option}
                                onChange={e => {
                                  const newOptions = [...question.options]
                                  newOptions[oIndex] = e.target.value
                                  updateQuestion(qIndex, 'options', newOptions)
                                }}
                                placeholder={`Option ${OPTION_LABELS[oIndex]} (Enter choice content)`}
                                className="flex-1 bg-transparent border-none outline-none text-slate-800 font-bold placeholder:text-slate-300 text-lg"
                              />
                              {question.correctAnswer === oIndex && (
                                <span className="text-[10px] font-black text-teal-600 bg-teal-100 px-3 py-1.5 rounded-full uppercase tracking-widest border border-teal-200">System Correct ✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hint & Explanation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                            💡 Hint <span className="text-slate-300 normal-case font-normal">(optional)</span>
                          </label>
                          <input
                            type="text"
                            value={question.hint}
                            onChange={e => updateQuestion(qIndex, 'hint', e.target.value)}
                            placeholder="Give learners a clue..."
                            className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-100 rounded-2xl text-slate-700 font-medium focus:border-amber-300 outline-none transition text-sm placeholder:text-amber-200"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                            📖 Explanation <span className="text-slate-300 normal-case font-normal">(shown after answer)</span>
                          </label>
                          <input
                            type="text"
                            value={question.explanation}
                            onChange={e => updateQuestion(qIndex, 'explanation', e.target.value)}
                            placeholder="Explain the correct answer..."
                            className="w-full px-4 py-3 bg-teal-50 border-2 border-teal-100 rounded-2xl text-slate-700 font-medium focus:border-teal-300 outline-none transition text-sm placeholder:text-teal-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          {formData.questions.length > 0 && (
            <div className="flex gap-4 sticky bottom-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition text-sm uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.01] transition-all disabled:opacity-60 text-sm uppercase tracking-widest shadow-lg shadow-teal-500/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : quizId ? '💾 Update Quiz' : '🚀 Save Quiz'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
