import { CBExerciseSequenceSnackbarProvider } from "@/ui/CBExerciseSequenceSnackbarProvider";
import { CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { CBExerciseSequence } from "./CBExerciseSequence";
import { CBExerciseSequenceWrapperProps } from "./CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "./useCBExerciseSequenceProvider";

export const CBExerciseSequenceWrapper = ({
  exercises: originalExercises,
  onMistake,
  onCompleteHref,
  onCompleteExercise,
  onSequenceComplete,
  difficulty,
  onCancel,
}: CBExerciseSequenceWrapperProps): JSX.Element => {
  const { currentExerciseIndex, setExercises } = useCBExerciseSequence();

  useEffect(() => {
    setExercises(originalExercises || []);
  }, [originalExercises, setExercises]);

  return useMemo(
    () =>
      originalExercises ? (
        <CBExerciseSequenceSnackbarProvider>
          <CBExerciseSequence
            originalExercises={originalExercises}
            currentExerciseIndex={currentExerciseIndex}
            onMistake={onMistake}
            onCompleteHref={onCompleteHref}
            onCompleteExercise={onCompleteExercise}
            onSequenceComplete={onSequenceComplete}
            difficulty={difficulty}
            onCancel={onCancel}
          />
        </CBExerciseSequenceSnackbarProvider>
      ) : (
        <CircularProgress />
      ),
    [
      currentExerciseIndex,
      difficulty,
      onCancel,
      onCompleteExercise,
      onCompleteHref,
      onMistake,
      onSequenceComplete,
      originalExercises,
    ],
  );
};
