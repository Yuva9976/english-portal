import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LearnerSidebar from '../components/LearnerSidebar'
import classData from '../data/englishClassData.json'
import apiClient from '../apiClient'
import { io } from 'socket.io-client'

export default function ClassPage(){
  const data = classData.currentClass || {}
  const [currentUser, setCurrentUser] = useState(null)
  const [showAttendance, setShowAttendance] = useState(false)
  const [attendanceMap, setAttendanceMap] = useState({})
  const [participants, setParticipants] = useState([])
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [localStream, setLocalStream] = useState(null)
  const [mediaError, setMediaError] = useState(null)
  const localVideoRef = useRef(null)
  const [messages, setMessages] = useState([
    { id: 1, from: 'Instructor', text: 'Welcome to the class! Please say hi.' }
  ])
  const [messageText, setMessageText] = useState('')
  const socketRef = useRef(null)
  const peersRef = useRef({}) // remoteSocketId -> { pc, makingOffer, polite, ignoreOffer }
  const [remoteStreams, setRemoteStreams] = useState({}) // socketId -> MediaStream

  // load participants from backend (learners) and include host if available
  useEffect(()=>{
    let mounted = true
    async function loadParticipants(){
      try{
        // fetch learners from API
        const res = await apiClient.get('/users?role=learner')
        const learners = res.data?.users || []

        const roster = learners.map(u => ({ id: u.id, name: u.name || u.email, isHost: false }))

        // include host: prefer currentUser if teacher/admin, otherwise show instructor name as non-db host
        if (currentUser && ['teacher','admin'].includes(currentUser.role)){
          // ensure teacher appears first
          roster.unshift({ id: currentUser.id, name: currentUser.name || currentUser.email, isHost: true })
        } else if (data.instructor){
          roster.unshift({ id: `host-${data.id || '0'}`, name: data.instructor, isHost: true })
        }

        if(mounted) setParticipants(roster)
      }catch(e){
        // fallback to mock from JSON if API fails
        const host = { id: 'host', name: data.instructor || 'Instructor', isHost: true }
        const others = (data.participants || []).map((p, i)=>({ id: `p${i}`, name: p.name || p, isHost: false }))
        if(mounted) setParticipants([host, ...others])
      }
    }
    loadParticipants()
    return ()=>{ mounted = false }
  }, [data, currentUser])

  // load current user (to check role for teacher-only UI)
  useEffect(()=>{
    let mounted = true
    async function loadUser(){
      try{
        const res = await apiClient.get('/auth/me')
        if(mounted) setCurrentUser(res.data?.user || null)
      }catch(e){ /* ignore */ }
    }
    loadUser()
    return ()=>{ mounted = false }
  },[])

  // Setup Socket.IO connection when currentUser is available
  useEffect(()=>{
    if(!currentUser) return
    const socket = io('http://localhost:4000', { withCredentials: true })
    socketRef.current = socket

    // join class room (use data.id if available)
    socket.emit('joinClass', { classId: data.id || 'default', user: { id: currentUser.id, name: currentUser.name } })

    socket.on('chatMessage', (msg)=>{
      setMessages(ms => [...ms, msg])
    })

    socket.on('systemMessage', (m)=>{
      setMessages(ms => [...ms, { id: Date.now(), from: 'System', text: m.text }])
    })

    // live participants update from socket (includes socketId + userId)
    socket.on('participants', async (list)=>{
      try{
        const mapped = (list || []).map(p=>({ socketId: p.socketId || p.socket_id || null, userId: p.userId || p.user_id || p.userId || p.id, id: p.userId || p.user_id || p.id, name: p.name || p.user_name || p.email, isHost: p.role === 'host' }))
        setParticipants(mapped)

        // Create peer connections to new peers (mesh approach) - existing clients create offers to newcomers
        const mySocketId = socketRef.current?.id
        const existingPeerIds = Object.keys(peersRef.current || {})
        for(const peer of mapped){
          if(!peer.socketId) continue
          if(peer.socketId === mySocketId) continue
          if(existingPeerIds.includes(peer.socketId)) continue
          // create an offer to this peer
          try{ await createOfferForPeer(peer.socketId) }catch(e){ console.error('offer error', e) }
        }
      }catch(e){ console.error('participants mapping error', e) }
    })

    // WebRTC signalling handlers (perfect negotiation / polite peer handling)
    socket.on('webrtc-offer', async ({ from, sdp })=>{
      try{
        if(!from) return
        // create or reuse peer object
        let obj = peersRef.current[from]
        if(!obj) obj = createPeerConnection(from)
        let pc = obj && obj.pc

        // If pc is missing for some reason, recreate
        if(!pc){ obj = createPeerConnection(from); pc = obj.pc }

        // Perfect negotiation: detect offer collision
        let offerCollision = false
        try{ offerCollision = (obj.makingOffer || (pc && pc.signalingState && pc.signalingState !== 'stable')) }catch(e){ offerCollision = obj.makingOffer }
        obj.ignoreOffer = !obj.polite && offerCollision
        if (obj.ignoreOffer) {
          // ignore the offer as we're impolite and in a collision
          console.debug('Ignoring offer due to collision from', from)
          return
        }

        // Apply the remote description (offer)
        await pc.setRemoteDescription(new RTCSessionDescription(sdp))

        // add local tracks (if any)
        if(localStream){ try{ localStream.getTracks().forEach(t=>pc.addTrack(t, localStream)) }catch(e){} }

        // create and send answer
        const answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)
        socket.emit('webrtc-answer', { to: from, sdp: pc.localDescription })
      }catch(e){ console.error('handle offer error', e) }
    })

    socket.on('webrtc-answer', async ({ from, sdp })=>{
      try{
        const obj = peersRef.current[from]
        if(!obj || !obj.pc) return
        const pc = obj.pc
        // Guard against wrong-state errors by checking signalingState
        try{
          await pc.setRemoteDescription(new RTCSessionDescription(sdp))
        }catch(err){
          console.warn('setRemoteDescription(answer) failed', err && err.message)
        }
      }catch(e){ console.error('handle answer error', e) }
    })

    socket.on('webrtc-ice', async ({ from, candidate })=>{
      try{
        const obj = peersRef.current[from]
        if(!obj || !obj.pc) return
        const pc = obj.pc
        if(candidate && typeof pc.addIceCandidate === 'function'){
          try{ await pc.addIceCandidate(new RTCIceCandidate(candidate)) }catch(e){ console.warn('addIceCandidate failed', e) }
        }
      }catch(e){ console.error('handle ice error', e) }
    })

    return ()=>{
      try{ socket.disconnect() }catch(e){}
      socketRef.current = null
    }
  },[currentUser, data.id])

  // Start local camera+mic for participant grid (only for current user)
  useEffect(()=>{
    let mounted = true
    async function startMedia(){
      if(!currentUser) return
      try{
        await requestLocalMedia()
      }catch(err){
        console.error('getUserMedia error', err)
        setMediaError(err)
      }
    }
    startMedia()
    return ()=>{
      mounted = false
      if(localStream){ try{ localStream.getTracks().forEach(t=>t.stop()) }catch(e){} }
    }
  },[currentUser])

  // Request local media - can be called initially or via Retry button
  async function requestLocalMedia(){
    // If we already have a local stream in this page, stop it first to free camera device
    try{
      if (localStream) {
        try{ localStream.getTracks().forEach(t => t.stop()) }catch(e){}
        setLocalStream(null)
      }
    }catch(e){}

    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setMediaError(null)
      if(localVideoRef.current){
        try{ localVideoRef.current.srcObject = stream; localVideoRef.current.muted = true; await localVideoRef.current.play().catch(()=>{}) }catch(e){}
      }
      // add tracks to any existing peer connections (peersRef stores objects)
      Object.keys(peersRef.current || {}).forEach(id => {
        try{ const obj = peersRef.current[id]; if(obj && obj.pc) stream.getTracks().forEach(t=>obj.pc.addTrack(t, stream)) }catch(e){}
      })
    }catch(err){
      console.error('requestLocalMedia error', err)
      // Try to gather device info to provide better guidance
      let devices = []
      try{
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const list = await navigator.mediaDevices.enumerateDevices()
          devices = list.filter(d=>d.kind==='videoinput').map(d=>({ id: d.deviceId, label: d.label || 'Camera' }))
        }
      }catch(e){ /* ignore */ }
      const info = { name: err.name || 'MediaError', message: err.message || String(err), devices }
      setMediaError(info)
      // Re-throw only if callers expect it
      throw err
    }
  }

  // Stop any local stream created by this page and remove tracks from peers
  function stopLocalStream(){
    try{
      if(localStream){
        localStream.getTracks().forEach(t=>t.stop())
        setLocalStream(null)
      }
      // Note: we don't control other tabs/apps; inform user to close them if device still busy
      Object.keys(peersRef.current || {}).forEach(id => {
        try{ /* nothing to remove here reliably */ }catch(e){}
      })
    }catch(e){ console.error('stopLocalStream error', e) }
  }

  // Helpers: create RTCPeerConnection and manage tracks
  function createPeerConnection(remoteSocketId){
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    // polite determination: choose one side as polite to resolve offer collisions
    const localId = socketRef.current?.id || ''
    const polite = String(localId) < String(remoteSocketId)
    const obj = { pc, makingOffer: false, polite, ignoreOffer: false }
    peersRef.current[remoteSocketId] = obj

    pc.onicecandidate = (e)=>{
      if(e.candidate){
        try{ socketRef.current.emit('webrtc-ice', { to: remoteSocketId, candidate: e.candidate }) }catch(e){}
      }
    }

    pc.ontrack = (e)=>{
      // attach remote stream
      const stream = e.streams && e.streams[0]
      if(stream){ setRemoteStreams(rs => ({ ...rs, [remoteSocketId]: stream })) }
    }

    pc.onconnectionstatechange = ()=>{
      if(pc.connectionState === 'failed' || pc.connectionState === 'closed' || pc.connectionState === 'disconnected'){
        try{ pc.close() }catch(e){}
        delete peersRef.current[remoteSocketId]
        setRemoteStreams(rs => { const copy = { ...rs }; delete copy[remoteSocketId]; return copy })
      }
    }

    return obj
  }

  async function createOfferForPeer(remoteSocketId){
    if(!socketRef.current) throw new Error('no socket')
    let obj = peersRef.current[remoteSocketId]
    if(!obj) obj = createPeerConnection(remoteSocketId)
    // ensure we have a valid RTCPeerConnection
    if(!obj.pc || typeof obj.pc.createOffer !== 'function'){
      obj = createPeerConnection(remoteSocketId)
    }
    const pc = obj.pc
    try{
      obj.makingOffer = true
      // add local tracks
      if(localStream){ localStream.getTracks().forEach(t=>pc.addTrack(t, localStream)) }
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      socketRef.current.emit('webrtc-offer', { to: remoteSocketId, sdp: pc.localDescription })
    }finally{
      obj.makingOffer = false
    }
  }

  // auto-mark present when learner opens class (simple auto-check-in)
  useEffect(()=>{
    async function autoMark(){
      try{
        if(!currentUser) return
        if(currentUser.role !== 'learner') return
        const today = new Date().toISOString().slice(0,10)
        // try to find today's session id if available
        const todaySession = (data.sessions || []).find(s=> s.date === today)
        await apiClient.post('/attendance/record', { userId: currentUser.id, date: today, status: 'present', lessonId: data.id, sessionId: todaySession ? todaySession.id : undefined })
      }catch(e){ /* ignore */ }
    }
    autoMark()
  },[currentUser, data])

  function sendMessage(){
    if(!messageText.trim()) return
    const text = messageText.trim()
    // emit via socket if available
    if(socketRef.current){
      socketRef.current.emit('chatMessage', text)
    }
    // append locally
    setMessages(ms => [...ms, { id: Date.now(), from: 'You', text }])
    setMessageText('')
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-white w-full max-w-none -mx-4">
      <LearnerSidebar />

      {/* Main area */}
      <div className="flex-1 relative">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 py-3 bg-slate-800/60 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">{data.title || 'Live Class'}</div>
            <div className="text-sm text-slate-300">{data.instructor} • Live</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm px-3 py-2 bg-slate-700 rounded">Participants: {participants.length}</button>
            <button onClick={()=>setChatOpen(s=>!s)} className="text-sm px-3 py-2 bg-slate-700 rounded">Chat</button>
            <Link to="/class/resources" className="text-sm px-3 py-2 bg-teal-600 text-black rounded font-semibold">Resources</Link>
            {/* Teacher-only attendance button */}
            {currentUser && ['teacher','admin'].includes(currentUser.role) && (
              <button onClick={()=>{
                // initialize attendance map
                const map = {}
                participants.forEach(p=>{ map[p.id] = 'present' })
                setAttendanceMap(map)
                setShowAttendance(true)
              }} className="text-sm px-3 py-2 bg-amber-400 text-black rounded font-semibold">Attendance</button>
            )}
          </div>
        </header>

        {/* Content: video grid + right panel */}
        <div className="flex h-[calc(100vh-72px)]">
          {/* Video Grid */}
          <div className={`flex-1 p-4 grid gap-3 ${participants.length <= 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3 grid-rows-2'}`}>
              {participants.map((p, idx)=> (
                <div key={p.socketId || p.id || p.name || idx} className="relative bg-black rounded-lg overflow-hidden flex items-center justify-center border border-slate-700">
                  {/* If this participant is the current user and we have a local stream, show live video */}
                  {currentUser && p.userId === currentUser.id && localStream ? (
                    <video ref={localVideoRef} className="w-full h-full object-cover" playsInline autoPlay muted />
                  ) : (
                    // existing placeholder (host/participant)
                    (p.isHost ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm text-slate-300">Host</div>
                          <div className="text-2xl font-semibold">{p.name}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800/40">
                        <div className="text-xl font-medium">{p.name}</div>
                      </div>
                    ))
                  )}

                  {/* small label */}
                      <div className="absolute left-3 bottom-3 bg-black/60 px-2 py-1 rounded text-xs">{p.name}</div>
                      {/* remote stream tile for this participant (if we have it) */}
                      {p.socketId && remoteStreams[p.socketId] && (
                        <video playsInline autoPlay ref={el=>{ if(el) try{ el.srcObject = remoteStreams[p.socketId] }catch(e){} }} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                  {/* show media error hint on user's tile if permission blocked */}
                  {currentUser && p.userId === currentUser.id && mediaError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 text-rose-300 text-xs px-3 py-2 rounded flex flex-col items-center gap-2 max-w-xs text-center">
                      <div className="font-semibold">Camera error</div>
                      <div className="text-[11px] break-words">{mediaError.message || String(mediaError)}</div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={async ()=>{ try{ await requestLocalMedia() }catch(e){ } }} className="text-xs px-2 py-1 bg-teal-600 text-black rounded">Retry</button>
                        <button onClick={()=>{ try{ stopLocalStream(); requestLocalMedia().catch(()=>{}) }catch(e){} }} className="text-xs px-2 py-1 bg-slate-700 text-white rounded">Stop & Retry</button>
                      </div>
                      {mediaError.devices && mediaError.devices.length>0 && (
                        <div className="text-[11px] text-slate-300 mt-2">Detected cameras: {mediaError.devices.map(d=>d.label||d.id).join(', ')}</div>
                      )}
                      <div className="text-[11px] text-slate-400 mt-1">If device still busy, close other apps/tabs using the camera.</div>
                    </div>
                  </div>
                )}
                </div>
            ))}
          </div>

          {/* Right panel: chat & participants */}
          <aside className={`w-96 bg-slate-800 border-l border-slate-700 transition-transform ${chatOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
            <div className="h-full flex flex-col">
              <div className="px-4 py-3 border-b border-slate-700">
                <div className="font-semibold">Chat</div>
                <div className="text-xs text-slate-400">Class discussion</div>
              </div>

              <div className="flex-1 p-4 overflow-auto space-y-3">
                {messages.map(m=> (
                    <div key={m.id} className={`p-2 rounded ${m.from === 'You' ? 'bg-teal-600 text-black ml-auto w-fit' : 'bg-slate-700'}`}>
                    <div className="text-xs font-semibold">{m.from}</div>
                    <div className="text-sm">{m.text}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-700">
                <div className="flex gap-2">
                  <input value={messageText} onChange={e=>setMessageText(e.target.value)} className="flex-1 px-3 py-2 rounded bg-slate-700 text-white" placeholder="Write a message..." />
                  <button onClick={sendMessage} className="px-3 py-2 bg-teal-500 text-black rounded">Send</button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom control bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 bg-black/40 px-4 py-3 rounded-full">
          <button onClick={()=>setMicOn(s=>!s)} className={`w-12 h-12 rounded-full flex items-center justify-center ${micOn ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>{micOn ? '🎤' : '🔇'}</button>
          <button onClick={()=>setCamOn(s=>!s)} className={`w-12 h-12 rounded-full flex items-center justify-center ${camOn ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>{camOn ? '📷' : '📷✖'}</button>
          <button className="w-40 h-12 rounded-full bg-red-600 text-white font-semibold">Leave Call</button>
          <button className="w-12 h-12 rounded-full bg-white text-black">💬</button>
        </div>
      </div>

      {/* Attendance modal for teachers */}
      {showAttendance && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black rounded-lg w-11/12 max-w-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Mark Attendance</div>
              <button onClick={()=>setShowAttendance(false)} className="text-sm px-2 py-1">Close</button>
            </div>
            <div className="max-h-80 overflow-auto space-y-2">
              {participants.map(p=> (
                <div key={p.socketId || p.id} className="flex items-center justify-between p-2 border rounded">
                  <div>{p.name}</div>
                  <div>
                    <select value={attendanceMap[p.id] || 'present'} onChange={(e)=>setAttendanceMap(m=>({...m, [p.id]: e.target.value}))} className="px-2 py-1">
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="excused">Excused</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={async ()=>{
                // prepare bulk payload
                const today = new Date().toISOString().slice(0,10)
                const todaySession = (data.sessions || []).find(s=> s.date === today)
                const items = participants.map(p=>({ userId: p.id, date: today, status: attendanceMap[p.id] || 'present', lessonId: data.id, sessionId: todaySession ? todaySession.id : undefined }))
                try{
                  await apiClient.post('/attendance/bulk', { attendance: items })
                  setShowAttendance(false)
                }catch(err){
                  console.error('Failed to save attendance', err)
                  alert('Failed to save attendance')
                }
              }} className="px-4 py-2 bg-teal-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

