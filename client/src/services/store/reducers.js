// NPM packages
import {combineReducers} from 'redux'

// Reducers
import {userReducer} from '../user'
import viewportReducer from '../viewport/reducer'

export default combineReducers({
  user: userReducer,
  viewport: viewportReducer
})
