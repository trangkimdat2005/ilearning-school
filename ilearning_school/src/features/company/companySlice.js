// src/features/company/companySlice.js
import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchCompanyListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchCompanyListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchCompanyListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCompanyListRequest,
    fetchCompanyListSuccess,
    fetchCompanyListFailure,
} = companySlice.actions;

export default companySlice.reducer;