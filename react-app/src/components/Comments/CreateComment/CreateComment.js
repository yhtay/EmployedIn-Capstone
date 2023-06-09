import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateComment, thunkGetAllComments } from "../../../store/comments";
import "./CreateComment.css"


export default function CreateComment({ postId }) {

    const dispatch = useDispatch();
    // const history = useHistory()
    const { closeModal } = useModal()

    const user = useSelector(state => state.session.user)
    const allUsers = useSelector(state => state.session.allUsers)

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const newErrors = []

        if (comment.length < 1 || comment.length > 100) newErrors.push("Comments must be between 1 and 100 characters")

        setErrors(newErrors)
        return () => {
            setErrors([])
            setHasSubmitted(false)
        }
    }, [comment])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (errors.length > 0) return

        const newComment = {
            comment
        }
        await dispatch(thunkCreateComment(+postId, newComment))
            .then(() => {thunkGetAllComments()})
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        setComment("")
        setHasSubmitted(false)
    }

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                {
                    hasSubmitted && errors.length > 0 &&
                        errors.map((error, idx) => (
                            <li
                                style={{ color: "red", listStyle: "none" }}
                                key={idx}>{error}</li>
                        ))
                }
                <div className="user-profile-comment-input">
                    <img
                    className="create-comment-profile-img"
                    src={user.profile_image}
                    alt="user_profile"
                    />
                    <input
                        placeholder="Add a comment..."
                        className="create-comment-input"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                </div>
                <button
                style={{ display: "none"}}
                type="submit">Submit</button>
            </form>
        </div>
    )
}
