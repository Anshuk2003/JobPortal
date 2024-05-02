import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice';
import loadersReducer from './loaderSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loadersReducer,
    }
});

export default store;
