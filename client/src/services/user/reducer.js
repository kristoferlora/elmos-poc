// User actions
import {actionTypes} from './actions'

const initialState = {
  isLoggedIn: false,
  userType: null
}

function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        ...initialState
      }

    default:
      return state
  }
}

export default reducer
