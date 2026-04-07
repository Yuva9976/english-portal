import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'

export default function CreateCourse() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'English',
    level: 'Beginner',
    thumbnail: '📚'
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  const loadCourse = async () => {
    setFetching(true)
    try {
      const res = await apiClient.get(`/content-provider/courses/${courseId}`)
      if (res.data?.course) {
        const { title, description, level } = res.data.course
        setFormData(prev => ({
          ...prev,
          title: title || '',
          description: description || '',
          level: level || 'Beginner'
        }))
      }
    } catch (err) {
      console.error('Failed to load course:', err)
      setError('Failed to load course details')
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      setError('Title and description are required')
      return
    }

    setLoading(true)
    try {
      let res;
      if (courseId) {
        res = await apiClient.put(`/content-provider/courses/${courseId}`, formData)
      } else {
        res = await apiClient.post('/content-provider/courses', formData)
      }

      setSuccess(`Course ${courseId ? 'Revision Saved' : 'Created'}! Redirecting to Lesson Architecture...`);
      
      setTimeout(() => {
        const targetId = res.data?.courseId || courseId;
        navigate(`/content-provider/courses/${targetId}/lessons`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${courseId ? 'update' : 'create'} course`)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['English', 'Grammar', 'Vocabulary', 'Pronunciation', 'Listening', 'Speaking', 'Reading', 'Writing']
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 selection:bg-teal-100'>
      <div className='container mx-auto px-6 py-16 max-w-7xl'>
        {/* Breadcrumbs/Back Button */}
        <button
          onClick={() => navigate('/content-provider')}
          className="mb-12 group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all font-bold text-sm"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-['Inter']">Back to Portal</span>
        </button>

        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-12 gap-12'>
            {/* Form Column */}
            <div className='lg:col-span-7 space-y-8'>
              <div className='bg-white rounded-[3rem] shadow-sm border border-slate-100 p-12 relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full translate-x-32 -translate-y-32 -z-0" />

                <h1 className="text-4xl font-black bg-gradient-to-r from-teal-600 to-pink-500 bg-clip-text text-transparent mb-2 font-['Outfit'] relative z-10">
                  {courseId ? 'Refine Curriculum' : 'Architect a Course'}
                </h1>
                <p className="text-slate-500 mb-12 font-medium font-['Inter'] relative z-10">
                  {courseId ? 'Update your course parameters for optimal learning delivery.' : 'Design a comprehensive educational experience from scratch.'}
                </p>

                {error && (
                  <div className='mb-8 p-5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3 animate-headShake'>
                    <span className="text-xl">⚠️</span> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-8 relative z-10'>
                  {/* Title */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Curriculum Title</label>
                    <input
                      type='text'
                      name='title'
                      value={formData.title}
                      onChange={handleChange}
                      placeholder='e.g., Master Architecture of English'
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-8 focus:ring-teal-500/5 transition-all text-lg font-['Inter']"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Scope & Objectives</label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleChange}
                      placeholder='Explicitly define the learning outcomes...'
                      rows='5'
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-slate-800 font-medium placeholder-slate-300 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-8 focus:ring-teal-500/5 transition-all resize-none font-['Inter']"
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-6'>
                    {/* Category */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Domain</label>
                      <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-slate-800 font-bold focus:outline-none focus:border-teal-500 focus:bg-white transition-all appearance-none cursor-pointer font-['Inter']"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Level spinning icon logic or just style */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Difficulty</label>
                      <select
                        name='level'
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-slate-800 font-bold focus:outline-none focus:border-teal-500 focus:bg-white transition-all appearance-none cursor-pointer font-['Inter']"
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Thumbnail Emoji Selector */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Visual Identity (Icon)</label>
                    <div className='flex gap-3 flex-wrap'>
                      {['📚', '🎓', '✏️', '🧠', '💬', '🎯', '🌍', '⭐'].map(emoji => (
                        <button
                          key={emoji}
                          type='button'
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail: emoji }))}
                          className={`text-3xl w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${formData.thumbnail === emoji
                            ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/30 scale-110 -translate-y-1'
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className='flex gap-6 pt-10'>
                    <button
                      type='button'
                      onClick={() => navigate('/content-provider')}
                      className="px-8 py-4 bg-slate-100 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all font-['Inter'] text-sm"
                    >
                      ABORT
                    </button>
                    <button
                      type='submit'
                      disabled={loading || fetching}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-teal-500 via-teal-600 to-pink-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 font-['Outfit'] text-lg uppercase tracking-widest"
                    >
                      {loading ? (courseId ? 'Updating...' : 'Building...') : (courseId ? 'Save Revisions' : 'Deploy Course')}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Preview Column */}
            <div className='lg:col-span-5'>
              <div className='sticky top-12 space-y-8'>
                {success && (
                  <div className='p-6 bg-teal-500 text-white rounded-[2rem] shadow-2xl shadow-teal-500/30 font-black text-sm uppercase tracking-widest animate-bounce flex items-center gap-4 border-4 border-white'>
                    <span className='text-2xl'>✨</span>
                    {success}
                  </div>
                )}

                <div className='bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/50 relative overflow-hidden border border-slate-100'>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/30 rounded-full translate-x-32 -translate-y-32" />
                  
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <h3 className="text-[10px] font-black text-[#0D9488] uppercase tracking-[0.3em]">Holographic Preview</h3>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#0D9488]" />
                      <div className="w-2 h-2 rounded-full bg-[#F43F5E]" />
                    </div>
                  </div>

                  <div className='relative z-10 space-y-8'>
                    <div className='text-7xl mb-10 flex justify-center py-12 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner group transition-transform hover:scale-105 duration-500'>
                      {formData.thumbnail}
                    </div>

                    <div className='flex gap-2.5 mb-6'>
                      <span className='px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[9px] font-black uppercase rounded-lg border border-teal-100'>{formData.category || 'English'}</span>
                      <span className='px-4 py-1.5 bg-pink-50 text-[#F43F5E] text-[9px] font-black uppercase rounded-lg border border-pink-100'>{formData.level}</span>
                    </div>

                    <h4 className="text-2xl font-black text-slate-800 mb-4 line-clamp-2 font-['Outfit'] leading-tight tracking-tight uppercase">
                      {formData.title || 'Architect Your Course'}
                    </h4>
                    
                    <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed font-['Inter'] font-semibold mb-8 italic">
                      "{formData.description || 'Define the curriculum scope to visualize the learner experience. Premium design ensures high engagement and retention scores.'}"
                    </p>

                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">CP</div>
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logic Authority</div>
                      </div>
                      <div className="w-12 h-12 bg-[#0D9488] text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-teal-500/20">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
