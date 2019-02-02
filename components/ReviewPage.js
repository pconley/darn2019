import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import InfoBar from './InfoBar'
import PlayerRows from './PlayerRows'

function ReviewPage(props){
  const { rounds } = props
  console.log("review page: rounds...",rounds);
  return <View>
            <Text>Review Game:</Text>

            <FlatList data={rounds}
                renderItem={({item}) => <Text>tricks = {item.tricks}</Text>}
                //extraData={round} // to force refresh!!!
                keyExtractor={(item, index) => String(item.id)}
            ></FlatList>

            <Button title="Back to Scoring" loading
              onPress={() => {
                props.onSetStage("Scoring")    // changes the view
                props.onChangeStage("Scoring") // changes the store
              }}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />


            <Button title="Next Round"
              onPress={() => {
                props.onIncrementRound("Scoring")
              }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={button_style}
              containerStyle={{ marginTop: 20 }}
            />


          </View>
}

function mapStateToProps(state){
  return { rounds: state.rounds }
}

function mapDispatchToProps(dispatch){
  return { 
    onChangeField: (player, field, value) => {
      console.log("onChangeField: ", player, field, value);
      const action = { type: "CHANGE_FIELD", field: field, player: player, value: value }
      dispatch(action);
    },
    onChangeStage: (value) => {
      console.log("onChangeStage: ", value);
      const action = { type: "CHANGE_STAGE", value: value }
      dispatch(action);
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);

const button_style = {
  backgroundColor: "green",
  width: 200,
  height: 45,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 5
}
