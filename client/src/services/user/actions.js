export const actionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_CHECK: 'LOGIN_CHECK',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
}


export function loginSuccess(payload) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      isLoggedIn: true,
      ...payload
    }
  }
}

export function loginRequest(
  username,
  password
) {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  }
}

export function loginCheck(token) {
  return {
    type: actionTypes.LOGIN_CHECK,
    payload: {
      token
    }
  }
}

export function logoutRequest() {
  return {
    type: actionTypes.LOGOUT_REQUEST
  }
}

export function logoutSuccess() {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  }
}

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: {
      error
    }
  }
}
