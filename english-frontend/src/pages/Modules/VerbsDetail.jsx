import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { grammarAPI } from '../../apiClient';
import LearnMoreModal from '../../components/LearnMoreModal';

const VerbsDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [writingSubmitted, setWritingSubmitted] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalQuizAnswers, setModalQuizAnswers] = useState({});
  const [singleQuestionMode, setSingleQuestionMode] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [learnMoreData, setLearnMoreData] = useState(null);
  const [loadingLearnMore, setLoadingLearnMore] = useState(false);
  const [activeLearnTab, setActiveLearnTab] = useState('overview');
  
  // API Data State
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  
  // Comprehensive Content Modal State
  const [showComprehensiveModal, setShowComprehensiveModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  // Fetch data from API
  useEffect(() => {
    const fetchVerbData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch part details (ID 11 for Verbs)
        const partResponse = await grammarAPI.getPartDetails(11);
        setApiData(partResponse.data);
        
        // Fetch quiz questions
        const quizResponse = await grammarAPI.getQuiz(11);
        setQuizQuestions(quizResponse.data || []);
      } catch (err) {
        console.error('Error fetching verb data:', err);
        setError('Failed to load content. Using fallback data.');
        // Component will use hardcoded data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchVerbData();
  }, []);

  // Ensure page is at top when this detail view mounts (fixes browser scroll retention)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Use API data or fallback to hardcoded data

  // Use API data or fallback to hardcoded data
  const verbTopics = [
    { id: 1, type: 'What is a verb?', icon: '🏃', color: 'purple', definition: 'Words that express action, occurrence, or a state of being.', examples: ['She <strong>runs</strong> every morning.', 'He <strong>is</strong> happy.'], sampleWords: ['run', 'be', 'seem', 'exist'] },
    { id: 2, type: 'Types of Verbs', icon: '🧭', color: 'blue', definition: 'Main verbs, auxiliary verbs (be/have/do), modal verbs (can/may/must), and linking verbs.', examples: ['She <strong>has</strong> eaten.', 'It <strong>seems</strong> difficult.'], sampleWords: ['main, auxiliary, modal, linking'] },
    { id: 3, type: 'Forms of Verbs', icon: '🔤', color: 'green', definition: 'Base form, past simple, past participle; regular verbs add -ed, irregular verbs change.', examples: ['walk → walked → walked', 'go → went → gone'], sampleWords: ['base, past, participle'] },
    { id: 4, type: 'Verb Tenses', icon: '⏳', color: 'teal', definition: 'Simple, continuous, perfect, and perfect continuous across present/past/future.', examples: ['I <strong>eat</strong>, I <strong>am eating</strong>, I <strong>have eaten</strong>.'], sampleWords: ['present simple', 'past continuous', 'future perfect'] },
    { id: 5, type: 'Subject-Verb Agreement', icon: '⚖️', color: 'orange', definition: 'Verbs must agree with their subjects in number and person.', examples: ['He <strong>runs</strong> / They <strong>run</strong>.'], sampleWords: ['singular vs plural agreement'] },
    { id: 6, type: 'Phrasal Verbs', icon: '🔗', color: 'rose', definition: 'Verb + particle combinations with idiomatic meanings (give up, look after).', examples: ['She <strong>gave up</strong> smoking.', 'Please <strong>look after</strong> the baby.'], sampleWords: ['give up', 'look after', 'put off'] },
    { id: 7, type: 'Passive Voice', icon: '🎭', color: 'indigo', definition: 'Formed with be + past participle to focus on the receiver of an action.', examples: ['The cake <strong>was eaten</strong> by the children.'], sampleWords: ['was eaten', 'is built'] },
    { id: 8, type: 'Gerunds & Infinitives', icon: '🧩', color: 'cyan', definition: 'Some verbs take -ing forms, others take to + infinitive — meaning can differ.', examples: ['I enjoy <strong>reading</strong>.', 'I want <strong>to learn</strong>.'], sampleWords: ['reading', 'to learn'] },
    { id: 9, type: 'Imperatives & Modals', icon: '⚡', color: 'yellow', definition: 'Commands (Open!) and modal helpers (can, should, must) for ability/obligation.', examples: ['<strong>Open</strong> the door.', 'You <strong>should</strong> study.'], sampleWords: ['open, should, must'] },
    // Removed Common Mistakes card
  ];

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📚' },
    { id: 'quiz', name: 'Quiz', icon: '🎯' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const videos = [
    { id: 1, title: 'Verbs: Types & Forms', embedId: 'dQw4w9WgXcQ', description: 'Clear overview of verb types, forms and usage.' },
    { id: 2, title: 'Mastering Verb Tenses', embedId: '9bZkp7q19f0', description: 'Simple approach to main English tenses.' }
  ];

  // Interactive quiz covering core verb topics (10 questions)
  const interactiveQuiz = [
    { id: 1, type: 'multiple-choice', emoji: '⚖️', question: 'Choose the correct verb for agreement: "She ___ late."', hint: 'Singular subject', options: ['are', 'is', 'were', 'be'], correct: 1, explanation: '"She is late." — singular subject needs singular verb.' },
    { id: 2, type: 'multiple-choice', emoji: '⏳', question: 'Which is present continuous?', hint: 'be + -ing', options: ['I eat', 'I am eating', 'I ate', 'I will eat'], correct: 1, explanation: '"I am eating" is present continuous.' },
    { id: 3, type: 'multiple-choice', emoji: '🔁', question: 'Which is past participle of "go"?', hint: 'Used with have/has/had', options: ['goed', 'went', 'gone', 'going'], correct: 2, explanation: 'Past participle of "go" is "gone".' },
    { id: 4, type: 'multiple-choice', emoji: '🔗', question: 'Which is a phrasal verb?', hint: 'Verb + particle', options: ['give up', 'run', 'think', 'study'], correct: 0, explanation: '"Give up" is a phrasal verb.' },
    { id: 5, type: 'multiple-choice', emoji: '🧩', question: 'Which verb is followed by gerund?', hint: 'Common verbs: enjoy, avoid, finish', options: ['want', 'decide', 'enjoy', 'hope'], correct: 2, explanation: '"Enjoy" is followed by gerund: enjoy reading.' },
    { id: 6, type: 'multiple-choice', emoji: '🎭', question: 'Which sentence is passive?', hint: 'be + past participle', options: ['They built a house.', 'A house was built.', 'They build houses.', 'Build a house.'], correct: 1, explanation: '"A house was built" is passive.' },
    { id: 7, type: 'multiple-choice', emoji: '⚡', question: 'Which is a modal verb?', hint: 'Displays ability or obligation', options: ['run', 'must', 'eat', 'is'], correct: 1, explanation: '"Must" is a modal verb.' },
    { id: 8, type: 'multiple-choice', emoji: '🔤', question: 'Regular past of "walk"?', hint: 'Add -ed for regular', options: ['walk', 'walked', 'walking', 'woked'], correct: 1, explanation: '"Walked" is the past.' },
    { id: 9, type: 'multiple-choice', emoji: '❗', question: 'Which is correct: "She suggested to go" or "She suggested going"?', hint: 'Gerund vs infinitive', options: ['She suggested to go', 'She suggested going', 'Both', 'Neither'], correct: 1, explanation: '"Suggested" is followed by a gerund: "suggested going".' },
    { id: 10, type: 'multiple-choice', emoji: '🏁', question: 'Choose the base form (infinitive without to):', hint: 'Base form', options: ['to run', 'running', 'run', 'ran'], correct: 2, explanation: '"Run" is the base form.' }
  ];

  const tips = [
    { icon: '✅', type: 'DO', text: 'Match verb number to the subject (he runs, they run).', color: 'green' },
    { icon: '✅', type: 'DO', text: 'Learn common irregulars in small daily lists.', color: 'green' },
    { icon: '❌', type: "DON'T", text: 'Don\'t mix tense contexts (past vs present signals).', color: 'red' },
    { icon: '❌', type: "DON'T", text: 'Avoid using wrong gerund/infinitive after verbs.', color: 'red' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInteractiveQuiz = (questionId, answerIndex) => {
    const question = interactiveQuiz.find(q => q.id === questionId);
    const isCorrect = answerIndex === question.correct;
    setQuizAnswers(prev => ({ ...prev, [questionId]: { selected: answerIndex, correct: isCorrect } }));
    if (isCorrect) setQuizScore(prev => prev + 10);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Sticky Header (Noun/Pronoun/Adjective-style) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2" title="Back">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">🔤</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Verbs</h1>
            <span className="text-base text-teal-600 ml-2">Comprehensive verb guide and practice</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-teal-400 to-blue-300 text-white shadow-lg'
                    : 'bg-white text-gray-500 hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-300 hover:text-white'
                }`}
              >
                <span className="mr-1">{section.icon}</span>
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* OVERVIEW */}
        <section id="overview" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is a verb?</h2>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              A <strong>verb</strong> expresses actions, events, or states of being. Verbs control tense, meaning, and sentence flow.
            </p>

            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-teal-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Verbs show when and how actions happen — essential for clear sentences.</p>
              </div>
              <div className="bg-white border border-rose-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-rose-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Tense + aspect = precise meaning (time + duration).</p>
              </div>
            </div>
          </div>

          {/* Key Topics Grid */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <span className="text-3xl mr-2">🧭</span>
              Key Verb Topics
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {apiData?.types && apiData.types.length > 0 ? (
                apiData.types.map((type) => (
                  <div key={type.id} className={`relative rounded-2xl shadow-lg transition-all duration-300 flex flex-col h-full p-0 group bg-white/60 backdrop-blur-lg border border-${type.color || 'purple'}-200 hover:border-${type.color || 'purple'}-400 hover:shadow-xl hover:ring-2 hover:ring-${type.color || 'purple'}-300`} style={{ borderTop: `6px solid var(--tw-color-${type.color || 'purple'}-400)` }}>
                    <div className="absolute top-4 right-4 opacity-10 text-6xl pointer-events-none select-none">{type.icon}</div>
                    <div className="flex items-center gap-3 px-7 pt-8 pb-4 z-10">
                      <span className={`text-3xl drop-shadow-lg`} style={{ color: `var(--tw-color-${type.color || 'purple'}-500)` }}>{type.icon}</span>
                      <h3 className="text-xl font-extrabold text-gray-800 tracking-tight drop-shadow">{type.name}</h3>
                    </div>
                    <div className="px-7 pb-8 flex-1 flex flex-col z-10">
                      <p className="text-base text-gray-700 leading-relaxed mb-5 font-semibold bg-white/70 rounded-xl px-3 py-2 shadow-sm">{type.description}</p>
                      {type.examples && type.examples.length > 0 && (
                        <div className="space-y-4 mb-5">
                          {type.examples.slice(0, 2).map((ex, idx) => (
                            <div key={idx} className={`bg-gradient-to-r from-${type.color || 'purple'}-50 to-blue-50 px-5 py-3 rounded-xl border border-${type.color || 'purple'}-100 shadow group-hover:scale-[1.03] group-hover:border-${type.color || 'purple'}-300 transition-all`}>
                              <p className="text-base text-gray-700 font-medium">{ex}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {type.sample_words && type.sample_words.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-5">
                          {type.sample_words.slice(0, 4).map((word, idx) => (
                            <span key={idx} className={`bg-gradient-to-r from-${type.color || 'purple'}-200 to-blue-200 text-${type.color || 'purple'}-700 px-5 py-2 rounded-full text-base font-bold border border-${type.color || 'purple'}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}>{word}</span>
                          ))}
                        </div>
                      )}
                      <button onClick={() => { setLearnMoreData(type); setShowLearnMoreModal(true); }} className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.04] group-hover:ring-2 group-hover:ring-teal-400">Learn More</button>
                    </div>
                  </div>
                ))
              ) : (
                verbTopics.map(topic => (
                  <div key={topic.id} className={`relative rounded-2xl shadow-lg transition-all duration-300 flex flex-col h-full p-0 group bg-white/60 backdrop-blur-lg border border-${topic.color}-200 hover:border-${topic.color}-400 hover:shadow-xl hover:ring-2 hover:ring-${topic.color}-300`} style={{ borderTop: `6px solid var(--tw-color-${topic.color}-400)` }}>
                    <div className="absolute top-4 right-4 opacity-10 text-6xl pointer-events-none select-none">{topic.icon}</div>
                    <div className="flex items-center gap-3 px-7 pt-8 pb-4 z-10">
                      <span className={`text-3xl drop-shadow-lg`} style={{ color: `var(--tw-color-${topic.color}-500)` }}>{topic.icon}</span>
                      <h3 className="text-xl font-extrabold text-gray-800 tracking-tight drop-shadow">{topic.type}</h3>
                    </div>
                    <div className="px-7 pb-8 flex-1 flex flex-col z-10">
                      <p className="text-base text-gray-700 leading-relaxed mb-5 font-semibold bg-white/70 rounded-xl px-3 py-2 shadow-sm">{topic.definition}</p>
                      <div className="space-y-4 mb-5">
                        {topic.examples.slice(0,2).map((ex, i) => (
                          <div key={i} className={`bg-gradient-to-r from-${topic.color}-50 to-blue-50 px-5 py-3 rounded-xl border border-${topic.color}-100 shadow group-hover:scale-[1.03] group-hover:border-${topic.color}-300 transition-all`}>
                            <p className="text-base text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: ex }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 mb-5">
                        {topic.sampleWords.slice(0,4).map((w, idx) => (
                          <span key={idx} className={`bg-gradient-to-r from-${topic.color}-200 to-blue-200 text-${topic.color}-700 px-5 py-2 rounded-full text-base font-bold border border-${topic.color}-300 shadow group-hover:ring-2 group-hover:ring-blue-200`}>{w}</span>
                        ))}
                      </div>
                      <button onClick={() => { setLearnMoreData(topic); setShowLearnMoreModal(true); }} className="w-full bg-gradient-to-r from-teal-500 to-rose-400 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto group-hover:scale-[1.04] group-hover:ring-2 group-hover:ring-teal-400">Learn More</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 rounded-xl shadow-lg border border-teal-100 p-5 md:p-6 mb-2">
            <h3 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2 drop-shadow">
              <span className="inline-block text-2xl bg-gradient-to-r from-teal-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">💡</span>
              Pro Tips & Common Mistakes
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow border border-${tip.color}-100 p-4 flex items-center min-h-[80px] bg-gradient-to-r from-${tip.color === 'green' ? 'green-50' : 'red-50'} to-white`}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow border border-${tip.color}-100 mr-3">
                    <span className={`text-2xl text-${tip.color}-500`}>{tip.icon}</span>
                  </div>
                  <div>
                    <span className={`font-semibold text-${tip.color}-700 block mb-1 text-base tracking-wide`}>{tip.type}</span>
                    <p className="text-gray-700 text-base font-normal leading-normal">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-yellow-50 via-white to-teal-50 border border-yellow-100 rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-teal-700 mb-2 text-base flex items-center gap-2">
                <span className="text-lg">🔤</span>
                Advanced Tips
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-base">
                <li><strong>Irregular verbs:</strong> Practice a few daily <span className="text-teal-600 font-bold">(go → went, see → saw)</span></li>
                <li><strong>Subject-verb agreement:</strong> Watch for singular/plural <span className="text-gray-500">(he runs, they run)</span></li>
                <li><strong>Gerunds/infinitives:</strong> Learn which verbs take which form <span className="text-gray-500">(enjoy reading, want to go)</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* VIDEO LESSONS */}
        <section id="videos" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-teal-100">
            <h2 className="text-3xl font-bold text-teal-800 mb-2 flex items-center">
              <span className="text-2xl mr-2">🎥</span>
              Video Lessons
            </h2>
            <p className="text-gray-600 text-base mb-6">Watch these helpful videos.</p>

            <div className="grid md:grid-cols-2 gap-6">
              {videos.map(video => (
                <div key={video.id} className="bg-gradient-to-br from-cyan-50 to-rose-50 rounded-2xl shadow-md p-6 flex flex-col items-center">
                  <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    <iframe
                      className="w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="w-full text-center">
                    <h3 className="font-bold text-lg text-teal-700 mb-2 flex items-center justify-center gap-2">
                      <span className="text-xl">🎬</span> {video.title}
                    </h3>
                    <p className="text-base text-gray-700 mb-1">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WRITING EXERCISE */}
        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl shadow-2xl p-8 md:p-10 border-l-4 border-teal-500 card-hover">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-3xl bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-2xl shadow-md">✍️</span>
              <span className="gradient-text">Writing Exercise</span>
            </h2>
            <p className="text-base text-gray-700 mb-4">Practice verb forms and tenses in your own sentences.</p>

            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-3 mb-3 flex items-center gap-2">
                <span className="text-lg">💡</span>
                <div>
                  <span className="font-semibold text-gray-800 block mb-1 text-sm">Your Task</span>
                  <span className="text-gray-700 text-sm">Write five sentences using different tenses and verb forms (base, past, participle, gerund, infinitive).</span>
                </div>
              </div>

              <textarea className="w-full border-2 border-gray-300 rounded-xl p-3 mb-3 focus:border-teal-500 focus:outline-none min-h-[120px] text-sm" placeholder={"Type your sentences here...\n\nExample:\n1. I walk to school. (present simple)"} />

              <div className="flex gap-2">
                <button onClick={() => setWritingRevealed(!writingRevealed)} className="bg-green-500 text-white font-bold px-4 py-1 rounded-full shadow hover:bg-green-600 transition text-sm">Show Sample Answer</button>
                <button onClick={() => setWritingSubmitted(true)} className="bg-blue-500 text-white font-bold px-4 py-1 rounded-full shadow hover:bg-blue-600 transition text-sm">Submit for Review</button>
              </div>

              {writingSubmitted && (<div className="mt-3 bg-teal-50 border-l-4 border-teal-500 p-3 rounded-xl animate-fade-in"><p className="text-teal-800 font-semibold text-sm">✓ Submitted! A teacher will review your work soon.</p></div>)}

              {writingRevealed && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 animate-fade-in">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">📋 Sample Answer:</h4>
                  <ol className="space-y-2 list-decimal list-inside text-gray-700 text-sm">
                    <li>I <span className="font-semibold">walk</span> to school every day. (present simple)</li>
                    <li>She <span className="font-semibold">was reading</span> when I called. (past continuous)</li>
                    <li>They have <span className="font-semibold">eaten</span> already. (present perfect)</li>
                    <li>I <span className="font-semibold">enjoy</span> swimming. (gerund after enjoy)</li>
                    <li>He decided <span className="font-semibold">to leave</span> early. (infinitive after decide)</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* READING EXERCISE - Modern Nouns Style */}
        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-white rounded-3xl shadow-xl p-8 md:p-10 border-l-4 border-indigo-500 card-hover max-w-6xl mx-auto" style={{marginLeft: '20px'}}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center">
              <span className="text-xl mr-2">📚</span>
              Reading Exercise
            </h2>
            <p className="text-gray-500 text-base mb-3">Read the passage and identify the verbs and their tenses.</p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm mb-3">
              <h3 className="font-semibold text-gray-800 mb-1 text-base flex items-center">
                <span className="mr-2">💡</span> Read this short passage
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                <strong className="text-purple-600">Alex</strong> <strong className="text-blue-600">woke</strong> early and <strong className="text-blue-600">decided</strong> to go for a run. He <strong className="text-teal-600">is training</strong> for a marathon and <strong className="text-rose-600">has been running</strong> every morning. After the run, he <strong className="text-orange-600">felt</strong> energized and <strong className="text-orange-600">plans</strong> to eat a healthy breakfast.
              </p>
            </div>
            <button
              onClick={() => setReadingRevealed(!readingRevealed)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow mb-3"
            >
              {readingRevealed ? 'Hide' : 'Show'} All Verbs
            </button>
            {readingRevealed && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 animate-fade-in">
                <h4 className="font-semibold text-gray-800 mb-3 text-base">✓ Verbs Identified:</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-base">
                  <div className="bg-blue-100 p-3 rounded">
                    <span className="font-semibold text-blue-700">Past Simple:</span>
                    <p className="text-gray-700">woke, decided, felt</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded">
                    <span className="font-semibold text-teal-700">Present Continuous / Perfect:</span>
                    <p className="text-gray-700">is training, has been running</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <span className="font-semibold text-orange-700">Present Simple:</span>
                    <p className="text-gray-700">plans</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* QUIZ PRACTICE - Modern Nouns Style */}
        <section id="quiz" className="mb-16 scroll-mt-32">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center justify-center mb-3 gradient-text drop-shadow">
              <span className="text-3xl mr-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-rose-400 bg-clip-text text-transparent">🎯</span>
              Quiz Practice
            </h2>
            <p className="text-gray-500 text-base mb-6">Review questions or take the full quiz.</p>
            <button
              onClick={() => {
                setShowQuizModal(true);
                setCurrentQuestionIndex(0);
                setModalQuizAnswers({});
                setSingleQuestionMode(false);
              }}
              className="inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-rose-400 hover:from-blue-600 hover:to-rose-500 text-white font-bold py-3 px-8 rounded-3xl shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              ▶️ Start Full Quiz
            </button>
          </div>

          {/* Quiz Questions Grid - Review Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(quizQuestions.length > 0 ? quizQuestions : interactiveQuiz).map((question, qIndex) => {
              const answered = quizAnswers[question.id];
              const isApiQuestion = quizQuestions.length > 0;
              return (
                <div
                  key={question.id}
                  onClick={() => {
                    setShowQuizModal(true);
                    setCurrentQuestionIndex(qIndex);
                    setModalQuizAnswers({});
                    setSingleQuestionMode(true);
                  }}
                  className="bg-gradient-to-br from-blue-100 via-indigo-50 to-white rounded-3xl p-5 shadow-xl border-l-4 border-blue-400 card-hover cursor-pointer transition-all duration-300"
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xs px-2 py-0.5 rounded-full">
                      Q{qIndex + 1}
                    </span>
                    {answered && (
                      <span className={`text-lg ${answered.correct ? '✓' : ''}`}></span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-lg">{question.emoji}</span>
                    <p className="text-xs font-semibold text-gray-700 line-clamp-2">
                      {question.question}
                    </p>
                  </div>

                  {/* Answer Status */}
                  {answered && (
                    <div className={`text-xs font-medium p-1.5 rounded ${
                      answered.correct 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {answered.correct ? 'Correct!' : 'Try again'}
                    </div>
                  )}
                  {!answered && (
                    <div className="text-xs text-blue-600 font-medium">
                      Click to attempt
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {showQuizModal && (
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl">
                {!singleQuestionMode && (
                  <div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-teal-500 to-rose-500 transition-all" style={{ width: `${((currentQuestionIndex + 1) / (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length)) * 100}%` }} /></div>
                )}

                <div className={`px-6 md:px-8 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between ${singleQuestionMode ? 'bg-slate-50' : ''}`}>
                  <div>{!singleQuestionMode ? (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Question {currentQuestionIndex + 1} of {quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length}</p>) : (<p className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Practice Question</p>)}</div>
                  <div className="flex items-center gap-4 md:gap-6">
                    {!singleQuestionMode && (<div className="text-right"><div className="text-lg md:text-xl font-bold text-teal-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div><div className="text-xs text-slate-500">points</div></div>)}
                    <button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700" title="Close quiz"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                </div>

                {currentQuestionIndex < (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) ? (
                  <div className="p-6 md:p-8">
                    {(() => {
                      const allQuestions = quizQuestions.length > 0 ? quizQuestions : interactiveQuiz;
                      const question = allQuestions[currentQuestionIndex];
                      const answered = modalQuizAnswers[question.id];
                      const isApiQuestion = quizQuestions.length > 0;
                      
                      return (
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              {isApiQuestion && question.question_type === 'multiple-choice' ? (
                                <span className="text-4xl md:text-5xl flex-shrink-0">🎯</span>
                              ) : isApiQuestion && question.question_type === 'fill-blank' ? (
                                <span className="text-4xl md:text-5xl flex-shrink-0">✏️</span>
                              ) : (
                                <span className="text-4xl md:text-5xl flex-shrink-0">{question.emoji}</span>
                              )}
                              <h4 className="text-lg md:text-xl font-bold text-slate-800 leading-snug pt-1">{question.question}</h4>
                            </div>
                          </div>

                          {!answered && (<div className="bg-teal-50 border-l-4 border-teal-500 p-3 md:p-4 rounded-lg"><p className="text-xs md:text-sm text-teal-700"><span className="font-semibold">💡 Hint:</span> {question.hint || 'Choose the correct answer'}</p></div>)}

                          <div className="space-y-2.5">
                            {(question.options || []).map((option, index) => (
                              <button key={index} onClick={() => { if (!answered) { const isCorrect = isApiQuestion ? String(index) === String(question.correct_answer) : index === question.correct; setModalQuizAnswers(prev => ({ ...prev, [question.id]: { selected: index, correct: isCorrect } })); } }} disabled={answered} className={`w-full p-3 md:p-4 rounded-lg border-2 transition-all text-left font-medium group ${answered ? index === (isApiQuestion ? parseInt(question.correct_answer) : question.correct) ? 'bg-green-50 border-green-400 shadow-sm' : answered.selected === index ? 'bg-red-50 border-red-400 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-white border-slate-300 hover:border-teal-400 hover:bg-teal-50 cursor-pointer'}`}>
                                <div className="flex items-center gap-3"><span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-xs flex-shrink-0 transition-colors ${answered ? index === (isApiQuestion ? parseInt(question.correct_answer) : question.correct) ? 'bg-green-200 text-green-700' : answered.selected === index ? 'bg-red-200 text-red-700' : 'bg-slate-200 text-slate-600' : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'}`}>{String.fromCharCode(65 + index)}</span><span className="flex-1 text-sm md:text-base text-slate-700 group-hover:text-slate-800">{option}</span>{answered && index === (isApiQuestion ? parseInt(question.correct_answer) : question.correct) && <span className="text-lg">✅</span>}{answered && answered.selected === index && index !== (isApiQuestion ? parseInt(question.correct_answer) : question.correct) && <span className="text-lg">❌</span>}</div>
                              </button>
                            ))}
                          </div>

                          {answered && (<div className={`p-4 rounded-lg border-l-4 mb-6 ${answered.correct ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}><p className="text-sm text-gray-800 mb-2"><span className="font-bold">{answered.correct ? '🎉 Correct!' : '📝 Not quite!'}</span></p><p className="text-sm text-gray-700 leading-relaxed mb-3">{question.explanation}</p></div>)}

                          {answered?.correct && (<div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-lg"><p className="text-xs md:text-sm text-rose-800"><span className="font-bold">🎓 Tip:</span> {question.hint || 'Great job!'}</p></div>)}

                          {!singleQuestionMode && answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))} disabled={currentQuestionIndex === 0} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">← Previous</button><button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={!answered || currentQuestionIndex === (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) - 1} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all">Next →</button></div>)}

                          {singleQuestionMode && answered && (<div className="flex gap-2.5 pt-4 border-t border-slate-100"><button onClick={() => { setShowQuizModal(false); setSingleQuestionMode(false); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg transition-all">← Back to Questions</button></div>)}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="p-6 md:p-8 text-center space-y-5">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800">{Object.keys(modalQuizAnswers).length === (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) ? '🎊 Quiz Complete!' : '⏸️ Quiz Paused'}</h3>
                    {Object.keys(modalQuizAnswers).length === (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) && (
                      <>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 space-y-2">
                          <p className="text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wide">Final Score</p>
                          <div className="text-5xl md:text-6xl font-bold text-amber-600">{Object.values(modalQuizAnswers).filter(a => a.correct).length * 10}</div>
                          <p className="text-base text-slate-700 font-medium">out of {(quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) * 10} points</p>
                        </div>

                        <div className="bg-gradient-to-r from-teal-50 to-rose-50 p-5 rounded-xl border border-teal-200">
                          <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed">{Object.values(modalQuizAnswers).filter(a => a.correct).length === (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) ? '🏆 Perfect!' : Object.values(modalQuizAnswers).filter(a => a.correct).length >= Math.ceil((quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) * 0.8) ? '🥇 Excellent!' : Object.values(modalQuizAnswers).filter(a => a.correct).length >= Math.ceil((quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) * 0.6) ? '👏 Good effort!' : '📚 Keep practicing!'}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200 text-center"><p className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{Object.values(modalQuizAnswers).filter(a => a.correct).length}</p><p className="text-xs md:text-sm font-semibold text-slate-600">Correct</p></div>
                          <div className="bg-red-50 p-3 md:p-4 rounded-lg border border-red-200 text-center"><p className="text-2xl md:text-3xl font-bold text-red-600 mb-1">{(quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length) - Object.values(modalQuizAnswers).filter(a => a.correct).length}</p><p className="text-xs md:text-sm font-semibold text-slate-600">Incorrect</p></div>
                          <div className="bg-teal-50 p-3 md:p-4 rounded-lg border border-teal-200 text-center"><p className="text-2xl md:text-3xl font-bold text-teal-600 mb-1">{Math.round((Object.values(modalQuizAnswers).filter(a => a.correct).length / (quizQuestions.length > 0 ? quizQuestions.length : interactiveQuiz.length)) * 100)}%</p><p className="text-xs md:text-sm font-semibold text-slate-600">Accuracy</p></div>
                        </div>
                      </>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
                      <button onClick={() => setShowQuizModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium text-sm md:text-base hover:bg-slate-50 transition-colors">Close</button>
                      <button onClick={() => { setCurrentQuestionIndex(0); setModalQuizAnswers({}); }} className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-rose-500 text-white font-medium text-sm md:text-base hover:shadow-lg transition-all">🔄 Restart Quiz</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {Object.keys(quizAnswers).length === interactiveQuiz.length && (<div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 rounded-xl p-6 text-center shadow-lg border-2 border-yellow-400 animate-fade-in"><h3 className="text-2xl font-bold text-gray-800 mb-2">📊 Quiz Review Complete!</h3><p className="text-gray-700">You've answered all questions. Click "Start Full Quiz" for a guided quiz experience.</p></div>)}
        </section>

        {/* RESOURCES */}
        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">🔗</span>Additional Resources</h2>
            <p className="text-gray-600 text-sm mb-5">Explore more materials to master verbs</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[{ title: 'Verb Tenses Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/verb-tenses.htm', color: 'blue' }, { title: 'Phrasal Verbs List', icon: '🔗', url: 'https://www.ef.edu/english-resources/english-phrases/phrasal-verbs/', color: 'green' }, { title: 'Irregular Verbs Chart', icon: '📄', url: 'https://www.englishpage.com/irregularverbs/irregularverbs.html', color: 'purple' }].map((resource, index) => (
                <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className={`bg-gradient-to-br from-${resource.color}-50 to-${resource.color}-100 rounded-lg p-4 border border-${resource.color}-300 hover:shadow-md transition-all`}>
                  <span className="text-2xl block mb-2">{resource.icon}</span>
                  <h3 className={`font-semibold text-${resource.color}-700 text-base mb-1`}>{resource.title}</h3>
                  <p className="text-sm text-gray-600">Explore →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready to practice?</h3>
          <p className="text-sm mb-4 text-blue-100">Try quizzes and exercises to sharpen verb skills.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/modules/grammar-hub')} className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors shadow-lg">Grammar Hub</button>
            <button onClick={() => navigate('/modules/learn-english')} className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg">All Lessons</button>
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE CONTENT MODAL - COMPLETE LEARNING MATERIAL */}
      {showComprehensiveModal && selectedType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-4 max-h-[95vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white p-6 md:p-8 flex items-start justify-between border-b-4 border-teal-300 gap-4">
              <div className="flex items-start gap-4 flex-1">
                <span className="text-5xl md:text-6xl flex-shrink-0">{selectedType.icon}</span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold">{selectedType.name} - Complete Guide</h2>
                  <p className="text-blue-100 mt-2 text-lg">{selectedType.description}</p>
                </div>
              </div>
              <button
                onClick={() => setShowComprehensiveModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all flex-shrink-0 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Quick Overview Section */}
              <div className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-6 border-2 border-teal-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-3">⚡</span>Quick Overview
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">{selectedType.description}</p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500 mb-4">
                  <p className="font-semibold text-gray-800 mb-3">🎯 Key Points:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Show what someone or something is DOING</li>
                    <li>• Can be in any tense</li>
                    <li>• Include both physical and mental actions</li>
                    <li>• Most common type of verb in English</li>
                  </ul>
                </div>
                {selectedType.sample_words && selectedType.sample_words.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">💬 Common Words:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedType.sample_words.slice(0, 12).map((word, idx) => (
                        <span key={idx} className="bg-teal-200 text-teal-800 px-3 py-1.5 rounded-full font-medium text-sm">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expandable Sections */}
              <div className="space-y-3">
                
                {/* Section 1: Deep Explanation */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, explanation: !prev.explanation }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300 transition-colors flex items-center justify-between font-semibold text-teal-800"
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span>📖</span> Definition & Deep Explanation
                    </span>
                    <span className={`transition-transform text-xl ${expandedSections.explanation ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.explanation && (
                    <div className="p-6 bg-white space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed font-medium">
                          Action verbs, also called dynamic verbs, are words that show physical or mental action. They are the most frequently used verbs in English and form the core of most sentences.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">📌 Physical vs Mental Actions</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Physical actions are movements you can see, like 'run', 'jump', 'eat', 'write'. Mental actions are thoughts and feelings you cannot see, like 'think', 'believe', 'remember', 'forget'. Both are action verbs because they show activity.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">💪 Why Action Verbs Matter</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Action verbs make sentences dynamic and interesting. They allow us to describe what's happening in detail. Without action verbs, we couldn't tell stories, give instructions, or explain processes.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">⏰ When to Use Action Verbs</h4>
                          <ul className="space-y-1 text-gray-700 text-sm">
                            <li>✓ When describing what someone/something is doing right now</li>
                            <li>✓ What they did in the past or will do in the future</li>
                            <li>✓ Their habits or regular activities</li>
                            <li>✓ Instructions, processes, stories, or narratives</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Real-World Examples */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, examples: !prev.examples }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-colors flex items-center justify-between font-semibold text-gray-800"
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span>📝</span> Real-World Examples (15 Sentences)
                    </span>
                    <span className={`transition-transform text-xl ${expandedSections.examples ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.examples && (
                    <div className="p-6 bg-white">
                      <div className="space-y-3">
                        {selectedType.examples && selectedType.examples.length > 0 ? (
                          selectedType.examples.slice(0, 15).map((ex, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
                              <p className="text-gray-800 font-medium text-base mb-2">{idx + 1}. {ex}</p>
                              <p className="text-gray-600 text-sm">
                                <span className="font-semibold">Context:</span> Example showing {selectedType.name.toLowerCase()} usage
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
                            <p>Loading examples from database...</p>
                            <div className="mt-3 space-y-2">
                              <p>• She wrote a beautiful letter to her grandmother. (Writing action)</p>
                              <p>• The children play in the park every afternoon. (Regular activity)</p>
                              <p>• I will travel to Japan next summer. (Future plan)</p>
                              <p>• He thinks carefully before making decisions. (Mental action)</p>
                              <p>• They are building a new community center. (Ongoing action)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 3: Grammar Rules */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, rules: !prev.rules }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 transition-colors flex items-center justify-between font-semibold text-yellow-800"
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span>✅</span> Grammar Rules (5 Essential Rules)
                    </span>
                    <span className={`transition-transform text-xl ${expandedSections.rules ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.rules && (
                    <div className="p-6 bg-white space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-5 rounded-r-lg">
                        <h4 className="font-bold text-green-700 mb-2 text-lg">Rule 1: Subject-Verb Agreement</h4>
                        <p className="text-gray-700 mb-3">The action verb must match the subject in number (singular or plural).</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-green-700 mb-1">✓ Correct:</p>
                            <p className="text-sm text-gray-700">He runs every morning.</p>
                            <p className="text-sm text-gray-700">They run every morning.</p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-red-700 mb-1">✗ Wrong:</p>
                            <p className="text-sm text-gray-700">He run every morning.</p>
                            <p className="text-sm text-gray-700">They runs every morning.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-5 rounded-r-lg">
                        <h4 className="font-bold text-blue-700 mb-2 text-lg">Rule 2: Tense Consistency</h4>
                        <p className="text-gray-700 mb-3">Keep action verbs in the same tense throughout a sentence or paragraph.</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-green-700 mb-1">✓ Correct:</p>
                            <p className="text-sm text-gray-700">She runs to the park and plays with friends.</p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-red-700 mb-1">✗ Wrong:</p>
                            <p className="text-sm text-gray-700">She runs to the park and played with friends.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 p-5 rounded-r-lg">
                        <h4 className="font-bold text-purple-700 mb-2 text-lg">Rule 3: Use Correct Participle Forms</h4>
                        <p className="text-gray-700 mb-3">Action verbs have different forms: base, past, past participle, present participle.</p>
                        <div className="bg-white p-3 rounded text-sm text-gray-700 space-y-1">
                          <p>• Run (base) / Ran (past) / Runs (3rd person) / Running (participle)</p>
                          <p>• Write / Wrote / Written / Writing</p>
                          <p>• Eat / Ate / Eaten / Eating</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-600 p-5 rounded-r-lg">
                        <h4 className="font-bold text-yellow-700 mb-2 text-lg">Rule 4: Negation Structure</h4>
                        <p className="text-gray-700 mb-3">Use 'do not/does not' or 'did not' for negation depending on tense.</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-green-700 mb-1">✓ Correct:</p>
                            <p className="text-sm text-gray-700">I don't run every day.</p>
                            <p className="text-sm text-gray-700">She doesn't play football.</p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-red-700 mb-1">✗ Wrong:</p>
                            <p className="text-sm text-gray-700">I not run every day.</p>
                            <p className="text-sm text-gray-700">She play not football.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-600 p-5 rounded-r-lg">
                        <h4 className="font-bold text-red-700 mb-2 text-lg">Rule 5: Question Formation</h4>
                        <p className="text-gray-700 mb-3">Form questions with Do/Does/Did + subject + base verb.</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-green-700 mb-1">✓ Correct:</p>
                            <p className="text-sm text-gray-700">Does she play football?</p>
                            <p className="text-sm text-gray-700">Did they run yesterday?</p>
                          </div>
                          <div className="bg-white p-3 rounded">
                            <p className="font-semibold text-red-700 mb-1">✗ Wrong:</p>
                            <p className="text-sm text-gray-700">Does she plays football?</p>
                            <p className="text-sm text-gray-700">They did ran yesterday?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 4: Common Mistakes */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, mistakes: !prev.mistakes }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-red-100 to-orange-200 hover:from-red-200 hover:to-orange-300 transition-colors flex items-center justify-between font-semibold text-red-800"
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span>❌</span> Common Mistakes (8 Errors to Avoid)
                    </span>
                    <span className={`transition-transform text-xl ${expandedSections.mistakes ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.mistakes && (
                    <div className="p-6 bg-white space-y-3">
                      {[
                        { num: 1, mistake: "Subject-Verb Disagreement", wrong: "He go to school", right: "He goes to school", tip: "3rd person singular needs -s" },
                        { num: 2, mistake: "Wrong Participle Form", wrong: "She has go to market", right: "She has gone to market", tip: "Have/has + past participle" },
                        { num: 3, mistake: "Mixing Tenses", wrong: "She ran to store and buys milk", right: "She ran to store and bought milk", tip: "Keep consistent tense" },
                        { num: 4, mistake: "Omitting Auxiliary Verbs", wrong: "I running to bus stop", right: "I am running to bus stop", tip: "Am/is/are + verb+ing" },
                        { num: 5, mistake: "Wrong Negation", wrong: "He no like playing football", right: "He doesn't like playing football", tip: "Use does/do + not" },
                        { num: 6, mistake: "Irregular Verb Error", wrong: "She goed to park", right: "She went to park", tip: "Learn irregular forms: go/went" },
                        { num: 7, mistake: "Using Past Participle Alone", wrong: "Yesterday I have wrote a letter", right: "Yesterday I wrote a letter", tip: "Past time = simple past" },
                        { num: 8, mistake: "Wrong Question Form", wrong: "Does she goes? / Do she go?", right: "Does she go?", tip: "Does + 3rd person + base verb" }
                      ].map((m, idx) => (
                        <div key={idx} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg hover:shadow-md transition-shadow">
                          <p className="font-bold text-red-700 mb-2">#{m.num} {m.mistake}</p>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white p-2 rounded">
                              <p className="font-semibold text-red-600">❌ Wrong:</p>
                              <p className="text-gray-700 font-mono">{m.wrong}</p>
                            </div>
                            <div className="bg-white p-2 rounded">
                              <p className="font-semibold text-green-600">✓ Correct:</p>
                              <p className="text-gray-700 font-mono">{m.right}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 mt-2 italic">💡 Tip: {m.tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 5: Practice Questions */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, practice: !prev.practice }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-100 to-teal-200 hover:from-cyan-200 hover:to-teal-300 transition-colors flex items-center justify-between font-semibold text-teal-800"
                  >
                    <span className="flex items-center gap-3 text-lg">
                      <span>🎯</span> Practice Questions (15 Total)
                    </span>
                    <span className={`transition-transform text-xl ${expandedSections.practice ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.practice && (
                    <div className="p-6 bg-white">
                      <div className="space-y-4">
                        {/* Easy Questions */}
                        <div>
                          <h4 className="font-bold text-lg text-green-700 mb-3">🟢 Easy Questions (5)</h4>
                          <div className="space-y-3">
                            {[
                              { q: "Which word is an action verb?", opts: ["beautiful", "run", "book", "blue"], ans: "B", exp: "'Run' shows action. Others are adjectives or nouns." },
                              { q: "Complete: 'She ___ to school every day.'", opts: ["walks", "walk", "walking", "walked"], ans: "A", exp: "3rd person singular present simple: walks" },
                              { q: "What is the past tense of 'eat'?", opts: ["eats", "eating", "eaten", "ate"], ans: "D", exp: "Irregular verb: eat → ate" },
                              { q: "Which is NOT an action verb?", opts: ["jump", "think", "beautiful", "write"], ans: "C", exp: "'Beautiful' is an adjective." },
                              { q: "Choose the correct form: 'They ___ running.'", opts: ["is", "are", "am", "been"], ans: "B", exp: "Plural 'they' needs 'are'" }
                            ].map((item, i) => (
                              <div key={i} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                <p className="font-semibold text-gray-800 mb-2">{i+1}. {item.q}</p>
                                <p className="text-sm text-gray-700 text-sm mb-2">
                                  <span className="font-semibold">Answer:</span> {item.ans} - {item.exp}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Medium Questions */}
                        <div>
                          <h4 className="font-bold text-lg text-yellow-700 mb-3">🟡 Medium Questions (5)</h4>
                          <div className="space-y-3">
                            {[
                              { q: "Choose correct: 'They have ___ for two hours.'", opts: ["worked", "work", "working", "works"], ans: "A", exp: "Have + past participle: have worked" },
                              { q: "Which has correct subject-verb agreement?", opts: ["The students is", "The students are", "The student am", "None"], ans: "B", exp: "Plural needs 'are'" },
                              { q: "Identify the mistake: 'She no like playing.'", opts: ["No error", "Should be doesn't like", "Should be liking", "Wrong subject"], ans: "B", exp: "Use does + not, not 'no'" },
                              { q: "Complete: 'I am ___ a letter right now.'", opts: ["write", "wrote", "writing", "writes"], ans: "C", exp: "Am + verb+ing: am writing" },
                              { q: "Which shows correct tense consistency?", opts: ["ran and buys", "runs and bought", "ran and bought", "running and buy"], ans: "C", exp: "Both past tense: consistent" }
                            ].map((item, i) => (
                              <div key={i} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                <p className="font-semibold text-gray-800 mb-2">{i+1}. {item.q}</p>
                                <p className="text-sm text-gray-700 mb-2">
                                  <span className="font-semibold">Answer:</span> {item.ans} - {item.exp}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hard Questions */}
                        <div>
                          <h4 className="font-bold text-lg text-red-700 mb-3">🔴 Hard Questions (5)</h4>
                          <div className="space-y-3">
                            {[
                              { q: "Identify ALL action verbs in: 'She studied, passed, and celebrated.'", opts: ["studied, passed", "passed, celebrated", "studied, passed, celebrated", "only celebrated"], ans: "C", exp: "All three are action verbs" },
                              { q: "Which correctly uses irregular verbs?", opts: ["He goed and buyed", "He went and bought", "He goes and buys", "He going and buying"], ans: "B", exp: "go/went, buy/bought" },
                              { q: "What tense is 'By next month, I will have completed'?", opts: ["Future simple", "Present perfect", "Future perfect", "Past perfect"], ans: "C", exp: "'Will have completed' = Future perfect" },
                              { q: "Which forms a question correctly?", opts: ["Does she playing?", "Do she plays?", "Does she play?", "She does play?"], ans: "C", exp: "Does + subject + base verb" },
                              { q: "Analyze: 'While they were playing, she entered.' Tenses?", opts: ["Past simple only", "Past continuous and past simple", "Both future", "Both present"], ans: "B", exp: "Were playing = continuous, entered = simple past" }
                            ].map((item, i) => (
                              <div key={i} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <p className="font-semibold text-gray-800 mb-2">{i+1}. {item.q}</p>
                                <p className="text-sm text-gray-700 mb-2">
                                  <span className="font-semibold">Answer:</span> {item.ans} - {item.exp}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Writing & Reading Exercises */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Writing Exercise */}
                <div className="border-2 border-yellow-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, writing: !prev.writing }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 transition-colors flex items-center justify-between font-semibold text-yellow-800"
                  >
                    <span className="flex items-center gap-2">
                      <span>✍️</span> Writing Exercise
                    </span>
                    <span className={`transition-transform ${expandedSections.writing ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.writing && (
                    <div className="p-6 bg-orange-50 space-y-3">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700 mb-2">📝 Task:</p>
                        <p className="text-gray-700 text-sm mb-3">Write a short story (8-10 sentences) about your day or an adventure using at least 12 different action verbs.</p>
                        <p className="text-gray-700 text-sm mb-3"><span className="font-semibold">Guidelines:</span> Use different tenses • Include both physical and mental actions • Ensure subject-verb agreement • Keep sentences clear</p>
                        <p className="font-semibold text-gray-800 mb-2">📋 Sample Answer:</p>
                        <p className="text-gray-700 text-sm italic">
                          "This morning, I woke up early and rushed to the kitchen. I prepared breakfast and ate quickly. Then I read the newspaper while drinking coffee. After that, I walked to the park and played with my dog. We ran around for thirty minutes, and I felt happy. Later, I returned home and started working on my project. I typed for two hours and finally completed it. Now I am relaxing and thinking about my successful day."
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reading Exercise */}
                <div className="border-2 border-teal-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, reading: !prev.reading }))}
                    className="w-full px-6 py-4 bg-gradient-to-r from-teal-100 to-teal-200 hover:from-teal-200 hover:to-teal-300 transition-colors flex items-center justify-between font-semibold text-teal-800"
                  >
                    <span className="flex items-center gap-2">
                      <span>📖</span> Reading Exercise
                    </span>
                    <span className={`transition-transform ${expandedSections.reading ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedSections.reading && (
                    <div className="p-6 bg-blue-50 space-y-3">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                        <p className="font-bold text-blue-700 mb-2">📖 Passage to Read:</p>
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          "Sarah decided to visit the museum on Saturday morning. She woke up early, packed her bag, and took the bus downtown. The museum displayed ancient artifacts from different civilizations. Sarah walked through each gallery and studied the exhibits carefully. She photographed her favorite pieces and wrote notes about their history. At lunchtime, she sat in the café and enjoyed a sandwich. After lunch, she continued exploring the museum and discovered a special exhibition about dinosaurs. She spent hours examining fossils and reading the descriptions."
                        </p>
                        <p className="font-semibold text-gray-800 mb-2">❓ Questions:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• How many action verbs can you find? (Answer: 21)</li>
                          <li>• Which verbs describe physical movements? (Answer: walked, photographed, examined, etc.)</li>
                          <li>• Which describe mental actions? (Answer: decided, studied, discovered, etc.)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Resources Section */}
              <div className="border-2 border-rose-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <button
                  onClick={() => setExpandedSections(prev => ({ ...prev, videos: !prev.videos }))}
                  className="w-full px-6 py-4 bg-gradient-to-r from-rose-100 to-rose-200 hover:from-rose-200 hover:to-rose-300 transition-colors flex items-center justify-between font-semibold text-rose-800"
                >
                  <span className="flex items-center gap-3 text-lg">
                    <span>🎬</span> Video Resources (4 Tutorials)
                  </span>
                  <span className={`transition-transform text-xl ${expandedSections.videos ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedSections.videos && (
                  <div className="p-6 bg-purple-50 space-y-3">
                    {[
                      { title: "Action Verbs Explained - Complete Beginner Guide", channel: "English with Lucy", duration: "8 mins", topics: "Definition, examples, physical vs mental" },
                      { title: "Action Verbs vs Linking Verbs - Key Differences", channel: "EnglishClass101.com", duration: "12 mins", topics: "Comparison, examples, identification" },
                      { title: "Action Verb Tenses - Past, Present, Future", channel: "BBC Learning English", duration: "10 mins", topics: "Tense forms, agreement, structure" },
                      { title: "Common Mistakes with Action Verbs", channel: "Learn English Lab", duration: "9 mins", topics: "Errors, corrections, tips" }
                    ].map((vid, i) => (
                      <div key={i} className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                        <p className="font-bold text-purple-700 mb-1">{i+1}. {vid.title}</p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Channel:</span> {vid.channel} • <span className="font-semibold">Duration:</span> {vid.duration}
                        </p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Topics:</span> {vid.topics}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Downloads Section */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-2 border-teal-300">
                <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📥</span>Download Learning Material
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { format: "PDF", icon: "📄", desc: "Printable format with all content", size: "2.5 MB" },
                    { format: "DOCX", icon: "📝", desc: "Editable Word document", size: "1.8 MB" },
                    { format: "JSON", icon: "⚙️", desc: "Structured data format", size: "450 KB" }
                  ].map((opt, i) => (
                    <button key={i} className="bg-white p-4 rounded-lg hover:shadow-md transition-all hover:scale-105 text-center">
                      <p className="text-3xl mb-2">{opt.icon}</p>
                      <p className="font-bold text-gray-800">{opt.format}</p>
                      <p className="text-xs text-gray-600 mb-2">{opt.desc}</p>
                      <p className="text-xs font-semibold text-gray-500">{opt.size}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-gray-100 to-gray-200 border-t-2 border-gray-300 p-6 flex gap-3 flex-wrap">
              <button
                onClick={() => setShowComprehensiveModal(false)}
                className="flex-1 min-w-[150px] px-6 py-3 bg-white border-2 border-gray-400 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                ← Close
              </button>
              <button
                onClick={() => {
                  scrollToSection('quiz');
                  setShowComprehensiveModal(false);
                }}
                className="flex-1 min-w-[150px] px-6 py-3 bg-gradient-to-r from-teal-500 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base"
              >
                📊 Take Full Quiz
              </button>
              <button className="flex-1 min-w-[150px] px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm md:text-base">
                📥 Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes fade-in {from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);} } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
      
      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMoreModal} 
        onClose={() => setShowLearnMoreModal(false)} 
        selectedItem={learnMoreData}
        title="Verbs"
      />
    </div>
  );
};

export default VerbsDetail;
