import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import FriendListScreen from './FriendListScreen';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRound from '../components/NextRound';

const NextRoundScreen = () => {

  const usersOnline = useSelector(state => state.usersOnline);
  useSelector(state => state.usersOnline);


  return (
    <View style={styles.container} data={usersOnline}>
    { false ? (
      <NextRound />
    ) : (
      <YourRound />
    )}
    </View>
  )
}

export default NextRoundScreen

const styles = StyleSheet.create({
  container: {
     backgroundColor: 'beige',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
  }
})