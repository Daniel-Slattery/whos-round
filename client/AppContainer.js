import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import NextRoundScreen from './screens/nextRoundScreen';

const AppStack = createStackNavigator({ Home: HomeScreen });

export default createAppContainer(
  createSwitchNavigator(
  {
    App: AppStack,
    Join: JoinScreen,
    Finished: NextRoundScreen
  },
  {
    initialRouteName: "Join"
    // initialRouteName: "Finished" //skip sign in page for testing
  })
)