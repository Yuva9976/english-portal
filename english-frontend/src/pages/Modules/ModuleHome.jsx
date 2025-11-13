import React from 'react';
import { useNavigate } from 'react-router-dom';
import grammarData from './grammarTopicsData';

const skills = [
  {
    id: 'listening',
    title: 'Listening',
    icon: '🎧',
    summary: 'Practice understanding spoken English with audio activities.',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    icon: '💬',
    summary: 'Build fluency with dialogues, role-plays, and pronunciation.',
  },
  {
    id: 'reading',
    title: 'Reading',
    icon: '📖',
    summary: 'Improve comprehension with engaging texts and questions.',
  },
  {
    id: 'writing',
    title: 'Writing',
    icon: '✍️',
    summary: 'Learn to write clear sentences and well-structured paragraphs.',
  },
];

export default function ModuleHome() {
  const navigate = useNavigate();

  const goToSkill = (slug, practice=false) => {
    const url = `/modules/learn-english/${slug}${practice ? '?practice=1' : ''}`;
    navigate(url);
  };

  const grammarTopics = (grammarData.categories.find(c => c.id === 'parts-of-speech')?.topics || [])
    .concat(grammarData.categories.find(c => c.id === 'verb-tenses')?.topics || [])
    .slice(0, 8); // show a compact set

  return (
    <div className="min-h-screen bg-white">
      {/* Intro */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-10 lg:py-12 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">English Grammar</h1>
          <p className="text-white/90 max-w-3xl">
            Grammar is the way we arrange words to make proper sentences. Understanding grammar helps you speak and write English correctly and clearly.
          </p>
        </div>
      </section>

      {/* LSRW Skills (compact cards) */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Core Skills (LSRW)</h2>
            <p className="text-sm text-gray-500">Click a skill to learn or start a quick practice</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {skills.map((s) => (
              <div key={s.id} className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 flex flex-col justify-between">
                <div className="flex items-start gap-2">
                  <span className="text-2xl md:text-3xl" aria-hidden>{s.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{s.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-snug line-clamp-2">{s.summary}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => goToSkill(s.id, false)} className="flex-1 text-xs md:text-sm px-3 py-2 rounded-md border border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold">Learn</button>
                  <button onClick={() => goToSkill(s.id, true)} className="flex-1 text-xs md:text-sm px-3 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 font-semibold">Take a Quiz</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theory: Key Grammar Topics (smaller cards) */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Key Grammar Topics</h2>
            <a href="/modules/grammar-hub" className="text-sm text-teal-700 font-semibold hover:underline">Browse all →</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {grammarTopics.map((t, idx) => (
              <div key={t.id + idx} className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-2xl" aria-hidden>{t.icon || '📘'}</span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{t.title}</h3>
                    {t.subtitle && <p className="text-xs text-gray-500 truncate">{t.subtitle}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">{t.description || 'Learn rules, examples, and usage with clear explanations.'}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => navigate('/modules/grammar-hub')} className="text-xs px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">View Details</button>
                  <button onClick={() => navigate('/modules/learn-english/grammar?practice=1')} className="text-xs px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold">Quick Quiz</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice band */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="rounded-lg border border-gray-200 p-4 md:p-6 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Practice & Quizzes</h3>
                <p className="text-sm text-gray-600">Reinforce learning with short quizzes for each skill and topic.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate('/modules/learn-english/grammar?practice=1')} className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 font-semibold text-sm">Grammar Quiz</button>
                <button onClick={() => goToSkill('listening', true)} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm">Listening Quiz</button>
                <button onClick={() => goToSkill('speaking', true)} className="px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 font-semibold text-sm">Speaking Quiz</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips/FAQ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Study a little every day. Consistency beats cramming.</li>
                <li>Practice with context—complete exercises after reading theory.</li>
                <li>Record your voice to improve speaking and pronunciation.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">FAQ</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><span className="font-semibold">What should I learn first?</span> Start with parts of speech, then tenses.
                </p>
                <p><span className="font-semibold">How do I track progress?</span> Finish quizzes; we’ll add progress tracking next.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
