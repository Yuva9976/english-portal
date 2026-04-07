import React from 'react';
import GrammarPage from './GrammarHub/GrammarPage';

const LearnerGrammar = () => {
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
            <span style={{ WebkitTextFillColor: 'initial' }}>📝</span> Grammar Mastery
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px', color: '#64748b', marginLeft: '4px' }}>Build a strong foundation with core grammar rules.</p>
        </div>
        <GrammarPage isInline={false} />
      </div>
    </div>
  );
};

export default LearnerGrammar;
