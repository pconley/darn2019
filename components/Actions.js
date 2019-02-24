export const SAVE_STATE = 'SAVE_STATE'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const CHANGE_STAGE = 'CHANGE_STAGE'
export const INCREMENT_ROUND = 'INCREMENT_ROUND'

export function saveStateAction(payload) {
  console.log("*** SaveStete ", payload);
  return {type: SAVE_STATE,payload}
}

export function ChangeField(payload) {
  console.log("*** ChangeField ", payload);
  return { type: CHANGE_FIELD, payload}
}

export function ChangeStage(payload) {
  console.log("*** ChangeStage ", payload);
  return { type: CHANGE_STAGE, payload}
}

export function IncrementRound(payload) {
  console.log("*** IncrementRound ", payload);
  return { type: INCREMENT_ROUND, payload}
}
