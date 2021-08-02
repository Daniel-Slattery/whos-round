import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

const backgroundImage = require('../assets/background.jpg');
const pubImage = require('../assets/pub.png');

const JoinScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [userName, setUsername] = useState('');
  const [userDrink, setUserDrink] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
      </ImageBackground>
      </View>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  container: {
     backgroundColor: 'beige',
     flex: 1
  },
  backgroundImage: {
    flex: 1,
  },
})