import React, { useState, useEffect } from 'react';
import VocabularyHub from './GrammarHub/VocabularyHub';
import apiClient from '../apiClient';

const LearnerVocabulary = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;
        const res = await apiClient.get(`/dashboard/learner/${user.id}/vocabulary`);
        setTopics(res.data.topics || []);
      } catch (err) {
        console.error('Failed to fetch Learner Vocabulary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVocab();
  }, []);

  return (
    <div className="w-full flex-1">
      <div className="pt-10 pl-10 pr-10 pb-8">
        <div className="mb-10">
          <h1 className="mb-2" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '42px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #14b8a6 0%, #f43f5e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ WebkitTextFillColor: 'initial' }}>📚</span> Vocabulary Hub
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px', color: '#64748b', marginLeft: '4px' }}>Expand your word bank with interactive lessons.</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-20 animate-pulse text-teal-600 font-semibold">
            Loading your assigned vocabulary...
          </div>
        ) : (
          topics.length > 0 ? (
            <VocabularyHub isInline={false} apiTopics={topics} />
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
              <div className="text-4xl mb-4">📭</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2 font-['Outfit']">No Vocabulary Assigned Yet</h2>
              <p className="text-slate-500 max-w-sm mx-auto">Your tutor has not attached any vocabulary decks to your classes yet. Check back later!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LearnerVocabulary;
