import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LearnMoreModal from '../../components/LearnMoreModal';

const AdverbsDetail = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [writingRevealed, setWritingRevealed] = useState(false);
  const [readingRevealed, setReadingRevealed] = useState(false);

  // Learn More Modal States
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📖' },
    { id: 'types', name: 'Categories', icon: '📚' },
    { id: 'writing', name: 'Writing', icon: '✍️' },
    { id: 'reading', name: 'Reading', icon: '📘' },
    { id: 'resources', name: 'Resources', icon: '🔗' }
  ];

  const types = [
    { id: 1, type: 'Manner', icon: '⚡', color: 'purple', definition: 'Describes how an action is done.', examples: ['He ran <strong>quickly</strong>.', 'Speak <strong>softly</strong>.'], sampleWords: ['quickly', 'slowly', 'well'] },
    { id: 2, type: 'Time', icon: '⏰', color: 'blue', definition: 'Shows when something happens.', examples: ['I will call <strong>tomorrow</strong>.', 'She arrived <strong>yesterday</strong>.'], sampleWords: ['now', 'then', 'yesterday'] },
    { id: 3, type: 'Place', icon: '📍', color: 'green', definition: 'Indicates where an action happens.', examples: ['Look <strong>here</strong>.', 'They live <strong>nearby</strong>.'], sampleWords: ['here', 'there', 'everywhere'] }
  ];

  const tips = [
    { icon: '✅', type: 'DO', text: 'Place adverbs near the verb they modify.', color: 'green' },
    { icon: '❌', type: "DON'T", text: 'Avoid splitting subject and verb with adverbs unnecessarily.', color: 'red' }
  ];

  const videos = [
    { id: 1, title: 'Adverbs: Basics', embedId: 'dQw4w9WgXcQ', description: 'When and how to use adverbs.' }
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Ensure page is at top when this detail view mounts (fixes browser scroll retention)
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Sticky Header (Noun/Pronoun/Adjective/Verb-style) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.history.state && window.history.state.idx > 0) {
                  navigate(-1);
                } else {
                  navigate('/modules/grammar-hub');
                }
              }}
              className="text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-all mr-2"
              title="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl md:text-3xl">🕑</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">Adverbs</h1>
            <span className="text-base text-teal-600 ml-2">Modify verbs, adjectives and other adverbs</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${activeSection === section.id
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

      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 mt-4">
        <section id="overview" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl shadow-sm border border-slate-200 p-3 md:p-4 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-2 md:gap-3 mb-2">
              <span className="text-xl md:text-2xl flex-shrink-0 pt-0.5">📖</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-bold text-slate-800 leading-tight">What is an adverb?</h2>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2 pl-7 md:pl-8">
              An <strong>adverb</strong> modifies a verb, adjective, or another adverb. It answers how, when, where, or how often.
            </p>

            <div className="grid grid-cols-2 gap-2 pl-0">
              <div className="bg-white border border-blue-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-blue-700">💡 Why Learn?</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Makes actions and descriptions precise.</p>
              </div>

              <div className="bg-white border border-purple-200 rounded-lg p-2 md:p-2.5">
                <p className="text-xs md:text-xs font-semibold text-purple-700">🎯 Quick Fact</p>
                <p className="text-xs text-slate-600 leading-tight mt-0.5">Many adverbs end in <code>-ly</code>, but not all.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="types" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
            <span className="text-3xl mr-2">📚</span>
            Adverb Categories
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {types.map(t => (
              <div key={t.id} className={`relative rounded-3xl shadow-2xl transition-all duration-300 flex flex-col h-full p-0 group bg-white/60 backdrop-blur-lg border border-${t.color}-200 hover:border-${t.color}-400 hover:shadow-[0_8px_32px_0_rgba(168,139,250,0.15)] hover:ring-2 hover:ring-${t.color}-300`} style={{ borderTop: `6px solid var(--tw-color-${t.color}-400)` }}>
                <div className="absolute top-4 right-4 opacity-10 text-7xl pointer-events-none select-none">{t.icon}</div>
                <div className="flex items-center gap-3 px-7 pt-8 pb-4 z-10">
                  <span className={`text-4xl drop-shadow-lg`} style={{ color: `var(--tw-color-${t.color}-500)` }}>{t.icon}</span>
                  <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight drop-shadow">{t.type}</h3>
                </div>
                <div className="px-7 pb-8 flex-1 flex flex-col z-10">
                  <p className="text-base text-gray-700 leading-relaxed mb-5 font-semibold bg-white/70 rounded-xl px-3 py-2 shadow-sm">{t.definition}</p>
                  <div className="space-y-4 mb-5">
                    {t.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="bg-gray-50 px-2 py-1.5 rounded border-l-2 border-gray-300">
                        <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: ex }} />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-auto mb-3">
                    {t.sampleWords.slice(0, 4).map((w, idx) => (
                      <span key={idx} className={`bg-${t.color}-100 text-${t.color}-700 px-2 py-0.5 rounded-full text-sm font-medium`}>{w}</span>
                    ))}
                  </div>
                  <button onClick={() => { setSelectedItem(t); setShowLearnMoreModal(true); }} className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-rose-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"><span>📚</span> Learn More <span>→</span></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-5 md:p-6 border border-green-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">✍️</span>Writing Exercise</h2>
            <p className="text-gray-600 text-sm mb-4">Practice placing adverbs naturally in sentences</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">📝 Your Task:</h3>
                <p className="text-gray-700 text-sm">Rewrite short sentences by adding suitable adverbs of manner, time, or frequency.</p>
              </div>

              <textarea className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:border-green-500 focus:outline-none min-h-[150px]" placeholder="Type your answers here..." defaultValue={`He speaks. → He speaks clearly.`} />

              <button onClick={() => setWritingRevealed(!writingRevealed)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition-colors mb-3">{writingRevealed ? 'Hide' : 'Show'} Sample Answer</button>

              {writingRevealed && (
                <div className="bg-green-50 border border-green-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">✓ Sample Answer:</h4>
                  <p className="text-sm text-gray-700">He speaks <strong>clearly</strong>. She <strong>often</strong> visits her family.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="reading" className="mb-12 scroll-mt-32">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-5 md:p-6 border border-teal-300">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">📚</span>Reading Exercise</h2>
            <p className="text-gray-600 text-sm mb-4">Find adverbs in the passage</p>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded-r-lg mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">📖 Passage:</h3>
                <p className="text-gray-700 text-base leading-relaxed">She <strong className="text-purple-600">usually</strong> arrives <strong className="text-blue-600">early</strong> and speaks <strong className="text-pink-600">softly</strong> to the guests.</p>
              </div>

              <button onClick={() => setReadingRevealed(!readingRevealed)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">{readingRevealed ? 'Hide' : 'Show'} Adverb Highlights</button>

              {readingRevealed && (
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">✓ Adverbs Identified:</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="bg-purple-100 p-2 rounded"><span className="font-semibold text-purple-700">Frequency:</span><p className="text-gray-700">usually</p></div>
                    <div className="bg-blue-100 p-2 rounded"><span className="font-semibold text-blue-700">Manner/Time:</span><p className="text-gray-700">early, softly</p></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="resources" className="mb-12 scroll-mt-32">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 flex items-center"><span className="text-2xl mr-2">🔗</span>Additional Resources</h2>
            <p className="text-gray-600 text-sm mb-5">Explore further adverb usage</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[{ title: 'Adverb Guide', icon: '📖', url: 'https://www.englishclub.com/grammar/adverbs.htm', color: 'blue' }].map((resource, index) => (
                <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className={`bg-gradient-to-br from-${resource.color}-50 to-${resource.color}-100 rounded-lg p-4 border border-${resource.color}-300 hover:shadow-md transition-all`}>
                  <span className="text-2xl block mb-2">{resource.icon}</span>
                  <h3 className={`font-semibold text-${resource.color}-700 text-base mb-1`}>{resource.title}</h3>
                  <p className="text-sm text-gray-600">Explore →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-xl shadow-md p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">🎓 Ready to practice?</h3>
          <p className="text-sm mb-4 text-blue-100">Try quizzes and exercises to sharpen adverb skills.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/modules/grammar-hub')} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">Grammar Hub</button>
            <button onClick={() => navigate('/modules/learn-english')} className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg">All Lessons</button>
          </div>
        </div>
      </div>

      <style>{`@keyframes fade-in {from {opacity: 0; transform: translateY(-10px);} to {opacity: 1; transform: translateY(0);} } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>

      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={showLearnMoreModal}
        onClose={() => setShowLearnMoreModal(false)}
        selectedItem={selectedItem}
        title="Adverbs"
      />
    </div>
  );
};

export default AdverbsDetail;
