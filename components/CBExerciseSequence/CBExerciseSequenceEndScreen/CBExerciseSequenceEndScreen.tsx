"use client";

import { CBEmoji } from "@/components/CBEmoji/CBEmoji";
import { CBUnstyledNextLink } from "@/components/CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExerciseDifficulty } from "@/data/exercises/CBExerciseDifficulty";
import { playResultsSound } from "@/helpers/sounds/playResultsSound";
import { dayjsLocalized } from "@/helpers/time-tracking/dayjsLocalized";
import { getFormattedTimeInMinutesAndSeconds } from "@/helpers/time-tracking/getFormattedTimeInMinutesAndSeconds";
import { Button, Container, Stack, Typography } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import { useEffect, useMemo } from "react";
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
    image: { src: "/difficulty-easy.png", alt: "Kleine Pflanze" },
    text: "Schwierigkeit: Leicht",
  },
  [CBExerciseDifficulty.Medium]: {
    image: { src: "/difficulty-medium.png", alt: "Mittelgroße Pflanze" },
    text: "Schwierigkeit: Mittel",
  },
  [CBExerciseDifficulty.Hard]: {
    image: { src: "/difficulty-hard.png", alt: "Große Pflanze" },
    text: "Schwierigkeit: Schwer",
  },
};

const typographyVariant = "h3";

const animationEndCardContainerVariants: MotionProps["variants"] = {
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const animationEndCardVariants: MotionProps["variants"] = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const commonEndCardMotionProps: MotionProps = {
  variants: animationEndCardVariants,
};

export const CBExerciseSequenceEndScreen = ({
  difficulty,
  onCompleteHref,
}: CBExerciseSequenceEndScreenProps): JSX.Element => {
  const { exercises, type, beginTime } = useCBExerciseSequence();

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

  const passedSeconds = useMemo(
    () => dayjsLocalized().diff(beginTime, "second"),
    [beginTime],
  );

  return (
    <Container maxWidth="md">
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        {allExercisesCompleted ? (
          <Stack direction="row" spacing={1}>
            <Typography variant={typographyVariant}>
              Großartig, alles richtig!
            </Typography>

            <CBEmoji emoji="🎉" typographyVariant={typographyVariant} />
          </Stack>
        ) : (
          <Typography
            variant={typographyVariant}
            sx={{
              textAlign: "center",
            }}
          >
            Bleib dran, du schaffst das!
          </Typography>
        )}

        <Stack
          spacing={3}
          sx={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Stack
            component={motion.div}
            variants={animationEndCardContainerVariants}
            initial="initial"
            animate="show"
            spacing={2}
            sx={{ width: "100%" }}
          >
            {difficulty && (
              <motion.div {...commonEndCardMotionProps}>
                <CBExerciseSequenceEndCard {...difficultyMap[difficulty]} />
              </motion.div>
            )}

            <motion.div {...commonEndCardMotionProps}>
              <CBExerciseSequenceEndCard
                image={{ src: "/star.png", alt: "Stern" }}
                text={`${
                  correctExercisesPercentage.endsWith(".00")
                    ? correctExercisesPercentage.slice(0, -3)
                    : correctExercisesPercentage.replace(".", ",")
                }% der Aufgaben richtig beantwortet`}
              />
            </motion.div>

            <motion.div {...commonEndCardMotionProps}>
              <CBExerciseSequenceEndCard
                image={{ src: "/exam-simulator/timer.png", alt: "Stern" }}
                text={`${getFormattedTimeInMinutesAndSeconds(passedSeconds)} gelernt`}
              />
            </motion.div>
          </Stack>

          {buttonsMap[type]}
        </Stack>
      </Stack>
    </Container>
  );
};
