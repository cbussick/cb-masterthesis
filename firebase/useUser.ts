import { useContext } from "react";
import { UserContext } from "./UserProvider";

export const useUser = () => {
  const context = useContext(UserContext);

  return context;
};
