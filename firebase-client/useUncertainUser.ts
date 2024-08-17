import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useUncertainUser = () => {
  return useContext(UserContext);
};
