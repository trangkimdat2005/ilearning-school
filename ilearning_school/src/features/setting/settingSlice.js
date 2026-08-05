// src/features/setting/settingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        // Dành cho list tổng
        list: [],
        urlBase: '',
        loading: false,
        error: null,
        
        // Dành cho list theo key (Thêm mới)
        settingByKey: [], 
        loadingByKey: false,
        errorByKey: null,
    },
    reducers: {
        // --- XỬ LÝ FETCH LIST TỔNG ---
        fetchSettingListRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSettingListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.urlBase = urlBase || '';
        },
        fetchSettingListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // --- XỬ LÝ FETCH LIST THEO KEY ---
        fetchSettingListByKeyRequest: (state) => {
            state.loadingByKey = true; // Dùng loading riêng
            state.errorByKey = null;
        },
        fetchSettingListByKeySuccess: (state, action) => {
            state.loadingByKey = false;
            const { data, urlBase } = action.payload;
            state.settingByKey = data || [];
            state.urlBase = urlBase || state.urlBase; 
        },
        fetchSettingListByKeyFailure: (state, action) => {
            state.loadingByKey = false;
            state.errorByKey = action.payload; // Dùng error riêng
        },
    },
});

export const {
    fetchSettingListRequest,
    fetchSettingListSuccess,
    fetchSettingListFailure,
    fetchSettingListByKeyRequest,
    fetchSettingListByKeySuccess,
    fetchSettingListByKeyFailure,
} = settingSlice.actions;

export default settingSlice.reducer;