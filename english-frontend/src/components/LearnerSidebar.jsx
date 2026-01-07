import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function LearnerSidebar({collapsed, onToggle}){
  // support uncontrolled usage: if parent doesn't pass `collapsed`, use internal state
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isControlled = collapsed !== undefined
  const current = isControlled ? collapsed : internalCollapsed
  const location = useLocation()
  const toggle = () => {
    if(isControlled){
      onToggle && onToggle()
    } else {
      setInternalCollapsed(v => !v)
    }
  }

  const menuItems = [
    { path: '/learner', label: 'Dashboard', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ), exact: true },
    { path: '/learner/classes', label: 'My Classes', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { path: '/learner/browse', label: 'Browse Classes', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )},
    { path: '/learner/tasks', label: 'My Tasks', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { path: '/learner/progress', label: 'My Progress', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { path: '/learner/certificates', label: 'Certificates', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )},
    { path: '/learner/settings', label: 'Settings', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { path: '/learner/help', label: 'Help Center', icon: (
      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ]

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <aside className={`relative ${current ? 'w-[72px]' : 'w-64'} transition-all duration-300 h-screen sticky top-0 left-0 flex-shrink-0 z-30`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-950 to-slate-950"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-0 w-20 h-20 bg-gradient-to-tr from-teal-400/20 to-transparent rounded-full blur-xl"></div>
      
      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Header/Logo Section */}
        <div className="p-3 border-b border-white/10">
          <div className={`flex items-center ${current ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center gap-2.5 ${current ? 'justify-center' : ''}`}>
              {/* Animated Logo */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-rose-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 via-teal-600 to-rose-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-base">L</span>
                </div>
              </div>
              {!current && (
                <div>
                  <h2 className="font-bold text-white text-base tracking-tight">Learner</h2>
                  <p className="text-[10px] text-teal-300/80 font-medium">Learning Portal</p>
                </div>
              )}
            </div>
            {!current && (
              <button 
                onClick={toggle} 
                className="p-1.5 rounded-lg hover:bg-white/10 text-teal-300 hover:text-white transition-all duration-200"
                title="Collapse sidebar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
            {current && (
              <button 
                onClick={toggle} 
                className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-rose-500 text-white flex items-center justify-center shadow-lg hover:shadow-teal-500/25 transition-all duration-200"
                title="Expand sidebar"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation - All items visible without scroll */}
        <nav className="flex-1 px-2 py-3">
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  end={item.exact}
                  className={({isActive: active}) => `
                    group flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-200
                    ${active 
                      ? 'bg-gradient-to-r from-teal-500/20 to-rose-500/20 text-white border border-white/10' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }
                    ${current ? 'justify-center' : ''}
                  `}
                  title={current ? item.label : ''}
                >
                  <span className={`flex-shrink-0 ${isActive(item.path, item.exact) ? 'text-teal-400' : 'text-slate-400 group-hover:text-teal-400'} transition-colors`}>
                    {item.icon}
                  </span>
                  {!current && (
                    <>
                      <span className="text-[13px] font-medium">{item.label}</span>
                      {isActive(item.path, item.exact) && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Compact Premium CTA Section */}
        <div className="p-2.5 border-t border-white/10">
          {!current ? (
            <button className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span>Upgrade to Premium</span>
            </button>
          ) : (
            <button 
              className="w-full p-2 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
              title="Upgrade to Premium"
            >
              <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
