import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../src/reduxstore/modelslice';

export const store = configureStore({
    reducer: {
        modal: modalReducer
    }
});
