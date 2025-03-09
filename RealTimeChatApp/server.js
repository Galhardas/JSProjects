const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (index.html, style.css, app.js)
app.use(express.static(__dirname));

io.on("connection", socket => {  
    console.log("A user connected");
    socket.on('send-chat-message', message => {
        console.log(message)
        socket.broadcast.emit('chat-message', message)
    })
})

// Start server
server.listen(2025, () => {
    console.log("Server running on http://localhost:2025");
});
