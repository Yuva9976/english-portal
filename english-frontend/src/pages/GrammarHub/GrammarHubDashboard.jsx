import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GrammarHubDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const sections = [
    {
      id: 'vocabulary',
      title: 'Vocabulary Master',
      icon: '📚',
      description: 'Learn 5000+ words with AI-powered flashcards',
      color: 'from-teal-500 to-rose-400',
      path: '/grammar-hub/vocabulary',
      stats: { topicsCompleted: 5, wordsLearned: 342, streak: 8 }
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Lab',
      icon: '🎤',
      description: 'Perfect your accent with native speaker audio',
      color: 'from-rose-400 to-pink-500',
      path: '/grammar-hub/pronunciation',
      stats: { lessonsCompleted: 3, recordingsSubmitted: 15, accuracy: 85 }
    },
    {
      id: 'grammar',
      title: 'Grammar Mastery',
      icon: '✏️',
      description: 'Interactive lessons on all English grammar topics',
      color: 'from-teal-600 to-cyan-500',
      path: '/grammar-hub/grammar',
      stats: { topicsCompleted: 8, quizzesCompletedCount: 24, avgScore: 88 }
    },
    {
      id: 'exercises',
      title: 'Practice Hub',
      icon: '⚡',
      description: 'Hands-on exercises to master your skills faster',
      color: 'from-slate-600 to-slate-700',
      path: '/grammar-hub/exercises',
      stats: { totalScore: 2450, exercisesCompleted: 67, level: 'Advanced' }
    }
  ]

  const upcomingReviews = [
    { word: 'Serendipity', level: 'B2', daysUntilReview: 2, topic: 'Advanced Vocabulary' },
    { word: 'Phenomenon', level: 'B1', daysUntilReview: 1, topic: 'Academic Words' },
    { word: 'Ephemeral', level: 'C1', daysUntilReview: 0, topic: 'Literary Vocabulary' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-white'>
      {/* Header - Premium Look */}
      <div className='sticky top-0 z-40 bg-white shadow-md border-b border-teal-100'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>Grammar Hub</h1>
              <p className='text-slate-600 text-sm'>Unlock your English potential with comprehensive learning</p>
            </div>
            <div className='flex items-center gap-12'>
              <div className='text-center bg-gradient-to-br from-teal-50 to-rose-50 p-4 rounded-lg border border-teal-200'>
                <div className='text-2xl font-bold text-teal-600'>42</div>
                <div className='text-xs text-slate-600 mt-1'>🔥 Day Streak</div>
              </div>
              <div className='text-center bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-lg border border-rose-200'>
                <div className='text-2xl font-bold text-rose-500'>1,250</div>
                <div className='text-xs text-slate-600 mt-1'>✨ Total XP</div>
              </div>
            </div>
          </div>
          
          {/* Tabs - Premium Style */}
          <div className='flex gap-8 border-t border-teal-100 pt-4'>
            {['overview', 'progress', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold text-sm transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'progress' && '📈 Progress'}
                {tab === 'schedule' && '📅 Schedule'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-12'>
        {activeTab === 'overview' && (
          <div className='space-y-10'>
            {/* Quick Stats - Premium Design */}
            <div className='grid md:grid-cols-4 gap-5'>
              {[
                { label: 'Words Learned', value: '342', change: '+12 this week', icon: '📚' },
                { label: 'Streak Days', value: '42', change: '🔥 Keep it up!', icon: '🔥' },
                { label: 'Total XP', value: '1,250', change: '+150 today', icon: '⭐' },
                { label: 'Accuracy Rate', value: '87%', change: '+3% this month', icon: '🎯' }
              ].map((stat, idx) => (
                <div key={idx} className='bg-white rounded-xl p-6 border border-teal-100 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='text-slate-600 text-sm font-medium'>{stat.label}</div>
                    <span className='text-2xl'>{stat.icon}</span>
                  </div>
                  <div className='text-3xl font-bold bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>{stat.value}</div>
                  <div className='text-xs text-teal-600 font-medium mt-2'>{stat.change}</div>
                </div>
              ))}
            </div>

            {/* Learning Sections - Beautiful Cards */}
            <div>
              <h2 className='text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900'>
                <span className='text-3xl'>🎓</span> Your Learning Sections
              </h2>
              <div className='grid md:grid-cols-2 gap-8'>
                {sections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => navigate(section.path)}
                    className='group cursor-pointer transform hover:scale-105 transition-all duration-300'
                  >
                    {/* Premium Gradient Card */}
                    <div className={`bg-gradient-to-br ${section.color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-white mb-5`}>
                      <div className='flex items-start justify-between mb-4'>
                        <div className='text-6xl'>{section.icon}</div>
                        <div className='text-sm bg-white/20 px-3 py-1 rounded-full'>Learn</div>
                      </div>
                      <h3 className='text-xl font-bold mb-3'>{section.title}</h3>
                      <p className='text-sm text-white/95 font-medium'>{section.description}</p>
                      <div className='mt-6 flex items-center text-sm font-semibold text-white/80 group-hover:text-white'>
                        Start Learning →
                      </div>
                    </div>

                    {/* Stats Box - Matching Theme */}
                    <div className='bg-white rounded-xl p-5 border border-teal-100 shadow-sm grid grid-cols-3 gap-4'>
                      {Object.entries(section.stats).map(([key, value]) => (
                        <div key={key} className='text-center py-2'>
                          <div className='text-xl font-bold bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>{typeof value === 'number' ? value : value}</div>
                          <div className='text-xs text-slate-500 capitalize mt-2 font-medium'>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spaced Repetition Review - Premium Design */}
            <div className='bg-white rounded-2xl p-8 border border-teal-100 shadow-md'>
              <h3 className='text-2xl font-bold mb-2 flex items-center gap-2 text-slate-900'>
                🔄 Spaced Repetition Review
              </h3>
              <p className='text-slate-600 mb-6'>Words due for review today to reinforce learning</p>
              
              <div className='space-y-4'>
                {upcomingReviews.map((item, idx) => (
                  <div
                    key={idx}
                    className='bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl p-5 border border-teal-200 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <div className='font-bold text-lg text-slate-900'>{item.word}</div>
                        <div className='text-sm text-slate-600 mt-1'>{item.topic}</div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='text-center'>
                          <div className='text-xs text-slate-500 font-semibold'>CEFR</div>
                          <div className='px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg text-white text-sm font-bold mt-1'>
                            {item.level}
                          </div>
                        </div>
                        <div className='text-center'>
                          {item.daysUntilReview === 0 ? (
                            <div className='px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg font-bold text-white text-sm'>🔴 Due Now!</div>
                          ) : (
                            <>
                              <div className='text-xs text-slate-500 font-semibold'>Due In</div>
                              <div className='text-lg font-bold text-teal-600 mt-1'>{item.daysUntilReview}d</div>
                            </>
                          )}
                        </div>
                        <button className='px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition opacity-0 group-hover:opacity-100'>
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements - Premium Cards */}
            <div>
              <h3 className='text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900'>
                🏆 Recent Achievements
              </h3>
              <div className='grid md:grid-cols-3 gap-6'>
                {[
                  { emoji: '🌟', title: 'Week Warrior', desc: 'Complete 100 XP in a week', unlocked: true },
                  { emoji: '🔥', title: '14-Day Streak', desc: 'Maintain a 14-day learning streak', unlocked: true },
                  { emoji: '📖', title: 'Vocabulary Master', desc: 'Learn 300 new words', unlocked: false }
                ].map((achievement, idx) => (
                  <div key={idx} className={`rounded-xl p-6 text-center border-2 transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-md' 
                      : 'bg-slate-100 border-slate-300'
                  }`}>
                    <div className='text-5xl mb-3'>{achievement.emoji}</div>
                    <div className='font-bold text-slate-900 mb-1'>{achievement.title}</div>
                    <div className='text-sm text-slate-600'>{achievement.desc}</div>
                    {achievement.unlocked && <div className='mt-3 text-xs font-bold text-amber-600'>✓ UNLOCKED</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className='bg-white rounded-2xl p-8 border border-teal-100 shadow-md text-center'>
            <h2 className='text-3xl font-bold mb-4 text-slate-900'>📊 Progress Tracking</h2>
            <p className='text-slate-600 mb-8 text-lg'>Detailed analytics and progress reports coming soon</p>
            <button className='px-8 py-3 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-lg text-white rounded-lg font-semibold transition'>
              View Detailed Stats
            </button>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className='bg-white rounded-2xl p-8 border border-teal-100 shadow-md text-center'>
            <h2 className='text-3xl font-bold mb-4 text-slate-900'>📅 Learning Schedule</h2>
            <p className='text-slate-600 mb-8 text-lg'>Set your preferred learning times for spaced repetition</p>
            <button className='px-8 py-3 bg-gradient-to-r from-teal-600 to-rose-400 hover:shadow-lg text-white rounded-lg font-semibold transition'>
              Configure Schedule
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
