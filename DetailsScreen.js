import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class DetailsScreen extends Component {
    static navigationOptions = {
      title: 'Details',
    };

    render() {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
              title="Go to Details... again"
              onPress={() => this.props.navigation.push('Details')}
            />
            <Button
              title="Go to Profile"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        );
      }
}