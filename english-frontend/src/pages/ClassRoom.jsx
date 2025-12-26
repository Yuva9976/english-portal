import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../apiClient'
import { io } from 'socket.io-client'

export default function ClassRoom(){
  const { classId } = useParams()
  const [sessionToken, setSessionToken] = useState(null)
  const [messages, setMessages] = useState([])
  const [resources, setResources] = useState([])
  const [newMsg, setNewMsg] = useState('')
  const [newResource, setNewResource] = useState({ title:'', type:'link', url:'', description:'' })
  const [currentUser, setCurrentUser] = useState(null)
  const [participants, setParticipants] = useState([])
  const [localStream, setLocalStream] = useState(null)
  const [mediaError, setMediaError] = useState(null)
  const localVideoRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(()=>{
    let mounted = true
    async function init(){
      try{
        // create or join a session: ask backend to create a session (teacher) or reuse existing
        // For simplicity, request a session token (backend will create)
        const createRes = await apiClient.post('/classroom/session/create', { classId })
        const token = createRes.data?.sessionToken
        setSessionToken(token)

        // fetch chat history
        const chatRes = await apiClient.get(`/classroom/${classId}/chat?sessionToken=${token}`)
        if (!mounted) return
        setMessages(chatRes.data.messages || [])

        // fetch resources
        const resRes = await apiClient.get(`/classroom/${classId}/resources`)
        setResources(resRes.data.resources || [])

        // connect socket
        socketRef.current = io(apiClient.defaults.baseURL.replace('/api',''), { withCredentials: true })
        // fetch current user and include on join so server sets socket._user and system messages show names
        const meRes = await apiClient.get('/auth/me').catch(()=>null)
        const me = meRes?.data?.user || null
        setCurrentUser(me)

        socketRef.current.on('connect', async ()=>{
          socketRef.current.emit('joinClass', { classId, user: me, sessionToken: token })
          // register participant via REST so backend records this user in ClassParticipant
          try{
            if(me){ await apiClient.post('/classroom/session/join', { classId, sessionToken: token }).catch(()=>null) }
          }catch(e){/* ignore */}
        })
        socketRef.current.on('chatMessage', (m)=> setMessages(prev => [...prev, m]))
        socketRef.current.on('systemMessage', (m)=> setMessages(prev => [...prev, { system: true, text: m.text, ts: new Date().toISOString() }]))
        socketRef.current.on('participants', (list)=>{
          try{ setParticipants(list || []) }catch(e){/* ignore */}
        })
      }catch(err){ console.error('init class', err) }
    }
    init()
    return ()=>{ mounted = false; if(socketRef.current) socketRef.current.disconnect() }
  },[classId])

  // Start local camera+mic when a session token is available.
  useEffect(()=>{
    let mounted = true
    async function startLocalMedia(){
      if(!sessionToken) return
      try{
        // Request camera and microphone permission
        await requestLocalMedia()
      }catch(err){
        // Handle permission denied or other errors here
        // You can show UI to the user, offer retry, or fall back to audio-only
        console.error('getUserMedia error', err)
        setMediaError(err)
      }
    }
    startLocalMedia()

    return ()=>{
      mounted = false
      // stop local stream tracks when leaving the page
      if(localStream){
        try{ localStream.getTracks().forEach(t=>t.stop()) }catch(e){}
      }
    }
  },[sessionToken])

  // reusable request function for initial attempt and retry
  async function requestLocalMedia(){
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setMediaError(null)
      if(localVideoRef.current){
        try{ localVideoRef.current.srcObject = stream; localVideoRef.current.muted = true; await localVideoRef.current.play().catch(()=>{}) }catch(e){/* ignore */}
      }
      return stream
    }catch(err){
      console.error('requestLocalMedia error', err)
      setMediaError(err)
      throw err
    }
  }

  // Ensure local stream tracks are stopped when component unmounts
  useEffect(()=>{
    return ()=>{
      if(localStream){
        try{ localStream.getTracks().forEach(t=>t.stop()) }catch(e){}
      }
    }
  },[localStream])

  async function sendMessage(){
    if(!newMsg.trim()) return
    const payload = { classId, sessionToken, text: newMsg }
    // send via socket
    if(socketRef.current && socketRef.current.connected) socketRef.current.emit('chatMessage', payload)
    // optimistic update
    setMessages(prev => [...prev, { from: 'You', text: newMsg, ts: new Date().toISOString() }])
    setNewMsg('')
    // also POST to persist (optional, socket handler persists)
    try{ await apiClient.post(`/classroom/${classId}/chat`, { sessionToken, text: newMsg }) }catch(e){/* ignore */}
  }

  async function createResource(){
    try{
      const r = await apiClient.post(`/classroom/${classId}/resources`, newResource)
      setResources(prev => [r.data.resource, ...prev])
      setNewResource({ title:'', type:'link', url:'', description:'' })
    }catch(err){ console.error('create resource', err); alert('Failed') }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black flex items-stretch justify-center relative">
        {/* Jitsi iframe (simple embed). Room name uses classId+sessionToken so it's unique */}
        <div style={{width: '100%', height: '100%'}}>
          {sessionToken ? (
            <iframe title="live-class" src={`https://meet.jit.si/${classId}_${sessionToken}`} style={{width:'100%', height:'100%', border:0}} allow="camera; microphone; fullscreen; display-capture" />
          ):
            <div className="text-white p-6">Starting session...</div>
          }

          {/* Local video tile: shows user's webcam when permission granted */}
          <div className="absolute bottom-4 left-4 w-48 h-36 bg-black/60 p-1 rounded shadow-lg">
            { localStream ? (
                <video ref={localVideoRef} className="w-full h-full object-cover rounded" playsInline autoPlay muted />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  { mediaError ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-xs text-rose-300">Camera blocked — allow camera/mic to join</div>
                      <button onClick={async ()=>{ try{ await requestLocalMedia() }catch(e){} }} className="text-xs px-2 py-1 bg-teal-600 text-black rounded">Retry camera</button>
                    </div>
                  ) : (
                    <div>Waiting for camera…</div>
                  ) }
                </div>
              ) }
          </div>
        </div>
      </div>

      <aside className="w-96 bg-white border-l p-4 flex flex-col">
      <div className="mb-2 font-semibold">Class Chat</div>
      <div className="text-xs text-slate-500 mb-3">Participants: {participants.length}</div>
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((m,i)=> (
            <div key={i} className={`p-2 ${m.system ? 'text-sm text-slate-500 italic':'bg-slate-50 rounded mb-2'}`}>
              {m.system ? m.text : (<><div className="text-xs text-slate-500">{m.from || m.user_name || 'Unknown'}</div><div>{m.text}</div><div className="text-xs text-slate-400">{new Date(m.ts || m.created_at || m.updatedAt || Date.now()).toLocaleTimeString()}</div></>)}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} placeholder="Type a message" className="flex-1 px-2 py-1 border rounded" />
          <button onClick={sendMessage} className="px-3 py-1 bg-teal-600 text-white rounded">Send</button>
        </div>

          <div className="mt-6">
          <div className="font-semibold mb-2">Resources</div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {resources.map(r=> (
              <div key={r.id} className="p-2 border rounded">
                <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold">{r.title}</a>
                <div className="text-xs text-slate-500">{r.type} • added by {r.created_by || '—'}</div>
              </div>
            ))}
          </div>

          {/* Only teachers/admins can add resources via API */}
          {currentUser && ['teacher','admin'].includes(currentUser.role) && (
            <div className="mt-3">
              <input placeholder="Title" value={newResource.title} onChange={e=>setNewResource({...newResource,title:e.target.value})} className="w-full mb-2 px-2 py-1 border rounded" />
              <input placeholder="URL" value={newResource.url} onChange={e=>setNewResource({...newResource,url:e.target.value})} className="w-full mb-2 px-2 py-1 border rounded" />
              <div className="flex gap-2">
                <button onClick={createResource} className="flex-1 px-3 py-1 bg-slate-800 text-white rounded">Add Resource</button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
