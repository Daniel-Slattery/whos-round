import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch } from 'react-redux';
import PressableButton from '../components/PressableButton';

const backgroundImage = require('../assets/background.jpg');
const pubImage = require('../assets/pub.png');

const JoinScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [userName, setUsername] = useState('');
  const [userDrink, setUserDrink] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage}>
      <View style={styles.itemsContainer}>
        <Image source={pubImage} resizeMode='contain' style={styles.pubImage}/>
        <View style={styles.formInputItems}>
          <TextInput
            style={styles.TextBoxInput}
            placeholder='Enter Username'
            onChangeText={text => setUsername(text)}
            value={userName}
          />
          <TextInput
            style={styles.TextBoxInput}
            placeholder='Enter Drink'
            onChangeText={text => setUserDrink(text)}
            value={userDrink}
          />
          <PressableButton title='ENTER PUB'
           onPress={() => {
            dispatch({type: 'server/join', inputName: userName, inputDrink: userDrink});
            navigation.navigate('Home');
          }}/>
        </View>
       </View>
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} />
      </ImageBackground>
    </View>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  backgroundImage: {
    flex: 1,
  },
  itemsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pubImage: {
    flex: 1,
    width: 300,
    height: 300,
    marginTop: 30
  },
  formInputItems: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  TextBoxInput: {
    fontSize: 30,
    textAlign: 'center'
  }
})