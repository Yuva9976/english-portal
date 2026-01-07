import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function TutorSidebar({collapsed, onToggle}){
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
        <div className="p-4 flex items-center justify-between border-b border-teal-100">
          <div className={`flex items-center gap-3 ${current ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center text-white font-bold text-sm">TC</div>
            {!current && <div>
              <div className="font-bold text-slate-900 text-sm">Tutor</div>
              <div className="text-xs text-teal-600 font-semibold">Workspace</div>
            </div>}
          </div>
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
