import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = { example: true };
  }

  render() {
    const {round_index, round} = this.props;
    console.log("info bar: round...",round);
    return (
        <View>
          <Text style={styles.info_bar}>Tricks: {round.tricks}</Text>
          <Text style={styles.info_bar}>Players: {round.players.length}</Text>
          <Text style={styles.info_bar}>Round #{round_index} Stage: {round.stage}</Text>
          <Text style={styles.info_bar}>Total Bid: {round.total_bid} of {round.tricks}</Text>
          <Text style={styles.info_bar}>Tricks Taken: {round.total_tricks} of {round.tricks}</Text>
        </View>    
    );
  }
}

const styles = StyleSheet.create({
    info_bar: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'lightgray',
    }
  })