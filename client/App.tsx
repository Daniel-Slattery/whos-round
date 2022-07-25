import { Provider } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { LogBox, Platform } from 'react-native';
import AppContainer from './AppContainer';
import store from './store'
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3002");


//Platform.OS === 'android' && LogBox.ignoreAllLogs();// prevent error warning from showing on android emulator
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