import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { connect } from 'react-redux';

function BiddingPage(props){
  const { rounds, round_index } = props;
  console.log("****bidding page: round index: ", round_index);
  const round = rounds[round_index];
  return <View>
            <Text>Bidding Page</Text>
            <InfoBar round_index={round_index} round={round}/>
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
          </View>
}

function mapStateToProps(state){
  return { rounds: state.rounds }
}

function mapDispatchToProps(dispatch){
  return { 
    onChangeField: (player, field, value) => {
      console.log("onChangeField: ", player, field, value);
      const action = { type: "CHANGE_FIELD", field: field, player: player, value: value }
      dispatch(action);
    },
    onChangeStage: (value) => {
      console.log("onChangeStage: ", value);
      const action = { type: "CHANGE_STAGE", value: value }
      dispatch(action);
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
