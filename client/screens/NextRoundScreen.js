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
        </View>
      </View>
      </ImageBackground>
      { nextRound || navigation.navigate('Home')}
    </View>
  )
}

export default NextRoundScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  mainContainer: {
     backgroundColor: 'beige',
     flex: 1,
  },
  itemsContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     margin: 10,
  }
})