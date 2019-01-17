import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };


    render() {
        return (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
              title="Start Gaming Session"
              onPress={() => this.props.navigation.navigate('Group')}
            />
            {/* <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('Details')}
            />
            <Button
                title="Go to Profile"
                onPress={() => this.props.navigation.navigate('Profile', {name: 'Jane'})}
            /> */}
          </View>
        );
    }
}