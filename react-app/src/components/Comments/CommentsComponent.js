import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import DeleteCommentModalButton from "./DeleteComment/DeleteCommentModalButton";
import DeleteCommentModal from "./DeleteComment/DeleteCommentModal";
import EditCommentModalButton from "./EditComment/EditCommentModalButton";
import EditCommentModal from "./EditComment/EditCommentModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./CommentsComponent.css"


export default function CommentsComponent({ postId }) {

    const dispatch = useDispatch();

    const allComments = useSelector(state => state.comments.allComments)
    const user = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.session.allUsers)
    const commentsArr = Object.values(allComments)
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const [userComment, setUserComment] = useState(null)

    const closeDropDown = (e) => {
        if (dropDownVisible &&
            e.target.closest(".edit-delete-comment-dropdown") === null &&
            e.target.closest(".comment-ellipsis-icon") === null
            ) {
                setDropDownVisible(false)
            }
    }

    useEffect(() => {
        document.addEventListener("click", closeDropDown);
        return () => {
            document.removeEventListener("click", closeDropDown);
        };
    }, [dropDownVisible])

    const commentsByPostId = (postId) => {
        let filteredComments = commentsArr.filter(comment => +comment.post_id === +postId)
        return filteredComments
    }

    return (
        <div>
            <div style={{ paddingLeft: "15px" }}>{commentsByPostId(postId).map(comment => (
                <div key={comment.id} >
                    <div className="comments-by-post-div">
                        <div className="comment-and-image-div">
                            <img
                                className="comment-user-profile-img"
                                src={allUsers[comment.user_id]["profile_image"]}
                                alt="profile-image"
                                />
                            <div className="individual-comments-div">{comment.comment}</div>
                        </div>
                            { user && Number(user.id) === Number(comment.user_id) &&
                            <>
                                <div
                                    onClick={() => {
                                        setDropDownVisible(!dropDownVisible)
                                        setUserComment(comment.id)
                                    }}
                                    className="comment-ellipsis-icon"
                                    >
                                    <FontAwesomeIcon icon={faEllipsis} style={{ position: "relative", top: "1px", right: "5px"}} />
                                    {userComment === comment.id &&
                                        <div className={ dropDownVisible ? "edit-delete-comment-dropdown" : "hidden" }>
                                            <EditCommentModalButton
                                                buttonText="Edit"
                                                modalComponent={<EditCommentModal postId={postId} commentToEdit={comment} />}
                                                />
                                            <DeleteCommentModalButton
                                                buttonText="Delete"
                                                modalComponent={<DeleteCommentModal postId={postId} commentId={comment.id} />}
                                                />
                                    </div>
                                    }
                                </div>
                            </>
                            }
                    </div>
                </div>
            ))}</div>
        </div>
    )
}
