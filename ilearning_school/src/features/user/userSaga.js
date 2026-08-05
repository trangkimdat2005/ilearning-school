import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from './userSlice';

function fetchUserApi(userId) {
  return fetch(`/api/users/${userId}`).then((res) => res.json());
}

function* handleFetchUser(action) {
  try {
    const data = yield call(fetchUserApi, action.payload);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUserRequest.type, handleFetchUser);
}