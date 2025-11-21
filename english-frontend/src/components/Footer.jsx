import React from 'react'
export default function Footer(){
  return (
    <footer className='bg-white border-t-2 border-teal-600'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-4 gap-8 mb-8'>
          {/* Brand Section */}
          <div>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm shadow-lg'>EC</div>
              <div className='font-bold text-lg bg-gradient-to-r from-teal-600 to-rose-400 bg-clip-text text-transparent'>EnglishClub</div>
            </div>
            <p className='text-sm text-gray-700 max-w-xs leading-relaxed'>Master English with interactive lessons, quizzes, and progress tracking. Your journey to fluency starts here.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-teal-600'>Quick Links</h4>
            <ul className='text-sm space-y-2'>
              <li><a href='/' className='text-gray-700 hover:text-teal-600 hover:font-semibold transition duration-300'>Home</a></li>
              <li><a href='/modules' className='text-gray-700 hover:text-rose-400 hover:font-semibold transition duration-300'>Lessons</a></li>
              <li><a href='/dashboard' className='text-gray-700 hover:text-teal-600 hover:font-semibold transition duration-300'>Dashboard</a></li>
              <li><a href='/about' className='text-gray-700 hover:text-rose-400 hover:font-semibold transition duration-300'>About Us</a></li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-teal-600'>Resources</h4>
            <ul className='text-sm space-y-2'>
              <li><a href='/modules/grammar-hub' className='text-gray-700 hover:text-teal-600 hover:font-semibold transition duration-300'>Grammar Hub</a></li>
              <li><a href='/modules/parts-of-speech' className='text-gray-700 hover:text-rose-400 hover:font-semibold transition duration-300'>Parts of Speech</a></li>
              <li><a href='/modules/learn-english' className='text-gray-700 hover:text-teal-600 hover:font-semibold transition duration-300'>Learn English</a></li>
              <li><a href='/contact' className='text-gray-700 hover:text-rose-400 hover:font-semibold transition duration-300'>Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className='font-bold text-lg mb-4 text-teal-600'>Stay Updated</h4>
            <p className='text-sm text-gray-700 mb-4'>Get tips and updates delivered to your inbox.</p>
            <div className='flex gap-2'>
              <input 
                type='email' 
                placeholder='Your email' 
                className='flex-1 px-3 py-2 bg-gray-100 border-2 border-teal-200 rounded-lg text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-teal-600 transition'
              />
              <button className='px-4 py-2 bg-gradient-to-r from-teal-600 to-rose-400 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-400/50 transition duration-300'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-teal-200 my-8'></div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-sm text-gray-600'>
            © {new Date().getFullYear()} EnglishClub. All rights reserved.
          </div>
          <div className='flex gap-6 text-sm'>
            <a href='/privacy' className='text-gray-600 hover:text-teal-600 transition duration-300'>Privacy Policy</a>
            <a href='/terms' className='text-gray-600 hover:text-rose-400 transition duration-300'>Terms of Service</a>
            <a href='/contact' className='text-gray-600 hover:text-teal-600 transition duration-300'>Contact</a>
          </div>
          <div className='flex gap-4'>
            <a href='#' className='w-8 h-8 rounded-full bg-teal-100 border border-teal-600 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition duration-300 text-xs font-bold'>f</a>
            <a href='#' className='w-8 h-8 rounded-full bg-rose-100 border border-rose-400 flex items-center justify-center text-rose-400 hover:bg-rose-400 hover:text-white transition duration-300 text-xs font-bold'>t</a>
            <a href='#' className='w-8 h-8 rounded-full bg-teal-100 border border-teal-600 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition duration-300 text-xs font-bold'>in</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
