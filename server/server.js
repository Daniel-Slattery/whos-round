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

function shuffleAssignNextRound() {
  const values = Object.values(users);
  const onlyWithUserNames = values.filter(u => u.username !== undefined);
  let indexOfNextRound = Math.floor(Math.random() * onlyWithUserNames.length);
  onlyWithUserNames.map((u, index) => {
    index === indexOfNextRound ? u.nextRound = true : u.nextRound = false;
  })
}

function allFinished() {
  const values = Object.values(users);
  const onlyWithUserNames = values.filter(u => u.username !== undefined);
  return onlyWithUserNames.every(el => el.isFinished === 'Finished ✔️')
}

io.on('connection', socket => {
  console.log('a user connected!');
  users[socket.id] = { userId: uuidv1() };
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    users[socket.id].nextRound && shuffleAssignNextRound();
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
        users[socket.id].isFinished = 'Drinking  🍺';
        users[socket.id].nextRound = false;
        shuffleAssignNextRound();
        createUsersOnline().length === 1 ? users[socket.id].admin = true : users[socket.id].admin = false;
        io.emit('action', { type: 'users_online', data: createUsersOnline() }) //io emit includes sender, socket emit only sends to others
        break;
      case 'server/finished': //handling when beer icon is pressed
        users[socket.id].isFinished === 'Drinking  🍺' ? users[socket.id].isFinished = 'Finished ✔️':
          users[socket.id].isFinished = 'Drinking  🍺';
          //check if all users are finished drinks
        allFinished() && io.emit('action', { type: 'finished', data: true });

        io.emit('action', { type: 'users_online', data: createUsersOnline() });
        break;
    }
  })
})

io.listen(3001);