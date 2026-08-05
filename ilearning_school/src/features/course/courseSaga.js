// src/features/course/courseSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import courseApi from '../../api/modules/courseApi';
import {
  fetchCourseListRequest,
  fetchCourseListSuccess,
  fetchCourseListFailure,
} from './courseSlice';

function* handleFetchCourseList(action) {
  try {
    const response  = yield call(courseApi.getList, action.payload);
    yield put(fetchCourseListSuccess(response));
  } catch (error) {
    yield put(fetchCourseListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* courseSaga() {
  yield takeLatest(fetchCourseListRequest.type, handleFetchCourseList);
}