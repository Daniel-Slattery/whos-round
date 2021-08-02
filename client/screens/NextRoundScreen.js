import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRoundWaiting from '../components/NextRoundWaiting';
const backgroundImage = require('../assets/background.jpg');

const NextRoundScreen = ({navigation}) => {

  const privateMessage = useSelector(state => state.privateMessage);
  const nextRound = useSelector(state => state.nextRound);

  return (
    <View style={styles.container} data={privateMessage}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={{alignItems: 'center', margin: 10}}>
        <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Who's Round</Text>
        </View>
        <View>
          { privateMessage ? (
          <YourRound navigation={navigation}/>
          ) : (
            <NextRoundWaiting />
          )}
          { nextRound || navigation.navigate('App')}
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default NextRoundScreen

const styles = StyleSheet.create({
  container: {
     backgroundColor: 'beige',
     flex: 1,
     alignSelf: 'stretch',
     justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  headerTextContainer: {
    backgroundColor: 'black',
    marginTop: 10,
    marginBottom: 25
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  }
})