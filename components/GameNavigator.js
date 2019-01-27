import React from 'react';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { Provider } from 'react-redux'

import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import GameScreen from './GameScreen';

import store from '../src/index'

export const GameNavigator = createStackNavigator({
  Main: { screen: GameScreen },
}, {
  initialRouteName: 'Main',
});
  
const GameWithNavigationState = ({ dispatch, nav }) => (
        <GameNavigator
            navigation={{ dispatch: dispatch, state: nav }}
        />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(GameWithNavigationState);