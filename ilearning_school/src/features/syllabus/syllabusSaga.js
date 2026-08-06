// src/features/syllabus/syllabusSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import syllabusApi from '../../api/modules/syllabusApi';
import {
  fetchSyllabusListRequest,
  fetchSyllabusListSuccess,
  fetchSyllabusListFailure,
} from './syllabusSlice';

function* handleFetchSyllabusList(action) {
  const { typeKey, ...params } = action.payload;
  
  try {
    const response = yield call(syllabusApi.getPublicList, params);
    
    yield put(fetchSyllabusListSuccess({
      typeKey: typeKey,
      data: response.data, 
      urlBase: response.urlBase,
      firebaseUrl: response.firebaseUrl // Gửi thêm nếu component của bạn cần dùng
    }));
    
  } catch (error) {
    yield put(fetchSyllabusListFailure({
      typeKey: typeKey,
      error: error.message || 'Có lỗi xảy ra'
    }));
  }
}

export default function* syllabusSaga() {
  yield takeEvery(fetchSyllabusListRequest.type, handleFetchSyllabusList);
}