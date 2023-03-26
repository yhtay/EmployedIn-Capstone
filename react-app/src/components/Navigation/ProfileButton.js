import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)


  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout())
    history.push('/')


  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-image-me" onClick={openMenu}>
        <img
          className="navbar-profile-img"
          src={user.profile_image}
          alt="user_profile"
          />
        <div style={{ color: "rgb(74,129,131)"}}>Me <FontAwesomeIcon icon={faCaretDown} /></div>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-dropdown-div">
            <div className="user-dropdown-div-1">
              <img
                className="dropdown-profile-img"
                src={user.profile_image}
                alt="user_profile"
                />
              <div style={{ gap: "2px"}}>
                <div>{`${user.first_name} ${user.last_name}`}</div>
                <div>{`${user.education}`}</div>

              </div>
            </div>
            <hr style={{ border: "0.1px solid gray" }}></hr>
            <div
              className="dropdown-signout-div"
              onClick={handleLogout}>
              Sign Out
            </div>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
