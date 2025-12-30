import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRequiredModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-fade-in border border-gray-100 my-4">
        {/* Premium Header */}
        <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 p-6 text-center text-white">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="text-5xl mb-2 inline-block animate-bounce">🔐</div>
            <h2 className="text-2xl font-bold mb-1">Unlock Premium</h2>
            <p className="text-teal-100 text-xs font-medium">Access Exclusive Learning Content</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-center mb-5">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Start Your Learning Journey
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Join thousands of successful learners and transform your English skills with our comprehensive courses and interactive lessons.
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-2 mb-5 bg-gradient-to-br from-teal-50 to-rose-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
              <span className="text-gray-700 font-medium text-xs">Access 200+ Interactive Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
              <span className="text-gray-700 font-medium text-xs">Track Progress & Achievements</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
              <span className="text-gray-700 font-medium text-xs">Take Unlimited Practice Quizzes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
              <span className="text-gray-700 font-medium text-xs">Earn Certificates & Badges</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2 mb-2">
            <button
              onClick={handleLogin}
              className="w-full py-2 px-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
            >
              🚀 Login Now
            </button>
            <button
              onClick={handleRegister}
              className="w-full py-2 px-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold rounded-lg hover:from-rose-500 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-sm"
            >
              ✨ Create Free Account
            </button>
          </div>

          {/* Dismiss Option */}
          <button
            onClick={onClose}
            className="w-full py-1 text-gray-600 hover:text-gray-800 font-semibold transition-colors text-xs"
          >
            Maybe Later
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 text-center border-t border-gray-200">
          <p className="text-gray-700 text-xs">
            Already have an account?{' '}
            <button 
              onClick={handleLogin} 
              className="text-teal-600 font-bold hover:text-teal-700 transition-colors"
            >
              Sign In Here
            </button>
          </p>
        </div>

        {/* Rating Badge */}
        <div className="bg-yellow-50 px-5 py-2 text-center border-t border-yellow-200">
          <p className="text-xs text-gray-600">
            ⭐⭐⭐⭐⭐ Trusted by 50,000+ learners
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
