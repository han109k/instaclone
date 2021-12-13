import React from 'react';
import { useHistory, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/InstantProvider";
import { Menu } from "@headlessui/react";
import ApiCaller from "./api/ApiCaller";
// Resources
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// headlessUI component
export const HeaderDropDown = () => {
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
    <Menu as="div" className="relative inline-block text-left">
      <div className="mb-1">
        {/* className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" */}
        <Menu.Button>
          <img
            src={user.photo}
            alt="profile photo"
            className="inline-flex rounded-full justify-center border border-gray-500 shadow-sm"
            width="22px"
          />
        </Menu.Button>
      </div>
      {/* Menu items */}
      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <span
              onClick={() => handleSelection(`/${user.username}`)}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              <CgProfile
                size={15}
                style={{ display: "inline", marginRight: "0.7em" }}
              />
              <span>Profile</span>
            </span>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              <FiSettings
                size={15}
                style={{ display: "inline", marginRight: "0.7em" }}
              />
              <span>Settings</span>
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => {
                logOut();
              }}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block w-full text-left px-4 py-2 text-sm border"
              )}
            >
              Log out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
