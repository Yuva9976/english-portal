import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import StatCard from '../components/dashboard/StatCard'
import DashboardHeader from '../components/dashboard/DashboardHeader'

const formatTime = (value) => {
  if (!value) return 'TBD'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return 'TBD'
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (value) => {
  if (!value) return '—'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString()
}

const SectionSkeleton = ({ className }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm animate-pulse ${className ?? ''}`}
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
      <div className="h-4 bg-slate-200 rounded w-32"></div>
    </div>
  </div>
)

export default function TutorDashboardHome() {
  const navigate = useNavigate()
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentResources, setRecentResources] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)
  const [gradingSubmission, setGradingSubmission] = useState(null)
  const [gradingScore, setGradingScore] = useState('')
  const [gradingFeedback, setGradingFeedback] = useState('')
  const mountedRef = useRef(false)

  const fetchOverview = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiClient.get('/tutor/dashboard/overview')
      if (!mountedRef.current) return
      setOverview(res.data ?? null)
      setLastUpdated(new Date())
    } catch (err) {
      if (!mountedRef.current) return
      console.error('Tutor dashboard overview fetch failed', err)
      setError("Couldn't load tutor overview. Please retry.")
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const handleUpdateMeetLink = async (sessionId) => {
    const link = prompt("Enter Google Meet Link:");
    if (!link) return;
    try {
      await apiClient.patch(`/tutor/sessions/${sessionId}`, { google_meet_link: link });
      alert("Meet link updated!");
      fetchOverview();
    } catch (e) { alert("Failed to update meet link"); }
  };

  const handleGrade = async () => {
    if (!gradingSubmission) return;
    try {
      await apiClient.post('/tutor/grade-submission', {
        submissionId: gradingSubmission.id,
        points: parseInt(gradingScore),
        feedback: gradingFeedback
      });
      alert("Graded successfully!");
      setGradingSubmission(null);
      fetchOverview();
    } catch (e) { alert("Grading failed"); }
  };

  useEffect(() => {
    mountedRef.current = true
    fetchOverview()
    return () => {
      mountedRef.current = false
    }
  }, [fetchOverview])

  const todayClasses = overview?.today?.classes || []
  const stats = overview?.stats || { activeClasses: 0, totalStudents: 0, avgQuizScore: 0, resourcesShared: 0 }
  const notifications = overview?.notifications || []
  const isInitialLoad = loading && !overview

  const quizSubmissions = useMemo(
    () =>
      notifications
        .filter((note) => note.type === 'quiz_submitted')
        .map((note) => {
          const score = note.details?.score
          return {
            id: note.id,
            studentName: note.details?.studentName || 'Learner',
            quizName: note.details?.quizName || 'Quiz',
            scoreLabel: typeof score === 'number' ? `${score}%` : '—',
            createdAt: note.createdAt,
          }
        }),
    [notifications]
  )

  // Get user name from localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userName = user?.name || 'Teacher'
  const firstName = userName.split(' ')[0]

  const pendingTasks = notifications.filter(n => n.type === 'task_submitted');

  return (
    <div className='p-6 lg:p-12 space-y-16 animate-in fade-in duration-700 font-["Inter"]'>
      <DashboardHeader 
        title="Tutor Command Centre"
        badgeText="Instructional Layer"
        subtitle={`System Active. Welcome back, ${firstName}. ${todayClasses.length} live sessions queued for today.`}
      />

      <div className="px-10">
        {/* Advanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {isInitialLoad ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-40 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse"></div>
            ))
          ) : (
            <>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-teal-400/30 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mb-6">🎓</div>
                  <div>
                    <div className="text-4xl font-black text-teal-900 tracking-tighter mb-1 font-['Outfit']">{stats.activeClasses}</div>
                    <div className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Operational Rooms</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-rose-400/30 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-2xl mb-6">👥</div>
                  <div>
                    <div className="text-4xl font-black text-rose-900 tracking-tighter mb-1 font-['Outfit']">{stats.totalStudents}</div>
                    <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Assigned Nodes</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-violet-400/30 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl mb-6">📊</div>
                  <div>
                    <div className="text-4xl font-black text-violet-900 tracking-tighter mb-1 font-['Outfit']">{stats.avgQuizScore}%</div>
                    <div className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em]">Success Velocity</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 group hover:border-teal-900/10 transition-all relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl mb-6">📁</div>
                  <div>
                    <div className="text-4xl font-black text-teal-900 tracking-tighter mb-1 font-['Outfit']">{stats.resourcesShared}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resource Assets</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Dynamic Timeline & Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between pl-4">
               <h2 className="text-2xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit'] flex items-center gap-4">
                  <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl">📅</span> 
                  Session Timeline
               </h2>
               <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  Transmission Live
               </div>
            </div>

            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
              {isInitialLoad ? (
                <div className="p-10 space-y-6">
                  <div className="h-32 bg-slate-50 rounded-3xl animate-pulse"></div>
                  <div className="h-32 bg-slate-50 rounded-3xl animate-pulse"></div>
                </div>
              ) : todayClasses.length ? (
                  <div className="divide-y divide-slate-50">
                    {todayClasses.map((cls) => (
                      <div key={cls.id} className="p-6 hover:bg-slate-50 transition-all group/item">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="text-center min-w-[100px] px-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover/item:border-teal-500 group-hover/item:shadow-md transition-all">
                            <p className="text-sm font-black text-teal-900 tracking-tighter">{formatTime(cls.startTime)}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{formatTime(cls.endTime)}</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                               <span className="text-[8px] font-black text-rose-500 uppercase tracking-[0.2em]">{cls.level || 'General Studies'}</span>
                               <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                               <span className="text-[8px] font-black text-teal-600 uppercase tracking-[0.2em]">Module Linked</span>
                            </div>
                            <p className="text-lg font-black text-teal-900 tracking-tighter uppercase font-['Outfit'] group-hover/item:text-teal-600 transition-colors">{cls.title}</p>
                          </div>
                          <div className="flex flex-row md:flex-col gap-2">
                             {cls.google_meet_link ? (
                               <a href={cls.google_meet_link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-white bg-blue-500 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-center">Establish Link</a>
                             ) : (
                               <button onClick={() => handleUpdateMeetLink(cls.id)} className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-teal-600 bg-teal-50 border border-teal-100 rounded-xl hover:bg-teal-100 transition-all">Configure Link</button>
                             )}
                             <button className="px-6 py-3 text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                               Review Syllabus
                             </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              ) : (
                <div className="py-32 text-center bg-slate-50/30">
                  <div className="text-7xl mb-8 grayscale opacity-20">☕</div>
                  <p className="text-teal-900 font-black text-2xl tracking-tighter uppercase font-['Outfit']">Instructional Queue Empty</p>
                  <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mt-2 italic shadow-sm">Sync with global curriculum to initiate new sessions.</p>
                </div>
              )}
            </div>
          </div>

          {/* Intelligence Sidebar */}
          <div className="space-y-10">
            {/* Rapid Controls */}
            <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 -translate-y-12"></div>
               <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4 tracking-tighter uppercase font-['Outfit']">
                <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-teal-400 text-xl">⚡</span> 
                Rapid Controls
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Classes', icon: '👩‍🏫', path: '/tutor/classes' },
                  { label: 'Resources', icon: '📁', path: '/tutor/resources' },
                  { label: 'Students', icon: '👥', path: '/tutor/students' }
                ].map(action => (
                  <button 
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="w-full px-8 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-3xl text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all text-left flex items-center gap-5 border border-white/5 group/btn"
                  >
                    <span className="text-2xl group-hover/btn:rotate-12 transition-transform">{action.icon}</span> 
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Feed */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
              <div className="px-8 py-6 border-b border-slate-50">
                <h3 className="text-base font-black text-teal-900 flex items-center gap-4 tracking-tighter uppercase font-['Outfit']">
                  <span className="text-xl group-hover:rotate-12 transition-transform">🔔</span> Intelligence
                </h3>
              </div>
              <div className="bg-white">
                {isInitialLoad ? (
                  <div className="p-8 h-48 bg-slate-50 animate-pulse rounded-2xl m-4"></div>
                ) : notifications.length ? (
                  <div className="divide-y divide-slate-50">
                    {notifications.slice(0, 3).map((note) => (
                      <div key={note.id} className="p-6 hover:bg-slate-50 transition-all group/note">
                        <p className="text-xs font-bold text-teal-900 leading-snug tracking-tight">{note.message}</p>
                        <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mt-2">{formatDate(note.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.2em]">Status: Nominal</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Progress Analytics */}
          <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-12 group">
             <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit'] flex items-center gap-4">
                  <span className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-2xl group-hover:rotate-6 transition-transform">📝</span> 
                  Success Analytics
                </h2>
                <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                   Real-time Loop
                </div>
             </div>
             
             {isInitialLoad ? (
               <div className="h-64 bg-slate-50 rounded-[3rem] animate-pulse"></div>
             ) : quizSubmissions.length ? (
               <div className="space-y-6">
                 {quizSubmissions.slice(0, 4).map((sub) => (
                   <div key={sub.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group/sub hover:bg-white hover:shadow-xl hover:border-teal-400/30 transition-all">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-teal-500/10 border-4 border-white">
                           {sub.studentName.charAt(0)}
                         </div>
                         <div>
                            <p className="text-xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">{sub.studentName}</p>
                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-1">{sub.quizName}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-4xl font-black text-teal-600 tracking-tighter">{sub.scoreLabel}</span>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-20 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                  <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Awaiting neural feedback...</p>
               </div>
             )}
          </div>

          {/* Pending Submissions Matrix */}
          <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl p-12 group">
              <h2 className="text-2xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit'] mb-12 flex items-center gap-4">
                <span className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 text-2xl">📋</span>
                Action Required
              </h2>
              {pendingTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {pendingTasks.map(task => (
                      <div key={task.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-teal-500 transition-all">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-900 font-black border border-slate-100 shadow-sm">{task.details?.studentName?.charAt(0)}</div>
                            <div className="min-w-0">
                               <p className="font-black text-teal-900 text-sm uppercase tracking-tight truncate">{task.details?.studentName}</p>
                               <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Task Evaluation</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => {
                               setGradingSubmission({ id: task.id, ...task.details });
                               setGradingScore('');
                               setGradingFeedback('');
                            }}
                            className="w-full py-4 bg-teal-900 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-rose-500 transition-all shadow-xl shadow-teal-900/10"
                          >
                            Initiate Audit
                         </button>
                      </div>
                   ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No pending audits identified.</p>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Audit Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[4rem] p-12 shadow-2xl relative animate-in zoom-in-95 duration-500 border border-teal-500/10">
              <button onClick={() => setGradingSubmission(null)} className="absolute top-12 right-12 text-slate-300 hover:text-rose-500 transition-colors text-3xl font-black">✕</button>
              
              <div className="mb-12">
                 <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.3em] block mb-2">Instructor Assessment</span>
                 <h3 className="text-4xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">Audit Record</h3>
                 <p className="text-slate-400 font-medium italic mt-1 text-sm">Evaluating {gradingSubmission.studentName}'s performance.</p>
              </div>
              
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest pl-2">Performance Score (0-100)</label>
                    <input 
                       type="number" 
                       value={gradingScore}
                       onChange={(e) => setGradingScore(e.target.value)}
                       className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-black text-teal-900 text-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                       placeholder="100"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest pl-2">Constructive Intelligence</label>
                    <textarea 
                       rows="4"
                       value={gradingFeedback}
                       onChange={(e) => setGradingFeedback(e.target.value)}
                       className="w-full px-8 py-6 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-teal-900 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all resize-none shadow-inner placeholder:text-slate-300"
                       placeholder="Enter structured feedback modules..."
                    ></textarea>
                 </div>
                 <button 
                   onClick={handleGrade}
                   className="w-full py-6 bg-gradient-to-r from-teal-600 to-teal-400 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-teal-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                 >
                   Transmit Audit Data
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}
