import { StateContext } from "@/layout";
import { useContext } from "react";

const useUserInfo = () => {
  const { userInfo } = useContext(StateContext);

  return userInfo;
};

export default useUserInfo;
