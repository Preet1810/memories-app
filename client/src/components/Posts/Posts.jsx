import React from 'react'
import Post from './Post/Post'
import { useGetPostsQuery } from '../../state/api'

const Posts=() => {
    const { data }=useGetPostsQuery();
    console.log(data)
    return (
        <div>
            <h1>posts</h1>
            posts
            <Post />
        </div>
    )
}

export default Posts