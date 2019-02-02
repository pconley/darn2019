export const SAVE_STATE = 'SAVE_STATE'

export function saveStateAction(payload) {
  return {
    type: SAVE_STATE,
    payload
  }
}