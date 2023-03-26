import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk";
import { thunkGetAllPosts } from "../../store/posts";
import CreatePost from "./CreatePost/CreatePostModal";
import OpenModalButton from "../OpenModalButton";
import CreatePostModalButton from "./CreatePost/CreatePostModalButton";
import CreatePostModal from "./CreatePost/CreatePostModal";
import EditPostModal from "./EditPost/EditPostModal";
import DeletePostModal from "./DeletePost/DeletePostModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import CommentsComponent from "../Comments/CommentsComponent";
import CreateComment from "../Comments/CreateComment/CreateComment";
import "./PostComponent.css"



export default function PostsPage() {

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.allPosts)
    const user = useSelector(state => state.session.user)
    const allComments = useSelector(state => state.comments.allComments)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!allPosts) return null
    if (!user) return null

    const postsArr = Object.values(allPosts)

    return(
        <div>
            <div className="all-posts-container">
            <div className="create-post-div">
            <img
                className="post-profile-img"
                src={user.profile_image}
                alt="user_profile"
                />
                <CreatePostModalButton
                    buttonText="Start a post"
                    modalComponent={<CreatePostModal />}
                />
            </div>
                {
                    postsArr.map(post => (
                        <div key={post.id} className='individual-post-div'>
                            <div className="post-and-buttons">
                                <div>{post.post}</div>
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
                                {/* <div>{user.first_name}</div> */}
                            </div>
                            <CommentsComponent postId={post.id} userId={user} />
                            <CreateComment postId={post.id} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
