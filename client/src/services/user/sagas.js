// NPM packages
import {
  call,
  put,
  all,
  takeEvery
} from 'redux-saga/effects'
import jwt from 'jsonwebtoken'

// User actions
import {
  actionTypes,
  loginSuccess,
  logoutSuccess,
  loginFailure
} from './actions'

// Common utilities
import getServerURL from '../../common/utils/getServerUrl'
import handleFetchError from '../../common/utils/handleFetchError'
import {
  authToken
} from '../../common/utils/fetchData'

const USERNAME = 'email'
const USER_PASSWORD = 'password'

function getToken(payload) {
  const {
    username,
    password
  } = payload
  const URL = `${getServerURL()}/login`

  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      [USERNAME]: username,
      [USER_PASSWORD]: password
    })
  })
    .then((response) => handleFetchError(response))
    .then((response) => response.json())
    .then((data) => data.token)
}

function* getUserData(token) {
  const {
    type,
    userID,
    name
  } = yield call(jwt.decode, token)
  // TODO check if token has expired
  // if token is expired then logout
  return {
    type: type.toUpperCase(),
    userID,
    name
  }
}

function* authorize(payload) {
  const {
    username,
    password
  } = payload

  try {
    const token = yield call(getToken, {
      username,
      password
    })

    yield call(authToken.set, token)

    return token
  } catch (error) {
    yield put(loginFailure(error.message))

    return false
  }
}

function* loginUser(token) {
  try {
    const [userData] = yield all([
      call(getUserData, token)
    ])

    const payload = {
      ...userData
    }

    yield put(loginSuccess(payload))
    return true
  } catch (error) {
    yield put(loginFailure(error.message))
    yield call(authToken.remove)

    return false
  }
}

function* logout() {
  yield call(authToken.remove)

  yield put(logoutSuccess())
}

export function* loginFlow(action) {
  const {
    username,
    password,
    token
  } = action.payload

  let loginToken = token

  if (username && password) {
    loginToken = yield call(authorize, {
      username,
      password
    })
  }

  if (loginToken) {
    yield call(loginUser, loginToken)
  }
}

export default function* watcher() {
  const {
    LOGIN_REQUEST,
    LOGIN_CHECK,
    LOGOUT_REQUEST
  } = actionTypes

  yield takeEvery([
    LOGIN_REQUEST,
    LOGIN_CHECK
  ], loginFlow)

  yield takeEvery(LOGOUT_REQUEST, logout)
}
