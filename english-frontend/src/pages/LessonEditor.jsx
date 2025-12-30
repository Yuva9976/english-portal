import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'

export default function LessonEditor() {
  const navigate = useNavigate()
  const { lessonId, courseId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    duration: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files?.[0])
  }

  const handleVideoUpload = async () => {
    if (!videoFile) return

    setUploading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append('video', videoFile)

      const res = await apiClient.post('/content-provider/upload/video', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data?.videoUrl) {
        setFormData(prev => ({
          ...prev,
          videoUrl: res.data.videoUrl
        }))
        setVideoFile(null)
      }
    } catch (err) {
      setError('Failed to upload video')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.content) {
      setError('Title and content are required')
      return
    }

    setLoading(true)
    try {
      if (lessonId) {
        await apiClient.put(`/content-provider/lessons/${lessonId}`, formData)
      } else {
        await apiClient.post(`/content-provider/lessons/${courseId}`, formData)
      }

      navigate(`/content-provider/courses/${courseId}/lessons`)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save lesson')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <button
          onClick={() => navigate(`/content-provider/courses/${courseId}/lessons`)}
          className='mb-8 text-slate-400 hover:text-white transition flex items-center gap-2'
        >
          ← Back to Lessons
        </button>

        <div className='bg-slate-800 rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold mb-8'>{lessonId ? 'Edit' : 'Create'} Lesson</h1>

          {error && (
            <div className='mb-6 p-4 bg-red-600 text-red-100 rounded-lg'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Title */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Lesson Title *</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='e.g., Present Perfect Tense'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Description</label>
              <input
                type='text'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Brief lesson description'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Video Upload */}
            <div className='bg-slate-700 p-6 rounded-lg'>
              <h3 className='font-semibold mb-4'>📹 Video Upload</h3>
              <div className='flex gap-4'>
                <input
                  type='file'
                  accept='video/*'
                  onChange={handleVideoChange}
                  className='flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded text-sm'
                />
                <button
                  type='button'
                  onClick={handleVideoUpload}
                  disabled={!videoFile || uploading}
                  className='px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 transition'
                >
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </button>
              </div>
              {formData.videoUrl && (
                <div className='mt-4 p-3 bg-green-600 text-green-100 rounded'>
                  ✅ Video uploaded: {formData.videoUrl}
                </div>
              )}
            </div>

            {/* Content (Rich Text Editor) */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Lesson Content *</label>
              <textarea
                name='content'
                value={formData.content}
                onChange={handleChange}
                placeholder='Write your lesson content here. Support Markdown formatting...'
                rows='12'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 font-mono text-sm'
              />
              <p className='text-xs text-slate-400 mt-2'>
                💡 Tip: Use **bold**, *italic*, - bullets, or [Link](url) for formatting
              </p>
            </div>

            {/* Duration */}
            <div>
              <label className='block text-sm font-semibold mb-2'>Duration (minutes)</label>
              <input
                type='number'
                name='duration'
                value={formData.duration}
                onChange={handleChange}
                placeholder='0'
                min='0'
                className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500'
              />
            </div>

            {/* Buttons */}
            <div className='flex gap-4 pt-6'>
              <button
                type='button'
                onClick={() => navigate(`/content-provider/courses/${courseId}/lessons`)}
                className='flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition disabled:opacity-50'
              >
                {loading ? 'Saving...' : 'Save Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
