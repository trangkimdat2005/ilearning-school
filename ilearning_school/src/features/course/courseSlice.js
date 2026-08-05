// src/features/course/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchCourseListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchCourseListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchCourseListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCourseListRequest,
    fetchCourseListSuccess,
    fetchCourseListFailure,
} = courseSlice.actions;

export default courseSlice.reducer;