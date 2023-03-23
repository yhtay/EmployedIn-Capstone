import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { thunkEditComment } from "../../../store/comments"




export default function EditCommentModal({ postId, commentToEdit }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState(commentToEdit.comment);

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (errors.length > 0) return

        const editedComment = {
            comment
        }

        await dispatch(thunkEditComment(+postId, +commentToEdit.id, editedComment))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
    }

    return (
        <div className="post-modal-container">
            <h2>Edit a Post!</h2>
            <form onSubmit={handleSubmit} className="inputs-div">
                <div>
                    {hasSubmitted && errors.length > 0 &&
                        errors.map((error, idx) => {
                            <li key={idx}>{error}</li>
                        })
                    }
                </div>
                <textarea
                    className="post-input"
                    placeholder="What do you want to talk about?"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button
                    className="post-button"
                    type="submit"
                    // disabled={errors.length > 0 ? true : false}
                    >
                    Post
                </button>

            </form>
        </div>
    )
}
