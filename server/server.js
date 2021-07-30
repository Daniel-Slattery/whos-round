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
  //console.log('users: ', users)
  //console.log(socket.id);
  users[socket.id] = { userId: currentUserId++ };
  socket.on('join', (username, drink) => {
    users[socket.id].username = username;
    users[socket.id].drink = drink;
    console.log(`username: ${username}, Drink: ${drink}`);
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  })
  socket.on('action', action => {
    switch(action.type) {
      case 'server/hello':
        console.log('Got hello event', action.data);
        socket.emit('action', {type: 'message', data: 'Good day from the server!' });
        break;
      case 'server/join':
        console.log(`Got Join Event, name: ${action.inputName}, drink: ${action.inputDrink}` );
        users[socket.id].username = action.inputName;
        users[socket.id].drink = action.inputDrink;
        users[socket.id].avatar = createUserAvatarUrl();
        break;
    }
  })
})

io.listen(3001);