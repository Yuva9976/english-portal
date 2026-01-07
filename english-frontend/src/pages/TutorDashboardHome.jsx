import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TutorDashboardLayout from '../components/TutorDashboardLayout'
import apiClient from '../apiClient'

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
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
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

  useEffect(() => {
    mountedRef.current = true
    fetchOverview()
    return () => {
      mountedRef.current = false
    }
  }, [fetchOverview])

  const todayClasses = overview?.today?.classes ?? []
  const stats = overview?.stats ?? {}
  const recentResources = overview?.recentResources ?? []
  const notifications = overview?.notifications ?? []
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
    { label: 'Resources Shared', value: stats.resourcesShared ?? 0, icon: '📁', color: 'from-amber-400 to-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', trend: '+3' },
  ]

  // Get user name from localStorage
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userName = user?.name || 'Teacher'
  const firstName = userName.split(' ')[0]

  return (
    <TutorDashboardLayout>
      <div className='space-y-8'>
        {/* Welcome Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-teal-100 text-sm font-medium mb-1">Welcome back,</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Good Morning, {firstName}! 👋</h1>
                <p className="text-teal-100">
                  You have <span className="text-white font-semibold">{todayClasses.length} classes</span> scheduled for today
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl">
                  📅 View Schedule
                </button>
                <button className="px-5 py-2.5 bg-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30">
                  ➕ New Class
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className='rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-white px-5 py-4 shadow-sm flex items-center justify-between gap-4'>
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <span className="text-rose-700 font-medium">{error}</span>
            </div>
            <button
              type='button'
              onClick={fetchOverview}
              className='px-4 py-2 text-rose-600 font-semibold hover:text-rose-700 focus:outline-none bg-rose-100 rounded-lg hover:bg-rose-200 transition-colors'
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {isInitialLoad ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SectionSkeleton key={`stat-skel-${index}`} className='h-32' />
            ))
          ) : (
            statsCards.map((stat) => (
              <div key={stat.label} className={`${stat.bg} ${stat.border} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{stat.trend}</span>
                </div>
                <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-2xl">📅</span> Today's Schedule
                  </h2>
                  <p className="text-sm text-slate-500">Your upcoming classes for today</p>
                </div>
                {loading && <span className="text-sm text-teal-600 animate-pulse">Refreshing...</span>}
              </div>
            </div>
            {isInitialLoad ? (
              <div className="p-6">
                <SectionSkeleton className='h-32' />
              </div>
            ) : todayClasses.length ? (
              <div className="divide-y divide-slate-100">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="px-6 py-4 hover:bg-teal-50/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="text-center min-w-[80px] px-3 py-2 bg-teal-50 rounded-xl border border-teal-100">
                        <p className="text-sm font-bold text-teal-600">{formatTime(cls.startTime)}</p>
                        <p className="text-xs text-teal-500">{formatTime(cls.endTime)}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600 mb-0.5">
                          {cls.level || 'Level TBD'}
                        </p>
                        <p className="font-semibold text-slate-800">{cls.title}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                          cls.status === 'live' 
                            ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white animate-pulse' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cls.status === 'live' ? '● LIVE' : cls.status}
                        </span>
                        <button className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-200 rounded-xl hover:bg-teal-50 transition-all">
                          {cls.status === 'live' ? 'Join Now' : 'Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='p-8 text-center'>
                <div className="text-5xl mb-3">📚</div>
                <p className='text-slate-600 font-medium'>No classes scheduled for today</p>
                <p className='text-sm text-slate-400'>Enjoy your free time!</p>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-teal-500 to-rose-400 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>⚡</span> Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-all text-left flex items-center gap-3 border border-white/20">
                  <span>📝</span> Create New Quiz
                </button>
                <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-all text-left flex items-center gap-3 border border-white/20">
                  <span>📤</span> Upload Resource
                </button>
                <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-all text-left flex items-center gap-3 border border-white/20">
                  <span>💬</span> Message Students
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-lg">🔔</span> Notifications
                </h3>
              </div>
              {isInitialLoad ? (
                <div className="p-4">
                  <SectionSkeleton className='h-20' />
                </div>
              ) : notifications.length ? (
                <div className="divide-y divide-slate-100">
                  {notifications.slice(0, 4).map((note) => (
                    <div key={note.id} className="px-5 py-3.5 hover:bg-teal-50/50 transition-colors">
                      <p className="text-sm text-slate-700 font-medium">{note.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatDate(note.createdAt)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-center text-slate-500 text-sm">
                  ✅ You're all caught up!
                </div>
              )}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                <button className="text-sm font-medium text-teal-600 hover:text-teal-700 w-full text-center">View All Notifications</button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Resources */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>📁</span> Recent Resources
              </h2>
            </div>
            {isInitialLoad ? (
              <div className="p-5">
                <SectionSkeleton className='h-24' />
              </div>
            ) : recentResources.length ? (
              <div className="divide-y divide-slate-100">
                {recentResources.map((resource) => {
                  const resourceType = resource.type ? resource.type.toUpperCase() : 'RESOURCE'
                  return (
                    <div key={resource.id} className="px-6 py-4 hover:bg-teal-50/50 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center text-lg border border-teal-200">
                            📄
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800">{resource.title}</h3>
                            <p className="text-xs text-teal-600 font-medium">{resourceType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-500">{resource.views ?? 0} views</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-slate-500 text-sm">No resources shared yet</p>
              </div>
            )}
          </div>

          {/* Quiz Submissions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>📝</span> Quiz Submissions
                </h2>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">Live</span>
              </div>
            </div>
            {isInitialLoad ? (
              <div className="p-5">
                <SectionSkeleton className='h-24' />
              </div>
            ) : quizSubmissions.length ? (
              <div className="divide-y divide-slate-100">
                {quizSubmissions.map((submission) => (
                  <div key={submission.id} className="px-6 py-4 hover:bg-teal-50/50 transition-colors">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-sm font-semibold text-rose-600 border border-rose-200">
                          {submission.studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{submission.studentName}</p>
                          <p className="text-xs text-slate-500">{submission.quizName}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-teal-600">{submission.scoreLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-slate-500 text-sm">No recent quiz submissions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </TutorDashboardLayout>
  )
}
