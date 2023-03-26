import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function UserNavBar({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	console.log("user in UserNav: ", sessionUser)

	return (
		<div className='splash-page-navbar'>
			<div className='logo-div'>
				<NavLink exact to="/">EmployedInSmall Logo</NavLink>
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
