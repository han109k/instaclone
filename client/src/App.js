import React, { useState, useEffect, Component } from "react";
import { useGlobalContext } from "./context/InstantProvider";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ApiCaller from "./components/api/ApiCaller";

// Components
import Home from "./components/Home";
import CloudinaryForm from "./components/accounts/Cloudinary";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import UserPage from "./components/user/UserPage";

function App() {
  const { isAuthenticated, user, dispatch } = useGlobalContext();

  const isAuth = async () => {
    console.log(isAuthenticated);
    if (user.username) {
      ApiCaller.get("/accounts/verified")
        .then((res) => {
          console.log("@isAuth :", res);
          if (res.status === 200) dispatch({ type: "AUTH", isAuth: true });
        })
        .catch((error) => {
          error.response
            ? console.log(error.response.data.message)
            : console.log("No response @isAuth()");
        });
    } else {
      ApiCaller.get("/accounts/verify")
        .then((res) => {
          console.log("@isAuth :", res);
          if (res.status === 200)
            dispatch({ type: "VERIFY", isAuth: true, user: res.data.user });
        })
        .catch((error) => {
          error.response
            ? console.log(error.response.data.message)
            : console.log("No response @isAuth()");
        });
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Home />} />
        <Route path="/upload" element={CloudinaryForm} />
        <Route
          path="/accounts/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/accounts/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route path={`:${user.username}`} element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
