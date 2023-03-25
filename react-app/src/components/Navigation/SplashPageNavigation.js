import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SplashPageNavigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='splash-page-navbar'>
			<div className='logo-div'>
				<NavLink exact to="/">EmployedIn</NavLink>
			</div>
			<div className='login-signup-div'>
				{/* <NavLink className="navbar-login" exact to="/">Log In</NavLink> */}
				<NavLink className="navbar-signup" to="/signup">Sign Up</NavLink>
			{isLoaded && (
				<li style={{ listStyle: "none" }}>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			</div>
		</div>
	);
}

export default SplashPageNavigation;
