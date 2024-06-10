import { useContext } from "react";
import { MPMIConfettiContext } from "./MPMIConfettiProvider";

export const useConfetti = () => {
  return useContext(MPMIConfettiContext);
};
