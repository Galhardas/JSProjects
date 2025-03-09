const io = require('socket.io')(2025)

io.on('connection', socket => {
    console.log('Connected to server');
    socket.emit('chat-message', 'Hello World')
})