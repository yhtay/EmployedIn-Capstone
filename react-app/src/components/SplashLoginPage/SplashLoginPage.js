import React, {useState, useEffect} from 'react'
import { login } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, NavLink } from "react-router-dom";
import PostsPage from '../Posts/PostComponent';
import "./SplashLoginPage.css"
import SplashPageImage from  "./SplashLoginImages/linkedin-splashpage-img.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'



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
				<div className='login-error-div'>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</div>
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
		<div className='splashpage-footer'>
			<div className='github-linkedin-icons-container'>
				<div style={{ display: "flex", alignItems: "center", color: "rgb(74,129,131)", fontWeight: "800" }}>Developer </div>
				<div>
					<NavLink to={{ pathname: "https://github.com/yhtay" }}>
						<FontAwesomeIcon icon={faGithub} className="github-linkedin-icons" />
					</NavLink>
				</div>
				<div>
					<NavLink to={{pathname: "https://www.linkedin.com/in/williamhtay/"}}>
						<FontAwesomeIcon icon={faLinkedin} className="github-linkedin-icons" />
					</NavLink>
				</div>
			</div>
		</div>
	</div>
	)
}
