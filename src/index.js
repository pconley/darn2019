import { createStore } from 'redux';

const initialState = { count: 4 };

const reducer = (state = initialState, action) => {
    console.log("state reducer: action...",action);
    switch(action.type) {
        case "INCREMENT":
          // another way to do immutability
          return Object.assign({}, state, {count: state.count+1})
          break;
        case "OTHER":
          return state;
          break;
        default:
          return state;
      } 
}

const store = createStore(reducer);

export default store;