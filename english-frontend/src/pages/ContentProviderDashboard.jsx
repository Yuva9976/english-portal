import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import StatCard from '../components/dashboard/StatCard'
import DashboardHeader from '../components/dashboard/DashboardHeader'

export default function ContentProviderDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      const res = await apiClient.get('/content-provider/dashboard')
      console.log('Provider Dashboard Response:', res.data)
      setStats(res.data?.stats || { totalCourses: 0, totalLearners: 0, totalLessons: 0, totalQuizzes: 0, totalResources: 0 })
      setCourses(res.data?.courses || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const courseCounts = {
    published: courses.filter(c => (c.status || '').toLowerCase() === 'published').length,
    pending: courses.filter(c => (c.status || '').toLowerCase() === 'pending').length,
    rejected: courses.filter(c => (c.status || '').toLowerCase() === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold tracking-tight text-sm font-['Inter']">Designing your curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 selection:bg-teal-100 pb-20">
      <DashboardHeader
        title="Welcome to Provider Dashboard"
        subtitle="🎯 Design, manage and launch world-class courses — all from one place."
        badgeText=""
        stats={[
          { value: stats?.totalCourses || 0, label: 'Total Courses', icon: '📚' },
          { value: stats?.totalLessons || 0, label: 'Total Lessons', icon: '📖' },
          { value: stats?.totalResources || 0, label: 'Total Resources', icon: '📎' }
        ]}
      />

      <div className="px-10 max-w-7xl mx-auto space-y-10">

        {/* Course Lifecycle Analytics - Premium Refinement */}
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Lifecycle Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Approved Card */}
            <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-[2.5rem] p-8 border border-emerald-100/50 shadow-sm flex items-center justify-between group hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all cursor-default relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter font-['Outfit']">{courseCounts.published}</div>
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Approved Courses</div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform relative z-10 shadow-xl shadow-emerald-500/20">✅</div>
            </div>
 
            {/* Pending Card */}
            <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-[2.5rem] p-8 border border-amber-100/50 shadow-sm flex items-center justify-between group hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-200 transition-all cursor-default relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter font-['Outfit']">{courseCounts.pending}</div>
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pending Review</div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform relative z-10 shadow-xl shadow-amber-500/20">⏳</div>
            </div>
 
            {/* Rejected Card */}
            <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-[2.5rem] p-8 border border-rose-100/50 shadow-sm flex items-center justify-between group hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-200 transition-all cursor-default relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter font-['Outfit']">{courseCounts.rejected}</div>
                <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Rejected / Revision</div>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-2xl group-hover:rotate-6 transition-transform relative z-10 shadow-xl shadow-rose-500/20">❌</div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Premium Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/content-provider/create-course')}
            className="p-10 bg-white border border-slate-100 rounded-[3rem] hover:ring-2 hover:ring-teal-500/20 hover:bg-teal-50/30 transition-all group flex flex-col items-center justify-center gap-6 shadow-xl shadow-slate-200/40 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0D9488] to-teal-400 flex items-center justify-center text-white text-4xl shadow-2xl shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10">
              ➕
            </div>
            <div className="text-center relative z-10">
              <div className="text-xl font-bold text-slate-900 tracking-tighter leading-none mb-2 uppercase font-['Outfit']">Manual Course</div>
              <div className="text-slate-400 font-bold text-[11px] tracking-widest uppercase opacity-60">Draft architecture</div>
            </div>
          </button>
 
          <button
            onClick={() => navigate('/content-provider/bulk-upload')}
            className="p-10 bg-white border border-slate-100 rounded-[3rem] hover:ring-2 hover:ring-pink-500/20 hover:bg-pink-50/30 transition-all group flex flex-col items-center justify-center gap-6 shadow-xl shadow-slate-200/40 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#F43F5E] to-rose-400 flex items-center justify-center text-white text-4xl shadow-2xl shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10">
              🚀
            </div>
            <div className="text-center relative z-10">
              <div className="text-xl font-bold text-slate-900 tracking-tighter leading-none mb-2 uppercase font-['Outfit']">System Mass Injection</div>
              <div className="text-slate-400 font-bold text-[11px] tracking-widest uppercase opacity-60">Excel/CSV Bulk Upload</div>
            </div>
          </button>
 
          <button
            onClick={() => navigate('/content-provider/vocabulary')}
            className="p-10 bg-white border border-slate-100 rounded-[3rem] hover:ring-2 hover:ring-indigo-500/20 hover:bg-indigo-50/30 transition-all group flex flex-col items-center justify-center gap-6 shadow-xl shadow-slate-200/40 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-400 flex items-center justify-center text-white text-4xl shadow-2xl shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform relative z-10">
              📚
            </div>
            <div className="text-center relative z-10">
              <div className="text-xl font-bold text-slate-900 tracking-tighter leading-none mb-2 uppercase font-['Outfit']">Vocabulary Hub</div>
              <div className="text-slate-400 font-bold text-[11px] tracking-widest uppercase opacity-60">Global Lexicon Control</div>
            </div>
          </button>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
             <div className="space-y-1">
               <h2 className="text-2xl font-bold text-[#0D9488] tracking-tight uppercase font-['Outfit']">Your Masterpieces</h2>
               <div className="flex items-center gap-3">
                 <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Curriculum Database • {courses.length} Active Units</p>
               </div>
             </div>
          </div>

          {courses.length === 0 ? (
            <div className='text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200'>
              <div className='text-6xl mb-6'>📁</div>
              <h3 className='text-xl font-bold text-slate-700 mb-2'>No courses yet</h3>
              <p className='text-slate-500 mb-8 max-w-xs mx-auto text-sm'>Create your first course to start building your educational portal</p>
              <button
                onClick={() => navigate('/content-provider/create-course')}
                className='px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-teal-400 transition shadow-sm'
              >
                Create First Course
              </button>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className='bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer'
                  onClick={() => navigate(`/content-provider/courses/${course.id}/lessons`)}
                >
                  {/* Course Thumbnail */}
                  <div className='w-full h-44 bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500 relative overflow-hidden'>
                    <span className="relative z-10">{course.thumbnail || '📜'}</span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      {(() => {
                        const s = (course.status || 'draft').toLowerCase()
                        if (s === 'pending') return <span className="bg-amber-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-amber-300">⏳ IN REVIEW</span>
                        if (s === 'published') return <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-emerald-400">✅ LIVE</span>
                        if (s === 'rejected') return <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-rose-400">❌ REJECTED</span>
                        return <span className="bg-slate-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">⚪ DRAFT</span>
                      })()}
                    </div>

                    {/* Completion Checklist - TOP LEFT */}
                    <div className="absolute top-4 left-4 z-20 flex gap-1.5">
                       <span title="Learning Guide" className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-md border ${course.hasGuide ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/90 text-slate-400 border-slate-200'}`}>📖</span>
                       <span title="Quiz (10+ Qs)" className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-md border ${course.hasQuiz ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white/90 text-slate-400 border-slate-200'}`}>❓</span>
                       <span title="Lesson Flow" className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shadow-md border ${course.hasFlow ? 'bg-pink-500 text-white border-pink-400' : 'bg-white/90 text-slate-400 border-slate-200'}`}>⚡</span>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className='p-6'>
                    <div className='flex items-center gap-2 mb-3 flex-wrap'>
                      <span className='px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-teal-100'>{course.category || 'General'}</span>
                      <span className='px-3 py-1 bg-pink-50 text-pink-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-pink-100'>{course.level || 'Beginner'}</span>
                    </div>

                    <h3 className='text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors line-clamp-1'>{course.title}</h3>
                    <p className='text-sm text-slate-500 mb-6 line-clamp-2 h-10'>{course.description}</p>

                    {/* Course Stats */}
                    <div className='grid grid-cols-3 gap-4 py-4 border-t border-slate-50 text-center relative'>
                      {!course.isComplete && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                           Incomplete Material
                        </div>
                      )}
                      <div>
                        <div className='text-sm font-bold text-slate-800'>{course.lessonCount || 0}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Lessons</div>
                      </div>
                      <div>
                        <div className='text-sm font-bold text-slate-800'>{course.enrollments || 0}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Learners</div>
                      </div>
                      <div>
                        <div className='text-sm font-bold text-slate-800 text-teal-600'>{course.resourceCount || 0}</div>
                        <div className='text-[10px] text-slate-400 font-medium uppercase'>Resources</div>
                      </div>
                    </div>

                    {/* Course Actions */}
                    <div className='mt-4 flex gap-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/courses/${course.id}/preview`)
                        }}
                        className='p-2.5 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition flex items-center justify-center border border-teal-100 shadow-sm'
                        title="Preview"
                      >
                        👁️
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/courses/${course.id}/preview`)
                        }}
                        className='p-2.5 bg-pink-50 text-pink-700 rounded-xl hover:bg-pink-100 transition flex items-center justify-center border border-pink-100 shadow-sm'
                        title="PDF Save"
                      >
                        📥
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/content-provider/courses/${course.id}/edit`)
                        }}
                        className='p-2.5 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition border border-slate-100 shadow-sm flex items-center justify-center'
                        title="Edit"
                      >
                        ✍️
                      </button>
                      <button
                        onClick={async (e) => {
                          e.stopPropagation()
                          if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
                            try {
                              await apiClient.delete(`/content-provider/courses/${course.id}`)
                              loadDashboard()
                            } catch (err) {
                              const msg = err.response?.data?.error || err.message
                              alert(`Failed to delete course: ${msg}`)
                            }
                          }
                        }}
                        className='p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition ml-auto border border-rose-100 shadow-sm flex items-center justify-center'
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
