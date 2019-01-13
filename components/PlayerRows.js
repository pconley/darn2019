import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native';

export default class PlayerRows extends Component {

    render_row = ({item}) => {

        console.log(item);
        const {id, bid, tricks, score} = item;
        const {round, field} = this.props;
        const {stage, players, dealer_id} = round;
        const dealer = players.find( c => c.id === dealer_id );
        const dealer_color = (stage === "Scoring") ? "red" : "blue";
        const textColor = id === dealer.id ? dealer_color : "black";

        const tricksText = String(tricks)+"/"+String(bid);
        const valueText = (stage === "Scoring") ? tricksText : String(bid);
        const scoreText = (stage === "Scoring") ? "S: "+score : "";

        return (
            <View key={id} style={styles.playerRow}>
              <Button title='<'
                      onPress={() => this.props.onLeftPress(item, field)} 
                      onLongPress={() => this.props.onLongPress(item, field)}
                      buttonStyle={styles.counterButtonStyle}
                      containerViewStyle={{ marginLeft: 5, marginRight: 0 }}
                  />
              <Button title={valueText} 
                  buttonStyle={styles.buttonStyle} 
                  containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
              />
              <Button title='>' 
                      onPress={() => this.props.onRightPress(item, field)} 
                      onLongPress={() => this.props.onLongPress(item, field)}
                      buttonStyle={styles.counterButtonStyle}
                      containerViewStyle={{ marginLeft: 0, marginRight: 10 }}
                  />
              <Text style={[styles.playerName, {color: textColor, width:120}]}>{item.name}</Text>
              <Text>{scoreText}</Text>
            </View>
        )
    }

  render() {
    const {round} = this.props;
    const {stage, players} = round;
    return (
        <View style={{paddingTop:20}}>
          <FlatList data={players}
              renderItem={this.render_row}
              extraData={round} // to force refresh!!!
              keyExtractor={(item, index) => String(item.id)}
          ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    playerRow: {height: 60, flex: 1, flexDirection: 'row' },
    playerName: { fontWeight: 'bold', fontSize: 30 },
    xbuttonStyle: {
      backgroundColor: "rgba(92, 99, 216, 1)",
      margin: 0,
      width: 50,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 15
    },  
    buttonStyle: {
        // backgroundColor: 'grey',
        width: 60,
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
      },
  })