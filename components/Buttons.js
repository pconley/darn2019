import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const BiddingButton = (props) => { return(
    <View style={styles.buttonContainer}>
    <Button title="<< Bidding"
      onPress={() => {
        props.onSetStage("Bidding")    // changes the view
        props.onChangeStage("Bidding") // changes the store
      }}
      titleStyle={{ fontWeight: "700" }}
      buttonStyle={styles.button} />
    </View>
)}
  
export const ReviewButton = (props) => { return (
    <View style={styles.buttonContainer}>
        <Button title="Review >>"
              onPress={() => {
                props.onSetStage("Reviewing")    // changes the view
                props.onChangeStage("Reviewing") // changes the store
              }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={styles.button}
            /> 
    </View>
)}

export const PrevRoundButton = (props) => { return (
    <View style={styles.buttonContainer}>
    <Button title="<< Prev Round"
        onPress={() => {
            props.onSetStage("Reviewing") // changes the view
            props.onChangeRound(-1)       // changes the store
        }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={styles.button}
        containerStyle={{ marginTop: 20 }}
    />
    </View>
)}

export const NextRoundButton = (props) => { return (
    <View style={styles.buttonContainer}>
    <Button title="Next Round >>"
        onPress={() => {
            props.onSetStage("Reviewing") // changes the view
            props.onChangeRound(+1)       // changes the store
        }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={styles.button}
        containerStyle={{ marginTop: 20 }}
    />
    </View>
)}

export const ScoringButton = (props) => {     
    return (
    <View style={styles.buttonContainer}>
    <Button title="Scoring"
    onPress={() => {
        props.onSetStage("Scoring");
        props.calcRoundScores(props.round_index);
        props.onChangeStage("Scoring");
    }}
    titleStyle={{ fontWeight: "700" }}
    buttonStyle={styles.button}
    containerStyle={{ marginTop: 20 }}
    />
    </View>
)}

export const FlexedButtons = (props, left, right) => { return (
    <View style={{height: 60, backgroundColor: 'gray'}}>
    <View style={styles.pair_container}>
        {left(props)}
        {right(props)}
    </View>
    </View>
)};

const styles = StyleSheet.create({
    pair_container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      flex: 1,
      height: 50,
      borderWidth: 2, borderColor: 'cyan'
    },
    button : {
      width: 150,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    }
});
  