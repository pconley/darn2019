import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import update from 'immutability-helper';

import { Provider } from 'react-redux'
import gameStore from './GameStore'

// GAME Stage
export const FORMING = "Forming";
export const STARTING = "Starting";
export const PLAYING = "Playing";
// ROUND Stage
export const BIDDING = "Bidding";
export const SCORING = "Scoring";

import BiddingPage from './BiddingPage';
import ScoringPage from './ScoringPage';

export default class GameScreen extends Component {
    static navigationOptions = {
        title: 'Game Screen',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    constructor(props) {
      super(props);
      this.state = {
        stage: BIDDING,
      };
    }
  
    _setView = (stage) => {
      console.log("game screen: set view: "+stage);
      this.setState({ stage: stage });
    }

    _get_view(stage){
      switch(stage) {
        case BIDDING:
          return <BiddingPage onSetStage={ this._setView }/>
          break;        
        case SCORING:
          return <ScoringPage onSetStage={ this._setView } />
          break;
        default:
          return <Text style={{paddingTop:200}}>Error Page</Text>;
      } 
    }

    render() {
      console.log("game screen: render: stage = ",this.state.stage);
      const view = this._get_view(this.state.stage);
      return <Provider store={gameStore}>{view}</Provider>
    }
  }
  