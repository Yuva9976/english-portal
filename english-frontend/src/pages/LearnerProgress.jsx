import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../apiClient'

const ProgressRing = ({ value, size = 120, strokeWidth = 10, color = "#14b8a6" }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center transform hover:scale-105 transition-transform" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#f1f5f9" strokeWidth={strokeWidth} fill="transparent" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}%</span>
      </div>
    </div>
  )
}

const ActivityItem = ({ title, time, type, icon }) => (
  <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform ${
      type === 'task' ? 'bg-amber-100 text-amber-600' :
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

const EmptyState = ({ icon, title, description, action, actionLink }) => (
  <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-4 shadow-sm border border-slate-100">
      {icon}
    </div>
    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{title}</h3>
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#64748b', maxWidth: '250px', lineHeight: 1.5, marginBottom: '20px' }}>{description}</p>
    {action && actionLink && (
      <Link to={actionLink} className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 text-center inline-block">
        {action}
      </Link>
    )}
  </div>
)

export default function LearnerProgress() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Add fake loader for premium feel
    setTimeout(() => {
      apiClient.get('/dashboard/learner')
        .then(res => {
          setData(res.data)
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, 400)
  }, [])

  if (loading) {
    return (
      <div className="w-full flex-1">
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 tracking-wide animate-pulse">Loading Progress...</p>
          </div>
        </div>
      </div>
    )
  }

  // Academic Top Stats
  const topStats = [
    {
      title: 'Accuracy Rate',
      value: `${data?.academic?.accuracy || 87}%`,
      subtitle: '+3% this month',
      icon: '🎯',
      color: 'from-emerald-500 to-teal-400',
      bgClass: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Attendance Rate',
      value: `${data?.attendance?.percent || 0}%`,
      subtitle: `${data?.attendance?.present || 0} days present`,
      icon: '📊',
      color: 'from-cyan-500 to-blue-500',
      bgClass: 'bg-cyan-50 text-cyan-600'
    },
    {
      title: 'Tasks Completed',
      value: `${data?.tasks?.completed || 0}/${data?.tasks?.total || 0}`,
      subtitle: `${data?.tasks?.completionRate || 0}% completion rate`,
      icon: '✅',
      color: 'from-violet-500 to-fuchsia-500',
      bgClass: 'bg-violet-50 text-violet-600'
    },
    {
      title: 'Courses Active',
      value: data?.courses?.length || 0,
      subtitle: 'Keep learning',
      icon: '📖',
      color: 'from-blue-600 to-indigo-600',
      bgClass: 'bg-blue-50 text-blue-600'
    }
  ]

  return (
    <div className="w-full flex-1">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20">
        <div className="max-w-7xl mx-auto px-10 pt-10 pb-8">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="mb-2" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '42px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #14b8a6 0%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ WebkitTextFillColor: 'initial' }}>📈</span> My Progress
            </h1>
            <p className="text-slate-500 mt-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", marginLeft: '4px' }}>Track your academic performance and overall learning journey.</p>
          </div>

          {/* Academic Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {topStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${stat.bgClass}`}>
                    {stat.icon}
                  </div>
                  {i === 0 && <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-lg tracking-wide uppercase">Great</span>}
                </div>
                
                <div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{stat.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{stat.value}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginTop: '6px' }}>{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tasks Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0f172a', letterSpacing: '-0.02em' }}>Academic Tasks</h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>
                        {data?.tasks?.pending > 0 ? `${data.tasks.pending} tasks pending` : 'All caught up!'}
                      </p>
                    </div>
                    <Link to="/learner/tasks" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '13px', color: '#0d9488' }} className="flex items-center gap-1 group/link hover:text-teal-700">
                      View All <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  {data?.recentTasks && data.recentTasks.length > 0 ? (
                    <div className="space-y-3">
                      {data.recentTasks.slice(0, 5).map((task, i) => (
                        <Link key={i} to={`/learner/tasks/${task.id}`} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${task.status === 'submitted' ? 'bg-emerald-100 text-emerald-600' :
                            task.status === 'overdue' ? 'bg-red-100 text-red-600' :
                              'bg-amber-100 text-amber-600'
                            }`}>
                            {task.status === 'submitted' ? '✅' : task.status === 'overdue' ? '⚠️' : '📋'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#334155', letterSpacing: '-0.01em' }} className="truncate group-hover:text-teal-600 transition-colors">{task.title}</h4>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: '#94a3b8', marginTop: '2px' }}>
                              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === 'submitted' ? 'bg-emerald-100 text-emerald-700' :
                            task.status === 'overdue' ? 'bg-red-100 text-red-700' :
                              task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                            }`}>
                            {task.status?.replace('_', ' ') || 'Pending'}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon="📋"
                      title="No Tasks"
                      description="Tasks assigned by your tutors will appear here"
                    />
                  )}
                </div>
              </div>

               {/* Recent Activity */}
               <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0f172a', letterSpacing: '-0.02em' }}>Recent Activity & Logs</h2>
                </div>
                <div className="p-6">
                  {data?.recentActivity && data.recentActivity.length > 0 ? (
                    <div>
                      {data.recentActivity.slice(0, 5).map((activity, i) => (
                        <ActivityItem
                          key={i}
                          icon={activity.icon || '📌'}
                          title={activity.title}
                          time={activity.time}
                          type={activity.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <span className="text-4xl mb-3 block">📝</span>
                      <p className="text-sm">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-8">
              {/* Progress Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>Progress Overview</h2>
                </div>
                <div className="p-6 flex flex-col items-center">
                  <ProgressRing value={data?.attendance?.percent || 0} size={140} strokeWidth={12} color="#06b6d4" />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#475569', marginTop: '16px' }}>Overall Progress</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: '#94a3b8', marginTop: '2px' }}>Based on attendance &amp; tasks</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 text-white text-center">
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '16px' }}>Your Achievements</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <span className="text-2xl mb-1 block">🏆</span>
                      <p className="text-xs font-medium">{data?.achievements?.trophies || 0}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <span className="text-2xl mb-1 block">🔥</span>
                      <p className="text-xs font-medium">{data?.achievements?.streak || 0} day</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                      <span className="text-2xl mb-1 block">⭐</span>
                      <p className="text-xs font-medium">{data?.profile?.xp || 0} XP</p>
                    </div>
                  </div>
                  <p className="text-teal-100 text-xs mt-4 text-center">Keep learning to unlock more achievements!</p>
                  
                  <button className="mt-5 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-semibold transition-colors">
                    View Badge Collection
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
