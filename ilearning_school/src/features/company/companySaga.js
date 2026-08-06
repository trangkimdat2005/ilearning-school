// src/features/company/companySaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import companyApi from '../../api/modules/companyApi';
import {
  fetchCompanyListRequest,
  fetchCompanyListSuccess,
  fetchCompanyListFailure,
} from './companySlice';

function* handleFetchCompanyList(action) {
  try {
    const response  = yield call(companyApi.getPublicList, action.payload);
    console.log('response company', response);
    yield put(fetchCompanyListSuccess(response));
  } catch (error) {
    yield put(fetchCompanyListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* companySaga() {
  yield takeLatest(fetchCompanyListRequest.type, handleFetchCompanyList);
}