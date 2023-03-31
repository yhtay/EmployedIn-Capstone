import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkGetUserSkills } from "../../store/skills";
import AddSkillModal from "./AddSkill/AddSkillModal";
import AddSkillModalButton from "./AddSkill/AddSkillModalButton";
import DeleteSkillModal from "./DeleteSkill/DeleteSkillModal";
import DeleteSkillModalButton from "./DeleteSkill/DeleteSkillModalButton";
import "./SkillsComponent.css"


export default function SkillsComponent({ selectedUser, sessionUser }) {

    // console.log("user: ", user)
    const dispatch = useDispatch();
    const userSkillsObj = useSelector(state => state.skills.userSkills)

    useEffect(() => {
        dispatch(thunkGetUserSkills(+selectedUser.id))
    }, [dispatch])

    if (!userSkillsObj) return null
    const userSkills = Object.values(userSkillsObj)

    return (
        <div className="skills-container">
            <div className="skills-top-div">
                <div className="skills-title">Skills</div>
                    {sessionUser && +sessionUser.id === +selectedUser.id &&
                        <div className="skills-add-edit">
                            <AddSkillModalButton
                                buttonText="+"
                                modalComponent={<AddSkillModal selectedUser={selectedUser} />}
                            />
                            <DeleteSkillModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteSkillModal selectedUser={selectedUser} />}
                             />
                        </div>
                    }
            </div>
            <div className="skills-middle-div">
            {
                userSkills.length > 0 ? (userSkills.map(skill => (
                    <div className="individual-skill-list-div" key={skill.id}>
                        <div>{skill.skill}</div>
                    </div>
                )))
                : (<div>Show off your skills here</div>)
            }
            </div>
            <div className="skills-bottom-div">

            </div>
        </div>
    )
}
