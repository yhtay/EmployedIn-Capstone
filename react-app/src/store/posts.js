

// Constants

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';



// Action Creators
const actionGetAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
})

const actionCreatePost = (post) => ({
    type: CREATE_POST,
    post
})

const actionEditPost = (post) => ({
    type: EDIT_POST,
    post
})

const actionDeletePost = (id) => ({
    type: DELETE_POST,
    id
})


// Thunks
export const thunkGetAllPosts = () => async (dispatch) => {
    const response = await fetch(`/api/posts/`)

    if (response.ok) {
        const posts = await response.json()
        const normalizedPost = {}
        posts.forEach(post => {
            normalizedPost[post.id] = post
        })
        dispatch(actionGetAllPosts(normalizedPost))
        return normalizedPost
    }
}

export const thunkCreatePost = (post) => async (dispatch) => {
    const response = await fetch(`/api/posts/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })
    if (response.ok) {
        const newPost = await response.json()
        dispatch(actionCreatePost(newPost))
        return newPost
    }
}

export const thunkEditPost = (post, id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${+id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(actionEditPost(post))
        return post
    }
}

export const thunkDeletePost = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${+id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(actionDeletePost(id))
        return post
    }
}

const initialState = {
    allPosts: {}
}

export default function postsReducer(state=initialState, action) {

    switch(action.type) {
        case GET_ALL_POSTS: {
            const newState = {...state}
            newState.allPosts = {...action.posts}
            return newState
        }
        case CREATE_POST: {
            const newState = {...state}
            newState.allPosts = {...state.allPosts, [action.post.id]: action.post}
            return newState
        }
        case EDIT_POST: {
            const newState = {...state}
            newState.allPosts = {...state.allPosts, [action.post.id]: action.post}
            return newState
        }
        case DELETE_POST: {
            const newState = {...state}
            delete newState.allPosts[action.id]
            return newState
        }
        default:
            return state;
    }
}
