const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//Static files
app.use(express.static("public"));

//Socket setup
const io = socket(server);

io.on("connection", function(socket) {
  console.log("User has connected", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
