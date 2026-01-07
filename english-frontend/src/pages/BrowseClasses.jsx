import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LearnerLayout from '../layouts/LearnerLayout';
import apiClient from '../apiClient';

export default function BrowseClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    fetchAvailableClasses();
  }, []);

  const fetchAvailableClasses = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/classroom/available');
      setClasses(res.data?.classes || []);
    } catch (err) {
      console.error('Failed to load classes:', err);
      setError('Failed to load available classes');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (classId) => {
    try {
      setEnrolling(classId);
      await apiClient.post(`/classroom/${classId}/enroll`);
      // Update the class in the list to show enrolled status
      setClasses(prev => prev.map(cls => 
        cls.id === classId ? { ...cls, isEnrolled: true } : cls
      ));
    } catch (err) {
      console.error('Failed to enroll:', err);
      alert(err.response?.data?.error || 'Failed to enroll in class');
    } finally {
      setEnrolling(null);
    }
  };

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || cls.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const levels = ['all', ...new Set(classes.map(c => c.level).filter(Boolean))];

  return (
    <LearnerLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Browse Classes</h1>
          <p className="text-sm text-slate-600">Discover and enroll in available classes</p>
        </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search classes by name, description, or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{classes.length}</div>
                  <div className="text-xs text-slate-500">Available Classes</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {new Set(classes.map(c => c.teacher?.id).filter(Boolean)).size}
                  </div>
                  <div className="text-xs text-slate-500">Instructors</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {classes.filter(c => c.isEnrolled).length}
                  </div>
                  <div className="text-xs text-slate-500">Enrolled</div>
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
          ) : filteredClasses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Classes Found</h3>
              <p className="text-slate-500 mb-4">
                {searchTerm || levelFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No classes are available at the moment'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${
                    cls.isEnrolled ? 'border-teal-200 ring-1 ring-teal-100' : 'border-slate-100'
                  }`}
                >
                  {/* Card Header */}
                  <div className="h-28 p-4 flex flex-col justify-between bg-gradient-to-br from-teal-500 to-emerald-500">
                    <div className="flex justify-between items-start">
                      <span className="text-white/80 text-xs font-medium px-2 py-1 bg-white/20 rounded-full">
                        {cls.level || 'General'}
                      </span>
                      {cls.isEnrolled && (
                        <span className="flex items-center gap-1 text-white text-xs font-semibold px-2 py-1 bg-white/20 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Enrolled
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg truncate">{cls.title}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 min-h-[40px]">
                      {cls.description || 'No description provided'}
                    </p>

                    {/* Teacher */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {cls.teacher?.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{cls.teacher?.name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">Instructor</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {cls.studentCount || 0} students
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {cls.sessionCount || 0} sessions
                      </div>
                    </div>

                    {/* Action Button */}
                    {cls.isEnrolled ? (
                      <Link
                        to={`/learner/class/${cls.id}`}
                        className="block w-full py-2.5 text-center rounded-lg font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 transition-all"
                      >
                        View Class
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(cls.id)}
                        disabled={enrolling === cls.id}
                        className="w-full py-2.5 rounded-lg font-semibold border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enrolling === cls.id ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enrolling...
                          </span>
                        ) : 'Enroll Now'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </LearnerLayout>
  );
}
