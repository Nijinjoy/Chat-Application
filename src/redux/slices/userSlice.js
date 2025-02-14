import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { uid, email, username, emailVerified, photoURL, accessToken, refreshToken } = action.payload;
            state.user = { uid, email, username, emailVerified, photoURL };
            state.isLoggedIn = true;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
