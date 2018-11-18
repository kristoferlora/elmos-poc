// NPM packages
import {combineReducers} from 'redux'

// Reducers
import {userReducer} from '../user'
// import {myStatsReducer} from '../myStats'

export default combineReducers({
  user: userReducer
  // stats: myStatsReducer
})
