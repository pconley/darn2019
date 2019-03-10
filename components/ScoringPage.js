import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import PlayerRows from './PlayerRows'

import {BiddingButton, ReviewButton, FlexedButtons} from './Buttons'

import { ChangeStageAction, ChangeFieldAction } from './Actions';

function ScoringPage(props){
  console.log("ScoringPage: props...",props);
  const { players, rounds, current_round_index } = props.game;
  console.log("ScoringPage: players...",players);
  console.log("ScoringPage: rounds...",rounds);
  console.log("ScoringPage: round index: ", current_round_index);
  const round = rounds[current_round_index];

  return <View>
          <Text style={{backgroundColor: "green"}}>Scoring Page</Text>
          {FlexedButtons(props, BiddingButton, ReviewButton )}
          <PlayerRows round={round} field='tricks' changer={props.onChangeField}/> 
          <View style={{height: 30, backgroundColor: 'skyblue'}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoringPage);
