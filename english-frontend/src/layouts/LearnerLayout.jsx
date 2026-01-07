import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import apiClient from '../apiClient'
import SiteFooter from '../components/SiteFooter'

export default function LearnerLayout({ children }) {
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
    <div className="min-h-screen bg-slate-100">
      {/* ========== TOP HEADER - MATCHING MAIN NAVBAR ========== */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm">EC</div>
            <div>
              <Link to="/" className="font-bold text-lg text-blue-700">EnglishClub</Link>
              <div className="text-xs text-slate-600">Learn • Teach • Explore</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search courses, lessons..."
              className="bg-transparent outline-none text-sm flex-1 text-slate-700"
            />
            <button className="text-teal-600 hover:text-teal-700">🔍</button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-700">{profile?.name || 'Learner'}</p>
                <p className="text-xs text-teal-600">Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                {(profile?.name || 'L').charAt(0).toUpperCase()}
              </div>
            </div>
            <Link to="/" className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm transition-colors">
              Logout
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:block border-t border-slate-200">
          <div className="container mx-auto px-4 flex items-center justify-center gap-6 py-3">
            <Link to="/" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Home</Link>
            <Link to="/learner" className="text-teal-600 font-semibold text-sm px-3 py-1 rounded-full bg-teal-50">Dashboard</Link>
            <Link to="/modules/learn-english" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Learn English</Link>
            <Link to="/grammar-hub" className="text-slate-700 hover:text-teal-600 font-medium text-sm font-semibold text-teal-700 px-3 py-1 rounded-full bg-teal-50">Grammar Hub</Link>
            <Link to="/grammar-hub/grammar" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Grammar</Link>
            <Link to="/grammar-hub/vocabulary" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Vocabulary</Link>
            <Link to="/grammar-hub/pronunciation" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Pronunciation</Link>
            <Link to="/lessons?category=listening" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Listening</Link>
            <Link to="/lessons?category=speaking" className="text-slate-700 hover:text-teal-600 font-medium text-sm">Speaking</Link>
          </div>
        </nav>
      </header>

      {/* ========== MAIN CONTAINER WITH EQUAL GAPS ========== */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* ========== SIDEBAR - EXTENDED HEIGHT ========== */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 rounded-2xl p-5 sticky top-24 shadow-xl border border-slate-700/30 min-h-[calc(100vh-140px)]">
              {/* User Profile */}
              <div className="flex items-center gap-3 px-2 pb-4 mb-4 border-b border-slate-700/50">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {(profile?.name || 'L').charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-base truncate">{profile?.name || 'Learner'}</p>
                  <p className="text-xs text-teal-400 font-medium">🎓 Student</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">Menu</p>
                
                <NavLink 
                  to="/learner" 
                  end
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">📊</span>
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink 
                  to="/learner/classes"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🎓</span>
                  <span>My Classes</span>
                </NavLink>
                
                <NavLink 
                  to="/learner/browse"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🏫</span>
                  <span>Browse Classes</span>
                </NavLink>
                
                <NavLink 
                  to="/learner/tasks"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">📋</span>
                  <span>My Tasks</span>
                  {stats.tasks?.pending > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-full">{stats.tasks.pending}</span>
                  )}
                </NavLink>

                <NavLink 
                  to="/learner/progress"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">📈</span>
                  <span>My Progress</span>
                </NavLink>

                <NavLink 
                  to="/learner/certificates"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🏆</span>
                  <span>Certificates</span>
                </NavLink>
                
                <NavLink 
                  to="/modules/learn-english"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">📖</span>
                  <span>Learn English</span>
                </NavLink>

                <NavLink 
                  to="/learner/settings"
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/20' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">⚙️</span>
                  <span>Settings</span>
                </NavLink>
              </nav>

              {/* Divider */}
              <div className="my-4 border-t border-slate-700/50"></div>

              {/* Help & Logout */}
              <div className="space-y-1">
                <button 
                  onClick={() => setShowHelpModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-base text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                  <span className="text-lg">❓</span>
                  <span>Help & Support</span>
                </button>
                <Link to="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-base text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                  <span className="text-lg">🚪</span>
                  <span>Logout</span>
                </Link>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-slate-700/30 text-center">
                <p className="text-xs text-slate-500">EnglishClub LMS</p>
                <p className="text-xs text-slate-600">© 2026 All rights reserved</p>
              </div>
            </div>
          </aside>

          {/* ========== MAIN CONTENT ========== */}
          <main className="flex-1 min-w-0">
            {children}
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
