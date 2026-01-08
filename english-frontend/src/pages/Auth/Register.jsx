import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// correct relative path from src/pages/Auth -> src/apiClient.js
import apiClient from '../../apiClient';
import SiteFooter from '../../components/SiteFooter';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('learner');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await apiClient.post('/auth/register', { name, email, password, role });

      // Show success message and redirect to login
      setError('');
      alert('✅ Registration successful! Please login with your credentials.');
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          'Registration failed'
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Navbar - No navigation links */}
      <header className='sticky top-0 z-50 bg-white shadow-md'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm'>EC</div>
            <div>
              <Link to='/' className='font-bold text-lg text-blue-700'>EnglishClub</Link>
              <div className='text-xs text-slate-600'>Learn • Teach • Explore</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className='hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 flex-1 max-w-md mx-6'>
            <input
              type='text'
              placeholder='Search lessons, quizzes'
              className='bg-transparent outline-none text-sm flex-1 text-slate-700'
              disabled
            />
            <span className='text-teal-600'>🔍</span>
          </div>

          {/* Auth Buttons */}
          <div className='flex items-center gap-3'>
            <Link to='/login' className='px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition'>Login</Link>
          </div>
        </div>
      </header>

      {/* Register Form */}
      <div className="w-[400px] max-w-full mx-auto bg-white px-6 py-6 rounded-xl shadow-lg mt-10 mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-center text-teal-700 italic font-serif">
        Create Account
      </h2>
      {error && (
        <div className="text-red-600 mb-3 text-center font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Account type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="learner">🎓 Student (Learner)</option>
            <option value="teacher">👨‍🏫 Tutor (Instructor)</option>
            <option value="content_provider">📚 Content Provider</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            {role === 'learner' && '📖 Access courses, take quizzes, and track your progress.'}
            {role === 'teacher' && '🎯 Create classes, manage students, and assign tasks.'}
            {role === 'content_provider' && '✏️ Create and manage learning content, lessons, and quizzes.'}
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition duration-200"
        >
          Register
        </button>
      </form>

      <div className="text-sm text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-teal-600 hover:underline">
          Login
        </a>
      </div>
    </div>

      {/* Spacer to push footer down */}
      <div className="flex-1"></div>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
