// src/features/mentor/mentorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mentorSlice = createSlice({
    name: 'mentor',
    initialState: {
        list: [],
        totalElements: 0,
        totalPages: 0,
        urlBase: '',
        loading: false,
        error: null,
    },
    reducers: {
        fetchMentorListRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchMentorListSuccess: (state, action) => {
            state.loading = false;
            const { data, urlBase } = action.payload;
            state.list = data?.content || [];
            state.totalElements = data?.totalElements || 0;
            state.totalPages = data?.totalPages || 0;
            state.urlBase = urlBase || '';
        },
        fetchMentorListFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchMentorListRequest,
    fetchMentorListSuccess,
    fetchMentorListFailure,
} = mentorSlice.actions;

export default mentorSlice.reducer;