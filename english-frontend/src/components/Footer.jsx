import React from 'react'
export default function Footer(){
  return (
    <footer className='bg-slate-900 text-slate-200'>
      <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white text-xs'>EC</div>
            <div className='font-bold text-lg'>EnglishClub</div>
          </div>
          <p className='text-sm max-w-md'>Practice English with lessons, quizzes and track your progress.</p>
        </div>
        <div className='mt-4 md:mt-0'>
          <div className='font-semibold text-rose-400'>Links</div>
          <ul className='text-sm'>
            <li>Home</li>
            <li>Lessons</li>
            <li>Dashboard</li>
          </ul>
        </div>
      </div>
      <div className='bg-slate-800 text-sm text-center py-3'>© {new Date().getFullYear()} EnglishClub. All rights reserved.</div>
    </footer>
  )
}
