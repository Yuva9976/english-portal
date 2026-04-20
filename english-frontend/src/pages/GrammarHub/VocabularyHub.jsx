import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../apiClient'

export default function VocabularyHub({ isInline, lessonId }) {
  const navigate = useNavigate()
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('A-Z')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [isSpeaking, setIsSpeaking] = useState(null)
  
  // User Role Check
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLearner = user.role === 'learner'
  const canManage = ['admin', 'content_provider', 'provider', 'teacher', 'tutor'].includes(user.role)

  // Flip state for learner cards (using word.id as key)
  const [flippedCards, setFlippedCards] = useState({})

  const toggleFlip = (id) => {
    if (!isLearner) return
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Modals
  const [showAddModal, setShowAddModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [editingWord, setEditingWord] = useState(null)
  
  // Form State
  const [wordForm, setWordForm] = useState({
    word: '',
    part_of_speech: 'noun',
    definition: '',
    example_sentence: '',
    pronunciation: '',
    difficulty_level: 'A1',
    category: 'General',
    is_global: true
  })

  const topics = ['General', 'Travel', 'Business', 'Social', 'Daily Life', 'Grammar', 'Academic', 'Technology']

  useEffect(() => {
    fetchWords()
  }, [lessonId, categoryFilter])

  const fetchWords = async () => {
    try {
      setLoading(true)
      let endpoint = '/grammar-hub/words/vocabulary-hub/global'
      const res = await apiClient.get(`/grammar-hub/words/vocabulary-hub/global?include_all=${canManage}`)
      setWords(res.data || [])
    } catch (err) {
      console.error('Failed to fetch words:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSpeak = (text, id) => {
    if (!window.speechSynthesis) return alert('Your browser does not support speech synthesis.')
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    
    utterance.onstart = () => setIsSpeaking(id)
    utterance.onend = () => setIsSpeaking(null)
    utterance.onerror = () => setIsSpeaking(null)
    
    window.speechSynthesis.speak(utterance)
  }

  const handleSaveWord = async (e) => {
    e.preventDefault()
    try {
      if (editingWord) {
        const res = await apiClient.put(`/grammar-hub/word/vocabulary/${editingWord.id}`, wordForm)
        setWords(words.map(w => w.id === editingWord.id ? res.data : w))
      } else {
        const res = await apiClient.post('/grammar-hub/words/vocabulary', {
          ...wordForm,
          status: 'approved',
          is_global: true
        })
        setWords([res.data, ...words])
      }
      setShowAddModal(false)
      setEditingWord(null)
      alert('Entry updated successfully!')
      setWordForm({ word: '', part_of_speech: 'noun', definition: '', example_sentence: '', pronunciation: '', difficulty_level: 'A1', category: 'General', is_global: true })
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save word')
    }
  }

  const handleDeleteWord = async (id) => {
    if (!window.confirm('Delete this word?')) return
    try {
      await apiClient.delete(`/grammar-hub/word/vocabulary/${id}`)
      setWords(words.filter(w => w.id !== id))
    } catch (err) {
      alert('Failed to delete word')
    }
  }

  const handlePromoteWord = async (id) => {
    try {
      const res = await apiClient.put(`/grammar-hub/word/vocabulary/${id}`, { is_global: true })
      setWords(prev => prev.map(w => w.id === id ? res.data : w))
    } catch (err) {
      alert('Failed to promote word')
    }
  }

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('file', file)
    if (lessonId) formData.append('lessonId', lessonId)
    formData.append('makeGlobal', !lessonId)

    try {
      setLoading(true)
      const res = await apiClient.post('/content-provider/vocabulary/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.data?.success) {
        alert(res.data.message || 'Bulk upload successful!')
        fetchWords()
        setShowBulkModal(false)
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Bulk upload failed')
    } finally {
      setLoading(false)
    }
  }

  const filteredWords = words
    .filter(w => {
      const q = searchQuery.toLowerCase()
      return (w.word || '').toLowerCase().includes(q) || (w.definition || '').toLowerCase().includes(q)
    })
    .sort((a, b) => {
      if (sortOrder === 'A-Z') return (a.word || '').localeCompare(b.word || '')
      if (sortOrder === 'Z-A') return (b.word || '').localeCompare(a.word || '')
      return 0
    })

  // Final deduplication safety layer
  const seenInFilter = new Set();
  const dedupedFiltered = [];
  filteredWords.forEach(w => {
    const key = (w.word || '').toLowerCase().trim();
    if (!seenInFilter.has(key)) {
      seenInFilter.add(key);
      dedupedFiltered.push(w);
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fadeIn">
        <div className="w-16 h-16 border-4 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold tracking-tight uppercase text-xs">Accessing Dictionary Repository...</p>
      </div>
    )
  }  return (
    <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto p-4 lg:p-8 bg-slate-50/30 min-h-screen">
      {/* CSS for Premium UI Elements */}
      <style>{`
        .flip-card {
          perspective: 1200px;
          height: auto;
          min-height: 320px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid #0D9488;
        }
        .flip-card-back {
          transform: rotateY(180deg);
          border: 1px solid #0D9488;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow-y: auto;
        }
        
        .premium-card {
          background: white;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.1);
          border-color: rgba(13, 148, 136, 0.2);
        }
      `}</style>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 py-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <span className="px-3 py-1 bg-pink-50 text-[#F43F5E] text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm border border-pink-100">Lexical Core</span>
             <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse shadow-sm shadow-teal-400/50"></span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight uppercase font-['Outfit']" style={{
            background: 'linear-gradient(135deg, #0D9488 0%, #F43F5E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Vocabulary Hub
          </h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl italic">"Language is the roadmap of a culture. It tells you where its people come from and where they are going."</p>
        </div>

        {canManage && (
          <div className="flex items-center gap-4 no-print">
            <button onClick={() => setShowBulkModal(true)} className="px-6 py-3 bg-white text-slate-500 font-bold border border-slate-200 rounded-2xl hover:border-[#F43F5E] hover:text-[#F43F5E] transition-all shadow-sm uppercase tracking-widest text-[9px]">
              Mass Upload
            </button>
            <button onClick={() => { setEditingWord(null); setWordForm({ word: '', part_of_speech: 'noun', definition: '', example_sentence: '', pronunciation: '', difficulty_level: 'A1', category: 'General', is_global: true }); setShowAddModal(true); }} className="px-8 py-3 bg-gradient-to-r from-[#0D9488] to-[#F43F5E] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 active:scale-95 transition-all uppercase tracking-widest text-[9px]">
              Inject Word
            </button>
          </div>
        )}
      </div>

      {/* Dashboard Stats Section (Matching Resource Center) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#0D9488]">
            <div>
               <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{words.length}</div>
               <div className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Vocabulary Repository</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-2xl group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">📖</div>
         </div>
         <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#F43F5E]">
            <div>
               <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{topics.length}</div>
               <div className="text-[10px] font-bold text-[#F43F5E] uppercase tracking-widest mt-1">Lexical Categories</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#F43F5E] flex items-center justify-center text-2xl group-hover:bg-[#F43F5E] group-hover:text-white transition-all duration-300">📚</div>
         </div>
         <div className="premium-card !p-8 flex items-center justify-between group hover:border-[#0D9488]">
            <div>
               <div className="text-3xl font-bold text-slate-900 tracking-tighter font-['Outfit']">{words.filter(w => w.is_global).length}</div>
               <div className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest mt-1">Active Syncs</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-2xl group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300">✅</div>
         </div>
         <div className="bg-gradient-to-br from-[#0D9488] to-[#0f766e] rounded-[2rem] p-8 shadow-xl shadow-teal-500/10 flex items-center justify-between group hover:shadow-2xl transition-all">
            <div>
               <div className="text-3xl font-bold text-white tracking-tighter font-['Outfit']">Verified</div>
               <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest mt-1">Dictionary Status</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center text-2xl">✨</div>
         </div>
      </div>

      {/* Control Bar */}
      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 sticky top-4 z-40">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative flex-1 w-full">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg opacity-30">🔍</span>
              <input 
                type="text" 
                placeholder="Query the repository for semantic definitions or specific terms..." 
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 transition-all font-bold text-slate-800 placeholder:text-slate-300 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
                 <button onClick={() => setViewMode('grid')} className={`px-5 py-2.5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${viewMode === 'grid' ? 'bg-white shadow-md text-[#0D9488]' : 'text-slate-400'}`}>Grid</button>
                 <button onClick={() => setViewMode('list')} className={`px-5 py-2.5 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${viewMode === 'list' ? 'bg-white shadow-md text-[#0D9488]' : 'text-slate-400'}`}>List</button>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 no-print bg-slate-50/50 p-2 rounded-[2.5rem] border border-slate-100 w-fit">
            {['All', ...topics].map(topic => (
              <button
                key={topic}
                onClick={() => setCategoryFilter(topic)}
                className={`px-6 py-3 rounded-[1.25rem] text-[10px] uppercase font-bold tracking-widest transition-all whitespace-nowrap ${categoryFilter === topic ? 'bg-[#0D9488] text-white shadow-lg shadow-teal-500/20' : 'text-slate-500 hover:bg-white hover:text-[#0D9488] hover:shadow-sm'}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
           <h2 className="text-2xl font-bold text-slate-900 tracking-tighter uppercase font-['Outfit'] border-b-2 border-[#0D9488] w-fit pb-1 mb-2">Lexical Dictionary</h2>
           <p className="text-slate-400 font-medium">Browse and manage granular vocabulary components in the learning stream.</p>
        </div>
      </div>

      {/* Words Feed */}
      {filteredWords.length === 0 ? (
        <div className="py-32 text-center flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner border border-slate-100 opacity-50">📂</div>
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">No Data Found</h3>
            <p className="text-slate-400 font-medium text-xs mt-2 italic">The specified parameters returned an empty repository set.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20' : 'space-y-4 pb-20'}>
          {dedupedFiltered.map(word => {
            const flipped = flippedCards[word.id]
            const initial = (word.word || 'V').charAt(0).toUpperCase()
            
            return (
                <div 
                  key={word.id} 
                  className={`relative rounded-[2.5rem] overflow-hidden ${isLearner ? 'flip-card' : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:border-[#0D9488]/30 transition-all group'} ${flipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(word.id)}
                >
                <div className={`flip-card-inner min-h-[400px] ${!isLearner && 'flex flex-col'}`}>
                  {/* Front Side */}
                  <div className={`flip-card-front bg-white p-8 flex flex-col h-full relative group transition-all duration-300 ${!isLearner && 'rounded-[2.5rem]'}`}>
                      {/* Top Accent Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0D9488]"></div>
                      
                      <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center text-3xl font-black font-['Outfit'] shadow-inner border border-teal-100 group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-500">
                             {initial}
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 bg-teal-50 text-[#0D9488] text-[8px] font-bold uppercase tracking-widest rounded-lg border border-teal-100">
                                  {word.part_of_speech}
                                </span>
                              </div>
                              <h3 className="text-2xl font-bold tracking-tight text-slate-800 font-['Outfit'] uppercase leading-none group-hover:text-[#0D9488] transition-colors">
                                {word.word.split('-')[0]}
                              </h3>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           {canManage && (
                             <>
                               <button onClick={(e) => { e.stopPropagation(); setEditingWord(word); setWordForm(word); setShowAddModal(true); }} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#0D9488] hover:text-white transition-all shadow-sm border border-slate-100 text-sm">✏️</button>
                               <button onClick={(e) => { e.stopPropagation(); handleDeleteWord(word.id); }} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-[#F43F5E] hover:text-white transition-all shadow-sm border border-slate-100 text-sm">🗑️</button>
                             </>
                           )}
                        </div>
                     </div>

                      <div className="flex-1 space-y-6">
                        <div className="space-y-3">
                           <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-[#F43F5E] rounded-full"></span>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Semantics & Usage</p>
                           </div>
                           <p className="text-slate-600 font-medium text-base leading-relaxed line-clamp-4 italic">
                             "{word.definition}"
                           </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-slate-100">
                              {word.category || 'General'} • Lexical Core
                           </span>
                           <span className="px-3 py-1 bg-teal-50/50 text-[#0D9488] text-[9px] font-bold uppercase tracking-widest rounded-full border border-teal-100/50">
                              {word.difficulty_level || 'A1'}
                           </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-4">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleSpeak(word.word.split('-')[0], word.id); }} 
                             className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-lg ${isSpeaking === word.id ? 'bg-[#F43F5E] text-white animate-pulse' : 'bg-gradient-to-br from-[#0D9488] to-[#F43F5E] text-white hover:scale-110 active:scale-95 shadow-teal-500/20'}`}
                           >
                              🔊
                           </button>
                           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight italic">{word.pronunciation}</span>
                        </div>
                        {isLearner && (
                           <div className="flex items-center gap-2 text-[#0D9488] group-hover:translate-x-2 transition-transform cursor-pointer">
                              <span className="text-[9px] font-bold uppercase tracking-widest">Tap to Flip</span>
                              <span className="text-lg">→</span>
                           </div>
                        )}
                      </div>
                  </div>

                  {/* Back Side (Learner only) */}
                  {isLearner && (
                    <div className="flip-card-back bg-gradient-to-br from-[#0D9488] to-[#0f766e] p-10 flex flex-col justify-between text-white relative overflow-hidden rounded-[2.5rem]">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                       <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-black/5 rounded-full blur-3xl"></div>
                       
                       <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl backdrop-blur-md border border-white/20">📚</div>
                             <span className="px-4 py-1.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20 backdrop-blur-md">{word.category}</span>
                          </div>
                          <span className="text-4xl opacity-20 font-black">"{initial}"</span>
                       </div>
  
                       <div className="space-y-8 relative z-10">
                          <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Contextual Application</p>
                             </div>
                             <p className="text-2xl font-bold leading-tight italic tracking-tight">
                                "{word.example_sentence}"
                             </p>
                          </div>
                          
                          <div className="p-6 bg-white/10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                             <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-2">Usage Advice</p>
                             <p className="text-sm font-medium text-white/90">Incorporate this term into your daily discourse to solidify mastery.</p>
                          </div>
                       </div>
  
                       <div className="flex items-center justify-between mt-10 relative z-10 border-t border-white/10 pt-8">
                          <button className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">Return Front</button>
                          <div className="flex gap-1">
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100 animate-scaleIn">
            <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
               <div>
                  <span className="text-[9px] font-black text-[#0D9488] uppercase tracking-[0.3em] block mb-1">Dictionary Architecture</span>
                  <h3 className="text-2xl font-bold tracking-tight font-['Outfit'] uppercase text-slate-800">{editingWord ? 'Refresh Data' : 'New Entry'}</h3>
               </div>
               <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#F43F5E] transition-all">✕</button>
            </div>

            <form onSubmit={handleSaveWord} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Term</label>
                    <input required type="text" value={wordForm.word} onChange={e => setWordForm({...wordForm, word: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/5 outline-none font-bold text-slate-800" placeholder="e.g. Resilience" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phonetic</label>
                    <input type="text" value={wordForm.pronunciation} onChange={e => setWordForm({...wordForm, pronunciation: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/5 outline-none font-bold italic text-slate-500" placeholder="e.g. /rɪˈzɪl.jəns/" />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                    <select value={wordForm.category} onChange={e => setWordForm({...wordForm, category: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-600">
                       {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lexical Type</label>
                    <select value={wordForm.part_of_speech} onChange={e => setWordForm({...wordForm, part_of_speech: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-600">
                       <option value="noun">Noun</option>
                       <option value="verb">Verb</option>
                       <option value="adjective">Adjective</option>
                       <option value="adverb">Adverb</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Definition</label>
                <textarea required rows="2" value={wordForm.definition} onChange={e => setWordForm({...wordForm, definition: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-700 resize-none" placeholder="Primary semantic meaning..."></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Usage Sentence</label>
                <textarea required rows="2" value={wordForm.example_sentence} onChange={e => setWordForm({...wordForm, example_sentence: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-500 italic resize-none" placeholder="Contextual realization..."></textarea>
              </div>

              <div className="pt-6 flex gap-4">
                 <button type="submit" className="flex-1 py-4 bg-slate-900 text-white font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-black transition-all">Commit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Modal (Simplified for brevity) */}
      {showBulkModal && (
        <div className="modal-overlay">
           <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 text-center animate-scaleIn">
              <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mx-auto text-3xl mb-6 shadow-sm border border-teal-100">📂</div>
              <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Mass Data Sync</h3>
              <p className="text-slate-400 font-medium text-xs mt-2 italic mb-8 px-10">Synchronize your local repository via our standardized Excel architecture.</p>
              
              <input type="file" id="bulk-vocab-input" className="hidden" onChange={handleBulkUpload} accept=".xlsx, .csv" />
              <div className="grid grid-cols-2 gap-4 mb-10">
                 <button onClick={() => document.getElementById('bulk-vocab-input').click()} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-teal-50 hover:border-[#0D9488] transition-all group">
                    <div className="text-2xl mb-2">📤</div>
                    <div className="text-[8px] font-black text-slate-400 group-hover:text-[#0D9488] uppercase tracking-widest">Identify Source</div>
                 </button>
                 <a href={`${apiClient.defaults.baseURL}/content-provider/template?type=vocabulary`} target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-pink-50 hover:border-[#F43F5E] transition-all group">
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-[8px] font-black text-slate-400 group-hover:text-[#F43F5E] uppercase tracking-widest">Architecture Template</div>
                 </a>
              </div>
              <button onClick={() => setShowBulkModal(false)} className="text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-500">Return to Repository</button>
           </div>
        </div>
      )}
    </div>
  )
}
