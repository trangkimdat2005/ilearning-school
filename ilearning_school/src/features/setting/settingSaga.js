// src/features/setting/settingSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import settingApi from '../../api/modules/settingApi';
import {
    fetchSettingListRequest,
    fetchSettingListSuccess,
    fetchSettingListFailure,
    fetchSettingListByKeyRequest,
    fetchSettingListByKeySuccess,
    fetchSettingListByKeyFailure,
} from './settingSlice';

function* handleFetchSettingList(action) {
    try {
        const response = yield call(settingApi.getPublicList, action.payload);
        console.log('response setting', response);
        yield put(fetchSettingListSuccess(response));
    } catch (error) {
        yield put(fetchSettingListFailure(error.message || 'Có lỗi xảy ra'));
    }
}
function* handleFetchSettingListByKey(action) {
    try {
        const response = yield call(settingApi.findByKey, action.payload);
        console.log('response setting by key', response);
        yield put(fetchSettingListByKeySuccess(response));
    } catch (error) {
        yield put(fetchSettingListByKeyFailure(error.message || 'Có lỗi xảy ra'));
    }
}

export default function* settingSaga() {
    yield takeLatest(fetchSettingListRequest.type, handleFetchSettingList);
    yield takeLatest(fetchSettingListByKeyRequest.type, handleFetchSettingListByKey);
}