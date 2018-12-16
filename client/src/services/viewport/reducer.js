import {WINDOW_RESIZE, generateBreakpoints} from './actions'

let root = typeof self == 'object' && self.Object == Object && self // eslint-disable-line
root = root || (typeof global == 'object' && global.Object == Object && global) // eslint-disable-line

const initialState = generateBreakpoints(root.innerWidth)

const viewportReducer = (state = initialState, action) => {
  if (action.type === WINDOW_RESIZE) {
    return {
      ...state,
      ...action.payload
    }
  }
  return state
}

export default viewportReducer
