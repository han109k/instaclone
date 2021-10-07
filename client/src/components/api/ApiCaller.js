import axios from "axios";

const baseURL = (process.env.NODE_ENV === "production"
  ? "/v1"
  : "http://localhost:5000/v1");

export default axios.create({
  withCredentials: true,
  baseURL,
});
