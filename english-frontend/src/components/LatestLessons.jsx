import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const lessons = [
  { id: 1, title: 'Everyday Conversations', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Grammar Essentials', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Listening Practice', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Phrasal Verbs', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Idioms in Use', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop' },
]

export default function LatestLessons(){
  const ref = useRef(null)

  function scroll(dir = 'next'){
    if (!ref.current) return
    const width = ref.current.clientWidth
    ref.current.scrollBy({ left: dir === 'next' ? width : -width, behavior: 'smooth' })
  }

  return (
    <section className="container mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">Latest Lessons</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll('prev')} className="px-3 py-1 bg-teal-600 text-white rounded shadow hover:bg-teal-700">◀</button>
          <button onClick={() => scroll('next')} className="px-3 py-1 bg-teal-600 text-white rounded shadow hover:bg-teal-700">▶</button>
        </div>
      </div>

      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
        {lessons.map(l => (
          <Link key={l.id} to={`/lessons/${l.id}`} className="min-w-[260px] bg-white rounded-lg shadow overflow-hidden shrink-0 hover:shadow-xl transition transform hover:scale-105">
            <img src={l.img} alt={l.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold text-slate-800">{l.title}</div>
              <div className="text-sm text-slate-600 mt-2">Short description goes here.</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
