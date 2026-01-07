import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LearnerLayout from '../layouts/LearnerLayout'
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
    assignment: { color: 'bg-cyan-50 text-cyan-700 border-cyan-200', icon: '📋' },
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
  return (
    <button 
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all duration-300 hover:shadow-md text-left w-full ${
        active ? `border-${color}-500 ring-2 ring-${color}-100` : 'border-transparent hover:border-slate-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
          color === 'slate' ? 'from-slate-400 to-slate-500' :
          color === 'blue' ? 'from-blue-400 to-blue-500' :
          color === 'emerald' ? 'from-emerald-400 to-emerald-500' :
          color === 'violet' ? 'from-violet-400 to-violet-500' :
          color === 'rose' ? 'from-rose-400 to-rose-500' :
          'from-cyan-400 to-cyan-500'
        } flex items-center justify-center text-white text-xl shadow-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      </div>
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

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-lg group ${
      isOverdue ? 'border-rose-200' : 'border-slate-100'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${isOverdue ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <TypeBadge type={task.type} />
              <PriorityBadge priority={task.priority} />
            </div>
            <h3 className="font-semibold text-lg text-slate-800 truncate group-hover:text-cyan-600 transition-colors">
              {task.title}
            </h3>
          </div>
          <StatusBadge status={task.taskStatus} />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {task.description || 'No description provided'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">👤</span>
            <span className="text-slate-600">{task.assignedBy?.name || 'Teacher'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">🏫</span>
            <span className="text-slate-600">{task.classroom?.title || 'General'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">📅</span>
            <span className={`${isOverdue ? 'text-rose-600 font-medium' : 'text-slate-600'}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">🎯</span>
            <span className="text-slate-600">{task.maxPoints} points</span>
          </div>
        </div>

        {/* Due Date Warning */}
        {dueDate && !['submitted', 'graded'].includes(task.taskStatus) && (
          <div className={`rounded-lg p-3 mb-4 ${
            isOverdue ? 'bg-rose-50 text-rose-700' :
            daysUntilDue <= 1 ? 'bg-amber-50 text-amber-700' :
            daysUntilDue <= 3 ? 'bg-blue-50 text-blue-700' :
            'bg-emerald-50 text-emerald-700'
          }`}>
            <p className="text-sm font-medium flex items-center gap-2">
              {isOverdue ? (
                <>⚠️ Overdue by {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''}</>
              ) : daysUntilDue === 0 ? (
                <>🔥 Due today!</>
              ) : daysUntilDue === 1 ? (
                <>⏰ Due tomorrow</>
              ) : (
                <>📆 Due in {daysUntilDue} days</>
              )}
            </p>
          </div>
        )}

        {/* Submission Info */}
        {task.submission && (
          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">
                {task.submission.status === 'graded' ? 'Score:' : 'Submitted:'}
              </span>
              <span className="font-semibold text-slate-700">
                {task.submission.status === 'graded' 
                  ? `${task.submission.pointsEarned}/${task.maxPoints} points`
                  : formatDate(task.submission.submittedAt)
                }
              </span>
            </div>
            {task.submission.isLate && (
              <p className="text-xs text-amber-600 mt-1">⚠️ Submitted late</p>
            )}
            {task.submission.feedback && (
              <div className="mt-2 pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Feedback:</p>
                <p className="text-sm text-slate-700">{task.submission.feedback}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
        {task.taskStatus === 'pending' || task.taskStatus === 'overdue' ? (
          <button 
            onClick={() => onStart(task.id)}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Start Task
          </button>
        ) : task.taskStatus === 'in_progress' ? (
          <button 
            onClick={() => onView(task.id)}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Continue Working
          </button>
        ) : (
          <button 
            onClick={() => onView(task.id)}
            className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
          >
            View Details
          </button>
        )}
        {task.attachments && task.attachments.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <span>📎</span>
            <span>{task.attachments.length}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// Empty State Component
function EmptyState({ filter, onClear }) {
  const messages = {
    pending: { icon: '✅', title: 'No pending tasks', desc: 'You\'re all caught up! Check other tabs for more tasks.' },
    in_progress: { icon: '🎯', title: 'No tasks in progress', desc: 'Start a task to see it here.' },
    submitted: { icon: '📤', title: 'No submitted tasks', desc: 'Complete and submit tasks to see them here.' },
    graded: { icon: '⭐', title: 'No graded tasks yet', desc: 'Your graded submissions will appear here.' },
    overdue: { icon: '🎉', title: 'No overdue tasks', desc: 'Great job staying on top of your deadlines!' },
    all: { icon: '📋', title: 'No tasks yet', desc: 'Tasks assigned by your teachers will appear here.' }
  }

  const { icon, title, desc } = messages[filter] || messages.all

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 mb-6">{desc}</p>
      {filter !== 'all' && (
        <button 
          onClick={onClear}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
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
      <LearnerLayout>
        <div className="flex-1 flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading your tasks...</p>
          </div>
        </div>
      </LearnerLayout>
    )
  }

  return (
    <LearnerLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
              <p className="text-slate-500 mt-1">Track and complete your assigned tasks</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
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
              color="blue"
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
              color="violet"
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
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Type:</span>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                <span className="text-sm font-medium text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="due_date">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="created">Recently Added</option>
                </select>
              </div>
              <div className="flex-1"></div>
              <div className="text-sm text-slate-500">
                Showing {filteredTasks.length} of {tasks.length} tasks
              </div>
            </div>
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </LearnerLayout>
  )
}
