import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GrammarQuiz from '../../components/GrammarQuiz';

const skillIcons = {
  'Grammar': '📒',
  'Vocabulary': '📚',
  'Pronunciation': '👄',
  'Listening': '🎧',
  'Reading': '📖',
  'Writing': '✍️',
  'Speaking': '💬'
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-teal-700 mb-4">
            Learn English
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Master English through comprehensive lessons and interactive exercises
          </p>
          <p className="text-gray-600">
            Choose a skill area below to begin your learning journey
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {defaultSkills.map((skill) => (
            <div
              key={skill.slug}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-teal-400"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{skillIcons[skill.name] || '📘'}</span>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {skill.name}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {skillDescriptions[skill.name]}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      if (skill.name === 'Grammar') {
                        navigate('/modules/grammar-hub');
                      } else {
                        navigate(`/modules/learn-english/${skill.slug}`);
                      }
                    }}
                    className="flex-1 px-4 py-3 text-sm font-semibold border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition flex items-center justify-center gap-2"
                  >
                    <span>📖</span>
                    <span>Start Learning</span>
                  </button>
                  <button
                    onClick={() => {
                      if (skill.name === 'Grammar') {
                        setShowQuiz(true);
                      } else {
                        navigate(`/modules/learn-english/${skill.slug}?practice=1`);
                      }
                    }}
                    className="flex-1 px-4 py-3 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center justify-center gap-2"
                  >
                    <span>🎯</span>
                    <span>Take Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grammar Quiz Modal */}
        {showQuiz && <GrammarQuiz onClose={() => setShowQuiz(false)} />}

        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">1️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose a Topic</h3>
              <p className="text-gray-600">Select from Grammar, Vocabulary, Pronunciation, and more</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">2️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn & Practice</h3>
              <p className="text-gray-600">Read lessons with clear explanations and examples</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">3️⃣</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Test Yourself</h3>
              <p className="text-gray-600">Complete interactive exercises and track your progress</p>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 Learning Tips</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Practice a little every day – consistency is key!</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Complete all exercises to reinforce what you've learned</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Review lessons regularly to improve retention</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Don't be afraid to make mistakes – they're part of learning!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
