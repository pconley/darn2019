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
      stage: 'Bidding',
      isLoading: true,
      total_bid: 0,
      hand_size: 5,
      counters: [
        {id:1, bid:0, name:'pat'},
        {id:2, bid:0, name:'mj'},
        {id:3, bid:0, name:'claire'},
        {id:4, bid:0, name:'ted'},
        {id:5, bid:0, name:'tim'},
      ]
    };
  }

  _setbid = (counter, newval) => {
    const changed = update(counter,{bid: {$set: newval}})
    const index = this.state.counters.findIndex( c => c.id === counter.id );
    const counters = update(this.state.counters, {[index]: { $set: changed }})
    const total_bid = counters.reduce((sum,x) => sum+x.bid, 0 )
    this.setState({ total_bid: total_bid, counters: counters });
  }

  _handleIncrement = (counter) => {
    const newval = counter.bid+1
    this._setbid(counter,newval)
  }

  _handleDecrement = (counter) => {
    const newval = Math.max(0,counter.bid-1)
    this._setbid(counter,newval)
  }

  _clearbid = (counter) => {
    if (this.state.count === 0) return;
    Alert.alert('You reset the counter!')
    this._setbid(counter,0)
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

    const sample_header =
      <Header leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Oh Darn!', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      ></Header>

    const sample_buttons = 
      <View key='buttons' style={{height: 100, flex: 1, flexDirection: 'row' }}>
        <Button title='Red Refresh'
            icon={{name: 'cached'}}
            buttonStyle={styles.bottomButtonStyle}
            backgroundColor='red'
        />
        <Button
          title="Loading" loading 
          buttonStyle={styles.bottomButtonStyle}
          backgroundColor="rgba(92, 99,216, 1)"
        />
      </View>

    var player_rows = 
        <View style={{paddingTop:20}}>
          <FlatList data={this.state.counters}
              renderItem={({item}) => 
                <View key={item.id} style={{height: 60, flex: 1, flexDirection: 'row' }}>
                  <Button title={String(item.bid)} buttonStyle={styles.bidButtonStyle} />
                  <Button title='<'
                          onPress={() => this._handleDecrement(item)} 
                          onLongPress={() => this._clearbid(item)}
                          buttonStyle={styles.counterButtonStyle}
                      />
                  <Button title='>' 
                          onPress={() => this._handleIncrement(item)} 
                          onLongPress={() => this._clearbid(item)}
                          buttonStyle={styles.counterButtonStyle}
                      />
                  <Text>{item.name}</Text>
                </View>
              }
              keyExtractor={(item, index) => String(item.id)}
          ></FlatList>
        </View>

    return(
      <View style={{ paddingTop:40 }}>
        {sample_header}
        <Text style={styles.sectionHeader}>Stage: {this.state.stage}</Text>
        <Text style={styles.sectionHeader}>Total Bid: {this.state.total_bid} of {this.state.hand_size}</Text>
        {player_rows}
        {sample_buttons}
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
  bidButtonStyle: {
    // backgroundColor: 'grey',
    width: 45,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  bottomButtonStyle: {
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  counterButtonStyle: {
    backgroundColor: "rgba(92, 99, 216, 1)",
    margin: 0,
    width: 40,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 15
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

