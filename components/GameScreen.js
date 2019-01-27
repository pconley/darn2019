import React, {Component} from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux'

// the GAME screen controls the playing view... Bidding or Scoring
// and passes the GameStore to those views

import gameStore from './GameStore'

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
  
    _setStage = (stage) => {
      console.log("game screen: set view: "+stage);
      this.setState({ stage: stage });
    }

    _get_view(stage){
      switch(stage) {
        case BIDDING:
          return <BiddingPage onSetStage={ this._setStage }/>
          break;        
        case SCORING:
          return <ScoringPage onSetStage={ this._setStage } />
          break;
        default:
          return <Text style={{paddingTop:200}}>Error in Stage: {stage}</Text>;
      } 
    }

    render() {
      console.log("game screen: render: stage = ",this.state.stage);
      const view = this._get_view(this.state.stage);
      return <Provider store={gameStore}>{view}</Provider>
    }
  }
  