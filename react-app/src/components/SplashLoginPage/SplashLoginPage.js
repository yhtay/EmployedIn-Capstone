import React, {useState, useEffect} from 'react'
import { login } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import PostsPage from '../Posts/PostComponent';
import "./SplashLoginPage.css"
import SplashPageImage from  "./SplashLoginImages/linkedin-splashpage-img.svg"



export default function SplashLoginPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const history = useHistory();

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
				<div className='splashpage-title'>Welcome to your professional community</div>
				<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<div>
				<div className='label-div'>Email</div>
				<input
					type="text"
					className='input-field'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<div className='label-div'>Password</div>
				<input
					type="password"
					className='input-field'
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

				<button
					className="sign-up-button"
					onClick={() => history.push("/signup")}
					>
					New to EmployedIn? Join now</button>
			</form>
			<img
				style={{ height: "700px", width: "800px" }}
				src={SplashPageImage}
				alt="image"
			/>
		</div>
	</div>
	)

}
