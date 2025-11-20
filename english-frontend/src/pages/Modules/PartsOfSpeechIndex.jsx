import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../apiClient';

const PartsOfSpeechIndex = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/grammar/parts-of-speech');
      setParts(response.data);
    } catch (err) {
      console.error('Failed to fetch parts of speech:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parts of speech...</p>
        </div>
      </div>
    );
  }

  const partRoutes = {
    'Noun': '/modules/noun',
    'Pronoun': '/modules/pronoun',
    'Verb': '/modules/verbs',
    'Adjective': '/modules/adjective',
    'Adverb': '/modules/adverb',
    'Preposition': '/modules/preposition',
    'Conjunction': '/modules/conjunction',
    'Interjection': '/modules/interjection'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center space-x-1 text-white hover:text-yellow-200 transition-colors text-sm font-semibold"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">Back</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-5xl animate-bounce">📚</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">Parts of Speech</h1>
              <p className="text-yellow-100 text-sm md:text-base mt-2 font-semibold">Master the 8 fundamental building blocks of English grammar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Introduction */}
        <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl shadow-lg p-8 mb-16 border-2 border-white/50">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-rose-500 bg-clip-text text-transparent mb-4">What Are Parts of Speech?</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Parts of speech are categories of words defined by their grammatical function in a sentence. Understanding these eight categories helps you construct grammatically correct and meaningful sentences. Each part plays a unique role in communication.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-xl border-2 border-teal-200/50 backdrop-blur-sm">
              <p className="font-bold text-teal-700 mb-3 text-lg">✅ Why Learn Parts of Speech?</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2"><span className="text-teal-600">▸</span> Build correct grammar habits</li>
                <li className="flex items-center gap-2"><span className="text-teal-600">▸</span> Improve writing clarity</li>
                <li className="flex items-center gap-2"><span className="text-teal-600">▸</span> Enhance communication skills</li>
                <li className="flex items-center gap-2"><span className="text-teal-600">▸</span> Master advanced grammar concepts</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 p-6 rounded-xl border-2 border-rose-200/50 backdrop-blur-sm">
              <p className="font-bold text-rose-700 mb-3 text-lg">🎯 What You'll Learn</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2"><span className="text-rose-600">▸</span> Definition and importance of each part</li>
                <li className="flex items-center gap-2"><span className="text-rose-600">▸</span> Types and categories</li>
                <li className="flex items-center gap-2"><span className="text-rose-600">▸</span> Grammar rules and tips</li>
                <li className="flex items-center gap-2"><span className="text-rose-600">▸</span> Examples, exercises, and quizzes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Parts Grid */}
        <h2 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-teal-600 to-rose-500 bg-clip-text text-transparent">Explore Each Part of Speech</h2>
        <p className="text-center text-gray-600 font-semibold mb-12 text-lg">Click on any card to dive deep into comprehensive lessons and quizzes</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {parts.map((part) => {
            const route = partRoutes[part.name] || `/modules/${part.name.toLowerCase()}`;
            
            // Modern color scheme based on website theme
            const colorMap = {
              'Noun': { 
                gradient: 'from-teal-400/20 to-teal-500/10', 
                border: 'from-teal-400 to-teal-600',
                textGrad: 'from-teal-600 to-teal-700',
                icon: '📦',
                accentColor: 'teal'
              },
              'Pronoun': { 
                gradient: 'from-teal-400/10 to-rose-400/20', 
                border: 'from-teal-400 to-rose-400',
                textGrad: 'from-teal-600 to-rose-600',
                icon: '🔄',
                accentColor: 'rose'
              },
              'Verb': { 
                gradient: 'from-rose-400/20 to-rose-500/10', 
                border: 'from-rose-400 to-rose-600',
                textGrad: 'from-rose-600 to-rose-700',
                icon: '⚡',
                accentColor: 'rose'
              },
              'Adjective': { 
                gradient: 'from-yellow-300/10 to-rose-400/20', 
                border: 'from-yellow-300 to-rose-400',
                textGrad: 'from-yellow-600 to-rose-600',
                icon: '✨',
                accentColor: 'yellow'
              },
              'Adverb': { 
                gradient: 'from-rose-400/10 to-yellow-300/20', 
                border: 'from-rose-400 to-yellow-300',
                textGrad: 'from-rose-600 to-yellow-600',
                icon: '🎯',
                accentColor: 'rose'
              },
              'Preposition': { 
                gradient: 'from-teal-500/10 to-yellow-300/20', 
                border: 'from-teal-500 to-yellow-300',
                textGrad: 'from-teal-700 to-yellow-600',
                icon: '📍',
                accentColor: 'teal'
              },
              'Conjunction': { 
                gradient: 'from-yellow-300/10 to-teal-400/20', 
                border: 'from-yellow-300 to-teal-400',
                textGrad: 'from-yellow-600 to-teal-600',
                icon: '🔗',
                accentColor: 'yellow'
              },
              'Interjection': { 
                gradient: 'from-rose-400/20 to-yellow-300/10', 
                border: 'from-rose-400 to-yellow-300',
                textGrad: 'from-rose-600 to-yellow-600',
                icon: '💬',
                accentColor: 'rose'
              }
            };

            const color = colorMap[part.name] || colorMap['Noun'];

            return (
              <button
                key={part.id}
                onClick={() => navigate(route)}
                className={`group relative bg-gradient-to-br ${color.gradient} rounded-2xl shadow-lg hover:shadow-2xl border-2 bg-gradient-to-br ${color.border} p-6 md:p-7 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 text-left cursor-pointer overflow-hidden`}
              >
                {/* Animated gradient border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                
                {/* Card background with glassmorphism */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl -z-10"></div>

                {/* Decorative glow on hover */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${color.border} rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300 -z-20 group-hover:animate-pulse`}></div>

                {/* Icon with background */}
                <div className={`bg-gradient-to-br ${color.border} rounded-xl p-4 mb-4 w-fit shadow-lg group-hover:shadow-xl group-hover:scale-125 transition-all duration-300`}>
                  <span className="text-4xl block">{part.icon || color.icon}</span>
                </div>

                {/* Part name with gradient text */}
                <h3 className={`text-xl md:text-2xl font-black bg-gradient-to-r ${color.textGrad} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform origin-left`}>
                  {part.name}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-700 line-clamp-2 mb-5 leading-relaxed font-medium">
                  {part.definition}
                </p>

                {/* CTA Footer */}
                <div className="flex items-center justify-between text-xs md:text-sm font-bold">
                  <span className={`bg-gradient-to-r ${color.textGrad} bg-clip-text text-transparent`}>Learn & Practice</span>
                  <span className="text-lg group-hover:translate-x-2 transition-transform duration-300 group-hover:text-yellow-400">→</span>
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color.border} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </button>
            );
          })}
        </div>

        {/* Learning Path */}
        <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl shadow-xl p-10 mb-16 border-2 border-white/50">
          <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center">
            <span className="text-4xl mr-4 animate-bounce">🎓</span>
            <span className="bg-gradient-to-r from-teal-600 to-rose-500 bg-clip-text text-transparent">Recommended Learning Path</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-teal-700 mb-6 text-center">Beginner Friendly Order</h3>
              <ol className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">1</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-teal-700">Noun</strong> - The foundation. Understand what words name things.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">2</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-teal-700">Verb</strong> - The action. Learn what words show action or state.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">3</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-teal-700">Adjective</strong> - The descriptor. Add detail to nouns.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">4</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-teal-700">Adverb</strong> - The modifier. Describe verbs and adjectives.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">5</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-teal-700">Pronoun</strong> - The substitute. Replace nouns for fluency.</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold text-rose-700 mb-6 text-center">Continue With...</h3>
              <ol className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">6</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-rose-700">Preposition</strong> - Show relationships between words.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">7</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-rose-700">Conjunction</strong> - Connect ideas and clauses.</span>
                </li>
                <li className="flex items-start gap-4 group cursor-pointer">
                  <span className="bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">8</span>
                  <span className="group-hover:translate-x-2 transition-transform"><strong className="text-rose-700">Interjection</strong> - Express emotion and add personality.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 rounded-2xl shadow-2xl p-12 text-white text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 drop-shadow-lg">Ready to Master English Grammar?</h3>
            <p className="text-yellow-100 mb-8 max-w-2xl mx-auto text-lg font-semibold">Pick any part of speech above to start learning with definitions, examples, exercises, and interactive quizzes. Your journey to fluency starts here!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/modules/learn-english')} 
                className="bg-gradient-to-r from-yellow-300 to-yellow-200 text-gray-800 px-8 py-4 rounded-xl font-bold hover:from-yellow-200 hover:to-yellow-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                📚 View All Lessons
              </button>
              <button 
                onClick={() => navigate('/modules/grammar-hub')} 
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg border-2 border-white/50"
              >
                ✨ Grammar Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsOfSpeechIndex;
