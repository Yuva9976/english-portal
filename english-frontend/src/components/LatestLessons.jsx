import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const lessons = [
  { slug: 'grammar', title: 'Grammar Essentials', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', description: 'Master English grammar rules and structures' },
  { slug: 'vocabulary', title: 'Vocabulary Building', img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop', description: 'Expand your English vocabulary effectively' },
  { slug: 'pronunciation', title: 'Pronunciation Guide', img: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop', description: 'Perfect your English pronunciation' },
  { slug: 'listening', title: 'Listening Skills', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', description: 'Improve your English listening comprehension' },
  { slug: 'reading', title: 'Reading Practice', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop', description: 'Enhance your English reading skills' },
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
          <Link key={l.slug} to={`/modules/learn-english/${l.slug}`} className="min-w-[260px] bg-white rounded-lg shadow overflow-hidden shrink-0 hover:shadow-xl transition transform hover:scale-105">
            <img src={l.img} alt={l.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="font-semibold text-slate-800">{l.title}</div>
              <div className="text-sm text-slate-600 mt-2">{l.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
