import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function TutorDashboardTest() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedCourse, setExpandedCourse] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Tutors can view approved courses via teacher-resources
        const res = await apiClient.get('/teacher-resources/available-courses')
        setCourses(res.data?.courses || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load curriculum.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading curriculum...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-rose-500 font-semibold">
        {error}
      </div>
    )
  }

  return (
    <div className='p-8 max-w-5xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-800 mb-2'>Curriculum Viewer</h1>
        <p className='text-slate-600'>
          Browse the global library of approved courses, lessons, and quizzes before assigning them to your class.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">No approved courses available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
              <div 
                className="p-6 cursor-pointer flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2.5 py-0.5 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                      {course.level || 'General'}
                    </span>
                    <span className="text-sm text-slate-500">{course.lessonCount || 0} Lessons</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{course.title}</h3>
                  <p className="text-slate-600 mt-2 text-sm max-w-3xl line-clamp-2">{course.description}</p>
                </div>
                <div className="text-slate-400">
                  {expandedCourse === course.id ? '▼' : '▶'}
                </div>
              </div>

              {expandedCourse === course.id && (
                <div className="p-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-4 px-2">Course Modules & Lessons</h4>
                  {course.lessons && course.lessons.length > 0 ? (
                    <div className="space-y-3">
                      {course.lessons.map((lesson, idx) => (
                        <div key={lesson.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 font-semibold text-sm">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-slate-700">{lesson.title}</span>
                          </div>
                          <button 
                            onClick={() => navigate(`/lessons/${lesson.id}`)}
                            className="px-4 py-2 bg-white border border-slate-200 text-teal-600 text-sm font-semibold rounded-lg hover:bg-teal-50 transition-colors"
                          >
                            Preview
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic px-2">No lessons detailed for this course.</p>
                  )}
                  
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => navigate('/tutor/classes')}
                      className="px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                    >
                      Assign to Class
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
