import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Platform, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import io from 'socket.io-client';
import FriendList from '../components/FriendList';

const beerImage = require('../assets/beer.png');
const beerEmptyImage = require('../assets/beer-empty.png');
const backgroundImage = require('../assets/background.jpg');

export default function HomeScreen({ navigation }) {

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001'); // ip may need to be updated 10.10.22.159
  },[])

  const dispatch = useDispatch();

  const usersOnline = useSelector(state => state.usersOnline);
  const nextRound = useSelector(state => state.nextRound);
  const userFinished = useSelector(state => state.userFinished);

  return (
      <View style={styles.container} data={usersOnline}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
        <View style={{alignItems: 'center', margin: 10}}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Who's Round</Text>
          </View>
          {userFinished ? (
          <TouchableOpacity style={styles.beerImageContainer} onPress={() => {
            dispatch({type: 'server/finished', isFinished: "Finished ✔️"});
          }}
          >
            <Image style={styles.beerImage} source={beerEmptyImage} resizeMode='contain' />
            <Text style={styles.buttonText}>Waiting on Your Friends to Finish</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.beerImageContainer} onPress={() => {
              dispatch({type: 'server/finished', isFinished: "Finished ✔️"});
            }}
            >
              <Image style={styles.beerImage} source={beerImage} resizeMode='contain' />
              <Text style={styles.buttonText}>Press Beer Icon when finished Drink</Text>
            </TouchableOpacity>
          )}
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsHeader}>Participants</Text>
            <FriendList />
          </View>
        </View>
        {
          Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />
        }
        { nextRound && navigation.navigate('Finished') }
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
     backgroundColor: 'beige',
     flex: 1
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
    opacity: 0.8
  },
  participantsHeader: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 15,
  }
})