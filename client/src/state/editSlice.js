
import { createSlice } from '@reduxjs/toolkit';

const initialState={
    isLoading: false,
    data: null,
    error: null,
};

export const editSlice=createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data=action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading=action.payload;
        },
        setError: (state, action) => {
            state.error=action.payload;
        },
    },
});