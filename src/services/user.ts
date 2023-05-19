import request from "@/utils/request";

export const login = (data: any) => {
  return request.post("/login", data);
};

export const register = () => {
  return request("/register");
};
