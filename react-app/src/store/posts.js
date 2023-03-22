

// Constants

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';


// Action Creators
const actionGetAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts
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
        default:
            return state;
    }
}
