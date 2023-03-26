import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import { thunkGetAllComments } from '../../store/comments';
// import { thunkGetAllUsers } from '../../store/session';
import smallLogo from "../logos/smallLogo.png"


function UserNavBar({ isLoaded }){

	const sessionUser = useSelector(state => state.session.user)
	// const dispatch = useDispatch();
	// const allUsers = useSelector(state => state.allUsers)
	// const allComments = useSelector(state => state.comments.allComments)

	// useEffect(() => {
	// 	dispatch(thunkGetAllUsers())
    // 	dispatch(thunkGetAllComments())
	// }, [dispatch])



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
