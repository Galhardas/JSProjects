const socket = io('http://localhost:2025'); // Connects automatically to the same origin
const messageForm = document.getElementById('send-box')
const messageInput = document.getElementById('message-input')
const buttonSend = document.getElementById('send-button')

socket.on("chat-message", (msg) => {
    console.log("Message from server:", msg);
    document.getElementById("chat-box").innerHTML += `<p>${msg}</p>`;
});

document.getElementById("send-box").addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.getElementById("message-input").value;
    socket.emit("chat-message", message);
    document.getElementById("message-input").value = "";
});

buttonSend.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})