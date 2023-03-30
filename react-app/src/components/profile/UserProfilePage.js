import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetAllUsers } from "../../store/session";


import background from "../ProfileCard/graphic.jpeg"

export default function UserProfilePage () {

    const { userId } = useParams();
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.session.allUsers)

    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    if (!allUsers) return null

    const selectedUser = allUsers[userId]

    return (
        <div className="profile-page-main-container">
            <div className="profile-page-user-info-container">
                <div className="background-image-div">
                    <img
                        className="profile-background-img"
                        src={background}
                        alt="profile-background"
                        />
                </div>
                <div>
                <img
                    className="profile-page-user-img"
                    src={selectedUser.profile_image}
                    alt="profile-image"
                    />
                </div>
                <div className="user-info-bottom-div">
                    <div className="user-info-left-div">
                        <div className="user-info-name">{`${selectedUser.first_name} ${selectedUser.last_name}`}</div>
                        <div className="user-education">{`${selectedUser.education}`}</div>
                        <div className="user-location">{`${selectedUser.city}, ${selectedUser.state}, ${selectedUser.country}`}</div>
                    </div>
                    <div className="user-info-right-div">
                        <div className="education-icon-div">
                            <img
                                className="education-icon-img"
                                src={selectedUser.education_icon}
                                alt="education-icon"
                                />
                        <div>
                            <div className="user-education">{selectedUser.education}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="skills-container">
                <div className="skills-top-div">
                    <div>Skills</div>
                    <div className="skills-add-edit">
                        <div>+</div>
                        <div>edit</div>
                    </div>
                </div>
                <div className="skills-middle-div">

                </div>
                <div className="skills-bottom-div">

                </div>
            </div>
        </div>
    )
}
