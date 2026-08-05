// src/features/syllabus/syllabusSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import syllabusApi from '../../api/modules/syllabusApi';
import {
  fetchSyllabusListRequest,
  fetchSyllabusListSuccess,
  fetchSyllabusListFailure,
} from './syllabusSlice';

function* handleFetchSyllabusList(action) {
  try {
    const response = yield call(syllabusApi.getPublicList, action.payload);
    console.log('API syllabus response:', response );
    yield put(fetchSyllabusListSuccess(response));
  } catch (error) {
    yield put(fetchSyllabusListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* syllabusSaga() {
  yield takeLatest(fetchSyllabusListRequest.type, handleFetchSyllabusList);
}