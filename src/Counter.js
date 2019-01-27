import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';

import { connect } from 'react-redux';

function Counter(props){
    return <View>
    <Text>Counter: {props.count}</Text>
    <Button title="press me"
     onPress={props.onIncrement}/>
    </View>
}

function mapStateToProps(state){
    console.log("counter: MSTP: state...", state);
    return { count: state.count }
}

function mapDispatchToProps(dispatch){
    return { 
        onIncrement: () => {
            console.log("onIncrement");
            const action = { type: "INCREMENT" }
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);