"use client";

import { CBRoute } from "@/helpers/routes";
import { playResultsSound } from "@/helpers/sounds/playResultsSound";
import { getFormattedTimeInMinutesAndSeconds } from "@/helpers/time-tracking/getFormattedTimeInMinutesAndSeconds";
import { DashboardRounded, RefreshRounded } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { CBUnstyledNextLink } from "../../CBUnstyledNextLink/CBUnstyledNextLink";
import { CBExamSimulatorEndScreenTaskCard } from "../CBExamSimulatorEndScreenTaskCard/CBExamSimulatorEndScreenTaskCard";
import { CBExamSimulatorEndScreenTopCard } from "../CBExamSimulatorEndScreenTopCard/CBExamSimulatorEndScreenTopCard";
import { CBExerciseWithCorrectness } from "../CBExamSimulatorInterfaces";
import { CBExamSimulatorEndScreenProps } from "./CBExamSimulatorEndScreenInterfaces";

export const CBExamSimulatorEndScreen = ({
  exercises,
  passedSeconds,
  onRetry,
  onStartNewExam,
}: CBExamSimulatorEndScreenProps): JSX.Element => {
  const falseExercises: CBExerciseWithCorrectness[] = exercises.filter(
    (e) => !e.isCorrect,
  );

  const passedMinutes = Math.floor(passedSeconds / 60);

  const correctExerciseAmount = exercises.filter((e) => e.isCorrect).length;

  const exerciseAmountTitle =
    correctExerciseAmount > exercises.length / 2
      ? "Prüfung bestanden"
      : "Prüfung nicht bestanden";

  const completionTimeTitle =
    passedMinutes >= 20
      ? "Ausbaufähiges Zeitmanagement"
      : "Hervorragendes Zeitmanagement";

  useEffect(() => {
    playResultsSound();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          pb: 1,
        }}
      >
        <CBExamSimulatorEndScreenTopCard
          image={{ src: "/exam-simulator/exercises.png", alt: "Bücher" }}
          title={exerciseAmountTitle}
          subTitle={`${correctExerciseAmount} / ${exercises.length} Aufgaben richtig`}
        />

        <CBExamSimulatorEndScreenTopCard
          image={{ src: "/exam-simulator/timer.png", alt: "Sanduhr" }}
          title={completionTimeTitle}
          subTitle={getFormattedTimeInMinutesAndSeconds(passedSeconds)}
        />
      </Stack>

      <Divider />

      <Typography
        sx={{
          py: 1,
        }}
      >
        Im Folgenden findest du eine Übersicht über alle abgeschlossenen
        Aufgaben in der Prüfungssimulation:
      </Typography>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={2}
        sx={{
          // Negative `mx` is necessary to align the grid with the other elements
          mx: "-8px !important",
        }}
      >
        {exercises.map((exercise, index) => (
          <Grid xs={12} lg={3} key={exercise.id}>
            <CBExamSimulatorEndScreenTaskCard
              isCorrect={exercise.isCorrect}
              exercise="Aufgabe"
              exerciseNumber={index + 1}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2,
        }}
      >
        <Button sx={{ width: "200px" }} onClick={onStartNewExam}>
          Neue Prüfung starten
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CBUnstyledNextLink href={CBRoute.Home}>
          <Button
            variant="text"
            startIcon={<DashboardRounded />}
            sx={{
              color: (t) => t.palette.grey[700],
              "&:hover": {
                bgcolor: "transparent",
                color: (t) => t.palette.primary.main,
              },
            }}
          >
            <Typography variant="body2">Zurück zum Dashboard</Typography>
          </Button>
        </CBUnstyledNextLink>

        <Button
          variant="text"
          onClick={() => onRetry(falseExercises)}
          startIcon={<RefreshRounded />}
          sx={{
            color: (t) => t.palette.grey[700],
            "&:hover": {
              bgcolor: "transparent",
              color: (t) => t.palette.primary.main,
            },
          }}
        >
          <Typography variant="body2">
            {falseExercises.length > 0
              ? "Fehler wiederholen"
              : "Prüfung wiederholen"}
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};
