import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context/InstantProvider";
import ApiCaller from "./api/ApiCaller";
// Components
import HeaderDropDown from "./HeaderDropDown";
// Resources
import Logo from "./imgs/insramtag.svg";
import { GrHomeRounded } from "react-icons/gr";
import { BsPlusSquare } from "react-icons/bs";

export const Header = () => {
  const { search, setSearch } = useState("");
  const { username, dispatch } = useGlobalContext();
  let history = useHistory();

  const logOut = () => {
    ApiCaller.get("/accounts/logout")
      .then((res) => {
        console.log("@isAuth :", res);
        if (res.status === 200) {
          dispatch({ type: "AUTH", isAuth: false, user: "" });
          history.push("/");
        }
      })
      .catch((error) => console.error("@logOut :", error));
  };

  const handleSelection = (link) => {
    history.push(link);
  };

  return (
    <nav className="hidden sticky sm:flex border">
      <div className="flex flex-row flex-initial my-2 w-8/12 h-10 mx-auto">
        {/* Logo */}
        <div className="flex flex-shrink-0 w-4/12 my-auto justify-center mr-5">
          <img src={Logo} alt="logo" width="110px" className="inline" />
        </div>
        {/* Search bar */}
        <div className="flex flex-shrink-0 my-1 justify-center border rounded-sm border-gray-300">
          <input
            type="search"
            name="search"
            value={search}
            placeholder="Search"
            className="text-xs bg-gray-50 my-auto border-none px-1 focus:ring-0"
          />
        </div>
        {/* Links */}
        <div className="flex flex-none w-5/12 my-auto justify-end">
          <span
            onClick={() => handleSelection("/")}
            className="pr-5 my-auto cursor-pointer"
          >
            <GrHomeRounded size={22} fontWeight={200}/>
          </span>
          <span
            onClick={() => handleSelection("/upload")}
            className="pr-5 my-auto cursor-pointer"
          >
            <BsPlusSquare size={22} />
          </span>
          <span
            onClick={() => handleSelection(`/${username}`)}
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
          <span>
            <HeaderDropDown />
          </span>
        </div>
      </div>
    </nav>
  );
};
