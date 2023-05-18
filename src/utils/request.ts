import axios from "axios";

export const baseURL = "http://localhost:3000/api";

const request = axios.create({
  baseURL,
});

request.interceptors.request.use((request) => {
  // console.log(request, "request");
  return request;
});

request.interceptors.response.use((response) => {
  // console.log(response, "response");
  return response;
});

export default request;
