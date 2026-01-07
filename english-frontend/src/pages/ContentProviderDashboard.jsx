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
    <>
      <NavBar />
      <div className='p-8 text-white min-h-screen'>
      {/* Header */}
      <div className='mb-12'>
        <div className='flex items-center justify-between mb-2'>
          <h1 className='text-4xl font-bold'>Content Provider</h1>
          <div className='px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold'>
            ⭐ Super Admin
          </div>
        </div>
        <p className='text-slate-400'>Create, manage, and publish your courses</p>
      </div>

      {/* Create Course Button */}
      <div className='mb-12'>
        <button
          onClick={() => navigate('/content-provider/create-course')}
          className='px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg'
        >
          + Create New Course
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className='grid md:grid-cols-4 gap-6 mb-12'>
          <div className='bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg'>
            <div className='text-sm text-purple-100 mb-2'>Total Courses</div>
            <div className='text-4xl font-bold'>{stats.totalCourses}</div>
          </div>
          <div className='bg-gradient-to-br from-pink-500 to-pink-600 p-6 rounded-lg shadow-lg'>
            <div className='text-sm text-pink-100 mb-2'>Total Lessons</div>
            <div className='text-4xl font-bold'>{stats.totalLessons}</div>
          </div>
          <div className='bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg'>
            <div className='text-sm text-blue-100 mb-2'>Total Learners</div>
            <div className='text-4xl font-bold'>{stats.totalLearners}</div>
          </div>
          <div className='bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg'>
            <div className='text-sm text-green-100 mb-2'>Total Quizzes</div>
            <div className='text-4xl font-bold'>{stats.totalQuizzes}</div>
          </div>
        </div>
      )}

      {/* Courses Section */}
      <div className='bg-slate-800 rounded-lg shadow-lg p-6'>
        <h2 className='text-2xl font-bold mb-6'>Your Courses</h2>
        
        {courses.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>📚</div>
            <p className='text-slate-400 mb-6'>No courses yet. Create your first course to get started!</p>
            <button
              onClick={() => navigate('/content-provider/create-course')}
              className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition'
            >
              Create First Course
            </button>
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((course) => (
              <div
                key={course.id}
                className='bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer'
                onClick={() => navigate(`/content-provider/courses/${course.id}/lessons`)}
              >
                {/* Course Thumbnail */}
                <div className='w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl'>
                  {course.thumbnail || '🎓'}
                </div>

                {/* Course Info */}
                <div className='p-4'>
                  <h3 className='text-lg font-bold mb-2'>{course.title}</h3>
                  <p className='text-sm text-slate-400 mb-4 line-clamp-2'>{course.description}</p>
                  
                  <div className='flex gap-2 mb-4'>
                    <span className='px-3 py-1 bg-purple-600 text-xs rounded-full'>{course.category || 'General'}</span>
                    <span className='px-3 py-1 bg-slate-600 text-xs rounded-full'>{course.level || 'Beginner'}</span>
                  </div>

                  {/* Course Stats */}
                  <div className='grid grid-cols-3 gap-2 text-center text-xs text-slate-300'>
                    <div>
                      <div className='font-bold'>{course.lessonCount || 0}</div>
                      <div>Lessons</div>
                    </div>
                    <div>
                      <div className='font-bold'>{course.enrollments || 0}</div>
                      <div>Learners</div>
                    </div>
                    <div>
                      <div className='font-bold'>{course.rating || '—'}</div>
                      <div>Rating</div>
                    </div>
                  </div>

                  {/* Course Actions */}
                  <div className='mt-4 flex gap-2'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/content-provider/courses/${course.id}/edit`)
                      }}
                      className='flex-1 px-3 py-2 bg-blue-600 text-xs font-bold rounded hover:bg-blue-700 transition'
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Delete course
                      }}
                      className='flex-1 px-3 py-2 bg-red-600 text-xs font-bold rounded hover:bg-red-700 transition'
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
    </>
  )
}
