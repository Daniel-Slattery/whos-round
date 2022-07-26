type User = {
  avatar?: () => string
  drink?: string
  isFinished?: string
  nextRound?: boolean
  userId?: string
  username?: string
}

export const users = {}

export const createNewUser = (userSocket, action) => {
  userSocket.username = action.inputName
  userSocket.drink = action.inputDrink
  userSocket.avatar = createUserAvatarUrl()
  userSocket.isFinished = 'Drinking  🍺'
  userSocket.nextRound = false
}

export const createUsersOnline = () => {
  const values = Object.values(users)
  return values.filter((user: User) => user.username !== undefined)
}

export const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 151)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rand1}.png`
}

export const shuffleAssignNextRound = (num) => {
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
  const nextRoundUser: {userId?: string} = createUsersOnline().find(
    (user: User) => user.nextRound
  )
  if (nextRoundUser.userId) return nextRoundUser.userId
}

export const allFinished = () => {
  const usersConnected = createUsersOnline()
  return usersConnected.every((user: User) => user.isFinished === 'Finished ✔️')
}

export const nextRoundReset = () => {
  const usersConnected: User[] = createUsersOnline()
  usersConnected.forEach(user => (user.isFinished = 'Drinking  🍺'))

  const nextRoundUserIndex = usersConnected.indexOf(
    usersConnected.find(user => user.nextRound)
  )
  usersConnected[nextRoundUserIndex].nextRound = false

  if (nextRoundUserIndex >= usersConnected.length - 1) {
    usersConnected[0].nextRound = true
  } else usersConnected[nextRoundUserIndex + 1].nextRound = true
}
