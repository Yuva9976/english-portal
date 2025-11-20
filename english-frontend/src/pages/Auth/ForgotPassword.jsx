import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient';

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-700">Reset Password</h2>
      
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
  );
}
