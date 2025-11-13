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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            onClick={() => navigate('/modules/learn-english')}
            className="flex items-center text-white hover:text-gray-200 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Lessons
          </button>
          <h1 className="text-4xl font-bold mb-2">{lesson.title || lesson.slug}</h1>
          <p className="text-teal-100">Interactive lesson with exercises</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Lesson Content */}
          <div
            className="prose prose-lg max-w-none 
                       prose-headings:text-teal-700 
                       prose-h1:text-3xl prose-h1:border-b prose-h1:border-teal-200 prose-h1:pb-2 prose-h1:mb-4
                       prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-teal-600
                       prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-teal-500
                       prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                       prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-gray-900 prose-strong:font-bold
                       prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                       prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                       prose-li:text-gray-700 prose-li:mb-2
                       prose-code:text-teal-600 prose-code:bg-teal-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                       prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                       prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:pl-4 prose-blockquote:italic
                       prose-table:border-collapse prose-table:w-full
                       prose-th:bg-teal-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                       prose-td:border prose-td:border-gray-300 prose-td:p-3
                       prose-hr:border-teal-200 prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Practice Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Practice Quiz</h2>
              <p className="text-gray-600">Test your understanding with interactive exercises</p>
            </div>
            {!showQuiz && (
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Quiz 🎯
              </button>
            )}
          </div>

          {showQuiz ? (
            quizData ? (
              // Route to appropriate quiz component based on quiz type
              quizData.quiz_type === 'audio' ? (
                <AudioQuiz quiz={quizData} />
              ) : quizData.quiz_type === 'speaking' ? (
                <SpeakingQuiz quiz={quizData} />
              ) : quizData.quiz_type === 'reading' ? (
                <ReadingQuiz quiz={quizData} />
              ) : quizData.quiz_type === 'writing' ? (
                <WritingQuiz quiz={quizData} />
              ) : (
                <QuizMCQ lessonId={lesson.slug} />
              )
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading quiz...</p>
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-teal-50 rounded-lg border-2 border-dashed border-teal-300">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg mb-4">
                Ready to test what you've learned?
              </p>
              <p className="text-gray-500">
                Click "Start Quiz" to begin the practice exercises
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => navigate('/modules/learn-english')}
            className="flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Lessons
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-gray-600 hover:text-gray-700 font-semibold transition-colors"
          >
            Back to Top
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
