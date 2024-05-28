import { useContext } from "react";
import { MPMIExerciseSequenceContext } from "./MPMIExerciseSequenceProvider";

export const useMPMIExerciseSequence = () => {
  const context = useContext(MPMIExerciseSequenceContext);

  return context;
};
