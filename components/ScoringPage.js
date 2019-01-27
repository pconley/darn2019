

// export default class ScoringPage extends AbstractPage {
//   constructor(props) {
//     super(props);
//     this.state = { isShowingText: true };
//   }

//   render_body = () => { return (
//     <View>
//       <Text>Scoring Page</Text>
//       <PlayerRows round={this.props.round} field='bid'
//             onLongPress={ (player) => this.props.onChangeValue(player,0) }
//             onLeftPress={ (player) => this.props.onChangeValue(player,-1) }
//             onRightPress={ (player) => this.props.onChangeValue(player,+1) }
//         />
//     </View>
//   )}
// }

import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { connect } from 'react-redux';

function ScoringPage(props){
  return <View>
            <Button title="tricks" onPress={props.onBid}/>
            <InfoBar round={props.round}/>
            <PlayerRows round={props.round} field='tricks' changer={props.onChangeField}/> 
            <Button title="Back to Bidding" loading
              onPress={() => props.onChangeStage("Bidding")}
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

export default connect(mapStateToProps, mapDispatchToProps)(ScoringPage);

const button_style = {
  backgroundColor: "rgba(92, 99,216, 1)",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
