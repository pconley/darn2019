import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Header } from 'react-native-elements'

import InfoBar from './InfoBar'

export default class AbstractPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true };
  }

  render_body = () => {
    // The Concrete Pages override this to add a body to the page
    return (<Text style={{paddingTop:200}}>Abstract Page</Text>);
  }

  render() { 

    const instructions = Platform.select({
        ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
        android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
    });

    const sample_header = <Header leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Oh Darn!', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
    />

    // TODO: each page proably needs its own navigation buttons (or actions)
    game_buttons = () => { return (
        <View key='buttons' style={{paddingTop:30, height: 100, flexDirection: 'row' }}>
            <Button title='Cancel Game'
                icon={{name: 'cached'}}
                onPress={() => this._setGameStage('Starting')}
                buttonStyle={styles.bottomButtonStyle}
                backgroundColor='red'
            />
            <Button title="Start Scoring" loading 
                // disabled={true}
                onPress={() => this.props.onChangeStage('Scoring')}
                buttonStyle={styles.bottomButtonStyle}
                backgroundColor="rgba(92, 99,216, 1)"
            />
        </View>
    )}

    return(
        <View style={{ paddingTop:40 }}>
            {sample_header}
            <InfoBar round={this.props.round}/>
            {this.render_body()}
            {game_buttons()}
            <Text style={styles.instructions}>{instructions}</Text>
        </View>
    );
 }

}

const styles = StyleSheet.create({
    topline: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'lightgray',
    },
    bottomButtonStyle: {
      width: 150,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    },
    instructions: {
      paddingTop: 0,
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    blue: {
      color: 'blue',
    },
    red: {
      color: 'red',
    },
  })
  