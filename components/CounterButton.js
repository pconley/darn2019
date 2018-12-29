import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text } from 'react-native';

import { TouchableHighlight } from 'react-native';

export default class CounterButton extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this._onPressButton = this._onPressButton.bind(this);
    this._onLongPressButton = this._onLongPressButton.bind(this);
  }

  _onPressButton() {
    // Alert.alert('You tapped the counter button!')
    const count = this.state.count + 1;
    this.setState({ count: count });
  }
  _onLongPressButton() {
    Alert.alert('You reset the counter!')
    this.setState({ count: 0 });
  }

  render() {
    return (
<TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
  <View style={styles.button}>
    <Text style={styles.buttonText}>{this.state.count}</Text>
  </View>
</TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: 100,
        backgroundColor : "grey",
    },
    buttonText: { color: "black" }
  })