import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkGetUserSkills } from "../../store/skills";
import { thunkAddEndorsementToSkill, thunkGetUserEndorsements, thunkDeleteEndorsementFromSkill } from "../../store/endorsements";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import AddSkillModal from "./AddSkill/AddSkillModal";
import AddSkillModalButton from "./AddSkill/AddSkillModalButton";
import DeleteSkillModal from "./DeleteSkill/DeleteSkillModal";
import DeleteSkillModalButton from "./DeleteSkill/DeleteSkillModalButton";
import "./SkillsComponent.css"



export default function SkillsComponent({ selectedUser, sessionUser, userId }) {

    const dispatch = useDispatch();
    const userSkillsObj = useSelector(state => state.skills.userSkills)
    const userEndorsementsObj = useSelector(state => state.endorsements.userReceivedEndorsements)
    const [endorsed, setEndorsed] = useState({});


    useEffect(() => {
        dispatch(thunkGetUserSkills(+selectedUser.id))
        dispatch(thunkGetUserEndorsements(+userId))
    }, [dispatch])

    if (!userSkillsObj) return null
    if (!userEndorsementsObj) return null

    const userSkills = Object.values(userSkillsObj)
    const userEndorsements = Object.values(userEndorsementsObj)

    const endorsementCount = (userEndorsements, skillId) => {
        let endorsementbySkillId = userEndorsements.filter(endorsement => {
            return endorsement?.skill?.id === +skillId
        })
        return endorsementbySkillId.length
    }

    const checkEndorsementExist = (endorserId, skillId) => {
        return userEndorsements.some(endorsement =>
            endorsement?.endorser?.id === +endorserId &&
            endorsement?.skill?.id === +skillId);
    }

    const handleAddEndorsement = async (e, skillId) => {
        e.preventDefault()

        await dispatch(thunkAddEndorsementToSkill(+userId, +skillId, +sessionUser.id ))
            .then(() => {
                dispatch(thunkGetUserEndorsements(+userId));
                setEndorsed(prevEndorsed => ({
                    ...prevEndorsed,
                    [+skillId]: checkEndorsementExist(+sessionUser.id, +skillId)
                }));
            });
    }

    const handleDeleteEndorsement = async (e, skillId) => {
        await dispatch(thunkDeleteEndorsementFromSkill(+userId, +skillId, +sessionUser.id ))
            .then(() => {
                dispatch(thunkGetUserEndorsements(+userId));
                setEndorsed(prevEndorsed => ({
                    ...prevEndorsed,
                    [+skillId]: checkEndorsementExist(+sessionUser.id, +skillId)
                }));
            });
    }

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
                    userSkills.length > 0 ? (userSkills.map(skill => {
                        const isEndorsed = endorsed[+skill.id] || checkEndorsementExist(+sessionUser.id, +skill.id);
                        return (
                            <div className="individual-skill-list-div" key={skill.id}>
                            <div>{skill.skill}</div>
                            <div>
                                {
                                endorsementCount(userEndorsements, +skill.id) > 0
                                    ? endorsementCount(userEndorsements, +skill.id) === 1
                                        ? <div><FontAwesomeIcon icon={faUserGroup} /> {`${endorsementCount(userEndorsements, +skill.id)} endorsement`}</div>
                                        : <div><FontAwesomeIcon icon={faUserGroup} /> {`${endorsementCount(userEndorsements, +skill.id)} endorsements`}</div>
                                : ""
                                }
                            </div>

                                {sessionUser && +sessionUser.id !== +userId && (
                                    <>
                                        {checkEndorsementExist(+sessionUser.id, +skill.id) ? (
                                            <div>
                                                <button
                                                    onClick={(e) => handleDeleteEndorsement(e, +skill.id)}
                                                    className="endorsement-button"
                                                    >
                                                    <FontAwesomeIcon icon={faCheck} /> Endorsed
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={(e) => handleAddEndorsement(e, +skill.id)}
                                                    className="endorsement-button"
                                                    >
                                                    Endorse
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    }))
                    : (<div>Show off your skills here</div>)
                }
            </div>
            <div className="skills-bottom-div">

            </div>
        </div>
    )
}
