import React from 'react'
import { Link } from 'react-router-dom'

export default function SiteFooter(){
  return (
    <footer className='bg-slate-900 text-slate-100'>
      <div className='container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8'>
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white'>EC</div>
            <div>
              <div className='font-semibold'>EnglishClub</div>
              <div className='text-sm text-slate-400'>Learn • Teach • Explore</div>
            </div>
          </div>
          <p className='text-sm text-slate-400 max-w-xs'>Practical lessons, quizzes and teacher tools. Beautifully designed and free to use.</p>
          <div className='flex gap-3 mt-4'>
            <a className='w-8 h-8 bg-teal-600 hover:bg-teal-700 rounded flex items-center justify-center text-sm font-bold transition'>T</a>
            <a className='w-8 h-8 bg-teal-600 hover:bg-teal-700 rounded flex items-center justify-center text-sm font-bold transition'>F</a>
            <a className='w-8 h-8 bg-teal-600 hover:bg-teal-700 rounded flex items-center justify-center text-sm font-bold transition'>I</a>
          </div>
        </div>

        <div>
          <h4 className='font-semibold mb-3 text-rose-400'>Learn English</h4>
          <ul className='text-sm text-slate-400 space-y-2'>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Grammar</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Vocabulary</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Pronunciation</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Listening</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Speaking</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Reading</Link></li>
            <li><Link to='/lessons' className='hover:text-blue-400 transition'>Writing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className='font-semibold mb-3 text-rose-400'>Resources</h4>
          <ul className='text-sm text-slate-400 space-y-2'>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Games</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Quizzes</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>e-Books</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Forums</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className='font-semibold mb-3 text-blue-400'>EnglishClub</h4>
          <ul className='text-sm text-slate-400 space-y-2'>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>About</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Contact</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Join</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Terms</a></li>
            <li><a className='hover:text-blue-400 transition cursor-pointer'>Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className='bg-slate-800 text-sm text-center py-4 text-slate-400'>© {new Date().getFullYear()} EnglishClub</div>
    </footer>
  )
}
