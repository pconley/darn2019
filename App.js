import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Alert, ScrollView } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import update from 'immutability-helper';

import { Button, Header } from 'react-native-elements'

import PlayerRows from './components/PlayerRows'

// GAME Stage
export const STARTING = "Starting";
export const PLAYING = "Playing";
// ROUND Stage
export const BIDDING = "Bidding";
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
      stage: PLAYING,
      current_round_index: 0,
      tricks: [5, 3, 1, 2, 4],
      rounds: [
        { tricks: 5,
          total_bid: 0,
          total_tricks: 0, 
          dealer_id: 3,
          stage: BIDDING,
          players: [
            {id:1, bid:0, tricks:0, name:'pat'},
            {id:2, bid:0, tricks:0, name:'mj'},
            {id:3, bid:0, tricks:0, name:'claire'},
            {id:4, bid:0, tricks:0, name:'ted'},
            {id:5, bid:0, tricks:0, name:'tim'},
          ]
        }
      ],
      players: [
        {id:1, name:'pat'},
        {id:2, name:'mj'},
        {id:3, name:'claire'},
        {id:4, name:'ted'},
        {id:5, name:'tim'},
      ]
    };
  }

  _setValue = (player, field, value) => {
    console.log("set value:"+field+" = "+value);
    const total_field = 'total_'+field;
    const s_round = this.state.rounds[this.state.current_round_index];
    const player_index = s_round.players.findIndex( c => c.id === player.id );
    const x_player = update(player,{[field]: {$set: value}});
    const x_players = update(s_round.players, {[player_index]: { $set: x_player }});
    const x_total = x_players.reduce((sum,x) => sum+x[field], 0 );
    const x_round = update(s_round,{ [total_field]: {$set: x_total}, players: {$set: x_players} });
    const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
    this.setState({ rounds: x_rounds });
  }

  _setGameStage = (stage) => {
    console.log("set game stage: "+stage);
    this.setState({ stage: stage });
  }
  _setStage = (stage) => {
    console.log("set stage: "+stage);
    const s_round = this.state.rounds[this.state.current_round_index];
    const x_round = update(s_round,{ stage: {$set: stage} });
    const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
    this.setState({ rounds: x_rounds });
  }

  _changeValue = (player,field,delta,maxval=52) => {
    const newval = Math.min(maxval,Math.max(0,player[field]+delta)); 
    this._setValue(player,field,newval);
  }

  _clearValue = (player,field) => {
    if (player.bid === 0) return;
    this._setValue(player,field,0);
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

    console.log("render: stage = "+this.state.stage);

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

    if( this.state.stage === STARTING ){
      return(
        <View style={{paddingTop:200}}>
          <Button
            title="Start Game" 
            onPress={() => this._setGameStage(PLAYING)}
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
              onPress={() => this._setGameStage(STARTING)}
              buttonStyle={styles.bottomButtonStyle}
              backgroundColor='red'
          />
          <Button title="Start Scoring" loading 
              // disabled={true}
              onPress={() => this._setStage(SCORING)}
              buttonStyle={styles.bottomButtonStyle}
              backgroundColor="rgba(92, 99,216, 1)"
          />
        </View>
      )
    }

    info_bar = () => {
      return (
        <View>
          <Text style={styles.topline}>Tricks: {round.tricks}</Text>
          <Text style={styles.topline}>Players: {round.players.length}</Text>
          <Text style={styles.topline}>Round {this.state.current_round_index} Stage: {round.stage}</Text>
          <Text style={styles.topline}>Total Bid: {round.total_bid} of {round.tricks}</Text>
          <Text style={styles.topline}>Tricks Taken: {round.total_tricks} of {round.tricks}</Text>
          <Text style={[styles.topline, styles.red]}>Dealer [{this._getDealerName()}] {this._getDealerMessage()}</Text>
        </View>
      )
    }

    const round = this.state.rounds[this.state.current_round_index];

    const bidding_rows = <PlayerRows round={round} field='bid'
            onLongPress={ (player, fld) => this._clearValue(player,fld) }
            onLeftPress={ (player, fld) => this._changeValue(player,fld,-1) }
            onRightPress={ (player, fld) => this._changeValue(player,fld,+1) } /> 

    const scoring_rows = <PlayerRows round={round} field='tricks'
        onLongPress={ (player, fld) => this._clearValue(player,fld) }
        onLeftPress={ (player, fld) => this._changeValue(player,fld,-1, round.tricks) }
        onRightPress={ (player, fld) => this._changeValue(player,fld,+1, round.tricks) } /> 

    render_rows = () => { return (this.state.stage == BIDDING) ? bidding_rows : scoring_rows; }

    return(
      <View style={{ paddingTop:40 }}>
        {sample_header}
        {info_bar()}
        {render_rows()}
        {game_buttons()}
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topline: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  bottomButtonStyle: {
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  instructions: {
    paddingTop: 0,
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
