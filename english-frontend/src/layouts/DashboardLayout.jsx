import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import apiClient from '../apiClient';
import SiteFooter from '../components/SiteFooter';
import AppSidebar from '../components/AppSidebar';

/**
 * Unified DashboardLayout for all roles (Learner, Tutor, Admin, Content Provider).
 */
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      // Fallback to API if not in localStorage
      apiClient.get('/auth/me').then(res => setUser(res.data?.user)).catch(() => {});
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  const initials = (user?.name || 'U').charAt(0).toUpperCase();
  const roleDisplay = user?.role === 'teacher' || user?.role === 'tutor' ? 'Tutor' : 
                      user?.role === 'admin' ? 'Admin' : 
                      user?.role === 'provider' || user?.role === 'content_provider' ? 'Provider' : 'Learner';

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* ========== TOP HEADER ========== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 flex items-center justify-center border border-teal-500/20 group">
              <div className="w-9 h-9 rounded-lg bg-[#14b8a6] flex items-center justify-center font-bold text-white text-sm shadow-sm transform group-hover:scale-105 transition-transform">EC</div>
            </div>
            <div>
              <Link to="/" className="block leading-none mb-0.5" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '17px', color: '#0f766e', letterSpacing: '-0.3px' }}>EnglishClub</Link>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '11px', color: '#64748b' }}>Learn • Teach • Explore</div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl items-center bg-[#f8fafc] border border-slate-200/60 rounded-full px-5 py-2 hover:bg-white hover:border-teal-400 hover:shadow-sm transition-all group">
            <input type="text" placeholder="Search courses, lessons..." className="w-full bg-transparent outline-none text-[13px] placeholder:text-slate-400" />
            <button className="text-slate-400 group-hover:text-teal-500 transition-colors">
              <span className="text-lg">🔍</span>
            </button>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <button className="relative p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
              <div className="hidden sm:block text-right">
                <p className="font-bold text-[14px] text-slate-800 leading-none mb-1">{user?.name || 'User'}</p>
                {user?.name?.toLowerCase() !== roleDisplay?.toLowerCase() && (
                  <p className="font-bold text-[10px] text-teal-600 uppercase tracking-widest leading-none">{roleDisplay}</p>
                )}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20 border-2 border-white ring-2 ring-teal-500/10">
                {initials}
              </div>
            </div>
            <button onClick={handleLogout} className="px-5 py-2 bg-[#14b8a6] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#0d9488] transition-all">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 py-6 font-['Inter']">
        <div className="flex gap-6">
          <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} userRole={user?.role} />

          <main className="flex-1 min-w-0 bg-gradient-to-br from-teal-50/30 via-white to-pink-50/30 rounded-[32px] p-1 shadow-inner">
            <div className="h-full w-full bg-white/40 backdrop-blur-[2px] rounded-[31px]">
               <Outlet />
            </div>
          </main>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
