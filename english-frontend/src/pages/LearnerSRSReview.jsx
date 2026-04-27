import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export default function LearnerSRSReview() {
  const navigate = useNavigate();
  const [dueWords, setDueWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, forgotten: 0, mastered: 0 });

  useEffect(() => {
    fetchDueWords();
  }, []);

  const fetchDueWords = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/grammar/srs/due');
      setDueWords(res.data.due || []);
    } catch (err) {
      console.error('Error fetching due words:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (quality) => {
    const word = dueWords[currentIndex];
    try {
      await apiClient.post('/grammar/srs/record', {
        wordId: word.word_id,
        quality
      });

      // Update local stats for the summary
      if (quality < 3) {
        setStats(prev => ({ ...prev, forgotten: prev.forgotten + 1, reviewed: prev.reviewed + 1 }));
      } else {
        setStats(prev => ({ ...prev, mastered: prev.mastered + 1, reviewed: prev.reviewed + 1 }));
      }

      if (currentIndex + 1 < dueWords.length) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        setCompleted(true);
      }
    } catch (err) {
      alert('Failed to record review result');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (dueWords.length === 0 || completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl max-w-md w-full text-center border border-teal-100">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Review Complete!</h2>
          <p className="text-slate-500 mb-8 font-medium">You've strengthened your memory for {stats.reviewed} words today.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <div className="text-2xl font-black text-emerald-600">{stats.mastered}</div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Strengthened</div>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
              <div className="text-2xl font-black text-rose-600">{stats.forgotten}</div>
              <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Needs Focus</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/learner/dashboard')}
            className="w-full py-4 bg-teal-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const word = dueWords[currentIndex]?.word;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="max-w-xl w-full mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter">SRS REVIEW</h1>
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Active Recall Session</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-slate-400">{currentIndex + 1} / {dueWords.length}</div>
          <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / dueWords.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div 
        className={`relative w-full max-w-lg aspect-[4/3] cursor-pointer transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] shadow-2xl border-b-8 border-slate-100 flex flex-col items-center justify-center p-12 text-center group">
          <div className="absolute top-8 left-8 w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 font-black text-xs">
            {word?.part_of_speech?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4 group-hover:scale-110 transition-transform">{word?.word}</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-4">Click to flip</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-12 text-center text-white">
          <h3 className="text-teal-200 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Definition</h3>
          <p className="text-2xl font-bold leading-tight mb-8 font-['Outfit']">{word?.definition}</p>
          
          {word?.example_sentence && (
            <>
              <div className="w-12 h-px bg-white/20 mb-6"></div>
              <p className="text-sm italic text-teal-50 font-medium opacity-80 leading-relaxed">"{word.example_sentence}"</p>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className={`max-w-lg w-full mt-12 grid grid-cols-4 gap-3 transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(1); }}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-rose-200 hover:bg-rose-50 transition-all group"
        >
          <span className="text-xl mb-1">😫</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-rose-500 group-hover:text-rose-600">Forgot</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(2); }}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50 transition-all group"
        >
          <span className="text-xl mb-1">😕</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-amber-500 group-hover:text-amber-600">Hard</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(3); }}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 hover:bg-teal-50 transition-all group"
        >
          <span className="text-xl mb-1">🙂</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-teal-500 group-hover:text-teal-600">Good</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handleReview(5); }}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
        >
          <span className="text-xl mb-1">🚀</span>
          <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 group-hover:text-emerald-600">Easy</span>
        </button>
      </div>

      <button 
        onClick={() => navigate('/learner/dashboard')}
        className="mt-12 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors"
      >
        Exit Session
      </button>

      {/* 3D Transform CSS */}
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}
