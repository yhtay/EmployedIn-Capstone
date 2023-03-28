import { useSelector } from "react-redux"

import background from "../ProfileCard/graphic.jpeg"

export default function UserProfilePage () {

    const user = useSelector(state => state.session.user)

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
                    src={user.profile_image}
                    alt="profile-image"
                    />
                </div>
                <div className="user-info-bottom-div">
                    <div className="user-info-left-div">
                        <div className="user-info-name">{`${user.first_name} ${user.last_name}`}</div>
                        <div className="user-education">{`${user.education}`}</div>
                        <div className="user-location">{`${user.city}, ${user.state}, ${user.country}`}</div>
                    </div>
                    <div className="user-info-right-div">
                        <div className="education-icon-div">
                            <img
                                className="education-icon-img"
                                src={user.education_icon}
                                alt="education-icon"
                                />
                        <div>
                            <div className="user-education">{user.education}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="skills-container">
                <div className="skills-top-div"></div>
                <div className="skills-middle-div"></div>
                <div className="skills-bottom-div"></div>
            </div>
        </div>
    )
}
