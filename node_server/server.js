const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 8811


io.on('connection', (socket) => {
  console.log(`a user connected`);
  socket.emit('connection', null);
  socket.on('room', (roomId) => { 
    socket.join(roomId)
    socket.emit('room-joined')
    socket.on('message', (msg) => { 
      console.log(msg)
      io.to(roomId).emit('message',{
        message: msg,
        timsStamp: new Date()
      });
    })
  })
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});