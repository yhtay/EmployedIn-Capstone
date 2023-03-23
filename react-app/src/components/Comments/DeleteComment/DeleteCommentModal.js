import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { thunkDeleteComment, thunkGetAllComments } from "../../../store/comments"



export default function DeleteCommentModal({ postId, commentId }) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteComment(+postId, +commentId))
            .then(() => dispatch(thunkGetAllComments()))
            .then(closeModal)
    }

    return (
        <div className='delete-comment-modal'>
            <h2 style={{ textAlign: "center"}}>Delete Comment?</h2>
            <div style={{ textAlign: "center", margin: "30px 0px"}}>
                Are you sure you want to permanently remove this comment from EmployedIn?
            </div>
            <div className="button-div">
                <button
                    className="cancel-button"
                    onClick={() => closeModal()}
                    >
                    Cancel</button>
                <button className="confirm-button" onClick={handleSubmit}>Confirm</button>
            </div>

        </div>
    )
}
