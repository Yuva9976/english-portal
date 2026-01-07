import React, { useState, useEffect, useCallback } from 'react'
import TutorDashboardLayout from '../components/TutorDashboardLayout'
import apiClient from '../apiClient'

export default function TutorClasses() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', level: 'General' })
  const [submitting, setSubmitting] = useState(false)

  const fetchClasses = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiClient.get('/tutor/dashboard/classes')
      setClasses(res.data.classes || [])
    } catch (err) {
      console.error('Failed to fetch classes', err)
      setError('Failed to load classes. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  const handleCreateClass = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    setSubmitting(true)
    try {
      await apiClient.post('/tutor/dashboard/classes', formData)
      setShowCreateModal(false)
      setFormData({ title: '', description: '', level: 'General' })
      fetchClasses()
    } catch (err) {
      console.error('Failed to create class', err)
      setError('Failed to create class. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditClass = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !selectedClass) return
    setSubmitting(true)
    try {
      await apiClient.put(`/tutor/dashboard/classes/${selectedClass.id}`, formData)
      setShowEditModal(false)
      setSelectedClass(null)
      setFormData({ title: '', description: '', level: 'General' })
      fetchClasses()
    } catch (err) {
      console.error('Failed to update class', err)
      setError('Failed to update class. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteClass = async (classId) => {
    if (!window.confirm('Are you sure you want to delete this class? This action cannot be undone.')) return
    try {
      await apiClient.delete(`/tutor/dashboard/classes/${classId}`)
      fetchClasses()
    } catch (err) {
      console.error('Failed to delete class', err)
      setError('Failed to delete class. Please try again.')
    }
  }

  const openEditModal = (cls) => {
    setSelectedClass(cls)
    setFormData({ title: cls.title, description: cls.description || '', level: cls.level || 'General' })
    setShowEditModal(true)
  }

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-500 to-emerald-500">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">&times;</button>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    )
  }

  const ClassForm = ({ onSubmit, buttonText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Class Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          placeholder="e.g., Advanced Grammar A2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-none"
          rows={3}
          placeholder="Brief description of the class..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Level</label>
        <select
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
        >
          <option value="General">General</option>
          <option value="Beginner">Beginner (A1)</option>
          <option value="Elementary">Elementary (A2)</option>
          <option value="Intermediate">Intermediate (B1)</option>
          <option value="Upper Intermediate">Upper Intermediate (B2)</option>
          <option value="Advanced">Advanced (C1)</option>
          <option value="Proficiency">Proficiency (C2)</option>
        </select>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {submitting ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  )

  return (
    <TutorDashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Classes</h1>
            <p className="text-slate-500 mt-1">Manage your classes and students</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="text-lg">➕</span>
            Create New Class
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-rose-500 hover:text-rose-700">&times;</button>
          </div>
        )}

        {/* Classes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Classes Yet</h3>
            <p className="text-slate-500 mb-6">Create your first class to start teaching!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all"
            >
              <span>➕</span> Create Your First Class
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Card Header */}
                <div className="h-2 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      cls.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {cls.status === 'active' ? '● Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-slate-400">{cls.level}</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {cls.description || 'No description provided'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <span>👥</span>
                      <span>{cls.studentCount} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <span>📅</span>
                      <span>{cls.sessionCount} sessions</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => openEditModal(cls)}
                      className="flex-1 py-2 px-3 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClass(cls.id)}
                      className="py-2 px-3 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Class">
          <ClassForm onSubmit={handleCreateClass} buttonText="Create Class" />
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onClose={() => { setShowEditModal(false); setSelectedClass(null); }} title="Edit Class">
          <ClassForm onSubmit={handleEditClass} buttonText="Save Changes" />
        </Modal>
      </div>
    </TutorDashboardLayout>
  )
}
