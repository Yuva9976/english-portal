(function(){
  const SERVER = location.origin.replace(/:\d+$/, ':4000');
  const socket = io(SERVER, { transports: ['websocket'] });
  const pcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  let pc = null;
  let localStream = null;
  let otherId = null;

  const logEl = id => (msg, ...args) => { const el=document.getElementById('log'); el.textContent+=`\n[${id}] ${msg} ${args.map(a=>JSON.stringify(a)).join(' ')}`; el.scrollTop=el.scrollHeight; };
  const log = logEl('PAGE');
  let logBuffer = [];
  const pushLog = (m, ...args) => { const line = `[${new Date().toISOString()}] ${m} ${args.map(a=>JSON.stringify(a)).join(' ')}`; logBuffer.push(line); log(m, ...args); };

  const startBtn = document.getElementById('startBtn');
  const leaveBtn = document.getElementById('leaveBtn');
  const status = document.getElementById('status');
  const localVideo = document.getElementById('localVideo');
  const remoteVideo = document.getElementById('remoteVideo');

  function setStatus(s){ status.textContent = s; }

  socket.on('connect', () => log('socket connected', socket.id));
  socket.on('disconnect', () => log('socket disconnected'));

  socket.on('participants', (list) => {
    pushLog('participants', list);
    const others = list.filter(p => p.socketId !== socket.id);
    if (others.length) otherId = others[0].socketId;
    else otherId = null;
    // if we are the first who sees another, create offer
    if (otherId && pc && pc.signalingState === 'stable') {
      // if no remote description, create offer
      if (!pc._haveRemote) createOffer(otherId);
    }
  });

  socket.on('webrtc-offer', async (payload) => {
    pushLog('received offer', payload);
    if (!pc) await ensurePC();
    if (payload && payload.sdp) {
      try{
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload.sdp }));
        pc._haveRemote = true;
        const ans = await pc.createAnswer();
        await pc.setLocalDescription(ans);
        socket.emit('webrtc-answer', { to: payload.from, sdp: ans.sdp });
        pushLog('sent answer to', payload.from);
      }catch(e){ pushLog('error handling offer', e.message); }
    }
  });

  socket.on('webrtc-answer', async (payload) => {
    pushLog('received answer', payload);
    if (payload && payload.sdp && pc) {
      try{
        await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload.sdp }));
        pc._haveRemote = true;
      }catch(e){ log('error setRemote answer', e.message); }
    }
  });

  socket.on('webrtc-ice', async (payload) => {
    pushLog('received ice', payload);
    if (payload && payload.candidate && pc) {
      try{ await pc.addIceCandidate(new RTCIceCandidate(payload.candidate)); }
      catch(e){ log('addIceCandidate failed', e.message); }
    }
  });

  async function ensurePC(){
    if (pc) return pc;
    pc = new RTCPeerConnection(pcConfig);
    pc._haveRemote = false;
    pc.onicecandidate = (e) => { if (e.candidate) { socket.emit('webrtc-ice', { to: otherId, candidate: e.candidate }); pushLog('local ice', e.candidate); } };
    pc.ontrack = (e) => { pushLog('ontrack', e.streams); remoteVideo.srcObject = e.streams[0]; captureAndSend(); };
    pc.onconnectionstatechange = () => pushLog('pc state', pc.connectionState);
    if (localStream) localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    return pc;
  }

  async function createOffer(toId){
    try{
      await ensurePC();
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit('webrtc-offer', { to: toId, sdp: offer.sdp });
      pushLog('sent offer to', toId);
    }catch(e){ log('createOffer err', e.message); }
  }

  async function start(){
    setStatus('starting');
    try{
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideo.srcObject = localStream;
      await ensurePC();
      // re-add tracks
      localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
      socket.emit('joinClass', { classId: 'test-class', user: { id: Math.random().toString(36).slice(2), name: 'BrowserClient' }, sessionToken: 's1' });
        setStatus('joined');
        pushLog('started local media');
        // Immediately POST logs + a quick snapshot so we have a guaranteed record
        try { captureAndSend(); } catch (e) { pushLog('captureAndSend immediate failed', e.message); }
    }catch(e){
        pushLog('getUserMedia failed', e.message);
        setStatus('media-failed');
        // Save the failure log immediately as well
        try { captureAndSend(); } catch (e2) { pushLog('captureAndSend on failure failed', e2.message); }
    }
  }

  function leave(){
    if (pc) { pc.close(); pc=null; }
    if (localStream) { localStream.getTracks().forEach(t=>t.stop()); localStream=null; }
    localVideo.srcObject = null; remoteVideo.srcObject = null;
    try{ socket.emit('disconnect'); }catch(e){}
    setStatus('left');
  }

  // capture canvas snapshot and post logs+image to server
  async function captureAndSend(){
    try{
      const cid = `client_${(socket.id||Math.random().toString(36).slice(2))}`;
      const c = document.createElement('canvas');
      c.width = 640; c.height = 480;
      const ctx = c.getContext('2d');
      // draw local on left, remote on right
      if (localVideo && localVideo.videoWidth) ctx.drawImage(localVideo, 0, 0, 320, 240);
      if (remoteVideo && remoteVideo.videoWidth) ctx.drawImage(remoteVideo, 320, 0, 320, 240);
      const data = c.toDataURL('image/png');
      const payload = { name: cid, log: logBuffer.join('\n'), screenshot: data };
      await fetch('/collect-log', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
      pushLog('posted logs+snapshot to server');
    }catch(e){ pushLog('captureAndSend error', e.message); }
  }

  // also send snapshot & logs after 6s as a fallback
  setTimeout(() => { if (logBuffer.length) captureAndSend(); }, 6000);

  startBtn.addEventListener('click', start);
  leaveBtn.addEventListener('click', leave);
})();