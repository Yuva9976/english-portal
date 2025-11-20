import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.post('/auth/reset-password', { 
        token, 
        password 
      });
      setMessage(res.data?.message || 'Password reset successfully! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          'Failed to reset password'
      );
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">Invalid Link</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <a href="/forgot-password" className="block text-center text-teal-600 hover:underline mt-4">
          Request New Reset Link
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">Set New Password</h2>

      {error && (
        <div className="text-red-600 mb-3 p-2 bg-red-50 rounded text-center font-medium">{error}</div>
      )}

      {message && (
        <div className="text-green-600 mb-3 p-2 bg-green-50 rounded text-center font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter new password"
          />
          <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold rounded transition duration-200"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="text-sm text-center mt-4">
        <a href="/login" className="text-teal-600 hover:underline">Back to Login</a>
      </div>
    </div>
  );
}
