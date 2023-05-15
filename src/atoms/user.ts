import { atom } from "recoil";

interface UserAtomState {
  name: string;
  email: string;
}

const userAtom = atom<UserAtomState>({
  key: "textState",
  default: {
    name: "",
    email: "",
  },
});

export default userAtom;
