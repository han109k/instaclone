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

function App() {
  const { isAuthenticated, dispatch } = useGlobalContext();

  const isAuth = async () => {
    ApiCaller.get("/accounts/verify")
      .then((res) => {
        console.log("@isAuth :", res);
        res.status === 200
          ? dispatch({ type: "AUTH", payload: true })
          : dispatch({ type: "AUTH", payload: false });
      })
      .catch((error) => console.error(error));
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
        <Route exact path="/accounts/register" component={Register} />
        <Route exact path="/accounts/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
