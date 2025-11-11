import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TeacherTools() {
  const [activeTab, setActiveTab] = useState('resources')

  const resources = [
    { id: 1, title: 'Lesson Plan Templates', desc: 'Ready-to-use templates for lesson planning.', icon: '📋' },
    { id: 2, title: 'Grammar Worksheets', desc: 'Printable worksheets for various grammar topics.', icon: '📄' },
    { id: 3, title: 'Vocabulary Games', desc: 'Interactive games to teach vocabulary.', icon: '🎮' },
    { id: 4, title: 'Listening Audio', desc: 'Audio files for listening comprehension lessons.', icon: '🎧' },
    { id: 5, title: 'Speaking Activities', desc: 'Activities to practice speaking skills.', icon: '🗣️' },
    { id: 6, title: 'Assessment Tools', desc: 'Tools to evaluate student progress.', icon: '📊' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-rose-400 text-white py-12 rounded-lg">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-3">Teacher Tools & Resources</h1>
          <p className="text-lg max-w-2xl">Access a comprehensive collection of resources to enhance your English teaching. Free materials, lesson plans, and assessment tools.</p>
        </div>
      </section>

      {/* Tabs */}
      <div className="container mx-auto px-6">
        <div className="flex gap-4 border-b border-slate-300">
          {['resources', 'materials', 'community'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-600 hover:text-teal-600'
              }`}
            >
              {tab === 'resources' && '📚 Resources'}
              {tab === 'materials' && '✏️ Materials'}
              {tab === 'community' && '👥 Community'}
            </button>
          ))}
        </div>

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {resources.map(r => (
              <div key={r.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-4xl mb-3">{r.icon}</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{r.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{r.desc}</p>
                <button className="text-teal-600 font-semibold hover:text-teal-700 transition">
                  View & Download →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="mt-8 space-y-4">
            <div className="bg-teal-50 border-2 border-teal-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">📦 Material Packs</h3>
              <div className="space-y-3">
                {['Beginner Pack (A1)', 'Elementary Pack (A2)', 'Intermediate Pack (B1)', 'Upper-Intermediate Pack (B2)'].map(pack => (
                  <div key={pack} className="flex items-center justify-between bg-white p-4 rounded border border-teal-200">
                    <span className="text-slate-700 font-medium">{pack}</span>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-3">Teacher Community</h3>
              <p className="text-slate-600 max-w-xl mx-auto mb-6">
                Join thousands of English teachers worldwide. Share lesson plans, ask questions, and collaborate with fellow educators.
              </p>
              <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition">
                Join Our Forum
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Featured Resources */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-teal-600">
            <h3 className="font-semibold text-slate-800 mb-2">✨ Best Practice: Creating Engaging Lessons</h3>
            <p className="text-sm text-slate-600 mb-3">Learn how to design lessons that keep students motivated and engaged throughout the course.</p>
            <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">Read Article →</a>
          </div>
          <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-teal-600">
            <h3 className="font-semibold text-slate-800 mb-2">🎓 Assessment Strategies for Remote Learning</h3>
            <p className="text-sm text-slate-600 mb-3">Effective ways to evaluate student progress and provide feedback in online English classes.</p>
            <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">Read Article →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Need More Resources?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Create an account or log in to access premium teacher materials, student progress tracking, and more.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="px-6 py-3 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition">
              Login
            </Link>
            <Link to="/register" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
