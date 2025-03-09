const socket = io('http://localhost:2025')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const messageSend = document.getElementById('message-send')

socket.on('chat-message', message => {
    console.log(message)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    messageInput.nodeValue = ''
})