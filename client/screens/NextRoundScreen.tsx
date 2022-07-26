import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import YourRound from '../components/YourRound';
import NextRoundWaiting from '../components/NextRoundWaiting';
import HeaderLogo from '../components/HeaderLogo';
import { State } from '../types'
const backgroundImage = require('../assets/background.jpg');


const NextRoundScreen = ({navigation}) => {

  const targetBuyerSocket = useSelector((state: State) => state.targetBuyerSocket);
  const nextRound = useSelector((state: State) => state.nextRound);
  const usersOnline = useSelector((state: State) => state.usersOnline);

  function whoBuying() {
    const nextRoundUser = usersOnline.find((u) => u.nextRound);
    return nextRoundUser.username;
  }

  nextRound || navigation.navigate('Home');
  return (
    <View style={styles.mainContainer} data={targetBuyerSocket}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.itemsContainer}>
        <HeaderLogo />
        <View>
          { targetBuyerSocket ? (
          <YourRound navigation={navigation} usersOnline={usersOnline} whoBuying={whoBuying()}/>
          ) : (
            <NextRoundWaiting usersOnline={usersOnline} whoBuying={whoBuying()}/>
          )}
        </View>
      </View>
      </ImageBackground>
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