import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk";
import { thunkGetAllPosts } from "../../store/posts";
import CreatePost from "./CreatePost/CreatePostModal";
import "./PostComponent.css"
import OpenModalButton from "../OpenModalButton";
import CreatePostModal from "./CreatePost/CreatePostModal";
import EditPostModal from "./EditPost/EditPostModal";
import DeletePostModal from "./DeletePost/DeletePostModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'




export default function PostsPage() {

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.allPosts)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!allPosts) return null
    if (!user) return null

    console.log('user: ', user)
    const postsArr = Object.values(allPosts)
    // console.log(postsArr)

    return(
        <div>
            <div className="all-posts-container">
            <div>
                <OpenModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePostModal />}
                />
            </div>
                {
                    postsArr.map(post => (
                        <div key={post.id} className='individual-post-div'>
                            <div>
                                {user && Number(user.id) === Number(post.user_id) &&
                                    <OpenModalButton
                                        buttonText="Edit"
                                        modalComponent={<EditPostModal postToEdit={post} />}
                                    />
                                }
                                {user && Number(user.id) === Number(post.user_id) &&
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeletePostModal postToDelete={post} />}
                                    />
                                }
                            </div>
                            <div>{post.post}</div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
