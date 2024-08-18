"use client";

import { CBExerciseSequenceProvider } from "../../CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "../../CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "../../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { CBExamSimulatorSequenceProps } from "./CBExamSimulatorSequenceInterfaces";

export const CBExamSimulatorSequence = ({
  exercises,
  setExercises,
  onSequenceComplete,
  onCancel,
  beginTime,
}: CBExamSimulatorSequenceProps): JSX.Element => {
  return (
    <CBExerciseSequenceProvider
      type={CBExerciseSequenceType.ExamSimulator}
      beginTime={beginTime}
    >
      <CBExerciseSequenceWrapper
        exercises={exercises}
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
        onCancel={onCancel}
      />
    </CBExerciseSequenceProvider>
  );
};
