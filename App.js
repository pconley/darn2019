/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import update from 'immutability-helper';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { TextInput, Alert, ScrollView } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import update from 'immutability-helper';

import { Button, Header } from 'react-native-elements'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'Bidding',
      isLoading: true,
      total_bid: 0,
      hand_size: 7,
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
    const changed = update(player,{bid: {$set: value}})
    const index = this.state.players.findIndex( c => c.id === player.id );
    const players = update(this.state.players, {[index]: { $set: changed }})
    const total_bid = players.reduce((sum,x) => sum+x.bid, 0 )
    this.setState({ total_bid: total_bid, players: players });
  }

  _handleIncrement = (player) => {
    const newval = player.bid+1
    this._setbid(player,newval)
  }

  _handleDecrement = (player) => {
    const newval = Math.max(0,player.bid-1)
    this._setbid(player,newval)
  }

  _clearbid = (player) => {
    if (player.bid === 0) return;
    Alert.alert('You reset the bid to zero!')
    this._setbid(player,0)
  }

  _getDealerMessage = () => { 
    const bad = this.state.hand_size - this.state.total_bid;
    if( bad < 0 ) return "can bid anything."
    return "can't bid "+bad;
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

    const sample_header =
      <Header leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Oh Darn!', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      ></Header>

    const sample_buttons = 
      <View key='buttons' style={{height: 100, flex: 1, flexDirection: 'row' }}>
        <Button title='Red Refresh'
            icon={{name: 'cached'}}
            buttonStyle={styles.bottomButtonStyle}
            backgroundColor='red'
        />
        <Button
          title="Loading" loading 
          buttonStyle={styles.bottomButtonStyle}
          backgroundColor="rgba(92, 99,216, 1)"
        />
      </View>

    var player_rows = 
        <View style={{paddingTop:20}}>
          <FlatList data={this.state.players}
              renderItem={({item}) => 

                <View key={item.id} style={styles.playerRow}>
                  <Button title={String(item.bid)} buttonStyle={styles.bidButtonStyle} />
                  <Button title='<'
                          onPress={() => this._handleDecrement(item)} 
                          onLongPress={() => this._clearbid(item)}
                          buttonStyle={styles.counterButtonStyle}
                          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                      />
                  <Button title='>' 
                          onPress={() => this._handleIncrement(item)} 
                          onLongPress={() => this._clearbid(item)}
                          buttonStyle={styles.counterButtonStyle}
                          containerViewStyle={{ marginLeft: 5, marginRight: 10 }}
                      />
                  <Text style={{flex: 4}}>{item.name}</Text>
                </View>
              }
              keyExtractor={(item, index) => String(item.id)}
          ></FlatList>
        </View>

    return(
      <View style={{ paddingTop:40 }}>
        {sample_header}
        <Text style={styles.topline}>Players: {this.state.players.length}</Text>
        <Text style={styles.topline}>Stage: {this.state.stage}</Text>
        <Text style={styles.topline}>Total Bid: {this.state.total_bid} of {this.state.hand_size}</Text>
        <Text style={styles.topline}>Dealer {this._getDealerMessage()}</Text>
        {player_rows}
        {sample_buttons}
        <Text style={{paddingTop: 60}}>{instructions}</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  playerRow: {height: 60, flex: 1, flexDirection: 'row' },
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
})

// const styles2 = StyleSheet.create({
//   container: {
//    flex: 1,
//    justifyContent: 'center',
//    backgroundColor : "grey"
//   },
//   buttonContainer: {
//     margin: 20,
//     backgroundColor : "white"
//   },
//   button: {
//     margin: 20,
//     backgroundColor : "white"
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor : "white"
//   }
// });

// const xstyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   big: {
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   blue: {
//     color: 'blue',
//   },
//   red: {
//     color: 'red',
//   },
//   buttonContainer: {
//     margin: 20
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   }
// });

