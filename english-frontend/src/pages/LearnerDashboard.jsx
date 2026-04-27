import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import apiClient from '../apiClient'
import StatCard from '../components/dashboard/StatCard'
import DashboardHeader from '../components/dashboard/DashboardHeader'

// Animated Progress Ring Component
function ProgressRing({ value = 0, size = 120, strokeWidth = 10, color = '#14b8a6' }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percent = Math.max(0, Math.min(100, value))
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-teal-600">{percent}%</span>
      </div>
    </div>
  )
}


// Course Card Component
function CourseCard({ course = {} }) {
  const { title, progress = 0, instructor, totalLessons, duration } = course;
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
          📚
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 truncate">{title || 'No Course'}</h4>
          {instructor && <p className="text-sm text-slate-500">by {instructor}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            {totalLessons && <span>📖 {totalLessons} lessons</span>}
            {duration && <span>⏱️ {duration}</span>}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Progress</span>
          <span className="text-xs font-bold text-cyan-600">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Empty State Component
function EmptyState({ icon, title, description, action, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 max-w-xs">{description}</p>
      {action && actionLink && (
        <Link to={actionLink} className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
          {action}
        </Link>
      )}
    </div>
  )
}



// Activity Item Component (Matching Progress Page Style)
const ActivityItemRow = ({ title, time, type, icon }) => (
  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform ${type === 'task' ? 'bg-amber-100 text-amber-600' :
        type === 'class' ? 'bg-teal-100 text-teal-600' :
          type === 'achievement' ? 'bg-indigo-100 text-indigo-600' :
            'bg-slate-100 text-slate-600'
      }`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0 pt-0.5">
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#334155', lineHeight: 1.4 }}>{title}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: '#94a3b8', marginTop: '2px' }}>{time}</p>
    </div>
  </div>
)

export default function LearnerDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [currentTime, setCurrentTime] = useState(new Date())




  const [srsStats, setSrsStats] = useState(null)
  const [dueWords, setDueWords] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true);
        const [dashboardRes, scheduleRes, srsStatsRes, dueWordsRes] = await Promise.all([
          apiClient.get('/dashboard/learner'),
          apiClient.get('/dashboard/learner-upcoming-schedule'),
          apiClient.get('/grammar/srs/stats'),
          apiClient.get('/grammar/srs/due')
        ]);
        if (mounted) {
          setData(dashboardRes.data);
          setSchedule(scheduleRes.data.slots || []);
          setSrsStats(srsStatsRes.data);
          setDueWords(dueWordsRes.data.due || []);
        }
      } catch (e) {
        console.error('Failed to load learner dashboard', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const greeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-10 selection:bg-teal-50">
      <DashboardHeader
        title="Learner Dashboard"
        subtitle={`${greeting()}, ${data?.profile?.name || 'Learner'}! Ready to continue your journey?`}
        stats={[
          { value: data?.profile?.streak || 0, label: 'Day Streak', icon: '🔥', textColor: 'text-teal-600', color: 'from-emerald-50 to-teal-50/30', borderColor: 'border-teal-100/50' },
          { value: (data?.profile?.xp || 0).toLocaleString(), label: 'Total XP', icon: '✨', textColor: 'text-rose-500', color: 'from-rose-50 to-pink-50/30', borderColor: 'border-rose-100/50' }
        ]}
      />

      <div className="px-8 mb-6">
        {/* Tabs Section */}
        <div className="flex items-center gap-8 -mb-px">
          {['overview', 'progress', 'schedule'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all capitalize ${activeTab === tab
                ? 'border-teal-500 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-lg">{tab === 'overview' ? '📊' : tab === 'progress' ? '📈' : '🗓️'}</span> {tab}
            </button>
          ))}
        </div>
      </div>

        <div className="container mx-auto px-8 pb-12">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Merged Stats Grid (Engagement + Academic) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon="📚"
                  label="Words Mastered"
                  value={srsStats?.masteryLevels?.mastered || 0}
                  subtitle={`${srsStats?.totalWords || 0} total in SRS`}
                />
                <StatCard
                  icon="🔥"
                  label="Streak Days"
                  value={`${data?.profile?.streak || 0}`}
                  subtitle=""
                  subtitleIcon=""
                />
                <StatCard
                  icon="🌟"
                  label="Total XP"
                  value={(data?.profile?.xp || 0).toLocaleString()}
                  subtitle=""
                />
                <StatCard
                  icon="🎯"
                  label="Accuracy Rate"
                  value={data?.quizzes?.averageScore ? `${Math.round(data.quizzes.averageScore)}%` : '0%'}
                  subtitle=""
                />
              </div>

              {/* Class Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                      🏢
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>{data?.classes?.length || 0}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Classes</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                      📹
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {data?.classes?.filter((c) => c.status === 'live').length || 0}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Now</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                      ⏱️
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {data?.classes?.filter((c) => c.status === 'upcoming').length || 0}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upcoming</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      ✅
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        {(data?.classes || []).reduce((sum, c) => sum + (c?.totalSessions || 0), 0) || 0}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Sessions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Upcoming Schedule [NEW] */}
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden group">
                    <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                       <div className="relative z-10">
                          <h2 className="text-2xl font-semibold text-teal-900 tracking-tighter flex items-center gap-3">
                             <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl">📅</span>
                             My Schedule
                          </h2>
                          <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest mt-1">Personalized Learning Timeline</p>
                       </div>
                    </div>
                    
                    <div className="divide-y divide-slate-50">
                      {schedule.length > 0 ? schedule.slice(0, 3).map(slot => (
                        <div key={slot.id} className="px-10 py-8 hover:bg-slate-50/50 transition-all">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-center gap-6">
                                 <div className="text-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm min-w-[80px]">
                                    <p className="text-sm font-semibold text-teal-600 leading-none">{new Date(slot.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">{new Date(slot.start_time).toLocaleDateString([], {weekday: 'short'})}</p>
                                 </div>
                                 <div className="flex-1">
                                    <h4 className="font-semibold text-teal-900 text-lg tracking-tight">Session with {slot.tutor?.name || 'Instructor'}</h4>
                                    <p className="text-xs font-medium text-slate-500">Live Interactive English Practice</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 {(slot.meet_link || slot.google_meet_link) ? (
                                   <a href={slot.meet_link || slot.google_meet_link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-semibold uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">Join Meet</a>
                                 ) : (
                                   <button className="px-6 py-3 bg-white border border-slate-100 text-[10px] font-semibold uppercase tracking-widest text-slate-400 rounded-2xl cursor-not-allowed">Waiting for Link</button>
                                 )}
                              </div>
                           </div>
                        </div>
                      )) : (
                        <div className="p-20 text-center">
                           <div className="text-5xl mb-4">🗓️</div>
                           <p className="font-semibold text-teal-900 text-xl tracking-tighter">No classes scheduled</p>
                           <p className="text-sm font-medium text-slate-400 mt-2">Connect with a tutor to book your first session!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Courses Section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase font-['Outfit']">My Courses</h2>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>Continue where you left off</p>
                        </div>
                        <Link to="/modules/learn-english" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d9488' }} className="flex items-center gap-1 group/link hover:text-teal-700">
                          View All <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      {data?.courses && data.courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.courses.slice(0, 4).map((course, i) => (
                            <CourseCard
                              key={course.id || i}
                              course={course}
                            />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon="📚"
                          title="No Courses Yet"
                          description="Explore our course catalog and start your learning journey"
                          action="Browse Courses"
                          actionLink="/modules/learn-english"
                        />
                      )}
                    </div>
                  </div>

                  {/* Live Classes */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0f172a', letterSpacing: '-0.02em' }}>Upcoming Classes</h2>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>Your scheduled live sessions</p>
                        </div>
                        <Link to="/learner/classes" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d9488' }} className="flex items-center gap-1 group/link hover:text-teal-700">
                          View All <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                    <div className="p-6">
                      {data?.classes && data.classes.length > 0 ? (
                        <div className="space-y-4">
                          {data.classes.slice(0, 3).map((cls, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ${cls.status === 'live' ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse' : 'bg-gradient-to-br from-teal-500 to-cyan-500'}`}>
                                {cls.status === 'live' ? '🔴' : '📅'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-800">{cls.title}</h4>
                                <p className="text-sm text-slate-500">{cls.teacher?.name || 'Instructor'}</p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {cls.status === 'live' ? '🔴 Live Now' : cls.nextSession?.startTime ? new Date(cls.nextSession.startTime).toLocaleString() : 'TBD'}
                                </p>
                              </div>
                              <Link
                                to={`/class/${cls.id}`}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${cls.status === 'live'
                                  ? 'bg-red-500 text-white hover:bg-red-600'
                                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                  }`}
                              >
                                {cls.status === 'live' ? 'Join Now' : 'Details'}
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon="📅"
                          title="No Upcoming Classes"
                          description="Browse available classes and enroll to see your schedule"
                          action="Browse Classes"
                          actionLink="/learner/browse"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Spaced Repetition Review */}
                  <div className='bg-white rounded-2xl p-6 border border-teal-100 shadow-sm'>
                    <h3 className='text-lg font-bold mb-1 flex items-center gap-2 text-slate-900'>
                      🔄 Spaced Repetition
                    </h3>
                    <p className='text-xs text-slate-500 mb-5 font-medium'>Words due for review today</p>

                    <div className='space-y-3'>
                      {dueWords.length > 0 ? (
                        dueWords.slice(0, 3).map((item, idx) => {
                          const now = new Date();
                          const nextReview = item.next_review_date ? new Date(item.next_review_date) : now;
                          const isDue = nextReview <= now;
                          const daysUntil = Math.ceil((nextReview - now) / (1000 * 60 * 60 * 24));

                          return (
                            <div
                              key={idx}
                              className='bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl p-4 border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all cursor-pointer group'
                            >
                              <div className='flex items-center justify-between'>
                                <div className='flex-1 pr-2'>
                                  <div className='font-bold text-[15px] text-slate-900 leading-tight'>{item.word?.word}</div>
                                  <div className='text-[11px] text-slate-500 mt-1 font-medium truncate max-w-[120px]'>{item.word?.lesson?.title || 'Vocabulary'}</div>
                                </div>
                                <div className='flex items-center gap-2'>
                                  <div className='text-center'>
                                    {isDue ? (
                                      <div className='px-3 py-1.5 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg font-bold text-white text-[10px] shadow-sm tracking-wide lowercase'>🔴 due now</div>
                                    ) : (
                                      <>
                                        <div className='text-[9px] text-slate-400 font-bold uppercase tracking-wider'>Due in</div>
                                        <div className='text-sm font-semibold text-teal-600 leading-none mt-0.5'>{daysUntil}d</div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-xs font-semibold text-slate-400">All caught up! 🎉</p>
                        </div>
                      )}
                      <Link 
                        to="/learner/srs-review" 
                        className={`w-full mt-2 py-3 flex items-center justify-center bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl font-bold text-sm transition-colors border border-teal-200 ${dueWords.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {dueWords.length > 0 ? `Start Review Session (${dueWords.length})` : 'Start Review Session'}
                      </Link>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0f172a', letterSpacing: '-0.01em' }}>Quick Actions</h2>
                    </div>
                    <div className="p-4 space-y-2">
                      <Link to="/modules/grammar-hub" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📚</div>
                      <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#334155' }}>Grammar Hub</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, color: '#94a3b8' }}>Lessons & Quizzes</p>
                      </div>
                    </Link>
                    <Link to="/learner/browse" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🔍</div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#334155' }}>Browse Classes</p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, color: '#94a3b8' }}>Find new courses</p>
                        </div>
                      </Link>
                      <Link to="/learner/tasks" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📋</div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#334155' }}>My Tasks</p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, color: '#94a3b8' }}>{data?.tasks?.pending || 0} pending</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Academic Stats Grid - 4 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Accuracy Rate', value: `${Math.round(data?.quizzes?.averageScore || 0)}%`, sub: `${data?.quizzes?.totalAttempts || 0} quizzes taken`, icon: '🎯', color: 'emerald' },
                  { label: 'Attendance Rate', value: `${data?.attendance?.percent || 0}%`, sub: `${data?.attendance?.present || 0} days present`, icon: '📊', color: 'blue' },
                  { label: 'Tasks Completed', value: `${data?.tasks?.submitted || 0}/${data?.tasks?.assigned || 0}`, sub: `${data?.tasks?.completion || 0}% rate`, icon: '✅', color: 'violet' },
                  { label: 'Courses Active', value: data?.courses?.length || 0, sub: 'Keep learning', icon: '📖', color: 'rose' }
                ].map((stat, i) => (
                  <div key={i} className="group relative bg-white rounded-xl p-5 border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color === 'emerald' ? 'from-emerald-500 to-teal-400' : stat.color === 'blue' ? 'from-blue-500 to-cyan-400' : stat.color === 'violet' ? 'from-violet-500 to-purple-400' : 'from-rose-500 to-pink-400'}`} />
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h3>
                    <div className="text-2xl font-semibold text-slate-800 tracking-tight">{stat.value}</div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wide">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Academic Tasks */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <div>
                        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0f172a' }}>Academic Tasks</h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">{data?.tasks?.pending > 0 ? `${data.tasks.pending} pending` : 'All caught up!'}</p>
                      </div>
                      <Link to="/learner/tasks" className="text-teal-600 text-sm font-bold hover:underline">View All →</Link>
                    </div>
                    <div className="p-6">
                      {data?.recentTasks && data.recentTasks.length > 0 ? (
                        <div className="space-y-3">
                          {data.recentTasks.slice(0, 5).map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${task.status === 'submitted' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                                  {task.status === 'submitted' ? '✅' : '📋'}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-700 text-sm group-hover:text-teal-600 transition-colors">{task.title}</p>
                                  <p className="text-[11px] text-slate-400 font-medium">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${task.status === 'submitted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {task.status?.replace('_', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptyState icon="📋" title="No Tasks" description="Assigned tasks will appear here" />
                      )}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-800">Recent Activity & Logs</h2>
                    </div>
                    <div className="p-6">
                      {data?.recentActivity?.length > 0 ? (
                        <div className="space-y-1">
                          {data.recentActivity.slice(0, 5).map((activity, i) => (
                            <ActivityItemRow key={i} {...activity} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <span className="text-4xl mb-3 block opacity-30">📂</span>
                          <p className="text-sm text-slate-400 font-medium">No recent activity logs found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Progress Ring Card */}
                  <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
                    <h3 className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-widest">Progress Overview</h3>
                    <div className="flex justify-center">
                      <ProgressRing value={data?.attendance?.percent || 0} size={160} strokeWidth={14} />
                    </div>
                    <p className="text-sm font-bold text-slate-600 mt-6">Overall Learning Progress</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Based on attendance & completions</p>
                  </div>

                  {/* Achievements Card */}
                  <div className="bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-3xl p-6 text-white text-center shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 border-b border-white/20 pb-4">Your Achievements</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: '🏆', label: 'Trophies', val: data?.achievements?.trophies || 0 },
                          { icon: '🔥', label: 'Days', val: data?.achievements?.streak || 0 },
                          { icon: '✨', label: 'XP', val: (data?.profile?.xp || 0).toLocaleString() }
                        ].map((ach, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                            <span className="text-2xl mb-1 block">{ach.icon}</span>
                            <p className="text-sm font-semibold">{ach.val}</p>
                            <p className="text-[9px] font-bold uppercase opacity-60">{ach.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] font-medium text-white/70 mt-6 px-2 italic">"Your potential is endless. Go do what you were created to do."</p>
                      <Link to="/learner/certificates" className="w-full mt-6 py-3 flex items-center justify-center bg-white text-indigo-600 rounded-xl font-semibold text-[11px] uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg active:scale-95">
                        Explore Badge Collection
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Class Schedule</h2>
                  <p className="text-slate-500 font-medium">Your upcoming sessions with instructors</p>
                </div>
                <div className="p-8">
                  {data?.classes && data.classes.length > 0 ? (
                    <div className="space-y-6">
                      {data.classes.map((cls, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-6 border border-slate-100 rounded-2xl hover:border-teal-200 transition-colors">
                          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex flex-col items-center justify-center text-teal-600">
                            <span className="text-xs font-semibold uppercase tracking-tighter">Day</span>
                            <span className="text-2xl font-semibold">{new Date(cls.nextSession?.startTime).getDate()}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {cls.status === 'live' && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-semibold rounded-lg animate-pulse">LIVE NOW</span>}
                              <span className="text-xs font-bold text-slate-400">{cls.title}</span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-1">{cls.title}</h4>
                            <p className="text-slate-500 text-sm">{cls.teacher?.name} • {new Date(cls.nextSession?.startTime).toLocaleTimeString()}</p>
                          </div>
                          <Link to={`/class/${cls.id}`} className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-500/20">
                            Join Session
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500">No classes scheduled.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
