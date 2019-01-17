import React, {Component} from 'react';
import { Alert, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'

import update from 'immutability-helper';

import AbstractPage from './AbstractPage';

export default class PlayersScreen extends Component {
    static navigationOptions = {
        title: 'Players Screen',
      };
  constructor(props) {
    super(props);
    this.state = { 
        xplayers: this.props.players,
        players: [
            {id:1, checked: false, name:'pat'},
            {id:2, checked: false, name:'mj'},
            {id:3, checked: true, name:'claire'},
            {id:4, checked: false, name:'ted'},
            {id:5, checked: false, name:'tim'},
            {id:6, checked: false, name:'jim'},
            {id:7, checked: false, name:'jackie'},
            {id:8, checked: false, name:'cheryl'},
            {id:9, checked: false, name:'dani'},
            {id:10, checked: false, name:'john'},
          ]
    };
  }

  _flipCheck = (player) => {
    const player_index = this.state.players.findIndex( c => c.id === player.id );
    const x_player = update(player,{checked: {$set: !player.checked}});
    const x_players = update(this.state.players, {[player_index]: { $set: x_player }});
    this.setState({ players: x_players });
  }

  render = () => { 
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

    const selected_players = this.state.players.reduce((acc, player) => {
      if (player.checked) {
        acc.push({name:player.name, id:player.id, bid:0, tricks:0, score:5 });
      }
      return acc;
    }, []);

    return (
        <View style={{paddingTop:10}}>
        <Text>Who is playing?</Text>
        <FlatList style={{paddingTop:20}}
            data={this.state.players}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={({item: player}) => 
                <CheckBox
                    title={player.name}
                    checked={player.checked}
                    onPress={() => this._flipCheck(player)}
                />    
            }
        ></FlatList>
        <Button
            title="Next"
            onPress={() => this.props.navigation.navigate('Game', {players: selected_players})}
        />

{/* this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            }); */}
            
        {/* <Button title="Next" loading 
                onPress={() => this.props.onNext(this.state.players)}
                buttonStyle={styles.bottomButtonStyle}
                backgroundColor="rgba(92, 99,216, 1)"
            /> */}

        </View>  
)}
  
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