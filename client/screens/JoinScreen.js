import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch } from 'react-redux';


const pubImage = require('../assets/pub.svg');

const JoinScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [userName, setUsername] = useState('');
  const [userDrink, setUserDrink] = useState('');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'beige'}}>
      <Image style={{flex: 1}} source={pubImage} resizeMode='contain' style={{width: 300, height: 300, marginTop: 30}}/>
      <View style={{ flex: 1, justifyContent: 'space-around'}}>
        <TextInput
          style={{fontSize: 30, textAlign: 'center'}}
          placeholder='Enter Username'
          onChangeText={text => setUsername(text)}
          value={userName}
        />
        <TextInput
          style={{fontSize: 30, textAlign: 'center'}}
          placeholder='Enter Drink'
          onChangeText={text => setUserDrink(text)}
          value={userDrink}
        />
        <Button title='Enter Pub'
          onPress={() => {
            dispatch({type: 'server/join', inputName: userName, inputDrink: userDrink});
            navigation.navigate('App');
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </View>
  )
}

export default JoinScreen
