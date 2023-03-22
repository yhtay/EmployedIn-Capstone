import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk";
import { thunkGetAllPosts } from "../../store/posts";


export default function PostsPage() {

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.allPosts)


    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!allPosts) return null

    const postsArr = Object.values(allPosts)
    console.log(postsArr)

    return(
        <div>
            <h1>Now in Posts Page</h1>
        </div>
    )
}
