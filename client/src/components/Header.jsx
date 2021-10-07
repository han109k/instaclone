import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/InstantProvider";
import ApiCaller from "./api/ApiCaller";

export const Header = () => {
  const { dispatch } = useGlobalContext();
  let history = useHistory();

  const logOut = () => {
    ApiCaller.get("/accounts/logout")
      .then((res) => {
        console.log("@isAuth :", res);
        res.status === 200
          ? dispatch({ type: "AUTH", payload: false })
          : dispatch({ type: "AUTH", payload: true });
      })
      .catch((error) => console.error(error));
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
