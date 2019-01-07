import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Button } from 'react-native-elements'

export default class CounterButton extends Component {
  render() {
    const { counter } = this.props;
    return (
      <View style={{height: 60, flex: 1, flexDirection: 'row' }}>
        <Text>{counter.value}</Text>
        <Button title='<'
            key={100+counter.id} 
            onPress={() => this.props.onDecrement(counter)} 
            onLongPress={() => this.props.onLongPress(counter)}
            buttonStyle={styles.buttonStyle}
        />
        <Button title='>' 
            key={counter.id} 
            onPress={() => this.props.onIncrement(counter)} 
            onLongPress={() => this.props.onLongPress(counter)}
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