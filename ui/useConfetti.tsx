import { useContext } from "react";
import { CBConfettiContext } from "./CBConfettiProvider";

export const useConfetti = () => {
  return useContext(CBConfettiContext);
};
