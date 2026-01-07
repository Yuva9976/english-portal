import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LearnerSidebar from '../components/LearnerSidebar';
import apiClient from '../apiClient';

export default function LearnerClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassDetail();
  }, [classId]);

  const fetchClassDetail = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/dashboard/learner/classes/${classId}`);
      setClassData(res.data);
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
    // Navigate to the classroom page
    navigate(`/class/${classId}`);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <main className="flex-1 p-6 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 text-red-700 p-6 rounded-lg text-center">
              <p className="mb-4">{error}</p>
              <Link
                to="/learner/classes"
                className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Back to My Classes
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to="/learner/classes"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to My Classes
          </Link>

          {/* Hero Section */}
          <div
            className={`rounded-2xl p-8 mb-6 ${
              classData.isLive
                ? 'bg-gradient-to-br from-red-500 to-pink-500'
                : 'bg-gradient-to-br from-teal-500 to-emerald-500'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white/80 text-sm font-medium px-3 py-1 bg-white/20 rounded-full">
                    {classData.level || 'General'}
                  </span>
                  {classData.isLive && (
                    <span className="flex items-center gap-1 text-white text-sm font-semibold px-3 py-1 bg-white/20 rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      LIVE NOW
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{classData.title}</h1>
                <p className="text-white/90">{classData.description || 'No description provided'}</p>
              </div>

              {classData.isLive && (
                <button
                  onClick={handleJoinClass}
                  className="shrink-0 px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-pulse"
                >
                  🔴 Join Live Class
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Teacher Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-800 mb-4">Instructor</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {classData.teacher?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-800">
                      {classData.teacher?.name || 'Unknown'}
                    </div>
                    <div className="text-slate-500">Class Instructor</div>
                  </div>
                </div>
              </div>

              {/* Sessions History */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-800 mb-4">Class Sessions</h2>
                {classData.sessions?.length > 0 ? (
                  <div className="space-y-3">
                    {classData.sessions.map((session, idx) => {
                      const isActive =
                        classData.activeSession?.id === session.id;
                      const isPast = session.endTime && new Date(session.endTime) < new Date();

                      return (
                        <div
                          key={session.id}
                          className={`p-4 rounded-lg border ${
                            isActive
                              ? 'border-red-200 bg-red-50'
                              : isPast
                              ? 'border-slate-100 bg-slate-50'
                              : 'border-teal-200 bg-teal-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-800">
                                  Session #{classData.sessions.length - idx}
                                </span>
                                {isActive && (
                                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                                    LIVE
                                  </span>
                                )}
                                {isPast && (
                                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    Completed
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-slate-500 mt-1">
                                {formatDateTime(session.startTime)}
                                {session.endTime && ` - ${formatDateTime(session.endTime)}`}
                              </div>
                            </div>
                            {isActive && (
                              <button
                                onClick={handleJoinClass}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                              >
                                Join Now
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No sessions yet</p>
                )}
              </div>

              {/* Resources */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="font-semibold text-slate-800 mb-4">Class Resources</h2>
                {classData.resources?.length > 0 ? (
                  <div className="space-y-3">
                    {classData.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                          {resource.type === 'video' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : resource.type === 'document' ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-800">{resource.title}</div>
                          {resource.description && (
                            <div className="text-sm text-slate-500">{resource.description}</div>
                          )}
                        </div>
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No resources available</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4">Class Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Level</span>
                    <span className="font-medium text-slate-800">{classData.level || 'General'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Students</span>
                    <span className="font-medium text-slate-800">{classData.studentCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Total Sessions</span>
                    <span className="font-medium text-slate-800">{classData.sessions?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Resources</span>
                    <span className="font-medium text-slate-800">{classData.resources?.length || 0}</span>
                  </div>
                </div>
              </div>

              {/* Enrolled Date */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-2">Enrollment</h3>
                <p className="text-slate-500 text-sm">
                  You enrolled on{' '}
                  <span className="font-medium text-slate-700">
                    {formatDateTime(classData.enrolledAt)}
                  </span>
                </p>
              </div>

              {/* Join Button (when live) */}
              {classData.isLive && (
                <button
                  onClick={handleJoinClass}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-pulse"
                >
                  🔴 Join Live Class Now
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
