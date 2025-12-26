const io = require('socket.io-client');
const role = process.argv[2] || 'A';
const name = role === 'A' ? 'ClientA' : 'ClientB';
const SERVER = process.env.SERVER || 'http://localhost:4000';

console.log(`Starting ${name} -> connecting to ${SERVER}`);
const socket = io(SERVER, { transports: ['websocket'] });
let otherId = null;

socket.on('connect', () => {
  console.log(`${name} connected as ${socket.id}`);
  socket.emit('joinClass', { classId: 'test-class', user: { id: role, name }, sessionToken: 'test-session' });
});

socket.on('participants', (list) => {
  console.log(`${name} participants:`, list);
  const others = list.filter(p => p.socketId !== socket.id);
  if (others.length) otherId = others[0].socketId;

  // Client A initiates an offer when it finds another participant
  if (role === 'A' && otherId) {
    console.log(`${name} sending offer to ${otherId}`);
    socket.emit('webrtc-offer', { to: otherId, sdp: `fake-offer-from-${socket.id}` });
  }
});

socket.on('webrtc-offer', (payload) => {
  console.log(`${name} received offer:`, payload);
  // reply with an answer
  if (payload && payload.from) {
    console.log(`${name} sending answer to ${payload.from}`);
    socket.emit('webrtc-answer', { to: payload.from, sdp: `fake-answer-from-${socket.id}` });
    // also send a fake ICE candidate back
    setTimeout(() => {
      socket.emit('webrtc-ice', { to: payload.from, candidate: `fake-candidate-from-${socket.id}` });
    }, 200);
  }
});

socket.on('webrtc-answer', (payload) => {
  console.log(`${name} received answer:`, payload);
  // send a fake ICE candidate after receiving answer
  if (payload && payload.from) {
    setTimeout(() => {
      socket.emit('webrtc-ice', { to: payload.from, candidate: `fake-candidate-from-${socket.id}` });
    }, 200);
  }
});

socket.on('webrtc-ice', (payload) => {
  console.log(`${name} received ICE:`, payload);
});

socket.on('systemMessage', (m) => console.log(`${name} systemMessage:`, m));
socket.on('chatMessage', (m) => console.log(`${name} chatMessage:`, m));

socket.on('disconnect', () => console.log(`${name} disconnected`));

// keep process alive for a bit
setTimeout(() => {
  console.log(`${name} test done — closing`);
  socket.close();
  process.exit(0);
}, 8000);
