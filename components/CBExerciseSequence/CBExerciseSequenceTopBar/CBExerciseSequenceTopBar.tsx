"use client";

import { Stack, Typography } from "@mui/material";
import { forwardRef } from "react";
import { CBExerciseTimer } from "../../CBExerciseTimer/CBExerciseTimer";
import { CBProgressBar } from "../../CBProgressBar/CBProgressBar";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "../useCBExerciseSequenceProvider";
import { CBExerciseSequenceTopBarProps } from "./CBExerciseSequenceTopBarInterfaces";

export const CBExerciseSequenceTopBar = forwardRef(
  (
    {
      title,
      currentExerciseIndex,
      completedExercisesAmount,
      totalExercisesAmount,
      isSequenceFinished,
      setCompletionTime,
    }: CBExerciseSequenceTopBarProps,
    ref,
  ): JSX.Element => {
    const { type } = useCBExerciseSequence();

    const currentExerciseNumber = currentExerciseIndex + 1;
    const showProgressBar = !isSequenceFinished;

    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: isSequenceFinished ? "flex-end" : "space-between",
          alignItems: "flex-start",
        }}
      >
        {isSequenceFinished || (
          <Typography variant="h3">{`${currentExerciseNumber}. Aufgabe: ${title}`}</Typography>
        )}

        <Stack
          sx={{
            alignItems: "flex-end",
          }}
        >
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
