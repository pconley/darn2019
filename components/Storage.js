import {AsyncStorage} from 'react-native';

export const loadState = async (saver) => {
    try {
        const serializedState = await AsyncStorage.getItem('state');
        if (serializedState === null) return undefined;
        const state = JSON.parse(serializedState)
        console.log("load:",saver,state);
        saver(state);
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export const saveState = async (state) => {
    try {
        // console.log("saving");
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('state', serializedState);
    } catch (err){
        console.log(err);
    }
}
