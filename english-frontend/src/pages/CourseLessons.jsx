import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

export default function CourseLessons() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadLessons()
  }, [courseId])

  const loadLessons = async () => {
    try {
      setLoading(true)
      const res = await apiClient.get(`/content-provider/lessons/${courseId}?t=${Date.now()}`)
      setLessons(res.data?.lessons || [])
    } catch (err) {
      setError('Failed to load lessons')
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = () => {
    navigate(`/content-provider/courses/${courseId}/preview`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-10 animate-fadeIn">
        <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse font-['Outfit']">Retrieving Logic Strata...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50/50 p-6 md:p-12 animate-fadeIn'>
      {/* Breadcrumb Navigation */}
      <button
        onClick={() => navigate('/content-provider')}
        className='group mb-12 text-slate-400 hover:text-teal-600 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest'
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> 
        Return to Logic Matrix
      </button>

      <div className='flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-16'>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-teal-100 text-teal-600 text-[10px] font-black rounded-full uppercase tracking-tighter shadow-sm border border-teal-200">System: Course Node</span>
            <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse shadow-sm shadow-rose-400/50"></span>
          </div>
          <h1 className="text-5xl font-black text-slate-800 tracking-tight font-['Outfit']">Curriculum Architecture</h1>
          <p className='text-slate-400 font-medium text-lg max-w-2xl'>Break down your instructional corpus into high-fidelity modular segments for optimal cognitive retention.</p>
        </div>

        <div className='flex flex-wrap gap-5'>
          <button
            onClick={async () => {
              try {
                const res = await apiClient.get(`/content-provider/courses/${courseId}/download`, { responseType: 'blob' })
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `Course_Schema_${courseId}.xlsx`)
                document.body.appendChild(link)
                link.click()
                link.remove()
              } catch (err) {
                 setError('Failed to initiate secure download.')
              }
            }}
            className='flex items-center gap-4 px-8 py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-2xl hover:border-teal-200 hover:text-teal-600 transition-all shadow-sm group'
          >
            <span className="group-hover:translate-y-0.5 transition-transform">📥</span> 
            <span className="text-xs uppercase tracking-widest">Ingest Logic Schema</span>
          </button>

          <button
            onClick={handlePreview}
            className='flex items-center gap-4 px-8 py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-2xl hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm group'
          >
            <span className="group-hover:scale-110 transition-transform">👁️</span> 
            <span className="text-xs uppercase tracking-widest">Simulate Experience</span>
          </button>

          <button
            onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
            className='flex items-center gap-4 px-10 py-4 bg-teal-500 text-white font-black rounded-2xl hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/30 transform hover:-translate-y-1 active:scale-95'
          >
            <span className='text-xl'>+</span> 
            <span className="text-xs uppercase tracking-widest">Architect New Segment</span>
          </button>
        </div>
      </div>

      {error && (
        <div className='mb-10 p-6 bg-rose-50 border border-rose-100 text-rose-600 rounded-3xl text-xs font-black uppercase tracking-widest flex items-center gap-4 animate-slideDown'>
          <span className="text-xl">⚠️</span> {error}
        </div>
      )}

      {/* Lessons List Grid */}
      <div className='grid grid-cols-1 gap-8'>
        {lessons.length === 0 ? (
          <div className='text-center py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 shadow-inner group transition-all hover:border-teal-100'>
            <div className='text-9xl mb-10 group-hover:scale-110 transition-transform duration-700 opacity-20'>🏛️</div>
            <h3 className="text-3xl font-black text-slate-800 mb-4 font-['Outfit']">Logical Void Detected</h3>
            <p className='text-slate-400 mb-12 max-w-sm mx-auto font-medium text-lg leading-relaxed'>Deploy your first instructional module to initiate the curriculum lattice.</p>
            <button
              onClick={() => navigate(`/content-provider/lessons/${courseId}/create`)}
              className='px-12 py-5 bg-teal-500 text-white font-black rounded-2xl hover:bg-teal-600 transition shadow-2xl shadow-teal-500/40 text-sm uppercase tracking-[0.2em]'
            >
              Initiate Primary Segment
            </button>
          </div>
        ) : (
          <div className='space-y-8 pb-32'>
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className='group relative bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-50 hover:-translate-y-2 overflow-hidden'
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full translate-x-20 -translate-y-20 blur-3xl group-hover:bg-rose-50/50 transition-colors duration-1000"></div>

                <div className='relative flex flex-col xl:flex-row items-start xl:items-center gap-10'>
                  {/* Sequence Gauge */}
                  <div className='flex-shrink-0 w-24 h-24 bg-slate-50 text-slate-300 rounded-[2.5rem] flex items-center justify-center font-black text-4xl group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-xl group-hover:shadow-teal-500/40 font-["Outfit"]'>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className='flex-1 space-y-4'>
                    <div className="flex items-center gap-4 mb-2">
                       <span className="text-[10px] uppercase font-black tracking-widest text-teal-400 group-hover:text-rose-400 transition-colors">Segment Active</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 font-['Outfit'] group-hover:text-teal-600 transition-all leading-tight">{lesson.title}</h3>
                    <p className='text-slate-400 font-medium line-clamp-2 max-w-3xl leading-relaxed'>{lesson.content || 'Content payload descriptors not provisioned for this segment.'}</p>

                    <div className='flex flex-wrap gap-4 mt-8'>
                      <div className='flex items-center gap-3 px-5 py-2.5 bg-slate-50 text-slate-500 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-white group-hover:border-teal-100 transition-all'>
                        <span className="text-lg">📖</span> 
                        <span className="text-[10px] font-black uppercase tracking-widest">{lesson.sectionCount || 0} Behavioral Strata</span>
                      </div>
                      <div className='flex items-center gap-3 px-5 py-2.5 bg-slate-50 text-slate-500 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-white group-hover:border-indigo-100 transition-all'>
                        <span className="text-lg">🎯</span> 
                        <span className="text-[10px] font-black uppercase tracking-widest">{lesson.quizCount || 0} Assessment Nodes</span>
                      </div>
                      <div className='flex items-center gap-3 px-5 py-2.5 bg-slate-50 text-slate-500 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-white group-hover:border-rose-100 transition-all'>
                        <span className="text-lg">⏱️</span> 
                        <span className="text-[10px] font-black uppercase tracking-widest">{lesson.duration || '0'} Min Quantization</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-wrap gap-4 w-full xl:w-auto xl:justify-end xl:pl-10 xl:border-l border-slate-100 mt-6 xl:mt-0'>
                    <button
                      onClick={() => navigate(`/content-provider/lessons/${lesson.id}/edit`)}
                      className='flex-1 xl:flex-none px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 text-[10px] uppercase tracking-widest'
                    >
                      Refine Logic
                    </button>
                    <button
                      onClick={() => navigate(`/content-provider/quizzes/${lesson.id}/create`)}
                      className='flex-1 xl:flex-none px-8 py-4 bg-teal-500 text-white font-black rounded-2xl hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 text-[10px] uppercase tracking-widest'
                    >
                      + Assessment
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Initiate destructive segment purging?')) {
                          apiClient.delete(`/content-provider/lessons/${lesson.id}`)
                            .then(() => {
                              loadLessons()
                            })
                            .catch(err => {
                              setError('Purge Protocol Failed: ' + (err.response?.data?.error || err.message))
                            })
                        }
                      }}
                      className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-2xl"
                      title="Decommission Segment"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
