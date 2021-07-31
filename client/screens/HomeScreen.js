import React, {useEffect, useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Platform, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import io from 'socket.io-client';
import FriendListScreen from './FriendListScreen';

const beerImage = require('../assets/beer.png');
const backgroundImage = require('../assets/background.jpg');

export default function HomeScreen() {

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001'); // ip may need to be updated 10.10.22.159
    socket.current.on('finished', drinkState => {
      setRecMessages(drinkState);
    });
  },[])

  const dispatch = useDispatch();


  return (
      <View style={styles.container} >
        <View style={{alignItems: 'center', margin: 10}}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Who's Round</Text>
          </View>
          <TouchableOpacity style={styles.beerImageContainer} onPress={() => dispatch({type: 'server/finished', isFinished: "Finished ✔️"})}>
            <Image style={styles.beerImage} source={beerImage} resizeMode='contain' />
            <Text style={styles.buttonText}>Press Beer Icon when finished Drink</Text>
          </TouchableOpacity>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsHeader}>Participants</Text>
            <FriendListScreen />
          </View>
        </View>
        {
          Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />
        }
      </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
     backgroundColor: 'beige',
     flex: 1
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
  },
  beerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  beerImage: {
    flex: 1,
    width: 200,
    height: 200
  },
  buttonText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center'
  },
  participantsContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
    backgroundColor: '#fad369',
    borderRadius: 20,
  },
  participantsHeader: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  }
})