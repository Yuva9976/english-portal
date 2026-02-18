import React, { useEffect, useState } from 'react'
import apiClient from '../apiClient'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLearners: 0,
    totalTeachers: 0,
    totalLessons: 0,
    activeUsers: 0
  })
  const [learners, setLearners] = useState([])
  const [teachers, setTeachers] = useState([])
  const [pendingCourses, setPendingCourses] = useState([])
  const [logs, setLogs] = useState([])
  const [analyticsData, setAnalyticsData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    async function load() {
      try {
        // Load current user
        const res = await apiClient.get('/auth/me')
        setUser(res.data?.user)

        // Load all users for stats
        loadUsers()
        loadPendingCourses()
        loadLogs()
        loadAnalytics()

      } catch (err) {
        console.error(err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const loadUsers = async () => {
    try {
      const usersRes = await apiClient.get('/users')
      const allUsers = usersRes.data?.users || []
      const learnersData = allUsers.filter(u => u.role === 'learner')
      const teachersData = allUsers.filter(u => u.role === 'teacher')

      setLearners(learnersData)
      setTeachers(teachersData)
      setStats(prev => ({
        ...prev,
        totalUsers: allUsers.length,
        totalLearners: learnersData.length,
        totalTeachers: teachersData.length,
        activeUsers: allUsers.length
      }))
    } catch (e) { console.log('Could not fetch users:', e) }
  }

  const loadPendingCourses = async () => {
    try {
      const res = await apiClient.get('/admin/courses/pending')
      setPendingCourses(res.data?.courses || [])
    } catch (e) { console.log('Could not fetch pending courses:', e) }
  }

  const loadLogs = async () => {
    try {
      const res = await apiClient.get('/admin/logs')
      setLogs(res.data?.logs || [])
    } catch (e) { console.log('Could not fetch logs:', e) }
  }

  const loadAnalytics = async () => {
    try {
      const res = await apiClient.get('/admin/analytics')
      setAnalyticsData(res.data)
    } catch (e) { console.log('Could not fetch analytics:', e) }
  }

  const handleUpdateStatus = async (courseId, status) => {
    try {
      await apiClient.post(`/admin/courses/${courseId}/status`, { status })
      loadPendingCourses()
      loadLogs()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handleImpersonate = async (userId) => {
    try {
      if (!window.confirm('Are you sure you want to login as this user? You will be signed out as admin.')) return
      const res = await apiClient.post(`/admin/impersonate/${userId}`)
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        window.location.href = res.data.user.role === 'learner' ? '/learner' : '/tutor/dashboard'
      }
    } catch (err) {
      alert('Impersonation failed')
    }
  }

  if (loading) {
    // ... loading state same ...
  }

  if (error) {
    // ... error state same ...
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      <NavBar />

      <div className="flex-1 container mx-auto px-4 md:px-6 py-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-rose-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, {user?.name || 'Administrator'}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-teal-500/20">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              System Online
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full text-xs font-semibold shadow-lg shadow-rose-500/20">
              🛡️ Admin
            </div>
          </div>
        </div>

        {/* Stats Cards - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
                👥
              </div>
              <span className="text-xs text-green-500 font-semibold">+12%</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
              <p className="text-xs text-slate-500">Total Users</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-lg">
                🎓
              </div>
              <span className="text-xs text-green-500 font-semibold">Active</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-800">{stats.totalLearners}</p>
              <p className="text-xs text-slate-500">Learners</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-lg">
                👨‍🏫
              </div>
              <span className="text-xs text-blue-500 font-semibold">Staff</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-800">{stats.totalTeachers}</p>
              <p className="text-xs text-slate-500">Teachers</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-lg">
                📚
              </div>
              <span className="text-xs text-amber-500 font-semibold">Content</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-800">{stats.totalLessons}</p>
              <p className="text-xs text-slate-500">Lessons</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-lg">
                ⚡
              </div>
              <span className="text-xs text-green-500 font-semibold">Live</span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-slate-800">{stats.activeUsers}</p>
              <p className="text-xs text-slate-500">Active Now</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
          {['overview', 'content queue', 'learners', 'teachers', 'analytics', 'audit logs', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                }`}
            >
              {tab.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              {tab === 'content queue' && pendingCourses.length > 0 && (
                <span className='ml-2 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full'>{pendingCourses.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Actions (Overview) */}
            {activeTab === 'overview' && (
              <>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm">⚡</span>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onClick={() => setActiveTab('learners')} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-teal-50 hover:to-teal-100 transition-all group">
                      <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all">👥</span>
                      <span className="text-xs font-medium text-slate-700">Manage Users</span>
                    </button>
                    <button onClick={() => window.location.href = '/content-provider/create-course'} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all group">
                      <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all">📚</span>
                      <span className="text-xs font-medium text-slate-700">Add Lesson</span>
                    </button>
                    <button onClick={() => setActiveTab('analytics')} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-amber-50 hover:to-amber-100 transition-all group">
                      <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all">📊</span>
                      <span className="text-xs font-medium text-slate-700">Analytics</span>
                    </button>
                    <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-rose-50 hover:to-rose-100 transition-all group">
                      <span className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm group-hover:shadow-md transition-all">⚙️</span>
                      <span className="text-xs font-medium text-slate-700">Settings</span>
                    </button>
                  </div>
                </div>

                {/* Content Queue Preview */}
                {pendingCourses.length > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-amber-800 flex items-center gap-2">
                        <span>🔔</span> Pending Approvals
                      </h3>
                      <button onClick={() => setActiveTab('content queue')} className="text-xs font-bold text-amber-700">Review All →</button>
                    </div>
                    <div className="space-y-3">
                      {pendingCourses.slice(0, 2).map(course => (
                        <div key={course.id} className="bg-white p-3 rounded-lg flex items-center justify-between shadow-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-sm">📖</div>
                            <span className="text-sm font-medium text-slate-700">{course.title}</span>
                          </div>
                          <button onClick={() => handleUpdateStatus(course.id, 'published')} className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-md hover:bg-amber-600">Quick Approve</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Content Queue Tab */}
            {activeTab === 'content queue' && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">📋</span>
                  Course Approval Queue
                </h3>
                {pendingCourses.length > 0 ? (
                  <div className="space-y-4">
                    {pendingCourses.map(course => (
                      <div key={course.id} className="p-4 border border-slate-50 rounded-xl bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                            {course.thumbnail || '📜'}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{course.title}</h4>
                            <p className="text-xs text-slate-500">By {course.teacher?.name || 'Unknown'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleUpdateStatus(course.id, 'rejected')} className="px-4 py-2 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100">Reject</button>
                          <button onClick={() => handleUpdateStatus(course.id, 'published')} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-500/10">Approve & Publish</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50/50 rounded-xl">
                    <div className="text-5xl mb-4">📭</div>
                    <p className="font-bold text-slate-800">Queue is clear!</p>
                    <p className="text-sm text-slate-500">No courses pending review at the moment.</p>
                  </div>
                )}
              </div>
            )}

            {/* Learners Tab */}
            {activeTab === 'learners' && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">All Learners ({learners.length})</h3>
                  <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700 transition-colors">
                    + Add Learner
                  </button>
                </div>

                {learners.length > 0 ? (
                  <div className="grid gap-3">
                    {learners.map((learner, idx) => (
                      <div key={learner.id || idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                            {learner.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{learner.name || 'Unknown'}</p>
                            <p className="text-xs text-slate-500">{learner.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleImpersonate(learner.id)} className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded-md hover:border-teal-400 hover:text-teal-600">Login As</button>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Learner</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <span className="text-4xl mb-3 block">🎓</span>
                    <p>No learners registered yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Teachers Tab */}
            {activeTab === 'teachers' && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">All Teachers ({teachers.length})</h3>
                  <button className="px-3 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-violet-700 transition-colors">
                    + Add Teacher
                  </button>
                </div>

                {teachers.length > 0 ? (
                  <div className="grid gap-3">
                    {teachers.map((teacher, idx) => (
                      <div key={teacher.id || idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {teacher.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{teacher.name || 'Unknown'}</p>
                            <p className="text-xs text-slate-500">{teacher.email || 'N/A'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleImpersonate(teacher.id)} className="px-3 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded-md hover:border-violet-400 hover:text-violet-600">Login As</button>
                          <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs font-medium rounded-full">Teacher</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <span className="text-4xl mb-3 block">👨‍🏫</span>
                    <p>No teachers registered yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">New Users (7d)</p>
                    <p className="text-3xl font-bold text-teal-600">+{analyticsData?.stats?.newUsersLastWeek || 0}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">New Courses (7d)</p>
                    <p className="text-3xl font-bold text-rose-500">+{analyticsData?.stats?.newCoursesLastWeek || 0}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Quiz Attempts</p>
                    <p className="text-3xl font-bold text-blue-600">{analyticsData?.stats?.totalQuizAttempts || 0}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="text-xl">🏆</span> Top Courses by Content
                  </h3>
                  <div className="space-y-4">
                    {analyticsData?.topCourses?.map((course, idx) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-300 font-bold text-xl">#0{idx + 1}</span>
                          <span className="text-sm font-medium text-slate-700">{course.title}</span>
                        </div>
                        <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full">{course.lessonCount || 0} Lessons</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit logs' && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center text-sm">📜</span>
                  System Audit Logs
                </h3>
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex gap-4 p-3 border-l-4 border-slate-200 hover:border-teal-500 hover:bg-slate-50 transition-all rounded-r-lg">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-slate-600">
                        {log.user?.name?.charAt(0) || 'A'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-slate-800">{log.action}</span>
                          <span className="text-[10px] text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          <span className="font-bold">{log.user?.name || 'Admin'}</span>
                          {log.details && ` - ${typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}`}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">{log.ip_address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Enable Notifications</p>
                      <p className="text-xs text-slate-500">Send email notifications to users</p>
                    </div>
                    <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Maintenance Mode</p>
                      <p className="text-xs text-slate-500">Temporarily disable site access</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">Auto Backup</p>
                      <p className="text-xs text-slate-500">Daily automatic database backups</p>
                    </div>
                    <div className="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* Admin Profile Card */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{user?.name || 'Administrator'}</p>
                  <p className="text-xs text-slate-500">{user?.email || 'admin@example.com'}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full uppercase">
                    {user?.role || 'Admin'}
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium text-slate-700">Jan 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Login</span>
                  <span className="font-medium text-slate-700">Today</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xs">✓</span>
                System Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Database</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">API Server</span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Running
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Storage</span>
                  <span className="text-xs font-medium text-slate-600">45% used</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs shrink-0">👤</div>
                  <div>
                    <p className="text-sm text-slate-700">New user registered</p>
                    <p className="text-xs text-slate-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs shrink-0">📚</div>
                  <div>
                    <p className="text-sm text-slate-700">Lesson completed</p>
                    <p className="text-xs text-slate-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs shrink-0">🏆</div>
                  <div>
                    <p className="text-sm text-slate-700">Quiz passed with 95%</p>
                    <p className="text-xs text-slate-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}
