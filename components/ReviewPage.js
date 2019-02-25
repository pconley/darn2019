import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

import { IncrementRoundAction, ChangeFieldAction, ChangeStageAction } from './Actions';

function ReviewPage(props){
  const { players, rounds } = props
  console.log("review page: players...",players);
  console.log("review page: rounds...",rounds);

  const render_round = ({item: round, index}) => {
    console.log("review page: render round: round...", round);
    const text = round.players.map((p) => { return p.score+"/"
    });
    return <Text>round {index} tricks = {round.tricks} :: {text}</Text>
  }

  const render_player = ({item: player, index}) => {
    console.log("review page: render player: player...", player);
    return <Text>{index}: {player.name}</Text>
  }

  return <View>
            <Text>Review Game:</Text>

            <FlatList data={players}
                renderItem={render_player}
                // renderItem={({item, index}) => <Text>round {index} tricks = {item.tricks}</Text>}
                //extraData={round} // to force refresh!!!
                keyExtractor={(item, index) => String(index)}
            ></FlatList>

            <FlatList data={rounds}
                renderItem={render_round}
                // renderItem={({item, index}) => <Text>round {index} tricks = {item.tricks}</Text>}
                //extraData={round} // to force refresh!!!
                keyExtractor={(item, index) => String(index)}
            ></FlatList>

            <Button title="Back to Scoring" loading
              onPress={() => {
                props.onSetStage("Scoring")    // changes the view
                props.onChangeStage("Scoring") // changes the store
              }}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />

            <Button title="Next Round"
              onPress={() => {
                props.onIncrementRound("Bidding")
                props.onChangeRound("xxx")
              }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />

          </View>
}

function mapStateToProps(state){
  return { rounds: state.game.rounds }
}

function mapDispatchToProps(dispatch){
  return { 
    onChangeRound: (value) => {
      // TODO: note that value is not currently used
      dispatch(IncrementRoundAction(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);

const button_style = {
  backgroundColor: "green",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
