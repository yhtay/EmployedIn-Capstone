import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkGetUserSkills, thunkGetUserNewSkills, thunkAddSkillToUser } from "../../../store/skills"
import { useModal } from "../../../context/Modal"
import "./AddSkillModal.css"


export default function AddSkillModal({ selectedUser }) {

    const dispatch = useDispatch();
    const newSkillsObj = useSelector(state => state.skills.userNewSkills);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(thunkGetUserNewSkills(+selectedUser.id))
    }, [dispatch])

    if (!newSkillsObj) return null;
    const newSkills = Object.values(newSkillsObj)
    console.log('newSkills: ', newSkills)


    const handleClick = async (e, skillId) => {
        e.preventDefault()

        await dispatch(thunkAddSkillToUser(+selectedUser.id, +skillId))
            .then(() => dispatch(thunkGetUserSkills(+selectedUser.id)))
            .then(closeModal)
    }

    return (
        <div className="add-skill-modal-div">
            <h2>Add Skill</h2>
            <div className="new-skill-div">
                {
                    newSkills.map(skill => (
                        <div
                            key={skill.id}
                            className="individual-skill-div"
                            onClick={e => handleClick(e, skill.id)}
                        >{skill.skill}</div>
                    ))
                }
            </div>
        </div>
    )
}
