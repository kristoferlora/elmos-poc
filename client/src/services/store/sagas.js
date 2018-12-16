// NPM packages
import {all} from 'redux-saga/effects'

// Sagas
import {userSagas} from '../user'

export default function* sagas() {
  yield all([
    userSagas()
  ])
}
