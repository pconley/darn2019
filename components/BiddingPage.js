import React from 'react';
import { Text, View } from 'react-native';


import PlayerRows from './PlayerRows'
import AbstractPage from './AbstractPage';

export default class BiddingPage extends AbstractPage {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };
  }

  render_body = () => { return (
    <View>
        <Text>Bidding Page</Text>
        <PlayerRows round={this.props.round} field='bid'
            onLongPress={ (player) => this.props.onChangeValue(player,0) }
            onLeftPress={ (player) => this.props.onChangeValue(player,-1) }
            onRightPress={ (player) => this.props.onChangeValue(player,+1) }
        /> 
    </View>
  )}
  
}