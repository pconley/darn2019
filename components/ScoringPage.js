import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { ChangeStageAction, ChangeFieldAction } from './Actions';

function ScoringPage(props){
  const { players, rounds, current_round_index } = props.game;
  console.log("ScoringPage: players...",players);
  console.log("ScoringPage: rounds...",rounds);
  console.log("ScoringPage: round index: ", current_round_index);
  const round = rounds[current_round_index];
  return <View>
            <Text>Scoring Page</Text>
            <InfoBar round_index={current_round_index} round={round}/>
            <PlayerRows round={round} field='tricks' changer={props.onChangeField}/> 
            <Button title="Back to Bidding" loading
              onPress={() => {
                props.onSetStage("Bidding")    // changes the view
                props.onChangeStage("Bidding") // changes the store
              }}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />
            <Button title="Finish Round"
              onPress={() => {
                props.onSetStage("Reviewing")    // changes the view
                props.onChangeStage("Reviewing") // changes the store
              }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
}

function mapStateToProps(state){
  // NOTE: not all the state needs to map to props
  // const index = state.game.current_round_index;
  // const round = state.game.rounds[index];
  return { game: state.game }
}

function mapDispatchToProps(dispatch){
  return { 
    onChangeField: (player, field, value) => {
      dispatch(ChangeFieldAction(player, field, value));
    },
    onChangeStage: (stage) => {
      dispatch(ChangeStageAction(stage));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoringPage);

const button_style = {
  backgroundColor: "green",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
