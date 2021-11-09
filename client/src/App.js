import React, { useState, useEffect, Component } from "react";
import { useGlobalContext } from "./context/InstantProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ApiCaller from "./components/api/ApiCaller";

// Components
import Home from "./components/Home";
import CloudinaryForm from "./components/accounts/Cloudinary";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import UserPage from "./components/user/UserPage";

function App() {
  const { isAuthenticated, username, dispatch } = useGlobalContext();

  const isAuth = async () => {
    console.log(isAuthenticated);
    ApiCaller.get("/accounts/verify")
      .then((res) => {
        console.log("@isAuth :", res);
        if (res.status === 200) dispatch({ type: "AUTH", isAuth: true, user: res.data.user});
      })
      .catch((error) => {
        error.response ? console.log(error.response.data.message) : console.log("No response @isAuth()");
      });
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!isAuthenticated ? <Login /> : <Home />}
        </Route>
        <Route exact path="/upload" component={CloudinaryForm} />
        <Route exact path="/accounts/register">
          {!isAuthenticated ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/accounts/login">
          {!isAuthenticated ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path={`/${username}`} component={UserPage}/>
      </Switch>
    </Router>
  );
}

export default App;
