import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { 
  ChangeFieldAction, IncrementRoundAction, 
  ChangeStageAction, CalculateRoundAction
} from './Actions';

import {ScoringButton, NextRoundButton, FlexedButtons} from './Buttons'

function ReviewPage(props){
  console.log("ReviewPage: props...",props);
  const { players, rounds, current_round_index } = props.game;
  console.log("ReviewPage: players...",players);
  console.log("ReviewPage: rounds...",rounds);
  console.log("ReviewPage: round index: ", current_round_index);
  const round = rounds[current_round_index];

  const render_round = ({item: round, index}) => {
    console.log("review page: render round: round...", round);
    const text = round.players.map((p) => { return p.score+"/" });
    return <Text>round {index} tricks = {round.tricks} :: {text}</Text>
  }


  const get_totals = (game, player_id) => {
    console.log("******** get_totals:", player_id);
    // return array of the cummulative score for the given player
    results = [];
    total = 0;
    game.rounds.forEach(function(round) {
      console.log("+++round",round);
      const p = round.players.find( (p) =>  {return p.id === player_id} )
      console.log("+++player", p);
      if( p && p.score !== 0 ){
        total += p.score;
        results.push(total)
        console.log("player in the round", total, p)
      }
    });
    return results;
  }

  const render_player = ({item: player, index}) => {
    console.log("review page: render player: player...", player);
    const totals = get_totals(props.game, player.id);
    console.log("***********totals", totals);
    const text = totals.map((t) => { return t+" | " });
    return <Text>{index}: {player.id} :: {player.name} ::: {text} </Text>
  }

  return <View>
    <Text style={{backgroundColor: "lightblue"}}>Review Page Header</Text>
    {FlexedButtons(props, ScoringButton, NextRoundButton )}
    <Text>Players:</Text>
    <FlatList data={players}
        renderItem={render_player}
        //extraData={round} // to force refresh!!!
        keyExtractor={(item, index) => String(index)}
    ></FlatList>
    <Text>Rounds:</Text>
    <FlatList data={rounds}
        renderItem={render_round}
        //extraData={round} // to force refresh!!!
        keyExtractor={(item, index) => String(index)}
    ></FlatList>
    <Text style={{backgroundColor: "lightblue"}}>Review Page Footer</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
