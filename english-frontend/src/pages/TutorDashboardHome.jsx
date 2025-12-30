import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TutorDashboardLayout from '../components/TutorDashboardLayout'
import apiClient from '../apiClient'

const formatTime = (value) => {
  if (!value) return 'TBD'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return 'TBD'
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (value) => {
  if (!value) return '—'
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString()
}

const SectionSkeleton = ({ className }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm text-sm text-slate-500 animate-pulse flex items-center justify-center ${className ?? ''}`}
  >
    Loading dashboard...
  </div>
)

export default function TutorDashboardHome() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const mountedRef = useRef(false)

  const fetchOverview = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiClient.get('/tutor/dashboard/overview')
      if (!mountedRef.current) return
      setOverview(res.data ?? null)
      setLastUpdated(new Date())
    } catch (err) {
      if (!mountedRef.current) return
      console.error('Tutor dashboard overview fetch failed', err)
      setError("Couldn't load tutor overview. Please retry.")
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    fetchOverview()
    return () => {
      mountedRef.current = false
    }
  }, [fetchOverview])

  const todayClasses = overview?.today?.classes ?? []
  const stats = overview?.stats ?? {}
  const recentResources = overview?.recentResources ?? []
  const notifications = overview?.notifications ?? []
  const isInitialLoad = loading && !overview
  const headerStatus = loading
    ? 'Refreshing...'
    : lastUpdated
      ? `Last updated at ${formatTime(lastUpdated)}`
      : 'Updated just now'

  const quizSubmissions = useMemo(
    () =>
      notifications
        .filter((note) => note.type === 'quiz_submitted')
        .map((note) => {
          const score = note.details?.score
          return {
            id: note.id,
            studentName: note.details?.studentName || 'Learner',
            quizName: note.details?.quizName || 'Quiz',
            scoreLabel: typeof score === 'number' ? `${score}%` : '—',
            createdAt: note.createdAt,
          }
        }),
    [notifications]
  )

  const statsCards = [
    { label: 'Active classes', value: stats.activeClasses ?? 0 },
    { label: 'Total students', value: stats.totalStudents ?? 0 },
    { label: 'Avg quiz score this week', value: `${stats.avgQuizScoreThisWeek ?? 0}%` },
    { label: 'Resources shared', value: stats.resourcesShared ?? 0 },
  ]

  return (
    <TutorDashboardLayout>
      <div className='space-y-8'>
        <section className='space-y-4'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Schedule</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Today’s Schedule</h2>
            </div>
            <span className='text-sm text-slate-500'>{headerStatus}</span>
          </div>
          {error && (
            <div className='rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-center justify-between gap-4'>
              <span>{error}</span>
              <button
                type='button'
                onClick={fetchOverview}
                className='text-rose-600 font-semibold hover:text-rose-700 focus:outline-none'
              >
                Retry
              </button>
            </div>
          )}
          {isInitialLoad ? (
            <SectionSkeleton className='h-48' />
          ) : todayClasses.length ? (
            <div className='grid gap-4'>
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className='bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                >
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
                      {cls.level || 'Level TBD'}
                    </p>
                    <h3 className='text-lg font-semibold text-slate-900'>{cls.title}</h3>
                    <p className='text-sm text-slate-500'>
                      {formatTime(cls.startTime)} – {formatTime(cls.endTime)}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='inline-flex px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-slate-100'>
                      {cls.status}
                    </span>
                    <button className='px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800'>
                      Join class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500'>
              No classes scheduled for today.
            </div>
          )}
        </section>

        <section>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Insights</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Key Stats</h2>
            </div>
          </div>
          {isInitialLoad ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4'>
              {Array.from({ length: 4 }).map((_, index) => (
                <SectionSkeleton key={`stat-skel-${index}`} className='h-28' />
              ))}
            </div>
          ) : (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4'>
              {statsCards.map((card) => (
                <div key={card.label} className='bg-white rounded-2xl border border-slate-200 p-5 shadow-sm'>
                  <p className='text-sm text-slate-500'>{card.label}</p>
                  <p className='mt-3 text-3xl font-bold text-slate-900'>{card.value}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Activity</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Recent Activity</h2>
            </div>
          </div>
          <div className='grid gap-4 lg:grid-cols-2'>
            {isInitialLoad ? (
              <>
                <SectionSkeleton className='min-h-[220px]' />
                <SectionSkeleton className='min-h-[220px]' />
              </>
            ) : (
              <>
                <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4'>
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold text-slate-800'>Recent resources</p>
                    <span className='text-xs text-slate-500'>Updated now</span>
                  </div>
                  {recentResources.length ? (
                    <div className='space-y-3'>
                      {recentResources.map((resource) => {
                        const resourceType = resource.type ? resource.type.toUpperCase() : 'RESOURCE'
                        return (
                          <div key={resource.id} className='flex items-center justify-between gap-4'>
                            <div>
                              <h3 className='text-base font-semibold text-slate-900'>{resource.title}</h3>
                              <p className='text-xs text-slate-500'>Type: {resourceType}</p>
                            </div>
                            <div className='flex flex-col items-end text-xs text-slate-500'>
                              <span>{resource.views ?? 0} views</span>
                              <span>Last used {formatDate(resource.updatedAt)}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className='text-sm text-slate-500'>No recent activity yet.</p>
                  )}
                </div>
                <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4'>
                  <div className='flex items-center justify-between'>
                    <p className='font-semibold text-slate-800'>Recent quiz submissions</p>
                    <span className='text-xs text-slate-500'>Live feed</span>
                  </div>
                  {quizSubmissions.length ? (
                    <div className='space-y-3'>
                      {quizSubmissions.map((submission) => (
                        <div key={submission.id} className='flex items-center justify-between gap-3'>
                          <div>
                            <p className='text-sm font-semibold text-slate-900'>{submission.studentName}</p>
                            <p className='text-xs text-slate-500'>Quiz · {submission.quizName}</p>
                          </div>
                          <span className='text-xs font-semibold text-slate-900'>{submission.scoreLabel}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-sm text-slate-500'>No recent activity yet.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        <section className='space-y-3'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <p className='text-xs uppercase tracking-wider text-slate-500'>Updates</p>
              <h2 className='text-2xl font-semibold text-slate-900'>Notifications</h2>
            </div>
          </div>
          {isInitialLoad ? (
            <SectionSkeleton className='min-h-[220px]' />
          ) : (
            <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3'>
              {notifications.length ? (
                notifications.map((note) => (
                  <div key={note.id} className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-sm font-semibold text-slate-900'>{note.message}</p>
                      <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
                    </div>
                    <span className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>
                      {(note.type ? note.type.replace('_', ' ') : 'Update')}
                    </span>
                  </div>
                ))
              ) : (
                <p className='text-sm text-slate-500'>You are all caught up.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </TutorDashboardLayout>
  )
}
