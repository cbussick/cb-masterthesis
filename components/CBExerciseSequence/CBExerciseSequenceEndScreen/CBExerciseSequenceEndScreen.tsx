"use client";

import { CBUnstyledNextLink } from "@/components/CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { playResultsSound } from "@/helpers/playResultsSound";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { CBExerciseSequenceEndCard } from "../CBExerciseSequenceEndCard/CBExerciseSequenceEndCard";
import { CBExerciseSequenceEndCardProps } from "../CBExerciseSequenceEndCard/CBExerciseSequenceEndCardInterfaces";
import { CBExerciseSequenceType } from "../CBExerciseSequenceWrapperInterfaces";
import { useCBExerciseSequence } from "../useCBExerciseSequenceProvider";
import { CBExerciseSequenceEndScreenProps } from "./CBExerciseSequenceEndScreenInterfaces";

const difficultyMap: Record<
  CBExerciseDifficulty,
  CBExerciseSequenceEndCardProps
> = {
  [CBExerciseDifficulty.Easy]: {
    image: "/difficulty-easy.png",
    alt: "Kleine Pflanze",
    text: "Schwierigkeit Leicht",
  },
  [CBExerciseDifficulty.Medium]: {
    image: "/difficulty-medium.png",
    alt: "Mittelgroße Pflanze",
    text: "Schwierigkeit Mittel",
  },
  [CBExerciseDifficulty.Hard]: {
    image: "/difficulty-hard.png",
    alt: "Große Pflanze",
    text: "Schwierigkeit Schwer",
  },
};

export const CBExerciseSequenceEndScreen = ({
  difficulty,
  type,
  onCompleteHref,
}: CBExerciseSequenceEndScreenProps): JSX.Element => {
  const { exercises } = useCBExerciseSequence();

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

  const buttonsMap: Record<CBExerciseSequenceType, JSX.Element | null> = {
    [CBExerciseSequenceType.TopicWorld]: onCompleteHref ? (
      <CBUnstyledNextLink href={onCompleteHref}>
        <Button>Einheit beenden</Button>
      </CBUnstyledNextLink>
    ) : null,
    [CBExerciseSequenceType.ExamSimulator]: null,
    [CBExerciseSequenceType.FreePractice]: onCompleteHref ? (
      <CBUnstyledNextLink href={onCompleteHref}>
        <Button>Zurück zur Übersicht</Button>
      </CBUnstyledNextLink>
    ) : null,
    [CBExerciseSequenceType.RetryMistakes]: onCompleteHref ? (
      <CBUnstyledNextLink href={onCompleteHref}>
        <Button>Zurück zur Übersicht</Button>
      </CBUnstyledNextLink>
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
              <CBExerciseSequenceEndCard {...difficultyMap[difficulty]} />
            )}

            <CBExerciseSequenceEndCard
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
