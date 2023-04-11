import { useContext } from "react";
import { StateContext } from "@/index";

const useUserInfo = () => {
  const { userInfo } = useContext(StateContext);

  return userInfo;
};

export default useUserInfo;
