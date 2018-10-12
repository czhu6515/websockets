//make connection
const client = io.connect("http://localhost:5000");

// DOM Queries
let message = document.getElementById("message");
let handel = document.getElementById("handle");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let feeback = document.getElementById("feedback");

//Emit events
document.getElementById("send").addEventListener("click", function() {
  console.log("i work");
  client.emit("chat", {
    message: message.value,
    handel: handel.value
  });
});

message.addEventListener("keypress", function() {
  client.emit("typing", handle.value);
});

//Listen for events
client.on("chat", function(data) {
  output.innerHTML += `<p><strong>${data.handel}</strong>: ${data.message}</p>`;
  feedback = "";
});

client.on("typing", function(data) {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
