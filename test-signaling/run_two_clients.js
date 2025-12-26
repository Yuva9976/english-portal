const io = require('socket.io-client');
const SERVER = process.env.SERVER || 'http://localhost:4000';

console.log('Starting two in-process clients connecting to', SERVER);

const a = io(SERVER, { transports: ['websocket'] });
const b = io(SERVER, { transports: ['websocket'] });

let aId = null, bId = null;

a.on('connect', () => {
  console.log('A connected', a.id);
  a.emit('joinClass', { classId: 'test-class', user: { id: 'A', name: 'ClientA' }, sessionToken: 's1' });
});

b.on('connect', () => {
  console.log('B connected', b.id);
  b.emit('joinClass', { classId: 'test-class', user: { id: 'B', name: 'ClientB' }, sessionToken: 's1' });
});

function maybeSendOffer() {
  if (aId && bId) {
    console.log('A sending offer to B');
    a.emit('webrtc-offer', { to: bId, sdp: `fake-offer-from-${aId}` });
  }
}

// participants update handler for both
[a, b].forEach((socket, idx) => {
  const name = idx === 0 ? 'A' : 'B';
  socket.on('participants', (list) => {
    console.log(`${name} participants:`, list);
    const self = list.find(p => p.socketId === socket.id);
    if (self) {
      if (name === 'A') aId = socket.id;
      else bId = socket.id;
    }
    // capture other id if present
    const other = list.find(p => p.socketId !== socket.id);
    if (other) {
      if (name === 'A') bId = other.socketId;
      else aId = other.socketId;
    }
    maybeSendOffer();
  });

  socket.on('webrtc-offer', (payload) => {
    console.log(`${name} received offer:`, payload);
    if (payload && payload.from) {
      console.log(`${name} sending answer to ${payload.from}`);
      socket.emit('webrtc-answer', { to: payload.from, sdp: `fake-answer-from-${socket.id}` });
    }
  });

  socket.on('webrtc-answer', (payload) => {
    console.log(`${name} received answer:`, payload);
  });

  socket.on('webrtc-ice', (payload) => {
    console.log(`${name} received ice:`, payload);
  });
});

// run for 6s then exit
setTimeout(() => {
  console.log('Test finished — closing sockets');
  a.close(); b.close();
  process.exit(0);
}, 6000);
