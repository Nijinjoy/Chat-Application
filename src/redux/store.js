import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice'
// import chatReducer from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
