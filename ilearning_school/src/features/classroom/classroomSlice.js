// src/features/classroom/classroomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const classroomSlice = createSlice({
    name: 'classroom',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchClassroomListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchClassroomListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchClassroomListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchClassroomListRequest,
    fetchClassroomListSuccess,
    fetchClassroomListFailure,
} = classroomSlice.actions;

export default classroomSlice.reducer;