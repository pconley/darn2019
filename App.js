/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import update from 'immutability-helper';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { TextInput, Alert, ScrollView } from 'react-native';
import { FlatList, SectionList, ActivityIndicator } from 'react-native';

import update from 'immutability-helper';

import { Button, Header } from 'react-native-elements'

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
      isLoading: true,
      total: 10,
      counters: [
        {id:1, value:0, title:'pat'},
        {id:2, value:0, title:'mj'},
        {id:3, value:0, title:'claire'},
        {id:4, value:0, title:'ted'},
        {id:5, value:0, title:'tim'},
      ]
    };
  }

  _setValue = (counter, newval) => {
    const changed = update(counter,{value: {$set: newval}})
    const index = this.state.counters.findIndex( c => c.id === counter.id );
    const counters = update(this.state.counters, {[index]: { $set: changed }})
    const total = counters.reduce((sum,x) => sum+x.value, 0 )
    this.setState({ total: total, counters: counters });
  }

  _handleIncrement = (counter) => {
    const newval = counter.value+1
    this._setValue(counter,newval)
  }

  _handleDecrement = (counter) => {
    const newval = Math.max(0,counter.value-1)
    this._setValue(counter,newval)
  }

  _clearValue = (counter) => {
    if (this.state.count === 0) return;
    Alert.alert('You reset the counter!')
    this._setValue(counter,0)
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

    var titles = 
        <View style={{paddingTop:80}}>
          <FlatList data={this.state.counters}
              renderItem={({item}) => 
                <View key={item.id} style={{height: 60, flex: 1, flexDirection: 'row' }}>
                <CounterButton counter={item}
                  onIncrement={this._handleIncrement} 
                  onDecrement={this._handleDecrement} 
                  onLongPress={this._clearValue}
                />
                <Text key={item.id}>{item.title}</Text>
                </View>
              }
              keyExtractor={(item, index) => String(item.id)}
          ></FlatList>
        </View>

    console.log(this.state.dataSource)

    return(
      <View style={{ paddingTop:100 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Oh Darn!', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View key='buttons' style={{height: 100, flex: 1, flexDirection: 'row' }}>
            <Button title='Red Refresh'
                icon={{name: 'cached'}}
                buttonStyle={styles.buttonStyle}
                backgroundColor='red'
            />
            <Button
              title="Loading" loading 
              buttonStyle={styles.buttonStyle}
              backgroundColor="rgba(92, 99,216, 1)"
            />
        </View>
        <Text>{this.state.total}</Text>
        {titles}
      </View>

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
  buttonStyle: {
    // backgroundColor: "rgba(92, 99,216, 1)",
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
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

