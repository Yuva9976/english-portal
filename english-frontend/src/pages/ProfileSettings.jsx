import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    expertise: '',
    profilePic: null
  });

  const [notifications, setNotifications] = useState({
    enrollment: true,
    assignment: true,
    updates: false
  });

  const [security, setSecurity] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const parsed = JSON.parse(userStr);
      setUser(parsed);
      setProfileData({
        name: parsed.name || '',
        bio: parsed.bio || '',
        expertise: parsed.expertise || '',
        profilePic: null
      });
    }
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.put('/tutor/dashboard/profile', {
        name: profileData.name,
        bio: profileData.bio,
        expertise: profileData.expertise
      });
      
      const updatedUser = { ...user, ...res.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      showMsg('Profile updated successfully!');
    } catch (err) {
      showMsg(err.response?.data?.error || 'Update failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      return showMsg('Passwords do not match', 'error');
    }
    setLoading(true);
    try {
      await apiClient.post('/auth/change-password', {
        oldPassword: security.oldPassword,
        newPassword: security.newPassword
      });
      setSecurity({ oldPassword: '', newPassword: '', confirmPassword: '' });
      showMsg('Password changed successfully!');
    } catch (err) {
      showMsg(err.response?.data?.error || 'Password change failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Identity & Expertise', icon: '👤' },
    { id: 'notifications', label: 'Portal Prefs', icon: '🔔' },
    { id: 'security', label: 'Gatekeeper Security', icon: '🔐' }
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#fcfdfe]">
      <div className="max-w-6xl mx-auto">
        {/* Modern Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-teal-100">Portal Control</span>
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
             </div>
            <h1 className="text-5xl font-black tracking-tighter" style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #F43F5E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Outfit', sans-serif",
            }}>Account Command</h1>
            <p className="text-slate-400 font-medium text-lg leading-tight max-w-xl">Fine-tune your professional presence and secure your educational gateway.</p>
          </div>
          
          {message.text && (
            <div className={`px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest animate-bounce shadow-2xl backdrop-blur-md ${message.type === 'error' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20'}`}>
              {message.type === 'success' ? '✦ ' : '⚠ '}{message.text}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Sidebar - Navigation */}
          <div className="lg:w-72 shrink-0 space-y-4">
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-4 space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full px-6 py-5 rounded-[1.8rem] font-bold text-sm transition-all flex items-center justify-between group ${activeTab === tab.id ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-slate-500 hover:bg-teal-50 hover:text-teal-600'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'filter drop-shadow-md' : ''}`}>{tab.icon}</span>
                      <span className="tracking-tight">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                  </button>
                ))}
             </div>

             {/* Pro Badge Card */}
             <div className="bg-gradient-to-br from-teal-500 to-teal-400 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-teal-500/20">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-80">Verified Provider</div>
                   <p className="text-sm font-bold leading-relaxed mb-6">Your profile is currently visible to students and fellow educators.</p>
                   <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">✨</div>
                </div>
             </div>
          </div>

          {/* Right Section - Content */}
          <div className="flex-1">
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 md:p-14 min-h-[600px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-teal-500/5 via-transparent to-transparent rounded-bl-full pointer-events-none"></div>

              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="flex flex-col md:flex-row items-center gap-10 border-b border-slate-50 pb-12">
                    <div className="relative group/avatar cursor-pointer">
                      <div className="w-44 h-44 rounded-[3.5rem] bg-gradient-to-br from-slate-100 to-slate-200 p-1 shadow-2xl shadow-slate-200">
                        <div className="w-full h-full rounded-[3.2rem] bg-white flex items-center justify-center text-6xl overflow-hidden relative">
                           {profileData.profilePic ? (
                             <img src={profileData.profilePic} className="w-full h-full object-cover" alt="Profile" />
                           ) : (
                             <span className="opacity-30">👤</span>
                           )}
                           <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/avatar:opacity-100 transition-all flex flex-col items-center justify-center text-white backdrop-blur-sm">
                             <span className="text-2xl mb-1">📸</span>
                             <span className="text-[10px] font-black uppercase tracking-widest">Change Photo</span>
                           </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-teal-600 border border-slate-50">
                        <span className="text-xl">✨</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                       <h2 className="text-3xl font-black text-slate-800 tracking-tighter leading-none mb-1 uppercase font-['Outfit']">Identify Presence</h2>
                       <p className="text-slate-400 font-medium max-w-sm">This information is shared with learners via your public verified profile page.</p>
                       <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                         <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black uppercase rounded-xl">Educator Portal</span>
                         <span className="px-4 py-1.5 bg-teal-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-teal-500/20">Active Authority</span>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional Moniker</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all shadow-inner hover:bg-slate-100/50"
                        placeholder="e.g. Dr. Jane Smith"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Expertise Architecture</label>
                      <input
                        type="text"
                        value={profileData.expertise}
                        onChange={(e) => setProfileData({ ...profileData, expertise: e.target.value })}
                        className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all shadow-inner hover:bg-slate-100/50"
                        placeholder="e.g. Phonetics, Lexicon Research, IELTS"
                      />
                    </div>

                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional Narrative</label>
                      <textarea
                        rows={6}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full px-10 py-8 bg-slate-50 rounded-[3rem] border border-slate-100 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all shadow-inner hover:bg-slate-100/50 resize-none"
                        placeholder="Craft your teaching philosophy and professional journey here..."
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-2xl shadow-slate-900/20 active:scale-95 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      <span className="relative z-10">{loading ? "Synchronizing..." : "Update Professional Profile ✦"}</span>
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
                   <div className="space-y-2 border-b border-slate-50 pb-8">
                     <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase font-['Outfit']">Digital Radar</h2>
                     <p className="text-slate-400 font-medium max-w-sm">Determine which operational events trigger a node response.</p>
                   </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { id: 'enrollment', label: 'Enrollment Signal', desc: 'Trigger when new entities join your curriculum.', icon: '👥' },
                      { id: 'assignment', label: 'Submission Alert', desc: 'Real-time ping when task completion occurs.', icon: '📋' },
                      { id: 'updates', label: 'System Protocol', desc: 'Technical updates and major platform transitions.', icon: '⚙️' }
                    ].map(item => (
                      <div key={item.id} className="group flex items-center justify-between p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer" onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}>
                        <div className="flex items-center gap-8">
                           <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-3xl transition-transform group-hover:rotate-6">{item.icon}</div>
                           <div>
                             <p className="font-bold text-xl text-slate-800 tracking-tight mb-1">{item.label}</p>
                             <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                           </div>
                        </div>
                        <div className={`w-16 h-8 rounded-full relative transition-all duration-500 ${notifications[item.id] ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-300'}`}>
                           <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-500 ${notifications[item.id] ? 'left-9.5' : 'left-1.5'}`} style={{ left: notifications[item.id] ? '40px' : '6px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 bg-teal-50 rounded-[2.5rem] border border-teal-100 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">💡</div>
                    <p className="text-sm text-teal-800 font-bold uppercase tracking-widest leading-relaxed">Optimization Tip: High-frequency responders maintain 40% higher learner engagement scores.</p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="space-y-2 border-b border-slate-50 pb-8">
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase font-['Outfit']">Gatekeeper Security</h2>
                    <p className="text-slate-400 font-medium max-w-sm">Secure your administrative gateway with robust encryption protocols.</p>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-3 max-w-md">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Legacy Encryption</label>
                      <input
                        type="password"
                        required
                        value={security.oldPassword}
                        onChange={(e) => setSecurity({ ...security, oldPassword: e.target.value })}
                        className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-rose-800 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-300 transition-all shadow-inner"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Hash Key</label>
                        <input
                          type="password"
                          required
                          value={security.newPassword}
                          onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                          className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-inner"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Confirm Protocol</label>
                        <input
                          type="password"
                          required
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                          className="w-full px-8 py-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-inner"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:shadow-2xl shadow-rose-900/20 active:scale-95 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      <span className="relative z-10">{loading ? "Encrypting..." : "Finalize Security Shift ✦"}</span>
                    </button>
                  </div>

                  <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">⚠️</div>
                    <p className="text-sm text-rose-800 font-bold uppercase tracking-widest leading-relaxed">Warning: Changing your password will invalidate all current active sessions across your logged-in browsers.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
