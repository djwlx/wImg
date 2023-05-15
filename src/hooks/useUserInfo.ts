import userAtom from "@/atoms/user";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useUserInfo = () => {
  const [info, setInfo] = useRecoilState(userAtom);

  useEffect(() => {
    setInfo({ name: "小明", email: "16029511127@qq.com" });
  }, []);

  return info;
};

export default useUserInfo;
