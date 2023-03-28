import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/Modal"
import { thunkCreatePost } from "../../../store/posts"
import "./CreatePostModal.css"


export default function CreatePostModal() {

    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)

    const [post, setPost] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const newErrors = []
        if (post.length === 0 || post.length > 500) newErrors.push("Post must be between 1 and 500 characters")

        setErrors(newErrors)
        return () => {
            setHasSubmitted(false)
        }
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)
        if (errors.length > 0) return

        const newPost = {
            post,
            image
        }

        await dispatch(thunkCreatePost(newPost))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json()
                console.log("data: ", data)
                if (data && data.errors) setErrors(data.errors)
            })
        setHasSubmitted(false)
    }


    return (
        <div className="post-modal-container">
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit} className="inputs-div">
                <div className="post-errors-div">
                    {hasSubmitted && errors.length > 0 &&
                        errors.map((error, idx) => {
                            return <li key={idx}>{error}</li>
                        })
                    }
                </div>
                <textarea
                    className="post-input"
                    placeholder="What do you want to talk about?"
                    value={post}
                    onChange={e => setPost(e.target.value)}
                />
                <button
                    className="post-button"
                    type="submit"
                    style={{cursor: "pointer"}}
                    // disabled={errors.length > 0 ? true : false}
                    >
                    Post
                </button>

            </form>
        </div>
    )
}
