"use client";

import { Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import { CBExerciseTimer } from "../../CBExerciseTimer/CBExerciseTimer";
import { CBProgressBar } from "../../CBProgressBar/CBProgressBar";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";
import { CBExerciseSequenceTopBarProps } from "./CBExerciseSequenceTopBarInterfaces";

export const CBExerciseSequenceTopBar = forwardRef(
  (
    {
      title,
      currentExerciseIndex,
      completedExercisesAmount,
      totalExercisesAmount,
      type,
      sessionIsFinished,
      setCompletionTime,
    }: CBExerciseSequenceTopBarProps,
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
            <CBProgressBar
              currentValue={currentExerciseNumber + completedExercisesAmount}
              maxValue={totalExercisesAmount}
            />
          )}

          {type === CBExerciseSequenceType.ExamSimulator &&
            setCompletionTime && (
              <CBExerciseTimer
                setCompletionTime={setCompletionTime}
                ref={ref}
                isVisible
              />
            )}

          {type !== CBExerciseSequenceType.ExamSimulator &&
            setCompletionTime && (
              <CBExerciseTimer
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

CBExerciseSequenceTopBar.displayName = "CBExerciseSequenceTopBar";
