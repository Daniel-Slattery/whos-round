const createUserAvatarUrl = () => {
    const rand1 = Math.round(Math.random() * 151);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand1}.png`;
  }

const shuffleAssignNextRound = (num, users) => {
    const values = Object.values(users);
    const onlyWithUserNames = values.filter(user => user.username !== undefined);
    let indexOfNextRound = Math.floor(Math.random() * (onlyWithUserNames.length - num));
    onlyWithUserNames.map((u, index) => {
      index === indexOfNextRound ? u.nextRound = true : u.nextRound = false;
    })
  }

const nextRoundSocketId = (cb) => {
    const nextRoundUser = cb().find((user) => user.nextRound);
    if (nextRoundUser.socketId) return nextRoundUser.socketId;
  }

const allFinished = (cb) => {
    const onlyWithUserNames = cb();
    return onlyWithUserNames.every(el => el.isFinished === 'Finished ✔️')
  }

const nextRoundReset = (cb) => {
    const onlyWithUserNames = cb();
    onlyWithUserNames.forEach((user) => user.isFinished = 'Drinking  🍺');
    const nextRoundUser = onlyWithUserNames.find((user) => user.nextRound);
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

  module.exports = {
    createUserAvatarUrl,
    shuffleAssignNextRound,
    nextRoundSocketId,
    nextRoundReset,
    allFinished,
  }




