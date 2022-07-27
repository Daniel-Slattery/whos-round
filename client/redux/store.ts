import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { State, User } from '../types'

const initialState: State = {
  nextRound: false,
  targetBuyerSocket: false,
  userFinished: false,
  usersOnline: []
}

const socket = io('http://localhost:3002')
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const reducer = (state = initialState, action?) => {
  switch (action.type) {
    case 'next_round':
      return {...state, nextRound: action.data}
    case 'target_buyer_socket':
      return {...state, targetBuyerSocket: action.data}
    case 'user_finished':
      return {...state, userFinished: action.data}
    case 'users_online':
      return {...state, usersOnline: action.data}
    default:
      return state
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)

export default store
