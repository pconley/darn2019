import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

import { Provider } from 'react-redux'

import Counter from '../src/Counter';
import store from '../src/index'

export default class ProfileScreen extends Component {
    static navigationOptions = {
      title: 'Profile',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Provider store={store}>
        <Counter />
        <Button
          title="Go to Details"
          onPress={() => navigate('Details', {name: 'Jane'})}
        />
        </Provider>
      );
    }
  }

