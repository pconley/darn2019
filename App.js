import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { TextInput, Alert, ScrollView } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import update from 'immutability-helper';

import { Button, Header } from 'react-native-elements'

export const BIDDING = "Bidding";
export const PLAYING = "Playing";
export const SCORING = "Scoring";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      // stage: 'Starting',
      stage: 'Bidding',
      current_round_index: 0,
      tricks: [5, 3, 1, 2, 4],
      rounds: [
        { tricks: 5,
          total_bid: 0,
          dealer_id: 3,
          stage: BIDDING,
          players: [
            {id:1, bid:0, took:0, name:'pat'},
            {id:2, bid:0, took:0, name:'mj'},
            {id:3, bid:0, took:0, name:'claire'},
            {id:4, bid:0, took:0, name:'ted'},
            {id:5, bid:0, took:0, name:'tim'},
          ]
        }
      ],
      players: [
        {id:1, bid:0, name:'pat'},
        {id:2, bid:0, name:'mj'},
        {id:3, bid:0, name:'claire'},
        {id:4, bid:0, name:'ted'},
        {id:5, bid:0, name:'tim'},
      ]
    };
  }

  _setbid = (player, value) => {
    const s_round = this.state.rounds[this.state.current_round_index];
    const player_index = s_round.players.findIndex( c => c.id === player.id );
    const x_player = update(player,{bid: {$set: value}});
    const x_players = update(s_round.players, {[player_index]: { $set: x_player }});
    const x_total_bid = x_players.reduce((sum,x) => sum+x.bid, 0 );
    const x_round = update(s_round,{ total_bid: {$set: x_total_bid}, players: {$set: x_players} });
    const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
    this.setState({ rounds: x_rounds });
  }

  _setStage = (stage) => {
    this.setState({ stage: stage });
  }

  _handleIncrement = (player) => {
    const newval = player.bid+1;
    this._setbid(player,newval);
  }

  _handleDecrement = (player) => {
    const newval = Math.max(0,player.bid-1);
    this._setbid(player,newval);
  }

  _clearbid = (player) => {
    if (player.bid === 0) return;
    Alert.alert('You reset the bid to zero!')
    this._setbid(player,0);
  }

  _getDealerMessage = () => { 
    const round = this.state.rounds[this.state.current_round_index];
    const dealer = round.players.find( c => c.id === round.dealer_id );
    const bad = round.tricks - round.total_bid + dealer.bid;
    if( bad < 0 ) return "can bid anything."
    return "can't bid "+bad;
  }

  _getDealerName = () => {
    const round = this.state.rounds[this.state.current_round_index];
    const index = round.players.findIndex( c => c.id === round.dealer_id );
    return this.state.players[index].name;
  }


  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    if( this.state.stage === "Playing" ){
      return (
        <View>
        <Text style={{paddingTop:200}}>Playing</Text>
        <Button title='Back to Bidding'
          icon={{name: 'cached'}}
          onPress={() => this._setStage("Bidding")}
          buttonStyle={styles.bottomButtonStyle}
          backgroundColor='red'
        />
        </View>
      )
    }

    if( this.state.stage === "Starting" ){
      return(
        <View style={{paddingTop:200}}>
          <Button
            title="Start Game" 
            onPress={() => this._setStage("Bidding")}
            buttonStyle={[styles.bottomButtonStyle]}
            backgroundColor="rgba(92, 99,216, 1)"
          />     
        </View>  
      )
    }

    const sample_header =
      <Header leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Oh Darn!', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      ></Header>

    game_buttons = () => { 
      return (
       <View key='buttons' style={{paddingTop:30, height: 100, flexDirection: 'row' }}>
          <Button title='Cancel Game'
              icon={{name: 'cached'}}
              onPress={() => this._setStage("Starting")}
              buttonStyle={styles.bottomButtonStyle}
              backgroundColor='red'
          />
          <Button title="Start Playing" loading 
              onPress={() => this._setStage("Playing")}
              buttonStyle={styles.bottomButtonStyle}
              backgroundColor="rgba(92, 99,216, 1)"
          />
        </View>
      )
    }

    player_rows = () => {
      const dealer = round.players.find( c => c.id === round.dealer_id );
      return (
        <View style={{paddingTop:20}}>
          <FlatList data={this.state.rounds[this.state.current_round_index].players}
              renderItem={player_row}
              keyExtractor={(item, index) => String(item.id)}
          ></FlatList>
      </View> );
    }

    player_row = ({item}) => {
      const round = this.state.rounds[this.state.current_round_index];
      const dealer = round.players.find( c => c.id === round.dealer_id );
      const textColor = item.id === dealer.id ? "red" : "black";
      return (
          <View key={item.id} style={styles.playerRow}>
            <Button title='<'
                    onPress={() => this._handleDecrement(item)} 
                    onLongPress={() => this._clearbid(item)}
                    buttonStyle={styles.counterButtonStyle}
                    containerViewStyle={{ marginLeft: 5, marginRight: 0 }}
                />
            <Button title={String(item.bid)} 
                buttonStyle={styles.bidButtonStyle} 
                containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            />
            <Button title='>' 
                    onPress={() => this._handleIncrement(item)} 
                    onLongPress={() => this._clearbid(item)}
                    buttonStyle={styles.counterButtonStyle}
                    containerViewStyle={{ marginLeft: 0, marginRight: 10 }}
                />
            <Text style={[styles.playerName, {color: textColor}]}>{item.name}</Text>
          </View>
      )
    }

    info_bar = () => {
      return (
        <View>
          <Text style={styles.topline}>Tricks: {round.tricks}</Text>
          <Text style={styles.topline}>Players: {round.players.length}</Text>
          <Text style={styles.topline}>Stage: {round.stage}</Text>
          <Text style={styles.topline}>Total Bid: {round.total_bid} of {round.tricks}</Text>
          <Text style={[styles.topline, styles.red]}>Dealer [{this._getDealerName()}] {this._getDealerMessage()}</Text>
        </View>
      )
    }

    const round = this.state.rounds[this.state.current_round_index];
    return(
      <View style={{ paddingTop:40 }}>
        {sample_header}
        {info_bar()}
        {player_rows()}
        {game_buttons()}
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playerRow: {height: 60, flex: 1, flexDirection: 'row' },
  playerName: { fontWeight: 'bold', fontSize: 30 },
  topline: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  bidButtonStyle: {
    // backgroundColor: 'grey',
    width: 45,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  counterButtonStyle: {
    backgroundColor: "rgba(92, 99, 216, 1)",
    margin: 0,
    width: 40,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 15
  },
  bottomButtonStyle: {
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  instructions: {
    paddingTop: 80,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  blue: {
    color: 'blue',
  },
  red: {
    color: 'red',
  },
})
