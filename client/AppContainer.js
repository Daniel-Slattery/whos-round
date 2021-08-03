import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import NextRoundScreen from './screens/nextRoundScreen';

// const Stack = createNativeStackNavigator(); //native stack navigator doesn't load when rendering on web
const Stack = createStackNavigator();


const AppContainer = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName={'Join'} screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Join" component={JoinScreen}/>
        <Stack.Screen name="Finished" component={NextRoundScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppContainer
