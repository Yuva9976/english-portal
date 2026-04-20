import React, { useState, useEffect, useCallback } from 'react'
import apiClient from '../apiClient'

const StudentProfileModal = ({ studentId, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get(`/tutor/dashboard/students/${studentId}/profile`);
        setProfile(res.data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    if (studentId) fetchProfile();
  }, [studentId]);

  if (!studentId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl rounded-[4rem] p-12 shadow-2xl relative animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-400 hover:text-rose-500 transition-colors text-3xl font-black">✕</button>
        
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Learner DNA...</p>
          </div>
        ) : profile ? (
          <div className="space-y-12">
            <div className="flex items-center gap-8">
               <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-teal-500/20">
                 {profile.student.name.charAt(0)}
               </div>
               <div>
                  <h2 className="text-4xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">{profile.student.name}</h2>
                  <p className="text-slate-400 font-medium italic">{profile.student.email}</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
               <div className="p-8 bg-teal-50 rounded-[2.5rem] border border-teal-100 text-center">
                  <span className="text-3xl block mb-2">📚</span>
                  <span className="text-2xl font-black text-teal-900 block tracking-tighter">{profile.stats.lessonsCompleted}</span>
                  <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest">Modules Mastery</p>
               </div>
               <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 text-center">
                  <span className="text-3xl block mb-2">📅</span>
                  <span className="text-2xl font-black text-rose-900 block tracking-tighter">{profile.stats.attendanceRate}%</span>
                  <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Attendance Rel.</p>
               </div>
               <div className="p-8 bg-violet-50 rounded-[2.5rem] border border-violet-100 text-center">
                  <span className="text-3xl block mb-2">📊</span>
                  <span className="text-2xl font-black text-violet-900 block tracking-tighter">{profile.stats.avgQuizScore}%</span>
                  <p className="text-[9px] font-black text-violet-500 uppercase tracking-widest">Avg Quiz Velocity</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h3 className="text-xl font-black text-teal-900 tracking-tighter uppercase pl-2 flex items-center gap-3">
                    <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">📝</span>
                    Recent Quiz History
                  </h3>
                  <div className="space-y-3">
                     {profile.history.quizAttempts.length ? profile.history.quizAttempts.slice(0, 3).map(q => (
                       <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                          <span className="font-bold text-teal-900 text-sm">{q.quiz?.title}</span>
                          <span className="px-3 py-1 bg-white rounded-lg text-teal-600 font-black text-[10px] border border-slate-200">{q.score_percent}%</span>
                       </div>
                     )) : <p className="text-xs text-slate-400 italic pl-2">No quiz history available.</p>}
                  </div>
               </div>
               <div className="space-y-6">
                  <h3 className="text-xl font-black text-teal-900 tracking-tighter uppercase pl-2 flex items-center gap-3">
                    <span className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">📍</span>
                    Attendance Log
                  </h3>
                  <div className="space-y-3">
                     {profile.history.attendance.length ? profile.history.attendance.slice(0, 3).map(a => (
                       <div key={a.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                          <span className="font-bold text-teal-900 text-sm">{new Date(a.date).toLocaleDateString()}</span>
                          <span className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-widest ${a.status === 'present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            {a.status}
                          </span>
                       </div>
                     )) : <p className="text-xs text-slate-400 italic pl-2">No attendance records found.</p>}
                  </div>
               </div>
            </div>
          </div>
        ) : <p className="text-center py-20 text-slate-400 italic font-medium">Record not found...</p>}
      </div>
    </div>
  );
};

export default function TutorStudents() {
  const [students, setStudents] = useState([])
  const [assignedPool, setAssignedPool] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null)
  const [selectedClassId, setSelectedClassId] = useState('')
  const [emailsText, setEmailsText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [studentsRes, poolRes, classesRes] = await Promise.all([
        apiClient.get('/tutor/dashboard/students'),
        apiClient.get('/tutor/dashboard/pool'),
        apiClient.get('/tutor/dashboard/classes'),
      ])
      setStudents(studentsRes.data.students || [])
      setAssignedPool(poolRes.data.pool || poolRes.data.students || [])
      setClasses(classesRes.data.classes || [])
    } catch (err) {
      console.error('Failed to fetch tutor data', err)
      setError('Student records are currently being synchronized. Please refresh in a moment.')
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
    
    const emailList = emailsText
      .split(/[\n,]+/)
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'))

    if (emailList.length === 0) {
      setError('Provide valid recipient identifiers.')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')
    
    try {
      const res = await apiClient.post(`/tutor/dashboard/classes/${selectedClassId}/students`, { 
        emails: emailList 
      })
      
      const { added, alreadyEnrolled } = res.data.results
      let msg = `Distribution complete. `
      if (added.length > 0) msg += `Attached ${added.length} nodes. `
      if (alreadyEnrolled.length > 0) msg += `${alreadyEnrolled.length} nodes pre-existing. `
      
      setSuccess(msg)
      if (added.length > 0) {
        setShowAddModal(false)
        setEmailsText('')
        fetchData()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Transmission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRemoveStudent = async (classId, studentId) => {
    if (!window.confirm('Dissociate this learner from the active channel?')) return
    try {
      await apiClient.delete(`/tutor/dashboard/classes/${classId}/students/${studentId}`)
      fetchData()
    } catch (err) {
      setError('Dissociation sequence aborted.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] animate-fadeIn">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Synchronizing Directory Records...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-10 space-y-16 animate-fadeIn pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 px-4">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
               <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[9px] font-black rounded-lg uppercase tracking-widest border border-teal-100">Instructional Intelligence</span>
               <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-lg shadow-rose-500/50"></span>
             </div>
             <h1 className="text-5xl font-black tracking-tighter font-['Outfit'] uppercase text-teal-900">Directory <span className="text-rose-500">Vault</span></h1>
             <p className="text-slate-500 font-medium text-sm italic">Monitor assigned student pool and orchestrate classroom enrollment.</p>
          </div>
          <button
            onClick={() => { setShowAddModal(true); setSuccess(''); setError(''); }}
            disabled={classes.length === 0}
            className="px-10 py-6 bg-gradient-to-r from-teal-900 to-teal-800 text-white font-black rounded-[2rem] hover:shadow-2xl hover:shadow-teal-900/20 active:scale-95 transition-all uppercase tracking-widest text-[10px] disabled:opacity-50"
          >
            🚀 Broadcast Enrollment
          </button>
        </div>

        {/* Feedback Bar */}
        {(error || success) && (
          <div className={`mx-4 p-8 rounded-[3rem] border animate-slideDown flex items-center justify-between ${error ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-teal-50 border-teal-100 text-teal-600'}`}>
            <div className="flex items-center gap-6">
              <span className="text-2xl">{error ? '⚠️' : '✓'}</span>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">{error || success}</p>
            </div>
            <button onClick={() => { setError(''); setSuccess(''); }} className="text-lg font-black opacity-30 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Assigned Pool Summary */}
        <div className="px-4">
           <div className="bg-white rounded-[4rem] p-12 border border-slate-50 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full translate-x-24 -translate-y-24 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                 <div className="w-32 h-32 bg-teal-900 rounded-[3rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-teal-900/20">
                   {assignedPool.length}
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">Instructional <span className="text-teal-500">Pool</span></h3>
                    <p className="text-slate-400 font-medium text-sm mt-1 max-w-sm">Total students allocated to your mentorship by Admin. Current capacity: <span className="text-teal-900 font-black">Medium Intensity</span></p>
                 </div>
              </div>

              <div className="relative z-10 flex gap-6">
                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 min-w-[140px] text-center">
                    <span className="block text-2xl font-black text-teal-900 tracking-tighter">{students.length}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active nodes</span>
                 </div>
                 <div className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100 min-w-[140px] text-center">
                    <span className="block text-2xl font-black text-rose-900 tracking-tighter">{assignedPool.length - students.length}</span>
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Unassigned</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Students Table/Grid */}
        <div className="px-4 space-y-8">
           <div className="flex items-center justify-between pl-4">
              <h3 className="text-xl font-black text-teal-900 tracking-tighter uppercase flex items-center gap-4">
                 <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">👥</span>
                 Assigned Learner Directory
              </h3>
              <div className="flex items-center gap-2 px-5 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                 Sort: Latest Activity
              </div>
           </div>

           {assignedPool.length === 0 ? (
             <div className="py-32 text-center bg-white rounded-[3.5rem] border border-slate-50 flex flex-col items-center">
               <div className="text-6xl mb-8 opacity-20">📂</div>
               <h3 className="text-2xl font-black text-teal-900 tracking-tighter uppercase">No Assigned Students</h3>
               <p className="text-slate-400 font-medium text-sm italic mt-2 max-w-xs mx-auto">Tutors must be allocated students by System Administrators before enrollment.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-6">
               {assignedPool.map((student) => {
                 const isActive = students.find(s => s.id === student.id);
                 return (
                   <div key={student.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-xl hover:shadow-2xl hover:border-teal-400/30 transition-all group">
                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                       <div className="flex items-center gap-8">
                         <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-teal-500/10 group-hover:rotate-6 transition-all border-4 border-white">
                           {student.name.charAt(0)}
                         </div>
                         <div>
                           <div className="flex items-center gap-3 mb-1">
                             <h4 className="text-2xl font-black text-teal-900 font-['Outfit'] uppercase tracking-tight">{student.name}</h4>
                             {isActive ? (
                               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg uppercase tracking-widest border border-emerald-100">Enrolled</span>
                             ) : (
                               <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black rounded-lg uppercase tracking-widest border border-slate-100">Pool Node</span>
                             )}
                           </div>
                           <p className="text-sm font-medium text-slate-400 italic">{student.email}</p>
                         </div>
                       </div>
                       
                       <div className="flex-1 flex flex-wrap gap-3 lg:justify-end">
                         {isActive && student.classes?.map((cls) => (
                           <div
                             key={cls.id}
                             className="flex items-center gap-4 pl-5 pr-3 py-3 bg-slate-50 border border-slate-100 text-teal-900 rounded-[1.25rem] transition-all hover:bg-teal-50 hover:border-teal-200 group/cls"
                           >
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none mb-1">Active Room</span>
                                 <span className="text-[11px] font-black uppercase tracking-widest">{cls.title}</span>
                              </div>
                             <button
                               onClick={() => handleRemoveStudent(cls.id, student.id)}
                               className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-rose-500 hover:text-white text-slate-300 transition-all font-black text-xs border border-slate-100"
                             >✕</button>
                           </div>
                         ))}
                         
                         <button 
                           onClick={() => setSelectedStudentProfile(student.id)}
                           className="px-8 py-4 bg-teal-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-teal-800 shadow-xl shadow-teal-900/10 transition-all"
                         >
                           View Profile
                         </button>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
           )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-xl overflow-hidden animate-scaleIn border border-slate-100">
              <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center text-teal-900 bg-white">
                <div>
                   <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em] block mb-2">Cohort Expansion</span>
                   <h3 className="text-3xl font-black tracking-tighter font-['Outfit'] uppercase">Broadcast Enrollment</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all font-black text-xl">✕</button>
              </div>
              
              <form onSubmit={handleAddStudents} className="p-12 space-y-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-teal-900 uppercase tracking-widest pl-2">Designated Class Channel</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-teal-500/10 outline-none font-bold text-teal-900 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose your classroom...</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end pl-2">
                    <label className="text-[11px] font-black text-teal-900 uppercase tracking-widest">Recipient Directory</label>
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest opacity-60 italic">Multi-input enabled</span>
                  </div>
                  <textarea
                    rows="4"
                    value={emailsText}
                    onChange={(e) => setEmailsText(e.target.value)}
                    className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-teal-500/10 outline-none font-bold text-teal-900 resize-none shadow-inner text-sm placeholder:text-slate-300"
                    placeholder="student1@domain.com,\nstudent2@domain.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-6 bg-gradient-to-r from-teal-600 to-teal-400 text-white font-black rounded-[2rem] hover:shadow-2xl hover:shadow-teal-500/30 active:scale-95 transition-all text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-teal-500/10"
                >
                  {submitting ? 'Transmitting...' : 'Initiate Distribution'}
                </button>
              </form>
            </div>
          </div>
        )}

        {selectedStudentProfile && (
           <StudentProfileModal 
             studentId={selectedStudentProfile} 
             onClose={() => setSelectedStudentProfile(null)} 
           />
        )}
      </div>
  )
}
