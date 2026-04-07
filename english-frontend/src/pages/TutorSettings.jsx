import React, { useState } from 'react';
import apiClient from '../apiClient';

export default function TutorSettings() {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    specialization: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Assuming there's a profile update endpoint
      await apiClient.post('/auth/update-profile', formData);
      setMessage('Profile updated successfully!');
      // Update local storage
      localStorage.setItem('user', JSON.stringify({ ...user, name: formData.name }));
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <div className='bg-white rounded-[32px] shadow-sm border border-slate-100 p-8'>
        <h1 className='text-3xl font-semibold mb-2' style={{
          background: 'linear-gradient(135deg, #0D9488 0%, #F43F5E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Outfit', sans-serif",
        }}>Account Settings</h1>
        <p className='text-slate-500 mb-8'>Manage your tutor profile and portal preferences</p>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.includes('success') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>Full Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-slate-700'
              />
            </div>
            <div>
              <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                disabled
                className='w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 cursor-not-allowed font-medium'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>Professional Bio</label>
            <textarea
              name='bio'
              value={formData.bio}
              onChange={handleChange}
              rows='4'
              placeholder='Tell your students about your experience...'
              className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-slate-700 resize-none'
            />
          </div>

          <div>
            <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>Specialization</label>
            <input
              type='text'
              name='specialization'
              value={formData.specialization}
              onChange={handleChange}
              placeholder='e.g., Business English, IELTS Preparation'
              className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium text-slate-700'
            />
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              disabled={loading}
              className='px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50'
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
