import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Header } from 'react-native-elements'

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class BiddingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };
  }
  
  render() {
    const sample_header = <Header leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Bidding', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />

    const bidding_rows = <PlayerRows round={this.props.round} field='bid'
            onLongPress={ (player) => this.props.onChangeValue(player,0) }
            onLeftPress={ (player) => this.props.onChangeValue(player,-1) }
            onRightPress={ (player) => this.props.onChangeValue(player,+1) }
        /> 

    return(
        <View style={{ paddingTop:40 }}>
        {sample_header}
        <InfoBar round={this.props.round}/>
        {bidding_rows}
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
  