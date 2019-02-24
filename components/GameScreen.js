import React, {Component} from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux'

// the GAME screen controls the playing view... Bidding or Scoring
// and passes the AppStore to those views

import appStore from './AppStore'

export const BIDDING = "Bidding";
export const SCORING = "Scoring";
export const REVIEWING = "Reviewing";

import ReviewPage from './ReviewPage';
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
        round_index: 0,
        stage: BIDDING,
      };
    }
  
    _setStage = (stage) => {
      console.log("game screen: set view: "+stage);
      this.setState({ stage: stage });
    }

    _incrementRound = (stage) => {
      console.log("game screen: incr round");
      this.setState({ 
        round_index: this.state.round_index+1,
        stage: stage
      });
    }

    _get_view(stage){
      console.log("*** game screen: get view: stage = "+stage);
      switch(stage) {
        case BIDDING:
          return <BiddingPage 
            round_index={this.state.round_index} 
            onSetStage={ this._setStage }/>
          break;        
        case SCORING:
          return <ScoringPage 
            roundIndex={this.state.round_index} 
            onSetStage={ this._setStage } />
          break;
        case REVIEWING:
          return <ReviewPage 
            onIncrementRound={this._incrementRound}
            onSetStage={ this._setStage } />
          break;
        default:
          return <Text style={{paddingTop:200}}>Error in Stage: {stage}</Text>;
      } 
    }

    render() {
      console.log("GameScreen: render: stage = ",this.state.stage);
      const view = this._get_view(this.state.stage);
      return <Provider store={appStore}>{view}</Provider>
    }
  }
  