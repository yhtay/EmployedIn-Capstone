import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupFormPage.css"

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, education, city, state, country, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <div className="signup-page-container">
        <div className="signup-title-div">Make the most of your professional life</div>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="label-input-div">
          <ul style={{ color: "red", listStyle: "none", alignSelf: "center", fontSize: "12px" }}>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <div>First Name</div>
            <input
              type="text"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="label-input-div">
            <div>Last Name</div>
            <input
              type="text"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="label-input-div">
            <div>Email</div>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="label-input-div">
            <div>Education</div>
            <input
              type="text"
              className="input-field"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
          </div>

          <div className="city-state-div">
            <div className="label-input-div">
              <div>City</div>
              <input
                type="text"
                style={{ height: '40px', width: '225px'}}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="label-input-div">
              <div>State:</div>
                <input
                  type="text"
                  style={{ height: '40px', width: "125px"}}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
            </div>
          </div>
          <div className="label-input-div">
            <div>Country</div>
              <input
                type="text"
                className="input-field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
          </div>
          {/* <div>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div> */}
          <div className="label-input-div">
            <div>Password</div>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="label-input-div">
            <div>Confirm Password</div>
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="sign-up" type="submit">Sign Up</button>
        </form>
        <div style={{ margin: "15px" }}>Already on EmployedIn?
          <NavLink style={{ textDecoration: "none", color: "rgb(74,129,131)" }} to="/"> Sign In</NavLink>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
