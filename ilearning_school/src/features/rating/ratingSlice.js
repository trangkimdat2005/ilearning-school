// src/features/rating/ratingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchRatingListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchRatingListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchRatingListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchRatingListRequest,
    fetchRatingListSuccess,
    fetchRatingListFailure,
} = ratingSlice.actions;

export default ratingSlice.reducer;