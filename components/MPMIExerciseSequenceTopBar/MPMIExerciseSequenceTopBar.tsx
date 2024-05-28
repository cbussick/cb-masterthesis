"use client";

import { Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { MPMIExerciseTimer } from "../MPMIExerciseTimer/MPMIExerciseTimer";
import { MPMIProgressBar } from "../MPMIProgressBar/MPMIProgressBar";
import { MPMIExerciseSequenceTopBarProps } from "./MPMIExerciseSequenceTopBarInterfaces";

export const MPMIExerciseSequenceTopBar = forwardRef(
  (
    {
      title,
      currentExerciseIndex,
      completedExercisesAmount,
      totalExercisesAmount,
      type,
      sessionIsFinished,
      setCompletionTime,
    }: MPMIExerciseSequenceTopBarProps,
    ref,
  ): JSX.Element => {
    const currentExerciseNumber = currentExerciseIndex + 1;
    const showProgressBar = !sessionIsFinished;

    return (
      <Stack
        direction="row"
        justifyContent={sessionIsFinished ? "flex-end" : "space-between"}
        alignItems="flex-start"
        spacing={1}
      >
        {sessionIsFinished || (
          <Typography variant="h3">{`${currentExerciseNumber}. Aufgabe: ${title}`}</Typography>
        )}

        <Stack alignItems="flex-end">
          {showProgressBar && (
            <MPMIProgressBar
              currentValue={currentExerciseNumber + completedExercisesAmount}
              maxValue={totalExercisesAmount}
            />
          )}

          {type === MPMIExerciseSequenceType.ExamSimulator &&
            setCompletionTime && (
              <MPMIExerciseTimer
                setCompletionTime={setCompletionTime}
                ref={ref}
                isVisible
              />
            )}

          {type !== MPMIExerciseSequenceType.ExamSimulator &&
            setCompletionTime && (
              <MPMIExerciseTimer
                setCompletionTime={setCompletionTime}
                ref={ref}
                isVisible={false}
              />
            )}
        </Stack>
      </Stack>
    );
  },
);
