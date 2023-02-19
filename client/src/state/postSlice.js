import { createSlice } from '@reduxjs/toolkit';

export const postsSlice=createSlice({
    name: 'posts',
    initialState: {
        post: null,
        isLoading: false,
        isUpdating: false,
        error: null,
    },
    reducers: {
        setPost: (state, action) => {
            state.post=action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading=action.payload;
        },
        setUpdating: (state, action) => {
            state.isUpdating=action.payload;
        },
        setError: (state, action) => {
            state.error=action.payload;
        },
    },
});

export const { setPost, setLoading, setUpdating, setError }=postsSlice.actions;

export const selectPost=(state) => state.posts.post;
export const selectIsLoading=(state) => state.posts.isLoading;
export const selectIsUpdating=(state) => state.posts.isUpdating;
export const selectError=(state) => state.posts.error;

export default postsSlice.reducer;