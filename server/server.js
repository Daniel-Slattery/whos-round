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

function shuffleAssignNextRound(num) {
  const values = Object.values(users);
  const onlyWithUserNames = values.filter(u => u.username !== undefined);
  let indexOfNextRound = Math.floor(Math.random() * (onlyWithUserNames.length - num));
  onlyWithUserNames.map((u, index) => {
    index === indexOfNextRound ? u.nextRound = true : u.nextRound = false;
  })
}

function nextRoundSocketId() {
  const nextRoundUser = createUsersOnline().find((u) => u.nextRound);
  return nextRoundUser.socketId;
}

function nextRoundName() {
  const nextRoundUser = createUsersOnline().find((u) => u.nextRound);
  return nextRoundUser.username;
}

function allFinished() {
  const onlyWithUserNames = createUsersOnline();
  return onlyWithUserNames.every(el => el.isFinished === 'Finished ✔️')
}

function nextRoundReset() {
  const onlyWithUserNames = createUsersOnline();
  onlyWithUserNames.forEach((u) => u.isFinished = 'Drinking  🍺');
  const nextRoundUser = onlyWithUserNames.find((u) => u.nextRound);
  currentNextRoundIndex = onlyWithUserNames.indexOf(nextRoundUser);
  if (onlyWithUserNames[currentNextRoundIndex].nextRound) {
    onlyWithUserNames[currentNextRoundIndex].nextRound = false;
    if (currentNextRoundIndex === (onlyWithUserNames.length - 1)) {
      onlyWithUserNames[0].nextRound = true;
    } else {
      onlyWithUserNames[currentNextRoundIndex + 1].nextRound = true;
    }
  }
}

io.on('connection', socket => {
  users[socket.id] = { userId: uuidv1() };
  socket.on('disconnect', () => {
    users[socket.id].nextRound && shuffleAssignNextRound(1);
    delete users[socket.id];
    io.emit('action', {type: 'users_online', data: createUsersOnline()})
  })
  socket.on('action', action => {
    switch(action.type) {
      case 'server/hello':
        // console.log('Got hello event', action.data);
        socket.emit('action', {type: 'message', data: 'Good day from the server!' });
        break;
      case 'server/join':
        users[socket.id].username = action.inputName;
        users[socket.id].drink = action.inputDrink;
        users[socket.id].avatar = createUserAvatarUrl();
        users[socket.id].isFinished = 'Drinking  🍺';
        users[socket.id].nextRound = false;
        users[socket.id].socketId = socket.id;
        shuffleAssignNextRound(0);
        createUsersOnline().length === 1 ? users[socket.id].admin = true : users[socket.id].admin = false;
        io.emit('action', { type: 'users_online', data: createUsersOnline() }) //io emit includes sender, socket emit only sends to others
        break;
      case 'server/finished': //handling when beer icon is pressed
        users[socket.id].isFinished === 'Drinking  🍺' ? users[socket.id].isFinished = 'Finished ✔️':
          users[socket.id].isFinished = 'Drinking  🍺';
        //check if all users are finished drinks
        if (allFinished()) {
          io.to(nextRoundSocketId()).emit('action', {type: 'private_message', data: true })
          io.emit('action', { type: 'next_round', data: true });
        } else {
          io.to(nextRoundSocketId()).emit('action', {type: 'private_message', data: false })
          io.emit('action', { type: 'next_round', data: false });
        }
        io.emit('action', { type: 'who_buying', data: nextRoundName() });
        io.emit('action', { type: 'users_online', data: createUsersOnline() });
        break;
      case 'server/nextRound':
        nextRoundReset();
        io.emit('action', { type: 'next_round', data: false });
        io.emit('action', { type: 'private_message', data: false });
        io.emit('action', { type: 'users_online', data: createUsersOnline() })
        break;
    }
  })
})

io.listen(3001);