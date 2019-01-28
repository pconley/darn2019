import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

// import { Provider } from 'react-redux'
// import ProfileStore from './ProfileStore'

export default class ProfileScreen extends Component {
    static navigationOptions = {
      title: 'Profile',
    };
    render() {
      console.log("render profile screen. props...", this.props);
      const {navigate} = this.props.navigation;
      return (
        // <Provider store={ProfileStore}>
        <View>
        <Text>Name: {this.props.name}</Text>
        <Button
          title="Go to Details"
          onPress={() => navigate('Details', {name: 'Jane'})}
        />
        </View>
        // </Provider>
      );
    }
  }

