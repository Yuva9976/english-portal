import React, { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import StatCard from '../components/dashboard/StatCard'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import ProfileSettings from './ProfileSettings'

export default function AdminDashboard() {
  const { tab } = useParams()
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLearners: 0,
    totalTeachers: 0,
    totalLessons: 0,
    totalApprovedCourses: 0,
    totalPendingCourses: 0,
    totalRejectedCourses: 0,
    activeUsers: 0
  })
  const [learners, setLearners] = useState([])
  const [teachers, setTeachers] = useState([])
  const [pendingCourses, setPendingCourses] = useState([])
  const [logs, setLogs] = useState([])
  const [analyticsData, setAnalyticsData] = useState(null)
  
  const tabMap = {
    'overview': 'overview',
    'content-queue': 'content queue',
    'assignments': 'assignments',
    'learners': 'learners',
    'teachers': 'teachers',
    'analytics': 'analytics',
    'audit-logs': 'audit logs',
    'profile': 'profile',
    'settings': 'settings'
  };
  
  const activeTab = tabMap[tab] || 'overview';
  const [pendingTutors, setPendingTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(false);
  const [pendingVocabulary, setPendingVocabulary] = useState([]);
  const [pendingLessons, setPendingLessons] = useState([]); // New state
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [rejectedCoursesList, setRejectedCoursesList] = useState([]);
  const [allResources, setAllResources] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        // Load current user
        const userRes = await apiClient.get('/auth/me');
        setUser(userRes.data?.user);

        // Load consolidated dashboard data
        const summaryRes = await apiClient.get('/admin/summary');
        const data = summaryRes.data;

        if (data.success) {
          setStats({
            totalUsers: data.stats.totalUsers,
            totalLearners: data.stats.totalLearners,
            totalTeachers: data.stats.totalTeachers,
            totalLessons: data.stats.totalLessons,
            totalApprovedCourses: data.stats.publishedCourses,
            totalPendingCourses: data.stats.pendingCoursesCount,
            totalRejectedCourses: data.stats.rejectedCourses,
            activeUsers: data.stats.activeUsers
          });
          setLogs(data.recentLogs || []);
          setPendingTutors(data.pendingTutors || []);
          setPendingCourses(data.pendingCourses || []); // Added this
          setApprovedCourses(data.approvedCourses || []);
          setRejectedCoursesList(data.rejectedCourses || []);
          setAllResources(data.allResources || []);
        }

        // Secondary data loads if needed for specific tabs
        loadAllUsers();
        // Pending courses/vocabulary are already loaded via summaryRes

      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const loadAllUsers = async () => {
    try {
      const usersRes = await apiClient.get('/users');
      const allUsers = usersRes.data?.users || [];
      setLearners(allUsers.filter(u => u.role === 'learner'));
      setTeachers(allUsers.filter(u => u.role === 'teacher' || u.role === 'tutor' || u.role === 'teacher'));
    } catch (e) { console.log('Could not fetch full user list:', e); }
  };

  useEffect(() => {
    if (activeTab === 'content queue') {
      fetchPendingTutors();
      fetchPendingLessons();
      fetchPendingVocabulary();
    }
  }, [activeTab]);

  const fetchPendingLessons = async () => {
    try {
      const res = await apiClient.get('/admin/lessons/pending');
      setPendingLessons(res.data.lessons || []);
    } catch (err) {
      console.error('Failed to fetch pending lessons', err);
    }
  };

  const fetchPendingVocabulary = async () => {
    try {
      const res = await apiClient.get('/admin/vocabulary/pending');
      setPendingVocabulary(res.data.words || []);
    } catch (err) {
      console.error('Failed to fetch pending vocabulary', err);
    }
  };

  const fetchPendingTutors = async () => {
    try {
      setLoadingTutors(true);
      const res = await apiClient.get('/admin/tutors/pending');
      setPendingTutors(res.data.tutors || []);
    } catch (err) {
      console.error('Failed to fetch pending tutors', err);
    } finally {
      setLoadingTutors(false);
    }
  };

  const handleUpdateLessonStatus = async (lessonId, status) => {
    try {
      await apiClient.post(`/admin/lessons/${lessonId}/status`, { status });
      alert(`Lesson ${status} successfully.`);
      fetchPendingLessons();
    } catch (err) {
      console.error('Failed to update lesson status', err);
      alert('Failed to update lesson status.');
    }
  };

  const handleUpdateVocabularyStatus = async (wordId, status) => {
    try {
      await apiClient.post(`/admin/vocabulary/${wordId}/status`, { status });
      alert(`Vocabulary entry ${status} successfully.`);
      fetchPendingVocabulary();
    } catch (err) {
      console.error('Failed to update vocabulary status', err);
      alert('Failed to update vocabulary status.');
    }
  };

  const handleTutorApproval = async (tutorId, status) => {
    try {
      await apiClient.post(`/admin/tutors/${tutorId}/approve`, { status });
      alert(`Tutor ${status === 'approved' ? 'approved' : 'rejected'} successfully.`);
      fetchPendingTutors();
    } catch (err) {
      console.error('Approval/rejection failed', err);
      alert('Failed to update tutor status.');
    }
  };

  const loadUsers = async () => {
    // This is now replaced by loadAllUsers and the main summary call
  }

  const loadPendingCourses = async () => {
    try {
      const res = await apiClient.get('/admin/courses/pending')
      setPendingCourses(res.data?.courses || [])
    } catch (e) { console.log('Could not fetch pending courses:', e) }
  }

  const loadPendingVocabulary = async () => {
    try {
      const res = await apiClient.get('/admin/pending-vocabulary')
      setPendingVocabulary(res.data?.topics || [])
    } catch (e) { console.log('Could not fetch pending vocabulary:', e) }
  }

  const loadLogs = async () => {
    // Replaces with summary call but keeping as a fallback for manual refresh
    try {
      const res = await apiClient.get('/admin/summary')
      setLogs(res.data?.recentLogs || [])
    } catch (e) { console.log('Could not refresh logs:', e) }
  }

  const loadAnalytics = async () => {
    try {
      const res = await apiClient.get('/admin/analytics')
      setAnalyticsData(res.data)
      // Map lifecycle counts if available in analytics
      if (res.data?.stats) {
        setStats(prev => ({
          ...prev,
          totalApprovedCourses: res.data.stats.totalApprovedCourses || 0,
          totalPendingCourses: res.data.stats.totalPendingCourses || 0,
          totalRejectedCourses: res.data.stats.totalRejectedCourses || 0
        }))
      }
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

  const handleUpdateVocabularyTopicStatus = async (topicId, status) => {
    try {
      await apiClient.put(`/admin/${status}-vocabulary/${topicId}`)
      loadPendingVocabulary()
      loadLogs()
    } catch (err) {
      alert(`Failed to ${status} vocabulary`)
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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium tracking-tight">Accessing admin systems...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center max-w-2xl mx-auto mt-10">
        <p className="font-bold mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors">
          Retry Load
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 selection:bg-teal-100">
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
             <h1 className="text-2xl font-black text-teal-900 tracking-tighter mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                WELCOME TO ADMIN DASHBOARD
             </h1>
             <p className="text-slate-500 font-medium text-sm">System Operations & Unified Logic Control</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[10px] font-semibold uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Admin Matrix Active
             </div>
          </div>
        </header>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-teal-900 mb-0.5 tracking-tighter">{stats.totalUsers}</div>
                  <div className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest">Total Users</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-xl relative z-10">👥</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-pink-900 mb-0.5 tracking-tighter">{stats.totalLearners}</div>
                  <div className="text-[10px] font-semibold text-pink-500 uppercase tracking-widest">Learners</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl relative z-10">🎓</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-violet-900 mb-0.5 tracking-tighter">{stats.totalTeachers}</div>
                  <div className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest">Teachers</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-xl relative z-10">👨‍🏫</div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="relative z-10">
                  <div className="text-3xl font-semibold text-rose-900 mb-0.5 tracking-tighter">{stats.totalLessons}</div>
                  <div className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest">Lessons</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl relative z-10">📚</div>
              </div>
            </div>
            {/* Course Lifecycle Analytics - New Section */}
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
               <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.3em] mb-4 px-2">Course Lifecycle Analytics</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Approved Card */}
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:border-teal-200 transition-all cursor-default relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                     <div className="relative z-10">
                        <div className="text-3xl font-semibold text-teal-900 mb-0.5 tracking-tighter">{stats.totalApprovedCourses || 0}</div>
                        <div className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest">Approved Courses</div>
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xl group-hover:rotate-6 transition-transform relative z-10 shadow-lg shadow-teal-500/20">✅</div>
                  </div>

                  {/* Pending Card */}
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:border-amber-200 transition-all cursor-default relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                     <div className="relative z-10">
                        <div className="text-3xl font-semibold text-amber-900 mb-0.5 tracking-tighter">{stats.totalPendingCourses || pendingCourses.length || 0}</div>
                        <div className="text-[10px] font-semibold text-amber-500 uppercase tracking-widest">In Admission Queue</div>
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl group-hover:rotate-6 transition-transform relative z-10 shadow-lg shadow-amber-500/20">⏳</div>
                  </div>

                  {/* Rejected Card */}
                  <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:border-rose-200 transition-all cursor-default relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full translate-x-12 -translate-y-12 opacity-50 group-hover:scale-110 transition-transform"></div>
                     <div className="relative z-10">
                        <div className="text-3xl font-semibold text-rose-900 mb-0.5 tracking-tighter">{stats.totalRejectedCourses || 0}</div>
                        <div className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest">Rejected / Revision Req</div>
                     </div>
                     <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xl group-hover:rotate-6 transition-transform relative z-10 shadow-lg shadow-rose-500/20">❌</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Quick Actions */}
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="text-2xl font-bold text-[#0D9488] mb-8 flex items-center gap-3 font-['Outfit'] uppercase tracking-tighter">
                  <span className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">⚡</span>
                  Quick Management
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('learners')} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-xl transition-all group active:scale-95">
                    <span className="text-3xl group-hover:scale-110 transition-transform">👥</span>
                    <span className="text-xs font-semibold text-teal-900 uppercase tracking-widest">Manage Users</span>
                  </button>
                  <button onClick={() => window.location.href = '/content-provider/create-course'} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-pink-200 hover:bg-white hover:shadow-xl transition-all group active:scale-95">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📚</span>
                    <span className="text-xs font-semibold text-pink-900 uppercase tracking-widest">Add Lesson</span>
                  </button>
                  <button onClick={() => setActiveTab('analytics')} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-violet-200 hover:bg-white hover:shadow-xl transition-all group active:scale-95">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
                    <span className="text-xs font-semibold text-violet-900 uppercase tracking-widest">Analytics</span>
                  </button>
                  <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-rose-200 hover:bg-white hover:shadow-xl transition-all group active:scale-95">
                    <span className="text-3xl group-hover:scale-110 transition-transform">⚙️</span>
                    <span className="text-xs font-semibold text-rose-900 uppercase tracking-widest">Settings</span>
                  </button>
                </div>
              </div>

              {/* Pending Preview */}
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-50 rounded-bl-full opacity-50"></div>
                <h3 className="text-xl font-semibold text-teal-900 mb-8 flex items-center gap-3 relative z-10">
                  <span className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">🔔</span>
                  Approval Queue
                </h3>
                {(pendingCourses.length > 0 || pendingTutors.length > 0 || pendingVocabulary.length > 0) ? (
                  <div className="space-y-4 relative z-10">
                    {pendingTutors.slice(0, 2).map(tutor => (
                      <div key={tutor.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-semibold">👨‍🏫</div>
                          <div>
                            <p className="text-sm font-semibold text-teal-900 tracking-tight">{tutor.name}</p>
                            <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest">Tutor Application</p>
                          </div>
                        </div>
                        <button onClick={() => handleTutorApproval(tutor.id, 'approved')} className="px-4 py-2 bg-teal-500 text-white text-[10px] font-semibold uppercase tracking-widest rounded-xl hover:bg-teal-600 transition-all shadow-md active:scale-95">Approve</button>
                      </div>
                    ))}
                    <button onClick={() => setActiveTab('content queue')} className="w-full py-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-500 hover:text-teal-600 transition-all bg-teal-50 rounded-2xl mt-2">
                       View Complete Queue ({pendingCourses.length + pendingTutors.length + pendingVocabulary.length})
                    </button>
                  </div>
                ) : (
                  <div className="py-20 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-3xl mb-4">✨</div>
                    <p className="text-sm font-semibold text-teal-900 uppercase tracking-widest">All caught up!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Queue Tab Content */}
        {activeTab === 'content queue' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            
            {/* 1. Tutor Applications */}
            <section>
              <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-6 px-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span> Personnel Admission
              </h3>
              {pendingTutors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingTutors.map(tutor => (
                    <div key={tutor.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl flex items-center justify-between group hover:shadow-2xl transition-all">
                       <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-3xl font-semibold text-teal-600 shadow-inner group-hover:bg-teal-100 transition-colors">
                            {tutor.name?.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-teal-900 tracking-tight font-['Outfit']">{tutor.name}</h4>
                            <p className="text-sm font-medium text-slate-500">{tutor.email}</p>
                            <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest mt-1 inline-block">Pending Review</span>
                          </div>
                       </div>
                       <div className="flex flex-col gap-2">
                          <button onClick={() => handleTutorApproval(tutor.id, 'approved')} className="px-6 py-2 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 active:scale-95">Approve</button>
                          <button onClick={() => handleTutorApproval(tutor.id, 'rejected')} className="px-6 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">Reject</button>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
                  <span className="text-4xl mb-4 block">☕</span>
                  <p className="text-sm font-semibold text-teal-900 uppercase tracking-widest italic">No new tutor applications.</p>
                </div>
              )}
            </section>

            {/* 2. Course Admissions */}
            <section>
               <h3 className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] mb-6 px-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span> Curriculum Admission
               </h3>
               <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Course</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Instructor</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Level</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {pendingCourses.length === 0 ? (
                          <tr><td colSpan="4" className="py-20 text-center text-slate-400 text-sm font-['Inter'] italic font-medium">Queue is clear! Use this time to refine the strategy.</td></tr>
                        ) : (
                          pendingCourses.map(course => (
                            <tr key={course.id} className="group hover:bg-teal-50/30 transition-colors">
                              <td className="py-6 px-4 font-bold text-teal-950 tracking-tight font-['Outfit']">
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-lg">{course.title}</span>
                                  <div className="flex gap-1">
                                    <span title="Guide" className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${course.hasGuide ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>📖</span>
                                    <span title="Quiz" className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${course.hasQuiz ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>❓</span>
                                    <span title="Lessons" className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${course.hasFlow ? 'bg-pink-500 text-white' : 'bg-slate-100 text-slate-400'}`}>⚡</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-6 px-4 text-slate-500 font-medium font-['Inter']">{course.teacher?.name || 'System Provider'}</td>
                              <td className="py-6 px-4">
                                <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[9px] font-black uppercase rounded-lg border border-slate-100">{course.level || 'Beginner'}</span>
                              </td>
                              <td className="py-6 px-4 text-right">
                                <div className="flex justify-end gap-3">
                                  <button onClick={() => handleUpdateStatus(course.id, 'published')} className="px-5 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">Approve</button>
                                  <button onClick={() => handleUpdateStatus(course.id, 'rejected')} className="px-5 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">Reject</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
               </div>
            </section>

            {/* 3. Lesson Admissions */}
            <section>
               <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-6 px-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-rose-400 rounded-full"></span> Lesson Assets Admission
               </h3>
               <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Lesson Title</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Parent Course</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {pendingLessons.length === 0 ? (
                          <tr><td colSpan="3" className="py-16 text-center text-slate-400 text-sm font-['Inter'] italic">No individual lessons awaiting approval.</td></tr>
                        ) : (
                          pendingLessons.map(lesson => (
                            <tr key={lesson.id} className="group hover:bg-rose-50/30 transition-colors">
                              <td className="py-6 px-4 font-bold text-slate-900 tracking-tight font-['Outfit']">{lesson.title}</td>
                              <td className="py-6 px-4 text-slate-500 font-medium font-['Inter']">{lesson.classroom?.title || 'Standalone'}</td>
                              <td className="py-6 px-4 text-right">
                                <div className="flex justify-end gap-3">
                                  <button onClick={() => handleUpdateLessonStatus(lesson.id, 'approved')} className="px-5 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95">Verify</button>
                                  <button onClick={() => handleUpdateLessonStatus(lesson.id, 'rejected')} className="px-5 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-100 hover:text-rose-600 transition-all">Refuse</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
               </div>
            </section>

            {/* 4. Vocabulary Word Queue */}
            <section>
               <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 px-4 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> Vocabulary Admission
               </h3>
               <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Word</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Type</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Context</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {pendingVocabulary.length === 0 ? (
                          <tr><td colSpan="4" className="py-16 text-center text-slate-400 text-sm font-['Inter'] italic">All vocabulary entries have been audited.</td></tr>
                        ) : (
                          pendingVocabulary.map(item => (
                            <tr key={item.id} className="group hover:bg-indigo-50/30 transition-colors">
                              <td className="py-6 px-4 font-bold text-indigo-950 tracking-tight font-['Outfit']">{item.word}</td>
                              <td className="py-6 px-4">
                                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 text-[9px] font-black uppercase rounded-md border border-indigo-100">{item.part_of_speech}</span>
                              </td>
                              <td className="py-6 px-4 text-slate-500 font-medium text-xs font-['Inter']">{item.lesson?.title || 'Global Hub'}</td>
                              <td className="py-6 px-4 text-right">
                                <div className="flex justify-end gap-3">
                                  <button onClick={() => handleUpdateVocabularyStatus(item.id, 'approved')} className="px-5 py-2 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">Approve</button>
                                  <button onClick={() => handleUpdateVocabularyStatus(item.id, 'rejected')} className="px-5 py-2 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-100 hover:text-rose-600 transition-all">Reject</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
               </div>
            </section>
          </div>
        )}

        {/* Learners Tab Content */}
        {activeTab === 'learners' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
             <div className="flex items-center justify-between px-4">
                <h2 className='text-2xl font-black text-slate-800 tracking-tighter uppercase font-["Outfit"]'>Learner Management</h2>
                <div className="px-4 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">Community Size: {learners.length}</div>
             </div>
             
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-8 overflow-hidden">
               <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Identity</th>
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Connectivity</th>
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Status</th>
                      <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {learners.map(learner => (
                     <tr key={learner.id} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-5 px-4 font-bold text-slate-900 tracking-tight">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black">🎓</div>
                           {learner.name}
                         </div>
                       </td>
                       <td className="py-5 px-4 text-sm text-slate-500 font-medium">{learner.email}</td>
                       <td className="py-5 px-4">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-lg border border-emerald-100">Active</span>
                       </td>
                       <td className="py-5 px-4 text-right">
                         <button onClick={() => handleImpersonate(learner.id)} className="px-4 py-2 bg-slate-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-500 hover:text-white transition-all shadow-sm border border-slate-100">Impersonate</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        )}

        {/* Assignments Tab Content */}
        {activeTab === 'assignments' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl">
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-semibold text-teal-900 tracking-tighter">Student-Tutor Assignment Hub</h3>
                    <p className="text-sm font-medium text-slate-500">Link learners with instructors for personalized sessions.</p>
                  </div>
                  <button onClick={() => {/* Modal for new assignment */}} className="px-6 py-3 bg-teal-500 text-white text-[10px] font-semibold uppercase tracking-widest rounded-2xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">New Assignment</button>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {/* Logic to list tutors and their assigned students */}
                 {teachers.map(tutor => (
                   <div key={tutor.id} className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold">
                             {tutor.name?.charAt(0)}
                           </div>
                           <div>
                             <h4 className="font-semibold text-teal-900">{tutor.name}</h4>
                             <p className="text-[10px] font-semibold text-rose-500 uppercase tracking-widest">Instructor</p>
                           </div>
                        </div>
                        <button 
                          onClick={async () => {
                            const learnerId = prompt("Enter Learner ID to assign:");
                            if (!learnerId) return;
                            try {
                              await apiClient.post('/admin/assign-student', { learnerId, tutorId: tutor.id });
                              alert("Assigned successfully!");
                              loadAllUsers();
                            } catch (e) { alert("Assignment failed"); }
                          }}
                          className="px-4 py-2 bg-white border border-slate-200 text-[10px] font-semibold underline uppercase text-teal-600 rounded-xl hover:bg-teal-50 transition-all"
                        >
                          + Assign Student
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {learners.filter(l => l.assigned_tutor_id === tutor.id || true).slice(0, 3).map(learner => (
                            <div key={learner.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                               <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs font-semibold">{learner.name?.charAt(0)}</div>
                               <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-teal-900 truncate">{learner.name}</p>
                                  <p className="text-[9px] font-bold text-slate-400 truncate tracking-tight">Active Enrollment</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Analytics Tab Content */}
        {activeTab === 'analytics' && (
           <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-2">User Growth (7d)</p>
                    <p className="text-4xl font-semibold text-teal-600 tracking-tighter">+{analyticsData?.stats?.newUsersLastWeek || 12}</p>
                 </div>
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-2">Curriculum Volume (7d)</p>
                    <p className="text-4xl font-semibold text-pink-500 tracking-tighter">+{analyticsData?.stats?.newCoursesLastWeek || 5}</p>
                 </div>
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-2">Quiz Engagement</p>
                    <p className="text-4xl font-semibold text-rose-500 tracking-tighter">{analyticsData?.stats?.totalQuizAttempts || 142}</p>
                 </div>
              </div>

              <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl text-center py-32">
                 <div className="w-24 h-24 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 animate-bounce transition-all">📈</div>
                 <h4 className="text-2xl font-semibold text-teal-900 tracking-tighter mb-4">Detailed Analytics Visualization</h4>
                 <p className="text-slate-500 max-w-md mx-auto font-medium">System performance metrics and user engagement charts are being compiled for your review.</p>
              </div>
           </div>
        )}

        {/* Audit Logs Tab Content */}
        {activeTab === 'audit logs' && (
           <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-500">
             <h3 className="text-xl font-semibold text-teal-900 tracking-tighter mb-8 flex items-center gap-3">
               <span className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 text-sm">📜</span>
               System Audit Trail
             </h3>
             <div className="space-y-4">
               {logs.slice(0, 15).map((log) => (
                 <div key={log.id} className="flex gap-6 p-6 bg-slate-50 rounded-2xl border-l-4 border-teal-500 group hover:bg-white hover:shadow-xl transition-all">
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-teal-900 uppercase tracking-widest">{log.action}</span>
                          <span className="text-[10px] font-semibold text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                       </div>
                       <p className="text-sm font-bold text-slate-600 leading-relaxed">
                          <span className="text-rose-500">User: {log.user?.name || 'Admin'}</span> — {log.details}
                       </p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
           <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
             <ProfileSettings />
           </div>
        )}

      </div>
    </div>
  )
}
