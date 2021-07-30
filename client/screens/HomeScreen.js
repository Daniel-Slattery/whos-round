import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Platform, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import FriendListScreen from './FriendListScreen';

const beerImage = require('../assets/beer.svg');

export default function HomeScreen() {
  const [recMessages, setRecMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001'); // ip may need to be updated 10.10.22.159
    socket.current.on('message', message => {
      setRecMessages(prevState => [message, ...prevState]);
    });
  },[])

  const onSend = (messages) => {
    console.log('messages in onSend: ', messages);
    socket.current.emit('message', messages[0].text);
    setRecMessages(prevState => [messages[0], ...prevState]);
  };

  const enterPub = (userName, userDrink) => {
    socket.current.emit('join', userName, userDrink);
    setHasJoined(true);
  }

  return (
    <View style={styles.container} >
      <View style={{alignItems: 'center', margin: 20}}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Who's Round</Text>
        </View>
        <TouchableOpacity onPress={() => alert("Finished Drink!!")}>
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
  container: {
     backgroundColor: 'beige',
     flex: 1
  },
  headerTextContainer: {
    backgroundColor: 'black',
    marginVertical: 20
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  beerImage: {
    flex: 1,
    width: 300,
    height: 300
  },
  buttonText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center'
  },
  participantsContainer: {
    alignSelf: 'stretch',
    marginTop: 40,
    backgroundColor: '#fad369',
    borderRadius: 20,
  },
  participantsHeader: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
  }
})