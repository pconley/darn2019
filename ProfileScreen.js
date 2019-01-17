import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class ProfileScreen extends Component {
    static navigationOptions = {
      title: 'Profile',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Button
          title="Go Home"
          onPress={() => navigate('Home', {name: 'Jane'})}
        />
      );
    }
  }