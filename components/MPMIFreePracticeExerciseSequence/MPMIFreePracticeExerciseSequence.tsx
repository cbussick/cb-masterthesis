"use client";

import { exercisesData } from "@/data/exercises/MPMIExercise";
import { topics } from "@/data/topics";
import { MPMIRoute } from "@/helpers/routes";
import { Stack, Typography } from "@mui/material";
import { MPMIBreadcrumbs } from "../MPMIBreadcrumbs/MPMIBreadcrumbs";
import { MPMIContentWrapper } from "../MPMIContentWrapper/MPMIContentWrapper";
import { MPMIExerciseSequenceProvider } from "../MPMIExerciseSequence/MPMIExerciseSequenceProvider";
import { MPMIExerciseSequenceWrapper } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapper";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequence/MPMIExerciseSequenceWrapperInterfaces";
import { MPMIPageHeader } from "../MPMIPageHeader/MPMIPageHeader";
import { MPMIFreePracticeExerciseSequenceProps } from "./MPMIFreePracticeExerciseSequenceInterfaces";

export const MPMIFreePracticeExerciseSequence = ({
  exercises,
  topic,
  exerciseType,
  onMistake,
  onCompleteExercise,
  onSequenceComplete,
  setCompletionTime,
}: MPMIFreePracticeExerciseSequenceProps): JSX.Element => {
  const topicData = topics[topic];
  const subtitle = exerciseType
    ? exercisesData[exerciseType].name
    : "Fehler Wiederholung";

  const onCompleteHref = `${MPMIRoute.FreieUebung}/${topic}`;

  return (
    <MPMIContentWrapper bgcolor={(t) => t.palette.background.default}>
      <Stack spacing={1} height="100%">
        <MPMIPageHeader
          title={
            <MPMIBreadcrumbs
              previousLinks={[
                { label: "Freie Übung", href: MPMIRoute.FreieUebung },
                {
                  label: topicData.name || "Thema",
                  href: onCompleteHref,
                },
              ]}
            />
          }
          subTitle={<Typography variant="h2">{subtitle}</Typography>}
        />

        <MPMIExerciseSequenceProvider>
          <MPMIExerciseSequenceWrapper
            type={
              exerciseType
                ? MPMIExerciseSequenceType.FreePractice
                : MPMIExerciseSequenceType.RetryMistakes
            }
            exercises={exercises}
            onMistake={onMistake}
            onCompleteHref={onCompleteHref}
            onCompleteExercise={onCompleteExercise}
            onSequenceComplete={onSequenceComplete}
            setCompletionTime={setCompletionTime}
          />
        </MPMIExerciseSequenceProvider>
      </Stack>
    </MPMIContentWrapper>
  );
};
