import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// correct relative path from src/pages/Auth -> src/apiClient.js
import apiClient from '../../apiClient';

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">
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
            <option value="learner">Learner (student)</option>
            <option value="teacher">Teacher (instructor)</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Admin accounts are created by the system administrator only.</p>
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
  );
}
