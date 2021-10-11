import axios from "axios";

const baseURL = (process.env.NODE_ENV === "production"
  ? "/v1"
  : "http://localhost:5000/v1");

export default axios.create({
  // This is needed for passing HTTP-only cookies to express server
  withCredentials: true,
  baseURL,
});
