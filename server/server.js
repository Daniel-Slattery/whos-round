const {
  allFinished,
  createUserAvatarUrl,
  createUsersOnline,
  nextRoundReset,
  nextRoundSocketId,
  shuffleAssignNextRound,
  users,
} = require("./userFunctions.ts");
const io = require("socket.io")();
const uuidv1 = require("uuid/v1");

console.log("Server Started! 🚀");


io.on("connection", (socket) => {
  users[socket.id] = { userId: uuidv1() };
  const userSocket = users[socket.id];
  socket.on("disconnect", () => {
    userSocket.nextRound && shuffleAssignNextRound(1, users);
    delete users[socket.id];
    io.emit("action", {
      type: "users_online",
      data: createUsersOnline(),
    });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/hello":
        socket.emit("action", {
          type: "message",
          data: "Good day from the server!",
        });
        break;
      case "server/join":
        console.log(`user ${action.inputName} connected`);
        userSocket.username = action.inputName;
        userSocket.drink = action.inputDrink;
        userSocket.avatar = createUserAvatarUrl();
        userSocket.isFinished = "Drinking  🍺";
        userSocket.nextRound = false;
        userSocket.socketId = socket.id;
        shuffleAssignNextRound(0, users);
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        }); //io emit includes sender, socket emit only sends to others
        break;
      case "server/finished": //handling when beer icon is pressed
        userSocket.isFinished === "Drinking  🍺"
          ? (userSocket.isFinished = "Finished ✔️")
          : (userSocket.isFinished = "Drinking  🍺");
        //check if all users are finished drinks
        if (allFinished(createUsersOnline)) {
          io.to(nextRoundSocketId(createUsersOnline)).emit("action", {
            type: "private_message",
            data: true,
          });
          io.emit("action", { type: "next_round", data: true });
        } else {
          io.to(nextRoundSocketId(createUsersOnline)).emit("action", {
            type: "private_message",
            data: false,
          });
          io.emit("action", { type: "next_round", data: false });
        }
        userSocket.isFinished === "Finished ✔️"
          ? io
              .to(socket.id)
              .emit("action", { type: "user_finished", data: true })
          : io
              .to(socket.id)
              .emit("action", { type: "user_finished", data: false });
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        });
        break;
      case "server/nextRound":
        nextRoundReset(createUsersOnline);
        io.emit("action", { type: "next_round", data: false });
        io.emit("action", { type: "private_message", data: false });
        io.emit("action", { type: "user_finished", data: false });
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        });
        break;
    }
  });
});

io.listen(3001);
