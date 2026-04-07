import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { marked } from 'marked';
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
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    apiClient.get(`/module2/lessons/${slug}`)
      .then((response) => setLesson(response.data))
      .catch((err) => console.error('Failed to load lesson', err));
  }, [slug]);

  // Load quiz data when quiz is shown
  useEffect(() => {
    if (showQuiz && !quizData) {
      apiClient.get(`/module2/quizzes?lesson=${slug}`)
        .then((response) => {
          if (response.data.quizzes && response.data.quizzes.length > 0) {
            setQuizData(response.data.quizzes[0]);
          }
        })
        .catch((err) => console.error('Failed to load quiz', err));
    }
  }, [showQuiz, slug, quizData]);

  // Auto-open quiz when ?practice=1 query param is present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('practice') === '1') {
      setShowQuiz(true);
    }
  }, [location.search]);

  // Parse markdown to HTML
  const htmlContent = useMemo(() => {
    if (!lesson?.content) return '';
    try {
      return marked.parse(lesson.content);
    } catch (err) {
      console.error('Markdown parse error:', err);
      return lesson.content;
    }
  }, [lesson?.content]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            onClick={() => navigate('/modules/learn-english')}
            className="flex items-center text-slate-400 hover:text-[#0D9488] mb-4 transition-colors text-xs font-black uppercase tracking-widest"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Module Repository
          </button>
          <div className="flex items-center gap-4 mb-2">
            <span className="px-2 py-0.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase tracking-widest rounded border border-teal-100">
              Interactive Curriculum
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter font-['Outfit'] uppercase">
            {lesson.title || lesson.slug}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="space-y-12 mb-12">
          {/* Loop through structured sections if they exist */}
          {lesson.LessonSections && lesson.LessonSections.length > 0 ? (
            lesson.LessonSections.sort((a, b) => a.order_index - b.order_index).map((section, idx) => {
              const sInfo = {
                overview: { icon: '📖', color: 'teal' },
                video: { icon: '🎥', color: 'blue' },
                writing: { icon: '✍️', color: 'rose' },
                reading: { icon: '📚', color: 'amber' },
                resource: { icon: '🎭', color: 'purple' }
              }[section.section_type] || { icon: '📝', color: 'slate' }

              return (
                <div key={idx} className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden animate-slideUp">
                  <div className="px-10 py-6 bg-slate-50/30 border-b border-slate-100 flex items-center gap-4">
                    <span className="text-2xl">{sInfo.icon}</span>
                    <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight font-['Outfit']">{section.title}</h2>
                  </div>
                  <div className="p-10">
                    {section.section_type === 'video' ? (
                      <div className="aspect-video w-full bg-slate-50 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-200 flex items-center justify-center p-1">
                        {section.content.includes('http') ? (
                          <iframe
                            src={section.content.replace('watch?v=', 'embed/')}
                            className="w-full h-full rounded-2xl"
                            allowFullScreen
                            title={section.title}
                          />
                        ) : (
                          <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Repository Missing Visual Media Data</div>
                        )}
                      </div>
                    ) : section.section_type === 'resource' ? (
                      <div className="bg-gradient-to-br from-teal-50 to-blue-50/30 p-8 rounded-3xl border border-teal-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-3xl">📄</div>
                          <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm">{section.title}</h4>
                            <p className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Supplemental Documentation</p>
                          </div>
                        </div>
                        <a
                          href={section.content}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-white text-slate-800 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-md active:scale-95"
                        >
                          Access File
                        </a>
                      </div>
                    ) : (
                      <div
                        className="prose prose-sm max-w-none 
                                   prose-headings:text-slate-800 
                                   prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium italic"
                        dangerouslySetInnerHTML={{ __html: marked.parse(section.content || '') }}
                      />
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
              <div
                className="prose prose-sm max-w-none 
                           prose-headings:text-slate-800 
                           prose-p:text-slate-500 prose-p:leading-relaxed prose-p:font-medium"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          )}
        </div>

        {/* Practice Section */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-pulse"></span>
                <span className="text-[10px] font-black text-[#F43F5E] uppercase tracking-widest">Operational Assessment</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800 font-['Outfit'] uppercase tracking-tighter">Practice Logic</h2>
              <p className="text-slate-500 font-semibold text-[11px] leading-relaxed mt-1 border-l-2 border-slate-100 pl-3">Verify your linguistic acquisition through thematic diagnostics.</p>
            </div>
            {!showQuiz && (
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-teal-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
              >
                Initiate Assessment 🎯
              </button>
            )}
          </div>

          {showQuiz ? (
            quizData ? (
              // Route to appropriate quiz component based on quiz type
              <div className="animate-fadeIn">
                {quizData.quiz_type === 'audio' ? (
                  <AudioQuiz quiz={quizData} />
                ) : quizData.quiz_type === 'speaking' ? (
                  <SpeakingQuiz quiz={quizData} />
                ) : quizData.quiz_type === 'reading' ? (
                  <ReadingQuiz quiz={quizData} />
                ) : quizData.quiz_type === 'writing' ? (
                  <WritingQuiz quiz={quizData} />
                ) : (
                  <QuizMCQ lessonId={lesson.slug} />
                )}
              </div>
            ) : (
              <div className="text-center py-20 flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Synchronizing Quiz Matrix...</p>
              </div>
            )
          ) : (
            <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="text-5xl mb-6 opacity-30">🚀</div>
              <p className="text-slate-600 font-black uppercase tracking-widest text-[10px] mb-2">
                Deployment Ready
              </p>
              <p className="text-slate-400 font-medium italic text-xs">
                Activate the assessment protocol to commit this module to memory.
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center px-4">
          <button
            onClick={() => navigate('/modules/learn-english')}
            className="flex items-center text-slate-400 hover:text-[#0D9488] font-black uppercase text-[10px] tracking-widest transition-colors"
          >
            ← Previous Channel
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-slate-300 hover:text-slate-500 font-black uppercase text-[10px] tracking-widest transition-colors"
          >
            Upstream
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
