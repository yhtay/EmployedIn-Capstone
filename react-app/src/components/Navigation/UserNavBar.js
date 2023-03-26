import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import smallLogo from "../logos/smallLogo.png"


function UserNavBar({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	console.log("user in UserNav: ", sessionUser)

	return (
		<div className='splash-page-navbar'>
			<div className='logo-div'>
				<NavLink exact to="/">
					<img
						style={{
							marginTop: "4px",
							height: "40px",
							width: "58px",
							borderRadius: "5px"
						}}
						src={smallLogo}
						alt="logo"
					/>
				</NavLink>
			</div>
			<div className="profile-button-div">
			{isLoaded && (
				<li style={{ listStyle: "none" }}>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			</div>
		</div>
	);
}

export default UserNavBar;
