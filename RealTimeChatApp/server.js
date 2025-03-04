const io = require("socket.io")(2025)

io.on("connect", socket => {
    socket.emit('chat-message', 'Hello World')
})