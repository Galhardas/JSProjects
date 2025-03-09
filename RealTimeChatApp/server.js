const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Serve index.html
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
    }
    // Serve app.js
    else if (req.url === '/app.js') {
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
    }
    // Serve style.css
    else if (req.url === '/style.css') {
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
    }
    // Serve socket.io.js from the client-dist folder
    else if (req.url === '/socket.io/socket.io.js') {
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
    }
    // Handle other requests (404 Not Found)
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Initialize Socket.IO
const io = new Server(server);

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', message)
    })
});

// Start the server on port 2025
server.listen(2025, () => {
    console.log('Server is running on http://localhost:2025');
});