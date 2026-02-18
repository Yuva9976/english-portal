import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';
import SiteFooter from '../../components/SiteFooter';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setResetLink('');
    setLoading(true);

    try {
      const res = await apiClient.post('/auth/forgot-password', { email });
      setMessage(res.data?.message || 'Password reset link sent to your email!');
      
      // Show reset link if available (for testing)
      if (res.data?.resetLink) {
        setResetLink(res.data.resetLink);
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          'Failed to send reset link'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Navbar */}
      <header className='sticky top-0 z-50 bg-white shadow-md'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm'>EC</div>
            <div>
              <Link to='/' className='font-bold text-lg text-teal-700'>EnglishClub</Link>
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
            <Link to='/login' className='px-5 py-2 rounded-full bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition'>Login</Link>
          </div>
        </div>
      </header>

    <div className="w-[400px] max-w-full mx-auto bg-white px-6 py-6 rounded-xl shadow-lg mt-10 mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-center text-teal-700 italic font-serif">Reset Password</h2>
      
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {error && (
        <div className="text-red-600 mb-3 p-2 bg-red-50 rounded text-center font-medium">{error}</div>
      )}

      {message && (
        <div className="text-green-600 mb-3 p-2 bg-green-50 rounded text-center font-medium">{message}</div>
      )}

      {resetLink && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-300">
          <p className="text-xs text-gray-600 mb-2">Reset Link (for testing):</p>
          <a 
            href={resetLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm break-all underline"
          >
            Click here to reset password
          </a>
          <p className="text-xs text-gray-500 mt-2">Or copy the link below:</p>
          <input 
            type="text" 
            value={resetLink} 
            readOnly 
            className="w-full mt-1 p-2 text-xs border border-gray-300 rounded bg-gray-50"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your registered email"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold rounded transition duration-200"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="text-sm text-center mt-4 space-y-2">
        <div>
          Remember your password? <a href="/login" className="text-teal-600 hover:underline">Login</a>
        </div>
        <div>
          Don't have an account? <a href="/register" className="text-teal-600 hover:underline">Register</a>
        </div>
      </div>
    </div>

    {/* Spacer to push footer down */}
    <div className="flex-1"></div>

    {/* Site Footer */}
    <SiteFooter />
    </div>
  );
}
