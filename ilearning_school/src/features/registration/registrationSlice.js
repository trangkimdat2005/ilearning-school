// src/features/registration/registrationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        data: null,
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        createRegistrationRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        createRegistrationSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        },
        createRegistrationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        // Action phụ trợ: Dùng để reset state sau khi hiển thị thông báo thành công
        resetRegistrationState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.data = null;
        }
    },
});

export const {
    createRegistrationRequest,
    createRegistrationSuccess,
    createRegistrationFailure,
    resetRegistrationState,
} = registrationSlice.actions;

export default registrationSlice.reducer;