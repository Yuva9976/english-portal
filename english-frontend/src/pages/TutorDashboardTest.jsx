import React from 'react'
import TutorDashboardLayout from '../components/TutorDashboardLayout'

const scheduleCards = [
  { title: 'Conversational Lab', time: '09:00 - 10:00', status: 'Live', room: 'Room A' },
  { title: 'Writing Workshop', time: '11:00 - 12:00', status: 'Upcoming', room: 'Room B' },
]

const stats = [
  { label: 'Active classes', value: 2 },
  { label: 'Total students', value: 3 },
  { label: 'Avg quiz score', value: '78%' },
  { label: 'Resources shared', value: 5 },
]

const resources = [
  { title: 'Present Simple Guide', type: 'PDF', views: 3 },
  { title: 'Pronunciation Lab', type: 'Video', views: 2 },
  { title: 'Academic Vocabulary Pack', type: 'Link', views: 1 },
]

const notifications = [
  { title: 'Learner Ana joined Conversational Lab', timestamp: 'Just now' },
  { title: 'Quiz submission received from Learner Ben', timestamp: '10m ago' },
  { title: 'Learner Cal viewed Pronunciation Lab', timestamp: '30m ago' },
]

export default function TutorDashboardTest() {
  return (
    <TutorDashboardLayout>
      <div className='space-y-8'>
        <section>
          <div className='flex items-center justify-between mb-3'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Schedule</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Today's Schedule</h2>
            </div>
            <span className='text-sm text-slate-500'>Live updates</span>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            {scheduleCards.map((session) => (
              <div key={session.title} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold text-slate-800'>{session.title}</p>
                  <span className='text-xs font-semibold uppercase text-emerald-600'>{session.status}</span>
                </div>
                <p className='mt-2 text-sm text-slate-500'>{session.time}</p>
                <p className='text-xs text-slate-400'>{session.room}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className='flex items-center justify-between mb-3'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Metrics</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Key Stats</h2>
            </div>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.label} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                <p className='text-sm text-slate-500'>{stat.label}</p>
                <p className='mt-3 text-3xl font-bold text-slate-900'>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='grid gap-4 lg:grid-cols-2'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-xl font-semibold text-slate-900'>Recent Resources</h2>
              <span className='text-xs text-slate-500'>Updated now</span>
            </div>
            <div className='space-y-3'>
              {resources.map((resource) => (
                <div key={resource.title} className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-slate-900'>{resource.title}</p>
                    <p className='text-xs text-slate-500'>{resource.type}</p>
                  </div>
                  <span className='text-xs font-semibold text-slate-500'>{resource.views} views</span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-xl font-semibold text-slate-900'>Notifications</h2>
              <span className='text-xs text-slate-500'>Live feed</span>
            </div>
            <div className='space-y-3'>
              {notifications.map((note) => (
                <div key={note.title} className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-slate-900'>{note.title}</p>
                    <p className='text-xs text-slate-500'>{note.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </TutorDashboardLayout>
  )
}
