import React, { useState, useEffect, useCallback } from 'react'
import apiClient from '../apiClient'

export default function TutorStudents() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState('')
  const [emailsText, setEmailsText] = useState('')
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
      setError('Failed to load repository data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleAddStudents = async (e) => {
    e.preventDefault()
    if (!selectedClassId || !emailsText.trim()) return
    
    // Split emails by comma or newline and clean them up
    const emailList = emailsText
      .split(/[\n,]+/)
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'))

    if (emailList.length === 0) {
      setError('Please provide at least one valid email address.')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')
    
    try {
      const res = await apiClient.post(`/tutor/dashboard/classes/${selectedClassId}/students`, { 
        emails: emailList 
      })
      
      const { added, failed, alreadyEnrolled } = res.data.results
      let msg = `Successfully processed. `
      if (added.length > 0) msg += `Added ${added.length} students. `
      if (alreadyEnrolled.length > 0) msg += `${alreadyEnrolled.length} were already enrolled. `
      if (failed.length > 0) {
        setError(`Failed to add ${failed.length} students (check emails).`)
      }
      
      setSuccess(msg)
      if (added.length > 0) {
        setShowAddModal(false)
        setEmailsText('')
        setSelectedClassId('')
        fetchData()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process assignment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRemoveStudent = async (classId, studentId) => {
    if (!window.confirm('Dissociate this student from the selected class?')) return
    try {
      await apiClient.delete(`/tutor/dashboard/classes/${classId}/students/${studentId}`)
      fetchData()
    } catch (err) {
      setError('Failed to process dissociation.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-fadeIn">
        <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Accessing Student Directory...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10 space-y-12 animate-fadeIn bg-slate-50/30 min-h-screen font-['Inter']">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-teal-50 text-[#0D9488] text-[9px] font-black rounded-lg uppercase tracking-widest border border-teal-100">Learner Ecosystem</span>
               <span className="w-2 h-2 bg-[#F43F5E] rounded-full animate-pulse shadow-lg shadow-pink-500/50"></span>
             </div>
             <h1 className="text-4xl font-black tracking-tighter font-['Outfit'] uppercase text-slate-800">Directory <span className="text-[#0D9488]">Records</span></h1>
             <p className="text-slate-400 font-medium text-sm italic">Manage and assign students to your curriculum modules across active classrooms.</p>
          </div>
          <button
            onClick={() => { setShowAddModal(true); setSuccess(''); setError(''); }}
            disabled={classes.length === 0}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 active:scale-95 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
          >
            🚀 Broadcast Enrollment
          </button>
        </div>

        {/* Global Feedback */}
        {(error || success) && (
          <div className={`p-6 rounded-3xl border-2 animate-slideDown flex items-center justify-between ${error ? 'bg-pink-50 border-pink-100 text-[#F43F5E]' : 'bg-teal-50 border-teal-100 text-[#0D9488]'}`}>
            <div className="flex items-center gap-4">
              <span className="text-xl">{error ? '⚠️' : '✓'}</span>
              <p className="text-xs font-black uppercase tracking-widest">{error || success}</p>
            </div>
            <button onClick={() => { setError(''); setSuccess(''); }} className="text-lg font-black opacity-50 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Managed Learners', val: students.length, color: '[#0D9488]', bg: 'teal-50', icon: '👤' },
            { label: 'Active Channels', val: classes.length, color: 'slate-800', bg: 'white', icon: '📺' },
            { label: 'Mean Density', val: classes.length > 0 ? Math.round(students.length / classes.length) : 0, color: '[#F43F5E]', bg: 'pink-50', icon: '📈' }
          ].map((stat, i) => (
            <div key={i} className={`bg-${stat.bg} p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 group hover:scale-[1.02] transition-all`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                <span className={`text-${stat.color} font-black text-4xl tracking-tighter`}>{stat.val}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Students Repository */}
        {students.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="text-6xl mb-6 opacity-20">👥</div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Repository Vault Empty</h3>
            <p className="text-slate-400 font-medium text-xs mt-2 italic mb-8">Execute an enrollment broadcast to begin managing your student base.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {students.map((student) => (
              <div key={student.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-lg hover:shadow-xl hover:border-teal-400/30 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#0D9488] to-[#F43F5E] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-500/10 group-hover:scale-110 transition-transform">
                      {student.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800 font-['Outfit'] uppercase tracking-tight">{student.name}</h4>
                      <p className="text-xs font-semibold text-slate-400 italic mt-0.5">{student.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-wrap gap-2 md:justify-end">
                    {student.classes?.map((cls) => (
                      <div
                        key={cls.id}
                        className="flex items-center gap-3 pl-4 pr-2 py-2 bg-slate-50 border border-slate-100 text-slate-600 rounded-xl transition-all hover:bg-teal-50 hover:border-teal-200 group/cls"
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">📺 {cls.title}</span>
                        <button
                          onClick={() => handleRemoveStudent(cls.id, student.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#F43F5E] hover:text-white text-slate-300 transition-all text-xs"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bulk Enrollment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 animate-scaleIn">
              <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center text-slate-800">
                <div>
                   <span className="text-[9px] font-black text-[#0D9488] uppercase tracking-[0.3em] block mb-1">Administrative Action</span>
                   <h3 className="text-2xl font-black tracking-tight font-['Outfit'] uppercase">Broadcast Enrollment</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#F43F5E] transition-all shadow-sm font-black">✕</button>
              </div>
              
              <form onSubmit={handleAddStudents} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-2">Target Channel</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/5 outline-none font-black text-slate-600 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose your classroom...</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end pl-2">
                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Recipient Directory</label>
                    <span className="text-[9px] font-black text-[#F43F5E] uppercase tracking-widest opacity-60 italic">Separate by comma or newline</span>
                  </div>
                  <textarea
                    rows="5"
                    value={emailsText}
                    onChange={(e) => setEmailsText(e.target.value)}
                    className="w-full px-6 py-5 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-teal-500/5 outline-none font-bold text-slate-700 resize-none shadow-inner text-sm placeholder:text-slate-300"
                    placeholder="student1@domain.com,\nstudent2@domain.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-lg shadow-teal-500/10"
                >
                  {submitting ? 'Transmitting Data...' : 'Initiate Distribution'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
  )
}
