import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { connect } from 'react-redux';

function BiddingPage(props){
  return <View>
            <Button title="bid" onPress={props.onBid}/>
            <InfoBar round={props.round}/>
            <PlayerRows round={props.round} field='bid' changer={props.onChangeField}/> 
            <Button title="Start Scoring" loading
              onPress={() => props.onChangeStage("Scoring")}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />
          </View>
}

function mapStateToProps(state){
  // NOTE: not all the state needs to map to props
  return { round: state.rounds[state.current_round_index] }
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
