import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      {/* Background with premium gradients */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 text-white py-10 overflow-hidden">
        
        {/* Animated premium background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating circles */}
          <div className="absolute top-10 right-10 w-80 h-80 bg-white/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-300/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl"></div>
          
          {/* Gradient mesh background */}
          <svg className="absolute w-full h-full opacity-20" viewBox="0 0 1200 600">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#f87171', stopOpacity: 0.3}} />
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#grad1)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[400px]">
            
            {/* Left Content - Premium */}
            <div className="space-y-4">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-lg rounded-full px-4 py-2 border border-white/30 text-sm font-semibold hover:bg-white/35 transition-all duration-300">
                <span className="text-lg">⭐</span>
                <span>Trusted by 50K+ Learners</span>
              </div>

              {/* Main Heading - Eye-Catching */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                  Unlock Your
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-white bg-clip-text text-transparent">English Potential</span>
                </h1>
                <p className="text-lg text-white/95 font-semibold">Master grammar, vocabulary, pronunciation & more</p>
              </div>

              {/* Premium Description */}
              <p className="text-base text-white/90 leading-relaxed max-w-lg">
                Join thousands of students learning English through interactive lessons, real conversations, and personalized feedback. Start your journey today—completely free!
              </p>

              {/* CTA Buttons - Premium Style */}
              <div className="flex gap-3 pt-2 flex-wrap">
                <Link to="/modules/learn-english" className="group inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 hover:bg-yellow-300 transition-all duration-300 transform">
                  <span className="text-lg group-hover:rotate-12 transition-transform">🚀</span>
                  <span>Start Learning</span>
                </Link>
                <Link to="/register" className="group inline-flex items-center gap-2 px-6 py-2 border-2 border-white rounded-lg font-bold text-sm bg-white/10 hover:bg-white/25 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                  <span className="text-lg">✨</span>
                  <span>Create Account</span>
                </Link>
              </div>

              {/* Stats - Premium Cards */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/25 hover:scale-105 transition-all duration-300 group cursor-pointer">
                  <div className="text-2xl font-black text-yellow-300 mb-1 group-hover:scale-125 transition-transform origin-left">500+</div>
                  <div className="text-xs font-semibold text-white/80">Lessons</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/25 hover:scale-105 transition-all duration-300 group cursor-pointer">
                  <div className="text-2xl font-black text-yellow-300 mb-1 group-hover:scale-125 transition-transform origin-left">1000+</div>
                  <div className="text-xs font-semibold text-white/80">Quizzes</div>
                </div>
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/25 hover:scale-105 transition-all duration-300 group cursor-pointer">
                  <div className="text-2xl font-black text-yellow-300 mb-1 group-hover:scale-125 transition-transform origin-left">24/7</div>
                  <div className="text-xs font-semibold text-white/80">Access</div>
                </div>
              </div>
            </div>

            {/* Right Image Section - Premium */}
            <div className="flex justify-center lg:justify-end h-full">
              <div className="relative w-full max-w-sm group">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/30 to-rose-400/30 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                
                {/* Main card */}
                <div className="relative bg-white/15 backdrop-blur-2xl rounded-2xl p-1 border-2 border-white/30 shadow-xl group-hover:shadow-2xl group-hover:border-white/50 transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
                  <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-4 space-y-3 flex-1 flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg flex-1">
                      <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&h=500" 
                        alt="Learning Community" 
                        className="w-full h-full object-cover brightness-110 contrast-125 group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Premium badge on image */}
                      <div className="absolute top-3 right-3 bg-gradient-to-br from-yellow-300 to-yellow-400 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-125 transition-transform">
                        ⭐
                      </div>
                    </div>
                    
                    {/* Info card */}
                    <div className="space-y-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <span className="text-xs font-bold text-white">50K+ Active Learners</span>
                      </div>
                      <p className="text-xs text-white/85 leading-relaxed">
                        Join a vibrant community of English learners from around the world.
                      </p>
                      <div className="flex gap-2 pt-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" style={{animationDelay: '1s'}}></div>
                        <span className="text-xs text-white/60 ml-2">Learning now</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}
