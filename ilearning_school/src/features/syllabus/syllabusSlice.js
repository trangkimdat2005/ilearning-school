// src/features/syllabus/syllabusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const syllabusSlice = createSlice({
    name: 'syllabus',
    initialState: {
        byType: {}, 
        urlBase: '',
        firebaseUrl: '',
    },
    reducers: {
        fetchSyllabusListRequest: (state, action) => {
            const { typeKey } = action.payload;
            if (!state.byType[typeKey]) {
                state.byType[typeKey] = { list: [], totalElements: 0, totalPages: 0, loading: false, error: null };
            }
            state.byType[typeKey].loading = true;
            state.byType[typeKey].error = null;
        },
        fetchSyllabusListSuccess: (state, action) => {
            const { typeKey, data, urlBase, firebaseUrl } = action.payload;
            
            if (!state.byType[typeKey]) {
                state.byType[typeKey] = { list: [], totalElements: 0, totalPages: 0, loading: false, error: null };
            }
            
            state.byType[typeKey].loading = false;
            state.byType[typeKey].list = data?.content || [];
            state.byType[typeKey].totalElements = data?.totalElements || 0;
            state.byType[typeKey].totalPages = data?.totalPages || 0;
            if (urlBase) state.urlBase = urlBase;
            if (firebaseUrl) state.firebaseUrl = firebaseUrl;
        },
        fetchSyllabusListFailure: (state, action) => {
            const { typeKey, error } = action.payload;
            if (state.byType[typeKey]) {
                state.byType[typeKey].loading = false;
                state.byType[typeKey].error = error;
            }
        },
    },
});

export const {
    fetchSyllabusListRequest,
    fetchSyllabusListSuccess,
    fetchSyllabusListFailure,
} = syllabusSlice.actions;

export const selectSyllabusByType = (state, typeKey) => 
    state.syllabus.byType[typeKey] || { list: [], totalElements: 0, totalPages: 0, loading: false, error: null };

export default syllabusSlice.reducer;