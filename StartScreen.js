import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button, FlatList } from 'react-native';

import update from 'immutability-helper';

import Game from './GameObject'

export default class StartScreen extends Component {
    static navigationOptions = {
      title: 'Start',
    };

    constructor(props) {
      super(props);
      this.state = {
        dummy: 1,
        game: {}, //new Game(),
        // all players will be in the database
        // and will have favorites and all that
        all_players : [ 
          {id:1, name:'patx'},
          {id:2, name:'mj'},
          {id:3, name:'claire'},
          {id:4, name:'ted'},
          {id:5, name:'tim'},
          {id:6, name:'jim'},
          {id:7, name:'jackie'},
          {id:8, name:'cheryl'},
          {id:9, name:'dani'},
          {id:10, name:'john'},
        ]
      }
    }
  
    save_players = (players) => { 
      console.log("start screen: save_players: players...",players); 
      const x_game = update(this.state.game,{players: {$set: players} });
      this.setState({ game: x_game });
    }

    start_round = () => {

      // initialize first round
      const {players} = this.state.game;
      console.log("start screen: start_round: players...",players); 
      const round = { 
        tricks: 5,
        total_bid: 0,
        total_tricks: 0, 
        dealer_id: 3,
        stage: 'Bidding',
        players: players
      }
      const x_game = update(this.state.game,{rounds: {$set: [round]} });
      this.setState({ game: x_game });


      this.props.navigation.navigate('Game', {
        game: this.state.game, 
        players: this.state.game.players,
        save_players: this.save_players})

    }

    render() {
        return (
          <View style={{paddingTop:50}}>
            <Text>Game Players:</Text>
            <FlatList style={{paddingTop:20}}
                data={this.state.game.players}
                keyExtractor={(item, index) => String(item.id)}
                renderItem={({item: player}) => <Text>{player.name}</Text>}
            ></FlatList>

            <Button
              title="Go To Players Screen"
              onPress={() => {
                this.props.navigation.navigate('Players', {
                  game: this.state.game, 
                  all_players: this.state.all_players,
                  save_players: this.save_players
                })}
              }
            />

            <Button
              title="Go To Game Screen"
              onPress={this.start_round}
            />
          </View>
        );
    }
}