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
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-teal-900 tracking-tighter uppercase font-['Outfit']">Latest Lessons</h2>
            <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase rounded-lg border border-teal-100 shadow-sm">Fresh Content</span>
          </div>
          {token && lessons.length > 0 && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => scroll('prev')} 
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 text-teal-600 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-200 transition-all active:scale-90"
              >
                <span className="transform -translate-x-0.5">←</span>
              </button>
              <button 
                onClick={() => scroll('next')} 
                className="w-10 h-10 flex items-center justify-center bg-teal-500 text-white rounded-2xl shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all active:scale-90"
              >
                <span className="transform translate-x-0.5">→</span>
              </button>
            </div>
          )}
        </div>

        <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pb-10 -mx-4 px-4">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[320px] h-[400px] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
            ))
          ) : lessons.length === 0 ? (
            <div className="w-full py-24 text-center text-slate-400 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-inner">
               <div className="text-4xl mb-4">📚</div>
               <p className="text-sm font-semibold uppercase tracking-widest font-['Inter']">Our shelves are being restocked. Check back soon!</p>
            </div>
          ) : (
            lessons.map(l => (
              <div
                key={l.id}
                onClick={() => handleCardClick(l.id)}
                className="min-w-[320px] group relative bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/40 shrink-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/10 cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                  <img
                    src={l.media_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'}
                    alt={l.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-teal-600 shadow-sm">
                    {l.level || 'Beginner'}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-teal-900 tracking-tight leading-tight mb-2 group-hover:text-teal-600 transition-colors line-clamp-1 font-['Outfit']">{l.title}</h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6 font-['Inter']">{l.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-[8px]">✨</div>
                      <div className="w-6 h-6 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-[8px]">📖</div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-400">+</div>
                    </div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest group-hover:mr-2 transition-all">Start Lesson →</span>
                  </div>
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
