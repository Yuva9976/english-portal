import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// correct relative path from src/pages/Auth -> src/apiClient.js
import apiClient from '../../apiClient';
import SiteFooter from '../../components/SiteFooter';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const loginUrl = isAdmin ? '/auth/admin-login' : '/auth/login';
      const res = await apiClient.post(loginUrl, { email, password });

      if (res.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      // Save token from response or from axios headers
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      } else {
        // Token might be in Authorization header or cookie
        const token = res.headers.authorization?.replace('Bearer ', '');
        if (token) {
          localStorage.setItem('token', token);
        }
      }

      // Redirect based on user role - All users go to home page first
      const user = res.data?.user
      const userRole = user?.roleAlias || user?.role
      
      if (userRole === 'learner') {
        navigate('/')
      } else if (userRole === 'teacher' || userRole === 'tutor') {
        navigate('/') // Tutor goes to home first, can access dashboard from navbar
      } else if (userRole === 'admin') {
        navigate('/')
      } else if (userRole === 'content_provider' || userRole === 'provider') {
        navigate('/')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          'Login failed'
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
            <Link to='/register' className='px-5 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition'>Join Free</Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">{isAdmin ? 'Admin Login' : 'Welcome Back'}</h2>
        {error && <div className="text-red-600 mb-3 text-center font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="adminLogin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
            />
            <label htmlFor="adminLogin" className="ml-2 block text-sm text-gray-700 cursor-pointer">
              Admin Login
            </label>
          </div>

          <button type="submit" className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition duration-200">
            {isAdmin ? 'Admin Login' : 'Login'}
          </button>
        </form>

        <div className="text-sm text-center mt-4 space-y-2">
          <div>
            Don't have an account? <a href="/register" className="text-teal-600 hover:underline">Register</a>
          </div>
          <div>
            <a href="/forgot-password" className="text-teal-600 hover:underline">Forgot Password?</a>
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
