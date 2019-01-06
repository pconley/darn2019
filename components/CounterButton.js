import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text } from 'react-native';

import { TouchableHighlight } from 'react-native';

import { Button } from 'react-native-elements'


export default class CounterButton extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this._onPressIncrement = this._onPressIncrement.bind(this);
    // this._onLongPressButton = this._onLongPressButton.bind(this);
  }

  _onPressIncrement = () => {
    // Alert.alert('You tapped the counter button!')
    const count = this.state.count + 1;
    this.setState({ count: count });
  }
  _onPressDecrement = () => {
    // Alert.alert('You tapped the counter button!')
    const count = Math.max(0,this.state.count - 1);
    this.setState({ count: count });
  }
  _onLongPressButton = () => {
    if (this.state.count === 0) return;
    Alert.alert('You reset the counter!')
    this.setState({ count: 0 });
  }

  render() {
    return (
      <View style={{height: 60, flex: 1, flexDirection: 'row' }}>
        <Text>{this.state.count}</Text>
        <Button title='+' 
            key={this.props.id} 
            onPress={this._onPressIncrement} 
            onLongPress={this._onLongPressButton}
            buttonStyle={styles.buttonStyle}
        />
        <Button title='-'
            key={this.props.id} 
            onPress={this._onPressDecrement} 
            onLongPress={this._onLongPressButton}
            buttonStyle={styles.buttonStyle}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        width: 50,
        height: 20,
        backgroundColor : "grey",
    },
    buttonText: { color: "black" },
    buttonStyle: {
      backgroundColor: "rgba(92, 99, 216, 1)",
      margin: 0,
      width: 50,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 15
    }
  })