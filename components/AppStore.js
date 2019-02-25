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

const players = [
    {id:1, name:'Patrick'},
    {id:2, name:'MJ'},
    {id:3, name:'Claire'},
    {id:4, name:'ted'},
    {id:5, name:'tim'},
]

const createRound = (t, n, players) => {
    // create the Nth round in a game of players.  
    // this round will have t cards dealt (tricks)
    const index = n%players.length;
    // const zeroScore = calcScore(0,0)
    const ps = players.map((p) => { return(
        {id: p.id, name: p.name, bid: 0, tricks: 0, score: 0}
    )});
    return ({ 
        tricks: t,
        dealer_id: players[index].id,
        total_tricks: 0, total_bids: 0, 
        stage: BIDDING, players: ps 
    });
}

const createGame = (tricks) => {
    console.log("game store: createGame: tricks...", tricks);
    dealer_turn = 0;
    const rounds = tricks.map((t) => createRound(t, dealer_turn++, players))
    const state = { 
        tricks: tricks, 
        players: players,
        viewing_round_index: 0,
        current_round_index: 0, 
        rounds: rounds};

    return state;
}

const createInitialAppState = () => {
    const data = {
        stats: {
            games_played: 33,
        },
        profile: {
            name: "Pat Conley"
        },
        players: {
            recent: [],
            favorites: []
        },
        game: createGame([7, 3, 1, 2, 4])
    }
    return data;
}

const initialState = createInitialAppState();

const updatePlayer = (player,field,delta,maxval=52) => {
    console.log("AppStore: updatePlayer: change player value delta = ", delta);
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
    console.log("AppStore: updateRound: ", round, player);
    const player_index = round.players.findIndex( c => c.id === player.id );
    const x_players = update(round.players, {[player_index]: { $set: player }});
    const total_bid = x_players.reduce((sum,x) => sum+x.bid, 0 );
    const total_tricks = x_players.reduce((sum,x) => sum+x.tricks, 0 );
    const x_round = update(round,{ 
        total_bid: {$set: total_bid}, 
        total_tricks: {$set: total_tricks}, 
        players: {$set: x_players} });
    console.log("<<< round", x_round);
    return x_round
}

const reducer = (state = initialState, action) => {
    console.log("**** ", action.type);
    console.log("--- starting state...", state);
    console.log("--- action payload...", action.payload);

    // quick action so that the save does not get blocked by 
    // any changes to the state structure; like missing field
    if(action.type === SAVE_STATE) return action.payload;

    // on entry the state is the current state and the payload contains
    // the information needed to make any change.  the new changed state
    // is returned.

    const { game } = state;
    const { current_round_index, rounds } = game;
    const round = rounds[current_round_index];
    console.log("--- round...", round);
    switch(action.type) {
        case "CHANGE_FIELD":
            // changes the BID or TRICKS for a given player (in round)
            const { field, player, value } = action.payload;
            const x_player = updatePlayer(player, field, value);
            const x_round  = updateRound(round, x_player);
            const x_rounds = update(rounds,{[current_round_index]: {$set: x_round}})
            const x_game  = update(game,{ rounds: {$set: x_rounds} });
            const x_state = update(state, {game: {$set: x_game}} )
            console.log("<<<", x_state);
            return x_state
          break;
        case "CHANGE_STAGE":
            // changes the round stage between BIDDING and SCORING
            const { stage } =  action.payload;
            const s_round = update(round,{ stage: {$set: stage} });;
            const s_rounds = update(rounds,{[current_round_index]: {$set: s_round}})
            const s_game  = update(game,{ rounds: {$set: s_rounds} });
            const s_state = update(state, {game: {$set: s_game}} )
            console.log("<<<",s_state);
            return s_state;
            break;
        case "INCREMENT_ROUND":
            // const { value } = action.payload;
            const c_index = current_round_index + 1;
            const c_state = update(state,{ current_round_index: {$set: c_index}});
            console.log("<<<",c_state);
            return c_state;
            break;
        default:
          return state;
    } 
}

const appStore = createStore(reducer);

loadState( (data) => {
    console.log("AppStore: loaded data into state...", data);
    appStore.dispatch(saveStateAction(data))
});

export const initializeState = () => {
    console.log("AppStore: initialize state");
    appStore.dispatch(saveStateAction(initialState))
}

appStore.subscribe( () => {
    console.log("AppStore: saving");
    saveState(appStore.getState());

})

export default appStore;