// Actions
import {
  loginRequest,
  loginCheck,
  logoutRequest
} from './actions'

// Reducers
import reducer from './reducer'

// Sagas
import watcher from './sagas'

export const userActions = {
  loginRequest,
  loginCheck,
  logoutRequest
}
export const userReducer = reducer
export const userSagas = watcher
