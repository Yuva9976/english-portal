import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../apiClient';

export default function BrowseClasses() {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { view } = useParams();
  const [enrolling, setEnrolling] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [availableRes, enrolledRes] = await Promise.all([
        apiClient.get('/classroom/available'),
        apiClient.get('/dashboard/learner')
      ]);
      setAvailableClasses(availableRes.data?.classes || []);
      setEnrolledClasses(enrolledRes.data?.classes || []);
    } catch (err) {
      console.error('Failed to load class data:', err);
      setError('Failed to load class data');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (classId) => {
    try {
      setEnrolling(classId);
      await apiClient.post(`/classroom/${classId}/enroll`);
      // Refresh data after enrollment
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to enroll');
    } finally {
      setEnrolling(null);
    }
  };

  const filteredAvailable = availableClasses.filter(cls => {
    const matchesSearch =
      cls.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || cls.level === levelFilter;
    const notEnrolled = !enrolledClasses.some(ec => ec.id === cls.id);
    return matchesSearch && matchesLevel && notEnrolled;
  });

  const learningSections = [
    { id: 'vocabulary', title: 'Vocabulary Master', icon: '📚', description: 'Learn 5000+ words with AI-powered flashcards', color: 'from-[#14b8a6] to-[#f43f5e]', path: '/learner/vocabulary' },
    { id: 'pronunciation', title: 'Pronunciation Lab', icon: '🎤', description: 'Perfect your accent with native speaker audio', color: 'from-[#f43f5e] to-[#ec4899]', path: '/learner/pronunciation' },
    { id: 'grammar', title: 'Grammar Mastery', icon: '✏️', description: 'Interactive lessons on all English grammar topics', color: 'from-[#14b8a6] to-[#0ea5e9]', path: '/learner/grammar' },
    { id: 'exercises', title: 'Practice Hub', icon: '⚡', description: 'Hands-on exercises to master your skills faster', color: 'from-slate-600 to-slate-800', path: '/modules/grammar-hub/exercises', isLink: true }
  ];

  if (loading) {
    return (
      <div className="w-full flex-1">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium font-['Inter']">Preparing your Classes Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <div className="min-h-screen bg-transparent relative font-['Inter']">
        {/* ── Page Header ── */}
        <div className="px-10 pt-10 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
              <div>
                <h1 className="mb-2" style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '42px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #f43f5e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ WebkitTextFillColor: 'initial' }}>🔍</span> Classroom Hub
                </h1>
                <p className="text-slate-500 font-medium max-w-2xl leading-relaxed font-['Inter']" style={{ marginLeft: '4px' }}>
                  Manage your active enrollments and discover new learning opportunities with expert-led sessions.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[20px] border border-teal-100/50 text-center min-w-[100px] shadow-sm">
                  <div className="text-[24px] font-black tracking-tight text-[#14b8a6] leading-none mb-1 font-['Outfit']">42</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Day Streak</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-[20px] border border-pink-100/50 text-center min-w-[100px] shadow-sm">
                  <div className="text-[24px] font-black tracking-tight text-[#f43f5e] leading-none mb-1 font-['Outfit']">850</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total XP</div>
                </div>
              </div>
            </div>


            {/* Refined Filter Bar - Premium Style */}
            <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm mb-12 p-4 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-3">Type</span>
                  <select className="bg-transparent font-bold text-slate-700 outline-none text-[13px] pr-4 cursor-pointer">
                    <option>All Classes</option>
                    <option>Live Class</option>
                    <option>Self-Paced</option>
                  </select>
                </div>
                <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-3">Level</span>
                  <select 
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-transparent font-bold text-slate-700 outline-none text-[13px] pr-4 cursor-pointer"
                  >
                    <option value="all">Any Level</option>
                    {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search classes..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-10 pr-4 text-[13px] font-medium outline-none focus:border-teal-400/50 transition-all font-['Inter']"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  {filteredAvailable.length + enrolledClasses.length} Results
                </div>
              </div>
            </div>

            {/* Combined Class List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
              {/* Active Classes First */}
              {enrolledClasses.map((cls) => (
                <EnrolledClassCard key={cls.id} cls={cls} navigate={navigate} />
              ))}
              
              {/* Available Classes */}
              {filteredAvailable.map((cls) => (
                <AvailableClassCard
                  key={cls.id}
                  cls={cls}
                  enrolling={enrolling === cls.id}
                  onEnroll={handleEnroll}
                />
              ))}

              {/* Empty State if absolutely nothing matches */}
              {enrolledClasses.length === 0 && filteredAvailable.length === 0 && (
                <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight font-['Outfit']">No classes found</h3>
                  <p className="text-slate-500 font-medium font-['Inter']">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>

              {/* Learning Specializations */}
              <section className="pt-20 border-t border-slate-100">
                <div className="mb-10">
                  <h2 className="font-black text-[24px] text-slate-900 tracking-tight mb-2 font-['Outfit'] uppercase">
                    Learning Specializations
                  </h2>
                  <p className="text-slate-500 font-medium text-[14px]">Focus on targeted skill development with our core modules</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningSections.map((section) => (
                    <div
                      key={section.id}
                      onClick={() => {
                        if (section.isLink) window.open(section.path, '_blank');
                        else {
                          navigate(section.path);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden cursor-pointer"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${section.color}`} />
                      
                      <div className="text-3xl mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110 origin-left">{section.icon}</div>
                      <h3 className="text-[16px] font-black text-[#2c3e50] mb-1.5 relative z-10 leading-tight font-['Outfit'] uppercase tracking-tight">{section.title}</h3>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4 flex-1 relative z-10 font-['Inter']">{section.description}</p>
                      <div className="flex items-center text-[10px] font-black bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text text-transparent uppercase tracking-[0.2em] gap-2 group-hover:gap-4 transition-all relative z-10 font-['Outfit']">
                        View Details <span className="text-pink-500">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrolledClassCard({ cls, navigate }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border-2 border-slate-50 hover:border-teal-100 overflow-hidden transform hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-rose-400" />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-teal-100">
            {cls.level}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
            ⚡
          </div>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-[15px] font-black text-slate-800 mb-1 font-['Outfit'] uppercase tracking-tight">{cls.title}</h3>
          <p className="text-[10px] text-slate-500 font-medium line-clamp-2 px-1 leading-relaxed font-['Inter']">{cls.description}</p>
        </div>

        <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100/50 mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest font-['Inter']">
            <span>Mastery</span>
            <span className="text-teal-600">65%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden shadow-inner">
             <div className="bg-gradient-to-r from-teal-500 to-teal-400 h-full w-[65%] rounded-full shadow-[0_0_4px_rgba(20,184,166,0.3)]"></div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/class/${cls.id}`)}
          className="w-full py-2.5 bg-slate-900 hover:bg-teal-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
        >
          {cls.status === 'live' ? 'Join Live' : 'Open Class'}
        </button>
      </div>
    </div>
  );
}

function AvailableClassCard({ cls, enrolling, onEnroll }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border-2 border-slate-50 hover:border-teal-100 overflow-hidden transform hover:-translate-y-1">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-teal-400" />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-pink-100">
            {cls.level || 'General'}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
            🎓
          </div>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-[15px] font-black text-slate-800 mb-1 font-['Outfit'] uppercase tracking-tight">{cls.title}</h3>
          <p className="text-[10px] text-slate-500 font-medium line-clamp-2 px-1 leading-relaxed font-['Inter']">Master {cls.title} with expert sessions.</p>
        </div>

        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100/50 mb-4 grid grid-cols-3 gap-1">
            <div className="text-center">
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Teacher</p>
              <p className="text-[10px] font-bold text-slate-700 truncate">{cls.teacher?.name || 'Dr. Smith'}</p>
            </div>
            <div className="text-center border-x border-slate-200">
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Units</p>
              <p className="text-[10px] font-bold text-slate-700">{cls.sessionCount || '12'}</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Learners</p>
              <p className="text-[10px] font-bold text-slate-700">{cls.studentCount || '85'}+</p>
            </div>
        </div>

        <button
          onClick={() => onEnroll(cls.id)}
          disabled={enrolling}
          className="w-full py-2.5 bg-transparent hover:bg-pink-600 border-2 border-slate-100 hover:border-pink-600 text-slate-800 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
        >
          {enrolling ? '...' : 'Secure Spot'}
        </button>
      </div>
    </div>
  );
}
