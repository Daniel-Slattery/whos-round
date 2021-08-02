import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import React from 'react';
import AppContainer from './AppContainer';

const socket = io('http://localhost:3001')//may need to change
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

function reducer(state = {nextRound: false, privateMessage: false}, action) {
  switch(action.type) {
    case 'next_round':
      return { ...state, nextRound: action.data };
    case 'message':
      return { ...state, message: action.data };
    case 'private_message':
      return { ...state, privateMessage: action.data };
    case 'user_finished':
      return { ...state, userFinished: action.data };
    case 'users_online':
      return { ...state, usersOnline: action.data };
    case 'who_buying':
      return { ...state, whoBuying: action.data };
    case 'finished':
      return { ...state, isFinished: action.data };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log('new state', store.getState());
})

store.dispatch({ type: 'server/hello', data: 'Hello!' });

export default function App() {

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}