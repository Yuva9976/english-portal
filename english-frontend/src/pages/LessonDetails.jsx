import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

const PRINT_STYLES = `
@media print {
  @page {
    size: A4;
    margin: 2cm 2.5cm;
  }
  body {
    background: white !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    font-family: 'Inter', Arial, sans-serif !important;
  }
  /* Hide interactive UI */
  header, footer, .no-print, .sticky, button, textarea, input, nav,
  .sidebar, .breadcrumb, [role="navigation"] {
    display: none !important;
  }
  /* Force colors */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  /* Cards */
  .bg-white, .rounded-\[2rem\], .rounded-\[3rem\] {
    box-shadow: none !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 0.75rem !important;
  }
  /* Reveal answers */
  .print-show, .print-answer, .sample-answer-block {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  html, body {
    height: auto !important;
    overflow: visible !important;
  }
  .min-h-screen {
    min-height: auto !important;
    background: white !important;
    padding: 0 !important;
  }
  /* Professional PDF typography */
  h1 { font-size: 22pt !important; color: #0F766E !important; margin-bottom: 12pt !important; font-weight: 900 !important; letter-spacing: -0.5pt; }
  h2 { font-size: 16pt !important; color: #1e293b !important; margin-top: 18pt !important; margin-bottom: 8pt !important; font-weight: 800 !important; }
  h3 { font-size: 13pt !important; color: #334155 !important; font-weight: 700 !important; }
  h4 { font-size: 10pt !important; color: #64748b !important; font-weight: 700 !important; text-transform: uppercase; letter-spacing: 0.5pt; }
  p, li { font-size: 10.5pt !important; line-height: 1.65 !important; color: #334155 !important; }
  /* Lesson title header bar */
  .pdf-header {
    display: flex !important;
    align-items: center !important;
    border-bottom: 2pt solid #0D9488 !important;
    padding-bottom: 10pt !important;
    margin-bottom: 16pt !important;
  }
  /* Page break rules */
  .section-break { page-break-before: always !important; }
  .card-break { page-break-inside: avoid !important; }
  /* Hide empty fallback boxes */
  .opacity-70 { display: none !important; }
}
`;

export default function LessonDetails() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  // Progress State
  const [completedSections, setCompletedSections] = useState(new Set());

  // Interactive Exercise State
  const [writingTexts, setWritingTexts] = useState({});
  const [showSampleAnswers, setShowSampleAnswers] = useState({});
  const [showReadingAnswers, setShowReadingAnswers] = useState({});
  const [writingSubmitted, setWritingSubmitted] = useState({});
  const [vocabIndices, setVocabIndices] = useState({}); // Tracking current card per section
  const [vocabFlipped, setVocabFlipped] = useState({}); // Tracking flip state per section
  const [isSpeaking, setIsSpeaking] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get('/lessons/' + id);
        setLesson(res.data);
        
        // Load existing progress
        const progRes = await apiClient.get('/progress/user/me'); // Endpoint for user's progress
        if (Array.isArray(progRes.data)) {
           const completed = new Set(progRes.data.filter(p => p.completed).map(p => p.section_id));
           setCompletedSections(completed);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const markSectionComplete = async (sectionId) => {
    if (completedSections.has(sectionId)) return;
    try {
      await apiClient.post(`/progress/section/${sectionId}`);
      setCompletedSections(prev => new Set([...prev, sectionId]));
    } catch (err) {
      console.error('Failed to mark progress:', err);
    }
  };

  const handleSpeak = (text, id) => {
    if (!window.speechSynthesis) return alert('Your browser does not support speech synthesis.');
    window.speechSynthesis.cancel();
    // Strip numeric IDs from the word before speaking
    const cleanText = text.split('-')[0];
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onstart = () => setIsSpeaking(id);
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#0D9488] font-bold text-lg uppercase tracking-widest">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <span className="text-5xl block mb-4">⚠️</span>
          <h2 className="text-xl font-bold text-red-600 mb-2">Lesson Not Found</h2>
          <p className="text-slate-600 mb-6">We couldn't load this lesson.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition w-full"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const sections = lesson.LessonSections || [];
  
  // Categorize sections with robust detection
  const hasType = (type) => sections.some(s => {
    const sType = s.section_type || 'overview';
    if (sType === type) return true;
    // For reading/writing, check if it's an overview with JSON content
    if (type === 'writing' || type === 'reading' || type === 'vocabulary') {
      try {
        if (type === 'vocabulary') return sType === 'vocabulary';
        if (sType === 'overview' && s.content.trim().startsWith('{')) {
          const parsed = JSON.parse(s.content);
          if (type === 'writing') return (parsed.prompt || parsed.passage) && !parsed.passage;
          if (type === 'reading') return (parsed.prompt || parsed.passage) && parsed.passage;
        }
      } catch(e) {}
    }
    return false;
  });

  const handlePrint = () => {
    // Reveal all answers before printing so they appear in PDF
    const allSectionIds = (lesson.LessonSections || []).map(s => s.id);
    const allRevealedAnswers = {};
    const allRevealedSamples = {};
    allSectionIds.forEach(id => { allRevealedAnswers[id] = true; allRevealedSamples[id] = true; });
    setShowReadingAnswers(allRevealedAnswers);
    setShowSampleAnswers(allRevealedSamples);
    setTimeout(() => window.print(), 300);
  };

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* Premium Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
            >
              ←
            </button>
            <div>
              <h1 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight font-['Outfit'] uppercase leading-tight">
                {lesson.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-full tracking-wider border border-teal-100">
                  {lesson.level || 'General'}
                </span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Lesson Flow</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="no-print px-5 py-2.5 bg-white text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition flex items-center gap-2 border border-slate-200 shadow-sm uppercase tracking-widest"
              title="Download as PDF"
            >
              <span>📄</span> Save PDF
            </button>
            <button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="no-print px-6 py-2.5 bg-[#F43F5E] text-white text-xs font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-widest"
            >
              <span className="text-lg">🎯</span> Take Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8 flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Progress Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
             {['overview', 'video', 'vocabulary', 'reading', 'writing', 'resource'].map(type => {
               const active = hasType(type) || 
                              (type === 'overview' && lesson.description) || 
                              (type === 'video' && lesson.media_url) ||
                              (type === 'vocabulary' && (lesson.vocabularyWords?.length > 0 || hasType('vocabulary')));
               return (
                 <div key={type} className={`px-4 py-3 rounded-2xl border flex flex-col items-center justify-center text-center transition ${active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-dashed border-slate-200 opacity-60'}`}>
                   <span className="text-xl mb-1">
                     {type === 'overview' ? '📖' : type === 'video' ? '🎥' : type === 'vocabulary' ? '🔡' : type === 'reading' ? '📚' : type === 'writing' ? '✍️' : '📎'}
                   </span>
                   <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-slate-700' : 'text-slate-400'}`}>{type === 'vocabulary' ? 'Vocab' : type}</span>
                   {active ? (
                     <div className="mt-1 w-2 h-2 rounded-full bg-[#0D9488] shadow-teal-500/50 shadow-sm" title="Included" />
                   ) : (
                     <span className="text-[9px] text-slate-400 mt-1">N/A</span>
                   )}
                 </div>
               )
             })}
          </div>

          {/* Learning Guides Section */}
          {(lesson.learningGuides || []).map((guide, gIdx) => {
            const content = typeof guide.content_json === 'string' ? JSON.parse(guide.content_json || '{}') : (guide.content_json || {});
            return (
              <div key={guide.id || gIdx} className="space-y-6 animate-slideUp">
                {/* Guide Title & Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-teal-900 flex items-center gap-3 font-['Outfit'] tracking-tight">
                    <span className="w-9 h-9 bg-pink-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20 text-base">📘</span>
                    {guide.title || "Learning Guide"}
                  </h2>
                </div>

                {/* Definition Card */}
                {content.overview && (
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 border-l-8 border-l-[#0D9488]">
                    <h3 className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mb-3">Professional Overview</h3>
                    <p className="text-slate-700 text-lg leading-relaxed font-bold">
                      {content.overview}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Types Table */}
                  {content.types && content.types.length > 0 && (
                    <div className="premium-card !p-8 flex flex-col">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="text-[#0D9488]">📑</span> Structural Classifications
                      </h3>
                      <div className="space-y-4 flex-1">
                        {content.types.map((t, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#0D9488]/30 transition-all">
                            <span className="font-bold text-slate-800 text-sm uppercase tracking-tight">{t.type}</span>
                            <span className="text-[#0D9488] bg-teal-50 px-4 py-1.5 rounded-full text-xs font-bold italic group-hover:bg-[#0D9488] group-hover:text-white transition-all shadow-sm">{t.example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rules Section */}
                  {content.rules && content.rules.length > 0 && (
                    <div className="premium-card !p-8 flex flex-col">
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="text-[#F43F5E]">💡</span> Critical Guidelines
                      </h3>
                      <ul className="space-y-5 flex-1">
                        {content.rules.map((r, rIdx) => (
                          <li key={rIdx} className="flex gap-4 text-sm text-slate-600 font-bold leading-relaxed">
                            <span className="text-[#F43F5E] font-black text-xl leading-none">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Attachments Section */}
                {(guide.image_url || guide.pdf_url) && (
                  <div className="flex flex-wrap gap-4">
                     {guide.image_url && (
                      <a 
                        href={guide.image_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[200px] flex items-center gap-4 p-5 bg-teal-50 border border-teal-100 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group"
                      >
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-teal-100 group-hover:scale-110 transition-transform">🖼️</div>
                        <div>
                          <p className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest leading-none mb-1">Visual Repository</p>
                          <p className="font-bold text-slate-900 text-sm">Access Infographic</p>
                        </div>
                        <span className="ml-auto text-teal-300">→</span>
                      </a>
                    )}
                    {guide.pdf_url && (
                      <a 
                        href={guide.pdf_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[200px] flex items-center gap-4 p-5 bg-pink-50 border border-pink-100 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all group"
                      >
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-pink-100 group-hover:scale-110 transition-transform">📄</div>
                        <div>
                          <p className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-widest leading-none mb-1">Mastery Guide</p>
                          <p className="font-bold text-slate-900 text-sm">Download Resource</p>
                        </div>
                        <span className="ml-auto text-pink-300">→</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Overview Card */}
          <div className="premium-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-teal-50 to-pink-50 rounded-bl-full -z-0 opacity-40 translate-x-12 -translate-y-12" />
            <h2 className="text-base font-black text-slate-900 mb-4 relative z-10 flex items-center gap-3 font-['Outfit'] tracking-tight uppercase">
               <span className="w-8 h-8 bg-teal-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 text-sm font-normal">📖</span>
               Lesson Overview
            </h2>
            <div className="text-slate-600 text-sm leading-relaxed relative z-10 font-medium">
              {lesson.description ? (
                <p>"{lesson.description}"</p>
              ) : (
                <div className="p-10 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-4 opacity-10">📖</span>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Protocol Description Unavailable</p>
                </div>
              )}
            </div>
            
            {lesson.media_url && (
              <div className="mt-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-slate-100 group">
                <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-teal-600/40 to-pink-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="relative z-10 text-center p-8 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 mx-6">
                    <p className="text-[10px] font-bold text-teal-400 uppercase tracking-[0.3em] mb-4">High-Fidelity AudioVisual</p>
                    <a 
                      href={lesson.media_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-8 py-3 bg-[#0D9488] text-white rounded-xl font-bold uppercase text-sm hover:bg-[#0b7a6f] transition-all flex items-center gap-3 mx-auto w-fit shadow-xl shadow-teal-500/20"
                      onClick={() => markSectionComplete('metadata_video')}
                    >
                      Initialize Module Watch ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Sections Overlay */}
          <div className="space-y-6">
             {/* Render existing sections */}
             {sections.map((sec, idx) => {
                const isCompleted = completedSections.has(sec.id);

                let parsedContent = null;
                try { 
                  if (sec.content.trim().startsWith('{')) {
                    parsedContent = JSON.parse(sec.content);
                    if (typeof parsedContent === 'string') {
                      parsedContent = JSON.parse(parsedContent);
                    }
                  }
                } catch(e) {} 

                const sType = sec.section_type || 'overview';
                const hasExerciseProps = parsedContent && (parsedContent.prompt || parsedContent.passage);
                const isWriting = (sType === 'writing' || sType === 'writing_exercise') || (sType === 'overview' && hasExerciseProps && !parsedContent.passage);
                const isReading = (sType === 'reading' || sType === 'reading_exercise') || (sType === 'overview' && hasExerciseProps && parsedContent.passage);
                const isVocabulary = sType === 'vocabulary';

                return (
                  <div key={sec.id}>
                    {isVocabulary && parsedContent ? (
                      <div className="premium-card !p-10 border-l-8 border-l-[#F43F5E] relative animate-slideUp overflow-hidden">
                        {isCompleted && (
                          <div className="absolute top-6 right-6 px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-full tracking-widest border border-teal-100 shadow-sm">Protocol Verified ✅</div>
                        )}
                        
                        <div className="flex items-center gap-3 mb-8">
                          <span className="px-4 py-1.5 bg-pink-50 text-[#F43F5E] text-[10px] font-black uppercase rounded-lg border border-pink-100 shadow-sm">Lexicon Injection Session</span>
                        </div>
 
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-10 flex items-center pr-24 font-['Outfit'] tracking-tighter uppercase">
                          <span className="w-12 h-12 bg-[#F43F5E] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/20 mr-4 text-2xl font-normal">🔡</span>
                          {sec.title || "Essential Vocabulary"}
                        </h2>

                        <div className="flex flex-col items-center">
                          <div className="w-full max-w-md perspective-1000 mb-8 relative h-72">
                            {(() => {
                              const words = (lesson.vocabularyWords && lesson.vocabularyWords.length > 0) 
                                ? lesson.vocabularyWords 
                                : (Array.isArray(parsedContent) ? parsedContent : []);
                              const currentIdx = vocabIndices[sec.id] || 0;
                              const currentWord = words[currentIdx];
                              const flipped = vocabFlipped[sec.id];

                              if (!currentWord) return <div className="text-center p-10 bg-slate-50 rounded-3xl">No words in this deck</div>;

                              return (
                                <>
                                  <div 
                                    onClick={() => setVocabFlipped({ ...vocabFlipped, [sec.id]: !flipped })}
                                    className={`relative w-full h-full transition-all duration-500 transform-style-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
                                  >
                                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-[3rem] p-12 flex flex-col items-center justify-center shadow-2xl">
                                      <div className="absolute top-0 left-0 right-0 h-2 bg-[#0D9488]" />
                                      <div className="flex items-center justify-between w-full px-6 absolute top-6">
                                          <span className="px-5 py-1.5 bg-teal-50 text-[#0D9488] text-[11px] font-black uppercase rounded-full border border-teal-100">{currentWord.part_of_speech || 'noun'}</span>
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); handleSpeak(currentWord.word, currentWord.id); }}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${isSpeaking === currentWord.id ? 'bg-[#F43F5E] text-white animate-pulse' : 'bg-slate-50 text-[#0D9488] hover:bg-[#0D9488] hover:text-white border border-teal-100'}`}
                                          >
                                            🔊
                                          </button>
                                      </div>
                                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 font-['Outfit'] uppercase">{currentWord.word.split('-')[0]}</h3>
                                      <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] mt-8 animate-pulse">Touch to Decipher 🔄</p>
                                    </div>
 
                                    <div className="absolute inset-0 backface-hidden bg-slate-900 border-4 border-[#F43F5E]/20 rounded-[3rem] p-10 flex flex-col items-center justify-center shadow-2xl rotate-y-180">
                                      <div className="absolute top-0 left-0 right-0 h-2 bg-[#F43F5E]" />
                                      <p className="text-white text-xl font-bold mb-8 text-center leading-tight tracking-tight px-4 underline decoration-[#F43F5E] decoration-4 underline-offset-8 italic">
                                        "{currentWord.definition}"
                                      </p>
                                      {currentWord.example_sentence && (
                                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full mt-4">
                                          <p className="text-teal-400 text-xs italic text-center font-bold">
                                            {currentWord.example_sentence}
                                          </p>
                                        </div>
                                      )}
                                      <div className="mt-8 px-5 py-2 bg-[#F43F5E] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-pink-500/30">Semantic Match Confirmed</div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between mt-10 md:absolute md:-bottom-16 md:left-0 md:right-0 w-full">
                                    <button 
                                      disabled={currentIdx === 0}
                                      onClick={() => { setVocabIndices({...vocabIndices, [sec.id]: currentIdx - 1}); setVocabFlipped({...vocabFlipped, [sec.id]: false}); }}
                                      className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition shadow-xl disabled:opacity-20 translate-y-2 lg:translate-x-[-80px]"
                                    >←</button>
                                    <span className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase">
                                      {String(currentIdx + 1).padStart(2, '0')} / {String(words.length).padStart(2, '0')}
                                    </span>
                                    <button 
                                      disabled={currentIdx === words.length - 1}
                                      onClick={() => { setVocabIndices({...vocabIndices, [sec.id]: currentIdx + 1}); setVocabFlipped({...vocabFlipped, [sec.id]: false}); }}
                                      className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center hover:bg-[#0b7a6f] transition shadow-xl shadow-teal-500/20 disabled:opacity-20 translate-y-2 lg:translate-x-[80px]"
                                    >→</button>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>

                        <div className="mt-20 pt-8 border-t border-slate-50">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">List View Summary</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(() => {
                              const words = (lesson.vocabularyWords && lesson.vocabularyWords.length > 0) 
                                ? lesson.vocabularyWords 
                                : (Array.isArray(parsedContent) ? parsedContent : []);
                              return words.map((w, idx) => (
                                <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#0D9488] transition-all group flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-slate-800 text-sm truncate">{w.word.split('-')[0]}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase truncate">{w.part_of_speech}</div>
                                  </div>
                                  <button 
                                    onClick={() => handleSpeak(w.word, w.id)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${isSpeaking === w.id ? 'bg-[#F43F5E] text-white pulse' : 'bg-slate-50 text-[#0D9488] hover:bg-[#0D9488] hover:text-white'}`}
                                  >
                                    🔊
                                  </button>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      </div>
                    ) : isWriting && parsedContent ? (
                       <div className="premium-card !p-10 border-l-8 border-l-[#0D9488] relative animate-slideUp">
                         {isCompleted && (
                           <div className="absolute top-6 right-6 px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-full tracking-widest border border-teal-100 shadow-sm">Input Processed ✅</div>
                         )}
                         
                         <div className="flex items-center gap-3 mb-8">
                           <span className="px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-lg border border-teal-100 shadow-sm">Conceptual Composition</span>
                         </div>
 
                         <h2 className="text-3xl font-extrabold text-slate-900 mb-10 flex items-center pr-24 font-['Outfit'] tracking-tighter uppercase">
                           <span className="w-12 h-12 bg-[#0D9488] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/20 mr-4 text-2xl font-normal">✍️</span>
                           {parsedContent.title || sec.title || "Sentence Construction"}
                         </h2>
                         
                         <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-2xl mb-8">
                           <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <span>💡</span> Your Task
                           </h3>
                           <p className="text-slate-700 text-lg leading-relaxed font-medium">
                             {parsedContent.prompt || "Please write your answer below using the target grammar."}
                           </p>
                         </div>
                         
                         <div className="space-y-4">
                           <textarea 
                             className="w-full border-2 border-slate-200 rounded-2xl p-6 mb-2 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none min-h-[180px] text-slate-700 placeholder:text-slate-300 transition-all" 
                             placeholder="Start typing your response here..."
                             value={writingTexts[sec.id] || ''} 
                             onChange={(e) => setWritingTexts({...writingTexts, [sec.id]: e.target.value})}
                           />
                           
                           <div className="flex gap-4 flex-wrap">
                             {parsedContent.sample_answer && (
                               <button 
                                 onClick={() => setShowSampleAnswers({...showSampleAnswers, [sec.id]: !showSampleAnswers[sec.id]})} 
                                 className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${showSampleAnswers[sec.id] ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100'}`}
                               >
                                 {showSampleAnswers[sec.id] ? 'Hide' : '✨ Show'} Sample Answer
                               </button>
                             )}
                             <button 
                               onClick={() => { setWritingSubmitted({...writingSubmitted, [sec.id]: true}); markSectionComplete(sec.id); }} 
                               className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                             >
                               Submit for Review
                             </button>
                           </div>
                           
                           {writingSubmitted[sec.id] && (
                             <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl font-bold text-xs flex items-center gap-2 animate-fadeIn">
                               <span>✓</span> Response submitted for teacher review!
                             </div>
                           )}
                           
                           {showSampleAnswers[sec.id] && parsedContent.sample_answer && (
                             <div className="mt-8 bg-slate-50 border border-slate-100 rounded-3xl p-8 animate-slideUp">
                               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <span>📋</span> Ideal Response
                               </h4>
                               <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                 {parsedContent.sample_answer}
                               </div>
                               <div className="mt-6 p-4 bg-white/50 rounded-2xl border border-slate-100 text-[11px] text-slate-400 italic">
                                 Compare your response with the sample above to identify areas for improvement.
                               </div>
                             </div>
                           )}
                         </div>
                       </div>
                    ) : isReading && parsedContent ? (
                       <div className="premium-card !p-10 border-l-8 border-l-[#0D9488] relative animate-slideUp">
                         {isCompleted && (
                           <div className="absolute top-6 right-6 px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-full tracking-widest border border-teal-100 shadow-sm">Analysis Terminated ✅</div>
                         )}
                         
                         <div className="flex items-center gap-3 mb-8">
                           <span className="px-4 py-1.5 bg-teal-50 text-[#0D9488] text-[10px] font-black uppercase rounded-lg border border-teal-100 shadow-sm">Semantic Interpretation</span>
                         </div>
 
                         <h2 className="text-3xl font-extrabold text-slate-900 mb-10 flex items-center pr-24 font-['Outfit'] tracking-tighter uppercase">
                           <span className="w-12 h-12 bg-[#0D9488] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/20 mr-4 text-2xl font-normal">📚</span>
                           {parsedContent.title || sec.title || "Textual Deconstruction"}
                         </h2>
 
                         <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] mb-10 shadow-inner">
                           <h3 className="text-[10px] font-bold text-[#0D9488] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                             <div className="w-1.5 h-6 bg-[#0D9488] rounded-full" /> Targeted Passage
                           </h3>
                           <div className="text-slate-800 text-xl leading-relaxed font-bold italic tracking-tight font-['Inter']">
                             {parsedContent.passage}
                           </div>
                         </div>
                         
                         <div className="space-y-6">
                           {parsedContent.prompt && (
                             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-sm italic">
                               <span className="font-bold text-blue-600 not-italic mr-1">Goal:</span>
                               {parsedContent.prompt}
                             </div>
                           )}

                            <div className="flex gap-4">
                              <button 
                                onClick={() => { setShowReadingAnswers({...showReadingAnswers, [sec.id]: !showReadingAnswers[sec.id]}); markSectionComplete(sec.id); }} 
                                className={`px-10 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-xl ${showReadingAnswers[sec.id] ? 'bg-slate-100 text-slate-600 shadow-none' : 'bg-[#F43F5E] text-white shadow-pink-500/30 hover:scale-[1.02] hover:bg-[#e11d48] animate-pulse'}`}
                              >
                                {showReadingAnswers[sec.id] ? 'Conceal' : '⚡ Reveal'} Answer Keys
                              </button>
                            </div>
                            
                            {showReadingAnswers[sec.id] && parsedContent.sample_answer && (
                              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 animate-slideUp shadow-2xl">
                                <h4 className="text-[10px] font-black text-[#F43F5E] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                  <div className="w-6 h-1 bg-[#F43F5E] rounded-full" /> Structural Breakdown
                                </h4>
                                
                                {/* Special rendering if it looks like a list */}
                                {parsedContent.sample_answer.includes(':') ? (
                                  <div className="grid sm:grid-cols-2 gap-6">
                                    {parsedContent.sample_answer.split('\n').filter(line => line.trim()).map((line, lIdx) => {
                                       const partsRaw = line.split(':');
                                       const category = partsRaw[0];
                                       const content = partsRaw.slice(1).join(':');
                                       return (
                                         <div key={lIdx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#F43F5E]/30 transition-all">
                                           <span className="block text-[11px] font-black text-[#F43F5E] uppercase mb-2 tracking-widest">{category}</span>
                                           <span className="text-slate-900 font-bold text-lg tracking-tight">{content || '...'}</span>
                                         </div>
                                       );
                                    })}
                                  </div>
                                ) : (
                                  <div className="text-slate-800 text-xl leading-relaxed whitespace-pre-wrap font-bold italic border-l-4 border-l-[#F43F5E] pl-6 py-2">
                                    {parsedContent.sample_answer}
                                  </div>
                                )}
                              </div>
                            )}
                         </div>
                       </div>
                    ) : (
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                          <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-50">
                             <h3 className="text-lg font-black text-slate-800 font-['Outfit'] tracking-tight flex items-center gap-3">
                               <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-normal">🔘</span>
                               {sec.title}
                             </h3>
                             {isCompleted && <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-teal-100">Status Verified ✓</span>}
                          </div>
                          <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                            {sec.content && (sec.content.trim().startsWith('{') || sec.content.trim().startsWith('[')) ? (() => {
                              try {
                                const testParse = JSON.parse(sec.content);
                                // If it's a simple string or doesn't have the specific fields we use above, 
                                // we might want to just show the text if it's "normally visible"
                                if (typeof testParse === 'string') return <div dangerouslySetInnerHTML={{ __html: testParse }} />;
                                
                                // If it's a known exercise type but reached here (fallback), show a nice indicator
                                return (
                                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 text-slate-400">
                                    <span className="text-2xl">📋</span>
                                    <span className="text-sm font-bold uppercase tracking-widest italic font-['Outfit']">Consolidated behavioral module active</span>
                                  </div>
                                );
                              } catch(e) {
                                return <div dangerouslySetInnerHTML={{ __html: sec.content }} />;
                              }
                            })() : (
                              <div dangerouslySetInnerHTML={{ __html: sec.content }} />
                            )}
                          </div>
                          {sec.media_url && (
                             <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50/30 p-5 font-bold text-teal-700 flex items-center justify-between group/res">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">📎</span>
                                  <span className="text-sm font-black uppercase tracking-widest">Mastery Resource</span>
                                </div>
                                <a href={sec.media_url} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white rounded-xl shadow-sm border border-teal-100 text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all">Download</a>
                             </div>
                          )}
                        </div>
                    )}
                  </div>
                )
             })}

             {/* Dynamic Fallbacks for Missing Types */}
             {!hasType('writing') && (
               <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center opacity-70">
                 <span className="text-4xl mb-3">✍️</span>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Writing Exercise</p>
                 <p className="text-slate-400 text-xs mt-1">No writing tasks assigned for this lesson.</p>
               </div>
             )}
             {!hasType('reading') && (
               <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center opacity-70">
                 <span className="text-4xl mb-3">📚</span>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Reading Exercise</p>
                 <p className="text-slate-400 text-xs mt-1">Reading materials not available for this lesson.</p>
               </div>
             )}
             {!hasType('resource') && (
               <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center opacity-70">
                 <span className="text-4xl mb-3">📎</span>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Resources</p>
                 <p className="text-slate-400 text-xs mt-1">Downloadable resources not available.</p>
               </div>
             )}
          </div>
          
          {/* Bottom Action */}
          <div className="bg-gradient-to-br from-teal-50 to-pink-50 rounded-[3rem] p-12 border border-teal-100 text-center shadow-xl mt-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D9488]/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4 font-['Outfit'] uppercase tracking-tighter">Initialize Knowledge Verification</h3>
            <p className="text-[#0D9488] font-bold text-lg mb-10 max-w-lg mx-auto leading-relaxed">Transition to the assessment phase to certify your conceptual retention.</p>
            <button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-[#0D9488] text-white font-black text-xl shadow-2xl shadow-teal-500/30 hover:scale-105 hover:bg-[#0b7a6f] transition-all duration-300 uppercase tracking-widest"
            >
              Start Assessment 🚀
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Lesson Contents</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-teal-50 text-[#0D9488] font-bold text-sm">
                <span className="flex items-center gap-3">📖 Overview</span>
                <span className="text-[#0D9488]">✓</span>
              </div>
              {sections.map((sec, idx) => {
                let sParsed = null;
                try {
                  if (sec.content.trim().startsWith('{')) {
                    sParsed = JSON.parse(sec.content);
                    if (typeof sParsed === 'string') sParsed = JSON.parse(sParsed);
                  }
                } catch(e) {}

                const sType = sec.section_type || 'overview';
                const hasEx = sParsed && (sParsed.prompt || sParsed.passage);
                const isWriting = (sType === 'writing' || sType === 'writing_exercise') || (sType === 'overview' && hasEx && !sParsed.passage);
                const isReading = (sType === 'reading' || sType === 'reading_exercise') || (sType === 'overview' && hasEx && sParsed.passage);
                const isVocab = sType === 'vocabulary';
                const isVideo = sType === 'video';
                const isCompleted = completedSections.has(sec.id);

                let icon = '📝';
                if (isWriting) icon = '✍️';
                else if (isReading) icon = '📚';
                else if (isVocab) icon = '🔡';
                else if (isVideo) icon = '🎥';
                
                return (
                  <div key={sec.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition font-medium text-sm cursor-pointer group">
                    <span className="flex items-center gap-3"><span className="text-lg opacity-80">{icon}</span> {sec.title || (isVocab ? 'Vocabulary Deck' : `Section ${idx + 1}`)}</span>
                    {isCompleted && <span className="text-emerald-500">✓</span>}
                  </div>
                );
              })}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-pink-50 text-[#F43F5E] font-bold text-sm mt-4 border border-pink-100">
                <span className="text-lg">🎯</span> Verification Quiz
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
