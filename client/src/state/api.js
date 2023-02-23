import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/authSlice";
import { setPost, setLoading, setUpdating, setError } from './postSlice';
export const api=createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/posts",
        credentials: 'include',

    }),
    reducerPath: "adminApi",
    tagTypes: [
        "Posts", "EditForm"
    ],
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => `/`,
            providesTags: ["Posts"]
        }),
        getEditForm: build.query({
            query: (id) => `/edit/${id}`,
            providesTags: ["EditForm"]
        }),

    }),
})

export const { useGetPostsQuery, useGetEditFormQuery }=api