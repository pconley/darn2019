import React, {Component} from 'react';

import * as log from 'loglevel';


import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import GameScreen    from './components/GameScreen';
import ProfileTab    from './components/ProfileTab';
import StartScreen   from './components/StartScreen';
import PlayersScreen from './components/PlayersScreen';
import ProfileScreen from './components/ProfileScreen';
import DetailsScreen from './components/DetailsScreen';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });

const GameStackNavigator = createStackNavigator({
  Start: StartScreen,
  Game: GameScreen,
});

const ProfileStackNavigator = createStackNavigator({
  Settings: ProfileScreen,
  Details: DetailsScreen,
});

const TestStackNavigator = createStackNavigator({
  TestMain: ProfileTab,
});

const TabNavigator = createBottomTabNavigator(
  { 
    Game: GameStackNavigator,
    Test: TestStackNavigator,
    Players: PlayersScreen,
    Profile: ProfileStackNavigator,
  },
  { tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount(){
    console.log("app: component did mount");
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("App: did mount. movies...", responseJson.movies);
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

    log.setDefaultLevel("trace")
    log.enableAll() 
    log.setLevel(log.levels.ERROR) 
    log.warn("App: render: state...", this.state);
    log.info("info");
    return <AppContainer />;
  }
}
