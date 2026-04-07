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
  const stats = overview?.stats || { activeClasses: 0, totalStudents: 0, avgQuizScoreThisWeek: 0, resourcesShared: 0 }
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

  const statsCards = [
    { label: 'Active Classes', value: stats.activeClasses ?? 0, icon: '🎓', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', trend: '+2' },
    { label: 'Total Students', value: stats.totalStudents ?? 0, icon: '👥', color: 'from-rose-400 to-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', trend: '+12%' },
    { label: 'Avg Quiz Score', value: `${stats.avgQuizScoreThisWeek ?? 0}%`, icon: '📊', color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', border: 'border-violet-200', trend: '+5%' },
    { label: 'Cohort Materials', value: stats.resourcesShared ?? 0, icon: '📁', color: 'from-amber-400 to-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', trend: '+3' },
  ]

  // Get user name from localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userName = user?.name || 'Teacher'
  const firstName = userName.split(' ')[0]

  const pendingTasks = notifications.filter(n => n.type === 'task_submitted');

  return (
    <div className='p-6 lg:p-10 space-y-12 selection:bg-teal-100 pb-20'>
      <DashboardHeader 
        title="Tutor Dashboard"
        badgeText="Instructional Portal"
        subtitle={`Good Morning, ${firstName}! 👋 You have ${todayClasses.length} sessions today.`}
      />

      <div className="px-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isInitialLoad ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SectionSkeleton key={`stat-skel-${index}`} className='h-32 rounded-[2rem]' />
            ))
          ) : (
            <>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-teal-900 mb-0.5 tracking-tighter">{stats.activeClasses ?? 0}</div>
                  <div className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest">Active Classes</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl relative z-10">🎓</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-pink-900 mb-0.5 tracking-tighter">{stats.totalStudents ?? 0}</div>
                  <div className="text-[10px] font-semibold text-pink-500 uppercase tracking-widest">Total Students</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl relative z-10">👥</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                   <div className="text-3xl font-semibold text-violet-900 mb-0.5 tracking-tighter">{stats.avgQuizScoreThisWeek ?? 0}%</div>
                  <div className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest">Avg Quiz Score</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl relative z-10">📊</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-rose-900 mb-0.5 tracking-tighter">{stats.resourcesShared ?? 0}</div>
                  <div className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest">Cohort Materials</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl relative z-10">📁</div>
              </div>
            </>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-teal-900 flex items-center gap-3 tracking-tighter">
                  <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl">📅</span> 
                  Today's Schedule
                </h2>
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest mt-1">Your instructional timeline</p>
              </div>
              {loading && <span className="text-[10px] font-semibold text-teal-500 animate-pulse tracking-widest uppercase">Refreshing...</span>}
            </div>
            {isInitialLoad ? (
              <div className="p-10">
                <SectionSkeleton className='h-40 rounded-3xl' />
              </div>
            ) : todayClasses.length ? (
              <div className="divide-y divide-slate-50">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="px-10 py-6 hover:bg-slate-50 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="text-center min-w-[100px] px-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm group-hover:border-teal-200 transition-all">
                        <p className="text-sm font-semibold text-teal-600 tracking-tighter">{formatTime(cls.startTime)}</p>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{formatTime(cls.endTime)}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-500 mb-1">
                          {cls.level || 'General Studies'}
                        </p>
                        <p className="text-lg font-semibold text-teal-900 tracking-tight group-hover:text-teal-600 transition-colors">{cls.title}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                         {cls.google_meet_link ? (
                           <a href={cls.google_meet_link} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-white bg-blue-500 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/10 text-center">Join Google Meet</a>
                         ) : (
                           <button onClick={() => handleUpdateMeetLink(cls.id)} className="px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 border border-teal-200 rounded-xl hover:bg-teal-100 transition-all">Set Meet Link</button>
                         )}
                         <button className="px-6 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                           {cls.status === 'live' ? 'View Details' : 'View Syllabus'}
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center">
                <div className="text-6xl mb-6">☕</div>
                <p className="text-teal-900 font-semibold text-xl tracking-tighter">No sessions today</p>
                <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-widest mt-2">Perfect time to prepare new lesson materials!</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 rounded-[3rem] p-10 shadow-2xl shadow-teal-900/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform"></div>
              <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3 tracking-tighter">
                <span className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl">⚡</span> 
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/tutor/classes')}
                  className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl text-[10px] font-semibold uppercase tracking-[0.2em] transition-all text-left flex items-center gap-4 border border-white/10"
                >
                  <span className="text-xl">👩‍🏫</span> Manage Classes
                </button>
                <button 
                  onClick={() => navigate('/tutor/resources')}
                  className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl text-[10px] font-semibold uppercase tracking-[0.2em] transition-all text-left flex items-center gap-4 border border-white/10"
                >
                  <span className="text-xl">📁</span> Browse Shared Resources
                </button>
                <button 
                  onClick={() => navigate('/tutor/students')}
                  className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl text-[10px] font-semibold uppercase tracking-[0.2em] transition-all text-left flex items-center gap-4 border border-white/10"
                >
                  <span className="text-xl">👥</span> View Students
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden relative group">
              <div className="px-8 py-6 border-b border-slate-50 bg-white">
                <h3 className="text-lg font-semibold text-teal-900 flex items-center gap-3 tracking-tighter">
                  <span className="text-xl group-hover:rotate-12 transition-transform">🔔</span> Intelligence Feed
                </h3>
              </div>
              {isInitialLoad ? (
                <div className="p-8">
                  <SectionSkeleton className='h-24 rounded-2xl' />
                </div>
              ) : notifications.length ? (
                <div className="divide-y divide-slate-50">
                  {notifications.slice(0, 4).map((note) => (
                    <div key={note.id} className="px-8 py-5 hover:bg-slate-50 transition-all group/note">
                      <p className="text-sm font-bold text-slate-700 leading-snug group-hover/note:text-teal-900 transition-colors">{note.message}</p>
                      <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-widest mt-1.5">{formatDate(note.createdAt)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest">✅ All clear!</p>
                </div>
              )}
              <div className="px-8 py-4 bg-slate-50/50">
                <button className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-500 hover:text-teal-600 w-full text-center transition-all">Review History</button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Recent Resources */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
            <div className="px-10 py-8 border-b border-slate-50 bg-white">
              <h2 className="text-xl font-semibold text-teal-900 flex items-center gap-3 tracking-tighter">
                <span className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 text-xl group-hover:rotate-6 transition-transform">📁</span> 
                Recent Assets
              </h2>
            </div>
            {isInitialLoad ? (
              <div className="p-10">
                <SectionSkeleton className='h-32 rounded-3xl' />
              </div>
            ) : recentResources.length ? (
              <div className="divide-y divide-slate-50">
                {recentResources.map((resource) => {
                  const resourceType = resource.type ? resource.type.toUpperCase() : 'RESOURCE'
                  return (
                    <div key={resource.id} className="px-10 py-6 hover:bg-slate-50 transition-all group/item">
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover/item:bg-white group-hover/item:shadow-lg transition-all border border-slate-100">
                            📄
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-teal-900 tracking-tight leading-tight">{resource.title}</h3>
                            <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest mt-1">{resourceType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{resource.views ?? 0} Engagements</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-20 text-center">
                 <p className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest'>No resources published yet</p>
              </div>
            )}
          </div>

          {/* Quiz Submissions */}
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
            <div className="px-10 py-8 border-b border-slate-50 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-teal-900 flex items-center gap-3 tracking-tighter">
                  <span className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 text-xl group-hover:rotate-6 transition-transform">📝</span> 
                  Success Analytics
                </h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-semibold uppercase tracking-widest border border-emerald-100">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                   Real-time
                </div>
              </div>
            </div>
            {isInitialLoad ? (
              <div className="p-10">
                <SectionSkeleton className='h-32 rounded-3xl' />
              </div>
            ) : quizSubmissions.length ? (
              <div className="divide-y divide-slate-50">
                {quizSubmissions.map((submission) => (
                  <div key={submission.id} className="px-10 py-6 hover:bg-slate-50 transition-all group/sub">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-base font-semibold shadow-lg shadow-teal-500/10 border-2 border-white">
                          {submission.studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-teal-900 tracking-tight leading-tight group-hover/sub:text-teal-600 transition-colors">{submission.studentName}</p>
                          <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-widest mt-1">{submission.quizName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="text-3xl font-semibold text-teal-600 tracking-tighter">{submission.scoreLabel}</span>
                         <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center">
                 <p className='text-[10px] font-semibold text-slate-400 uppercase tracking-widest'>Awaiting submissions...</p>
              </div>
            )}
          </div>
        </div>

        {/* Task Grading Section */}
        <div className="mt-10">
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-10">
              <h2 className="text-2xl font-semibold text-teal-900 tracking-tighter mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 text-xl">📋</span>
                Pending Task Submissions
              </h2>
              {pendingTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {pendingTasks.map(task => (
                      <div key={task.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 group hover:border-teal-300 transition-all">
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-600 font-semibold border border-slate-100 shadow-sm">{task.details?.studentName?.charAt(0)}</div>
                            <div className="min-w-0">
                               <p className="font-semibold text-teal-900 truncate text-sm">{task.details?.studentName}</p>
                               <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest leading-none">Task #{task.details?.taskId}</p>
                            </div>
                         </div>
                         <button 
                            onClick={() => {
                               setGradingSubmission({ id: task.id, ...task.details });
                               setGradingScore('');
                               setGradingFeedback('');
                            }}
                            className="w-full py-3 bg-white border border-slate-200 text-[10px] font-semibold uppercase tracking-widest text-teal-600 rounded-xl hover:bg-teal-500 hover:text-white transition-all shadow-sm"
                          >
                            Grade Submission
                         </button>
                      </div>
                   ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                   <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">No pending tasks to grade</p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Grading Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button onClick={() => setGradingSubmission(null)} className="absolute top-8 right-8 text-slate-400 hover:text-rose-500 transition-colors text-2xl font-semibold">×</button>
              <h3 className="text-3xl font-semibold text-teal-900 tracking-tighter mb-2">Grade Work</h3>
              <p className="text-slate-500 font-medium text-sm mb-10">Reviewing {gradingSubmission.studentName}'s submission.</p>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mb-3 block">Points (0-100)</label>
                    <input 
                       type="number" 
                       value={gradingScore}
                       onChange={(e) => setGradingScore(e.target.value)}
                       className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-semibold text-teal-900 focus:outline-none focus:border-teal-500 transition-all"
                       placeholder="Enter score"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mb-3 block">Instructor Feedback</label>
                    <textarea 
                       rows="4"
                       value={gradingFeedback}
                       onChange={(e) => setGradingFeedback(e.target.value)}
                       className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-medium text-slate-700 focus:outline-none focus:border-teal-500 transition-all resize-none"
                       placeholder="Write constructive feedback..."
                    ></textarea>
                 </div>
                 <button 
                   onClick={handleGrade}
                   className="w-full py-5 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                 >
                   Submit Grade & Feedback
                 </button>
              </div>
           </div>
        </div>
      )}


    </div>
  )
}
