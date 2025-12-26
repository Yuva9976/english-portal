import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function LearnerSidebar({collapsed, onToggle}){
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
    <aside className={`bg-slate-900/80 backdrop-blur border-r border-slate-800 ${current ? 'w-20' : 'w-72'} transition-all duration-300 h-screen sticky top-0 left-0 overflow-hidden flex-shrink-0 z-30 text-white`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <div className={`flex items-center gap-3 ${current ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-400 flex items-center justify-center text-white font-bold">LC</div>
            {!current && <div>
              <div className="font-semibold text-white">Learner</div>
              <div className="text-xs text-slate-300">Welcome back</div>
            </div>}
          </div>
          <button onClick={toggle} className="text-slate-300 hover:text-white">{current ? '»' : '‹'}</button>
        </div>

        <nav className="px-2 py-4 flex-1 overflow-auto">
          <ul className="space-y-1">
            <li>
              <NavLink to="/learner" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">📊</span>
                {!current && <span className="text-slate-100">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/class" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">🏫</span>
                {!current && <span className="text-slate-100">Class</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">🗂️</span>
                {!current && <span className="text-slate-100">Tasks</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">📁</span>
                {!current && <span className="text-slate-100">Projects</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/queries" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">❓</span>
                {!current && <span className="text-slate-100">Queries</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/mock-interview" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 ${isActive ? 'bg-slate-800 font-semibold' : ''}`}>
                <span className="text-xl">🎤</span>
                {!current && <span className="text-slate-100">MockInterview</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-400 text-white font-semibold">Upgrade</button>
        </div>
      </div>
    </aside>
  )
}
