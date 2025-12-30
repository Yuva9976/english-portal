import React, { useEffect, useState } from 'react'
import apiClient from '../apiClient'

export default function TeacherDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeacherDashboard() {
      try {
        // Get the user info from localStorage
        const userStr = localStorage.getItem('user')
        if (!userStr) {
          setError('User not found')
          return
        }

        const user = JSON.parse(userStr)
        const userId = user.id

        // Fetch teacher dashboard data
        const res = await apiClient.get(`/dashboard/teacher/${userId}`)
        setData(res.data)
      } catch (err) {
        console.error('Teacher dashboard error:', err)
        setError(err?.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadTeacherDashboard()
  }, [])

  if (loading) {
    return <div className='text-center py-10'>Loading teacher dashboard...</div>
  }

  if (error) {
    return <div className='bg-red-100 text-red-700 p-4 rounded'>{error}</div>
  }

  const lessons = data?.lessons || []
  const totalLessons = lessons.length
  const totalStudents = lessons.reduce((sum, l) => sum + (l.studentsStarted || 0), 0)
  const avgCompletion =
    totalLessons > 0
      ? Math.round(lessons.reduce((sum, l) => sum + (l.avgCompletionPercent || 0), 0) / totalLessons)
      : 0
  const avgQuizScore =
    totalLessons > 0
      ? Math.round(lessons.reduce((sum, l) => sum + (l.avgQuizScore || 0), 0) / totalLessons)
      : 0

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-3xl font-bold text-gray-800'>Teacher Dashboard</h2>
        <p className='text-gray-600 mt-1'>Manage your lessons and track student progress</p>
      </div>

      {/* Summary Cards */}
      <div className='grid md:grid-cols-4 gap-4'>
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-300'>
          <div className='text-3xl font-bold text-blue-600'>{totalLessons}</div>
          <div className='text-sm text-gray-600 mt-2'>Lessons Created</div>
        </div>
        <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-300'>
          <div className='text-3xl font-bold text-green-600'>{totalStudents}</div>
          <div className='text-sm text-gray-600 mt-2'>Students Enrolled</div>
        </div>
        <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-300'>
          <div className='text-3xl font-bold text-yellow-600'>{avgCompletion}%</div>
          <div className='text-sm text-gray-600 mt-2'>Avg Completion Rate</div>
        </div>
        <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-300'>
          <div className='text-3xl font-bold text-purple-600'>{avgQuizScore}%</div>
          <div className='text-sm text-gray-600 mt-2'>Avg Quiz Score</div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className='bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-400 text-white p-8 rounded-lg shadow-lg'>
        <h3 className='text-2xl font-bold mb-2'>Welcome Back, Teacher!</h3>
        <p className='text-teal-100'>You're doing great! Your students are actively learning.</p>
      </div>

      {/* Lessons Overview */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold text-gray-800'>Your Lessons</h3>
          <button className='px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition'>
            + Create New Lesson
          </button>
        </div>

        {lessons.length > 0 ? (
          <div className='grid gap-4'>
            {lessons.map((lesson, idx) => (
              <div key={idx} className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <h4 className='text-lg font-semibold text-gray-800'>{lesson.title}</h4>
                    <p className='text-sm text-gray-600 mt-1'>
                      {lesson.studentsStarted} student{lesson.studentsStarted !== 1 ? 's' : ''} enrolled
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <button className='px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition'>
                      Edit
                    </button>
                    <button className='px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition'>
                      Delete
                    </button>
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-4 text-sm'>
                  <div className='bg-gray-50 p-3 rounded'>
                    <div className='text-gray-600'>Completion Rate</div>
                    <div className='text-2xl font-bold text-gray-800 mt-1'>
                      {lesson.avgCompletionPercent || 0}%
                    </div>
                    <div className='w-full bg-gray-200 h-2 rounded mt-2'>
                      <div
                        style={{ width: `${lesson.avgCompletionPercent || 0}%` }}
                        className='h-2 bg-emerald-500 rounded'
                      />
                    </div>
                  </div>

                  <div className='bg-gray-50 p-3 rounded'>
                    <div className='text-gray-600'>Avg Quiz Score</div>
                    <div className='text-2xl font-bold text-gray-800 mt-1'>
                      {lesson.avgQuizScore || 0}%
                    </div>
                    <div className='text-xs text-gray-500 mt-2'>Based on quiz attempts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white p-8 rounded-lg shadow text-center'>
            <p className='text-gray-600 mb-4'>You haven't created any lessons yet.</p>
            <button className='px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition'>
              Create Your First Lesson
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className='grid md:grid-cols-3 gap-4'>
        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer'>
          <div className='text-3xl mb-3'>📝</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>Create Lesson</h4>
          <p className='text-sm text-gray-600'>Add new lessons and sections for your students</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer'>
          <div className='text-3xl mb-3'>📊</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>View Analytics</h4>
          <p className='text-sm text-gray-600'>Track student engagement and performance metrics</p>
        </div>

        <div className='bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer'>
          <div className='text-3xl mb-3'>📋</div>
          <h4 className='text-lg font-semibold text-gray-800 mb-2'>Manage Quizzes</h4>
          <p className='text-sm text-gray-600'>Create and update quizzes for your lessons</p>
        </div>
      </div>
    </div>
  )
}
