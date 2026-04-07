import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_BY_ROLE } from '../config/navigationByRole';
import SidebarProfile from './shared/SidebarProfile';

/**
 * Role-aware AppSidebar for the unified dashboard.
 */
export default function AppSidebar({ collapsed, onToggle, userRole = 'learner' }) {
  const current = collapsed;
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  // Normalize role
  const role = userRole === 'teacher' || userRole === 'tutor' ? 'tutor' : 
               userRole === 'admin' ? 'admin' : 
               userRole === 'provider' || userRole === 'content_provider' ? 'content_provider' : 'learner';

  const menuItems = NAVIGATION_BY_ROLE[role] || NAVIGATION_BY_ROLE.learner;

  return (
    <aside className={`sticky top-3 ${current ? 'w-[72px]' : 'w-[280px]'} h-[calc(100vh-1.5rem)] flex flex-col pt-4 pb-4 bg-white border border-slate-100/80 shadow-sm rounded-[32px] overflow-hidden group/sidebar z-40 transition-all duration-500`}>
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Profile Section */}
        <SidebarProfile profile={user} collapsed={current} />

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto flex flex-col custom-scrollbar pt-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
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
                  <div className={`shrink-0 p-1.5 rounded-lg transition-all duration-300 ${isActive ? 'bg-white shadow-sm text-teal-600' : ''}`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  {!current && <span className="text-[13.5px] font-medium tracking-tight">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={() => onToggle && onToggle()}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md border-2 border-white hover:scale-110 hover:bg-teal-700 transition-all z-40"
      >
        <span className="text-[10px] font-bold">{current ? '»' : '«'}</span>
      </button>
    </aside>
  );
}
