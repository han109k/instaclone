import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/InstantProvider";
import ApiCaller from "./api/ApiCaller";
// Components
import { HeaderDropDown } from "./HeaderDropDown";
// Resources
import Logo from "./imgs/insramtag.svg";
import { GrHomeRounded } from "react-icons/gr";
import { BsPlusSquare } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";

export const Header = () => {
  const { search, setSearch } = useState("");
  const { user, dispatch } = useGlobalContext();
  let navigate = useNavigate();

  const logOut = () => {
    ApiCaller.get("/accounts/logout")
      .then((res) => {
        console.log("@isAuth :", res);
        if (res.status === 200) {
          dispatch({ type: "AUTH", isAuth: false, user: "" });
          navigate("/");
        }
      })
      .catch((error) => console.error("@logOut :", error));
  };

  const handleSelection = (link) => {
    navigate(link);
  };

  return (
    <nav className="hidden sticky sm:flex flex-row flex-none justify-around border max-w-lg">
      {/* Logo */}
      <div className="flex-shrink-0 my-auto">
        <img src={Logo} alt="logo" width="110px" className="inline" />
      </div>
      {/* Search bar */}
      <div className="flex flex-shrink-0 my-auto justify-center border rounded-sm border-gray-300">
        <input
          type="search"
          name="search"
          value={search}
          placeholder="Search"
          className="text-xs bg-gray-50 my-auto border-none px-1 focus:ring-0"
        />
      </div>
      {/* Links */}
      <div className="flex flex-none my-auto justify-end">
        <span
          onClick={() => handleSelection("/")}
          className="pr-5 my-auto cursor-pointer"
        >
          <GrHomeRounded size={22} />
        </span>
        <span
          onClick={() => handleSelection("/upload")}
          className="pr-5 my-auto cursor-pointer"
        >
          <BsPlusSquare size={22} />
        </span>
        <span
          onClick={() => handleSelection("/explore")}
          className="pr-5 my-auto cursor-pointer"
        >
          <MdOutlineExplore size={22} />
        </span>
        {/* <span
            onClick={() => handleSelection(`/${user.username}`)}
            className="pr-5 underline"
          >
            {user.username}
          </span> */}
        {/* <span
            onClick={() => handleSelection("/accounts/register")}
            className="pr-5 underline"
          >
            Sign Up
          </span> */}
        {/* <span onClick={() => logOut()} className="underline">
            Log Out
          </span> */}
        <span>
          <HeaderDropDown />
        </span>
      </div>
    </nav>
  );
};
