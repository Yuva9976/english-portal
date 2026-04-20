import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

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

const ClassForm = ({ formData, setFormData, submitting, onSubmit, buttonText, approvedLessons = [], studentPool = [] }) => {
  const toggleStudent = (id) => {
    const current = formData.studentIds || []
    if (current.includes(id)) {
      setFormData({ ...formData, studentIds: current.filter(sid => sid !== id) })
    } else {
      setFormData({ ...formData, studentIds: [...current, id] })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 pl-1">Class Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold text-teal-900"
          placeholder="e.g., Business English Masterclass"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 pl-1">Target Lesson</label>
          <select
            value={formData.lessonId || ''}
            onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold text-teal-900 appearance-none"
          >
            <option value="">Select Approved Lesson</option>
            {approvedLessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title} ({lesson.level})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 pl-1">Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold text-teal-900 appearance-none"
          >
            <option value="General">General</option>
            <option value="Beginner">Beginner (A1)</option>
            <option value="Elementary">Elementary (A2)</option>
            <option value="Intermediate">Intermediate (B1)</option>
            <option value="Upper Intermediate">Upper Intermediate (B2)</option>
            <option value="Advanced">Advanced (C1)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 pl-1">Assign Students from Pool</label>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-h-40 overflow-y-auto space-y-2 scrollbar-hide">
          {studentPool.length === 0 ? (
            <p className="text-[10px] text-slate-400 italic">No assigned students available in pool.</p>
          ) : (
            studentPool.map(student => (
              <div 
                key={student.id} 
                onClick={() => toggleStudent(student.id)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                  (formData.studentIds || []).includes(student.id) 
                    ? 'bg-teal-50 border border-teal-200' 
                    : 'bg-white border border-transparent shadow-sm hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    (formData.studentIds || []).includes(student.id) ? 'bg-teal-500' : 'bg-slate-200'
                  }`}></div>
                  <span className="text-sm font-bold text-teal-900">{student.name}</span>
                </div>
                {(formData.studentIds || []).includes(student.id) && <span className="text-teal-600 text-xs font-black">✓</span>}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2 pl-1">Google Meet Link</label>
        <input
          type="url"
          value={formData.meetingLink || ''}
          onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-semibold text-teal-900"
          placeholder="https://meet.google.com/..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-5 bg-gradient-to-r from-teal-600 to-teal-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
      >
        {submitting ? 'Processing...' : buttonText}
      </button>
    </form>
  )
}

export default function TutorClasses() {
  const navigate = useNavigate()
  const [classes, setClasses] = useState([])
  const [approvedLessons, setApprovedLessons] = useState([])
  const [studentPool, setStudentPool] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', level: 'General', lessonId: '', meetingLink: '', studentIds: [] })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [classRes, lessonRes, poolRes] = await Promise.all([
        apiClient.get('/tutor/dashboard/classes'),
        apiClient.get('/tutor/dashboard/lessons/approved'),
        apiClient.get('/tutor/dashboard/pool')
      ])
      setClasses(classRes.data.classes || [])
      setApprovedLessons(lessonRes.data.lessons || [])
      setStudentPool(poolRes.data.pool || poolRes.data.students || [])
    } catch (err) {
      console.error('Failed to fetch classes', err)
      setError('Cohort records are currently being established. Please standby.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCreateClass = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    setSubmitting(true)
    try {
      await apiClient.post('/tutor/dashboard/classes', formData)
      setShowCreateModal(false)
      setFormData({ title: '', description: '', level: 'General', lessonId: '', meetingLink: '', studentIds: [] })
      fetchData()
    } catch (err) {
      setError('Could not establish new class record.')
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
      fetchData()
    } catch (err) {
      setError('Failed to sync changes to database.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCompleteClass = async (classId) => {
    if (!window.confirm('Mark this class as COMPLETED? This will unlock associated resources for all enrolled students.')) return
    try {
      await apiClient.post(`/tutor/dashboard/classes/${classId}/complete`)
      fetchData()
    } catch (err) {
      alert("Completion trigger failed. Verify network connectivity.");
    }
  }

  const handleDeleteClass = async (classId) => {
    if (!window.confirm('Expunge this class record? Historical data will be preserved but access will be revoked.')) return
    try {
      await apiClient.delete(`/tutor/dashboard/classes/${classId}`)
      fetchData()
    } catch (err) {
      setError('Deletion sequence failed.')
    }
  }

  const openEditModal = (cls) => {
    setSelectedClass(cls)
    setFormData({ 
      title: cls.title, 
      description: cls.description || '', 
      level: cls.level || 'General',
      lessonId: cls.lesson_id || '',
      meetingLink: cls.meeting_link || '',
      studentIds: cls.studentIds || []
    })
    setShowEditModal(true)
  }

  return (
    <div className="p-10 space-y-12 animate-in fade-in duration-500">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-4">
          <div className="space-y-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-teal-100">Cohort Management</span>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-lg shadow-rose-500/50"></span>
             </div>
             <h1 className="text-4xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">Classroom <span className="text-rose-500">Vault</span></h1>
             <p className="text-slate-500 font-medium text-sm italic">Orchestrate learning modules and monitor instructional delivery.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-5 bg-gradient-to-r from-teal-600 to-teal-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-4"
          >
            <span className="text-xl">🎓</span>
            Initiate New Class
          </button>
        </div>

        {error && (
          <div className="mx-4 p-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-[2.5rem] flex items-center justify-between group">
            <div className="flex items-center gap-4">
               <span className="text-xl">⚠️</span>
               <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
            <button onClick={() => setError('')} className="text-lg font-black opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Classes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse"></div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="mx-4 py-32 text-center bg-white rounded-[4rem] border border-slate-50 shadow-sm flex flex-col items-center">
            <div className="text-7xl mb-8 opacity-20">📚</div>
            <h3 className="text-2xl font-black text-teal-900 uppercase tracking-tighter">Instructional Catalog Empty</h3>
            <p className="text-slate-400 font-medium text-sm italic mt-2 mb-10">Start by creating a cohort and linking it to an approved lesson module.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-10 py-5 bg-teal-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-800 transition-all shadow-xl shadow-teal-900/10"
            >
              🚀 Launch First Cohort
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-teal-400/30 transition-all group relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="relative z-10 flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <span className={`px-4 py-1.5 text-[9px] font-black rounded-xl uppercase tracking-widest border ${
                      cls.status === 'completed' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-teal-50 text-teal-600 border-teal-100'
                    }`}>
                      {cls.status === 'completed' ? '✓ Finished' : '● Operational'}
                    </span>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{cls.level}</span>
                  </div>

                  <h3 className="text-2xl font-black text-teal-900 tracking-tighter uppercase mb-2 group-hover:text-teal-600 transition-colors font-['Outfit']">
                    {cls.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 italic line-clamp-2 mb-8 leading-relaxed">
                    {cls.description || 'Instructional parameters not specified...'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                       <span className="block text-xl mb-1">👥</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cls.studentCount} Learners</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                       <span className="block text-xl mb-1">📅</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cls.sessionCount} Sessions</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 space-y-3">
                   <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/tutor/classes/${cls.id}/resources`)}
                        className="flex-1 py-4 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-teal-100 transition-all border border-teal-100"
                      >
                        Assets
                      </button>
                      <button
                        onClick={() => openEditModal(cls)}
                        className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-white hover:text-teal-500 hover:shadow-lg transition-all border border-slate-100"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all border border-slate-100"
                      >
                        🗑️
                      </button>
                   </div>
                   
                   {cls.status !== 'completed' && (
                     <button 
                        onClick={() => handleCompleteClass(cls.id)}
                        className="w-full py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F43F5E] transition-all shadow-xl shadow-slate-900/10"
                     >
                       Mark as Completed
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} title="Initialize Cohort Record">
          <ClassForm 
            formData={formData} 
            setFormData={setFormData} 
            submitting={submitting} 
            onSubmit={handleCreateClass} 
            buttonText="Launch Class" 
            approvedLessons={approvedLessons}
            studentPool={studentPool}
          />
        </Modal>

        <Modal show={showEditModal} onClose={() => { setShowEditModal(false); setSelectedClass(null); }} title="Adjust Instructional Parameters">
          <ClassForm 
            formData={formData} 
            setFormData={setFormData} 
            submitting={submitting} 
            onSubmit={handleEditClass} 
            buttonText="Sync Record" 
            approvedLessons={approvedLessons}
            studentPool={studentPool}
          />
        </Modal>
      </div>
  )
}
