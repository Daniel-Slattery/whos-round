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

const pubImage = require('../assets/pub.svg');

const JoinScreen = ({enterPub}) => {

  const [userName, setUsername] = useState('');
  const [userDrink, setUserDrink] = useState('');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image style={{flex: 1}} source={pubImage} resizeMode='contain' style={{width: 300, height: 300}}/>
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
        <Button title='Enter Pub' onPress={() => enterPub(userName, userDrink)} />
      </View>
      {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  )
}

export default JoinScreen
