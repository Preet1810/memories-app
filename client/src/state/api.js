import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api=createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/posts" }),
    reducerPath: "adminApi",
    tagTypes: [
        "Posts"
    ],
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => `/`,
            providesTags: ["Posts"]
        }),
    })
})

export const { useGetPostsQuery }=api