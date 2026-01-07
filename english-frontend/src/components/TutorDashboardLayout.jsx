import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard', icon: '📊', to: '/tutor/dashboard', description: 'Overview & stats' },
  { label: 'My Classes', icon: '🎓', to: '/tutor/classes', description: 'Manage your classes' },
  { label: 'Lessons & Quizzes', icon: '📚', to: '/tutor/lessons-quizzes', description: 'Course content' },
  { label: 'Resources', icon: '📁', to: '/tutor/resources', description: 'Teaching materials' },
  { label: 'Students', icon: '👥', to: '/tutor/students', description: 'Student management' },
  { label: 'Settings', icon: '⚙️', to: '/tutor/settings', description: 'Preferences' },
]

export default function TutorDashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userName = user?.name || 'Tutor'
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30'>
      {/* Top Navbar */}
      <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm'>
        <div className='max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-rose-400 flex items-center justify-center font-bold text-white text-sm shadow-lg'>EC</div>
            <div>
              <Link to='/' className='font-bold text-lg bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent'>EnglishClub</Link>
              <div className='text-xs text-slate-500'>Learn • Teach • Explore</div>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className='hidden md:flex items-center gap-6'>
            <Link to='/' className='text-slate-600 hover:text-teal-600 font-medium text-sm transition-colors'>Home</Link>
            <Link to='/tutor/dashboard' className='text-teal-600 font-semibold text-sm px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200'>Tutor Dashboard</Link>
            <Link to='/teacher-tools' className='text-slate-600 hover:text-teal-600 font-medium text-sm transition-colors'>Teach</Link>
          </nav>

          {/* Right Side - Profile */}
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-3'>
              <div className='w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-rose-400 flex items-center justify-center font-semibold text-white text-sm shadow-md'>{initials}</div>
              <div>
                <p className='text-sm font-semibold text-slate-800'>{userName}</p>
                <p className='text-xs text-teal-600 font-medium'>TUTOR</p>
              </div>
            </div>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setMenuOpen((prev) => !prev)}
                className='px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-full hover:border-teal-400 hover:bg-teal-50 focus:outline-none transition-all'
              >
                Menu ▾
              </button>
              {menuOpen && (
                <div className='absolute right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden'>
                  <Link to='/' className='block px-4 py-2.5 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors'>🏠 Home</Link>
                  <Link to='/tutor/settings' className='block px-4 py-2.5 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors'>⚙️ Settings</Link>
                  <hr className='border-slate-100' />
                  <button onClick={handleLogout} className='w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors'>🚪 Logout</button>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className='px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-full hover:from-teal-600 hover:to-teal-700 focus:outline-none transition-all shadow-md hover:shadow-lg'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar - Centered Container */}
      <div className='max-w-[1400px] mx-auto px-6'>
        <div className='flex'>
          {/* Premium Sidebar */}
          <aside className='hidden lg:flex lg:w-72 flex-shrink-0 flex-col min-h-[calc(100vh-64px)] sticky top-16'>
            {/* Sidebar Inner Container with Glass Effect */}
            <div className='flex flex-col h-full py-6 pr-6'>
              {/* User Profile Card */}
              <div className='mb-6 p-4 rounded-2xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-600 text-white shadow-xl shadow-teal-200/50'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-lg border border-white/30'>
                    {initials}
                  </div>
                  <div>
                    <p className='font-semibold'>{userName}</p>
                    <p className='text-xs text-teal-100 flex items-center gap-1'>
                      <span className='w-2 h-2 bg-emerald-300 rounded-full animate-pulse'></span>
                      Online • Tutor
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 pt-3 border-t border-white/20'>
                  <div className='text-center p-2 rounded-lg bg-white/10'>
                    <p className='text-lg font-bold'>24</p>
                    <p className='text-[10px] text-teal-100 uppercase tracking-wide'>Students</p>
                  </div>
                  <div className='text-center p-2 rounded-lg bg-white/10'>
                    <p className='text-lg font-bold'>8</p>
                    <p className='text-[10px] text-teal-100 uppercase tracking-wide'>Classes</p>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div className='flex-1'>
                <p className='text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 px-2'>Main Menu</p>
                <nav className='space-y-1'>
                  {sidebarItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200/60 scale-[1.02]' 
                            : 'text-slate-600 hover:bg-gradient-to-r hover:from-slate-50 hover:to-teal-50 hover:text-teal-700 hover:shadow-md'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`text-xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {item.icon}
                          </span>
                          <div className='flex-1'>
                            <span className='block'>{item.label}</span>
                            <span className={`text-[10px] ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                              {item.description}
                            </span>
                          </div>
                          {isActive && (
                            <span className='w-2 h-2 bg-white rounded-full animate-pulse'></span>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
              
              {/* Bottom Section */}
              <div className='mt-6 space-y-4'>
                {/* Quick Stats Card */}
                <div className='p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200'>
                  <p className='text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3'>This Week</p>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-600'>Classes Taught</span>
                      <span className='text-sm font-bold text-teal-600'>12</span>
                    </div>
                    <div className='h-2 bg-slate-200 rounded-full overflow-hidden'>
                      <div className='h-full w-3/4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full'></div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-slate-600'>Student Engagement</span>
                      <span className='text-sm font-bold text-emerald-600'>89%</span>
                    </div>
                    <div className='h-2 bg-slate-200 rounded-full overflow-hidden'>
                      <div className='h-full w-[89%] bg-gradient-to-r from-emerald-400 to-green-400 rounded-full'></div>
                    </div>
                  </div>
                </div>

                {/* Create New Class Button */}
                <Link to='/tutor/classes' className='w-full flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-sm font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-200/50 hover:shadow-xl hover:shadow-teal-300/50 hover:scale-[1.02] transition-all duration-300 group'>
                  <span className='w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-base group-hover:rotate-90 transition-transform duration-300'>➕</span>
                  <span>Create New Class</span>
                </Link>

                {/* Help Link */}
                <div className='flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-teal-600 cursor-pointer transition-colors'>
                  <span>💡</span>
                  <span>Need help? Visit Help Center</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className='flex-1 py-6 lg:py-8 lg:pl-8'>{children}</main>
        </div>
      </div>
    </div>
  )
}