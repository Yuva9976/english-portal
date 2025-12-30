import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../apiClient'

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
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <button
          onClick={() => navigate('/content-provider')}
          className='mb-8 text-slate-400 hover:text-white transition flex items-center gap-2'
        >
          ← Back to Dashboard
        </button>

        <div className='bg-slate-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold mb-2'>Create New Course</h1>
          <p className='text-slate-400 mb-8'>Design a comprehensive course for your learners</p>

          {error && (
            <div className='mb-6 p-4 bg-red-600 text-red-100 rounded-lg'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Title */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Course Title *</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='e.g., Advanced English Grammar'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
              />
              <p className='text-xs text-slate-400 mt-1'>Give your course a clear, descriptive title</p>
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Course Description *</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe what learners will learn in this course...'
                rows='6'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
              />
              <p className='text-xs text-slate-400 mt-1'>Make it compelling to attract learners</p>
            </div>

            {/* Category */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Level</label>
              <select
                name='level'
                value={formData.level}
                onChange={handleChange}
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Thumbnail Emoji */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Course Icon (Emoji)</label>
              <div className='flex gap-2 flex-wrap'>
                {['📚', '🎓', '✏️', '🧠', '💬', '🎯', '🌍', '⭐'].map(emoji => (
                  <button
                    key={emoji}
                    type='button'
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: emoji }))}
                    className={`text-3xl p-3 rounded-lg transition ${
                      formData.thumbnail === emoji
                        ? 'bg-purple-600 ring-2 ring-purple-400'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className='mt-8 p-6 bg-slate-700 rounded-lg'>
              <h3 className='text-sm font-semibold mb-4 text-slate-300'>PREVIEW</h3>
              <div className='bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg'>
                <div className='text-5xl mb-4'>{formData.thumbnail}</div>
                <h4 className='text-2xl font-bold mb-2'>{formData.title || 'Course Title'}</h4>
                <p className='text-sm text-slate-100 line-clamp-3'>{formData.description || 'Course description will appear here'}</p>
                <div className='mt-4 flex gap-2'>
                  <span className='px-3 py-1 bg-white text-purple-600 text-xs rounded-full font-semibold'>{formData.category}</span>
                  <span className='px-3 py-1 bg-white text-purple-600 text-xs rounded-full font-semibold'>{formData.level}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-4 pt-6'>
              <button
                type='button'
                onClick={() => navigate('/content-provider')}
                className='flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition disabled:opacity-50'
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
