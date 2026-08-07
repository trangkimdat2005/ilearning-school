// src/features/registration/registrationSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import registrationApi from '../../api/modules/registrationApi';
import {
  createRegistrationRequest,
  createRegistrationSuccess,
  createRegistrationFailure,
} from './registrationSlice';

function* handleCreateRegistration(action) {
  try {
    const response = yield call(registrationApi.create, action.payload);
    console.log('response registration', response);
    yield put(createRegistrationSuccess(response));
  } catch (error) {
    yield put(createRegistrationFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* registrationSaga() {
  yield takeLatest(createRegistrationRequest.type, handleCreateRegistration);
}