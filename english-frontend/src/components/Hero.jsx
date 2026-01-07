import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="container mx-auto px-4 md:px-8 pt-6 pb-2 min-h-[calc(100vh-120px)]">
      {/* Banner Container - Full height */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 text-white rounded-2xl overflow-hidden h-full min-h-[calc(100vh-150px)]">
        
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-8 h-full items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
              <span>⭐</span>
              <span>Trusted by 50K+ Learners</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                Unlock Your
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-white bg-clip-text text-transparent">English Potential</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-medium mt-3">Master grammar, vocabulary, pronunciation & more</p>
            </div>

            {/* Description */}
            <p className="text-base text-white/85 leading-relaxed max-w-lg">
              Join thousands of students learning English through interactive lessons, real conversations, and personalized feedback. Start your journey today—completely free!
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Link to="/modules/learn-english" className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:bg-yellow-300 hover:scale-105 transition-all">
                <span>🚀</span>
                <span>Start Learning</span>
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white rounded-lg font-bold text-base bg-white/10 hover:bg-white/20 hover:scale-105 transition-all">
                <span>✨</span>
                <span>Create Account</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-4 pt-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-black text-yellow-300">500+</div>
                <div className="text-sm text-white/80">Lessons</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-black text-yellow-300">1000+</div>
                <div className="text-sm text-white/80">Quizzes</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3">
                <div className="text-2xl font-black text-yellow-300">24/7</div>
                <div className="text-sm text-white/80">Access</div>
              </div>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px]">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/20 to-rose-400/20 rounded-2xl blur-2xl"></div>
              
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                {/* Image */}
                <div className="relative h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop" 
                    alt="Learning Community" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                    ⭐
                  </div>
                </div>
                
                {/* Info section */}
                <div className="p-4 bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span>👥</span>
                    <span className="text-sm font-bold text-white">50K+ Active Learners</span>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Join a vibrant community of English learners from around the world.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>
                    <span className="text-sm text-white/60 ml-1">Learning now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
