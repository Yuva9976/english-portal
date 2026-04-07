import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../apiClient';

// Helper component to render a resource item (This component is no longer used in the new layout)
/*
function ResourceItem({ resource, classId, navigate }) {
  const typeIcon = resource.type === 'pdf' ? '📄' :
    resource.type === 'video' ? '🎬' :
      resource.type === 'doc' ? '📝' :
        resource.type === 'slides' ? '📊' : '🔗';

  const typeLabel = resource.type === 'pdf' ? 'PDF' :
    resource.type === 'video' ? 'Video' :
      resource.type === 'doc' ? 'Document' :
        resource.type === 'slides' ? 'Slides' : 'Link';

  const isInternal = resource.source === 'grammar_guide' || resource.url?.startsWith('/');

  const handleView = async () => {
    try {
      if (typeof resource.id === 'number') {
        await apiClient.post(`/classroom/${classId}/resources/${resource.id}/view`);
      }
    } catch (e) { // ignore }

    if (isInternal) {
      navigate(resource.url);
    } else {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all group bg-white">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center text-2xl border border-teal-200 shrink-0">
        {typeIcon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
          {resource.title}
        </div>
        {resource.description && (
          <div className="text-sm text-slate-500 truncate">{resource.description}</div>
        )}
        <span className="text-xs text-slate-400 font-medium">{typeLabel}</span>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={handleView}
          className="px-3 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
        >
          👁️ View
        </button>
        {!isInternal && (
          <a
            href={resource.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            ⬇️ Download
          </a>
        )}
      </div>
    </div>
  );
}
*/

export default function LearnerClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null); // Renamed classData to cls
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassDetail();
  }, [classId]);

  const fetchClassDetail = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/dashboard/learner/classes/${classId}`);
      setCls(res.data); // Renamed classData to cls
    } catch (err) {
      console.error('Failed to load class:', err);
      if (err.response?.status === 403) {
        setError('You are not enrolled in this class');
      } else {
        setError('Failed to load class details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = () => {
    navigate(`/class/${classId}`);
  };

  if (loading) {
    return (
      <div className="w-full flex-1">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !cls) {
    return (
      <div className="w-full flex-1">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center max-w-2xl mx-auto mt-10">
          <p className="font-bold mb-4">{error || 'Class not found'}</p>
          <Link to="/learner/classes" className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors">
            Back to My Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <div className="max-w-5xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/learner/classes"
            className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-teal-50 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#475569' }}>Back to My Classes</span>
          </Link>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
              Schedule
            </button>
            <button
              onClick={handleJoinClass}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-md shadow-teal-900/10"
            >
              Join Session
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14b8a6] to-[#0ea5e9] p-8 mb-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.15em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Live Class • {cls.level || 'General'}
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '38px', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '16px' }}>{cls.title}</h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 400, color: 'rgba(240,253,250,0.88)', lineHeight: 1.6, maxWidth: '640px' }}>
              {cls.description || 'Level up your skills with our comprehensive curriculum and expert guidance.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-lg transform group-hover:scale-105 transition-transform">
                    {cls.teacher?.name?.charAt(0) || 'S'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                    <svg className="w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '17px', color: '#0f172a', letterSpacing: '-0.02em' }}>{cls.teacher?.name || 'Seed Teacher'}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#0d9488', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Class Instructor • Expert Educator</p>
                </div>
              </div>
              <button className="px-4 py-2 text-teal-600 text-sm font-bold hover:bg-teal-50 rounded-xl transition-colors">
                Profile
              </button>
            </div>

            {/* Day-by-Day Lessons */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
                  <span>📖</span> Course Lessons
                </h3>
                <span className="px-3 py-1 bg-teal-50 rounded-lg text-[10px] font-black text-teal-600 uppercase tracking-wider">
                  Sequential Path
                </span>
              </div>

              {cls.lessons && cls.lessons.length > 0 ? (
                <div className="space-y-4">
                  {cls.lessons.map((lesson, idx) => (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${
                        lesson.is_locked 
                          ? 'bg-slate-50 border-slate-100 opacity-75' 
                          : 'bg-white border-slate-50 hover:border-teal-100 hover:bg-teal-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shadow-sm border ${
                          lesson.is_locked ? 'bg-slate-200 border-slate-300 text-slate-400' : 'bg-white border-slate-100'
                        }`}>
                          <span className="text-[10px] font-black uppercase">Day</span>
                          <span className="text-base font-black">{lesson.day_number}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: lesson.is_locked ? '#64748b' : '#0f172a', letterSpacing: '-0.01em' }}>
                            {lesson.title}
                            {lesson.is_locked && <span className="ml-2 text-xs">🔒</span>}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {lesson.is_locked ? 'Locked (Complete previous quiz)' : 'Accessible'}
                          </p>
                        </div>
                      </div>
                      {!lesson.is_locked && (
                        <button 
                          onClick={() => navigate(`/lessons/${lesson.id}`)}
                          className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 transition-all shadow-md shadow-teal-900/10"
                        >
                          →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <div className="text-3xl mb-3 opacity-50">📖</div>
                  <p className="text-slate-400 font-medium text-sm italic">No lessons added to this course yet</p>
                </div>
              )}
            </div>

            {/* Sessions (Original) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
                  <span>📅</span> Class Sessions
                </h3>
                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  {cls.sessions?.length || 0} Scheduled
                </span>
              </div>

              {cls.sessions && cls.sessions.length > 0 ? (
                <div className="space-y-4">
                  {cls.sessions.map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-teal-100 hover:bg-teal-50/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                          <span className="text-[10px] font-black text-teal-600 uppercase">FEB</span>
                          <span className="text-base font-black text-slate-900">{new Date(session.startTime).getDate()}</span>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#0f172a', letterSpacing: '-0.01em' }}>{session.title || `Session ${idx + 1}`}</p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:border-teal-200 transition-all">
                        →
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <div className="text-3xl mb-3 opacity-50">🗓️</div>
                  <p className="text-slate-400 font-medium text-sm italic">No upcoming sessions yet</p>
                </div>
              )}
            </div>

            {/* Resources Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.01em' }}>
                  <span>📁</span> Class Resources
                </h3>
                <button className="text-xs font-black text-teal-600 hover:underline uppercase tracking-wider">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group p-4 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">📜</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">Course Syllabus.pdf</p>
                      <p className="text-[10px] text-amber-700 font-bold uppercase">Essential Resource</p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">📚</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">Grammar Guide.pdf</p>
                      <p className="text-[10px] text-indigo-700 font-bold uppercase">Level {cls.level || 'A1'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-rose-400 to-amber-400"></div>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>Class Insights</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">🔥</div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>Class Level</span>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff' }}>{cls.level || 'General'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">👥</div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>Students</span>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff' }}>{cls.studentCount || 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">📊</div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>Sessions</span>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff' }}>{cls.sessions?.length || 0}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Enrollment Status</p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-black ring-1 ring-teal-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Active Student
                </div>
              </div>
            </div>

            {/* Upcoming Next */}
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
              <h4 className="text-white font-black text-lg mb-2 relative z-10">Next Session</h4>
              <p className="text-white/80 text-xs font-bold mb-4 uppercase tracking-tighter relative z-10">Scheduled Soon</p>
              <button className="w-full py-3 bg-white text-orange-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95 relative z-10">
                Set Reminder 🔔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
