import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    authUser: {
        access_token: null,
        expires_at: null,
    },
    authInfoUser: {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthSlice: (state, action) => {
            state.authUser = action.payload;
        },
        setAuthInfoSlice: (state, action) => {
            state.authInfoUser = action.payload;
        },
    },
});

export const {
    setAuthSlice,
    setAuthInfoSlice
} = authSlice.actions;
export const authReducer = authSlice.reducer;
