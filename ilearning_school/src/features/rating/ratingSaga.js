// src/features/rating/ratingSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import ratingApi from '../../api/modules/ratingApi';
import {
  fetchRatingListRequest,
  fetchRatingListSuccess,
  fetchRatingListFailure,
} from './ratingSlice';

function* handleFetchRatingList(action) {
  try {
    const response  = yield call(ratingApi.getPublicList, action.payload);
    console.log('response rating', response);
    yield put(fetchRatingListSuccess(response));
  } catch (error) {
    yield put(fetchRatingListFailure(error.message || 'Có lỗi xảy ra'));
  }
}

export default function* ratingSaga() {
  yield takeLatest(fetchRatingListRequest.type, handleFetchRatingList);
}