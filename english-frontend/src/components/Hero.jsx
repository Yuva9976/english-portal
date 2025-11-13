import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-rose-400 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Learn English confidently — <span className="text-yellow-300">practice</span>, <span className="text-yellow-300">speak</span>, and <span className="text-yellow-300">grow</span>.
            </h1>
            <p className="mt-6 text-blue-100 max-w-xl">
              Bite-sized lessons, interactive quizzes, and progress tracking to help you speak naturally.
              Start from basics or level up with advanced lessons and real-world conversations.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/modules/learn-english" className="inline-block bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-slate-100 transition">
                Start Learning
              </Link>
              <Link to="/register" className="inline-block px-6 py-3 border border-white/40 rounded-lg hover:bg-white/10 transition">
                Join Free
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center font-semibold">A1</div>
                <div>Beginner to Advanced</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center font-semibold">Quiz</div>
                <div>Interactive Quizzes</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white/20 rounded flex items-center justify-center font-semibold">Track</div>
                <div>Progress Dashboard</div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" alt="students" className="rounded-lg shadow-lg brightness-125 contrast-110" />
              <div className="mt-4 text-sm text-blue-100">
                <strong>Real students:</strong> Improve fluency with lessons and practice speaking in a safe environment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
