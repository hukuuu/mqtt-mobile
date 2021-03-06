/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import RoomActions from '../Redux/RoomRedux'
import { LoginSelectors } from '../Redux/LoginRedux'
// import { RoomSelectors } from '../Redux/RoomRedux'
import transformRoomData from '../Transforms/TransformRoomData'
import AppConfig from '../Config/AppConfig'

export function* getRooms(api, action) {
  const token = yield select(LoginSelectors.getToken)
  const response = yield call(api.fetchRooms, token)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RoomActions.roomSuccess(transformRoomData(response.data)))
  } else {
    yield put(RoomActions.roomFailure())
  }

  yield call(delay, AppConfig.refreshInterval)
  const isLoggedIn = yield select(LoginSelectors.getToken)
  if (isLoggedIn) yield put(RoomActions.roomRequest())
}
