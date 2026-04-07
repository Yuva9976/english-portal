import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function TeacherResourcesPage() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('grammar') // 'grammar' | 'courses' | 'my-resources' | 'analytics'
    const [grammarGuides, setGrammarGuides] = useState([])
    const [availableCourses, setAvailableCourses] = useState([])
    const [myResources, setMyResources] = useState({ grammarGuides: [], courses: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [actionMsg, setActionMsg] = useState('')
    const [selectedCourseForPreview, setSelectedCourseForPreview] = useState(null)

    // Get user role once
    const [userRole, setUserRole] = useState('')
    useEffect(() => {
        try {
            const userStr = localStorage.getItem('user')
            if (userStr) {
                const userObj = JSON.parse(userStr)
                if (userObj && userObj.role) {
                    setUserRole(userObj.role.toLowerCase())
                }
            }
        } catch (e) {
            console.error('Failed to parse user role', e)
        }
        loadAll()
    }, [])

    const loadAll = async () => {
        setLoading(true)
        try {
            const [guidesRes, coursesRes, myRes] = await Promise.all([
                apiClient.get('/teacher-resources/grammar-guides'),
                apiClient.get('/teacher-resources/available-courses'),
                apiClient.get('/teacher-resources/my-resources')
            ])
            setGrammarGuides(guidesRes.data?.guides || [])
            setAvailableCourses(coursesRes.data?.courses || [])
            setMyResources(myRes.data || { grammarGuides: [], courses: [] })
        } catch (err) {
            console.error(err)
            setError('Failed to load resources')
        } finally {
            setLoading(false)
        }
    }

    const approveGrammar = async (key) => {
        setActionMsg('')
        try {
            await apiClient.post(`/teacher-resources/approve-grammar/${key}`, {})
            setActionMsg('Grammar guide approved for students! ✅')
            loadAll()
            setTimeout(() => setActionMsg(''), 3000)
        } catch (err) {
            const detail = err?.response?.data?.detail || err?.response?.data?.error || err?.message || 'Unknown error'
            setActionMsg(`❌ Error: ${detail}`)
            setTimeout(() => setActionMsg(''), 5000)
        }
    }

    const approveCourse = async (courseId) => {
        try {
            await apiClient.post(`/teacher-resources/approve-course/${courseId}`, {})
            setActionMsg('Course approved for students! ✅')
            loadAll()
            setTimeout(() => setActionMsg(''), 3000)
        } catch (err) {
            setActionMsg(err?.response?.data?.error || 'Failed to approve')
            setTimeout(() => setActionMsg(''), 3000)
        }
    }

    const removeResource = async (resourceId) => {
        try {
            await apiClient.delete(`/teacher-resources/remove/${resourceId}`)
            setActionMsg('Resource removed from students ✅')
            loadAll()
            setTimeout(() => setActionMsg(''), 3000)
        } catch (err) {
            setActionMsg(err?.response?.data?.error || 'Failed to remove')
            setTimeout(() => setActionMsg(''), 3000)
        }
    }

    if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 animate-fadeIn">
          <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">Syncing Shared Catalog...</p>
        </div>
      )
    }

    const totalApproved = (myResources.grammarGuides?.length || 0) + (myResources.courses?.length || 0)

    return (
        <div className="min-h-screen p-6 md:p-12 animate-fadeIn">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-pink-50 text-[#F43F5E] text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm border border-pink-100">System: Shared Assets</span>
                      <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse shadow-sm shadow-teal-400/50"></span>
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight uppercase font-['Outfit']" style={{
                      background: 'linear-gradient(135deg, #0D9488 0%, #F43F5E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Resource Center</h1>
                    <p className='text-slate-400 font-medium text-lg max-w-2xl'>Deploy curated grammar guides and validated instructional courses to your learning stream.</p>
                  </div>

                  <div className="flex items-center gap-6 no-print">
                      <div className="flex flex-col items-end">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Pipeline</span>
                         <span className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[#0D9488] font-bold text-xs shadow-sm shadow-teal-500/5">
                            {totalApproved} Ecosystem Assets Active
                         </span>
                      </div>
                  </div>
                </div>

                {/* Dashboard Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#0D9488]">
                      <div>
                         <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{grammarGuides.length}</div>
                         <div className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Grammar Repository</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-2xl group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">📖</div>
                   </div>
                   <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#F43F5E]">
                      <div>
                         <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{availableCourses.length}</div>
                         <div className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-widest mt-1">Available Packs</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#F43F5E] flex items-center justify-center text-2xl group-hover:bg-[#F43F5E] group-hover:text-white transition-all duration-300">📚</div>
                   </div>
                   <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#0D9488]">
                      <div>
                         <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{totalApproved}</div>
                         <div className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Global Deployments</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-2xl group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">✅</div>
                   </div>
                   <div className="bg-gradient-to-br from-[#0D9488] to-[#0f766e] rounded-[2rem] p-8 shadow-xl shadow-teal-500/10 flex items-center justify-between group hover:shadow-2xl transition-all">
                      <div>
                         <div className="text-3xl font-bold text-white tracking-tighter font-['Outfit']">Verified</div>
                         <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Ecosystem Status</div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center text-2xl">✨</div>
                   </div>
                </div>

                {/* Status Messages */}
                {actionMsg && (
                    <div className="p-6 bg-teal-50 border border-teal-100 text-[#0D9488] rounded-[2rem] text-xs font-bold uppercase tracking-widest flex items-center gap-4 animate-slideDown shadow-sm">
                        <span className="text-xl">✨</span> {actionMsg}
                    </div>
                )}
                {error && (
                    <div className="p-6 bg-rose-50 border border-rose-100 text-[#F43F5E] rounded-[2rem] text-xs font-bold uppercase tracking-widest flex items-center gap-4 animate-slideDown">
                        <span className="text-xl">⚠️</span> {error}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 no-print bg-slate-50/50 p-2 rounded-[2.5rem] border border-slate-100 w-fit">
                    {[
                        { id: 'grammar', label: 'Grammar Modules', count: grammarGuides.length, icon: '📖' },
                        { id: 'courses', label: 'Course Packs', count: availableCourses.length, icon: '📚' },
                        { id: 'my-resources', label: 'Active Assets', count: totalApproved, icon: '✅' },
                        { id: 'analytics', label: 'Efficacy', count: '94%', icon: '📈' },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`px-8 py-4 rounded-[1.75rem] text-[10px] uppercase font-bold tracking-widest transition-all flex items-center gap-3 ${tab === t.id
                                ? 'bg-[#0D9488] text-white shadow-lg shadow-teal-500/20'
                                : 'text-slate-500 hover:bg-white hover:text-[#0D9488] hover:shadow-sm'
                                }`}
                        >
                            <span className="text-lg">{t.icon}</span>
                            {t.label} 
                            <span className={`px-2 py-0.5 rounded-full text-[9px] ${tab === t.id ? 'bg-white/20' : 'bg-slate-200 text-slate-500'}`}>
                              {t.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grammar Guides Tab */}
                {tab === 'grammar' && (
                    <div className="animate-fadeIn space-y-8">
                        <div className="px-4">
                           <h2 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase font-['Outfit'] border-b-2 border-[#0D9488] w-fit pb-1 mb-2">Linguistic Modules</h2>
                           <p className="text-slate-400 font-medium">Inject granular grammar components into your student's learning stream.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {grammarGuides.map(guide => (
                                <div key={guide.key} className={`premium-card relative overflow-hidden flex flex-col justify-between group hover:border-[#0D9488] ${guide.approved ? 'ring-2 ring-teal-500/10' : ''}`}>
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0D9488]"></div>
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform block">{guide.icon}</span>
                                            {guide.approved && (
                                                <span className="px-3 py-1 bg-[#0D9488] text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">ACTIVE</span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-['Outfit'] tracking-tight group-hover:text-[#0D9488] transition-colors">{guide.title}</h3>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2">{guide.subtitle}</p>
                                        <div className="flex">
                                          <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-100">
                                              {guide.category} • VERIFIED
                                          </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate(guide.route)}
                                            className="flex-1 px-4 py-3.5 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition shadow-sm"
                                        >
                                            👁️ Preview
                                        </button>
                                        {(userRole === 'tutor' || userRole === 'teacher' || userRole === 'provider' || userRole === 'admin') && (
                                            guide.approved ? (
                                                <button
                                                    onClick={() => removeResource(guide.resourceId)}
                                                    className="px-4 py-3.5 bg-white border border-rose-100 text-[#F43F5E] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-rose-50 transition"
                                                >
                                                    Purge
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => approveGrammar(guide.key)}
                                                    className="flex-1 px-4 py-3.5 bg-[#0D9488] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#0b7a6f] transition shadow-lg shadow-teal-500/20"
                                                >
                                                    Deploy
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Available Courses Tab */}
                {tab === 'courses' && (
                    <div className="animate-fadeIn space-y-8">
                        <div className="px-4">
                           <h2 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase font-['Outfit'] border-b-2 border-[#F43F5E] w-fit pb-1 mb-2">Instructional Packs</h2>
                           <p className="text-slate-400 font-medium">Validated pedagogical sequences ready for ecosystem-wide distribution.</p>
                        </div>
                        {availableCourses.length === 0 ? (
                            <div className="text-center py-32 premium-card border-dashed border-2 flex flex-col items-center justify-center">
                                <div className="text-8xl mb-10 opacity-10">📭</div>
                                <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Catalog Empty</h3>
                                <p className="text-slate-400 text-sm font-medium mt-4">Authorized packs will appear post-governance approval.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {availableCourses.map(course => (
                                    <div key={course.id} className={`premium-card relative overflow-hidden flex flex-col justify-between group hover:border-[#F43F5E] ${course.approved ? 'ring-2 ring-pink-500/10' : ''}`}>
                                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#F43F5E]"></div>
                                        <div className="mb-8">
                                            <div className="w-full h-32 bg-slate-900 flex items-center justify-center relative overflow-hidden rounded-[1.5rem] mb-6 shadow-inner">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488] to-[#F43F5E] opacity-60"></div>
                                                <span className="text-5xl text-white relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform">📚</span>
                                                {course.approved && (
                                                    <div className="absolute top-4 right-4 z-20">
                                                       <span className="px-3 py-1 bg-white text-[#F43F5E] text-[9px] font-bold uppercase tracking-widest rounded-full shadow-xl">ACTIVE</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-pink-50 text-[#F43F5E] text-[10px] font-bold uppercase tracking-widest rounded-full border border-pink-100">{course.level}</span>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{course.lessonCount} Modules</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-['Outfit'] tracking-tight group-hover:text-[#F43F5E] transition-colors line-clamp-1">{course.title}</h3>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-4 line-clamp-2 h-10">{course.description}</p>
                                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Architect: {course.createdBy}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setSelectedCourseForPreview(course)}
                                                className="flex-1 px-4 py-3.5 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition shadow-sm"
                                            >
                                                👁️ Inspect
                                            </button>
                                            
                                            {(userRole === 'tutor' || userRole === 'teacher' || userRole === 'provider' || userRole === 'admin') && (
                                                course.approved ? (
                                                    <button
                                                        onClick={() => removeResource(course.resourceId)}
                                                        className="px-4 py-3.5 bg-white border border-rose-100 text-[#F43F5E] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-rose-50 transition"
                                                    >
                                                        Purge
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => approveCourse(course.id)}
                                                        className="flex-1 px-4 py-3.5 bg-[#F43F5E] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#e11d48] transition shadow-lg shadow-pink-500/20"
                                                    >
                                                        Deploy
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Preview Modal */}
                {selectedCourseForPreview && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
                        <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scaleIn">
                             <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                 <div>
                                      <div className="flex items-center gap-3 mb-1">
                                         <span className="w-2.5 h-2.5 bg-[#F43F5E] rounded-full"></span>
                                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pedagogical Visualization</span>
                                      </div>
                                     <h3 className="text-3xl font-bold text-slate-900 tracking-tighter uppercase font-['Outfit']">{selectedCourseForPreview.title}</h3>
                                 </div>
                                 <button onClick={() => setSelectedCourseForPreview(null)} className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:text-[#F43F5E] flex items-center justify-center text-slate-400 transition shadow-sm font-bold">✕</button>
                             </div>
                             <div className="p-8 max-h-[50vh] overflow-y-auto space-y-4">
                                 {selectedCourseForPreview.lessons && selectedCourseForPreview.lessons.length > 0 ? (
                                     <div className="space-y-3">
                                         {selectedCourseForPreview.lessons.map((lesson, idx) => (
                                             <div key={lesson.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-[#F43F5E]/30 transition-all group relative overflow-hidden">
                                                 <div className="flex items-center gap-5 relative z-10">
                                                     <div className="w-10 h-10 rounded-xl bg-white shadow-inner border border-slate-100 group-hover:bg-[#F43F5E] group-hover:text-white flex items-center justify-center text-slate-400 font-bold text-xs transition-all">
                                                         {String(idx + 1).padStart(2, '0')}
                                                     </div>
                                                     <span className="font-bold text-slate-700 tracking-tight">{lesson.title}</span>
                                                 </div>
                                                 <button 
                                                     onClick={() => navigate(`/lessons/${lesson.id}`)}
                                                     className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-black transition relative z-10"
                                                 >
                                                     VISUALIZE
                                                 </button>
                                             </div>
                                         ))}
                                     </div>
                                 ) : (
                                     <div className="text-center py-16 text-slate-400 font-bold uppercase tracking-widest opacity-30 italic">
                                         Zero Modules Provisioned
                                     </div>
                                 )}
                             </div>
                             <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                 <button onClick={() => setSelectedCourseForPreview(null)} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition shadow-sm">Close</button>
                                 {!selectedCourseForPreview.approved && (
                                     <button 
                                         onClick={() => { approveCourse(selectedCourseForPreview.id); setSelectedCourseForPreview(null); }}
                                         className="px-8 py-3.5 bg-[#0D9488] text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:shadow-xl transition shadow-lg shadow-teal-500/20"
                                     >
                                         Deploy Pack
                                     </button>
                                 )}
                             </div>
                        </div>
                    </div>
                )}

                {/* Active Assets Tab */}
                {tab === 'my-resources' && (
                    <div className="animate-fadeIn space-y-12">
                        <div className="px-4">
                           <h2 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase font-['Outfit'] border-b-2 border-teal-500 w-fit pb-1 mb-2">Live Ecosystem</h2>
                           <p className="text-slate-400 font-medium">Assets currently propagating through the learning pipeline.</p>
                        </div>

                        {totalApproved === 0 ? (
                            <div className="text-center py-32 premium-card border-dashed border-2 flex flex-col items-center justify-center">
                                <div className="text-8xl mb-10 opacity-10">🛡️</div>
                                <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Pipeline Empty</h3>
                                <p className="text-slate-400 text-sm font-medium mt-4">Interface with the catalogs to authorize resources for deployment.</p>
                                <button onClick={() => setTab('grammar')} className="mt-10 btn-primary">Catalog Access</button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Mapped Resources would go here, simplified to match grid style */}
                                {myResources.grammarGuides?.map(g => (
                                    <div key={g.id} className="premium-card !p-6 border-[#0D9488]/20 flex items-center justify-between group">
                                        <div className="flex items-center gap-5">
                                            <span className="text-4xl group-hover:rotate-12 transition-transform">{g.icon}</span>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-[#0D9488] transition-colors">{g.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Grammar Module</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeResource(g.id)} className="w-10 h-10 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center hover:bg-[#F43F5E] hover:text-white transition-all shadow-sm">✕</button>
                                    </div>
                                ))}
                                {myResources.courses?.map(c => (
                                    <div key={c.id} className="premium-card !p-6 border-[#F43F5E]/20 flex items-center justify-between group">
                                        <div className="flex items-center gap-5">
                                            <span className="text-4xl group-hover:scale-110 transition-transform">📚</span>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-[#F43F5E] transition-colors">{c.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Course Pack</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeResource(c.id)} className="w-10 h-10 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center hover:bg-[#F43F5E] hover:text-white transition-all shadow-sm">✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
