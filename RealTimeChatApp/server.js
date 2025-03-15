const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/app.js') {
        const filePath = path.join(__dirname, 'app.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/style.css') {
        const filePath = path.join(__dirname, 'style.css');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/socket.io/socket.io.js') {
        const filePath = path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Initialize Socket.IO
const io = new Server(server);

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining the chat
    socket.on('user-joined', (name) => {
        const joinMessage = `${name} Joined`;
        io.emit('chat-message', joinMessage, true, false); // Broadcast join message as a system message
    });

    // Handle incoming chat messages
    socket.on('send-chat-message', (message, msgSender) => {
        io.emit('chat-message', message, false, msgSender); // Broadcast regular message
    });

    // Handle user leaving the chat
    socket.on('user-left', (name) => {
        const leaveMessage = `${name} Left`;
        io.emit('chat-message', leaveMessage, true, false); // Broadcast leave message as a system message
    });
});

// Start the server on port 2025
server.listen(2025, () => {
    console.log('Server is running on http://localhost:2025');
});