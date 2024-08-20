// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userslice';  // Ensure the correct path
import adminReducer from './slices/adminslice';
const store = configureStore({
    reducer: {
        auth: userReducer,
        admin:adminReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
