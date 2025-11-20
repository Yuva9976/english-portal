import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [searchQuery, setSearchQuery] = useState('')

  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  function handleSearch(e){
    e.preventDefault()
    if(searchQuery.trim()){
      navigate(`/lessons?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className='sticky top-0 z-30 bg-white shadow-md'>
      {/* Top Bar */}
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-sm'>EC</div>
          <div>
            <Link to='/' className='font-bold text-lg text-blue-700'>EnglishClub</Link>
            <div className='text-xs text-slate-600'>Learn • Teach • Explore</div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className='hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 flex-1 max-w-md mx-6'>
          <input
            type='text'
            placeholder='Search lessons, quizzes'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='bg-transparent outline-none text-sm flex-1 text-slate-700'
          />
          <button type='submit' className='text-teal-600 hover:text-teal-700'>🔍</button>
        </form>

        {/* Auth Buttons & GitHub */}
        <div className='flex items-center gap-3'>
          <a href='https://github.com/Yuva9976/english-portal' target='_blank' rel='noopener noreferrer' className='text-slate-700 hover:text-slate-900 font-medium text-sm flex items-center gap-1' title='View on GitHub'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
            </svg>
            GitHub
          </a>
          {!token ? (
            <>
              <Link to='/login' className='hidden sm:inline-block px-3 py-2 text-sm text-slate-700 hover:text-teal-600 font-medium'>Login</Link>
              <Link to='/register' className='px-5 py-2 rounded-full bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition'>Join Free</Link>
            </>
          ) : (
            <button onClick={handleLogout} className='px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm'>Logout</button>
          )}
          <button className='md:hidden text-slate-700 text-xl'>☰</button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className='hidden md:block border-t border-slate-200'>
        <div className='container mx-auto px-4 flex items-center justify-center gap-8 py-3'>
          <Link to='/' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Home</Link>
          
          {/* Only show learning content if user is logged in */}
          {token && (
            <>
              <Link to='/modules/learn-english' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Learn English</Link>
              <Link to='/modules/grammar-hub' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Grammar Hub</Link>
              <Link to='/teacher-tools' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Teach</Link>
              <Link to='/lessons?category=grammar' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Grammar</Link>
              <Link to='/lessons?category=vocabulary' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Vocabulary</Link>
              <Link to='/lessons?category=pronunciation' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Pronunciation</Link>
              <Link to='/lessons?category=listening' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Listening</Link>
              <Link to='/lessons?category=speaking' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Speaking</Link>
              <Link to='/lessons?category=reading' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Reading</Link>
              <Link to='/lessons?category=writing' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Writing</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
