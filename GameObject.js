
import update from 'immutability-helper';

export const BIDDING = "Bidding";
export const SCORING = "Scoring";

import Round from './Round';

export default class GameObject {

  constructor() {
    this.players = []
// 5 tricks; dealer is #3
    const first_round = new Round(5,3,this.players);
    this._rounds = [first_round]
  }

  get rounds() {
    return this._rounds;
  }

  //////////////////////////////

  _calcScore = (bid, tricks) => { return (bid === tricks) ? bid*bid+5 : -Math.max(bid,tricks); };

  _setValue = (player, field, value) => {
    const total_field = 'total_'+field;
    const s_round = this.state.rounds[this.state.current_round_index];
    const player_index = s_round.players.findIndex( c => c.id === player.id );
    const x_player = update(player,{[field]: {$set: value}, score: {$set: x_score}});
    const {bid, tricks} = x_player;
    const x_score = this._calcScore(bid, tricks);
    const z_player = update(x_player,{score: {$set: x_score}});
    const x_players = update(s_round.players, {[player_index]: { $set: z_player }});
    const x_total = x_players.reduce((sum,x) => sum+x[field], 0 );
    const x_round = update(s_round,{ [total_field]: {$set: x_total}, players: {$set: x_players} });
    const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
    this.setState({ rounds: x_rounds });
  }

  // _setGameStage = (stage) => {
  //   if( stage === PLAYING ){
  //     // we are starting a new game, so (re)init the game state based on the 
  //     // values in the setup object 
  //     const tricks = this.state.tricks;
  //     // const players = this.state.players.map((p) => ({name:p.name, id:p.id, bid:0, tricks:0, score:5 }))
      
  //     const players = this.state.players.reduce((acc, player) => {
  //       if (player.checked) {
  //         acc.push({name:player.name, id:player.id, bid:0, tricks:0, score:5 });
  //       }
  //       return acc;
  //     }, []);
      
  //     const first_round = { tricks: tricks[0], total_bid: 0, total_tricks: 0, 
  //         dealer_id: 3, stage: BIDDING,
  //         players: players
  //     };
  //     const rounds = [first_round];
  //     this.setState({ stage: stage, current_round_index: 0, rounds: rounds });
  //   } else {
  //     this.setState({ stage: stage });
  //   }
  // }

  _setRoundStage = (stage) => {
    console.log("set stage: "+stage);
    const s_round = this.state.rounds[this.state.current_round_index];
    const x_round = update(s_round,{ stage: {$set: stage} });
    const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
    this.setState({ rounds: x_rounds });
  }

  _changeValue = (player,field,delta,maxval=52) => {
    console.log("app: change value ", delta);
    // WARNING: Zero means set to zero; others are increments
    const adjval = (delta === 0) ? -player[field] : delta;
    const newval = Math.min(maxval,Math.max(0,player[field]+adjval)); 
    this._setValue(player,field,newval);
  }

  _clearValue = (player,field) => {
    if (player.bid === 0) return;
    this._setValue(player,field,0);
  }

  _getDealerMessage = () => { 
    const round = this.state.rounds[this.state.current_round_index];
    const dealer = round.players.find( c => c.id === round.dealer_id );
    const bad = round.tricks - round.total_bid + dealer.bid;
    if( bad < 0 ) return "can bid anything."
    return "can't bid "+bad;
  }

  _getDealerName = () => {
    const round = this.state.rounds[this.state.current_round_index];
    const index = round.players.findIndex( c => c.id === round.dealer_id );
    return this.state.players[index].name;
  }
}