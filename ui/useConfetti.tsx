import { useContext } from "react";
import { MPMIConfettiContext } from "./MPMIConfettiProvider";

export const useConfetti = () => {
  const context = useContext(MPMIConfettiContext);

  return context;
};
