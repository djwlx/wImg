import axios from "axios";

export const baseURL = "http://localhost:3000/api";

const request = axios.create({
  baseURL,
});

export default request;
