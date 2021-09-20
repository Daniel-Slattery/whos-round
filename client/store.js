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
    case 'finished':
      return { ...state, isFinished: action.data };
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
