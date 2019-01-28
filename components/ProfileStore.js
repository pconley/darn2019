import { createStore } from 'redux';

import update from 'immutability-helper';

const initialState = { 
    name: "patrick",
    movies: []
};

const reducer = (state = initialState, action) => {
    console.log("profile reducer: action...",action);
    switch(action.type) {
        // case "CHANGE_FIELD":
        //     // changes the BID or TRICKS for a given player (in round)
        //     const { field, player, value } = action;
        //     const x_round = updateRound(round, player, field, value );
        //     const x_rounds = update(state.rounds,{[round_index]: {$set: x_round}})
        //     const x_state = update(state,{ rounds: {$set: x_rounds} });
        //     return x_state
        //   break;
        // case "CHANGE_STAGE":
        //     // changes the round stage between BIDDING and SCORING (in round)
        //     const s_round = update(round,{ stage: {$set: action.value} });;
        //     const s_rounds = update(state.rounds,{[round_index]: {$set: s_round}})
        //     const s_state = update(state,{ rounds: {$set: s_rounds} });
        //     console.log("changed stage state",s_state);
        //     return s_state;
        //     break;
        default:
          return state;
      } 
}

const profileStore = createStore(reducer);

export default profileStore;