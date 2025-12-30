import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function CourseLessons() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadLessons()
  }, [courseId])

  const loadLessons = async () => {
    try {
      const res = await apiClient.get(`/content-provider/lessons/${courseId}`)
      setLessons(res.data?.lessons || [])
    } catch (err) {
      setError('Failed to load lessons')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8 text-white">Loading...</div>

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <button
          onClick={() => navigate('/content-provider')}
          className='mb-8 text-slate-400 hover:text-white transition flex items-center gap-2'
        >
          ← Back to Dashboard
        </button>

        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold'>Course Lessons</h1>
          <button
            onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
            className='px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition'
          >
            + Add Lesson
          </button>
        </div>

        {error && (
          <div className='mb-6 p-4 bg-red-600 text-red-100 rounded-lg'>
            {error}
          </div>
        )}

        {/* Lessons List */}
        <div className='bg-slate-800 rounded-lg shadow-lg overflow-hidden'>
          {lessons.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>📝</div>
              <p className='text-slate-400 mb-6'>No lessons yet. Create your first lesson!</p>
              <button
                onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
                className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition'
              >
                Create First Lesson
              </button>
            </div>
          ) : (
            <div className='divide-y divide-slate-700'>
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className='p-6 hover:bg-slate-700 transition cursor-pointer'
                  onClick={() => navigate(`/content-provider/lessons/${lesson.id}/edit`)}
                >
                  <div className='flex items-center gap-6'>
                    <div className='flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center font-bold'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold'>{lesson.title}</h3>
                      <p className='text-sm text-slate-400 mt-1'>{lesson.description}</p>
                      <div className='flex gap-4 mt-3 text-xs text-slate-400'>
                        <span>⏱️ {lesson.duration || '0'} min</span>
                        <span>📊 {lesson.quizCount || 0} quiz(zes)</span>
                        <span>👥 {lesson.views || 0} views</span>
                      </div>
                    </div>
                    <div className='flex-shrink-0 flex gap-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/lessons/${lesson.id}/edit`)
                        }}
                        className='px-4 py-2 bg-blue-600 text-xs font-bold rounded hover:bg-blue-700 transition'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Delete lesson
                        }}
                        className='px-4 py-2 bg-red-600 text-xs font-bold rounded hover:bg-red-700 transition'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
