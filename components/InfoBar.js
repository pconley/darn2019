import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class InfoBar extends Component {
  constructor(props) {
    super(props);
    this.state = { example: true };
  }

  render() {
    const {round_index, round} = this.props;
    const {total_bid, total_tricks, players, stage, tricks } = round;
    // console.log("InfoBar: round...",round);
    const bid_status = (total_bid > tricks) ? "(Overbid)" : ""
    const take_status = (total_tricks > tricks) ? "Error!!!" : ""
    return (
        <View>
          <Text style={[styles.header, styles.info_text]}>InfoBar</Text>
          <Text style={styles.info_text}>Stage: {stage}</Text>
          <Text style={styles.info_text}>Round: {round_index}</Text>
          <Text style={styles.info_text}>Players: {players.length}</Text>
          <Text style={styles.info_text}>Bids: {total_bid} of {tricks} {bid_status}</Text>
          <Text style={styles.info_text}>Tricks: {total_tricks} of {tricks}</Text>
        </View>    
    );
  }
}

const styles = StyleSheet.create({
    header: { textAlign: 'center' },
    info_text: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'lightgray',
    }
  })