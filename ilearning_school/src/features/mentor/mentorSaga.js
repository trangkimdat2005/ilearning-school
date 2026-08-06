// src/features/mentor/mentorSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import mentorApi from '../../api/modules/mentorApi';
import {
  fetchMentorListRequest,
  fetchMentorListSuccess,
  fetchMentorListFailure,
} from './mentorSlice';

function* handleFetchMentorList(action) {
  try {
    const response  = yield call(mentorApi.getPublicList, action.payload);
    console.log('response mentor', response);
    yield put(fetchMentorListSuccess(response));
  } catch (error) {
    yield put(fetchMentorListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* mentorSaga() {
  yield takeLatest(fetchMentorListRequest.type, handleFetchMentorList);
}