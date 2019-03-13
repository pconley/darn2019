export const SAVE_STATE = 'SAVE_STATE'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const CHANGE_STAGE = 'CHANGE_STAGE'
export const CALC_ROUND = 'CALC_ROUND'
export const INCREMENT_ROUND = 'INCREMENT_ROUND'

export function saveStateAction(payload) {
  return {type: SAVE_STATE,payload}
}

export function CalculateRoundAction(index) { 
  console.log("******* CalculateRoundAction index=",index);
  return { type: CALC_ROUND, payload: {index: index} };
}

export function ChangeFieldAction(player, field, value) { 
  return { type: CHANGE_FIELD, payload: {field: field, player: player, value: value} };
}

export function ChangeStageAction(stage) {
  return { type: CHANGE_STAGE, payload: {stage: stage}}
}

export function IncrementRoundAction(value) {
  return { type: INCREMENT_ROUND, payload: {value: value}}
}
