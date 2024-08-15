"use client";

import { CBExerciseSequenceProvider } from "../../CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "../../CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { CBExamSimulatorSequenceProps } from "./CBExamSimulatorSequenceInterfaces";

export const CBExamSimulatorSequence = ({
  originalExercises,
  setExercises,
  onSequenceComplete,
  setCompletionTime,
  onCancel,
}: CBExamSimulatorSequenceProps): JSX.Element => {
  return (
    <CBExerciseSequenceProvider type={CBExerciseSequenceType.ExamSimulator}>
      <CBExerciseSequenceWrapper
        type={CBExerciseSequenceType.ExamSimulator}
        exercises={originalExercises}
        onCompleteExercise={(params: {
          exerciseId: string;
          isCorrect: boolean;
        }) => {
          setExercises((prevExercises) => {
            const originalExerciseIndex = prevExercises.findIndex(
              (e) => e.id === params.exerciseId,
            );

            const updatedExercises = [...prevExercises];
            updatedExercises[originalExerciseIndex] = {
              ...prevExercises[originalExerciseIndex],
              isCorrect: params.isCorrect,
            };

            return updatedExercises;
          });
        }}
        onSequenceComplete={onSequenceComplete}
        setCompletionTime={setCompletionTime}
        onCancel={onCancel}
      />
    </CBExerciseSequenceProvider>
  );
};
