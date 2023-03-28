import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import thunk from "redux-thunk";
import { thunkGetAllPosts } from "../../store/posts";
import { thunkGetAllUsers } from "../../store/session";
import CreatePost from "./CreatePost/CreatePostModal";
import OpenModalButton from "../OpenModalButton";
import CreatePostModalButton from "./CreatePost/CreatePostModalButton";
import CreatePostModal from "./CreatePost/CreatePostModal";
import EditPostModalButton from "./EditPost/EditPostModalButton";
import EditPostModal from "./EditPost/EditPostModal";
import DeletePostModalButton from "./DeletePost/DeletePostModalButton";
import DeletePostModal from "./DeletePost/DeletePostModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentsComponent from "../Comments/CommentsComponent";
import CreateComment from "../Comments/CreateComment/CreateComment";
import "./PostComponent.css"




export default function PostsPage() {

    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.allPosts)
    const user = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.session.allUsers)
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const [userPost, setUserPost] = useState(null);
    const [commentDropDownVisible, setCommentDropDownVisible] = useState(false);
    const [commentPost, setCommentPost] = useState(null)

    const closeDropDown = (e) => {
        if (dropDownVisible &&
            e.target.closest(".dropdown-container") === null &&
            e.target.closest(".ellipsis-icon-div") === null
            ) {
                setDropDownVisible(false);
        }
        if (commentDropDownVisible &&
            e.target.closest(".comment-dropdown-container") === null &&
            e.target.closest(".comment-icon-div") === null
            ) {
                setCommentDropDownVisible(false)
            }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropDown);
        return () => {
            document.removeEventListener("click", closeDropDown);
        };
    }, [dropDownVisible, commentDropDownVisible]);

    useEffect(() => {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    if (!allUsers) return null
    if (!allPosts) return null
    if (!user) return null

    const toggleDropDown = () => {
        setDropDownVisible(!dropDownVisible)
    }

    const postsArr = Object.values(allPosts).reverse()

    return(
        <div className="mainpage-container">
            <div className="profile-card-div">
                "Profile Card"
            </div>
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
                                <div>
                                    <div className="post-profile-image-div">
                                        <img
                                            className="post-profile-img"
                                            src={allUsers[post.user_id]["profile_image"]}
                                            alt="profile-image"
                                            />
                                        <div>
                                            <div>{`${allUsers[post.user_id]["first_name"]} ${allUsers[post.user_id]["last_name"]}`}</div>
                                            <div>{allUsers[post.user_id]["education"]}</div>
                                        </div>
                                    </div>
                                    <div className="post-text-div">{post.post}</div>
                                </div>
                                <div>
                                    {user && Number(user.id) === Number(post.user_id) &&
                                        <>
                                            <div
                                                onClick={() => {
                                                    setDropDownVisible(!dropDownVisible)
                                                    setUserPost(post.id)
                                                }}
                                                className="ellipsis-icon-div"
                                                >
                                                <FontAwesomeIcon icon={faEllipsis} style={{ position: "relative", top: "5px", right: "5px"}} />
                                                {userPost === post.id &&
                                                    <div className={ dropDownVisible ? "dropdown-container" : "hidden"}>
                                                        <EditPostModalButton
                                                            buttonText="Edit"
                                                            modalComponent={<EditPostModal postToEdit={post} />}
                                                        />
                                                        <DeletePostModalButton
                                                            buttonText="Delete"
                                                            modalComponent={<DeletePostModal postToDelete={post} />}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        </>
                                    }
                                </div>
                                {/* <div>{user.first_name}</div> */}
                            </div>
                            <div
                                onClick={() => {
                                    setCommentDropDownVisible(!commentDropDownVisible);
                                    setCommentPost(post.id);
                                }}
                                className="comment-icon-div"
                            >
                                <div><FontAwesomeIcon icon={faComment} /> {"  Comment"}</div>
                            </div>
                                {commentPost === post.id && (
                                    <div className={ commentDropDownVisible ? "comment-dropdown-container" : "hidden"}>
                                        <CreateComment postId={post.id} />
                                        <CommentsComponent postId={post.id} userId={user} />
                                    </div>
                                )}
                        </div>
                    ))
                }
            </div>
            <div className="tech-div">
                Tech Utilized!
            </div>
        </div>
    )
}
