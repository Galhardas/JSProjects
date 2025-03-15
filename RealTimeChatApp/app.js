const socket = io('http://localhost:2025');
const chatBox = document.getElementById('chat-box');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageSend = document.getElementById('message-send');

// Function to display messages in the chat box
function writeChatMessage(message, isSystemMessage = false, isMyMessage) {
    const chatMessageText = document.createElement('div'); // Create a new div
    chatMessageText.textContent = message; // Use textContent to avoid XSS

    if (isSystemMessage) {
        chatMessageText.classList.add('system-message');
    } else {
        if (isMyMessage){
            chatMessageText.classList.add('my-message');
        } else {
            chatMessageText.classList.add('others-message');
        }
    }

    chatBox.append(chatMessageText); // Append the new div to the chat box
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Prompt for the user's name
let name = prompt('Who are you?');
if (!name || name.trim() === '') {
    name = 'Anonymous'; // Default name if the user cancels or enters nothing
}

// Notify the server that a user has joined
socket.emit('user-joined', name);

// Listen for incoming chat messages
socket.on('chat-message', (message, isSystemMessage, isMyMessage) => {
    writeChatMessage(message, isSystemMessage, isMyMessage); // Display the message
});

// Handle form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting
    const message = messageInput.value; // Get the message from the input field
    if (message.trim()) { // Check if the message is not empty
        const formattedMessage = `${name}: ${message}`; // Prepend the name to the message
        socket.emit('send-chat-message', formattedMessage); // Send the message to the server
        messageInput.value = ''; // Clear the input field
    }
});

// Notify when the user leaves
window.addEventListener('beforeunload', () => {
    socket.emit('user-left', name); // Notify the server that the user is leaving
});