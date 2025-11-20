import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteFooter(){
  return (
    <footer className='relative bg-gradient-to-br from-teal-950 via-slate-900 to-rose-950 text-white pt-16 pb-8 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-600/30 to-transparent rounded-full blur-3xl -mr-48 -mt-48 animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-600/30 to-transparent rounded-full blur-3xl -ml-48 -mb-48 animate-pulse' style={{animationDelay: '1.5s'}}></div>
        <div className='absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-b from-yellow-500/20 to-transparent rounded-full blur-3xl -ml-40 -mt-40' style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className='container mx-auto px-6 max-w-7xl relative z-10'>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12'>
          
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 via-teal-500 to-rose-400 flex items-center justify-center font-bold text-white shadow-lg'>
                EC
              </div>
              <div>
                <div className='font-bold text-lg'>EnglishClub</div>
                <div className='text-xs text-gray-400'>Learn • Teach • Explore</div>
              </div>
            </div>
            <p className='text-sm text-gray-400 leading-relaxed mb-5'>Master English with interactive lessons, quizzes, and teacher tools. Beautifully designed and completely free.</p>
            
            {/* Social Icons */}
            <div className='flex gap-3'>
              <a href='#' className='w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md'>
                <span className='text-white font-bold'>𝕏</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md'>
                <span className='text-white font-bold'>f</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md'>
                <span className='text-white font-bold'>in</span>
              </a>
            </div>
          </div>

          {/* Learn English */}
          <div>
            <h4 className='font-bold text-lg mb-5 text-transparent bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text'>Learn English</h4>
            <ul className='space-y-3'>
              <li><Link to='/modules/grammar-hub' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Grammar</Link></li>
              <li><Link to='/modules/learn-english/vocabulary' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Vocabulary</Link></li>
              <li><Link to='/modules/learn-english/pronunciation' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Pronunciation</Link></li>
              <li><Link to='/modules/learn-english/listening' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Listening</Link></li>
              <li><Link to='/modules/learn-english/speaking' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Speaking</Link></li>
              <li><Link to='/modules/learn-english/reading' className='text-gray-400 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Reading</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className='font-bold text-lg mb-5 text-transparent bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text'>Resources</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Interactive Games</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Practice Quizzes</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Study Materials</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Audio Lessons</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Community Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-bold text-lg mb-5 text-transparent bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text'>Support</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Help Center</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Contact Us</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Report Issue</a></li>
              <li><a href='#' className='text-gray-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Feedback</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className='font-bold text-lg mb-5 text-transparent bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text'>About</h4>
            <ul className='space-y-3'>
              <li><a href='#' className='text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> About Us</a></li>
              <li><a href='#' className='text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Terms of Service</a></li>
              <li><a href='#' className='text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Privacy Policy</a></li>
              <li><a href='#' className='text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2'><span>→</span> Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='h-1 bg-gradient-to-r from-teal-600 via-transparent to-rose-400 mb-8'></div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
          <div className='text-center md:text-left'>
            <p className='text-sm text-gray-400 mb-2'>© {new Date().getFullYear()} EnglishClub. All rights reserved.</p>
            <p className='text-xs text-gray-500'>Designed with ❤️ for English learners worldwide</p>
          </div>
          
          {/* Newsletter Signup */}
          <div className='flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10'>
            <input 
              type='email' 
              placeholder='Enter your email' 
              className='bg-transparent text-white text-sm placeholder-gray-500 outline-none flex-grow'
            />
            <button className='bg-gradient-to-r from-teal-600 to-rose-400 hover:from-teal-700 hover:to-rose-500 text-white font-bold px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
