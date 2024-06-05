"use client";

import { MPMIUnstyledNextLink } from "@/components/MPMIUnstyledNextLink/MPMIUnstyledNextLink";
import { MPMIExerciseDifficulty } from "@/data/exercises/MPMIExerciseDifficulty";
import { playResultsSound } from "@/helpers/playResultsSound";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { MPMIExerciseSequenceEndCard } from "../MPMIExerciseSequenceEndCard/MPMIExerciseSequenceEndCard";
import { MPMIExerciseSequenceEndCardProps } from "../MPMIExerciseSequenceEndCard/MPMIExerciseSequenceEndCardInterfaces";
import { MPMIExerciseSequenceType } from "../MPMIExerciseSequenceWrapperInterfaces";
import { useMPMIExerciseSequence } from "../useMPMIExerciseSequenceProvider";
import { MPMIExerciseSequenceEndScreenProps } from "./MPMIExerciseSequenceEndScreenInterfaces";

const difficultyMap: Record<
  MPMIExerciseDifficulty,
  MPMIExerciseSequenceEndCardProps
> = {
  [MPMIExerciseDifficulty.Easy]: {
    image: "/difficulty-easy.png",
    alt: "Kleine Pflanze",
    text: "Schwierigkeit Leicht",
  },
  [MPMIExerciseDifficulty.Medium]: {
    image: "/difficulty-medium.png",
    alt: "Mittelgroße Pflanze",
    text: "Schwierigkeit Mittel",
  },
  [MPMIExerciseDifficulty.Hard]: {
    image: "/difficulty-hard.png",
    alt: "Große Pflanze",
    text: "Schwierigkeit Schwer",
  },
};

export const MPMIExerciseSequenceEndScreen = ({
  difficulty,
  type,
  onCompleteHref,
}: MPMIExerciseSequenceEndScreenProps): JSX.Element => {
  const { exercises } = useMPMIExerciseSequence();

  useEffect(() => {
    playResultsSound();
  }, []);

  const allExercisesCompleted = exercises.every(
    (exercise) => exercise.isCompleted,
  );

  const correctExercisesPercentage = (
    (exercises.filter((exercise) => exercise.isCompleted).length /
      exercises.length) *
    100
  ).toFixed(2);

  const shortenedPercentage = correctExercisesPercentage.endsWith(".00")
    ? correctExercisesPercentage.slice(0, -3)
    : correctExercisesPercentage;

  const buttonsMap: Record<MPMIExerciseSequenceType, JSX.Element | null> = {
    [MPMIExerciseSequenceType.TopicWorld]: onCompleteHref ? (
      <MPMIUnstyledNextLink href={onCompleteHref}>
        <Button>Einheit beenden</Button>
      </MPMIUnstyledNextLink>
    ) : null,
    [MPMIExerciseSequenceType.ExamSimulator]: null,
    [MPMIExerciseSequenceType.FreePractice]: onCompleteHref ? (
      <MPMIUnstyledNextLink href={onCompleteHref}>
        <Button>Zurück zur Übersicht</Button>
      </MPMIUnstyledNextLink>
    ) : null,
    [MPMIExerciseSequenceType.RetryMistakes]: onCompleteHref ? (
      <MPMIUnstyledNextLink href={onCompleteHref}>
        <Button>Zurück zur Übersicht</Button>
      </MPMIUnstyledNextLink>
    ) : null,
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={3} alignItems="center">
        <Typography variant="h2" align="center">
          {allExercisesCompleted
            ? "Großartig, alles richtig!"
            : "Sehr gut, nur noch ein paar Fragen, die du wiederholen musst!"}
        </Typography>

        <Stack spacing={3} alignItems="center">
          <Stack spacing={2}>
            {difficulty !== undefined && (
              <MPMIExerciseSequenceEndCard {...difficultyMap[difficulty]} />
            )}

            <MPMIExerciseSequenceEndCard
              image="/star.png"
              alt="Stern"
              text={`${shortenedPercentage}% richtig beantwortet`}
            />
          </Stack>

          {buttonsMap[type]}
        </Stack>
      </Stack>
    </Container>
  );
};
