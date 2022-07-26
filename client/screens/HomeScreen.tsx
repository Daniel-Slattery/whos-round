import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import FriendList from '../components/FriendList';
import BeerIcon from '../components/BeerIcon';
import HeaderLogo from '../components/HeaderLogo';
import dummyData from '../data/userData.json';

const backgroundImage = require('../assets/background.jpg');

export default function HomeScreen({ navigation }) {

  const usersOnline = useSelector(state => state.usersOnline);
  // const usersOnline = dummyData; // dummy data for testing

  const nextRound = useSelector(state => state.nextRound);
  nextRound && navigation.navigate('Finished')

  return (
    <View style={styles.mainContainer} data={usersOnline}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.itemsContainer}>
          <HeaderLogo />
              <BeerIcon />
          <FlatList
            style={styles.participantsContainer}
            ListFooterComponent={
              <View >
                <Text style={styles.participantsHeader}>Participants</Text>
                <FriendList usersOnline={usersOnline}/>
              </View>
              }/>
          </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
     flex: 1,
  },
  itemsContainer: {
    flex: 1,
     flexDirection: 'column',
     justifyContent: 'space-between',
     alignItems: 'center',
     margin: 10
  },
  backgroundImage: {
    flex: 1,
  },
  participantsContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
    backgroundColor: '#fad369',
    borderRadius: 20,
    opacity: 0.8
  },
  participantsHeader: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 30,
  }
})