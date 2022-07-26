import { Provider } from 'react-redux';
import React, {useState, useEffect} from 'react';
import { LogBox, Platform } from 'react-native';
import AppContainer from './AppContainer';
import store from './store'

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