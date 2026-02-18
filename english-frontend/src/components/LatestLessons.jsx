import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginRequiredModal from './LoginRequiredModal'
import apiClient from '../apiClient'

export default function LatestLessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await apiClient.get('/lessons')
        // The /api/lessons returns { items: [...] }
        setLessons(res.data?.items || [])
      } catch (err) {
        console.error('Failed to fetch lessons:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLessons()
  }, [])

  function scroll(dir = 'next') {
    if (!ref.current) return
    const width = ref.current.clientWidth
    ref.current.scrollBy({ left: dir === 'next' ? width : -width, behavior: 'smooth' })
  }

  const handleCardClick = (id) => {
    if (!token) {
      setShowLoginModal(true)
      return
    }
    navigate(`/lessons/${id}`)
  }

  return (
    <>
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-slate-800">Latest Lessons</h2>
          {token && (
            <div className="flex items-center gap-2">
              <button onClick={() => scroll('prev')} className="px-3 py-1 bg-teal-600 text-white rounded shadow hover:bg-teal-700">◀</button>
              <button onClick={() => scroll('next')} className="px-3 py-1 bg-teal-600 text-white rounded shadow hover:bg-teal-700">▶</button>
            </div>
          )}
        </div>

        <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[260px] h-64 bg-slate-100 animate-pulse rounded-lg"></div>
            ))
          ) : lessons.length === 0 ? (
            <div className="w-full py-12 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              No lessons available yet.
            </div>
          ) : (
            lessons.map(l => (
              <div
                key={l.id}
                onClick={() => handleCardClick(l.id)}
                className="min-w-[260px] bg-white rounded-lg shadow overflow-hidden shrink-0 transition transform hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                <img
                  src={l.media_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'}
                  alt={l.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="font-semibold text-slate-800 line-clamp-1">{l.title}</div>
                  <div className="text-sm text-slate-600 mt-2 line-clamp-2">{l.description}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}
