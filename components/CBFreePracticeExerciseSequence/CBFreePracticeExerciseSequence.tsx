"use client";

import { exercisesData } from "@/data/exercises/CBExercise";
import { CBRoute } from "@/helpers/routes";
import { Stack, Typography } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";
import { CBContentErrorMessage } from "../CBContentErrorMessage/CBContentErrorMessage";
import { CBContentLoadingIndicator } from "../CBContentLoadingIndicator/CBContentLoadingIndicator";
import { CBContentWrapper } from "../CBContentWrapper/CBContentWrapper";
import { CBExerciseSequenceProvider } from "../CBExerciseSequence/CBExerciseSequenceProvider";
import { CBExerciseSequenceWrapper } from "../CBExerciseSequence/CBExerciseSequenceWrapper";
import { CBExerciseSequenceType } from "../CBExerciseSequence/CBExerciseSequenceWrapperInterfaces";
import { CBPageHeader } from "../CBPageHeader/CBPageHeader";
import { CBFreePracticeExerciseSequenceProps } from "./CBFreePracticeExerciseSequenceInterfaces";

export const CBFreePracticeExerciseSequence = ({
  exercises,
  topic,
  exerciseType,
  onMistake,
  onCompleteExercise,
  onSequenceComplete,
  beginTime,
  requestStatus,
  errorMessage,
}: CBFreePracticeExerciseSequenceProps): JSX.Element => {
  const subtitle = exerciseType
    ? exercisesData[exerciseType].name
    : "Fehler Wiederholung";

  const onCompleteHref = `${CBRoute.FreieUebung}/${topic}`;

  const contentMap: Record<UseQueryResult["status"], JSX.Element> = {
    pending: <CBContentLoadingIndicator />,
    success: (
      <CBExerciseSequenceProvider
        type={
          exerciseType
            ? CBExerciseSequenceType.FreePractice
            : CBExerciseSequenceType.RetryMistakes
        }
        beginTime={beginTime}
      >
        <CBExerciseSequenceWrapper
          exercises={exercises}
          onMistake={onMistake}
          onCompleteHref={onCompleteHref}
          onCompleteExercise={onCompleteExercise}
          onSequenceComplete={onSequenceComplete}
        />
      </CBExerciseSequenceProvider>
    ),
    error: <CBContentErrorMessage message={errorMessage || ""} />,
  };

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack
        spacing={1}
        sx={{
          height: "100%",
        }}
      >
        <CBPageHeader
          title={<Typography variant="h2">{subtitle}</Typography>}
        />

        {requestStatus ? contentMap[requestStatus] : contentMap.success}
      </Stack>
    </CBContentWrapper>
  );
};
