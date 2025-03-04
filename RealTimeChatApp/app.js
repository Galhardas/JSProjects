const socket = io(); // Connects automatically to the same origin

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
