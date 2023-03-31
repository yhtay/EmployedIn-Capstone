import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkGetUserSkills, thunkDeleteSkillFromUser } from "../../../store/skills"
import { useModal } from "../../../context/Modal"
import "./DeleteSkillModal.css"


export default function DeleteSkillModal({ selectedUser }) {

    const dispatch = useDispatch();
    const userSkillsObj = useSelector(state => state.skills.userSkills)
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkGetUserSkills(+selectedUser.id))
    }, [dispatch])

    if (!userSkillsObj) return null;
    const userSkills = Object.values(userSkillsObj)
    console.log('newSkills: ', userSkills)


    const handleClick = async (e, skillId) => {
        e.preventDefault()

        await dispatch(thunkDeleteSkillFromUser(+selectedUser.id, +skillId))
            .then(() => dispatch(thunkGetUserSkills(+selectedUser.id)))
            .then(closeModal)
    }

    return (
        <div className="delete-skill-modal-div">
            <h2>Delete Skill</h2>
            <div className="user-skill-div">
                {
                    userSkills.length > 0 ? (userSkills.map(skill => (
                        <div
                            key={skill.id}
                            className='individual-skill-div'
                            onClick={e => handleClick(e, skill.id)}
                        >{skill.skill}</div>
                    )))
                    : (
                        <div>Please Add Skills</div>
                    )
                }
            </div>
        </div>
    )
}
