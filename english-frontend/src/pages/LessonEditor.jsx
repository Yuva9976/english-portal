import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'
import NavBar from '../components/NavBar'
import SiteFooter from '../components/SiteFooter'

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
    <div className='min-h-screen bg-slate-50 flex flex-col'>
      <NavBar />
      <div className='flex-1 container mx-auto px-4 md:px-6 py-12'>
        {/* Back Button */}
        <button
          onClick={() => navigate(`/content-provider/courses/${courseId}/lessons`)}
          className='mb-8 text-slate-500 hover:text-teal-600 transition flex items-center gap-2 font-medium'
        >
          <span className="text-xl">←</span> Back to Lessons
        </button>

        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>
            <div className='flex items-center gap-4 mb-8'>
              <div className='w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm'>
                {lessonId ? '📝' : '✨'}
              </div>
              <div>
                <h1 className='text-3xl font-bold text-slate-800'>{lessonId ? 'Edit' : 'Create'} Lesson</h1>
                <p className='text-slate-500'>Craft engaging content for your students</p>
              </div>
            </div>

            {error && (
              <div className='mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='grid md:grid-cols-2 gap-6'>
                {/* Title */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-bold text-slate-700 mb-2'>Lesson Title *</label>
                  <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='e.g., Present Perfect Tense'
                    className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all'
                  />
                </div>

                {/* Description */}
                <div className='md:col-span-2'>
                  <label className='block text-sm font-bold text-slate-700 mb-2'>Short Description</label>
                  <input
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='A brief overview of what this lesson covers'
                    className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all'
                  />
                </div>
              </div>

              {/* Video Section */}
              <div className='bg-slate-50 p-6 rounded-2xl border border-slate-100'>
                <div className='flex items-center gap-2 mb-4'>
                  <span className='text-xl'>📹</span>
                  <h3 className='font-bold text-slate-800'>Video Lesson</h3>
                </div>
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <input
                      type='file'
                      accept='video/*'
                      onChange={handleVideoChange}
                      className='w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={handleVideoUpload}
                    disabled={!videoFile || uploading}
                    className='px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 disabled:opacity-50 transition shadow-md shadow-teal-500/10'
                  >
                    {uploading ? 'Uploading...' : 'Upload Video'}
                  </button>
                </div>
                {formData.videoUrl && (
                  <div className='mt-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm flex items-center gap-2'>
                    <span>✅</span> Video Ready: <span className='font-mono font-bold'>{formData.videoUrl}</span>
                  </div>
                )}
              </div>

              {/* Content Editor */}
              <div>
                <label className='block text-sm font-bold text-slate-700 mb-2'>Lesson Content *</label>
                <div className='relative'>
                  <textarea
                    name='content'
                    value={formData.content}
                    onChange={handleChange}
                    placeholder='Write your lesson content here. Support Markdown formatting...'
                    rows='12'
                    className='w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-mono text-sm leading-relaxed'
                  />
                  <div className='absolute bottom-4 right-4'>
                    <span className='text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100'>MARKDOWN SUPPORTED</span>
                  </div>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                {/* Duration */}
                <div>
                  <label className='block text-sm font-bold text-slate-700 mb-2'>Estimated Duration (minutes)</label>
                  <div className='relative'>
                    <input
                      type='number'
                      name='duration'
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder='0'
                      min='0'
                      className='w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-teal-500 transition-all'
                    />
                    <span className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs'>MIN</span>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className='flex gap-4 pt-8 border-t border-slate-50'>
                <button
                  type='button'
                  onClick={() => navigate(`/content-provider/courses/${courseId}/lessons`)}
                  className='flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition'
                >
                  Discard
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-rose-500 hover:from-teal-700 hover:to-rose-600 text-white font-bold rounded-xl transition shadow-lg shadow-teal-500/20 disabled:opacity-50'
                >
                  {loading ? 'Saving...' : 'Publish Lesson'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
