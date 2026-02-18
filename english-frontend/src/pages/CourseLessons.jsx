import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'

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

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <NavBar />
      <div className='flex-1 container mx-auto px-4 md:px-6 py-12'>
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/content-provider')}
          className='mb-8 text-slate-500 hover:text-teal-600 transition flex items-center gap-2 font-medium'
        >
          <span className="text-xl">←</span> Back to Dashboard
        </button>

        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-slate-800'>Course Curriculum</h1>
            <p className='text-slate-500 mt-1'>Manage lessons and content for this course</p>
          </div>
          <button
            onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
            className='px-6 py-3 bg-gradient-to-r from-teal-600 to-rose-500 hover:from-teal-700 hover:to-rose-600 text-white font-bold rounded-xl transition shadow-lg shadow-teal-500/20 flex items-center gap-2'
          >
            <span>➕</span> Add New Lesson
          </button>
        </div>

        {error && (
          <div className='mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium'>
            {error}
          </div>
        )}

        {/* Lessons List container */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden'>
          {lessons.length === 0 ? (
            <div className='text-center py-20 bg-slate-50/50'>
              <div className='text-6xl mb-6'>📝</div>
              <h3 className='text-xl font-bold text-slate-700 mb-2'>No lessons yet</h3>
              <p className='text-slate-500 mb-8 max-w-xs mx-auto text-sm'>Break down your course into digestible lessons for better learner engagement.</p>
              <button
                onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
                className='px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-teal-400 transition shadow-sm'
              >
                Create First Lesson
              </button>
            </div>
          ) : (
            <div className='divide-y divide-slate-50'>
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className='p-6 hover:bg-slate-50/80 transition cursor-pointer group'
                  onClick={() => navigate(`/content-provider/lessons/${lesson.id}/edit`)}
                >
                  <div className='flex flex-col md:flex-row md:items-center gap-6'>
                    <div className='flex-shrink-0 w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-teal-500 group-hover:text-white transition-colors'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors'>{lesson.title}</h3>
                      <p className='text-sm text-slate-500 mt-1 line-clamp-1'>{lesson.description || 'No description provided'}</p>

                      <div className='flex flex-wrap gap-4 mt-4 text-xs font-semibold uppercase tracking-wider'>
                        <span className='flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-600 rounded-md'>
                          <span>⏱️</span> {lesson.duration || '0'} min
                        </span>
                        <span className='flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-md'>
                          <span>📊</span> {lesson.quizCount || 0} quizzes
                        </span>
                        <span className='flex items-center gap-1.5 px-2 py-1 bg-teal-50 text-teal-600 rounded-md'>
                          <span>👥</span> {lesson.views || 0} views
                        </span>
                      </div>
                    </div>

                    <div className='flex gap-2 self-end md:self-center'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/lessons/${lesson.id}/edit`)
                        }}
                        className='px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Delete lesson logic
                        }}
                        className='px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition'
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
      <SiteFooter />
    </div>
  )
}
