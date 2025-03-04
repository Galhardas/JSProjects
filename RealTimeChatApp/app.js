const socket = io('http://localhost:2025')

socket.on('chat-message', data => {
    console.log(data)
})