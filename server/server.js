const io = require('socket.io')();
const uuidv1 = require('uuid/v1');

console.log('Server Started! 🚀')

const users = {};

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 151);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand1}.png`;
}

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUserNames = values.filter(u => u.username !== undefined);
  return onlyWithUserNames;
}

io.on('connection', socket => {
  console.log('a user connected!');
  users[socket.id] = { userId: uuidv1() };
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('action', {type: 'users_online', data: createUsersOnline()})
  })
  socket.on('action', action => {
    switch(action.type) {
      case 'server/hello':
        console.log('Got hello event', action.data);
        socket.emit('action', {type: 'message', data: 'Good day from the server!' });
        break;
      case 'server/join':
        users[socket.id].username = action.inputName;
        users[socket.id].drink = action.inputDrink;
        users[socket.id].avatar = createUserAvatarUrl();
        users[socket.id].isFinished = "Drinking  🍺";
        console.log(`Got Join Event, name: ${action.inputName}, drink: ${action.inputDrink}, isFinished?: ${users[socket.id].isFinished}` );
        io.emit('action', { type: 'users_online', data: createUsersOnline() }) //io emit includes sender, socket emit only sends to others
        break;
      case 'server/finished':
        console.log('Drink Finished', action.data);
        io.emit('action', {type: 'finished', data: 'Finished ✔️' });
        break;
    }
  })
})

io.listen(3001);