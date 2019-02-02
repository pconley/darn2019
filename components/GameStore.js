import { createStore } from 'redux';

import update from 'immutability-helper';

import {saveState, loadState} from './Storage';

import {SAVE_STATE, saveStateAction} from "./Actions"

// GAME Stage
export const FORMING  = "Forming";
export const STARTING = "Starting";
export const PLAYING  = "Playing";
// ROUND Stage
export const BIDDING = "Bidding";
export const SCORING = "Scoring";

const calcScore = (bid, tricks) => { return (bid === tricks) ? bid*bid+5 : -Math.max(bid,tricks); };

const initialState = { 
    // count: 8,  // example 
    // stage: FORMING,
    viewing_round_index: 0,
    current_round_index: 0,
    tricks: [7, 3, 1, 2, 4],
    rounds: [
      { tricks: 5,
        total_bid: 0,
        total_tricks: 0, 
        dealer_id: 3,
        stage: BIDDING,
        players: [
          {id:1, bid:0, tricks:0, score: calcScore(0,0), name:'Rat'},
          {id:2, bid:0, tricks:0, score: calcScore(0,0), name:'mj'},
          {id:3, bid:0, tricks:0, score: calcScore(0,0), name:'claire'},
          {id:4, bid:0, tricks:0, score: calcScore(0,0), name:'ted'},
          {id:5, bid:0, tricks:0, score: calcScore(0,0), name:'tim'},
        ]
      }
    ],
};

const updatePlayer = (player,field,delta,maxval=52) => {
    console.log("game store: change value ", delta);
    // WARNING: Zero means set to zero; others are increments
    const adjval = (delta === 0) ? -player[field] : delta;
    const newval = Math.min(maxval,Math.max(0,player[field]+adjval)); 
    const x_player = update(player,{[field]: {$set: newval}});
    // now x_player has the bid OR tricks set, so calc the new score
    const {bid, tricks} = x_player;
    const x_score = calcScore(bid, tricks);
    const z_player = update(x_player,{score: {$set: x_score}});
    return z_player;
}

const updateRound = (round, player) => {
    const player_index = round.players.findIndex( c => c.id === player.id );
    const x_players = update(round.players, {[player_index]: { $set: player }});
    const total_bid = x_players.reduce((sum,x) => sum+x.bid, 0 );
    const total_tricks = x_players.reduce((sum,x) => sum+x.trick, 0 );
    const x_round = update(round,{ 
        total_bid: {$set: total_bid}, 
        total_tricks: {$set: total_tricks}, 
        players: {$set: x_players} });
    return x_round
}

const reducer = (state = initialState, action) => {
    console.log("game reducer: action...",action);
    const { current_round_index : round_index } = state;
    const round = state.rounds[round_index];
    switch(action.type) {
        case SAVE_STATE:
            // save the entire state as in after a load from storage
            return action.payload;
        case "CHANGE_FIELD":
            // changes the BID or TRICKS for a given player (in round)
            const { field, player, value } = action;
            const x_player = updatePlayer(player, field, value);
            const x_round  = updateRound(round, x_player);
            const x_rounds = update(state.rounds,{[round_index]: {$set: x_round}})
            const x_state  = update(state,{ rounds: {$set: x_rounds} });
            return x_state
          break;
        case "CHANGE_STAGE":
            // changes the round stage between BIDDING and SCORING (in round)
            const s_round = update(round,{ stage: {$set: action.value} });;
            const s_rounds = update(state.rounds,{[round_index]: {$set: s_round}})
            const s_state = update(state,{ rounds: {$set: s_rounds} });
            console.log("changed stage state",s_state);
            return s_state;
            break;
        default:
          return state;
      } 
}

const gameStore = createStore(reducer);

loadState( (data) => {
    console.log("game store: loaded data into state...", data);
    gameStore.dispatch(saveStateAction(data))
});

gameStore.subscribe( () => {
    console.log("game state: saving");
    saveState(gameStore.getState());

})

export default gameStore;