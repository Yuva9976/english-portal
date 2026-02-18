import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'

export default function CreateCourse() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'English',
    level: 'Beginner',
    thumbnail: '📚'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      const res = await apiClient.post('/content-provider/courses', formData)
      if (res.data?.courseId) {
        navigate(`/content-provider/courses/${res.data.courseId}/lessons`)
      } else {
        navigate('/content-provider')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  const categories = ['English', 'Grammar', 'Vocabulary', 'Pronunciation', 'Listening', 'Speaking', 'Reading', 'Writing']
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <NavBar />
      <div className='flex-1 container mx-auto px-4 md:px-6 py-12'>
        {/* Breadcrumbs/Back Button */}
        <button
          onClick={() => navigate('/content-provider')}
          className='mb-8 text-slate-500 hover:text-teal-600 transition flex items-center gap-2 font-medium'
        >
          <span className="text-xl">←</span> Back to Dashboard
        </button>

        <div className='max-w-4xl mx-auto'>
          <div className='grid lg:grid-cols-5 gap-8'>
            {/* Form Column */}
            <div className='lg:col-span-3 space-y-6'>
              <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>
                <h1 className='text-3xl font-bold text-slate-800 mb-2'>Create New Course</h1>
                <p className='text-slate-500 mb-8'>Design a comprehensive course for your learners</p>

                {error && (
                  <div className='mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium'>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Title */}
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Course Title *</label>
                    <input
                      type='text'
                      name='title'
                      value={formData.title}
                      onChange={handleChange}
                      placeholder='e.g., Advanced English Grammar'
                      className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all'
                    />
                    <p className='text-xs text-slate-400 mt-2 italic'>Give your course a clear, descriptive title</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Course Description *</label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleChange}
                      placeholder='Describe what learners will learn in this course...'
                      rows='5'
                      className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all resize-none'
                    />
                    <p className='text-xs text-slate-400 mt-2 italic'>Make it compelling to attract learners</p>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    {/* Category */}
                    <div>
                      <label className='block text-sm font-semibold text-slate-700 mb-2'>Category</label>
                      <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all'
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Level */}
                    <div>
                      <label className='block text-sm font-semibold text-slate-700 mb-2'>Level</label>
                      <select
                        name='level'
                        value={formData.level}
                        onChange={handleChange}
                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all'
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Thumbnail Emoji */}
                  <div>
                    <label className='block text-sm font-semibold text-slate-700 mb-2'>Course Icon (Emoji)</label>
                    <div className='flex gap-2 flex-wrap'>
                      {['📚', '🎓', '✏️', '🧠', '💬', '🎯', '🌍', '⭐'].map(emoji => (
                        <button
                          key={emoji}
                          type='button'
                          onClick={() => setFormData(prev => ({ ...prev, thumbnail: emoji }))}
                          className={`text-2xl p-3 rounded-xl transition-all duration-200 ${formData.thumbnail === emoji
                              ? 'bg-teal-500 text-white shadow-lg shadow-teal-200 scale-110'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className='flex gap-4 pt-6'>
                    <button
                      type='button'
                      onClick={() => navigate('/content-provider')}
                      className='flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={loading}
                      className='flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-rose-500 hover:from-teal-700 hover:to-rose-600 text-white font-bold rounded-xl transition shadow-lg shadow-teal-500/20 disabled:opacity-50'
                    >
                      {loading ? 'Creating...' : 'Create Course'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Preview Column */}
            <div className='lg:col-span-2'>
              <div className='sticky top-8 space-y-6'>
                <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-6'>
                  <h3 className='text-sm font-bold text-slate-400 uppercase tracking-widest mb-6'>Live Preview</h3>

                  <div className='bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg group'>
                    <div className='h-3 bg-gradient-to-r from-purple-600 to-pink-600'></div>
                    <div className='p-6'>
                      <div className='text-5xl mb-6 flex justify-center py-8 bg-slate-50 rounded-xl'>{formData.thumbnail}</div>

                      <div className='flex gap-2 mb-4'>
                        <span className='px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase rounded-full'>{formData.category}</span>
                        <span className='px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase rounded-full'>{formData.level}</span>
                      </div>

                      <h4 className='text-2xl font-bold text-slate-800 mb-3 line-clamp-2'>{formData.title || 'Course Title'}</h4>
                      <p className='text-sm text-slate-500 line-clamp-4 leading-relaxed'>{formData.description || 'Provide a description to see how it looks here. This content helps learners understand what they will achieve.'}</p>

                      <div className='mt-8 pt-6 border-t border-slate-50 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div className='w-8 h-8 rounded-full bg-slate-100'></div>
                          <div className='h-3 w-20 bg-slate-100 rounded'></div>
                        </div>
                        <div className='h-8 w-24 bg-teal-500 rounded-lg opacity-50'></div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100'>
                    <div className='flex gap-3'>
                      <span className='text-teal-600'>💡</span>
                      <p className='text-xs text-teal-700 leading-relaxed font-medium'>
                        Tip: Use clear titles and actionable descriptions to increase course enrollment rates by up to 40%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
