import React from 'react'
import { Link } from 'react-router-dom'

const topics = [
  { key: 'grammar', title: 'Grammar', desc: 'Rules and practice for correct English.' },
  { key: 'vocab', title: 'Vocabulary', desc: 'Build your word power with themed lists.' },
  { key: 'pronunciation', title: 'Pronunciation', desc: 'Improve your sounds and intonation.' },
  { key: 'listening', title: 'Listening', desc: 'Short audio lessons with questions.' },
  { key: 'speaking', title: 'Speaking', desc: 'Practice speaking and dialogues.' },
  { key: 'reading', title: 'Reading', desc: 'Short texts with comprehension.' },
]

export default function FeaturedTopics(){
  return (
    <section className="container mx-auto px-6 md:px-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Featured Topics</h2>
        <Link to="/lessons" className="text-teal-600 font-medium hover:text-teal-700">See all topics</Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map(t => (
          <Link key={t.key} to={`/lessons?topic=${t.key}`} className="block bg-white rounded-lg p-6 shadow hover:shadow-xl transition transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 text-white flex items-center justify-center font-bold">{t.title[0]}</div>
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-slate-600 mt-1">{t.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
