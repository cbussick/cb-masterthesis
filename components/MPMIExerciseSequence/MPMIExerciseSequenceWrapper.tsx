import { CircularProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { MPMIExerciseSequence } from "./MPMIExerciseSequence";
import { MPMIExerciseSequenceWrapperProps } from "./MPMIExerciseSequenceWrapperInterfaces";
import { useMPMIExerciseSequence } from "./useMPMIExerciseSequenceProvider";

export const MPMIExerciseSequenceWrapper = ({
  type,
  exercises: originalExercises,
  onMistake,
  onCompleteHref,
  onCompleteExercise,
  onSequenceComplete,
  setCompletionTime,
  difficulty,
  onCancel,
}: MPMIExerciseSequenceWrapperProps): JSX.Element => {
  const {
    currentExerciseIndex,
    setCurrentExerciseIndex,
    setExercises,
    setType,
  } = useMPMIExerciseSequence();

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
        <MPMIExerciseSequence
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
