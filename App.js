/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { TextInput, Alert, Button, ScrollView } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import Blink from './components/Blink'
import CounterButton from './components/CounterButton'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true
    };
    // this._onPressButton = this._onPressButton.bind(this);


  }
  _onPressButton() {
    Alert.alert('You tapped the button!');
    // this.setState({ counter: counter});
  }
  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    var titles = [];
    this.state.dataSource.forEach(function(el) {
      titles.push(
        <View key={el.id} style={{height: 30, flex: 1, flexDirection: 'row' }}>
          <CounterButton />
          <Text>{el.title}</Text>
        </View>
      )
      console.log(el);
    });

    console.log(this.state.dataSource)

    // _keyExtractor = (item, index) => item.id;

    return(
      <View style={{flex: 1, paddingTop:200, flexDirection: 'column'}}>
        {titles}
      </View>

      // <FlatList data={this.state.dataSource} style={{paddingTop: 200}}
      //     renderItem={({item}) => 
      //         <Text key={item.id}>{item.id} == {item.title}</Text>
      //     }
      // ></FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 200
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

// const styles2 = StyleSheet.create({
//   container: {
//    flex: 1,
//    justifyContent: 'center',
//    backgroundColor : "grey"
//   },
//   buttonContainer: {
//     margin: 20,
//     backgroundColor : "white"
//   },
//   button: {
//     margin: 20,
//     backgroundColor : "white"
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor : "white"
//   }
// });

// const xstyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   big: {
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   blue: {
//     color: 'blue',
//   },
//   red: {
//     color: 'red',
//   },
//   buttonContainer: {
//     margin: 20
//   },
//   alternativeLayoutButtonContainer: {
//     margin: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   }
// });

