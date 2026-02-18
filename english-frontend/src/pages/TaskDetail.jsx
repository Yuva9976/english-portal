import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${colors[priority] || colors.medium}`}>
      {priority?.charAt(0).toUpperCase() + priority?.slice(1)} Priority
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
    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${color}`}>
      <span className="text-lg">{icon}</span> {label}
    </span>
  )
}

export default function TaskDetail() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [submission, setSubmission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [content, setContent] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    loadTask()
  }, [taskId])

  const loadTask = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get(`/tasks/${taskId}`)
      setTask(res.data.task)
      setSubmission(res.data.submission)
      setContent(res.data.submission?.content || '')
    } catch (error) {
      console.error('Failed to load task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await apiClient.post(`/tasks/${taskId}/save`, { content })
      // Show success feedback
    } catch (error) {
      console.error('Failed to save:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      await apiClient.post(`/tasks/${taskId}/submit`, { content })
      setShowConfirm(false)
      loadTask() // Refresh to show submitted status
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'No due date'
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeRemaining = () => {
    if (!task?.dueDate) return null
    const now = new Date()
    const due = new Date(task.dueDate)
    const diff = due - now

    if (diff < 0) {
      const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)))
      return { overdue: true, text: `Overdue by ${days} day${days !== 1 ? 's' : ''}` }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return { overdue: false, text: `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} remaining` }
    }
    
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { overdue: false, text: `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} remaining` }
  }

  if (loading) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Loading task...</p>
          </div>
        </div>
      </LearnerLayout>
    )
  }

  if (!task) {
    return (
      <LearnerLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Task not found</h2>
            <p className="text-slate-500 mb-4">The task you're looking for doesn't exist.</p>
            <Link to="/learner/tasks" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
              Back to Tasks
            </Link>
          </div>
        </div>
      </LearnerLayout>
    )
  }

  const timeRemaining = getTimeRemaining()
  const canEdit = !submission || ['not_started', 'in_progress', 'returned'].includes(submission.status)
  const isSubmitted = submission && ['submitted', 'graded'].includes(submission.status)

  return (
    <LearnerLayout>
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/learner/tasks" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-6 transition-colors font-medium"
        >
          <span>←</span> Back to Tasks
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium">
                    {task.type?.charAt(0).toUpperCase() + task.type?.slice(1)}
                  </span>
                  <PriorityBadge priority={task.priority} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{task.title}</h1>
                <p className="text-teal-100">
                  Assigned by {task.assignedBy?.name || 'Teacher'} 
                  {task.classroom && ` • ${task.classroom.title}`}
                </p>
              </div>
              <StatusBadge status={submission?.status || 'pending'} />
            </div>
          </div>

            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Due Date</p>
                  <p className="font-semibold text-slate-800">{formatDate(task.dueDate)}</p>
                  {timeRemaining && (
                    <p className={`text-sm mt-1 ${timeRemaining.overdue ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {timeRemaining.overdue ? '⚠️' : '⏰'} {timeRemaining.text}
                    </p>
                  )}
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Points</p>
                  <p className="font-semibold text-slate-800">{task.maxPoints} points maximum</p>
                  {submission?.pointsEarned !== null && submission?.pointsEarned !== undefined && (
                    <p className="text-sm text-violet-600 mt-1">
                      ⭐ Earned: {submission.pointsEarned} points
                    </p>
                  )}
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Late Submission</p>
                  <p className="font-semibold text-slate-800">
                    {task.allowLate ? `Allowed (${task.latePenalty}% penalty/day)` : 'Not allowed'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Instructions & Submission */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description & Instructions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">📝 Task Details</h2>
                </div>
                <div className="p-6">
                  {task.description && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
                      <p className="text-slate-700 whitespace-pre-wrap">{task.description}</p>
                    </div>
                  )}
                  {task.instructions && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Instructions</h3>
                      <div className="bg-slate-50 rounded-xl p-4 text-slate-700 whitespace-pre-wrap">
                        {task.instructions}
                      </div>
                    </div>
                  )}
                  {task.attachments && task.attachments.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {task.attachments.map((url, i) => (
                          <a 
                            key={i} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-xl">📎</span>
                            <span className="text-sm text-cyan-600 hover:underline">Attachment {i + 1}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">✏️ Your Submission</h2>
                  {!isSubmitted && (
                    <span className="text-xs text-slate-400">Auto-saved as you type</span>
                  )}
                </div>
                <div className="p-6">
                  {canEdit ? (
                    <>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your answer or response here..."
                        className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      />
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : '💾 Save Draft'}
                        </button>
                        <button
                          onClick={() => setShowConfirm(true)}
                          disabled={!content.trim()}
                          className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Task →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="bg-slate-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-slate-500 mb-2">Your submitted answer:</p>
                        <p className="text-slate-700 whitespace-pre-wrap">{submission?.content || 'No content submitted'}</p>
                      </div>
                      {submission?.submittedAt && (
                        <p className="text-sm text-slate-500">
                          Submitted on {formatDate(submission.submittedAt)}
                          {submission.isLate && <span className="text-amber-600 ml-2">⚠️ Late submission</span>}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Feedback & Info */}
            <div className="space-y-6">
              {/* Grade Card (if graded) */}
              {submission?.status === 'graded' && (
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>⭐</span> Your Grade
                  </h3>
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold mb-2">
                      {submission.pointsEarned}
                      <span className="text-2xl text-violet-200">/{task.maxPoints}</span>
                    </div>
                    <p className="text-violet-200">
                      {Math.round((submission.pointsEarned / task.maxPoints) * 100)}% Score
                    </p>
                  </div>
                </div>
              )}

              {/* Feedback Card */}
              {submission?.feedback && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                      <span>💬</span> Teacher Feedback
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-700 whitespace-pre-wrap">{submission.feedback}</p>
                  </div>
                </div>
              )}

              {/* Tips Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <span>💡</span> Tips
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      Read all instructions carefully before starting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      Save your work frequently to avoid losing progress
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      Review your answer before submitting
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      Submit before the deadline to avoid penalties
                    </li>
                  </ul>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <span>❓</span> Need Help?
                </h3>
                <p className="text-sm text-amber-700 mb-4">
                  If you have questions about this task, contact your teacher.
                </p>
                <Link 
                  to="/queries" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-800"
                >
                  Submit a Query →
                </Link>
              </div>
            </div>
          </div>
        </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Submit Task?</h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to submit this task? Make sure you've reviewed your answer.
              </p>
              {timeRemaining?.overdue && task.allowLate && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-amber-700">
                    ⚠️ This is a late submission. A {task.latePenalty}% penalty per day may apply.
                  </p>
                </div>
              )}
            </div>
            <div className="bg-slate-50 px-6 py-4 flex items-center gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LearnerLayout>
  )
}
