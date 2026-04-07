import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

// Priority Badge Component
function PriorityBadge({ priority }) {
  const colors = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-blue-100 text-blue-600',
    high: 'bg-amber-100 text-amber-600',
    urgent: 'bg-rose-100 text-rose-600'
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[priority] || colors.medium}`}>
      {priority?.charAt(0).toUpperCase() + priority?.slice(1)}
    </span>
  )
}

// Status Badge Component
function StatusBadge({ status }) {
  const config = {
    pending: { color: 'bg-slate-100 text-slate-600', icon: '⏳', label: 'Pending' },
    in_progress: { color: 'bg-blue-100 text-blue-600', icon: '🔄', label: 'In Progress' },
    submitted: { color: 'bg-emerald-100 text-emerald-600', icon: '✅', label: 'Submitted' },
    graded: { color: 'bg-violet-100 text-violet-600', icon: '⭐', label: 'Graded' },
    returned: { color: 'bg-amber-100 text-amber-600', icon: '↩️', label: 'Returned' },
    overdue: { color: 'bg-rose-100 text-rose-600', icon: '⚠️', label: 'Overdue' },
    not_started: { color: 'bg-slate-100 text-slate-600', icon: '📝', label: 'Not Started' }
  }

  const { color, icon, label } = config[status] || config.pending

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      <span>{icon}</span> {label}
    </span>
  )
}

// Type Badge Component
function TypeBadge({ type }) {
  const config = {
    assignment: { color: 'bg-teal-50 text-teal-700 border-teal-200', icon: '📋' },
    homework: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '📚' },
    project: { color: 'bg-violet-50 text-violet-700 border-violet-200', icon: '🎯' },
    practice: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '✏️' },
    quiz: { color: 'bg-rose-50 text-rose-700 border-rose-200', icon: '❓' }
  }

  const { color, icon } = config[type] || config.assignment

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-medium ${color}`}>
      <span>{icon}</span> {type?.charAt(0).toUpperCase() + type?.slice(1)}
    </span>
  )
}

// Stats Card Component
function StatsCard({ icon, label, value, color, onClick, active }) {
  const gradientMap = {
    slate: 'from-slate-500 to-slate-600',
    blue: 'from-teal-500 to-teal-600',
    emerald: 'from-emerald-500 to-teal-600',
    violet: 'from-amber-500 to-yellow-600',
    rose: 'from-rose-500 to-pink-600',
    cyan: 'from-teal-500 to-emerald-500',
    amber: 'from-amber-500 to-orange-500'
  }

  const bgLightMap = {
    slate: 'bg-slate-50 border-slate-200',
    blue: 'bg-teal-50 border-teal-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    violet: 'bg-amber-50 border-amber-200',
    rose: 'bg-rose-50 border-rose-200',
    cyan: 'bg-teal-50 border-teal-200',
    amber: 'bg-amber-50 border-amber-200'
  }

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl p-3.5 transition-all duration-300 hover:scale-105 hover:shadow-lg text-left w-full border-2 ${active
        ? `bg-gradient-to-br ${gradientMap[color]} text-white shadow-lg`
        : `bg-white ${bgLightMap[color]} hover:shadow-md`
        }`}
    >
      <div className="flex items-center gap-2.5">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${active
          ? 'bg-white/20 backdrop-blur-sm'
          : `bg-gradient-to-br ${gradientMap[color]} text-white shadow-md`
          }`}>
          {icon}
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontBlack: true, color: active ? 'rgba(255,255,255,0.85)' : '#94a3b8', textTransform: 'uppercase', tracking: '0.05em', marginTop: '1px' }}>{label}</p>
        </div>
      </div>
      {active && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
      )}
    </button>
  )
}

// Task Card Component
function TaskCard({ task, onStart, onView }) {
  const dueDate = task.dueDate ? new Date(task.dueDate) : null
  const now = new Date()
  const isOverdue = dueDate && dueDate < now && !['submitted', 'graded'].includes(task.taskStatus)
  const daysUntilDue = dueDate ? Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24)) : null

  const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const typeGradients = {
    assignment: 'from-teal-500 to-emerald-600',
    homework: 'from-amber-500 to-orange-600',
    project: 'from-violet-500 to-purple-600',
    practice: 'from-emerald-500 to-teal-600',
    quiz: 'from-rose-500 to-pink-600'
  }

  return (
    <div className={`group bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isOverdue ? 'border-rose-200' : 'border-slate-50'
      }`}>
      {/* Top Gradient Border */}
      <div className={`h-1 bg-gradient-to-r ${typeGradients[task.type] || typeGradients.assignment}`}></div>

      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <TypeBadge type={task.type} />
          </div>
          <StatusBadge status={task.taskStatus} />
        </div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '20px', color: '#0f172a', lineHeight: 1.2, letterSpacing: '-0.02em' }} className="group-hover:text-teal-600 transition-colors line-clamp-1 uppercase">
          {task.title}
        </h3>
      </div>

      <div className="px-8 py-6">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: '#64748b', lineHeight: 1.6 }} className="line-clamp-2 mb-6 min-h-[44px]">
          {task.description || 'No description provided'}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="text-[12px]">👤</div>
            <div className="min-w-0 flex-1">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#1e293b' }} className="truncate">Teacher</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="text-[12px]">🏫</div>
            <div className="min-w-0 flex-1">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Class</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#1e293b' }} className="truncate">General</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="text-[12px]">📅</div>
            <div className="min-w-0 flex-1">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deadline</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: isOverdue ? '#e11d48' : '#1e293b' }} className="truncate">
                {formatDate(task.dueDate).split(',')[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
            <div className="text-[12px]">🎯</div>
            <div className="min-w-0 flex-1">
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Points</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>{task.maxPoints} pts</p>
            </div>
          </div>
        </div>

        {/* Due Date Warning */}
        {dueDate && !['submitted', 'graded'].includes(task.taskStatus) && (
          <div className={`rounded-xl p-2.5 mb-3 flex items-center gap-2 ${isOverdue ? 'bg-rose-50 text-rose-700' :
            daysUntilDue <= 1 ? 'bg-amber-50 text-amber-700' :
                'bg-emerald-50 text-emerald-700'
            }`}>
            <span className="text-sm">
              {isOverdue ? '⚠️' : daysUntilDue === 0 ? '🔥' : '📆'}
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wide">
              {isOverdue ? (
                <>Overdue by {Math.abs(daysUntilDue)}d</>
              ) : daysUntilDue === 0 ? (
                <>Due today!</>
              ) : (
                <>Due in {daysUntilDue}d</>
              )}
            </p>
          </div>
        )}

        {/* Submission Info */}
        {task.submission && (
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-black uppercase tracking-wider">
                {task.submission.status === 'graded' ? '🌟 Score' : '📤 Submitted'}
              </span>
              <span className="font-black text-slate-900 tracking-tight">
                {task.submission.status === 'graded'
                  ? `${task.submission.pointsEarned}/${task.maxPoints} pts`
                  : formatDate(task.submission.submittedAt)
                }
              </span>
            </div>
            {task.submission.isLate && (
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <span>⚠️</span> Submitted late
              </p>
            )}
            {task.submission.feedback && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1 font-medium">Feedback:</p>
                <p className="text-sm text-slate-700 bg-white p-2 rounded-lg">{task.submission.feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-50">
        {task.taskStatus === 'pending' || task.taskStatus === 'overdue' ? (
          <button
            onClick={() => onStart(task.id)}
            className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all active:scale-95"
          >
            Start Task
          </button>
        ) : task.taskStatus === 'in_progress' ? (
          <button
            onClick={() => onView(task.id)}
            className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20 rounded-lg font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all"
          >
            Submit Work
          </button>
        ) : (
          <button
            onClick={() => onView(task.id)}
            className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-black text-[10px] uppercase tracking-widest hover:border-teal-400 transition-all"
          >
            Review Task
          </button>
        )}
      </div>
    </div>
  )
}

// Empty State Component
function EmptyState({ filter, onClear }) {
  const messages = {
    pending: { icon: '✅', title: 'No pending tasks', desc: 'You\'re all caught up! Check other tabs for more tasks.', color: 'from-emerald-500 to-teal-500' },
    in_progress: { icon: '🎯', title: 'No tasks in progress', desc: 'Start a task to see it here.', color: 'from-teal-500 to-emerald-500' },
    submitted: { icon: '📤', title: 'No submitted tasks', desc: 'Complete and submit tasks to see them here.', color: 'from-teal-500 to-cyan-500' },
    graded: { icon: '⭐', title: 'No graded tasks yet', desc: 'Your graded submissions will appear here.', color: 'from-amber-500 to-orange-500' },
    overdue: { icon: '🎉', title: 'No overdue tasks', desc: 'Great job staying on top of your deadlines!', color: 'from-emerald-500 to-teal-500' },
    all: { icon: '📋', title: 'No tasks yet', desc: 'Tasks assigned by your teachers will appear here.', color: 'from-teal-500 to-emerald-600' }
  }

  const { icon, title, desc, color } = messages[filter] || messages.all

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">{desc}</p>
      {filter !== 'all' && (
        <button
          onClick={onClear}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-lg text-white rounded-xl font-semibold transition-all"
        >
          View All Tasks
        </button>
      )}
    </div>
  )
}

export default function LearnerTasks() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('due_date')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get('/tasks/my')
      setTasks(res.data.tasks || [])
      setStats(res.data.stats || {})
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStart = async (taskId) => {
    try {
      await apiClient.post(`/tasks/${taskId}/start`)
      // Navigate to task detail page
      navigate(`/learner/tasks/${taskId}`)
    } catch (error) {
      console.error('Failed to start task:', error)
    }
  }

  const handleView = (taskId) => {
    navigate(`/learner/tasks/${taskId}`)
  }

  // Filter and search tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter !== 'all' && task.taskStatus !== filter) return false
      if (typeFilter !== 'all' && task.type !== typeFilter) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.assignedBy?.name?.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'due_date') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'priority') {
        const order = { urgent: 0, high: 1, medium: 2, low: 3 }
        return (order[a.priority] || 2) - (order[b.priority] || 2)
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  if (loading) {
    return (
      <div className="w-full flex-1">
        <div className="flex-1 flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Loading your tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex-1">
      <div className="pt-10 pl-10 pr-10 pb-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
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
                <span style={{ WebkitTextFillColor: 'initial' }}>📋</span> My Tasks
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px', color: '#64748b', marginLeft: '4px' }}>Track and complete your assigned tasks</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64 shadow-sm"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatsCard
            icon="📋"
            label="Total"
            value={stats.total || 0}
            color="slate"
            onClick={() => setFilter('all')}
            active={filter === 'all'}
          />
          <StatsCard
            icon="⏳"
            label="Pending"
            value={stats.pending || 0}
            color="cyan"
            onClick={() => setFilter('pending')}
            active={filter === 'pending'}
          />
          <StatsCard
            icon="🔄"
            label="In Progress"
            value={stats.inProgress || 0}
            color="cyan"
            onClick={() => setFilter('in_progress')}
            active={filter === 'in_progress'}
          />
          <StatsCard
            icon="✅"
            label="Submitted"
            value={stats.submitted || 0}
            color="emerald"
            onClick={() => setFilter('submitted')}
            active={filter === 'submitted'}
          />
          <StatsCard
            icon="⭐"
            label="Graded"
            value={stats.graded || 0}
            color="amber"
            onClick={() => setFilter('graded')}
            active={filter === 'graded'}
          />
          <StatsCard
            icon="⚠️"
            label="Overdue"
            value={stats.overdue || 0}
            color="rose"
            onClick={() => setFilter('overdue')}
            active={filter === 'overdue'}
          />
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#475569' }}>Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#334155' }}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="assignment">📋 Assignment</option>
                <option value="homework">📚 Homework</option>
                <option value="project">🎯 Project</option>
                <option value="practice">✏️ Practice</option>
                <option value="quiz">❓ Quiz</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#475569' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#334155' }}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="due_date">Due Date</option>
                <option value="priority">Priority</option>
                <option value="created">Recently Added</option>
              </select>
            </div>
            <div className="flex-1"></div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#64748b' }} className="bg-slate-50 px-4 py-2 rounded-lg">
              Showing <span style={{ color: '#0d9488', fontWeight: 700 }}>{filteredTasks.length}</span> of <span style={{ fontWeight: 700, color: '#334155' }}>{tasks.length}</span> tasks
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStart={handleStart}
                onView={handleView}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={filter} onClear={() => setFilter('all')} />
        )}
      </div>
    </div>
  )
}
