import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'

export default function ContentProviderDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const res = await apiClient.get('/content-provider/dashboard')
      setStats(res.data?.stats)
      setCourses(res.data?.courses || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <NavBar />
      <div className='flex-1 container mx-auto px-4 md:px-6 py-12'>
        {/* Header */}
        <div className='mb-12'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-teal-700 to-rose-600 bg-clip-text text-transparent'>Content Provider</h1>
            <div className='w-fit px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg shadow-purple-200'>
              ⭐ Super Admin
            </div>
          </div>
          <p className='text-slate-500'>Create, manage, and publish your courses</p>
        </div>

        {/* Create Course Button */}
        <div className='mb-12'>
          <button
            onClick={() => navigate('/content-provider/create-course')}
            className='w-full p-8 bg-white border-2 border-dashed border-slate-200 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all group flex flex-col items-center justify-center gap-4'
          >
            <div className='w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl group-hover:scale-110 transition-transform'>
              ➕
            </div>
            <div className='text-center'>
              <div className='text-xl font-bold text-slate-800'>Create New Course</div>
              <div className='text-slate-500'>Draft your curriculum and lessons</div>
            </div>
          </button>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className='grid md:grid-cols-4 gap-6 mb-12'>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 font-bold text-xl'>📚</div>
              <div className='text-sm text-slate-500 mb-1 font-medium'>Total Courses</div>
              <div className='text-3xl font-bold text-slate-900'>{stats.totalCourses}</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 font-bold text-xl'>📖</div>
              <div className='text-sm text-slate-500 mb-1 font-medium'>Total Lessons</div>
              <div className='text-3xl font-bold text-slate-900'>{stats.totalLessons}</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 font-bold text-xl'>🎓</div>
              <div className='text-sm text-slate-500 mb-1 font-medium'>Enrollments</div>
              <div className='text-3xl font-bold text-slate-900'>{stats.totalLearners}</div>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow'>
              <div className='w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 mb-4 font-bold text-xl'>📝</div>
              <div className='text-sm text-slate-500 mb-1 font-medium'>Tests & Quizzes</div>
              <div className='text-3xl font-bold text-slate-900'>{stats.totalQuizzes}</div>
            </div>
          </div>
        )}

        {/* Courses Section */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>
          <div className='flex items-center justify-between mb-8'>
            <h2 className='text-2xl font-bold text-slate-800 focus:outline-none'>Your Courses</h2>
            <div className='text-sm text-slate-500 font-medium whitespace-nowrap'>Total: {courses.length}</div>
          </div>

          {courses.length === 0 ? (
            <div className='text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200'>
              <div className='text-6xl mb-6'>📁</div>
              <h3 className='text-xl font-bold text-slate-700 mb-2'>No courses yet</h3>
              <p className='text-slate-500 mb-8 max-w-xs mx-auto text-sm'>Create your first course to start building your educational portal</p>
              <button
                onClick={() => navigate('/content-provider/create-course')}
                className='px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-purple-400 transition shadow-sm'
              >
                Create First Course
              </button>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className='bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer'
                  onClick={() => navigate(`/content-provider/courses/${course.id}/lessons`)}
                >
                  {/* Course Thumbnail */}
                  <div className='w-full h-44 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500 relative overflow-hidden'>
                    <span className="relative z-10">{course.thumbnail || '📜'}</span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>

                  {/* Course Info */}
                  <div className='p-5'>
                    <div className='flex items-center gap-2 mb-3'>
                      <span className='px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-full'>{course.category || 'General'}</span>
                      <span className='px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-full'>{course.level || 'Beginner'}</span>
                    </div>

                    <h3 className='text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1'>{course.title}</h3>
                    <p className='text-sm text-slate-500 mb-6 line-clamp-2 h-10'>{course.description}</p>

                    {/* Course Stats */}
                    <div className='grid grid-cols-3 gap-4 py-4 border-t border-slate-50 text-center'>
                      <div>
                        <div className='text-sm font-bold text-slate-800'>{course.lessonCount || 0}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Lessons</div>
                      </div>
                      <div>
                        <div className='text-sm font-bold text-slate-800'>{course.enrollments || 0}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Learners</div>
                      </div>
                      <div>
                        <div className='text-sm font-bold text-slate-800 text-teal-600'>{course.rating || 'New'}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Rating</div>
                      </div>
                    </div>

                    {/* Course Actions */}
                    <div className='mt-4 flex gap-3'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/courses/${course.id}/edit`)
                        }}
                        className='flex-1 px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Delete course logic
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
