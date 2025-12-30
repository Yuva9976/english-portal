import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard', icon: '📊', to: '/tutor/dashboard' },
  { label: 'My Classes', icon: '🧑‍🏫', to: '/tutor/classes' },
  { label: 'Lessons & Quizzes', icon: '📚', to: '/tutor/lessons-quizzes' },
  { label: 'Resources', icon: '🗂️', to: '/tutor/resources' },
  { label: 'Students', icon: '👨‍🎓', to: '/tutor/students' },
  { label: 'Settings', icon: '⚙️', to: '/tutor/settings' },
]

export default function TutorDashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      <div className='bg-white border-b border-slate-200 shadow-sm'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between gap-6'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-xl'>EC</div>
            <div>
              <div className='text-lg font-semibold text-slate-900'>Tutor Dashboard</div>
              <div className='text-sm text-slate-500'>EnglishClub tutor workspace</div>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-semibold text-slate-700'>TY</div>
              <div>
                <p className='text-sm font-semibold text-slate-800'>Tanya Y.</p>
                <p className='text-xs uppercase tracking-wider text-emerald-600'>Tutor</p>
              </div>
            </div>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setMenuOpen((prev) => !prev)}
                className='px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-full hover:border-teal-500 focus:outline-none focus:ring focus:ring-teal-200'
              >
                Profile ▾
              </button>
              {menuOpen && (
                <div className='absolute right-0 mt-2 w-40 rounded-lg bg-white border border-slate-200 shadow-lg'>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50'>Profile</button>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50'>Settings</button>
                  <button className='w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50'>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex'>
        <aside className='hidden lg:flex lg:w-72 flex-col gap-3 border-r border-slate-200 bg-white p-6'>
          <p className='text-xs uppercase tracking-wider text-slate-500'>Navigation</p>
          {sidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </aside>
        <div className='flex-1 px-4 py-6'>{children}</div>
      </div>
    </div>
  )
}