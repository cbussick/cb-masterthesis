import { useContext } from "react";
import { CBExerciseSequenceSnackbarContext } from "./CBExerciseSequenceSnackbarProvider";

export const useExerciseSequenceSnackbar = () => {
  return useContext(CBExerciseSequenceSnackbarContext);
};
