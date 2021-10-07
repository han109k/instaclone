import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { InstantProvider } from "./context/InstantProvider";

ReactDOM.render(
  <React.StrictMode>
    <InstantProvider>
      <App />
    </InstantProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
