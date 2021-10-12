import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/InstantProvider";
import ApiCaller from "./api/ApiCaller";

export const Header = () => {
  const { username, dispatch } = useGlobalContext();
  let history = useHistory();

  const logOut = () => {
    ApiCaller.get("/accounts/logout")
      .then((res) => {
        console.log("@isAuth :", res);
        if(res.status === 200) {
          dispatch({ type: "AUTH", isAuth: false, user: ''})
          history.push("/")
        }
      })
      .catch((error) => console.error("@logOut :", error));
  };

  const handleSelection = (link) => {
    history.push(link);
  };

  return (
    <div className="h-11 w-screen border pt-2 pl-5">
      <span onClick={() => handleSelection("/")} className="pr-5 underline">
        Insramtag
      </span>
      <span
        onClick={() => handleSelection("/upload")}
        className="pr-5 underline"
      >
        Upload
      </span>
      <span
        onClick={() => handleSelection("/username")}
        className="pr-5 underline"
      >
        {username}
      </span>
      <span
        onClick={() => handleSelection("/accounts/register")}
        className="pr-5 underline"
      >
        Sign Up
      </span>
      <span onClick={() => logOut()} className="underline">
        Log Out
      </span>
    </div>
  );
};
