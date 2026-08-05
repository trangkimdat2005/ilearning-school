// src/features/classroom/classroomSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import classroomApi from '../../api/modules/classroomApi';
import {
  fetchClassroomListRequest,
  fetchClassroomListSuccess,
  fetchClassroomListFailure,
} from './classroomSlice';

function* handleFetchClassroomList(action) {
  try {
    const response  = yield call(classroomApi.getPublicList, action.payload);
    console.log('API classroom response:', response );
    yield put(fetchClassroomListSuccess(response));
  } catch (error) {
    yield put(fetchClassroomListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* classroomSaga() {
  yield takeLatest(fetchClassroomListRequest.type, handleFetchClassroomList);
}