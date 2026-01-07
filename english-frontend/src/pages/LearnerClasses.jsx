import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LearnerSidebar from '../components/LearnerSidebar';
import apiClient from '../apiClient';

export default function LearnerClasses() {
  const [collapsed, setCollapsed] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/dashboard/learner/classes');
      setClasses(res.data?.classes || []);
    } catch (err) {
      console.error('Failed to load classes:', err);
      setError('Failed to load your classes');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = (cls) => {
    // Navigate to the classroom page
    navigate(`/class/${cls.id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE NOW
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Upcoming
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
            Scheduled
          </span>
        );
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">My Classes</h1>
            <p className="text-sm text-slate-600">View and join your enrolled classes</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{classes.length}</div>
                  <div className="text-xs text-slate-500">Total Classes</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {classes.filter((c) => c.status === 'live').length}
                  </div>
                  <div className="text-xs text-slate-500">Live Now</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {classes.filter((c) => c.status === 'upcoming').length}
                  </div>
                  <div className="text-xs text-slate-500">Upcoming</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {classes.reduce((sum, c) => sum + (c.totalSessions || 0), 0)}
                  </div>
                  <div className="text-xs text-slate-500">Total Sessions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Classes Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">{error}</div>
          ) : classes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Classes Yet</h3>
              <p className="text-slate-500 mb-4">You haven't been enrolled in any classes yet.</p>
              <p className="text-sm text-slate-400">Contact your tutor to get enrolled in a class.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${
                    cls.status === 'live' ? 'border-red-200 ring-2 ring-red-100' : 'border-slate-100'
                  }`}
                >
                  {/* Card Header with gradient */}
                  <div
                    className={`h-24 p-4 flex flex-col justify-between ${
                      cls.status === 'live'
                        ? 'bg-gradient-to-br from-red-500 to-pink-500'
                        : 'bg-gradient-to-br from-teal-500 to-emerald-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white/80 text-xs font-medium">{cls.level}</span>
                      {getStatusBadge(cls.status)}
                    </div>
                    <h3 className="text-white font-bold text-lg truncate">{cls.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {cls.description || 'No description provided'}
                    </p>

                    {/* Teacher */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{cls.teacher?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">Instructor</div>
                      </div>
                    </div>

                    {/* Next Session Info */}
                    {cls.nextSession && (
                      <div className="bg-slate-50 rounded-lg p-3 mb-4">
                        <div className="text-xs text-slate-500 mb-1">
                          {cls.status === 'live' ? 'Started at' : 'Next Session'}
                        </div>
                        <div className="text-sm font-medium text-slate-800">
                          {formatTime(cls.nextSession.startTime)}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {cls.totalSessions} sessions
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {(cls.status === 'live' || cls.status === 'upcoming') && cls.nextSession ? (
                        <button
                          onClick={() => handleJoinClass(cls)}
                          className={`flex-1 py-2.5 rounded-lg font-semibold text-white transition-all ${
                            cls.status === 'live'
                              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse'
                              : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600'
                          }`}
                        >
                          {cls.status === 'live' ? '🔴 Join Live Class' : '📅 Join When Live'}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 py-2.5 rounded-lg font-semibold bg-slate-100 text-slate-400 cursor-not-allowed"
                        >
                          No Active Session
                        </button>
                      )}
                      <Link
                        to={`/learner/class/${cls.id}`}
                        className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
