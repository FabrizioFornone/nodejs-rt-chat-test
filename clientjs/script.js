const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name");

socket.emit("new-user", name);

appendSystemMessage(`<h4>You joined, ${name}</h4>`);

socket.on("user-connected", (name) => {
  appendSystemMessage(
    `<div class="text-white"><b>${name}</b>: connected</div>`
  );
});

socket.on("user-disconnected", (name) => {
  appendSystemMessage(`<b>${name}</b>:  disconnected`);
});

socket.on("chat-message", (data) => {
  appendChatMessage(`${data.name}: ${data.message}`, "received");
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  appendChatMessage(message, "sendt");
  messageInput.value = "";
});

function appendSystemMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}

function appendChatMessage(message, type) {
  const messageBox = document.createElement("div");
  const messageElement = document.createElement("div");
  if (type == "sendt") {
    messageBox.classList.add("d-flex", "justify-content-end");
    messageElement.classList.add("bg-danger", "px-3", "py-1", "rounded");
  } else if (type == "received") {
    messageBox.classList.add("d-flex");
    messageElement.classList.add("bg-success", "px-3", "py-1", "rounded");
  }
  messageElement.innerText = message;
  messageContainer.append(messageBox);
  messageBox.append(messageElement);
}
