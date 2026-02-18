import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LearnerLayout from '../layouts/LearnerLayout'
import apiClient from '../apiClient'

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

// Stat Card Component
function StatCard({ icon, label, value, subtitle, color = 'cyan', trend }) {
  const colorClasses = {
    cyan: 'from-teal-500 to-cyan-500',
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-yellow-500',
    emerald: 'from-emerald-500 to-teal-500',
    rose: 'from-rose-500 to-pink-500',
    blue: 'from-blue-500 to-cyan-500'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white text-xl shadow-md`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

// Course Card Component
function CourseCard({ title, progress = 0, instructor, lessons, duration }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
          📚
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 truncate">{title || 'No Course'}</h4>
          {instructor && <p className="text-sm text-slate-500">by {instructor}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            {lessons && <span>📖 {lessons} lessons</span>}
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

// Activity Item Component
function ActivityItem({ icon, title, time, type }) {
  const typeColors = {
    success: 'bg-emerald-100 text-emerald-600',
    warning: 'bg-amber-100 text-amber-600',
    info: 'bg-blue-100 text-blue-600',
    default: 'bg-slate-100 text-slate-600'
  }

  return (
    <div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
      <div className={`w-10 h-10 rounded-full ${typeColors[type] || typeColors.default} flex items-center justify-center text-lg`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">{title}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
    </div>
  )
}

export default function LearnerDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        setLoading(true)
        const res = await apiClient.get('/dashboard/learner')
        if (!mounted) return
        setData(res.data)
      } catch (e) {
        console.error('Failed to load learner dashboard', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const greeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </LearnerLayout>
    )
  }

  return (
    <LearnerLayout>
      <div>
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {greeting()}, <span className="text-teal-600">{data?.profile?.name || 'Learner'}</span>! 👋
              </h1>
              <p className="text-slate-500 mt-1">{formatDate()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/learner/browse" className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-slate-700 hover:border-teal-400 hover:shadow transition-all flex items-center gap-2">
                <span>🔍</span> Browse
              </Link>
              <Link to="/learner/classes" className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
                <span>📚</span> My Classes
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="📊"
            label="Attendance Rate"
            value={`${data?.attendance?.percent || 0}%`}
            subtitle={`${data?.attendance?.present || 0} days present`}
            color="cyan"
          />
          <StatCard
            icon="✅"
            label="Tasks Completed"
            value={`${data?.tasks?.submitted || 0}/${data?.tasks?.assigned || 0}`}
            subtitle={`${data?.tasks?.completion || 0}% completion rate`}
            color="emerald"
          />
          <StatCard
            icon="🎯"
            label="Quiz Average"
            value={data?.quizzes?.averageScore ? `${Math.round(data.quizzes.averageScore)}%` : '—'}
            subtitle={`${data?.quizzes?.totalAttempts || 0} quizzes taken`}
            color="violet"
          />
          <StatCard
            icon="⭐"
            label="Experience Points"
            value={data?.profile?.xp || 0}
            subtitle={`Level: ${data?.profile?.level || 'Beginner'}`}
            color="amber"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">My Courses</h2>
                    <p className="text-sm text-slate-500 mt-1">Continue where you left off</p>
                  </div>
                  <Link to="/modules/learn-english" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    View All <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {data?.courses && data.courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.courses.slice(0, 4).map((course, i) => (
                      <CourseCard
                        key={i}
                        title={course.title}
                        progress={course.progress || 0}
                        instructor={course.instructor}
                        lessons={course.totalLessons}
                        duration={course.duration}
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
                    <h2 className="text-lg font-bold text-slate-800">Upcoming Classes</h2>
                    <p className="text-sm text-slate-500 mt-1">Your scheduled live sessions</p>
                  </div>
                  <Link to="/learner/classes" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    View All <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {data?.classes && data.classes.length > 0 ? (
                  <div className="space-y-4">
                    {data.classes.slice(0, 3).map((cls, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg ${
                          cls.status === 'live' ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse' : 'bg-gradient-to-br from-teal-500 to-cyan-500'
                        }`}>
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
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                            cls.status === 'live' 
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

            {/* Tasks Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Recent Tasks</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {data?.tasks?.pending > 0 ? `${data.tasks.pending} tasks pending` : 'All caught up!'}
                    </p>
                  </div>
                  <Link to="/learner/tasks" className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    View All <span>→</span>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {data?.recentTasks && data.recentTasks.length > 0 ? (
                  <div className="space-y-3">
                    {data.recentTasks.slice(0, 5).map((task, i) => (
                      <Link key={i} to={`/learner/tasks/${task.id}`} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                          task.status === 'submitted' ? 'bg-emerald-100 text-emerald-600' :
                          task.status === 'overdue' ? 'bg-red-100 text-red-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {task.status === 'submitted' ? '✅' : task.status === 'overdue' ? '⚠️' : '📋'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-800 group-hover:text-cyan-600 transition-colors truncate">{task.title}</h4>
                          <p className="text-xs text-slate-400">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'submitted' ? 'bg-emerald-100 text-emerald-700' :
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
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">Progress Overview</h2>
              </div>
              <div className="p-6 flex flex-col items-center">
                <ProgressRing value={data?.attendance?.percent || 0} size={140} strokeWidth={12} color="#06b6d4" />
                <p className="text-sm font-medium text-slate-600 mt-4">Overall Progress</p>
                <p className="text-xs text-slate-400">Based on attendance & tasks</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-2">
                <Link to="/learner/browse" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🔍</div>
                  <div>
                    <p className="font-medium text-slate-700">Browse Classes</p>
                    <p className="text-xs text-slate-400">Find new courses</p>
                  </div>
                </Link>
                <Link to="/learner/tasks" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📋</div>
                  <div>
                    <p className="font-medium text-slate-700">My Tasks</p>
                    <p className="text-xs text-slate-400">{data?.tasks?.pending || 0} pending</p>
                  </div>
                </Link>
                <Link to="/modules/learn-english" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📖</div>
                  <div>
                    <p className="font-medium text-slate-700">Learn English</p>
                    <p className="text-xs text-slate-400">Grammar & vocabulary</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
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

            {/* Achievements */}
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 text-white">
                <h2 className="text-lg font-bold mb-4">Your Achievements</h2>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </LearnerLayout>
  )
}
