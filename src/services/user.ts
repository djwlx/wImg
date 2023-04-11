import request from "@/utils/request";

export const login = () => {
  return request("/login");
};

export const register = () => {
  return request("/register");
};
