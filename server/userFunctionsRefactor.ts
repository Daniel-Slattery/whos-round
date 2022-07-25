type  User = {
  socketId?: string;
  username?: string;
  nextRound?: boolean;
  isFinished?: string;
  avatar?: () => string;
}

export const users = {}

export const createUsersOnline = () => {
  const values = Object.values(users)
  const onlyWithUserNames: User[] = values.filter((user: User) => user.username !== undefined)
  return onlyWithUserNames
}

export const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 151)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand1}.png`
}

export const shuffleAssignNextRound = num => {
  const values = Object.values(users)
  const onlyWithUserNames = values.filter((user: User) => user.username !== undefined)
  let indexOfNextRound = Math.floor(
    Math.random() * (onlyWithUserNames.length - num)
  )
  onlyWithUserNames.map((user: User, index) => {
    index === indexOfNextRound ? (user.nextRound = true) : (user.nextRound = false)
  })
}

export const nextRoundSocketId = () => {
  const nextRoundUser: {socketId?: string} = createUsersOnline().find((user: User) => user.nextRound)
  if (nextRoundUser.socketId) return nextRoundUser.socketId
}

export const allFinished = () => {
  const onlyWithUserNames = createUsersOnline()
  return onlyWithUserNames.every((el: {isFinished: string}) => el.isFinished === 'Finished ✔️')
}

export const nextRoundReset = () => {
  const onlyWithUserNames: User[] = createUsersOnline()
  onlyWithUserNames.forEach((user: User) => (user.isFinished = 'Drinking  🍺'))
  const nextRoundUser = onlyWithUserNames.find((user: User) => user.nextRound)
  const currentNextRoundIndex = onlyWithUserNames.indexOf(nextRoundUser)
  if (onlyWithUserNames[currentNextRoundIndex].nextRound) {
    onlyWithUserNames[currentNextRoundIndex].nextRound = false
    if (currentNextRoundIndex === onlyWithUserNames.length - 1) {
      onlyWithUserNames[0].nextRound = true
    } else {
      onlyWithUserNames[currentNextRoundIndex + 1].nextRound = true
    }
  }
}

export const createNewUser = () => {
  const newUser = {
    avatar: createUserAvatarUrl(),
    drink: '',
    isFinished: 'Drinking  🍺',
    nextRound: false,
    socketId: '',
    username: ''
  }
  return newUser
}
