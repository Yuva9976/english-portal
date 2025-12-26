import React, { useEffect, useState } from 'react'
import apiClient from '../apiClient'

function ProgressBar({ value = 0, max = 100 }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className='w-full bg-slate-200 h-3 rounded overflow-hidden'>
      <div style={{ width: `${pct}%` }} className='h-3 bg-emerald-500' />
    </div>
  )
}

export default function Dashboard(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      try {
        // request the learner dashboard (authenticated)
        const res = await apiClient.get('/dashboard/learner')
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  },[])

  if (loading) return <div>Loading...</div>

  // Fallback safe shapes
  const user = data?.user || { name: 'User', email: '' }
  const points = data?.points ?? 0
  const completed = data?.completedLessons || []
  const totalLessons = data?.totalLessons ?? (completed.length + 10) // fallback
  const percent = Math.round((completed.length / Math.max(totalLessons,1)) * 100)

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold'>Dashboard</h2>

      <div className='bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between'>
          <div>
            <div className='font-semibold text-lg'>{user.name}</div>
            <div className='text-sm text-slate-600'>{user.email}</div>
          </div>
          <div className='text-sm text-right'>
            <div>Points: <strong>{points}</strong></div>
            <div>Completed: <strong>{completed.length}</strong> / {totalLessons}</div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex items-center justify-between mb-2'>
            <div className='text-sm font-medium'>{percent}% complete</div>
            <div className='text-sm text-slate-500'>{completed.length} lessons</div>
          </div>
          <ProgressBar value={completed.length} max={totalLessons} />
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-3'>Completed Lessons</h3>
        <div className='grid md:grid-cols-3 gap-4'>
          {completed.length ? completed.map(l=> (
            <div key={l._id || l.id} className='bg-white p-4 rounded shadow'>
              <div className='font-semibold'>{l.title}</div>
              <div className='text-sm text-slate-600 mt-2'>{l.shortDescription || ''}</div>
            </div>
          )) : (
            <div className='text-sm text-slate-600'>No lessons completed yet.</div>
          )}
        </div>
      </div>

      <div>
        <h3 className='font-semibold mb-3'>Recent Quiz Results</h3>
        <div className='space-y-3'>
          {(data?.quizHistory || []).slice(0,5).map((q,i)=>(
            <div key={i} className='bg-white p-3 rounded shadow flex items-center justify-between'>
              <div>
                <div className='font-medium'>{q.lessonTitle || q.lessonId}</div>
                <div className='text-sm text-slate-600'>Score: {q.score} — {new Date(q.date).toLocaleString()}</div>
              </div>
              <div className='text-sm text-slate-600'>{q.score}/{q.total}</div>
            </div>
          ))}

          {(!data?.quizHistory || data.quizHistory.length===0) && <div className='text-sm text-slate-600'>No quiz attempts yet.</div>}
        </div>
      </div>
    </div>
  )
}
