import update from 'immutability-helper';

export default class Round {

    constructor(tricks, dealer_id, players) {
        this.tricks = tricks;
        this.total_bid = 0;
        this.total_tricks = 0;
        this.dealer_id = dealer_id;
        this.stage = 'Bidding';
        this.players = players;
    }
  
    get dealerName() {
        const index = this.players.findIndex( c => c.id === this.dealer_id );
        return this.state.players[index].name;
    }

    _getDealerName = () => {
        const index = this.players.findIndex( c => c.id === this.dealer_id );
        return this.state.players[index].name;
    }
    
    _changeValue = (player,field,delta,maxval=52) => {
        console.log("round: change value "+field+" by ", delta);
        // WARNING: Zero means set to zero; others are increments
        const s_player = this.players.find( c => c.id === player.id );
        console.log("round: player",s_player);
        const adjval = (delta === 0) ? -s_player[field] : delta;
        const newval = Math.min(maxval,Math.max(0,s_player[field]+adjval)); 
        this._setValue(player,field,newval);
    }

    _setValue = (player, field, value) => {
        console.log("round: set value", field, value);
        console.log("round: set value. prior players...", this.players);

      const player_index = this.players.findIndex( c => c.id === player.id );
      const x_player = update(player,{[field]: {$set: value}});
      const {bid, tricks} = x_player; // new values for one or the other
      console.log("setValue results bid="+bid+" tricks="+tricks);
      const x_score = this._calcScore(bid, tricks);
      const z_player = update(x_player,{score: {$set: x_score}});
      this.players = update(this.players, {[player_index]: { $set: z_player }});
      console.log("round: set value. altered players...", this.players);
      // total is wrong!!!
    }

    _calcScore = (bid, tricks) => { return (bid === tricks) ? bid*bid+5 : -Math.max(bid,tricks); };


    ////////////////////////////

    _setGameStage = (stage) => {
      if( stage === PLAYING ){
        // we are starting a new game, so (re)init the game state based on the 
        // values in the setup object 
        const tricks = this.state.tricks;
        // const players = this.state.players.map((p) => ({name:p.name, id:p.id, bid:0, tricks:0, score:5 }))
        
        const players = this.state.players.reduce((acc, player) => {
          if (player.checked) {
            acc.push({name:player.name, id:player.id, bid:0, tricks:0, score:5 });
          }
          return acc;
        }, []);
        
        const first_round = { tricks: tricks[0], total_bid: 0, total_tricks: 0, 
            dealer_id: 3, stage: BIDDING,
            players: players
        };
        const rounds = [first_round];
        this.setState({ stage: stage, current_round_index: 0, rounds: rounds });
      } else {
        this.setState({ stage: stage });
      }
    }
  
    _setRoundStage = (stage) => {
      console.log("set stage: "+stage);
      const s_round = this.state.rounds[this.state.current_round_index];
      const x_round = update(s_round,{ stage: {$set: stage} });
      const x_rounds = update(this.state.rounds,{[this.state.current_round_index]: {$set: x_round}});
      this.setState({ rounds: x_rounds });
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

}