import { useContext } from "react";
import { CBExerciseSequenceSnackbarContext } from "./CBExerciseSequenceSnackbarProvider";

export const useCBExerciseSequenceSnackbar = () => {
  return useContext(CBExerciseSequenceSnackbarContext);
};
