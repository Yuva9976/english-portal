import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null
  const userRole = user?.roleAlias || user?.role
  
  const [searchQuery, setSearchQuery] = useState('')

  function handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  function handleSearch(e){
    e.preventDefault()
    if(searchQuery.trim()){
      navigate(`/lessons?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Determine if user is tutor/teacher
  const isTutor = userRole === 'tutor' || userRole === 'teacher'
  const isAdmin = userRole === 'admin'

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md'>
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

        {/* Auth Buttons */}
        <div className='flex items-center gap-3'>
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
          
          {/* Role-based navigation */}
          {token && (
            <>
              {/* Tutor/Teacher Dashboard */}
              {isTutor && (
                <Link to='/tutor/dashboard' className='text-slate-700 hover:text-teal-600 font-medium text-sm font-semibold text-teal-700'>Tutor Dashboard</Link>
              )}
              
              {/* Admin Dashboard */}
              {isAdmin && (
                <Link to='/admin-dashboard' className='text-slate-700 hover:text-teal-600 font-medium text-sm font-semibold text-teal-700'>Admin Dashboard</Link>
              )}
              
              {/* Learner links - show ONLY for learners (not tutors, not admin) */}
              {!isAdmin && !isTutor && (
                <>
                  <Link to='/learner' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Learner</Link>
                  <Link to='/modules/learn-english' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Learn English</Link>
                  <Link to='/modules/grammar-hub' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Grammar Hub</Link>
                </>
              )}
              
              {/* Teaching tools - only for tutors */}
              {isTutor && (
                <Link to='/teacher-tools' className='text-slate-700 hover:text-teal-600 font-medium text-sm'>Teaching Tools</Link>
              )}
              
              {/* Lesson categories - for all logged in users */}
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
