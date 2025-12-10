import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarQuiz from '../../components/GrammarQuiz';

const skillIcons = {
  'Grammar': '📚',
  'Vocabulary': '💎',
  'Pronunciation': '🔊',
  'Listening': '👂',
  'Reading': '👁️',
  'Writing': '✏️',
  'Speaking': '🗣️'
};

const skillDescriptions = {
  'Grammar': 'Master English grammar rules, tenses, and sentence structure.',
  'Vocabulary': 'Build your vocabulary with essential words, phrases, and idioms.',
  'Pronunciation': 'Learn correct pronunciation, stress patterns, and intonation.',
  'Listening': 'Improve comprehension with real conversations and audio exercises.',
  'Reading': 'Enhance reading skills with engaging stories and comprehension tasks.',
  'Writing': 'Develop writing skills from paragraphs to essays and formal letters.',
  'Speaking': 'Practice everyday conversations, dialogues, and speaking confidence.'
};

// Fixed skills list (not loaded from API)
const defaultSkills = [
  { name: 'Grammar', slug: 'grammar' },
  { name: 'Listening', slug: 'listening' },
  { name: 'Pronunciation', slug: 'pronunciation' },
  { name: 'Reading', slug: 'reading' },
  { name: 'Speaking', slug: 'speaking' },
  { name: 'Vocabulary', slug: 'vocabulary' }
];

export default function LearnEnglish() {
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <span className="text-5xl animate-bounce">🌟</span>
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="text-teal-600">Master </span>
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent">English</span>
            <span className="text-rose-400"> Skills</span>
          </h1>
          <p className="text-lg text-gray-700 font-semibold mb-2">
            6 Core Skills. Interactive Learning. Your Success.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from Grammar, Vocabulary, Pronunciation, Listening, Reading, and Speaking to become fluent in English.
          </p>
        </div>

        {/* Skills Grid - Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {defaultSkills.map((skill) => (
            <div
              key={skill.slug}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-200 transition-all duration-300 border-2 border-gray-100 hover:border-teal-400 overflow-hidden transform hover:scale-105 mx-auto"
              style={{ width: '380px' }}
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400"></div>
              
              {/* Card Content */}
              <div className="p-5">
                {/* Icon & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">{skillIcons[skill.name] || '📘'}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-rose-400 group-hover:bg-clip-text transition-all duration-300">
                      {skill.name}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {skillDescriptions[skill.name]}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (skill.name === 'Grammar') {
                        navigate('/modules/grammar-hub');
                      } else {
                        navigate(`/modules/learn-english/${skill.slug}`);
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs font-bold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-1 group/btn"
                  >
                    <span className="text-sm">📖</span>
                    <span>Learn</span>
                  </button>
                  <button
                    onClick={() => {
                      if (skill.name === 'Grammar') {
                        setShowQuiz(true);
                      } else {
                        navigate(`/modules/learn-english/${skill.slug}?practice=1`);
                      }
                    }}
                    className="flex-1 px-3 py-2 text-xs font-bold bg-gradient-to-r from-teal-600 to-rose-400 text-white rounded-lg hover:shadow-lg hover:shadow-teal-200 transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <span className="text-sm">🎯</span>
                    <span>Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grammar Quiz Modal */}
        {showQuiz && <GrammarQuiz onClose={() => setShowQuiz(false)} />}

        {/* How It Works Section */}
        <div className="bg-white rounded-xl shadow-lg p-10 mb-10 border-2 border-gray-100">
          <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 bg-clip-text text-transparent mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '1', icon: '🎓', title: 'Choose a Skill', desc: 'Pick from 6 core English learning areas that match your goals' },
              { num: '2', icon: '💡', title: 'Learn & Practice', desc: 'Engage with interactive lessons and hands-on exercises' },
              { num: '3', icon: '⭐', title: 'Test & Progress', desc: 'Track your growth and earn achievements' }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                {/* Connector line for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-20px)] h-1 bg-gradient-to-r from-teal-400 to-rose-400" style={{zIndex: 0}}></div>
                )}
                
                <div className="text-center relative z-10 bg-gradient-to-br from-white to-teal-50 rounded-xl p-6 border-2 border-gray-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg font-bold text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">
                    {item.num}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{item.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-rose-400 group-hover:bg-clip-text transition-all duration-300">{item.title}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 mb-10">
          <h2 className="text-3xl font-black text-gray-800 mb-6 text-center">
            <span className="text-3xl mr-2">💡</span>
            Learning Tips for Success
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '⏱️', title: 'Daily Practice', desc: 'Spend 15-30 minutes every day. Consistency is key!' },
              { icon: '🎯', title: 'Set Clear Goals', desc: 'Define what you want to achieve in English.' },
              { icon: '📈', title: 'Track Progress', desc: 'Monitor your growth through our dashboard.' },
              { icon: '✅', title: 'Embrace Mistakes', desc: 'Errors are learning opportunities!' },
              { icon: '🔊', title: 'Active Listening', desc: 'Engage with audio and real conversations.' },
              { icon: '✍️', title: 'Practice Writing', desc: 'Write daily to solidify your learning.' }
            ].map((tip, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-50 to-rose-50 rounded-lg p-4 border-l-4 border-teal-600 hover:border-rose-400 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">{tip.icon}</div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-800 mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-2">Ready to Transform Your English?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">Start your learning journey today and join thousands of successful learners worldwide.</p>
          <button 
            onClick={() => navigate('/modules/grammar-hub')}
            className="bg-yellow-300 text-gray-800 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            ✨ Begin Learning Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
