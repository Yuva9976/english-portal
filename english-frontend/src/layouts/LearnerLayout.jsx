import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import apiClient from '../apiClient'
import SiteFooter from '../components/SiteFooter'
import LearnerSidebar from '../components/LearnerSidebar'

export default function LearnerLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({})
  const location = useLocation()

  useEffect(() => {
    // Fetch profile data
    apiClient.get('/dashboard/learner')
      .then(res => {
        setProfile(res.data?.profile)
        setStats({
          attendance: res.data?.attendance,
          tasks: res.data?.tasks,
          xp: res.data?.profile?.xp || 0
        })
      })
      .catch(err => console.error('Failed to load profile:', err))
  }, [])

  const isActive = (path) => {
    if (path === '/learner') return location.pathname === '/learner'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* ========== TOP HEADER - REDESIGNED ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        {/* Top Bar */}
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 flex items-center justify-center border border-teal-500/20 group">
              <div className="w-9 h-9 rounded-lg bg-[#14b8a6] flex items-center justify-center font-bold text-white text-sm shadow-sm transform group-hover:scale-105 transition-transform">EC</div>
            </div>
            <div>
              <Link to="/" className="block leading-none mb-0.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '17px', color: '#0f766e', letterSpacing: '-0.3px' }}>EnglishClub</Link>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '11px', color: '#64748b' }}>Learn • Teach • Explore</div>
            </div>
          </div>

          {/* Search Bar - Top Centered */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center bg-[#f8fafc] border border-slate-200/60 rounded-full px-5 py-2 hover:bg-white hover:border-teal-400 hover:shadow-sm transition-all group">
            <input
              type="text"
              placeholder="Search courses, lessons..."
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: '#475569', background: 'transparent', outline: 'none', flex: 1 }}
              className="placeholder:text-slate-400"
            />
            <button className="text-slate-400 group-hover:text-teal-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5 shrink-0">
            <button className="relative p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
              <div className="hidden sm:block text-right">
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '14px', color: '#1e293b', lineHeight: 1, marginBottom: '3px' }}>{profile?.name || 'Yuva'}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '10px', color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20 border-2 border-white" style={{ fontSize: '15px' }}>
                {(profile?.name || 'Y').charAt(0).toUpperCase()}
              </div>
            </div>
            <Link
              to="/"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                color: '#fff',
                background: '#14b8a6',
                padding: '9px 22px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(20,184,166,0.3)',
                transition: 'background 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0d9488'}
              onMouseLeave={e => e.currentTarget.style.background = '#14b8a6'}
            >
              Logout
            </Link>
          </div>
        </div>

        {/* Secondary Navigation */}
        <nav className="border-t border-slate-100 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-center gap-1 py-2">
            {[
              { label: 'Home', path: '/' },
              { label: 'Learn English', path: '/modules/learn-english' },
              { label: 'Learner Dashboard', path: '/learner', exact: true },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.exact}
                style={({ isActive }) => ({
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0d9488' : '#475569',
                  padding: isActive ? '4px 14px' : '4px 10px',
                  borderRadius: '9999px',
                  background: isActive ? '#f0fdfa' : 'transparent',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* ========== SIDEBAR - COMPONENT BASED ========== */}
          <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

          {/* ========== MAIN CONTENT WITH PREMIUM GRADIENT ========== */}
          <main className="flex-1 min-w-0 bg-gradient-to-br from-teal-50/30 via-white to-pink-50/30 rounded-[32px] p-1 shadow-inner">
            <div className="h-full w-full bg-white/40 backdrop-blur-[2px] rounded-[31px]">
               {children}
            </div>
          </main>
        </div>
      </div>

      {/* ========== SITE FOOTER ========== */}
      <SiteFooter />

      {/* ========== HELP & SUPPORT MODAL ========== */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHelpModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">❓</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Help & Support</h2>
                    <p className="text-teal-100 text-sm">We're here to help you</p>
                  </div>
                </div>
                <button onClick={() => setShowHelpModal(false)} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* FAQ Section */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <span>📚</span> Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                  <details className="bg-slate-50 rounded-xl p-4 cursor-pointer group">
                    <summary className="font-medium text-slate-700 group-hover:text-teal-600">How do I enroll in a class?</summary>
                    <p className="mt-2 text-sm text-slate-600">Go to "Browse Classes" from the sidebar, find a class you like, and click the "Enroll" button.</p>
                  </details>
                  <details className="bg-slate-50 rounded-xl p-4 cursor-pointer group">
                    <summary className="font-medium text-slate-700 group-hover:text-teal-600">How do I submit a task?</summary>
                    <p className="mt-2 text-sm text-slate-600">Navigate to "My Tasks", select the task, complete your work in the text area, and click "Submit".</p>
                  </details>
                  <details className="bg-slate-50 rounded-xl p-4 cursor-pointer group">
                    <summary className="font-medium text-slate-700 group-hover:text-teal-600">How is my attendance calculated?</summary>
                    <p className="mt-2 text-sm text-slate-600">Attendance is tracked automatically when you join live classes. The percentage shows your overall attendance rate.</p>
                  </details>
                </div>
              </div>

              {/* Contact Options */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <span>📞</span> Contact Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a href="mailto:support@englishclub.com" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-medium text-slate-700 text-sm">Email</p>
                      <p className="text-xs text-slate-500">support@englishclub.com</p>
                    </div>
                  </a>
                  <a href="tel:+1234567890" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-all">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-medium text-slate-700 text-sm">Phone</p>
                      <p className="text-xs text-slate-500">+1 (234) 567-890</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <p className="font-medium text-slate-700">Support Hours</p>
                    <p className="text-sm text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                    <p className="text-sm text-slate-600">Saturday: 10:00 AM - 4:00 PM (EST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
