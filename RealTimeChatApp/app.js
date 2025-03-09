const socket = io('http://localhost:2025');
const chatBox = document.getElementById('chat-box');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageSend = document.getElementById('message-send');

function writeChatMessage(message) {
    const chatMessageText = document.createElement('div'); // Create a new div
    chatMessageText.innerHTML = message; // Set the message content
    chatBox.append(chatMessageText); // Append the new div to the chat box
}

const name = prompt('Who are you?')
writeChatMessage('You Joined')
socket.emit('user-joined', name)

// Listen for incoming chat messages
socket.on('chat-message', (message) => {
    writeChatMessage(message); // Display the message in the chat box
});

// Handle form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting
    const message = messageInput.value; // Get the message from the input field
    if (message.trim()) { // Check if the message is not empty
        socket.emit('send-chat-message', message); // Send the message to the server
        messageInput.value = ''; // Clear the input field
    }
});