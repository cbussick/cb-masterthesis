import { useContext } from "react";
import { CBExerciseSequenceContext } from "./CBExerciseSequenceProvider";

export const useCBExerciseSequence = () => {
  const context = useContext(CBExerciseSequenceContext);

  return context;
};
