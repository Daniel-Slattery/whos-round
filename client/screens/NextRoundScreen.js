import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';
import FriendListScreen from './FriendListScreen';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRound from '../components/NextRound';

const NextRoundScreen = ({navigation}) => {

  const privateMessage = useSelector(state => state.privateMessage);
  const nextRound = useSelector(state => state.nextRound);

  return (
    <View style={styles.container} data={privateMessage}>
      { privateMessage ? (
      <YourRound navigation={navigation}/>
      ) : (
        <NextRound />
      )}
      { nextRound || navigation.navigate('App')}
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