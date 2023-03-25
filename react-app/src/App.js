import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import SplashPageNavigation from "./components/Navigation/SplashPageNavigation";
import SplashLoginPage from "./components/SplashLoginPage/SplashLoginPage";
import PostsPage from "./components/Posts/PostComponent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { thunkGetAllComments } from "./store/comments";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(thunkGetAllComments())

  }, [dispatch]);

  return (
    <>
      <SplashPageNavigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/"><SplashLoginPage /></Route>
          <Route path="/login" ><LoginFormPage /></Route>
          <Route path="/signup"><SignupFormPage /></Route>
          <Route path="/feed"><PostsPage /></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
