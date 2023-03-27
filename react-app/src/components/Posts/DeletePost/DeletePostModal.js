import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../../context/Modal"
import { thunkDeletePost, thunkGetAllPosts } from "../../../store/posts"
import "./DeletePostModal.css"



export default function DeletePostModal({ postToDelete }) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeletePost(postToDelete.id))
            .then(() => dispatch(thunkGetAllPosts()))
            .then(closeModal)
    }

    return (
        <div >
            <h2 style={{ textAlign: "center"}}>Delete Post?</h2>
            <div style={{ textAlign: "center", margin: "30px 0px"}}>
                Are you sure you want to permanently remove this post from EmployedIn?
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
