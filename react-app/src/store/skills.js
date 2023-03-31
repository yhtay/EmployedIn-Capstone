
// Constants

const GET_USER_SKILLS = 'skills/GET_USER_SKILLS'
const GET_USER_NEW_SKILLS = 'skills/GET_USER_NEW_SKILLS'
const ADD_SKILL_TO_USER = 'skills/ADD_NEW_SKILL_TO_USER'
const DELETE_SKILL_FROM_USER = 'skills/DELETE_SKILL_FROM_USER'

// Action Creators
const actionGetUserSkills = (skills) => ({
    type: GET_USER_SKILLS,
    skills
})

const actionGetUserNewSkills = (skills) => ({
    type: GET_USER_NEW_SKILLS,
    skills
})

const actionAddSkillToUser = (skill) => ({
    type: ADD_SKILL_TO_USER,
    skill
})

const actionDeleteSkillFromUser = (skill) => ({
    type: DELETE_SKILL_FROM_USER,
    skill
})


// Thunks
export const thunkGetUserSkills = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/skills`)

    if (response.ok) {
        const skills = await response.json()
        const normalizedSkills = {}
        skills.forEach(skill => {
            normalizedSkills[skill.id] = skill
        })
        dispatch(actionGetUserSkills(normalizedSkills))
        return normalizedSkills
    }
}

export const thunkGetUserNewSkills = (id) => async (dispatch) => {
    const response = await fetch(`/api/users/${id}/new_skills`)

    if (response.ok) {
        const skills = await response.json()
        const normalizedSkills = {}
        skills.forEach(skill => {
            normalizedSkills[skill.id] = skill
        })
        dispatch(actionGetUserNewSkills(normalizedSkills))
        return normalizedSkills
    }
}

export const thunkAddSkillToUser = (userId, skillId) => async (dispatch) => {
    const response = await fetch(`/api/users/${+userId}/skills/${+skillId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ user_id: +userId, skill_id: +skillId })
    })
    if (response.ok) {
        const updatedSkill = await response.json()
        dispatch(actionAddSkillToUser(updatedSkill))
        return updatedSkill
    }
}

export const thunkDeleteSkillFromUser = (userId, skillId) => async (dispatch) => {
    const response = await fetch(`/api/users/${+userId}/skills/${+skillId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const deletedSkill = await response.json()
        dispatch(actionDeleteSkillFromUser(deletedSkill))
        return deletedSkill
    }
}

const initialState = {
    userSkills: {},
    userNewSkills: {}
}


export default function skillsReducer(state=initialState, action) {

    switch(action.type) {
        case GET_USER_SKILLS: {
            const newState = {...state}
            newState.userSkills = {...action.skills}
            return newState
        }
        case GET_USER_NEW_SKILLS: {
            const newState = {...state}
            newState.userNewSkills = {...action.skills}
            return newState
        }
        case ADD_SKILL_TO_USER: {
            const newState = {...state}
            newState.userSkills = { ...state.userSkills, ...action.skill}
            // newState.userNewSkills = { ...state.userNewSkills, ...action.skill}
            return newState
        }
        case DELETE_SKILL_FROM_USER: {
            const newState = {...state}
            newState.userSkills = {...action.skills}
            return newState
        }
        default:
            return state;
    }
}
