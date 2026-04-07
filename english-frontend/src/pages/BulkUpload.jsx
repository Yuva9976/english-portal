import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../apiClient';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function BulkUpload() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialCourseId = queryParams.get('courseId') || '';
  const initialLessonId = queryParams.get('lessonId') || '';

  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('course');
  const [category, setCategory] = useState('General');
  const [level, setLevel] = useState('beginner');
  const [classroomId, setClassroomId] = useState(initialCourseId);
  const [lessonId, setLessonId] = useState(initialLessonId);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loadingContext, setLoadingContext] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [previewData, setPreviewData] = useState(null);

  // New Fields
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [vocabText, setVocabText] = useState('');
  const [resourcesText, setResourcesText] = useState('');

  useEffect(() => {
    if (initialCourseId) setClassroomId(initialCourseId);
    if (initialLessonId) setLessonId(initialLessonId);
  }, [initialCourseId, initialLessonId]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (classroomId) {
      fetchLessons(classroomId);
    } else {
      setLessons([]);
      setLessonId('');
    }
  }, [classroomId]);

  const fetchCourses = async () => {
    setLoadingContext(true);
    try {
      const res = await apiClient.get('/tutor/dashboard/classes');
      setCourses(res.data?.classes || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoadingContext(false);
    }
  };

  const fetchLessons = async (cid) => {
    try {
      const res = await apiClient.get(`/content-provider/lessons/${cid}`);
      setLessons(res.data?.lessons || []);
    } catch (err) {
      console.error('Failed to fetch lessons:', err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setPreviewData(null);
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await apiClient.get(`/content-provider/template?type=${uploadType}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${uploadType.replace('-', '_')}_template.xlsx`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download template.');
    }
  };

  // Phase 1: Analyze only (JSON preview)
  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    if (uploadType !== 'course' && !classroomId) {
      setError('Target Course is mandatory for Quizzes/Resources.');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('courseFile', file);
    formData.append('uploadType', uploadType);
    formData.append('category', category);
    formData.append('level', level);
    if (classroomId) formData.append('classroomId', classroomId);
    if (lessonId) formData.append('lessonId', lessonId);
    formData.append('youtubeUrl', youtubeUrl);
    formData.append('vocabText', vocabText);
    formData.append('resourcesText', resourcesText);

    try {
      console.log('[CLIENT] Sending /analyze-bulk request...');
      const res = await apiClient.post('/content-provider/analyze-bulk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setPreviewData(res.data.data);
        setStep(3); // Review Step
        console.log('[CLIENT] Received Preview Data:', res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Check backend logs.');
    } finally {
      setUploading(false);
    }
  };

  // Phase 2: Confirm Upload (DB transaction)
  const handleConfirmUpload = async () => {
    setUploading(true);
    setError('');
    try {
      const payload = {
        ...previewData,
        targetCourseId: classroomId,
        targetLessonId: lessonId,
        category,
        level,
      };

      console.log('[CLIENT] Sending /confirm-upload request...', payload);
      const res = await apiClient.post('/content-provider/confirm-upload', { uploadType, payload });

      if (res.data.success) {
        setSuccess(true);
        // Clear state
        setPreviewData(null);
        setFile(null);
        setTimeout(() => {
          navigate('/content-provider/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('[CLIENT] Upload error:', err);
      setError(err.response?.data?.error || 'Database save failed. Check console.');
    } finally {
      setUploading(false);
    }
  };

  const renderPreviewTable = () => {
    if (!previewData) return null;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-teal-900 uppercase tracking-tighter font-['Outfit']">Review Extracted Data</h3>
          <button onClick={() => setStep(2)} className="text-xs font-bold text-slate-400 hover:text-teal-600">Edit Settings</button>
        </div>

        {/* Course Summary */}
        <div className={`p-5 rounded-2xl border-2 ${!previewData.title && uploadType === 'course' ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-100'}`}>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Metadata</div>
          <div className="flex flex-col gap-1">
            <div className="text-sm text-teal-800"><strong>Title:</strong> {previewData.title || <span className="text-rose-500">[MISSING]</span>}</div>
            <div className="text-sm text-slate-500 line-clamp-2"><strong>Desc:</strong> {previewData.description || 'n/a'}</div>
          </div>
        </div>

        {/* Lessons & Quizzes Table */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Day / Item</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lesson Name & Content</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quiz & Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {previewData.lessons?.map((l, idx) => (
                <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">{idx + 1}</span>
                  </td>
                  <td className="px-6 py-4 align-top max-w-[300px]">
                    <div className={`font-bold text-sm mb-1 ${!l.title ? 'text-rose-500' : 'text-slate-800'}`}>{l.title || '[Untitled]'}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">{l.content}</div>
                    
                    {l.sections?.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {l.sections.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-md border border-indigo-100">
                            {s.section_type}
                          </span>
                        ))}
                      </div>
                    )}

                    {l.learningGuide && (
                      <div className="mt-3 p-2 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="text-[9px] font-black text-purple-600 uppercase mb-1">Learning Guide</div>
                        <div className="text-[10px] text-purple-500 line-clamp-1">{l.learningGuide.overview}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 align-top min-w-[300px]">
                    {l.quiz ? (
                      <div className="space-y-4">
                        <div className="text-xs font-black text-teal-600 uppercase border-b border-teal-100 pb-1 mb-2">{l.quiz.title}</div>
                        {l.quiz.questions.map((q, qIdx) => (
                          <div key={qIdx} className="space-y-2">
                            <div className="text-[11px] font-bold text-slate-700">Q: {q.text}</div>
                            <div className="grid grid-cols-2 gap-2">
                              {q.answers.map((a, aIdx) => (
                                <div
                                  key={aIdx}
                                  className={`text-[9px] p-2 rounded-lg border flex items-center justify-between ${a.isCorrect ? 'bg-teal-50 border-teal-200 text-teal-700 font-bold' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                                >
                                  <span>{a.text}</span>
                                  {a.isCorrect && <span>✓</span>}
                                </div>
                              ))}
                            </div>
                            {!q.hasCorrect && <div className="text-[9px] text-rose-500 font-bold italic">⚠️ No correct answer set!</div>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-300 italic">No quiz attached</div>
                    )}
                  </td>
                </tr>
              ))}
              {!previewData.lessons?.length && (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-slate-400 text-sm font-medium">No lessons found in this file.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Global Quiz Preview */}
        {uploadType === 'quiz' && previewData.quiz && (
          <div className="bg-amber-50/30 border border-amber-100 rounded-2xl p-6">
            <h4 className="font-black text-amber-800 uppercase tracking-widest text-[10px] mb-4">Targeted Quiz Flow</h4>
            <div className="space-y-6">
              {previewData.quiz.questions?.map((q, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="text-sm font-bold text-slate-800">{idx + 1}. {q.text}</div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {q.answers.map((a, aIdx) => (
                      <div key={aIdx} className={`p-3 rounded-xl border text-[10px] ${a.isCorrect ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold shadow-sm' : 'bg-white border-slate-200 text-slate-500'}`}>
                        {a.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-10">
          <button
            onClick={handleConfirmUpload}
            disabled={uploading}
            className="w-full py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-black rounded-[24px] hover:from-teal-700 hover:to-teal-600 transition-all shadow-xl shadow-teal-500/10 flex items-center justify-center gap-3 text-lg active:scale-95 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Saving to MySQL Database...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Confirm & Final Save</span>
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Action will wrap Course, Lesson, and Quizzes in a secure SQL Transaction</p>
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-slate-50/50 pb-20 selection:bg-teal-100'>
      <DashboardHeader
        title="Automated Curriculum Engine"
        subtitle="🚀 Mass-import learning assets into your professional curriculum with high precision."
        badgeText="CURRICULUM ENGINE"
        stats={[]}
      />

      <div className='px-10 pb-12 max-w-7xl mx-auto'>
        <div className='bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden relative'>
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-50/50 rounded-full translate-x-40 -translate-y-40 -z-0 opacity-40" />
          
          <div className='p-10 md:p-20 relative z-10'>
            <div className='max-w-4xl mx-auto'>

              {/* Header Stepper - Premium Design */}
              <div className="flex items-center gap-4 mb-20">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 shadow-lg ${
                      step === i 
                        ? 'bg-gradient-to-br from-teal-500 to-teal-400 text-white shadow-teal-500/30 scale-110 ring-4 ring-teal-50' 
                        : step > i 
                        ? 'bg-teal-50 text-teal-600' 
                        : 'bg-slate-100 text-slate-400 opacity-60'
                    }`}>
                      {step > i ? '✓' : i}
                    </div>
                    <div className={`flex flex-col hidden sm:flex`}>
                       <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${step === i ? 'text-teal-600' : 'text-slate-400'}`}>
                          {i === 1 ? 'Architecture' : i === 2 ? 'Upload' : 'Validation'}
                       </div>
                       <div className="text-[9px] font-bold text-slate-400 mt-0.5">
                          {i === 1 ? 'Select Type' : i === 2 ? 'File Setup' : 'SQL Review'}
                       </div>
                    </div>
                    {i < 3 && <div className="flex-1 h-[2px] bg-slate-100 mx-4 opacity-30" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className='space-y-12 animate-in fade-in slide-in-from-right-8 duration-500'>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#0D9488] tracking-tight font-['Outfit'] uppercase">What are we importing?</h2>
                    <p className="text-slate-500 mt-3 font-medium font-['Inter']">Select the specialized import engine for your curriculum scope.</p>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {[
                      { id: 'course', label: 'Full Course', sub: 'SQL Hierarchy', icon: '📚', color: 'teal' },
                      { id: 'learning-guide', label: 'Grammar Guide', sub: 'Deep Rules', icon: '📖', color: 'pink' },
                      { id: 'lesson-flow', label: 'Lesson Flow', sub: 'Interactives', icon: '🌊', color: 'indigo' },
                      { id: 'quiz', label: 'Quiz Set', sub: 'Evaluations', icon: '📝', color: 'rose' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setUploadType(type.id)}
                        className={`flex flex-col items-center gap-4 p-8 rounded-[2rem] border-2 transition-all duration-300 text-center relative overflow-hidden group ${
                          uploadType === type.id 
                            ? `border-teal-500 bg-teal-50 shadow-xl shadow-teal-500/10` 
                            : 'border-slate-100 bg-slate-50/50 hover:border-teal-200'
                        }`}
                      >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-1 shadow-sm transition-transform group-hover:scale-110 duration-500 ${uploadType === type.id ? 'bg-white' : 'bg-white/80'}`}>
                          {type.icon}
                        </div>
                        <div>
                          <div className={`font-black text-[10px] uppercase tracking-widest ${uploadType === type.id ? 'text-teal-900' : 'text-slate-700'}`}>{type.label}</div>
                          <div className='text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-tighter'>{type.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-5 bg-slate-900 text-teal-400 font-black rounded-[1.5rem] shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 active:scale-95 text-lg font-['Outfit'] tracking-widest uppercase">
                    Initialize Setup
                    <span>→</span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                     <div>
                        <h2 className="text-2xl font-bold text-[#0D9488] tracking-tight font-['Outfit'] uppercase">Targeting Parameters</h2>
                        <p className="text-slate-400 font-medium text-sm mt-1">Configure where your content will be persisted.</p>
                    </div>
                    <button onClick={() => setStep(1)} className="px-5 py-2 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Back</button>
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Primary Course</label>
                        <select value={classroomId} onChange={(e) => setClassroomId(e.target.value)} className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:border-teal-500 outline-none transition-all shadow-sm font-['Inter']">
                          <option value="">-- Choose Target --</option>
                          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Specific Lesson</label>
                        <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} disabled={!classroomId} className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-700 focus:bg-white focus:border-teal-500 outline-none transition-all shadow-sm disabled:opacity-50 font-['Inter']">
                          <option value="">-- Select Child Node --</option>
                          {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                        </select>
                      </div>
                    </div>

                  <div className="space-y-8 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                       Auxiliary Lesson Metadata
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">YouTube Video URL</label>
                        <input 
                          type="text" 
                          placeholder="https://youtube.com/watch?v=..." 
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:border-teal-500 outline-none transition-all shadow-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Vocabulary Terms (One per line)</label>
                          <textarea 
                            placeholder="Word: Definition" 
                            rows={4}
                            value={vocabText}
                            onChange={(e) => setVocabText(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:border-teal-500 outline-none transition-all shadow-sm resize-none"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Resources (Name: URL)</label>
                          <textarea 
                            placeholder="Worksheet: https://link.com" 
                            rows={4}
                            value={resourcesText}
                            onChange={(e) => setResourcesText(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:border-teal-500 outline-none transition-all shadow-sm resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Excel Source (Strict V3 Schema)</label>
                      <button 
                        onClick={handleDownloadTemplate}
                        className="flex items-center gap-2 group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center transition-transform group-hover:scale-110">📥</span>
                        <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest border-b-2 border-teal-500/20">Format Reference</span>
                      </button>
                    </div>

                    <div className="relative group">
                      <input type="file" accept=".pdf,.txt,.xlsx,.csv" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className={`p-16 border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center transition-all duration-500 ${file ? 'border-teal-500 bg-teal-50/50 shadow-inner' : 'border-slate-200 group-hover:border-teal-400 bg-slate-50/30'}`}>
                        {file ? (
                          <div className="text-center animate-fadeIn">
                            <div className="text-6xl mb-6 bounce-in">📄</div>
                            <p className="text-xl font-black text-slate-800 font-['Outfit']">{file.name}</p>
                            <p className="text-[10px] text-teal-500 mt-2 font-black uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB • Verified Local Check</p>
                            <button className="mt-8 text-rose-400 text-[10px] font-black uppercase tracking-widest hover:text-rose-600">Remove File</button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className='w-20 h-20 rounded-[1.5rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500'>
                              <span className="text-3xl text-slate-300">📁</span>
                            </div>
                            <p className="text-lg font-black text-slate-700 font-['Outfit'] uppercase tracking-tight">Drop Source Material</p>
                            <p className="text-[11px] text-slate-400 mt-2 font-bold font-['Inter']">Accepts .xlsx standard templates only</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button onClick={handleAnalyze} disabled={uploading || !file} className="w-full py-6 bg-gradient-to-r from-teal-500 via-teal-600 to-pink-500 text-white font-black rounded-[1.5rem] shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-4 text-xl active:scale-95 disabled:opacity-50 font-['Outfit'] tracking-[0.1em] uppercase">
                    {uploading ? 'Deconstructing Schematics...' : 'Run Deep Analysis 📊'}
                  </button>
                </div>
              )}

              {step === 3 && renderPreviewTable()}

              {error && (
                <div className="mt-12 p-8 bg-rose-50 border-2 border-rose-100 text-rose-600 rounded-[2rem] shadow-lg shadow-rose-500/5 animate-shake">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">⚠️</div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Engine Exception</div>
                      <div className="text-sm font-black font-['Inter']">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mt-12 p-8 bg-teal-50 border-2 border-teal-100 text-teal-600 rounded-[2rem] shadow-lg shadow-teal-500/5 animate-bounce">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">🚀</div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Success Payload</div>
                      <div className="text-sm font-black font-['Inter']">Schema successfully synced with MySQL Cluster. Redirecting...</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
