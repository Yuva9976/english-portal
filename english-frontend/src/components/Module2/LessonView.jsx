import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { marked } from 'marked';
import { 
  Book, Video, PenTool, BookOpen, Layers, CheckCircle, Info, 
  Download, ArrowLeft, ArrowUp, Zap, HelpCircle, FileText 
} from 'lucide-react';
import QuizMCQ from './QuizMCQ';
import AudioQuiz from './AudioQuiz';
import SpeakingQuiz from './SpeakingQuiz';
import ReadingQuiz from './ReadingQuiz';
import WritingQuiz from './WritingQuiz';
import apiClient from '../../apiClient';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

export default function LessonView() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiClient.get(`/module2/lessons/${slug}`)
      .then((response) => {
        if (response.data) {
          setLesson(response.data);
        } else {
          setError('Communication breach: Lesson data corrupted or missing.');
        }
      })
      .catch((err) => {
        console.error('Failed to load lesson', err);
        setError('Connection failure: Unable to synchronize with the learning matrix.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Load quiz data when quiz is shown
  useEffect(() => {
    if (showQuiz && !quizData && lesson?.id) {
      apiClient.get(`/quizzes/lesson/${lesson.id}`)
        .then((response) => {
          if (response.data.quizzes && response.data.quizzes.length > 0) {
            setQuizData(response.data.quizzes[0]);
          } else {
            setQuizData({ quiz_type: 'none' });
          }
        })
        .catch((err) => {
          console.error('Failed to load quiz', err);
          setQuizData({ quiz_type: 'none' });
        });
    }
  }, [showQuiz, lesson?.id, quizData]);

  // Auto-effects
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('practice') === '1') {
      setShowQuiz(true);
    }

    const guideId = params.get('guideId');
    if (guideId && !loading && lesson) {
      setTimeout(() => {
        const element = document.getElementById(`guide-${guideId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [location.search, lesson, loading]);

  const htmlContent = useMemo(() => {
    if (!lesson?.content) return '';
    try {
      return marked.parse(lesson.content);
    } catch (err) {
      return lesson.content;
    }
  }, [lesson?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Learning Matrix...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center border border-rose-100">
          <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">⚠️</div>
          <h2 className="text-2xl font-black text-slate-800 font-['Outfit'] mb-4 uppercase tracking-tight">System Access Error</h2>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed italic">
            "{error || 'The requested module coordinate does not exist in our repository.'}"
          </p>
          <button 
            onClick={() => navigate('/modules/learn-english')}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#0D9488] transition-all shadow-xl active:scale-95"
          >
            Return to Command Center
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-200 py-8 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <button
                onClick={() => navigate('/modules/learn-english')}
                className="flex items-center text-slate-400 hover:text-[#0D9488] transition-all text-[10px] font-black uppercase tracking-widest group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Repository
              </button>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-teal-50 text-[#0D9488] text-[9px] font-black uppercase tracking-[0.1em] rounded-lg border border-teal-100 animate-pulse">
                  Operational Matrix
                </span>
                <span className="text-slate-300 font-light">|</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lesson.duration || 'Session-Based'}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter font-['Outfit'] uppercase leading-none">
                {lesson.title || lesson.slug}
              </h1>
            </div>
            {!showQuiz && (
              <button
                onClick={() => setShowQuiz(true)}
                className="px-8 py-4 bg-[#0D9488] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <Zap className="w-4 h-4" />
                Initiate Assessment
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="space-y-16 mb-20">
          
          {/* Conceptual Core (New) */}
          {(lesson.conceptual_overview || lesson.structural_taxonomy?.length > 0 || lesson.logic_rules?.length > 0) && (
            <div className="space-y-10 animate-slideUp">
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] flex items-center gap-6">
                Conceptual Logic Matrix
                <span className="flex-1 h-px bg-slate-200/60"></span>
              </h2>

              <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                <div className="p-1 md:p-10 space-y-12">
                  {/* Overview */}
                  {lesson.conceptual_overview && (
                    <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100/50 relative group">
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-xl">💡</div>
                      <p className="text-slate-600 font-medium leading-relaxed italic text-base">"{lesson.conceptual_overview}"</p>
                    </div>
                  )}

                  {/* Taxonomy Grid */}
                  {lesson.structural_taxonomy && lesson.structural_taxonomy.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Layers className="w-5 h-5 text-[#0D9488]" />
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Structural Taxonomy</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lesson.structural_taxonomy.map((node, nIdx) => (
                          <div key={nIdx} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <span className="text-[9px] font-black text-[#0D9488] bg-teal-50 px-3 py-1 rounded-lg uppercase tracking-widest block w-fit mb-4">Class: {node.type}</span>
                            <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-teal-900 transition-colors uppercase tracking-tight">{node.example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Logic Rules List */}
                  {lesson.logic_rules && lesson.logic_rules.length > 0 && (
                    <div className="pt-8 border-t border-slate-50">
                      <div className="flex items-center gap-3 mb-8">
                        <CheckCircle className="w-5 h-5 text-indigo-500" />
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Logic Protocols</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {lesson.logic_rules.map((rule, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-4 p-5 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl group hover:bg-white hover:shadow-lg transition-all">
                            <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-xs font-black flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                              {rIdx + 1}
                            </div>
                            <p className="text-xs font-bold text-slate-700 leading-relaxed pt-1">{rule}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sections Loader */}
          {lesson.LessonSections && lesson.LessonSections.length > 0 && (
            <div className="space-y-12">
              {lesson.LessonSections.sort((a, b) => a.order_index - b.order_index).map((section, idx) => {
                const sType = section.section_type;
                const IconComp = {
                  overview: Info,
                  video: Video,
                  reading: Book,
                  writing: PenTool,
                  resource: FileText,
                  vocabulary: BookOpen
                }[sType] || FileText;

                return (
                  <div key={section.id} className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden animate-slideUp">
                    <div className="px-10 py-7 bg-slate-50/40 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#0D9488]">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight font-['Outfit']">{section.title}</h3>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Section Node 0{idx + 1}</span>
                    </div>

                    <div className="p-10">
                      {sType === 'video' ? (
                        <div className="aspect-video w-full bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                          {section.content.includes('http') ? (
                            <iframe 
                              src={section.content.replace('watch?v=', 'embed/')} 
                              className="w-full h-full" 
                              allowFullScreen 
                              title={section.title} 
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 font-black text-[10px] uppercase tracking-widest">Media Buffer Missing</div>
                          )}
                        </div>
                      ) : (
                        <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium prose-p:italic prose-headings:font-black prose-headings:tracking-tighter">
                          {(() => {
                            try {
                              if ((section.content.trim().startsWith('{') || section.content.trim().startsWith('[')) && ['reading', 'writing', 'vocabulary'].includes(sType)) {
                                const parsed = JSON.parse(section.content);
                                
                                if (sType === 'vocabulary' && Array.isArray(parsed)) {
                                  return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
                                      {parsed.map((v, vIdx) => (
                                        <div key={vIdx} className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-teal-200 transition-colors">
                                          <p className="text-lg font-black text-slate-800 uppercase tracking-tight">{v.word}</p>
                                          <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest mt-1 mb-3">{v.part_of_speech}</p>
                                          <p className="text-[11px] font-semibold text-slate-500 italic opacity-80 leading-snug">"{v.definition}"</p>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }

                                if (typeof parsed === 'object' && parsed !== null) {
                                  return (
                                    <div className="space-y-8 not-prose">
                                      {parsed.passage && (
                                        <div className="bg-amber-50/40 p-8 rounded-[2.5rem] border border-amber-100">
                                          <div className="flex items-center gap-3 mb-6">
                                            <BookOpen className="w-5 h-5 text-amber-600" />
                                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Textual Corpus</span>
                                          </div>
                                          <div className="text-slate-700 font-medium leading-relaxed italic" dangerouslySetInnerHTML={{ __html: marked.parse(parsed.passage) }} />
                                        </div>
                                      )}
                                      {(parsed.prompt || parsed.writing_prompt) && (
                                        <div className="bg-rose-50/40 p-8 rounded-[2.5rem] border border-rose-100">
                                          <div className="flex items-center gap-3 mb-6">
                                            <PenTool className="w-5 h-5 text-rose-600" />
                                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Functional Prompt</span>
                                          </div>
                                          <div className="text-slate-700 font-bold leading-relaxed" dangerouslySetInnerHTML={{ __html: marked.parse(parsed.prompt || parsed.writing_prompt) }} />
                                        </div>
                                      )}
                                      {(parsed.sample_answer || parsed.model_answer) && (
                                        <div className="bg-emerald-50/40 p-8 rounded-[2.5rem] border border-emerald-100 shadow-inner">
                                          <div className="flex items-center gap-3 mb-6">
                                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Strategic Resolution</span>
                                          </div>
                                          <div className="text-slate-600 font-medium italic border-l-4 border-emerald-400 pl-6" dangerouslySetInnerHTML={{ __html: marked.parse(parsed.sample_answer || parsed.model_answer) }} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              }
                              return <div dangerouslySetInnerHTML={{ __html: marked.parse(section.content) }} />;
                            } catch (e) {
                              return <div dangerouslySetInnerHTML={{ __html: marked.parse(section.content) }} />;
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Assessment Protocol Section */}
          <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 p-12 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/10 transition-colors duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-3 h-3 rounded-full bg-teal-500 animate-ping"></span>
                    <span className="text-[11px] font-black text-teal-600 uppercase tracking-[0.3em]">Knowledge Verification Ready</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 font-['Outfit'] lowercase tracking-tighter">Initiate Practice Simulation</h2>
                  <p className="text-slate-400 font-semibold text-xs leading-relaxed mt-2 max-w-lg">Execute the interactive assessment module to verify conceptual retention and linguistic accuracy within this module's parameters.</p>
                </div>
                {!showQuiz && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#0D9488] transition-all transform hover:scale-105 shadow-xl shadow-slate-900/20 flex items-center gap-4 group/btn"
                  >
                    Activate Matrix ⚡
                  </button>
                )}
              </div>

              {showQuiz ? (
                <div className="animate-fadeIn">
                  {quizData ? (
                    quizData.quiz_type === 'audio' ? <AudioQuiz quiz={quizData} /> :
                    quizData.quiz_type === 'speaking' ? <SpeakingQuiz quiz={quizData} /> :
                    quizData.quiz_type === 'reading' ? <ReadingQuiz quiz={quizData} /> :
                    quizData.quiz_type === 'writing' ? <WritingQuiz quiz={quizData} /> :
                    <QuizMCQ lessonId={lesson.slug} />
                  ) : (
                    <div className="py-20 flex flex-col items-center animate-pulse">
                      <div className="w-14 h-14 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                      <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Synchronizing Assessment Node...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 py-16 flex flex-col items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Simulation Offline</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Footer Navigation */}
        <div className="flex justify-between items-center px-4 pt-10 border-t border-slate-100">
          <button
            onClick={() => navigate('/modules/learn-english')}
            className="flex items-center text-slate-400 hover:text-slate-900 transition-all font-black uppercase text-[10px] tracking-widest gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Repository Channel
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-slate-300 hover:text-[#0D9488] transition-all font-black uppercase text-[10px] tracking-widest group"
          >
            Upstream Matrix
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
