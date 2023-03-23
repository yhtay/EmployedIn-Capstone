import React, {useState, useEffect} from 'react'
import { login } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import PostsPage from '../Posts/PostComponent';
import "./SplashLoginPage.css"
import SplashPageImage from  "./SplashLoginImages/linkedin-splashpage-img.svg"



export default function SplashLoginPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/feed" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
			if (data) {
		setErrors(data);
		}
	};

	const handleDemoSubmit = async (e) => {
		e.preventDefault()
		await dispatch(login('messi10@baca.com', 'Messi10'))
		return <Redirect to="/feed" />
	}

	return (
	<div>

		<div className='splashpage-form-image-div'>
			<form
				className='splash-login-form'
				onSubmit={handleSubmit}>
				<h2>Welcome to your professional community</h2>
				<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<div>
				<div>Email</div>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<div>Password</div>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
				<button

					className="sign-in-button"
					type="submit">
					Sign In</button>
				<button
					className="demo-user-button"
					onClick={handleDemoSubmit}
					>
					Demo User
				</button>
			</form>
			<img
				style={{ height: "500px", width: "500px" }}
				src={SplashPageImage}
				alt="image"
			/>
		</div>
	</div>
	)

}
