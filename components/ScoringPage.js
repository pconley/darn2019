import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

function ScoringPage(props){
  return <View>
            <Text>Scoring Page</Text>
            <InfoBar round={props.round}/>
            <PlayerRows round={props.round} field='tricks' changer={props.onChangeField}/> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoringPage);

const button_style = {
  backgroundColor: "green",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
