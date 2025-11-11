import React from 'react'
import { Link } from 'react-router-dom'
import NewsletterSignup from './NewsletterSignup'

export default function Sidebar() {
  const newLessons = [
    { id: 1, title: 'Modal Verbs Guide', date: 'Nov 10' },
    { id: 2, title: 'Advanced Phrasal Verbs', date: 'Nov 8' },
    { id: 3, title: 'Idioms in Context', date: 'Nov 5' },
  ]

  const popularTopics = [
    { id: 1, title: 'Present Perfect Tense', views: '2.5K' },
    { id: 2, title: 'Common English Mistakes', views: '2.1K' },
    { id: 3, title: 'Business English', views: '1.8K' },
    { id: 4, title: 'British vs American English', views: '1.6K' },
  ]

  return (
    <div className="space-y-6">
      {/* New & Latest */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-teal-600">
        <h3 className="font-bold text-slate-800 mb-4">🆕 New Lessons</h3>
        <div className="space-y-3">
          {newLessons.map(lesson => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="block p-3 bg-slate-50 rounded hover:bg-teal-50 border-l-3 border-transparent hover:border-teal-600 transition"
            >
              <div className="font-medium text-slate-700 text-sm">{lesson.title}</div>
              <div className="text-xs text-slate-500 mt-1">{lesson.date}</div>
            </Link>
          ))}
        </div>
        <Link to="/lessons" className="inline-block mt-4 text-teal-600 font-semibold hover:text-teal-700 text-sm">
          View all →
        </Link>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-rose-400">
        <h3 className="font-bold text-slate-800 mb-4">⭐ Popular Topics</h3>
        <div className="space-y-3">
          {popularTopics.map(topic => (
            <Link
              key={topic.id}
              to={`/lessons?topic=${topic.id}`}
              className="block p-3 bg-slate-50 rounded hover:bg-teal-50 border-l-3 border-transparent hover:border-rose-400 transition"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-slate-700 text-sm">{topic.title}</div>
                <div className="text-xs text-slate-500 bg-white px-2 py-1 rounded">{topic.views}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Pro Features */}
      <div className="bg-gradient-to-br from-teal-600 to-rose-400 text-white rounded-lg p-6">
        <h3 className="font-bold mb-3">✨ Go Premium</h3>
        <p className="text-sm mb-4 text-white/90">
          Unlock unlimited lessons, quizzes, and personalized learning paths.
        </p>
        <button className="w-full px-4 py-2 bg-white text-teal-700 font-bold rounded hover:bg-slate-100 transition text-sm">
          Upgrade Now
        </button>
      </div>
    </div>
  )
}
