import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function Quiz(){
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try {
        const res = await apiClient.get(`/quiz/${lessonId}`)
        // Expect res.data.questions or array
        const qs = res.data.questions || res.data || []
        setQuestions(qs)
      } catch (err) {
        console.error(err)
        setError('Failed to load quiz')
      } finally {
        setLoading(false)
      }
    }
    load()
  },[lessonId])

  function select(qId, option){
    setAnswers(prev => ({...prev, [qId]: option}))
  }

  // Build payload in expected shape
  async function submit(){
    setSubmitting(true)
    setError('')
    try {
      const payload = { answers }
      const res = await apiClient.post(`/quiz/${lessonId}/submit`, payload)
      // Response expected to include details + score.
      setResult(res.data)
      // Optionally refresh dashboard if backend didn't return updatedProgress
      if (!res.data?.updatedProgress) {
        try {
          await apiClient.get('/dashboard') // we don't use result here; Dashboard page will fetch on mount
        } catch (_) { /* ignore */ }
      }
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || 'Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading...</div>

  // Show results if present
  if (result) {
    const details = result.details || []
    return (
      <div className='max-w-3xl mx-auto space-y-6'>
        <div className='bg-white p-6 rounded shadow'>
          <h2 className='text-2xl font-semibold'>Results</h2>
          <div className='mt-3 text-sm text-slate-600'>
            Score: <strong>{result.score}</strong> / <strong>{result.total}</strong>
            {' • '}
            {typeof result.percentage !== 'undefined' ? `${result.percentage}%` : ''}
          </div>
          {result.message && <div className='mt-2 text-sm text-sky-600'>{result.message}</div>}
        </div>

        <div className='space-y-4'>
          {questions.map(q => {
            const qId = q._id || q.id
            const det = details.find(d => String(d.questionId) === String(qId))
            const chosen = det?.chosenOption
            const correct = det?.correct
            const correctOption = det?.correctOption
            return (
              <div key={qId} className='bg-white p-4 rounded shadow'>
                <div className='flex items-start justify-between'>
                  <div className='font-semibold'>{q.question}</div>
                  <div className='text-sm'>
                    {correct ? (
                      <span className='px-2 py-1 rounded text-green-800 bg-green-100'>Correct</span>
                    ) : (
                      <span className='px-2 py-1 rounded text-red-800 bg-red-100'>Incorrect</span>
                    )}
                  </div>
                </div>

                <div className='mt-3 grid gap-2'>
                  {(q.options || q.choices || []).map(opt => {
                    const isChosen = String(opt) === String(chosen)
                    const isAnswer = String(opt) === String(correctOption)
                    return (
                      <div
                        key={opt}
                        className={`flex items-center gap-3 p-2 rounded border ${
                          isAnswer ? 'border-green-300 bg-green-50' : isChosen ? 'border-sky-300 bg-sky-50' : 'border-transparent'
                        }`}
                      >
                        <div className='w-4 text-sm'>{isAnswer ? '✔' : isChosen ? '●' : '○'}</div>
                        <div className='text-sm'>{opt}</div>
                      </div>
                    )
                  })}
                </div>

                {q.explanation && <div className='mt-3 text-sm text-slate-600'>Explanation: {q.explanation}</div>}
              </div>
            )
          })}
        </div>

        <div className='flex gap-3'>
          <button onClick={()=>navigate(`/lessons/${lessonId}`)} className='px-4 py-2 border rounded'>Back to Lesson</button>
          <button onClick={()=>navigate('/dashboard')} className='px-4 py-2 bg-teal-600 text-white rounded'>Go to Dashboard</button>
        </div>
      </div>
    )
  }

  // Not submitted UI
  return (
    <div className='space-y-6 max-w-3xl mx-auto'>
      <h2 className='text-2xl font-semibold'>Quiz</h2>
      {error && <div className='text-red-600'>{error}</div>}
      <div className='space-y-4'>
        {questions.map(q => {
          const qId = q._id || q.id
          return (
            <div key={qId} className='bg-white p-4 rounded shadow'>
              <div className='font-semibold'>{q.question}</div>
              <div className='mt-3 grid gap-2'>
                {(q.options || q.choices || []).map(opt => {
                  const checked = answers[qId] === opt
                  return (
                    <label key={opt} className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='radio'
                        name={String(qId)}
                        value={opt}
                        onChange={() => select(qId, opt)}
                        checked={checked}
                      />
                      <span className='text-sm'>{opt}</span>
                    </label>
                  )
                })}
              </div>
              {q.note && <div className='mt-2 text-xs text-slate-500'>Note: {q.note}</div>}
            </div>
          )
        })}
      </div>

      <div className='flex items-center gap-3'>
        <button
          onClick={submit}
          disabled={submitting}
          className='px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-60'
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
        <button onClick={()=>navigate(-1)} className='px-4 py-2 border rounded'>Cancel</button>
      </div>
    </div>
  )
}
