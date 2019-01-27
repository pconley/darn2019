import React, {Component} from 'react';
import { Alert, Text, View, Button, FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements'
import update from 'immutability-helper';

export default class PlayersScreen extends Component {
    static navigationOptions = {
        title: 'Players Screen',
      };
  constructor(props) {
    super(props);
    this.state = { 
        players: this.props.navigation.getParam('all_players'),
    };
  }

  _flipCheck = (player) => {
    const player_index = this.state.players.findIndex( c => c.id === player.id );
    const x_player = update(player,{checked: {$set: !player.checked}});
    const x_players = update(this.state.players, {[player_index]: { $set: x_player }});
    this.setState({ players: x_players });
  }

  handle_change(player, field, delta){
    console.log("player screen: handle change", field, delta, player);
  }

  handle_save = () => {
    const selected_players = this.state.players.reduce((acc, player) => {
      if (player.checked) {
        acc.push({name:player.name, id:player.id, bid:0, tricks:0, score:5 });
      }
      return acc;
    }, []);
    const saver = this.props.navigation.getParam('save_players')
    saver(selected_players);
    this.props.navigation.goBack();
  }

  render = () => { 
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const game = this.props.navigation.getParam('game', {})

    return (
        <View style={{paddingTop:50}}>
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
            title={"Save Players"}
            onPress={() => this.handle_save()}
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