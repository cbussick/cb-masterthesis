"use client";

import { exercisesData } from "@/data/exercises/CBExercise";
import { topics } from "@/data/topics";
import { CBRoute } from "@/helpers/routes";
import { Stack, Typography } from "@mui/material";
import { CBBreadcrumbs } from "../CBBreadcrumbs/CBBreadcrumbs";
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
  setCompletionTime,
}: CBFreePracticeExerciseSequenceProps): JSX.Element => {
  const topicData = topics[topic];
  const subtitle = exerciseType
    ? exercisesData[exerciseType].name
    : "Fehler Wiederholung";

  const onCompleteHref = `${CBRoute.FreieUebung}/${topic}`;

  return (
    <CBContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack
        spacing={1}
        sx={{
          height: "100%",
        }}
      >
        <CBPageHeader
          title={
            <CBBreadcrumbs
              previousLinks={[
                { label: "Freie Übung", href: CBRoute.FreieUebung },
                {
                  label: topicData.name || "Thema",
                  href: onCompleteHref,
                },
              ]}
            />
          }
          subTitle={<Typography variant="h2">{subtitle}</Typography>}
        />

        <CBExerciseSequenceProvider>
          <CBExerciseSequenceWrapper
            type={
              exerciseType
                ? CBExerciseSequenceType.FreePractice
                : CBExerciseSequenceType.RetryMistakes
            }
            exercises={exercises}
            onMistake={onMistake}
            onCompleteHref={onCompleteHref}
            onCompleteExercise={onCompleteExercise}
            onSequenceComplete={onSequenceComplete}
            setCompletionTime={setCompletionTime}
          />
        </CBExerciseSequenceProvider>
      </Stack>
    </CBContentWrapper>
  );
};
