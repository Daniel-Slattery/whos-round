import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Platform, KeyboardAvoidingView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from "react-native-gifted-chat";
import JoinScreen from './JoinScreen';

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
        <Text style={styles.headerText}>🍻 Welcome to the pub 🍺 </Text>
        <TouchableOpacity onPress={() => alert("Finished Drink!!")}>
          <Image style={{flex: 1, width: 300, height: 300}} source={beerImage} resizeMode='contain' />
          <Text style={styles.buttonText}>Press Beer Icon when finished Drink</Text>
        </TouchableOpacity>
        <View>
          <Text style={{marginTop: 50, fontWeight: 'bold', fontSize: 30, color: 'green'}}>List of Users goes here</Text>
        </View>

        <GiftedChat
          renderUsernameOnMessage
          messages={recMessages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
        />
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
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  buttonText: {

  }
})