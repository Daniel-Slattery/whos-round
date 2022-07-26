export type User = {
  avatar?: () => string
  drink?: string
  isFinished?: string
  nextRound?: boolean
  userId?: string
  username?: string
}

export type State = {
  nextRound: boolean;
  targetBuyerSocket: boolean;
  userFinished: boolean;
  usersOnline: User[];
}