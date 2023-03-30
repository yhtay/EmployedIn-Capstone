import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import background from "../ProfileCard/graphic.jpeg"
import "./profile.css"


export default function UserProfileCard ({ user }) {

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
                <NavLink to={`/user/${user.id}`} className="profile-card-user-name">
                    {`${user.first_name} ${user.last_name}`}
                </NavLink>
                <div className="profile-card-user-education">
                    {`${user.education}`}
                </div>
            </div>
        </div>
    )
}
