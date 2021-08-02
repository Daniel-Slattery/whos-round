import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRoundWaiting from '../components/NextRoundWaiting';

const NextRoundScreen = ({navigation}) => {

  const privateMessage = useSelector(state => state.privateMessage);
  const nextRound = useSelector(state => state.nextRound);

  return (
    <View style={styles.container} data={privateMessage}>
      { privateMessage ? (
      <YourRound navigation={navigation}/>
      ) : (
        <NextRoundWaiting />
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