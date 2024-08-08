import { CBExerciseSequenceSnackbarProvider } from "@/ui/CBExerciseSequenceSnackbarProvider";
import { CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { CBExerciseSequence } from "./CBExerciseSequence";
import { CBExerciseSequenceWrapperProps } from "./CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "./useCBExerciseSequenceProvider";

export const CBExerciseSequenceWrapper = ({
  type,
  exercises: originalExercises,
  onMistake,
  onCompleteHref,
  onCompleteExercise,
  onSequenceComplete,
  setCompletionTime,
  difficulty,
  onCancel,
}: CBExerciseSequenceWrapperProps): JSX.Element => {
  const {
    currentExerciseIndex,
    setCurrentExerciseIndex,
    setExercises,
    setType,
  } = useCBExerciseSequence();

  useEffect(() => {
    setCurrentExerciseIndex(0);
  }, [setCurrentExerciseIndex]);

  useEffect(() => {
    setExercises(originalExercises || []);
  }, [originalExercises, setExercises]);

  useEffect(() => {
    setType(type);
  }, [setType, type]);

  return useMemo(
    () =>
      originalExercises ? (
        <CBExerciseSequenceSnackbarProvider>
          <CBExerciseSequence
            type={type}
            originalExercises={originalExercises}
            currentExerciseIndex={currentExerciseIndex}
            onMistake={onMistake}
            onCompleteHref={onCompleteHref}
            onCompleteExercise={onCompleteExercise}
            onSequenceComplete={onSequenceComplete}
            setCompletionTime={setCompletionTime}
            difficulty={difficulty}
            onCancel={onCancel}
          />
        </CBExerciseSequenceSnackbarProvider>
      ) : (
        <CircularProgress />
      ),
    [
      originalExercises,
      type,
      currentExerciseIndex,
      onMistake,
      onCompleteHref,
      onCompleteExercise,
      onSequenceComplete,
      setCompletionTime,
      difficulty,
      onCancel,
    ],
  );
};
