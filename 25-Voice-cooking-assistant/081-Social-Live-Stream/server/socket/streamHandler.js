module.exports = (io, socket) => {
  socket.on('join-stream-room', (roomID) => {
    socket.join(roomID);
    socket.to(roomID).emit('user-joined', socket.id);
  });
  socket.on('signal', (data) => {
    io.to(data.to).emit('signal-relay', { from: data.from, signal: data.signal });
  });
  socket.on('send-chat-msg', (payload) => {
    io.to(payload.roomID).emit('receive-chat-msg', {
      user: payload.username, text: payload.text, time: new Date().toLocaleTimeString()
    });
  });
};
