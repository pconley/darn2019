import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import { 
  ChangeFieldAction, IncrementRoundAction, 
  ChangeStageAction, CalculateRoundAction
} from './Actions';

import PlayerRows from './PlayerRows'
import {ScoringButton, PrevRoundButton, FlexedButtons} from './Buttons'

import { connect } from 'react-redux';

function BiddingPage(props){
  const { players, rounds, current_round_index } = props.game;
  console.log("BiddingPage: players...",players);
  console.log("BiddingPage: rounds...",rounds);
  console.log("BiddingPage: round index: ", current_round_index);
  const round = rounds[current_round_index];
  return <View>
            <Text style={{backgroundColor: "red"}}>Bidding Page Header</Text>
            {FlexedButtons(props, PrevRoundButton, ScoringButton )}
            <PlayerRows round={round} field='bid' changer={props.onChangeField}/> 
            <Text style={{backgroundColor: "red"}}>Bidding Page Footer</Text>
          </View>
}

function mapStateToProps(state){
  return { game: state.game }
}

function mapDispatchToProps(dispatch){
  return { 
    calcRoundScores: (index) => {
      dispatch(CalculateRoundAction(index));
    },
    onChangeField: (player, field, value) => {
      dispatch(ChangeFieldAction(player, field, value));
    },
    onChangeStage: (stage) => {
      dispatch(ChangeStageAction(stage));
    },
    onChangeRound: (value) => {
      dispatch(IncrementRoundAction(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingPage);
