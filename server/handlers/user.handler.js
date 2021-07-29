let currentMessageId = 1;

function createMessage(user, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  };
}

function handleMessage(socket, users) {
  socket.on('message', messageText => {
    // io.emit('message', messageText); //removed as socket.broadcast used instead
    const userId = users[socket.id]
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit('message', message)
  })
}

module.exports = { handleMessage };