const io = require('socket.io')(2025)

io.on('connection', socket => {
    socket.emit('chat-message', 'Hello World')
})