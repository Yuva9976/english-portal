import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export default function ContentProviderVocabulary() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Forms
  const [topicForm, setTopicForm] = useState({ title: '', description: '', difficulty_level: 'A1', icon: '📝', color: 'from-teal-500 to-teal-400' });
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [bulkFile, setBulkFile] = useState(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      // Filter topics created by me
      const res = await apiClient.get(`/grammar-hub/topics/vocabulary?created_by=${user.id}`);
      setTopics(res.data || []);
    } catch (err) {
      setError('Failed to load vocabulary lists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/grammar/topics', {
        ...topicForm,
        category: 'vocabulary',
        approval_status: 'pending' // Force pending for admin review
      });
      setSuccess('Vocabulary Deck Created. Waiting for Admin Approval.');
      setShowCreateModal(false);
      setTopicForm({ title: '', description: '', difficulty_level: 'A1', icon: '📝', color: 'from-teal-500 to-teal-400' });
      fetchTopics();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create');
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!selectedTopicId) return alert('Select a deck first');
    if (!bulkFile) return alert('Please select an Excel file');
    
    const formData = new FormData();
    formData.append('file', bulkFile);
    formData.append('topicId', selectedTopicId);

    try {
      setLoading(true);
      await apiClient.post('/content-provider/vocabulary/bulk-upload', formData);
      setSuccess(`Successfully uploaded words to the deck!`);
      setShowBulkModal(false);
      setBulkFile(null);
      fetchTopics();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to bulk upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => navigate(-1)} className="text-sm text-slate-500 hover:text-slate-700 mb-4 inline-block">← Back</button>
          <h1 className="text-3xl font-bold text-slate-800 font-['Outfit'] tracking-tight">Vocabulary Manager</h1>
          <p className="text-slate-500">Create dictionaries, upload bulk flashcards, and submit for approval.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setShowBulkModal(true)} className="px-6 py-3 bg-white border border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 shadow-sm">
            Bulk Upload Excel
          </button>
          <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 shadow-sm">
            + New Deck
          </button>
        </div>
      </div>

      {success && <div className="p-4 bg-teal-50 text-teal-700 font-semibold rounded-xl border border-teal-100">{success}</div>}
      {error && <div className="p-4 bg-rose-50 text-rose-700 font-semibold rounded-xl border border-rose-100">{error}</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-10 font-bold text-slate-400 animate-pulse">Loading Vocabulary Decks...</div>
        ) : topics.length === 0 ? (
          <div className="col-span-full p-12 bg-white rounded-3xl border border-slate-100 text-center">
            <h3 className="text-xl font-bold mb-2">No Decks Found</h3>
            <p className="text-slate-500 mb-6">Start by creating a new vocabulary deck.</p>
            <button onClick={() => setShowCreateModal(true)} className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 shadow-sm">+ Create First Deck</button>
          </div>
        ) : (
          topics.map(topic => (
            <div key={topic.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{topic.icon}</div>
                  {topic.approval_status === 'approved' ? (
                     <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Approved</span>
                  ) : topic.approval_status === 'pending' ? (
                     <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pending</span>
                  ) : (
                     <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Rejected</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-['Outfit']">{topic.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{topic.description}</p>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topic.vocabularyWords?.length || 0} Words Embedded</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                 <button onClick={() => { setSelectedTopicId(topic.id); setShowBulkModal(true); }} className="w-full py-2 bg-slate-50 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 text-sm">Add Words</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 font-['Outfit']">Create Vocabulary Deck</h2>
            <form onSubmit={handleCreateTopic} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Deck Title</label>
                <input required type="text" value={topicForm.title} onChange={e => setTopicForm({...topicForm, title: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2" placeholder="e.g. Travel Basics" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea required value={topicForm.description} onChange={e => setTopicForm({...topicForm, description: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2 resize-none" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Difficulty Level</label>
                <select value={topicForm.difficulty_level} onChange={e => setTopicForm({...topicForm, difficulty_level: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2">
                  <option value="A1">A1 Beginner</option>
                  <option value="A2">A2 Pre-Intermediate</option>
                  <option value="B1">B1 Intermediate</option>
                  <option value="B2">B2 Upper Intermediate</option>
                  <option value="C1">C1 Advanced</option>
                  <option value="C2">C2 Mastery</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 font-['Outfit']">Bulk Upload Flashcards</h2>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-slate-500 whitespace-normal">Select a target deck and upload your Excel file.</p>
              <a 
                href={`${apiClient.defaults.baseURL}/content-provider/template?type=vocabulary`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-black text-teal-600 uppercase tracking-widest hover:text-teal-700"
              >
                📥 Download Template
              </a>
            </div>
            <form onSubmit={handleBulkUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Target Deck</label>
                <select required value={selectedTopicId} onChange={e => setSelectedTopicId(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2">
                  <option value="">-- Select a Deck --</option>
                  {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Excel File (.xlsx)</label>
                <input 
                  required 
                  type="file" 
                  accept=".xlsx, .xls"
                  onChange={e => setBulkFile(e.target.files[0])} 
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-sm" 
                />
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Please use the provided template for correct column mapping.</p>
              </div>
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowBulkModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700">Upload Words</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
