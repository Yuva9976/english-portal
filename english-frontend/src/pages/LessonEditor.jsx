import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../apiClient'

export default function LessonEditor() {
  const navigate = useNavigate()
  const { lessonId, courseId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    duration: 0,
    sections: [],
    quizzes: [],
    resources: [],
    learningGuides: [],
    conceptual_overview: '',
    structural_taxonomy: [],
    logic_rules: []
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(!!lessonId)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const sectionTypes = [
    { id: 'overview', label: 'Overview', icon: '📖', color: 'teal' },
    { id: 'video', label: 'Videos', icon: '🎥', color: 'blue' },
    { id: 'writing', label: 'Writing', icon: '✍️', color: 'rose' },
    { id: 'reading', label: 'Reading', icon: '📚', color: 'amber' },
    { id: 'vocabulary', label: 'Vocabulary', icon: '🔤', color: 'emerald' },
    { id: 'resource', label: 'Resources', icon: '🎭', color: 'purple' }
  ]

  const [activeCourseId, setActiveCourseId] = useState(courseId)

  useEffect(() => {
    if (lessonId) {
      loadLesson()
    } else if (courseId) {
      setActiveCourseId(courseId)
    }
  }, [lessonId, courseId])

  const loadLesson = async () => {
    try {
      const res = await apiClient.get(`/content-provider/lessons/detail/${lessonId}`)
      if (res.data?.lesson) {
        const l = res.data.lesson
        setFormData({
          title: l.title || '',
          description: l.description || '',
          videoUrl: l.media_url || '',
          duration: l.duration || 0,
          sections: l.LessonSections || [],
          quizzes: l.quizzes || [],
          resources: l.resources || [],
          learningGuides: l.learningGuides || [],
          conceptual_overview: l.conceptual_overview || '',
          structural_taxonomy: typeof l.structural_taxonomy === 'string' ? JSON.parse(l.structural_taxonomy) : (l.structural_taxonomy || []),
          logic_rules: typeof l.logic_rules === 'string' ? JSON.parse(l.logic_rules) : (l.logic_rules || [])
        })
        if (l.classroom_id) {
          setActiveCourseId(l.classroom_id)
        }
      } else {
        setError('Lesson not found')
      }
    } catch (err) {
      console.error('Load lesson error:', err)
      setError('Failed to load lesson details')
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addSection = (type) => {
    const sectionInfo = sectionTypes.find(s => s.id === type)
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: sectionInfo.label,
          content: '',
          section_type: type,
          order_index: prev.sections.length
        }
      ]
    }))
  }

  const updateSection = (index, field, value) => {
    setFormData(prev => {
      const newSections = [...prev.sections]
      newSections[index][field] = value
      return { ...prev, sections: newSections }
    })
  }

  const removeSection = (index) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }))
  }

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await apiClient.delete(`/content-provider/quizzes/${quizId}`);
      setFormData(prev => ({
        ...prev,
        quizzes: prev.quizzes.filter(q => q.id !== quizId)
      }));
      setSuccess('Quiz deleted successfully');
    } catch (err) {
      setError('Failed to delete quiz');
    }
  };

  const handleDeleteResource = async (resId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    try {
      await apiClient.delete(`/content-provider/resources/${resId}`);
      setFormData(prev => ({
        ...prev,
        resources: prev.resources.filter(r => r.id !== resId)
      }));
      setSuccess('Resource deleted successfully');
    } catch (err) {
      setError('Failed to delete resource');
    }
  };

  const handleDeleteQuestion = async (qId, quizId) => {
    if (!window.confirm('Are you sure you want to delete this specific question?')) return;
    try {
      await apiClient.delete(`/content-provider/quizzes/questions/${qId}`);
      setFormData(prev => ({
        ...prev,
        quizzes: prev.quizzes.map(qz => (
          qz.id === quizId
            ? { ...qz, questions: qz.questions.filter(q => q.id !== qId) }
            : qz
        ))
      }));
      setSuccess('Question removed instantly 🗑️');
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  const addLearningGuide = () => {
    setFormData(prev => ({
      ...prev,
      learningGuides: [
        ...prev.learningGuides,
        {
          title: '',
          content_json: { overview: '', types: [], rules: [] },
          image_url: '',
          pdf_url: '',
          order_index: prev.learningGuides.length
        }
      ]
    }))
  }

  const updateLearningGuide = (index, field, value) => {
    setFormData(prev => {
      const newGuides = [...prev.learningGuides]
      newGuides[index][field] = value
      return { ...prev, learningGuides: newGuides }
    })
  }

  const updateGuideContent = (index, key, value) => {
    setFormData(prev => {
      const newGuides = [...prev.learningGuides]
      const guide = { ...newGuides[index] }
      // Ensure content_json is an object
      let content = guide.content_json;
      if (typeof content === 'string') {
        try { content = JSON.parse(content); } catch (e) { content = {}; }
      }
      content = { ...content, [key]: value };
      guide.content_json = content;
      newGuides[index] = guide;
      return { ...prev, learningGuides: newGuides }
    })
  }

  const removeLearningGuide = (index) => {
    setFormData(prev => ({
      ...prev,
      learningGuides: prev.learningGuides.filter((_, i) => i !== index)
    }))
  }

  const handleVocabExcelUpload = async (idx, file) => {
    if (!file) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('lessonId', lessonId || ''); // If lessonId exists (edit mode)

    try {
      setLoading(true);
      const res = await apiClient.post('/content-provider/vocabulary/bulk-upload', formDataUpload);
      if (res.data?.success && res.data.words) {
        // Backend returns the created VocabularyWord objects.
        // We append them to the existing list in this section's content.
        const currentContent = formData.sections[idx].content || '[]';
        let currentWords = [];
        try {
          currentWords = JSON.parse(currentContent);
          if (typeof currentWords === 'string') currentWords = JSON.parse(currentWords);
        } catch (e) {
          currentWords = [];
        }

        const newWords = [...currentWords, ...res.data.words];
        updateSection(idx, 'content', JSON.stringify(newWords));
        alert(`Successfully uploaded and integrated ${res.data.count} words! ✨`);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload Excel file. Check format.');
    } finally {
      setLoading(false);
    }
  };

  const userRole = JSON.parse(localStorage.getItem('user'))?.role || 'provider';
  const isTutor = userRole === 'tutor' || userRole === 'teacher';

  const backUrl = isTutor
    ? `/tutor/classes/${activeCourseId}/resources`
    : `/content-provider/courses/${activeCourseId}/lessons`;

  const handleQuizRedirect = async () => {
    if (lessonId && lessonId !== 'new') {
      navigate(`/content-provider/quizzes/${lessonId}/create`);
      return;
    }

    if (!formData.title) {
      setError('⚠️ Please enter a Lesson Title and save before adding a Quiz!');
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(`/content-provider/lessons/${activeCourseId}`, formData);
      navigate(`/content-provider/quizzes/${res.data.lessonId}/create`);
    } catch (err) {
      setError('Failed to auto-save lesson before quiz creation.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title) {
      setError('Title is required')
      return
    }

    setLoading(true)
    setError('')
    try {
      let finalCourseId = activeCourseId
      if (lessonId) {
        const res = await apiClient.put(`/content-provider/lessons/${lessonId}`, formData)
        finalCourseId = res.data?.courseId || activeCourseId
        setSuccess('Lesson updated successfully! ✨')
      } else {
        const res = await apiClient.post(`/content-provider/lessons/${activeCourseId}`, formData)
        finalCourseId = res.data?.courseId || activeCourseId
        setSuccess('Lesson created successfully! ✨')
      }
      setTimeout(() => {
        if (lessonId && lessonId !== 'new') {
          // If editing existing, return to curriculum list
          const finalUrl = isTutor ? `/tutor/classes/${finalCourseId}/resources` : `/content-provider/courses/${finalCourseId}/lessons`;
          navigate(finalUrl);
        } else {
          // If new lesson, proceed to Assessment (Quiz) logic
          navigate(`/content-provider/quizzes/${res.data.lessonId}/create`);
        }
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save lesson')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <div className="text-center py-20">Loading lesson editor...</div>

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 selection:bg-teal-100 font-['Inter']">
      {/* Header Section */}
      <div className='max-w-6xl mx-auto mb-12 px-6 pt-16'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
          {success && (
            <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-[#0D9488] text-white rounded-2xl shadow-2xl shadow-teal-500/40 font-black text-sm uppercase tracking-widest animate-bounce flex items-center gap-4 border-4 border-white">
              <span className="text-xl">✨</span>
              {success} {!lessonId && "Redirecting to Assessment Matrix..."}
            </div>
          )}
          <button
            onClick={() => navigate(backUrl)}
            className="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all font-bold text-sm"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span>{isTutor ? 'Back to Resources' : 'Back to Curriculum'}</span>
          </button>

          <div className='flex gap-4'>
            <button
              onClick={() => navigate(`/content-provider/bulk-upload?courseId=${activeCourseId}&lessonId=${lessonId || ''}&uploadType=resource`)}
              className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:border-purple-200 hover:text-purple-600 transition-all shadow-sm text-xs uppercase tracking-widest"
            >
              <span className="text-lg">🗂️</span> Bulk Resources
            </button>
            <button
              onClick={() => navigate(`/content-provider/bulk-upload?courseId=${activeCourseId}&lessonId=${lessonId || ''}&uploadType=quiz`)}
              className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm text-xs uppercase tracking-widest"
            >
              <span className="text-lg">📝</span> Bulk Quizzes
            </button>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative'>
          <div className="relative z-10">
            <h1 className="text-5xl font-black text-slate-800 font-['Outfit'] mb-3 tracking-tight">
              {lessonId ? 'Refine Lesson' : 'Architect Lesson'}
            </h1>
            <p className='text-slate-500 font-medium max-w-xl'>Craft high-fidelity, modular learning units with synchronous logic and rich media integration.</p>
          </div>
          <div className='flex gap-3 relative z-10'>
            <div className="px-5 py-2.5 bg-teal-50 border border-teal-100 rounded-2xl text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Design Optimized
            </div>
          </div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50/50 rounded-full -z-0 blur-3xl opacity-60" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className='max-w-6xl mx-auto space-y-12 px-6'>
        {/* Main Info Card */}
        <div className='bg-white rounded-[3rem] shadow-sm border border-slate-100 p-12 relative overflow-hidden'>
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32 -z-0" />

          <div className='grid md:grid-cols-2 gap-10 relative z-10'>
            <div className='md:col-span-2 space-y-3'>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lesson Identifier (Title)</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='e.g., The Architecture of Abstract Nouns'
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[1.5rem] text-2xl font-black text-slate-800 transition-all outline-none font-['Outfit'] shadow-inner"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Concept Summary</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Define the core learning objective...'
                rows='3'
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[1.5rem] text-slate-600 font-medium transition-all outline-none resize-none shadow-inner"
              />
            </div>
            <div className='grid grid-cols-1 gap-6'>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Engagement Duration (min)</label>
                <div className="relative">
                  <input
                    type='number'
                    name='duration'
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full pl-8 pr-16 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[1.5rem] text-slate-800 font-black transition-all outline-none shadow-inner"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">Minutes</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Master Video Asset (URL)</label>
                <div className="relative">
                  <input
                    type='text'
                    name='videoUrl'
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder='https://vimeo.com/...'
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[1.5rem] text-slate-800 font-bold transition-all outline-none shadow-inner"
                  />
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🎬</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Guide Builder */}
        <div className='space-y-8'>
          <div className='flex items-center justify-between px-2'>
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4 font-['Outfit']">
              <span className='w-14 h-14 bg-indigo-500 text-white rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/20'>📘</span>
              Curriculum Guide
            </h2>
            <button
              type='button'
              onClick={addLearningGuide}
              className="px-6 py-3 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-100 transition-all flex items-center gap-3 text-xs uppercase tracking-widest"
            >
              <span>+</span> New Guide Module
            </button>
          </div>

          {formData.learningGuides.length === 0 ? (
            <div className='py-24 bg-white/50 border-4 border-dashed border-slate-100 rounded-[3.5rem] flex flex-col items-center justify-center text-center animate-fadeIn'>
              <div className='text-7xl mb-6'>📚</div>
              <h3 className="text-2xl font-black text-slate-800 font-['Outfit']">No Guides Provisioned</h3>
              <p className='text-slate-400 mt-2 max-w-sm font-medium'>Establish theoretical foundations, rules, and logic sheets before student exercises.</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {formData.learningGuides.map((guide, gIdx) => {
                const content = typeof guide.content_json === 'string' ? JSON.parse(guide.content_json || '{}') : (guide.content_json || {});
                return (
                  <div key={gIdx} className='bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden group animate-slideUp relative'>
                    <div className='flex items-center justify-between p-8 bg-slate-50/50 border-b border-slate-100'>
                      <div className='flex items-center gap-6'>
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 font-black text-indigo-500">
                          {gIdx + 1}
                        </div>
                        <div className="space-y-1">
                          <input
                            type='text'
                            value={guide.title}
                            onChange={(e) => updateLearningGuide(gIdx, 'title', e.target.value)}
                            placeholder='Module Title (e.g., The Grammar of Synthesis)'
                            className="bg-transparent border-none p-0 text-xl font-black text-slate-800 focus:ring-0 w-full md:w-[30rem] font-['Outfit'] placeholder:text-slate-300"
                          />
                          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Theoretical Framework</div>
                        </div>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeLearningGuide(gIdx)}
                        className='w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className='p-12 space-y-10'>
                      {/* Overview / Definition */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Conceptual Overview</label>
                        <textarea
                          value={content.overview || formData.conceptual_overview || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateGuideContent(gIdx, 'overview', val);
                            setFormData(prev => ({ ...prev, conceptual_overview: val }));
                          }}
                          placeholder='Formalize the definition and core logic...'
                          rows='4'
                          className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-[1.5rem] text-slate-600 font-medium transition-all outline-none resize-none shadow-inner"
                        />
                      </div>

                      {/* Types Table Builder */}
                      <div className='space-y-6'>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Structural Taxonomy (Types & Examples)</label>
                        <div className='space-y-4'>
                          {(content.types || formData.structural_taxonomy || []).map((t, tIdx) => (
                            <div key={tIdx} className='flex gap-4 group/row animate-fadeIn'>
                              <input
                                type='text'
                                value={t.type}
                                placeholder='Classification'
                                onChange={(e) => {
                                  const newTypes = [...(content.types || formData.structural_taxonomy || [])];
                                  newTypes[tIdx].type = e.target.value;
                                  updateGuideContent(gIdx, 'types', newTypes);
                                  setFormData(prev => ({ ...prev, structural_taxonomy: newTypes }));
                                }}
                                className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-bold focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm"
                              />
                              <input
                                type='text'
                                value={t.example}
                                placeholder='Paradigm Example'
                                onChange={(e) => {
                                  const newTypes = [...(content.types || formData.structural_taxonomy || [])];
                                  newTypes[tIdx].example = e.target.value;
                                  updateGuideContent(gIdx, 'types', newTypes);
                                  setFormData(prev => ({ ...prev, structural_taxonomy: newTypes }));
                                }}
                                className="flex-[2] px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.25rem] text-sm font-medium focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm"
                              />
                              <button
                                type='button'
                                onClick={() => {
                                  const newTypes = (content.types || formData.structural_taxonomy || []).filter((_, i) => i !== tIdx);
                                  updateGuideContent(gIdx, 'types', newTypes);
                                  setFormData(prev => ({ ...prev, structural_taxonomy: newTypes }));
                                }}
                                className='w-12 h-12 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all opacity-40 group-hover/row:opacity-100'
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type='button'
                            onClick={() => {
                              const newTypes = [...(content.types || formData.structural_taxonomy || []), { type: '', example: '' }];
                              updateGuideContent(gIdx, 'types', newTypes);
                              setFormData(prev => ({ ...prev, structural_taxonomy: newTypes }));
                            }}
                            className='w-full py-5 border-2 border-dashed border-slate-100 rounded-[1.5rem] text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/10 transition-all mt-2'
                          >
                            + Append Taxonomic Entity
                          </button>
                        </div>
                      </div>

                      {/* Rules Section Builder */}
                      <div className='space-y-6'>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Logic Rules & Strategic Tips</label>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          {(content.rules || formData.logic_rules || []).map((r, rIdx) => (
                            <div key={rIdx} className='flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 items-start group/rule animate-slideRight'>
                              <div className='w-8 h-8 flex-shrink-0 bg-indigo-500 text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg shadow-indigo-500/20'>
                                {rIdx + 1}
                              </div>
                              <textarea
                                value={r}
                                placeholder='Define a logic gate or rule...'
                                rows='2'
                                onChange={(e) => {
                                  const newRules = [...(content.rules || formData.logic_rules || [])];
                                  newRules[rIdx] = e.target.value;
                                  updateGuideContent(gIdx, 'rules', newRules);
                                  setFormData(prev => ({ ...prev, logic_rules: newRules }));
                                }}
                                className='flex-1 bg-transparent border-none p-0 text-sm font-medium text-slate-600 focus:ring-0 resize-none'
                              />
                              <button
                                type='button'
                                onClick={() => {
                                  const newRules = (content.rules || formData.logic_rules || []).filter((_, i) => i !== rIdx);
                                  updateGuideContent(gIdx, 'rules', newRules);
                                  setFormData(prev => ({ ...prev, logic_rules: newRules }));
                                }}
                                className='w-6 h-6 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover/rule:opacity-100'
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type='button'
                            onClick={() => {
                              const newRules = [...(content.rules || formData.logic_rules || []), ''];
                              updateGuideContent(gIdx, 'rules', newRules);
                              setFormData(prev => ({ ...prev, logic_rules: newRules }));
                            }}
                            className='py-8 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-500 hover:bg-indigo-50/10 transition-all'
                          >
                            + Provision Rule
                          </button>
                        </div>
                      </div>

                      {/* File Upload URLs */}
                      <div className='grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-50'>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Visual Asset (Infographic URL)</label>
                          <div className='relative'>
                            <span className='absolute left-6 top-1/2 -translate-y-1/2 text-xl'>🖼️</span>
                            <input
                              type='text'
                              value={guide.image_url || ''}
                              onChange={(e) => updateLearningGuide(gIdx, 'image_url', e.target.value)}
                              placeholder='https://assets.cdn/image.png'
                              className='w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:border-indigo-500 focus:bg-white outline-none transition-all'
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Document Asset (PDF Master URL)</label>
                          <div className='relative'>
                            <span className='absolute left-6 top-1/2 -translate-y-1/2 text-xl'>📄</span>
                            <input
                              type='text'
                              value={guide.pdf_url || ''}
                              onChange={(e) => updateLearningGuide(gIdx, 'pdf_url', e.target.value)}
                              placeholder='https://assets.cdn/guide.pdf'
                              className='w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:border-indigo-500 focus:bg-white outline-none transition-all'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Sections Builder */}
        <div className='space-y-8'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 px-2'>
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4 font-['Outfit']">
              <span className='w-14 h-14 bg-teal-500 text-white rounded-[1.25rem] flex items-center justify-center text-2xl shadow-xl shadow-teal-500/20'>🛠️</span>
              Architectural Flow
            </h2>
            <div className='flex gap-3 overflow-x-auto pb-4 scrollbar-hide'>
              {sectionTypes.map(s => (
                <button
                  key={s.id}
                  type='button'
                  onClick={() => {
                    if (s.id === 'vocabulary') {
                      setFormData(prev => ({
                        ...prev,
                        sections: [...prev.sections, {
                          title: 'Vocabulary: Learn new words',
                          content: '[]', // JSON string for words 
                          section_type: 'vocabulary',
                          order_index: prev.sections.length
                        }]
                      }))
                    } else {
                      addSection(s.id)
                    }
                  }}
                  className='flex-shrink-0 px-5 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-500 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm flex items-center gap-2 uppercase tracking-widest'
                >
                  <span className="text-lg">{s.icon}</span> <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {formData.sections.length === 0 ? (
            <div className='py-28 bg-white/50 border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center justify-center text-center animate-fadeIn'>
              <div className='text-8xl mb-6 opacity-40'>🌊</div>
              <h3 className="text-2xl font-black text-slate-800 font-['Outfit']">Flow Latent</h3>
              <p className='text-slate-400 mt-2 max-w-sm font-medium'>Deploy modular sections to construct the lesson's behavioral logic.</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {formData.sections.map((section, idx) => {
                const sInfo = sectionTypes.find(st => st.id === section.section_type) || sectionTypes[0]
                return (
                  <div key={idx} className='bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden group animate-slideUp relative'>
                    <div className='flex items-center justify-between p-8 bg-slate-50/50 border-b border-slate-100'>
                      <div className='flex items-center gap-6'>
                        <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center text-3xl shadow-sm bg-white text-${sInfo.color}-500 border border-slate-100 transition-transform group-hover:scale-110 duration-500`}>
                          {sInfo.icon}
                        </div>
                        <div className="space-y-1">
                          <input
                            type='text'
                            value={section.title}
                            onChange={(e) => updateSection(idx, 'title', e.target.value)}
                            className="bg-transparent border-none p-0 text-xl font-black text-slate-800 focus:ring-0 w-full md:w-[30rem] font-['Outfit']"
                          />
                          <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>{sInfo.label} SEGMENT</p>
                        </div>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeSection(idx)}
                        className='w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className='p-10'>
                      {section.section_type === 'writing' || section.section_type === 'writing_exercise' || section.section_type === 'reading' || section.section_type === 'reading_exercise' ? (
                        <div className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Exercise Taxonomy (Title)</label>
                              <input
                                type="text"
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-bold shadow-inner focus:border-teal-500 transition-all outline-none"
                                placeholder="e.g., Narrative Synthesis II"
                                value={(() => {
                                  try {
                                    let c = JSON.parse(section.content);
                                    if (typeof c === 'string') c = JSON.parse(c);
                                    return c.title || '';
                                  } catch (e) { return '' }
                                })()}
                                onChange={(e) => {
                                  let current = {};
                                  try {
                                    current = JSON.parse(section.content);
                                    if (typeof current === 'string') current = JSON.parse(current);
                                  } catch (e) { }
                                  updateSection(idx, 'content', JSON.stringify({ ...current, title: e.target.value }))
                                }}
                              />
                            </div>
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Conceptual Prompt</label>
                              <input
                                type="text"
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-medium shadow-inner focus:border-teal-500 transition-all outline-none"
                                placeholder="Analyze the following corpus..."
                                value={(() => {
                                  try {
                                    let c = JSON.parse(section.content);
                                    if (typeof c === 'string') c = JSON.parse(c);
                                    return c.prompt || '';
                                  } catch (e) { return '' }
                                })()}
                                onChange={(e) => {
                                  let current = {};
                                  try {
                                    current = JSON.parse(section.content);
                                    if (typeof current === 'string') current = JSON.parse(current);
                                  } catch (e) { }
                                  updateSection(idx, 'content', JSON.stringify({ ...current, prompt: e.target.value }))
                                }}
                              />
                            </div>
                          </div>

                          {(section.section_type === 'reading' || section.section_type === 'reading_exercise') && (
                            <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Textual Corpus (Passage)</label>
                              <textarea
                                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium shadow-inner focus:border-teal-500 transition-all outline-none min-h-[200px] resize-none leading-relaxed"
                                placeholder="Embed the passage here..."
                                value={(() => {
                                  try {
                                    let c = JSON.parse(section.content);
                                    if (typeof c === 'string') c = JSON.parse(c);
                                    return c.passage || '';
                                  } catch (e) { return '' }
                                })()}
                                onChange={(e) => {
                                  let current = {};
                                  try {
                                    current = JSON.parse(section.content);
                                    if (typeof current === 'string') current = JSON.parse(current);
                                  } catch (e) { }
                                  updateSection(idx, 'content', JSON.stringify({ ...current, passage: e.target.value }))
                                }}
                              />
                            </div>
                          )}

                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Model Resolution (Sample Answer)</label>
                            <textarea
                              className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium shadow-inner focus:border-teal-500 transition-all outline-none min-h-[140px] resize-none leading-relaxed italic"
                              placeholder="Define the benchmark response..."
                              value={(() => {
                                try {
                                  let c = JSON.parse(section.content);
                                  if (typeof c === 'string') c = JSON.parse(c);
                                  return c.sample_answer || '';
                                } catch (e) { return '' }
                              })()}
                              onChange={(e) => {
                                let current = {};
                                try {
                                  current = JSON.parse(section.content);
                                  if (typeof current === 'string') current = JSON.parse(current);
                                } catch (e) { }
                                updateSection(idx, 'content', JSON.stringify({ ...current, sample_answer: e.target.value }))
                              }}
                            />
                          </div>
                        </div>
                      ) : section.section_type === 'vocabulary' ? (
                        <div className="space-y-8 animate-fadeIn">
                          {/* Vocabulary Toolbar */}
                          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100'>
                            <div className='flex items-center gap-4'>
                              <div className='w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20'>📊</div>
                              <div>
                                <div className='font-black text-slate-800 font-["Outfit"]'>Lexical Inventory</div>
                                <div className='text-[10px] text-emerald-600 font-black uppercase tracking-widest'>Bulk & Manual Entry</div>
                              </div>
                            </div>
                            <div className='flex items-center gap-3'>
                              <a
                                href={`${apiClient.defaults.baseURL}/content-provider/template?type=vocabulary`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='px-6 py-3 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-sm'
                              >
                                📥 Download Template
                              </a>
                              <label className='px-6 py-3 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer'>
                                📤 Upload Excel
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".xlsx, .xls, .csv"
                                  onChange={(e) => handleVocabExcelUpload(idx, e.target.files[0])}
                                />
                              </label>
                            </div>
                          </div>

                          {/* Vocabulary Words Table / List */}
                          <div className='space-y-4'>
                            {(() => {
                              try {
                                const words = JSON.parse(section.content || '[]');
                                if (words.length === 0) return (
                                  <div className='py-12 text-center border-2 border-dashed border-slate-100 rounded-[2rem]'>
                                    <div className='text-4xl mb-4'>🔡</div>
                                    <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>No lexical entries initialized.</p>
                                  </div>
                                );
                                return (
                                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    {words.map((w, wIdx) => (
                                      <div key={wIdx} className='group bg-white p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all shadow-sm flex items-start gap-4'>
                                        <div className='w-10 h-10 bg-slate-50 text-emerald-500 rounded-xl flex items-center justify-center font-black text-xs'>{wIdx + 1}</div>
                                        <div className='flex-1 min-w-0'>
                                          <div className='flex items-center gap-2 mb-1'>
                                            <span className='font-black text-slate-800 text-sm'>{w.word}</span>
                                            <span className='px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[8px] font-black uppercase tracking-tighter'>{w.part_of_speech}</span>
                                          </div>
                                          <div className='text-[10px] text-slate-500 line-clamp-2 italic'>"{w.definition}"</div>
                                        </div>
                                        <button
                                          onClick={() => {
                                            const newWords = words.filter((_, i) => i !== wIdx);
                                            updateSection(idx, 'content', JSON.stringify(newWords));
                                          }}
                                          className='text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100'
                                        >✕</button>
                                      </div>
                                    ))}
                                  </div>
                                );
                              } catch (e) { return null; }
                            })()}
                          </div>

                          {/* Manual Add Form */}
                          <div className='p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6'>
                            <div className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Provision Single Entity</div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                              <input
                                type="text"
                                placeholder="Word (e.g., Ephemeral)"
                                id={`v-word-${idx}`}
                                className='px-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm focus:border-emerald-500 outline-none transition-all'
                              />
                              <select
                                id={`v-pos-${idx}`}
                                className='px-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm focus:border-emerald-500 outline-none transition-all'
                              >
                                <option value="noun">Noun</option>
                                <option value="verb">Verb</option>
                                <option value="adjective">Adjective</option>
                                <option value="adverb">Adverb</option>
                                <option value="pronoun">Pronoun</option>
                                <option value="preposition">Preposition</option>
                                <option value="conjunction">Conjunction</option>
                                <option value="interjection">Interjection</option>
                              </select>
                              <select
                                id={`v-diff-${idx}`}
                                className='px-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm focus:border-emerald-500 outline-none transition-all'
                              >
                                <option value="A1">CEFR A1 (Beginner)</option>
                                <option value="A2">CEFR A2 (Elementary)</option>
                                <option value="B1">CEFR B1 (Intermediate)</option>
                                <option value="B2">CEFR B2 (Upper Intermediate)</option>
                                <option value="C1">CEFR C1 (Advanced)</option>
                                <option value="C2">CEFR C2 (Proficiency)</option>
                              </select>
                            </div>
                            <textarea
                              placeholder="Precise semantic definition..."
                              id={`v-def-${idx}`}
                              className='w-full px-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm focus:border-emerald-500 outline-none transition-all h-24 resize-none'
                            />
                            <textarea
                              placeholder="Illustrative contextual sentence..."
                              id={`v-ex-${idx}`}
                              className='w-full px-6 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm focus:border-emerald-500 outline-none transition-all h-24 resize-none italic'
                            />
                            <button
                              type='button'
                              onClick={() => {
                                const word = document.getElementById(`v-word-${idx}`).value;
                                const pos = document.getElementById(`v-pos-${idx}`).value;
                                const diff = document.getElementById(`v-diff-${idx}`).value;
                                const def = document.getElementById(`v-def-${idx}`).value;
                                const ex = document.getElementById(`v-ex-${idx}`).value;
                                if (!word || !def) return alert('Word and Definition required');

                                const currentWords = JSON.parse(formData.sections[idx].content || '[]');
                                const newWords = [...currentWords, { word, part_of_speech: pos, difficulty_level: diff, definition: def, example_sentence: ex }];
                                updateSection(idx, 'content', JSON.stringify(newWords));

                                // Reset inputs
                                document.getElementById(`v-word-${idx}`).value = '';
                                document.getElementById(`v-def-${idx}`).value = '';
                                document.getElementById(`v-ex-${idx}`).value = '';
                              }}
                              className='w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20'
                            >
                              + Integrate Vocabulary Word
                            </button>
                          </div>
                        </div>
                      ) : (
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSection(idx, 'content', e.target.value)}
                          placeholder={
                            section.section_type === 'video' ? 'Paste Video Link or embed code here...' :
                              section.section_type === 'resource' ? 'Add download link or description...' :
                                `Synthesize ${section.section_type} logic... Markdown enabled.`
                          }
                          rows='8'
                          className="w-full px-10 py-8 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[2rem] text-slate-700 transition-all outline-none font-mono text-sm leading-relaxed shadow-inner"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* --- DYNAMIC QUIZZES & RESOURCES LIST --- */}
        {(formData.quizzes.length > 0 || formData.resources.length > 0) && (
          <div className='mb-16 space-y-10 animate-fadeIn'>
            <h3 className="text-3xl font-black text-slate-800 flex items-center gap-4 font-['Outfit']">
              <span className='w-14 h-14 bg-teal-100 text-teal-600 rounded-[1.25rem] flex items-center justify-center text-2xl shadow-sm'>📦</span>
              Associated Asset Pipeline
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              {/* Quizzes Column */}
              <div className='space-y-6'>
                <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest px-6'>Assessment Entities</h4>
                {formData.quizzes.length === 0 && <p className='text-xs text-slate-400 italic px-6 font-medium'>No assessment vectors deployed.</p>}
                {formData.quizzes.map((q) => (
                  <div key={q.id} className="space-y-4">
                    <div className='group bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center justify-between hover:border-indigo-200 transition-all shadow-sm relative overflow-hidden'>
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className='flex items-center gap-6'>
                        <div className='w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.25rem] flex items-center justify-center font-black text-xl shadow-inner'>Q</div>
                        <div>
                          <div className="font-black text-slate-800 text-base font-['Outfit'] mb-1">{q.title}</div>
                          <div className='text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]'>{q.questions?.length || 0} Dynamic Questions</div>
                        </div>
                      </div>
                      <div className='flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0 duration-300'>
                        <button
                          onClick={() => navigate(`/content-provider/quizzes/edit/${q.id}`)}
                          className='w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition flex items-center justify-center shadow-sm' title="Refine Quiz"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(q.id)}
                          className='w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition flex items-center justify-center shadow-sm' title="Expunge Quiz"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Nested Questions Preview */}
                    {q.questions && q.questions.length > 0 && (
                      <div className='ml-12 space-y-3 border-l-2 border-slate-100 pl-8 py-3'>
                        {q.questions.slice(0, 3).map((quest) => (
                          <div key={quest.id} className='group/q flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 hover:border-indigo-100 hover:shadow-sm transition-all'>
                            <span className='text-xs text-slate-500 font-semibold truncate max-w-[240px]'>
                              <span className='text-indigo-500 font-black mr-3'>LOGIC:</span> {quest.text || quest.question}
                            </span>
                            <button
                              onClick={() => handleDeleteQuestion(quest.id, q.id)}
                              className='opacity-0 group-hover/q:opacity-100 text-[10px] text-rose-400 hover:text-rose-600 font-black uppercase tracking-widest transition-all px-3'
                            >
                              Revoke
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Resources Column */}
              <div className='space-y-6'>
                <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest px-6'>Supplemental Corpus</h4>
                {formData.resources.length === 0 && <p className='text-xs text-slate-400 italic px-6 font-medium'>No supplemental linkages.</p>}
                {formData.resources.map((r) => (
                  <div key={r.id} className='group bg-white border border-slate-100 p-8 rounded-[2rem] flex items-center justify-between hover:border-teal-200 transition-all shadow-sm relative overflow-hidden'>
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className='flex items-center gap-6'>
                      <div className='w-14 h-14 bg-teal-50 text-teal-600 rounded-[1.25rem] flex items-center justify-center text-2xl shadow-inner'>🔗</div>
                      <div className='overflow-hidden'>
                        <div className="font-black text-slate-800 text-base font-['Outfit'] mb-1 truncate max-w-[200px]">{r.title}</div>
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className='text-[10px] text-teal-500 hover:text-teal-700 font-black tracking-tight transition truncate block max-w-[200px]'>{r.url}</a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteResource(r.id)}
                      className='w-12 h-12 bg-slate-50 text-slate-300 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 duration-300'
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Pipeline Hint */}
        <div className='bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm'>
          <div className='flex items-center gap-8 text-center md:text-left'>
            <div className='text-6xl animate-bounce-slow'>🎯</div>
            <div>
              <h4 className="font-black text-indigo-950 text-xl font-['Outfit'] mb-1">Interactive Diagnostic Layer</h4>
              <p className='text-sm text-indigo-700 font-medium max-w-sm'>Synchronous quizzes facilitate behavioral data collection. Provision them post-save or via bulk ingestion.</p>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
            <button
              type='button'
              onClick={handleQuizRedirect}
              className='px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-xs uppercase tracking-widest border border-indigo-50'
            >
              Architect Quiz 📋
            </button>
            <button
              type='button'
              onClick={() => navigate(`/content-provider/bulk-upload?courseId=${activeCourseId}&lessonId=${lessonId || ''}&uploadType=quiz`)}
              className='px-8 py-4 bg-rose-500 text-white font-black rounded-2xl shadow-xl shadow-rose-500/20 hover:bg-rose-600 hover:-translate-y-1 transition-all text-xs uppercase tracking-widest'
            >
              Rapid Ingestion 🚀
            </button>
          </div>
        </div>

        {/* Final Execution Bar */}
        <div className='pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 pb-16'>
          <div className="flex items-center gap-6">
            <button
              type='button'
              onClick={handleQuizRedirect}
              disabled={loading}
              className="flex items-center gap-4 px-10 py-6 bg-slate-800 text-white font-black rounded-[1.5rem] hover:bg-black transition-all shadow-2xl shadow-slate-900/40 text-xs uppercase tracking-[0.2em] disabled:opacity-50 group"
            >
              <span className="text-xl group-hover:rotate-12 transition-transform">📝</span>
              Ingest Assessment
            </button>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Automation Guard</p>
              <p className="text-[10px] font-medium text-slate-300 leading-tight max-w-[12rem]">State persistence guaranteed before architectural branching.</p>
            </div>
          </div>

          <div className='flex items-center gap-10'>
            <button
              type='button'
              onClick={() => navigate(`/content-provider/courses/${activeCourseId}/lessons`)}
              className='text-slate-400 hover:text-rose-500 font-black text-xs uppercase tracking-[0.2em] transition-all'
            >
              Abort Logic
            </button>
            <button
              type='submit'
              disabled={loading}
              className="px-16 py-6 bg-teal-500 text-white font-black rounded-[1.5rem] hover:bg-teal-600 transition-all shadow-2xl shadow-teal-500/40 text-sm uppercase tracking-[0.3em] transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Synthesizing...' : lessonId ? 'Commit Updates' : 'Deploy Architect'}
            </button>
          </div>
        </div>

        {/* System Diagnostics */}
        <div className="fixed bottom-12 right-12 z-[100] flex flex-col gap-4">
          {error && (
            <div className='px-10 py-6 bg-rose-500 text-white font-black rounded-[1.25rem] shadow-2xl shadow-rose-500/50 animate-slideUp flex items-center gap-5 border border-rose-400/20'>
              <span className="text-2xl">⚠️</span>
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase tracking-widest opacity-80">Logic Exception</div>
                <div className="text-xs font-bold leading-tight">{error}</div>
              </div>
            </div>
          )}
          {success && (
            <div className='px-10 py-6 bg-teal-500 text-white font-black rounded-[1.25rem] shadow-2xl shadow-teal-500/50 animate-slideUp flex items-center gap-5 border border-teal-400/20'>
              <span className="text-2xl">✨</span>
              <div className="space-y-0.5">
                <div className="text-[10px] uppercase tracking-widest opacity-80">System Success</div>
                <div className="text-xs font-bold leading-tight">{success}</div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
