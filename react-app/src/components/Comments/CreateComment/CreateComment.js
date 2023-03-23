import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateComment, thunkGetAllComments } from "../../../store/comments";


export default function CreateComment({ postId }) {

    const dispatch = useDispatch();
    // const history = useHistory()
    const { closeModal } = useModal()

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

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
    }

    return (
        <div>
            <form onSubmit={handleCommentSubmit}>
                <input
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
