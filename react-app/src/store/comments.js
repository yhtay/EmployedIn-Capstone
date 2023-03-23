
// Constants
const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT"

// Action Creators
const actionGetAllComments = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

const actionCreateComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const actionEditComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const actionDeleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})



// Thunks
export const thunkGetAllComments = () => async(dispatch) => {
    const response = await fetch(`/api/comments/`)

    if (response.ok) {
        const comments = await response.json()
        const normalizedComments = {}
        comments.forEach(comment => {
            normalizedComments[comment.id] = comment
        })
        dispatch(actionGetAllComments(normalizedComments))
        return normalizedComments
    }
}

export const thunkCreateComment = (postId, newComment) => async(dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newComment)
    })

    if (response.ok) {
        const comment = await response.json()
        console.log("thunkCreateComment: ", comment)
        dispatch(actionCreateComment(comment))
        return comment
    }
}

export const thunkEditComment = (postId, commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const editedComment = await response.json()
        dispatch(actionEditComment(editedComment))
        return editedComment
    }
}

export const thunkDeleteComment = (postId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const comment = await response.json()
        dispatch(actionDeleteComment(commentId))
        return comment
    }
}

// Initial State
const initialState = {
    allComments: {},
    postComments: {}
}

// Reducer
export default function commentsReducer(state=initialState, action) {

    switch (action.type) {
        case GET_ALL_COMMENTS: {
            const newState = {...state}
            newState.allComments = {...action.comments}
            return newState
        }
        case CREATE_COMMENT: {
            const newState = {...state}
            newState.allComments = {...state.allComments, [action.comment.id]: action.comment}
            return newState
        }
        case EDIT_COMMENT: {
            const newState = {...state}
            newState.allComments = {...state.allComments, [action.comment.id]: action.comment}
            return newState
        }
        case DELETE_COMMENT: {
            const newState = {...state}
            delete newState.allComments[action.id]
            return newState
        }
        default:
            return state
    }
}
