import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarProfile({ profile, collapsed }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const name = profile?.name || 'User';
  const email = profile?.email || '';
  const initial = name.charAt(0).toUpperCase();
  const role = profile?.roleAlias || profile?.role || 'Learner';

  return (
    <div className={`transition-all duration-300 ${collapsed ? 'p-3' : 'px-4 mb-4'}`}>
      <div className={`group relative bg-white transition-all duration-500 overflow-hidden ${collapsed ? 'rounded-xl p-2 border border-slate-100' : 'rounded-2xl p-4 border-2 border-slate-50 shadow-sm hover:shadow-md hover:border-teal-100'}`}>
        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-rose-400" />
        
        <div className={`flex items-center transition-all duration-300 ${collapsed ? 'justify-center' : 'gap-3 relative z-10'}`}>
          <div className="relative shrink-0">
            <div className={`rounded-xl bg-gradient-to-br from-teal-50 to-rose-50 flex items-center justify-center text-[#14b8a6] font-black border border-teal-100/50 ${collapsed ? 'w-10 h-10 text-lg' : 'w-12 h-12 text-xl'}`}>
              {initial}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm z-20"></div>
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[15px] font-black text-slate-800 truncate tracking-tight font-['Outfit']">
                  {name}
                </p>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-['Inter']">{role}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
