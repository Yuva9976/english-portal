import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import SidebarProfile from './shared/SidebarProfile'

export default function TutorSidebar({collapsed, onToggle}){
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setProfile(JSON.parse(userStr))
    }
  }, [])

  // support uncontrolled usage: if parent doesn't pass `collapsed`, use internal state
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isControlled = collapsed !== undefined
  const current = isControlled ? collapsed : internalCollapsed
  const toggle = () => {
    if(isControlled){
      onToggle && onToggle()
    } else {
      setInternalCollapsed(v => !v)
    }
  }

  return (
    <aside className={`bg-white border-r border-teal-100 ${current ? 'w-20' : 'w-72'} transition-all duration-300 h-screen sticky top-0 left-0 overflow-hidden flex-shrink-0 z-30`}>
      <div className="flex flex-col h-full">
        <div className="pt-4 border-b border-teal-50">
           <SidebarProfile profile={profile} collapsed={current} />
        </div>
        
        <div className="p-4 flex items-center justify-between border-b border-teal-100 hidden">
          {/* Old header hidden */}
          <button onClick={toggle} className="text-teal-600 hover:text-teal-700">{current ? '»' : '‹'}</button>
        </div>

        <nav className="px-2 py-4 flex-1 overflow-auto">
          <ul className="space-y-1">
            <li>
              <NavLink to="/tutor/dashboard" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">📊</span>
                {!current && <span className="text-sm">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutor/classes" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">🧑‍🏫</span>
                {!current && <span className="text-sm">My Classes</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutor/lessons-quizzes" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">📚</span>
                {!current && <span className="text-sm">Lessons & Quizzes</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/vocabulary-hub" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">🔤</span>
                {!current && <span className="text-sm">Vocabulary Hub</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutor/resources" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">🗂️</span>
                {!current && <span className="text-sm">Resources</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutor/students" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">👨‍🎓</span>
                {!current && <span className="text-sm">Students</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tutor/settings" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg transition ${isActive ? 'bg-teal-50 text-teal-700 font-semibold border-l-2 border-teal-600' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="text-xl">⚙️</span>
                {!current && <span className="text-sm">Settings</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-teal-100">
          <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-rose-400 text-white font-semibold text-sm hover:shadow-md transition">Premium</button>
        </div>
      </div>
    </aside>
  )
}
