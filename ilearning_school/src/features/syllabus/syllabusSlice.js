// src/features/syllabus/syllabusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const syllabusSlice = createSlice({
    name: 'syllabus',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchSyllabusListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchSyllabusListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchSyllabusListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSyllabusListRequest,
    fetchSyllabusListSuccess,
    fetchSyllabusListFailure,
} = syllabusSlice.actions;

export default syllabusSlice.reducer;