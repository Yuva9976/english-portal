import React, { useState, useEffect, useCallback } from 'react'
import TutorDashboardLayout from '../components/TutorDashboardLayout'
import apiClient from '../apiClient'

export default function TutorStudents() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [studentsRes, classesRes] = await Promise.all([
        apiClient.get('/tutor/dashboard/students'),
        apiClient.get('/tutor/dashboard/classes'),
      ])
      setStudents(studentsRes.data.students || [])
      setClasses(classesRes.data.classes || [])
    } catch (err) {
      console.error('Failed to fetch data', err)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddStudent = async (e) => {
    e.preventDefault()
    if (!selectedClassId || !studentEmail.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await apiClient.post(`/tutor/dashboard/classes/${selectedClassId}/students`, { email: studentEmail })
      setShowAddModal(false)
      setStudentEmail('')
      setSelectedClassId('')
      fetchData()
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add student'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRemoveStudent = async (classId, studentId) => {
    if (!window.confirm('Remove this student from the class?')) return
    try {
      await apiClient.delete(`/tutor/dashboard/classes/${classId}/students/${studentId}`)
      fetchData()
    } catch (err) {
      setError('Failed to remove student')
    }
  }

  return (
    <TutorDashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Students</h1>
            <p className="text-slate-500 mt-1">Manage students across your classes</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={classes.length === 0}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-lg">➕</span>
            Add Student
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-rose-500 hover:text-rose-700">&times;</button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-5 text-white">
            <p className="text-teal-100 text-sm">Total Students</p>
            <p className="text-3xl font-bold">{students.length}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
            <p className="text-emerald-100 text-sm">Total Classes</p>
            <p className="text-3xl font-bold">{classes.length}</p>
          </div>
          <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-5 text-white">
            <p className="text-violet-100 text-sm">Avg per Class</p>
            <p className="text-3xl font-bold">
              {classes.length > 0 ? Math.round(students.length / classes.length) : 0}
            </p>
          </div>
        </div>

        {/* Students List */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Students Yet</h3>
            <p className="text-slate-500 mb-6">Add students to your classes to get started!</p>
            {classes.length > 0 ? (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all"
              >
                <span>➕</span> Add Your First Student
              </button>
            ) : (
              <p className="text-sm text-slate-400">Create a class first before adding students</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-700">All Students ({students.length})</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {students.map((student) => (
                <div key={student.id} className="p-5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {student.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??'}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800">{student.name}</h4>
                      <p className="text-sm text-slate-500">{student.email}</p>
                      
                      {/* Enrolled Classes */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {student.classes?.map((cls) => (
                          <span
                            key={cls.id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full"
                          >
                            📚 {cls.title}
                            <button
                              onClick={() => handleRemoveStudent(cls.id, student.id)}
                              className="ml-1 text-teal-400 hover:text-rose-500 transition-colors"
                              title="Remove from class"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-500 to-emerald-500">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Add Student to Class</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
                </div>
              </div>
              <form onSubmit={handleAddStudent} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Select Class *</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  >
                    <option value="">Choose a class...</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Student Email *</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    placeholder="student@example.com"
                    required
                  />
                  <p className="text-xs text-slate-400 mt-1">Enter the email of a registered learner</p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Student'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </TutorDashboardLayout>
  )
}
