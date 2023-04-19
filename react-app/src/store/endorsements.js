
// Constants
const GET_USER_RECEIVED_ENDORSEMENTS = 'endorsements/GET_USER_RECEIVED_ENDORSEMENTS'
const ADD_ENDORSEMENT_TO_SKILL = 'endorsements/ADD_ENDORSEMENTS_TO_SKILL'
const DELETE_ENDORSEMENT_FROM_SKILL = 'endorsements/DELETE_ENDORSEMENT_FROM_SKILL'

// Action Creators
const actionGetUserEndorsements = (endorsements) => ({
    type: GET_USER_RECEIVED_ENDORSEMENTS,
    endorsements
})

const actionAddEndorsementToSkill = (endorsement) => ({
    type: ADD_ENDORSEMENT_TO_SKILL,
    endorsement
})

const actionDeleteEndorsementFromSkill = (endorsement) => ({
    type: DELETE_ENDORSEMENT_FROM_SKILL,
    endorsement
})

// Thunk

export const thunkGetUserEndorsements = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/skills/endorsements`)

    if (response.ok) {
        const userEndorsements = await response.json()

        const normalizedEndorsements = {}
        userEndorsements.forEach(endorsement => {
            normalizedEndorsements[endorsement.id] = endorsement
        })
        dispatch(actionGetUserEndorsements(normalizedEndorsements))
        return normalizedEndorsements
    }
}

export const thunkAddEndorsementToSkill = (endorseeId, skillId, endorserId) => async (dispatch) => {
    const response = await fetch(`/api/users/${+endorseeId}/skills/${+skillId}/endorser/${+endorserId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            skill_id: +skillId,
            endorsee_id: +endorseeId,
            endorser_id: +endorserId
         })
    })
    if (response.ok) {
        const newEndorsement = await response.json()
        dispatch(actionAddEndorsementToSkill(newEndorsement))
        return newEndorsement
    }
}

export const thunkDeleteEndorsementFromSkill = (endorseeId, skillId, endorserId) => async (dispatch) => {
    const response = await fetch(`/api/users/${+endorseeId}/skills/${+skillId}/endorser/${+endorserId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        const result = await response.json()
        dispatch(actionDeleteEndorsementFromSkill({endorsementId: result.endorsement_id}))
        return result
    }
}

const initialState = {
    userReceivedEndorsements: {}
}

export default function endorsementsReducer (state=initialState, action) {

    switch (action.type) {
        case GET_USER_RECEIVED_ENDORSEMENTS: {
            const newState = {...state}
            newState.userReceivedEndorsements = {...action.endorsements}
            return newState
        }
        case ADD_ENDORSEMENT_TO_SKILL: {
            const newState = {...state}
            newState.userReceivedEndorsements = {...state.userReceivedEndorsements, ...action.endorsement}
            return newState
        }
        case DELETE_ENDORSEMENT_FROM_SKILL: {
            const newState = {...state}
            const { endorsementId } = action.endorsement;
            delete newState.userReceivedEndorsements[endorsementId]
            return newState
        }
        default:
            return state;
    }
}
