import { useDispatch, useSelector } from "react-redux"
import DeleteCommentModalButton from "./DeleteComment/DeleteCommentModalButton";
import DeleteCommentModal from "./DeleteComment/DeleteCommentModal";
import EditCommentModalButton from "./EditComment/EditCommentModalButton";
import EditCommentModal from "./EditComment/EditCommentModal";
import "./CommentsComponent.css"


export default function CommentsComponent({ postId }) {

    const dispatch = useDispatch();

    const allComments = useSelector(state => state.comments.allComments)
    const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(allComments)
    const commentsByPostId = (postId) => {
        let filteredComments = commentsArr.filter(comment => +comment.post_id === +postId)
        return filteredComments
    }



    return (
        <div>
            <h4>Comments Component</h4>
            <div style={{ paddingLeft: "15px" }}>{commentsByPostId(postId).map(comment => (
                <div key={comment.id} className="individual-comment-div">
                    <div>
                        {comment.comment}
                    </div>
                    { user && Number(user.id) === Number(comment.user_id) &&
                    <div>
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
            ))}</div>
        </div>
    )
}
