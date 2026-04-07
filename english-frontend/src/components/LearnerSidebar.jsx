import React, { useState, useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import SidebarProfile from './shared/SidebarProfile'
import apiClient from '../apiClient'

export default function LearnerSidebar({ collapsed, onToggle }) {
  const [profile, setProfile] = useState(null)
  const location = useLocation()
  const current = collapsed

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setProfile(JSON.parse(userStr));
    } else {
      apiClient.get('/dashboard/learner')
        .then(res => setProfile(res.data?.profile))
        .catch(err => console.error('Failed to load profile for sidebar:', err))
    }
  }, [])

  const menuItems = [
    { path: '/learner', label: 'Learner Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>, exact: true },
    { path: '/learner/classes', label: 'My Courses', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { path: '/learner/progress', label: 'My Progress', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { path: '/learner/tasks', label: 'My Tasks', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> },
    { path: '/learner/browse', label: 'Browse Classes', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, exact: true },
    { path: '/learner/certificates', label: 'Certificates', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A3.33 3.33 0 0018.333 3H5.667a3.33 3.33 0 00-2.951 1.984L1.25 8.5h17.5l-1.432-3.516zM2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6H2z" /></svg> },

    // Grammar Modules
    { path: '/modules/grammar-hub', label: 'Grammar', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> },
    { path: '/vocabulary-hub', label: 'Vocabulary Hub', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg> },
    { path: '/learner/pronunciation', label: 'Pronunciation', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },

    { path: '/learner/settings', label: 'Settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ]

  return (
    <aside className={`sticky top-3 ${current ? 'w-[72px]' : 'w-[280px]'} h-[calc(100vh-1.5rem)] flex flex-col pt-4 pb-4 bg-white border border-slate-100/80 shadow-sm rounded-[32px] overflow-hidden group/sidebar z-40 transition-all duration-500`}>
      {/* Content */}
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Compact Profile & Status Banner - 'Parts of Speech' Style */}
        <SidebarProfile profile={profile} collapsed={current} />

        {/* Navigation - No Label */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto flex flex-col custom-scrollbar pt-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `
                group flex items-center gap-3 px-3.5 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden
                ${isActive
                   ? 'bg-teal-50/50 text-teal-700 font-bold'
                   : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }
                ${current ? 'mx-1 justify-center' : 'mx-1.5'}
              `}
              title={current ? item.label : ''}
            >
              {({ isActive }) => (
                <>
                  {isActive && !current && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-500 rounded-r-full"></div>
                  )}
                  <div className={`shrink-0 p-1.5 rounded-lg transition-all duration-300 ${!isActive && !collapsed ? 'group-hover:bg-white group-hover:shadow-sm' : ''} ${isActive ? 'bg-white shadow-sm text-teal-600' : ''}`}>
                    {React.cloneElement(item.icon, { className: 'w-[18px] h-[18px]' })}
                  </div>
                  {!current && <span className="font-['Inter'] text-[13.5px] font-medium tracking-tight">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => onToggle && onToggle()}
        className={`absolute -right-3 top-20 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md border-2 border-white hover:scale-110 hover:bg-teal-700 transition-all z-40`}
      >
        <span className="text-[10px] font-bold">{current ? '»' : '«'}</span>
      </button>
    </aside>
  )
}
