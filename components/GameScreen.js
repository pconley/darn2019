import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux'

import InfoBar from './InfoBar'


// the GAME screen controls the playing view.
// --- Bidding
// --- Scoring
// --- Reviewing
// and passes the AppStore to those views

// THERE IS STILL A "STAGE" OF THE GAME THAT IS STORED IN
// THE APP STORE STATE... BUT NOT SURE IF THIS MAKES SENSE?
// DOES A GAME HAVE A STAGE OR IS THAT JUST THE CURRENT VIEW

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
      // console.log("game screen: set view: "+stage);
      this.setState({ stage: stage });
    }

    _get_view(stage){
      console.log("GameScreen: get view for stage = "+stage);
      switch(stage) {
        case BIDDING:
          return <BiddingPage 
            round_index={ this.state.round_index } 
            onSetStage={ this._setStage }/>
          break;        
        case SCORING:
          return <ScoringPage 
            round_index={ this.state.round_index } 
            onSetStage={ this._setStage } />
          break;
        case REVIEWING:
          return <ReviewPage 
            round_index={ this.state.round_index }
            onSetStage={ this._setStage } />
          break;
        default:
          return <Text style={{paddingTop:200}}>Unknown Round Stage: {stage}</Text>;
      } 
    }

    render() {
      const state = appStore.getState();
      const index = state.game.current_round_index;
      const round = state.game.rounds[index];

      console.log("GameScreen: render stage = ",round.stage);
      const body = this._get_view(round.stage);
      const page = <View>
          <Text style={{backgroundColor: "orange"}}>Text Header in GameScreen</Text>
          <InfoBar round_index={index} round={round}/>
          {body}
          <Text style={{backgroundColor: "orange"}}>Text Footer in GameScreen</Text>
        </View>
      return <Provider store={appStore}>{page}</Provider>
    }
  }
  