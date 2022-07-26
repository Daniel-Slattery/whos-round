import React from 'react'
import {Provider} from 'react-redux'
import {LogBox, Platform} from 'react-native'
import store from './redux/store'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import JoinScreen from './screens/JoinScreen'
import NextRoundScreen from './screens/NextRoundScreen'

// const Stack = createNativeStackNavigator(); //native stack navigator doesn't load when rendering on web
const Stack = createStackNavigator()

//Platform.OS === 'android' && LogBox.ignoreAllLogs();// prevent error warning from showing on android emulator
store.subscribe(() => {
  console.log('new state', store.getState())
})

store.dispatch({type: 'server/hello', data: 'Hello!'})

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Join'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Join' component={JoinScreen} />
          <Stack.Screen name='Finished' component={NextRoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
