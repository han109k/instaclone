/**
 ** Context API Provider
 */
import React, { useContext, useReducer } from "react";
import reducer from "./instant";
import { IconContext } from "react-icons";

const InstaContext = React.createContext();

const defaultAppState = {
  isAuthenticated: false,
  user: {}
};

function InstantProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultAppState);
  return (
    <InstaContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InstaContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(InstaContext);
};

export { InstantProvider };
