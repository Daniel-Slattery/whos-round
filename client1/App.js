import { createStoreHook, aplyMiddleware } from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
const socket = io('http://localhost:3001')//may need to change
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

import React from 'react';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  return (
    <HomeScreen />
  );
}