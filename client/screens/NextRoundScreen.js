import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRoundWaiting from '../components/NextRoundWaiting';
import HeaderLogo from '../components/HeaderLogo';
import dummyData from '../userData.json';
const backgroundImage = require('../assets/background.jpg');


const NextRoundScreen = ({navigation}) => {

  const privateMessage = useSelector(state => state.privateMessage);
  const nextRound = useSelector(state => state.nextRound);
  const usersOnline = useSelector(state => state.usersOnline);
  // const usersOnline = dummyData; // dummy data for testing
  function whoBuying() {
    const nextRoundUser = usersOnline.find((u) => u.nextRound);
    return nextRoundUser.username;
  }

  return (
    <View style={styles.mainContainer} data={privateMessage}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.itemsContainer}>
        <HeaderLogo />
        <View>
          { privateMessage ? (
          <YourRound navigation={navigation} usersOnline={usersOnline} whoBuying={whoBuying()}/>
          ) : (
            <NextRoundWaiting usersOnline={usersOnline} whoBuying={whoBuying()}/>
          )}
          { nextRound || navigation.navigate('Home')}
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default NextRoundScreen

const styles = StyleSheet.create({
  mainContainer: {
     backgroundColor: 'beige',
     flex: 1,
     alignSelf: 'stretch',
     justifyContent: 'center',
  },
  itemsContainer: {
    flex: 1,
     flexDirection: 'column',
     justifyContent: 'space-between',
     alignItems: 'center',
     margin: 10,
     alignItems: 'center', margin: 10
  },
  backgroundImage: {
    flex: 1,
  }
})