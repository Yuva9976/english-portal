import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export default function CoursePreview() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassDetail();
  }, [courseId]);

  const fetchClassDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const [courseRes, lessonsRes] = await Promise.all([
        apiClient.get(`/content-provider/courses/${courseId}`),
        apiClient.get(`/content-provider/lessons/${courseId}`)
      ]);

      const courseData = courseRes.data.course;
      const lessonsData = lessonsRes.data.lessons;

      setCls({
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        level: courseData.level,
        teacher: { name: 'Instructor' },
        lessons: lessonsData || [],
        sessions: [],
        studentCount: 0
      });
    } catch (err) {
      console.error('Failed to load course details for preview:', err);
      setError('Failed to load course details for preview');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-10 animate-fadeIn">
        <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse font-['Outfit']">Rendering Experience...</p>
      </div>
    );
  }

  if (error || !cls) {
    return (
      <div className="bg-rose-50 text-rose-700 p-12 rounded-[3rem] text-center max-w-2xl mx-auto mt-20 shadow-2xl border border-rose-100 flex flex-col items-center">
        <span className="text-6xl mb-6 block animate-bounce">⚠️</span>
        <p className="font-black mb-8 text-2xl font-['Outfit'] uppercase tracking-tight">{error || 'Simulation Node Not Found'}</p>
        <button onClick={() => navigate(-1)} className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/30 active:scale-95">
          Abort Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-6 md:px-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-8 no-print">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-slate-400 hover:text-teal-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>BACK TO LOGIC MATRIX</span>
          </button>

          <div className="flex items-center gap-5">
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-white text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 shadow-sm hover:border-teal-200 hover:text-teal-600 transition-all group flex items-center gap-3"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform">🖨️</span>
              GENERATE SYLLABUS PDF
            </button>
            <span className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-2xl text-[10px] font-black border border-teal-400/50 shadow-xl shadow-teal-500/20 tracking-widest uppercase">
              PREVIEW MODE ACTIVE
            </span>
          </div>
        </div>

        {/* Hero Section (Refactored from Black Box to Compact White Card) */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 md:p-12 mb-8 shadow-sm border border-slate-100 border-t-4 border-t-teal-500 group transition-all hover:shadow-md">
          {/* Decorative Layers */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-[60px] opacity-50"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-teal-50 text-[#0D9488] rounded-lg text-[9px] font-black uppercase tracking-widest border border-teal-100 italic">Curriculum Matrix</span>
              <span className="w-1.5 h-1.5 bg-[#F43F5E] rounded-full animate-pulse shadow-sm shadow-rose-500/50"></span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter leading-tight font-['Outfit'] uppercase">
              {cls.title}
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold max-w-2xl border-l-2 border-slate-100 pl-4">
              {cls.description || 'Master this comprehensive knowledge framework designed for total proficiency.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="xl:col-span-2 space-y-12">

            {/* Instructor Card */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between group hover:shadow-2xl hover:border-teal-50 transition-all gap-8">
              <div className="flex items-center gap-8 text-center md:text-left">
                <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center text-white font-black text-4xl shadow-2xl ring-8 ring-teal-50 group-hover:rotate-6 transition-transform font-['Outfit']">
                  {cls.teacher?.name?.charAt(0) || 'I'}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">Knowledge Architect</p>
                  <h3 className="text-3xl font-black text-slate-800 font-['Outfit'] tracking-tight">{cls.teacher?.name || 'Authorized Instructor'}</h3>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-teal-500">✨</div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-pink-500 text-xl font-black">P</div>
              </div>
            </div>

            {/* Course Outline */}
            <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-slate-50 rounded-full transition-transform duration-1000 group-hover:scale-110"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 relative z-10 gap-6">
                <div>
                  <h3 className="text-3xl font-black text-teal-900 flex items-center gap-5 font-['Outfit'] mb-2">
                    <span className="w-16 h-16 rounded-[1.5rem] bg-pink-50 text-pink-500 flex items-center justify-center shadow-inner text-3xl">📚</span>
                    Logic Roadmap
                  </h3>
                  <p className="text-slate-500 font-semibold ml-2">Systematic breakdown of instructional segments.</p>
                </div>
                <div className="px-8 py-3 bg-slate-900 rounded-3xl text-[11px] font-black text-white uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/30 border border-white/5">
                  {cls.lessons?.length || 0} DEPLOYED MODULES
                </div>
              </div>

              {cls.lessons && cls.lessons.length > 0 ? (
                <div className="space-y-6 relative z-10">
                  {cls.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-8 rounded-[3rem] border border-slate-50 hover:border-teal-400 hover:bg-teal-50/20 transition-all duration-500 group cursor-pointer hover:-translate-x-2 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 bg-white/50 backdrop-blur-sm"
                      onClick={() => navigate(`/lessons/${lesson.id}`)}
                    >
                      <div className="flex items-center gap-10">
                        <div className="w-20 h-20 rounded-[2rem] bg-white shadow-inner border border-slate-100 flex flex-col items-center justify-center group-hover:scale-110 group-hover:bg-teal-500 transition-all duration-500">
                          <span className="text-[10px] font-black uppercase text-teal-500 group-hover:text-white/80 tracking-tighter transition-colors">Unit</span>
                          <span className="text-2xl font-black text-teal-800 group-hover:text-white font-['Outfit'] transition-all">{idx + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-teal-900 group-hover:text-teal-700 transition tracking-tighter font-['Outfit']">
                            {lesson.title}
                          </p>
                          <div className="flex gap-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span> MULTIMEDIA
                            </span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> INTERACTIVE
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all shadow-2xl shadow-teal-500/40 text-2xl font-black">
                        →
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-slate-50/50 rounded-[3.5rem] border-4 border-dashed border-slate-100 relative z-10 group-hover:border-teal-100 transition-all">
                  <div className="text-8xl mb-10 opacity-10 animate-pulse">🏛️</div>
                  <h4 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2 font-['Outfit']">Architectural Void</h4>
                  <p className="text-slate-400 text-sm font-medium">Provision lessons via the dashboard to populate this nexus.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-10 no-print">
            {/* Deployment Analytics */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-rose-400 to-teal-400"></div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px]"></div>

              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">DEPLOYMENT ANALYTICS</h4>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-teal-500/40 transition-all group/stat">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-2xl group-hover/stat:rotate-12 transition-transform shadow-inner">🎯</div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Cognitive Target</p>
                      <span className="text-sm font-black text-teal-400 tracking-tight uppercase">{cls.level || 'GENERAL'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-pink-500/40 transition-all group/stat">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl group-hover/stat:scale-110 transition-transform shadow-inner">📚</div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Segment Count</p>
                      <span className="text-2xl font-black text-white font-['Outfit']">{cls.lessons?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center">
                <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-teal-500 text-white text-[9px] font-black shadow-2xl shadow-teal-500/40 border border-teal-400/30 uppercase tracking-[0.2em]">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  SYLLABUS CERTIFIED
                </div>
                <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em] mt-4 leading-relaxed text-center">Protocol V1.0 - Logic Verified</p>
              </div>
            </div>

            {/* Elite Curriculum Card */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-pink-500/30 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000"></div>
              <span className="text-5xl mb-4 block drop-shadow-lg">✨</span>
              <h3 className="text-xl font-black mb-3 font-['Outfit'] tracking-tighter uppercase">Elite Curriculum</h3>
              <p className="text-pink-100 text-[11px] font-medium leading-relaxed opacity-90 mx-auto max-w-[200px]">Engineered with high-fidelity analytics and interactive behavioral guides for optimized learning performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
