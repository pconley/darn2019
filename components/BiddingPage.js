import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import { ChangeFieldAction, IncrementRoundAction, ChangeStageAction } from './Actions';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { connect } from 'react-redux';

function BiddingPage(props){
  const { players, rounds, current_round_index } = props.game;
  console.log("BiddingPage: players...",players);
  console.log("BiddingPage: rounds...",rounds);
  console.log("BiddingPage: round index: ", current_round_index);
  const round = rounds[current_round_index];
  return <View>
            <Text>Bidding Page</Text>
            <InfoBar round_index={current_round_index} round={round}/>
            <PlayerRows round={round} field='bid' changer={props.onChangeField}/> 
            <Button title="Start Scoring" loading
              onPress={() => {
                props.onSetStage("Scoring")
                props.onChangeStage("Scoring")
              }}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />
            <Button title="Previous Round"
                onPress={() => {
                  props.onSetStage("Reviewing") // changes the view
                  props.onChangeRound(-1)       // changes the store
                }}
                titleStyle={{ fontWeight: "700" }}
                buttonStyle={button_style}
                containerStyle={{ marginTop: 20 }}
              />
          </View>
}

function mapStateToProps(state){
  console.log("BiddingPage: MSTP: state...",state);
  return { game: state.game }
}

function mapDispatchToProps(dispatch){
  return { 
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

const button_style = {
  backgroundColor: "rgba(92, 99,216, 1)",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
