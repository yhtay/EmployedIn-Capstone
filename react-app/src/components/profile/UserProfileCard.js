import { useSelector } from "react-redux"

import background from "../ProfileCard/graphic.jpeg"
import "./profile.css"


export default function UserProfileCard () {

    const user = useSelector(state => state.session.user)
    console.log("user: ", user)

    return (
        <div className="user-profile-card">
            <div className="profile-background-div">
                <img
                    className="profile-background-img"
                    src={background}
                    alt="profile-background"
                    />
            </div>
            <img
                className="profile-card-user-img"
                src={user.profile_image}
                alt="profile-image"
                />
            <div className="profile-card-bottom-div">
                <div className="profile-card-user-name">
                    {`${user.first_name} ${user.last_name}`}
                </div>
                <div className="profile-card-user-education">
                    {`${user.education}`}
                </div>
            </div>
        </div>
    )
}
