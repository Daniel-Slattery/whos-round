type User = {
  avatar?: () => string
  drink?: string
  isFinished?: string
  nextRound?: boolean
  socketId?: string
  username?: string
}

export const users = {}

export const createNewUser = () => {
  return {
    avatar: createUserAvatarUrl(),
    drink: '',
    isFinished: 'Drinking  🍺',
    nextRound: false,
    socketId: '',
    username: ''
  }
}

export const createUsersOnline = () => {
  const values = Object.values(users)
  return values.filter((user: User) => user.username !== undefined)
}

export const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 151)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand1}.png`
}

export const shuffleAssignNextRound = num => {
  const usersConnected = createUsersOnline()
  let indexOfNextRound = Math.floor(
    Math.random() * (usersConnected.length - num)
  )
  usersConnected.map((user: User, index) => {
    index === indexOfNextRound
      ? (user.nextRound = true)
      : (user.nextRound = false)
  })
}

export const nextRoundSocketId = () => {
  const nextRoundUser: {socketId?: string} = createUsersOnline().find(
    (user: User) => user.nextRound
  )
  if (nextRoundUser.socketId) return nextRoundUser.socketId
}

export const allFinished = () => {
  const usersConnected = createUsersOnline()
  return usersConnected.every((user: User) => user.isFinished === 'Finished ✔️')
}

export const nextRoundReset = () => {
  const usersConnected: User[] = createUsersOnline()

  usersConnected.forEach(user => (user.isFinished = 'Drinking  🍺'))

  usersConnected.forEach((user, index) => {
    if (user.nextRound === true) {
      user.nextRound = false
      if (usersConnected[index + 1] >= usersConnected.length - 1) {
        usersConnected[0].nextRound = true
      } else usersConnected[index + 1].nextRound = true
    }
  })
}
