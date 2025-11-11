import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className='sticky top-0 z-30 bg-white/80 backdrop-blur shadow-sm'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white'>EC</div>
          <Link to='/' className='font-semibold text-lg'>EnglishLearn</Link>
        </div>
        <nav className='hidden md:flex items-center gap-4'>
          <Link to='/' className='hover:text-sky-600'>Home</Link>
          <Link to='/lessons' className='hover:text-sky-600'>Lessons</Link>
          <Link to='/dashboard' className='hover:text-sky-600'>Dashboard</Link>
        </nav>
        <div className='flex items-center gap-3'>
          {!token ? (
            <>
              <Link to='/login' className='px-4 py-2 rounded-md bg-sky-500 text-white'>Login</Link>
              <Link to='/register' className='px-4 py-2 rounded-md border'>Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className='px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700'>Logout</button>
          )}
          <button className='md:hidden' aria-label='menu'>☰</button>
        </div>
      </div>
    </header>
  )
}
