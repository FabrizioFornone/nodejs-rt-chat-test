const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name");

appendMessage("<h1>You Joined</h1>");

socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendReceivedMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`<div class="text-white"><b>${name}</b>: connected</div>`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`<b>${name}</b>:  disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  appendSendMessage(message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}
function appendReceivedMessage(message) {
  const messageBox = document.createElement("div");
  const messageElement = document.createElement("div");
  messageBox.classList.add("d-flex");
  messageElement.classList.add("bg-success", "px-3", "py-1", "rounded");
  messageElement.innerText = message;
  messageContainer.append(messageBox);
  messageBox.append(messageElement);
}
function appendSendMessage(message) {
  const messageBox = document.createElement("div");
  const messageElement = document.createElement("div");
  messageBox.classList.add("d-flex", "justify-content-end");
  messageElement.classList.add("bg-danger", "px-3", "py-1", "rounded");
  messageElement.innerText = message;
  messageContainer.append(messageBox);
  messageBox.append(messageElement);
}
