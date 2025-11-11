import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// correct relative path from src/pages/Auth -> src/apiClient.js
import apiClient from '../../apiClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const res = await apiClient.post('/auth/login', { email, password });

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

      navigate('/dashboard');
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
  <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">Welcome Back</h2>
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

  <button type="submit" className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded transition duration-200">
          Login
        </button>
      </form>

      <div className="text-sm text-center mt-4">
        Don't have an account? <a href="/register" className="text-teal-600 hover:underline">Register</a>
      </div>
    </div>
  );
}
