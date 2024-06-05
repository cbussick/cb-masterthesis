"use client";

import { MPMIExerciseSequenceProvider } from "../../MPMIExerciseSequence/MPMIExerciseSequenceProvider";
import { MPMIExerciseSequenceWrapper } from "../../MPMIExerciseSequence/MPMIExerciseSequenceWrapper";
import { MPMIExerciseSequenceType } from "../../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { MPMIExamSimulatorSequenceProps } from "./MPMIExamSimulatorSequenceInterfaces";

export const MPMIExamSimulatorSequence = ({
  originalExercises,
  setExercises,
  onSequenceComplete,
  setCompletionTime,
  onCancel,
}: MPMIExamSimulatorSequenceProps): JSX.Element => {
  return (
    <MPMIExerciseSequenceProvider>
      <MPMIExerciseSequenceWrapper
        type={MPMIExerciseSequenceType.ExamSimulator}
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
    </MPMIExerciseSequenceProvider>
  );
};
