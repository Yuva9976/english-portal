import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LearnerSidebar from '../components/LearnerSidebar'
import apiClient from '../apiClient'

function Donut({ value = 54, size = 96 }){
  const radius = 40
  const stroke = 10
  const normalizedRadius = radius - stroke * 0.5
  const circumference = normalizedRadius * 2 * Math.PI
  const percent = Math.max(0, Math.min(100, value))
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${radius*2} ${radius*2}`}>
      <g transform={`translate(${radius},${radius})`}>
        <circle r={normalizedRadius} fill="#fff" stroke="#eef2ff" strokeWidth={stroke} />
        <circle r={normalizedRadius} fill="transparent" stroke="#3b82f6" strokeWidth={stroke} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90)" />
        <text x="0" y="4" textAnchor="middle" fontSize="14" fill="#0f172a" fontWeight="700">{value}</text>
      </g>
    </svg>
  )
}

function MiniCalendar(){
  const days = Array.from({length: 31}, (_,i)=>i+1)
  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1">
        {days.map(d=> (
          <div key={d} className='w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-600'>{d}</div>
        ))}
      </div>
    </div>
  )
}

function SmallLineChart({ width = 320, height = 120 }){
  // responsive SVG chart using viewBox so it scales to container
  const points = [78,80,79,81,80,81,80]
  const max = 100
  const w = width
  const h = height
  const pad = 36
  const innerW = w - pad * 2
  const innerH = h - pad * 2
  const stepX = innerW / (points.length - 1)
  const coords = points.map((v,i)=> ({ x: pad + i*stepX, y: pad + innerH - (v/max)*innerH }))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="xMinYMin meet" className="block">
      {[0,0.25,0.5,0.75,1].map((t,i)=> (
        <line key={i} x1={pad} x2={w-pad} y1={pad + innerH*t} y2={pad + innerH*t} stroke="#eef2f6" strokeWidth={1} />
      ))}
      <polyline points={coords.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((p,i)=> (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#06b6d4" stroke="#fff" strokeWidth={1} />
      ))}
      {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((lab,i)=> (
        <text key={i} x={pad + i*(innerW/(points.length-1)) - 12} y={h - 6} fontSize={10} fill="#94a3b8">{lab}</text>
      ))}
      {[0,20,40,60,80,100].map((val,i)=> (
        <text key={i} x={6} y={pad + innerH - (val/max)*innerH + 4} fontSize={10} fill="#94a3b8">{val}</text>
      ))}
    </svg>
  )
}

export default function LearnerDashboard(){
  const [collapsed, setCollapsed] = useState(false)
  const [data, setData] = useState(null)

  const [currentUser, setCurrentUser] = useState(null)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [learners, setLearners] = useState([])
  const [bulkDate, setBulkDate] = useState(new Date().toISOString().slice(0,10))
  const [bulkSession, setBulkSession] = useState('')
  const [bulkSelections, setBulkSelections] = useState({})

  useEffect(()=>{
    /*
      Fetch consolidated learner dashboard from backend.
      Endpoint: GET /api/dashboard/learner
      The `apiClient` includes the Authorization header (token) so this
      will return data for the logged-in learner.

      How to verify in browser (Network + React DevTools):
      1) Open DevTools -> Network. Reload the dashboard page.
      2) Find the GET request to `/api/dashboard/learner` and inspect Response.
         It should be a single JSON object with keys: profile, courses,
         attendance, tasks, quizzes, upcoming, weeklyTests.
      3) In React DevTools, inspect `LearnerDashboard` component props/state
         and confirm `data` matches the Network response.
      4) To test first-time login: open Application -> Cookies, clear session/token,
         then log in as a learner; on first visit the Network response should still
         reflect actual backend rows (may be empty arrays/zeros for new learners).
    */
    let mounted = true
    async function load(){
      try {
        const res = await apiClient.get('/dashboard/learner')
        if (!mounted) return
        // apiClient wraps axios: response data is in res.data
        setData(res.data)
      } catch (e){
        console.error('Failed to load learner dashboard', e)
      }
    }
    load()
    return ()=>{ mounted = false }
  },[])

  // load current user and attendance (for learners)
  useEffect(()=>{
    let mounted = true
    async function loadUserAndAttendance(){
      try{
        const me = await apiClient.get('/auth/me')
        if(!mounted) return
        setCurrentUser(me.data?.user || null)

        if(me.data?.user && me.data.user.role === 'learner'){
          const to = new Date().toISOString().slice(0,10)
          const from = new Date(Date.now() - 30*24*60*60*1000).toISOString().slice(0,10)
          const att = await apiClient.get(`/attendance/user/${me.data.user.id}?from=${from}&to=${to}`)
          if(mounted) setAttendanceRecords(att.data?.records || [])
        }
      }catch(e){ /* ignore */ }
    }
    loadUserAndAttendance()
    return ()=>{ mounted = false }
  },[])

  const stats = data ? [
    { label: '📈 Attendance', value: data.attendance?.percent ? `${data.attendance.percent}%` : '0%', subtitle: `Present ${data.attendance?.present || 0}` },
    { label: '✅ Tasks Submitted', value: data.tasks?.completion ? `${data.tasks.completion}%` : '0%', subtitle: `${data.tasks?.submitted || 0} / ${data.tasks?.assigned || 0}` },
    { label: '🎯 Quiz Avg', value: data.quizzes?.averageScore ? `${Math.round(data.quizzes.averageScore)}%` : '--', subtitle: `${data.quizzes?.totalAttempts || 0} attempts` },
  ] : [
    {label: '📈 Attendance', value: '—', subtitle: ''},
    {label: '✅ Tasks Submitted', value: '—', subtitle: ''},
    {label: '🎯 Quiz Avg', value: '—', subtitle: ''},
  ]

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <LearnerSidebar collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-600">Welcome, Learner</p>
          </div>

          {/* Top metric cards moved below 'Your Courses' */}

            <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-4 h-3 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-sm"></span>
              <h2 className="font-semibold text-lg">Class and Tasks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
                <div className="font-semibold">Class</div>
                <div className="text-sm text-slate-500 mt-2">{data?.upcoming ? `Next: ${data.upcoming.title}` : 'Scheduled Soon!'}</div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
                <div className="font-semibold">Tasks</div>
                <div className="text-sm text-slate-500 mt-2">Assigned Soon!</div>
              </div>
            </div>
          </div>

          {/* Your Courses moved up - show courses and right sidebar immediately after header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-semibold mb-3">Your Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{data?.courses?.[0]?.title || '—'}</div>
                      <div className="text-xs text-slate-500">Progress: {data?.courses?.[0]?.progress ?? 0}%</div>
                    </div>
                    <div className="w-40">
                      <div className="h-3 bg-white rounded-full border overflow-hidden">
                        <div className="h-3 bg-gradient-to-r from-teal-500 to-cyan-400" style={{width: `${data?.courses?.[0]?.progress ?? 0}%`}} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{data?.courses?.[1]?.title || '—'}</div>
                      <div className="text-xs text-slate-500">Progress: {data?.courses?.[1]?.progress ?? 0}%</div>
                    </div>
                    <div className="w-40">
                      <div className="h-3 bg-white rounded-full border overflow-hidden">
                        <div className="h-3 bg-gradient-to-r from-teal-500 to-cyan-400" style={{width: `${data?.courses?.[1]?.progress ?? 0}%`}} />
                      </div>
                    </div>
                  </div>
                </div>
                  {/* Metric cards placed inside the Your Courses container — separated and evenly spaced */}
                  <div className="mt-6">
                    <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4">
                      {stats.map((s,i)=> (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex-1 min-h-[92px] flex flex-col justify-center">
                          <div className="text-sm text-slate-500 mb-1">{s.label}</div>
                          <div className="text-2xl font-extrabold">{s.value}</div>
                          <div className="text-xs text-slate-400 mt-1">{s.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Courses list ends here */}
              </div>
            </div>

            <aside>
              <div className="bg-white rounded-2xl shadow p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-300 to-rose-300 flex items-center justify-center font-bold">👤</div>
                  <div>
                    <div className="font-semibold">{data?.profile?.name || 'Learner'}</div>
                    <div className="text-xs text-slate-500">Level: {data?.profile?.level || '—'}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <div className="text-xs text-slate-500">XP</div>
                  <div className="text-lg font-bold text-teal-600">{data?.profile?.xp ?? 0}</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-4 mb-4">
                <h3 className="font-semibold mb-2">Upcoming Lesson</h3>
                <div className="text-sm text-slate-600">{data?.upcoming?.title || 'No upcoming lesson'}</div>
                <div className="mt-3 flex gap-2">
                  <button disabled={!data?.upcoming} className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-400 text-white disabled:opacity-50">Start</button>
                  <button className="px-3 py-2 rounded-lg border">Later</button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-4">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="flex flex-col gap-2">
                  <Link to="/modules/grammar-hub" className="text-sm px-3 py-2 rounded-lg bg-slate-50">Open Grammar Hub</Link>
                  <Link to="/modules/learn-english" className="text-sm px-3 py-2 rounded-lg bg-slate-50">Browse Courses</Link>
                  <Link to="/dashboard" className="text-sm px-3 py-2 rounded-lg bg-slate-50">Full Dashboard</Link>
                </div>
              </div>
              {/* Teacher-only bulk attendance */}
              {currentUser && ['teacher','admin'].includes(currentUser.role) && (
                <div className="bg-white rounded-2xl shadow p-4 mt-4">
                  <h3 className="font-semibold mb-2">Bulk Attendance</h3>
                  <div className="text-sm text-slate-600 mb-3">Mark attendance for multiple learners for a specific date/session.</div>
                  <div className="flex gap-2">
                    <input type="date" value={bulkDate} onChange={e=>setBulkDate(e.target.value)} className="px-2 py-1 border rounded" />
                    <input placeholder="Session ID (optional)" value={bulkSession} onChange={e=>setBulkSession(e.target.value)} className="px-2 py-1 border rounded" />
                  </div>
                  <div className="mt-3 flex justify-between">
                    <button onClick={async ()=>{
                      try{
                        const res = await apiClient.get('/users?role=learner')
                        setLearners(res.data.users || [])
                        // initialize selections as present by default
                        const sel = {}
                        (res.data.users || []).forEach(u=> sel[u.id] = 'present')
                        setBulkSelections(sel)
                        setShowBulkModal(true)
                      }catch(err){
                        console.error('Failed to load learners', err)
                        alert('Failed to load learners')
                      }
                    }} className="px-3 py-2 bg-teal-600 text-white rounded">Open Bulk List</button>
                    <div className="text-xs text-slate-500">Opens a modal to mark learners.</div>
                  </div>
                </div>
              )}
            </aside>
          </div>

          
          


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="font-semibold text-slate-700 mb-4">📚 Classes</div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Donut value={54} size={112} />
                </div>
                <div>
                  <div className="text-2xl font-bold">Total</div>
                  <div className="text-xs text-slate-500 mt-1">54 Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <MiniCalendar />
              <div className="text-xs text-slate-500 mt-3">Present {data?.attendance?.present || 0} • Absent {data?.attendance?.absent || 0}</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="font-semibold text-slate-700 mb-4">📊 Overview</div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-28"><Donut value={75} size={128} /></div>
                <div>
                  <div className="text-sm text-slate-500">Type</div>
                  <div className="mt-2 text-sm">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Task — 11/11 — 93%</div>
                    <div className="flex items-center gap-2 mt-2"><span className="w-3 h-3 rounded-full bg-amber-400"></span> Quiz — 0/0 — 0%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-slate-700">📝 Weekly Test</div>
                  <div className="text-xs text-slate-500">Avg --</div>
                </div>
                <SmallLineChart width={640} height={220} />
                <div className="text-xs text-slate-500 mt-3">Recent: test 1 • test 2 • test 3 • test 4</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-slate-700 mb-3">🧾 Assessments</div>
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-28 flex items-center justify-center"><Donut value={0} size={112} /></div>
                    <div>
                      <div className="text-sm text-slate-500">Total</div>
                      <div className="text-xl font-bold">--</div>
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">🔵 Submitted</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t pt-3 text-sm text-slate-600">
                  <div className="flex justify-between"><div>Completion</div><div>--</div></div>
                  <div className="flex justify-between mt-2"><div>Total Score</div><div>--/--</div></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-slate-700">🎤 Sessions & Mock</div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">🟢 Present</div>
                    <div className="flex items-center gap-2">🔴 Absent</div>
                  </div>
                </div>
                <SmallLineChart width={360} height={180} />
                <div className="text-xs text-slate-500 mt-3 text-right">Session • Mock Interview</div>
              </div>
            </div>
          </div>

          
        </div>
      </main>
    </div>
  )
}
