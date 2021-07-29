const io = require('socket.io')();
const messageHandler = require('./handlers/message.handler');

console.log('Server Started! 🚀')

let currentUserId = 2;
const users = {};


function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

io.on('connection', socket => {
  console.log('a user connected!');
  console.log('users: ', users)
  console.log(socket.id);
  users[socket.id] = { userId: currentUserId++ };
  socket.on('join', (username, drink) => {
    console.log('username', username)
    users[socket.id].username = username;
    users[socket.id].drink = drink;
    console.log('drink', drink)
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  })
})

io.listen(3001);