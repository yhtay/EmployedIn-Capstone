import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../logos/EmployedInLogo.png'
import logo2 from '../logos/EmployedInLogo2.png'


function SplashPageNavigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='splash-page-navbar'>
			<div className='logo-div'>
				<NavLink exact to="/">
					<img
						style={{
							marginTop: "7px",
							height: "40px",
							width: "auto",
							borderRadius: "5px"
						}}
						src={logo2}
						alt="logo"
					/>
				</NavLink>
			</div>
			<div className='login-signup-div'>
				{/* <NavLink className="navbar-login" exact to="/">Log In</NavLink> */}
				<NavLink className="navbar-signup" to="/signup">Sign Up</NavLink>
			{/* {isLoaded && (
				<li style={{ listStyle: "none" }}>
					<ProfileButton user={sessionUser} />
				</li>
			)}*/}
			</div>
		</div>
	);
}

export default SplashPageNavigation;
