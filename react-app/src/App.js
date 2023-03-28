import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import SplashPageNavigation from "./components/Navigation/SplashPageNavigation";
import SplashLoginPage from "./components/SplashLoginPage/SplashLoginPage";
import PostsPage from "./components/Posts/PostComponent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfilePage from "./components/profile/UserProfilePage";
import { thunkGetAllComments } from "./store/comments";
// import { thunkGetAllUsers } from "./store/session";
import UserNavBar from "./components/Navigation/UserNavBar";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    // dispatch(thunkGetAllUsers())
    dispatch(thunkGetAllComments())
  }, [dispatch]);

  return (
    <>
      {sessionUser ? <UserNavBar isLoaded={isLoaded} /> :<SplashPageNavigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/"><SplashLoginPage /></Route>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
          <Route path="/feed"><PostsPage /></Route>
          <Route path="/user/:userId"><UserProfilePage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
